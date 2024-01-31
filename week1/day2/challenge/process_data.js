

async function processUserData(data)
{
    try{
        console.log("data = ", data)
        let male_users = data["users"].filter(x => x.gender === "male");
        let myman = male_users.map(({name, age})=> `Name: ${name}, Age: ${age}`);
        return myman;
    }
    catch(err)
    {
        console.log(err);
        throw err;
    }
}

module.exports = processUserData;