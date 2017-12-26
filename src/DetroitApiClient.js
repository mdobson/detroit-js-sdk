const axios = require('axios');
const getDetailsFor = require('./utils/getDetailsFor')
const getDemolitions = require('./utils/getDemolitions');
const moment = require('moment');

const WASTE_API = "https://apis.detroitmi.gov/waste_notifier/address/"
const WASTE_FORMAT = "/?format=json"

class DetroitApiClient{

  constructor(){

  }

  // Demolitons defaults to 200 meters (656feet).
  // The health dept standard is 400 feet.
  demolitions(params, range = 200){
    if(params.address){
      return getDetailsFor(params.address).then(details => {
        const lat = details.location.y;
        const long = details.location.x;
        return getDemolitions({'lat': lat, 'long': long}, range);
      })
    }else{
      const lat = params.location.lat;
      const long = params.location.long;
      return getDemolitions({'lat': lat, 'long': long}, range);
    }
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
