const fs = require("fs");
const cities = require("./cities");

const filePath = "./input.txt";

async function fillInputFile(cities) {
  const randomIndex = Math.floor(Math.random() * cities.length);
  await writeFileAsync(filePath, cities[randomIndex].name);
}

function construct_link({ lat, lng }) {
  return `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true`;
}

async function readFileAsync(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, {encoding: "utf8"}, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
}
async function existsAsync(path) {
  return new Promise((resolve) => {
    let found = fs.existsSync(path);
    resolve(found);
  });
}
async function deleteAsync(filePath) {
  return new Promise((resolve, reject) => {
    fs.unlink(filePath, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}
async function writeFileAsync(filePath, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, data, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}

async function tempFileCreator(filePath) {
  try {
    await fillInputFile(cities);
    const cityName = await readFileAsync(filePath);
    console.log(cityName);
    const cityFilePath = `${cityName.split(" ").join("")}.txt`;
    console.log(cityFilePath);

    // if (fs.existsSync(cityFilePath)) await deleteAsync(cityFilePath);
    const flag = await existsAsync(cityFilePath);
    console.log(flag);
    if (flag) await deleteAsync(cityFilePath);

    const cityData = cities.find((x) => x.name === cityName);
    console.log(cityData);

    //fetching
    const link = construct_link(cityData);
    const response = await fetch(link);
    const data = await response.json();

    //writing to the file
    let {
      current_weather_units: { temperature: temp_unit },
      current_weather: { temperature: temp },
    } = data;
    let towrite_data = `CityName: ${cityName}, Temperature: ${temp}${temp_unit}`;
    console.log("towrite_data");
    console.log(towrite_data);
    await writeFileAsync(cityFilePath, towrite_data);
  } catch (err) {
    throw err;
  }
}

tempFileCreator(filePath)
  .then(() => {
    console.log("File Created Successfully");
  })
  .catch((err) => console.log(err.message));
