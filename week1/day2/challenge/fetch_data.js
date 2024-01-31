const  processUserData = require("./process_data");
const summarizeAge = require("./summarize_age");

async function fetchUserData()
{
    try{
        let res = await fetch("https://dummyjson.com/users");
        let data = await res.json();

        // console.log("==========");
        // console.log("data['users'] = ", data["users"].slice(0,7));
        // console.log("===========");

        let {men_arr_str, men_arr} = await processUserData(data);
        let sum_ages = summarizeAge(men_arr);
        console.log("Processed Users: ");
        for(let i = 0; i < men_arr_str.length; i++)
        {
            console.log(`- ${men_arr_str[i]}`);
        }
        console.log(`Total Age of Active Users: ${sum_ages}`);
    }
    catch(err){
        console.log(err.message);
    }
}



module.exports = fetchUserData;