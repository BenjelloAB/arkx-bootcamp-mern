const fetchUserData = require("./fetch_data");

async function main()
{
    try{
        await fetchUserData();
    }catch(err){
        console.log(err.message);
    }
}

main();