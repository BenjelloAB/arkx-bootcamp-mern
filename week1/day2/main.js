const fetchUserData = require("./fetch_data");

(function main()
{
    try{
        fetchUserData();
    }catch(err){
        console.log(err.message);
    }
}

)();