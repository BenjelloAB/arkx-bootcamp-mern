async function processUserData({ users }) {
  try {
    // console.log("data = ", data)
    let men_users = users.filter((x) => x.gender === "male");
    let formatted_men = men_users.map(
      ({ firstName, lastName, age }) =>
        `Name: ${firstName} ${lastName}, Age: ${age}`
    );
    return {
      men_arr_str: formatted_men,
      men_arr: men_users,
    };
  } catch (err) {
    console.log(err);
    throw err;
  }
}

module.exports = processUserData;
