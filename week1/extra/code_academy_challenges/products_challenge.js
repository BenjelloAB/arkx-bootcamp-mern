import products from "./products.js";
let productName;
productName = products[0].name;
productName = 'tote bag';
// console.log(productName);
let prod_search_arr = products.filter((x) => x.name === productName);
let product = prod_search_arr[0];
// console.log(product);
let preOrder_product = product.preOrder;
if (preOrder_product == "true") {
    console.log("On the way");
}
let shipping = 0, taxPercent = 0.05, taxTotal = 0, total = 0;
let shippingAddress = "Chicago, saint polis N123, DownTown";
let aNewYorker = /New York/;
if (Number(product.price) >= 25) {
    shipping = 0;
    console.log("We provide a free shipping");
}
else if (Number(product.price) < 25 && Number(product.price) > 0) {
    shipping = 5;
    //   console.log("No free shipping");
}
//method1 :
let match_arr = shippingAddress.match(aNewYorker);
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
console.log("Shipping Address: ", shippingAddress);
console.log("Price of the product", Number(product.price), "$");
console.log("TaxTotal", taxTotal, "$");
console.log("Shipping fees", shipping, "$");
console.log("Total Price :", total, "$");
console.log("===================");
/**
 * Hello
 * There
 * multiple
 * line
 * comments
 */ 
