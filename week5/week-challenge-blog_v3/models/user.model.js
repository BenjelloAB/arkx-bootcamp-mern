const mongoose = require("mongoose");
const { NotFoundError } = require("../customErrors");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);

async function registerUser(name, email, password) {
  try {
    const user = await User.create({
      name: name,
      email: email,
      password: password,
    });
    return user;
  } catch (err) {
    throw err;
  }
}
async function findUserById(id) {
  try {
    const user = await User.findById(id);
    if (!user) throw new NotFoundError("User Not found");
    return user;
  } catch (err) {
    throw err;
  }
}

async function findUserByEmail(email) {
  try {
    const user = await User.findOne({ email: email });
    if (!user) throw new NotFoundError("User not Found");
    console.log(user);
    return { name: user.name, email: user.email, password: user.password };
  } catch (err) {
    throw err;
  }
}

// async function deleteUser(id)
// {
//     try {
//         const deletedUser = await User.findByIdAndDelete(id);
//         if (!deletedUser) throw new NotFoundError("User Not Found!");
//         return deletedUser;
//       } catch (err) {
//         throw err;
//       }
// }
module.exports = {
  findUserById,
  registerUser,
  findUserByEmail,
};
