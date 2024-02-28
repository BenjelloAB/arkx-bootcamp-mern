const mongoose = require("mongoose");
const url = "mongodb://127.0.0.1:27017/mydb";

async function setup() {
    try {
      const mongo = await mongoose.connect(url);
      console.log("connected Successfully");
      const client = mongoose.connection.getClient();
  
      //creating a schema
      const userSchema = new mongoose.Schema({
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        age: { type: Number },
        createdAt: { type: Date, default: Date.now },
      });
  
      // creating a model
      const User = mongoose.model("User", userSchema);
  
      return { User: User, client: client };
    } catch (err) {
      console.log(err.message);
    }
  }
  async function createUser(UserModel, name, email, age) {
    // create a new user
    const usrobj = {
      name: name,
      email: email,
    };
    if (age) usrobj.age = age;
    const usr = new UserModel(usrobj);
    const user_created = await usr.save();
    console.log(`created User ${user_created}`);
  }
  async function fetchUsers(UserModel) {
    try {
      const users = UserModel.find({});
      if (users.length === 0) throw new Error("No users found, empty databae");
      else return users;
    } catch (err) {
      throw err;
    }
  }
  
  async function fetchUser(UserModel, name, email) {
    try {
      const filter = {
        name: name,
        email: email,
      };
      const user = UserModel.findOne(filter);
      if (!user) throw new Error("User Not Found (fetchUser)");
      return user;
    } catch (err) {
      throw err;
    }
  }
  
  async function updateEmail(UserModel, name, oldEmail, newEmail) {
    try {
      let filter = { name: name, email: oldEmail };
      const user = await UserModel.findOneAndUpdate(filter, {
        $set: { email: newEmail },
      },{new: true});
      if (!user || user === null)
        throw new Error("User Not Found (updateUseremail)");
      return user;
    } catch (err) {
      throw err;
    }
  }
  
  async function deleteBeforeDate(UserModel, compDate) {
    try {
      const deletionResult = await UserModel.deleteMany({
        createdAt: { $lt: compDate },
      });
      if (deletionResult.deletedCount === 0) {
        console.log("No documents were deleted.");
      } else {
        console.log(`${deletionResult.deletedCount} documents were deleted.`);
      }
    } catch (err) {
      throw err;
    }
  }

module.exports = {
    fetchUsers,
    updateEmail,
    fetchUser, 
    createUser,
    setup,
}