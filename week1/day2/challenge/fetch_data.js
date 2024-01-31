const  processUserData = require("./process_data");
const summarizeAge = require("./summarize_age");

async function fetchUserData()
{
    try{
        let res = await fetch("https://dummyjson.com/users");
        let data = await res.json();

        console.log("==========");
        console.log("data['users'] = ", data["users"].slice(0,7));
        console.log("===========");

        let {women_arr_str, women_arr} = await processUserData(data);
        let sum_ages = summarizeAge(women_arr);
        console.log("Processed Users: ");
        for(let i = 0; i < women_arr_str.length; i++)
        {
            console.log(`- ${women_arr_str[i]}`);
        }
        console.log(`Total Age of Active Users: ${sum_ages}`);
    }
    catch(err){
        console.log(err.message);
    }
}



module.exports = fetchUserData;