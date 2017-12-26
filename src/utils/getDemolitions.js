const axios = require('axios');
const DEMO_API = "https://data.detroitmi.gov/resource/nfx3-ihbp.json"

function getDemolitions(location, range = 500){
  let query = `?$where=within_circle(location, ${location.lat}, ${location.long}, ${range})`
  let url = DEMO_API + query
  console.log(url)
  return axios.get(url).then(response => {
    return response.data
  })
}

module.exports = getDemolitions
