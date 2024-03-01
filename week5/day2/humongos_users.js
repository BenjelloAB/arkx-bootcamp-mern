const {
  fetchUsers,
  updateEmail,
  fetchUser,
  createUser,
  setup,
} = require("./humongos_helpers");

(async function main() {
  try {
    var { User, client } = await setup();
    //testing creation
    await createUser(User, "Mike Ross", "mike.ross@arkx.group", 30);
    await createUser(User, "jhon Marston", "jhon.Marston@arkx.group", 35);
    await createUser(User, "ahmed jay", "ahmed.jay@arkx.group");

    //testing fetchUsers
    const users = await fetchUsers(User)
    console.log(users)

    //testing fetchUser
    const user = await fetchUser(User, "Mike Ross", "mike.ross@arkx.group")
    console.log(user)

    //testing update
    const user_ = await updateEmail(
      User,
      "Mike Ross",
      "mike.ross@arkx.group",
      "adin.ross@arkx.group"
    );
    console.log(user_);

    //testing delete
    await deleteBeforeDate(User, Date.now())

    client.close();
  } catch (err) {
    console.log(err);
    client.close();
  }
})();
