

function summarizeAge(arr)
{
    return arr.reduce((acc, {age}) => acc += age, 0);
}

module.exports = summarizeAge;