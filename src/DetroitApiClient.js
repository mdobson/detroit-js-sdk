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
  waste(address, type = this.trashType.TRASH) {
    const url = WASTE_API + address + WASTE_FORMAT;
    return fetch(url)
      .then(res => {
        return res.json();
      })
      .then(data => {
        const pickups = data.next_pickups;
        if (type != this.trashType.ALL) {
          return pickups[type];
        } else {
          return pickups;
        }
      })
      .catch(err => {
        return "No address found";
      });
  }

  blightTickets(address) {
    return getDetailsFor(address)
      .then(details => {
        const parcelId = details.attributes.User_fld;
        return `https://data.detroitmi.gov/resource/s7hj-n86v.json?parcelno=${parcelId}`;
      })
      .then(res => {
        return axios.get(res).then(res => res.data);
      })
      .catch(err => "Something went wrong.");
  }

  permits(address, status = this.status.OPEN) {
    return getDetailsFor(address)
      .then(details => {
        const parcelId = details.attributes.User_fld;
        if (status == "ALL") {
          return `https://data.detroitmi.gov/resource/but4-ky7y.json?parcel_no=${parcelId}`;
        } else {
          console.log(
            `https://data.detroitmi.gov/resource/but4-ky7y.json?parcel_no=${parcelId}&permit_status=${status}`
          );
          return `https://data.detroitmi.gov/resource/but4-ky7y.json?parcel_no=${parcelId}&permit_status=${status.toString()}`;
        }
      })
      .then(res => {
        return fetch(res)
          .then(response => {
            return response.json();
          })
          .then(data => {
            return { address: address, permits: data };
          });
      });
  }

  // This is just sugar on getParcelFor
  parcelNumber(address) {
    const details = getDetailsFor(address);
    details.attributes.User_fld;
  }
}

module.exports = function() {
  return new DetroitApiClient();
};
