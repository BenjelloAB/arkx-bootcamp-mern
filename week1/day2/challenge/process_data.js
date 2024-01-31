

async function processUserData(data)
{
    try{
        // console.log("data = ", data)
        let male_users = data["users"].filter(x => x.gender === "male");
        let myman = male_users.map(({firstName, lastName, age})=> `Name: ${firstName} ${lastName}, Age: ${age}`);
        return {men : myman, men_arr: male_users};
    }
    catch(err)
    {
        console.log(err);
        throw err;
    }
}

module.exports = processUserData;