const cities = require("./cities");
const fs = require("fs").promises;
function selectRandomCity(cities) {
  const randomIndex = Math.floor(Math.random() * cities.length);
  return cities[randomIndex];
}

function construct_link_name() {
  let { name, lat, lng } = selectRandomCity(cities);
  let link = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true`;
  return { link, name };
}
async function fetchData({ link, name }) {
  const response = await fetch(link);
  const data = await response.json();
  return { d: data, n: name };
}

let data = fetchData(construct_link_name())
  .then(({ d, n }) => {
    console.log(
      `City ${n} : ${d.current_weather["temperature"]}${d["current_weather_units"]["temperature"]}`
    );
  })
  .catch((err) => console.log(err));
