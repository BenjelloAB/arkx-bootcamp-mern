"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var restaurants_js_1 = require("./restaurants.js");
var hour = new Date().getHours();
// hour = 123;
var dollarSigns = '$$';
var deliveryTimeMax = 90;
var maxDistance = 10;
var result;
// console.log(typeof hour);
var priceBracket = dollarSigns.length;
var filteredRestaurants = restaurants_js_1.default.filter(function (restaurant) {
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
}
else {
    result = "We found ".concat(filteredRestaurants.length, " restaurants, the first is ").concat(filteredRestaurants[0].name, ".");
}
console.log(result);
