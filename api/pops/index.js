const fetch = require("node-fetch");

async function getData() {
  let init = await fetch("https://api.covid19api.com/summary");
  let response = await init.json();
  let result = [];
  let promisesPopulation = [];
  let headers = {
    "x-rapidapi-key": "8590f33c3fmsh90b802ec1d3922cp130d5bjsn382782903160",
    "x-rapidapi-host": "world-population.p.rapidapi.com",
    useQueryString: true,
  };
  for (let i = 0; i < response.Countries.length; i++) {
    let country = response.Countries[i].Country;
    if (country === "Cape Verde") {
      country = "Cabo Verde";
    } else if (country === "Congo (Brazzaville)") {
      country = "Congo";
    } else if (country === "Congo (Kinshasa)") {
      country = "DR Congo";
    } else if (country === "Czech Republic") {
      country = "Czech Republic (Czechia)";
    } else if (country === "Côte d'Ivoire") {
      country = "Côte d'Ivoire";
    } else if (country === "Holy See (Vatican City State)") {
      country = "Holy See";
    } else if (country === "Iran, Islamic Republic of") {
      country = "Iran";
    } else if (country === "Korea (South)") {
      country = "South Korea";
    } else if (country === "Lao PDR") {
      country = "Laos";
    } else if (country === "Macao, SAR China") {
      country = "Macao";
    } else if (country === "Macedonia, Republic of") {
      country = "North Macedonia";
    } else if (country === "Micronesia, Federated States of") {
      country = "Micronesia";
    } else if (country === "Palestinian Territory") {
      country = "State of Palestine";
    } else if (country === "Republic of Kosovo") {
      country = "State of Palestine";
    } else if (country === "Russian Federation") {
      country = "Russia";
    } else if (country === "Saint Kitts and Nevis") {
      country = "Saint Kitts & Nevis";
    } else if (country === "Saint Vincent and Grenadines") {
      country = "St. Vincent & Grenadines";
    } else if (country === "Sao Tome and Principe") {
      country = "Sao Tome & Principe";
    } else if (country === "Syrian Arab Republic (Syria)") {
      country = "Syria";
    } else if (country === "Taiwan, Republic of China") {
      country = "Taiwan";
    } else if (country === "Tanzania, United Republic of") {
      country = "Tanzania";
    } else if (country === "United States of America") {
      country = "United States";
    } else if (country === "Venezuela (Bolivarian Republic)") {
      country = "Venezuela";
    } else if (country === "Viet Nam") {
      country = "Vietnam";
    } else if (country === "Swaziland") {
      country = "Eswatini";
    }
    const res2 = await fetch(
      `https://world-population.p.rapidapi.com/population?country_name=${encodeURIComponent(
        country
      )}`,
      {
        method: "GET",
        headers: headers,
      }
    );
    const json2 = await res2.json();
    let pop = -1;
    if (json2.body !== undefined) {
      pop = json2.body.population;
    } else {
      console.log(country + " population: " + pop);
    }
    promisesPopulation.push(pop);
  }
  for (let index = 0; index < promisesPopulation.length; index++) {
    let country = response.Countries[index].Country;
    let slug = response.Countries[index].Slug;
    const population = promisesPopulation[index];
    result.push({
      Country: country,
      Slug: slug,
      Population: population,
    });
  }
  return result;
}

module.exports = async (req, res) => {
  // this function will be launched when the API is called.
  try {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(await getData()); // send the hospital data
  } catch (err) {
    console.log(err);
    res.send(err); // send the thrown error
  }
};
