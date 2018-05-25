const getDetailsFor = require("./utils/getDetailsFor");
const getDemolitions = require("./utils/getDemolitions");
const moment = require("moment");

require("es6-promise").polyfill();
require("isomorphic-fetch");

const WASTE_API = "https://apis.detroitmi.gov/waste_notifier/address/";
const WASTE_FORMAT = "/?format=json";

class DetroitApiClient {
  // Permit status

  constructor() {
    this.status = {
      OPEN: "OPEN",
      CLOSED: "CLOSED",
      EXPIRED: "EXPIRED",
      ALL: "ALL"
    };

    this.trashType = {
      BULK: "bulk",
      RECYCLING: "recycling",
      TRASH: "trash",
      YARD: "yard",
      ALL: "all"
    };
  }

  // Demolitons defaults to 200 meters (656feet).
  // The health dept standard is 400 feet.
  demolitions(params, range = 200) {
    if (params.address) {
      return getDetailsFor(params.address).then(details => {
        const lat = details.location.y;
        const long = details.location.x;
        return getDemolitions({ lat: lat, long: long }, range);
      });
    } else {
      const lat = params.location.lat;
      const long = params.location.long;
      return getDemolitions({ lat: lat, long: long }, range);
    }
  }

  // Waste defaults to trash.
  async waste(address, type = this.trashType.TRASH) {
    const url = WASTE_API + address + WASTE_FORMAT;
    console.log(url)
    try{
      const response = await fetch(url);
      if (!response.ok){
        throw new Error('Request Failed!');
      }
      const data = await response.json();
      if (type == "all"){
        return data.next_pickups
      } else {
        return data.next_pickups[type];
      }
    } catch(err){
      console.log(err)
      return "No address found";
    }
  }

  async blightTickets(address) {
    const details = await getDetailsFor(address);
    const parcelId = details.attributes.User_fld;
    const url = `https://data.detroitmi.gov/resource/s7hj-n86v.json?parcelno=${parcelId}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }

  async permits(address, status = this.status.OPEN) {
    const details = await getDetailsFor(address);
    const parcelId = details.attributes.User_fld;
    let url = "";
    if (status == "ALL") {
      url = `https://data.detroitmi.gov/resource/but4-ky7y.json?parcel_no=${parcelId}`;
    } else {
      url = `https://data.detroitmi.gov/resource/but4-ky7y.json?parcel_no=${parcelId}&permit_status=${status.toString()}`;
    }
    const response = await fetch(url);
    const permits = await response.json();
    return { address, permits };
  }

  // This is just sugar on getParcelFor
  async parcelNumber(address) {
    try {
      const details = await getDetailsFor(address);
      return details.attributes.User_fld;
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = function() {
  return new DetroitApiClient();
};
