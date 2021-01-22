const fetch = require("node-fetch");

async function getHospital() {
  let data = await fetch("https://dekontaminasi.com/api/id/covid19/hospitals");
  let response = await data.json();
  return response;
}

module.exports = async (req, res) => {
  // this function will be launched when the API is called.
  try {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(await getHospital()); // send the hospital data
  } catch (err) {
    res.send(err); // send the thrown error
  }
};
