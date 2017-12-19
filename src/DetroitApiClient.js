const axios = require('axios');
const getParcelFor = require('./utils/getParcelFor')
const moment = require('moment');

const WASTE_API = "https://apis.detroitmi.gov/waste_notifier/address/"
const WASTE_FORMAT = "/?format=json"

class DetroitApiClient{

  constructor(){

  }

  // Waste defaults to trash
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
    return getParcelFor(address).then(parcelId => {
      return `https://data.detroitmi.gov/resource/s7hj-n86v.json?parcelno=${parcelId}`
    }).then(res => {
      return axios.get(res).then(res => (res.data));
    }).catch(err => ("Something went wrong."))
  }

  permits(address){
    return getParcelFor(address).then(parcelId => {
      return `https://data.detroitmi.gov/resource/but4-ky7y.json?parcel_no=${parcelId}`
    }).then(res => {
      return axios.get(res).then(response => {
        return response.data
      });
    });
  }

  // This is just sugar on getParcelFor
  parcelNumber(address){
    return getParcelFor(address)
  }
}

module.exports = function(){
  return new DetroitApiClient();
}
