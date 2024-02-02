"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var products_js_1 = require("./products.js");
var productName;
productName = products_js_1.default[0].name;
productName = 'tote bag';
// console.log(productName);
var prod_search_arr = products_js_1.default.filter(function (x) { return x.name === productName; });
var product = prod_search_arr[0];
// console.log(product);
var preOrder_product = product.preOrder;
if (preOrder_product == "true") {
    console.log("On the way");
}
var shipping = 0, taxPercent = 0.05, taxTotal = 0, total = 0;
var shippingAddress = "Chicago, saint polis N123, DownTown";
var aNewYorker = /New York/;
if (Number(product.price) >= 25) {
    shipping = 0;
    console.log("We provide a free shipping");
}
else if (Number(product.price) < 25 && Number(product.price) > 0) {
    shipping = 5;
    //   console.log("No free shipping");
}
//method1 :
var match_arr = shippingAddress.match(aNewYorker);
if (match_arr) {
    taxPercent = 0.1;
}
// console.log(match_arr ? match_arr[0] : "New York Not found in Address");
//--! method2 of findifn out wether the custom. is NewYorker or not:
// let test_newYork = aNewYorker.test(shippinAddress);
// console.log("test = ",test_newYork);
// if(test_newYork)
// {
// taxPercent = 0.1
// }
taxTotal = Number(product.price) * taxPercent;
total = taxTotal + Number(product.price) + shipping;
console.log("=========Receipt==========");
console.log("Product name: ", productName);
console.log("Shipping Address", shippingAddress);
console.log("Price of the product", Number(product.price), "$");
console.log("TaxTotal", taxTotal, "$");
console.log("Shipping fees", shipping, "$");
console.log("Total Price :", total, "$");
console.log("===================");
