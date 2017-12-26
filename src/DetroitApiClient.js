const axios = require('axios');
const getDetailsFor = require('./utils/getDetailsFor')
const moment = require('moment');

const WASTE_API = "https://apis.detroitmi.gov/waste_notifier/address/"
const WASTE_FORMAT = "/?format=json"

const DEMO_API = "https://data.detroitmi.gov/resource/nfx3-ihbp.json"

class DetroitApiClient{

  constructor(){

  }

  // Demolitons defaults to 200 meters (656feet).
  // The health dept standard is 400 feet.
  demolitions(location, range = 200){
    let query = `?$where=within_circle(location, ${location.lat}, ${location.lon}, ${range})`
    let url = DEMO_API + query
    console.log(url)
    return axios.get(url).then(response => {
      return response.data
    }).catch(error => {
      return error
    });
  }

  // Waste defaults to trash.
  waste(address, type = "trash"){
    let url = WASTE_API + address + WASTE_FORMAT;
    return axios.get(url)
      .then(res => {return res.data})
      .then(res => {
          let pickups = res.next_pickups;
          switch(type){
            case "bulk":
              return pickups["bulk"];
              break;
            case "recycling":
              return pickups["recycling"];
              break;
            case "trash":
              return pickups["trash"];
              break;
            case "yard":
              return pickups["yard waste"];
              break;
            case "all":
              return pickups;
              break;
            default:
              return pickups
          }
        })
  }

  blightTickets(address){
    return getDetailsFor(address).then(details => {
      const parcelId = details.attributes.User_fld
      return `https://data.detroitmi.gov/resource/s7hj-n86v.json?parcelno=${parcelId}`
    }).then(res => {
      return axios.get(res).then(res => (res.data));
    }).catch(err => ("Something went wrong."))
  }

  permits(address){
    return getDetailsFor(address).then(details => {
      const parcelId = details.attributes.User_fld
      return `https://data.detroitmi.gov/resource/but4-ky7y.json?parcel_no=${parcelId}`
    }).then(res => {
      return axios.get(res).then(response => {
        return response.data
      });
    });
  }

  // This is just sugar on getParcelFor
  parcelNumber(address){
    const details = getDetailsFor(address)
    details.attributes.User_fld
  }
}

module.exports = function(){
  return new DetroitApiClient();
}
