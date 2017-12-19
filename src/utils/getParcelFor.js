const axios = require('axios');

function getParcelFor (address){
  const url = `http://gis.detroitmi.gov/arcgis/rest/services/DoIT/CompositeGeocoder/GeocodeServer/findAddressCandidates?Street=&City=&ZIP=&SingleLine=${address}&category=&outFields=*&maxLocations=&outSR=&searchExtent=&location=&distance=&magicKey=&f=pjson`
  parcel = axios.get(url).then(response => {
    let addy = response.data.candidates[0]
    let parcelId = addy.attributes.User_fld
    return parcelId
  });
  return parcel
}

module.exports = getParcelFor
