import restaurants from './restaurants.js';

let hour: number = new Date().getHours();
// hour = 123;
const dollarSigns = '$$';
const deliveryTimeMax = 90;
const maxDistance = 10;
let result: string;
// console.log(typeof hour);
const priceBracket: number = dollarSigns.length;

const filteredRestaurants = restaurants.filter((restaurant) => {

    if (Number(restaurant.priceBracket) > priceBracket ||
        hour < Number(restaurant.openHour) ||
        hour >= Number(restaurant.closeHour))


        if (restaurant.deliveryTimeMinutes > deliveryTimeMax) {
            return false;
        }

    if (Number(restaurant.distance) > maxDistance) {
        return false;
    }

    return restaurant;
});

if (filteredRestaurants.length === 0) {
    result = 'There are no restaurants available right now.';
} else {
    result = `We found ${filteredRestaurants.length} restaurants, the first is ${filteredRestaurants[0].name}.`;
}

console.log(result);
