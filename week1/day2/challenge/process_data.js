const processUserData = ({ users }) => {

    let women_users = users.filter((x) => x.gender !== "male");
    let formatted_women = women_users.map(
      ({ firstName, lastName, age }) =>
        `Name: ${firstName} ${lastName}, Age: ${age}`
    );
    return {
      women_arr_str: formatted_women,
      women_arr: women_users,
    };

}

module.exports = processUserData;
