import { restaurants } from "./restaurants.js";
import { orders, PriceBracket } from "./orders.js";
//Notes : 
//-> orders[0] are the orders for restaurant[0] 
//-> orders[0] is an array of objects
// Add your getMaxPrice() function below:
function getMaxPrice(priceRange) {
    switch (priceRange) {
        case PriceBracket.Low:
            return 10.0;
        case PriceBracket.Medium:
            return 20.0;
        case PriceBracket.High:
            return 30.0;
        default:
            return 0;
    }
}
// Add your getOrders() function below:
function getOrders(price, orders) {
    let filteredOrders = [];
    let maxPrice = getMaxPrice(price);
    orders.forEach((restaurant) => {
        let prep_filter = restaurant.filter((order) => order.price < maxPrice);
        if (prep_filter.length > 0)
            filteredOrders.push(prep_filter);
    });
    return filteredOrders;
}
// Add your printOrders() function below:
function printOrders(restaurants, orders) {
    orders.forEach((order, index) => {
        console.log(`${restaurants[index].name}`);
        order.map((x, index) => {
            console.log(`-${x.name}: $${x.price}`);
        });
    });
}
// Main
const eligibleOrders = getOrders(PriceBracket.Low, orders);
// console.log(eligibleOrders)
printOrders(restaurants, eligibleOrders);
