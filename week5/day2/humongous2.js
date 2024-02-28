const mongoose = require("mongoose");
const url = "mongodb://127.0.0.1:27017/mydb";

async function main() {
  try {
    const mongo = await mongoose.connect(url);
    // console.log(mongo)
    const client = mongoose.connection.getClient();
    // console.log(client);
    console.log("connected");

    //creating a schema
    const userSchema = new mongoose.Schema({
      name: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      age: { type: Number },
    });

    // creating a model
    const User = mongoose.model("User", userSchema);

    // create a new user
    const user1 = new User({
      name: "Arkadian",
      email: "admin@arkx.group",
      age: 27,
    });

    const user_created = await user1.save();
    console.log(`created Users ${user_created}`);
    //fetching users
    const users = await User.find({});
    console.log(`all users : ${users}`);

    //finding a user
    const usr_find = await User.findOne({ name: "Arkadian" });
    if (usr_find) console.log(`found the user ${usr_find}`);
    else console.log("User not found (Search)");

    //updating a user  $set
    const usr_updated = await User.findOneAndUpdate(
      { email: "admin@arkx.group" },
      { $set: { email: "user@arkx.group", age: 20 } }
    );
    if (usr_updated) console.log(`Updated user : ${usr_updated}`);
    else console.log("User Not found for Update");

    //deleting a user
    // const usr_deleted = await User.findByIdAndDelete({
    //   email: "user@arkx.group",
    // });
    // if (usr_deleted) console.log(`User deleted Successfully ${usr_deleted}`);
    // else console.log("User not found for deletion");

    client.close();
  } catch (err) {
    console.log(err);
  }
}

async function deleteUser(duser) {
    try{
        const mongo = await mongoose.connect(url);
        // console.log(mongo)
        const client = mongoose.connection.getClient();
        // console.log(client);
        console.log("connected");
    
        //creating a schema
        const userSchema = new mongoose.Schema({
          name: { type: String, required: true },
          email: { type: String, required: true, unique: true },
          age: { type: Number },
        });
    
        // creating a model
        const User = mongoose.model("User", userSchema);
    
        //  deleting a user
const usr_deleted = await User.findOneAndDelete(duser);
        if (usr_deleted) console.log(`User deleted Successfully ${usr_deleted}`);
        else console.log("User not found for deletion");
        client.close()
    }catch(err){
        console.log(err)
    }
}

// main();
deleteUser({
  email: "user@arkx.group",
});
