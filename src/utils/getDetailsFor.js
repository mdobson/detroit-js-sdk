require("isomorphic-fetch");

async function getDetailsFor(address) {
  try {
    const url = `http://gis.detroitmi.gov/arcgis/rest/services/DoIT/CompositeGeocoder/GeocodeServer/findAddressCandidates?Street=&City=&ZIP=&SingleLine=${address}&category=&outFields=*&maxLocations=&outSR=4326&searchExtent=&location=&distance=&magicKey=&f=pjson`;
    const response = await fetch(url);
    const data = await response.json();
    const ordered = data.candidates
      .sort((a, b) => {
        return b.score - a.score;
      })
      .filter(candidate => candidate.attributes.Loc_name != "StreetCenterli");
    console.log(ordered);
    return ordered[0];
  } catch (err) {
    console.log(err);
  }
}

module.exports = getDetailsFor;
