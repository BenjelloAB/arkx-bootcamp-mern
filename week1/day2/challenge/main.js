const fetchUserData = require("./fetch_data");
const processUserData = require("./process_data");

(function main()
{
    try{
        fetchUserData();
    }catch(err){
        console.log(err.message);
    }
}

)();