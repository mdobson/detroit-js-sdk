const axios = require('axios');

function getDetailsFor (address){
  const url = `http://gis.detroitmi.gov/arcgis/rest/services/DoIT/CompositeGeocoder/GeocodeServer/findAddressCandidates?Street=&City=&ZIP=&SingleLine=${address}&category=&outFields=*&maxLocations=&outSR=4326&searchExtent=&location=&distance=&magicKey=&f=pjson`
  parcel = axios.get(url).then(response => {
    let addy = response.data.candidates[0]
    return addy
  });
  return parcel
}

module.exports = getDetailsFor
