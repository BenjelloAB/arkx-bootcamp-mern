const  processUserData = require("./process_data");
const summarizeAge = require("./summarize_age");

async function fetchUserData()
{
    try{
        let res = await fetch("https://dummyjson.com/users");
        // console.log("===========")
        // console.log(`res = ${res.json()}`);
        // console.log(`typeof res = ${typeof res}`);
        // console.log("===========")
        let data = await res.json()
        console.log("===========")
        console.log(`data ${data}`);
        console.log("===========")
        let processed_males = await processUserData(data);
        let sum_ages = summarizeAge(processed_males);
        console.log("Processed Users: ");
        for(let i = 0; i < processed_males.length; i++)
        {
            console.log(`- ${processed_males[i]}`);
        }
        console.log(`Total Age of Active Users: ${sum_ages}`);
    }
    catch(err){
        console.log(err.message);
    }
}



module.exports = fetchUserData;