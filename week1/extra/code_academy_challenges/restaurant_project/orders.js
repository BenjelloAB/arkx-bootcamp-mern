export var PriceBracket;
(function (PriceBracket) {
    PriceBracket[PriceBracket["Low"] = 0] = "Low";
    PriceBracket[PriceBracket["Medium"] = 1] = "Medium";
    PriceBracket[PriceBracket["High"] = 2] = "High";
})(PriceBracket || (PriceBracket = {}));
export const orders = [
    [
        {
            name: "Miso Ramen",
            price: 15.99,
        },
        {
            name: "Gyoza and Rice",
            price: 7.99,
        },
        {
            name: "Sashimi Lunch Set",
            price: 13.99,
        },
    ],
    [
        {
            name: "Chicken and Waffles",
            price: 9.99,
        },
        {
            name: "Buffalo Wings Special",
            price: 8.99,
        },
        {
            name: "Rottiserie Meal Deal",
            price: 11.99,
        },
    ],
    [
        {
            name: "Rigatoni Bolognese",
            price: 24,
        },
        {
            name: "Insalata Di Parma",
            price: 20,
        },
        {
            name: "Lasagna Al Forno",
            price: 22,
        },
    ],
    [
        {
            name: "Turkey Bacon Bagel",
            price: 6.99,
        },
        {
            name: "Lox Cream Cheese Bagel",
            price: 9.99,
        },
        {
            name: "Pastrami Swiss Bagel",
            price: 7.99,
        },
    ],
    [
        {
            name: "Xiao Long Bao",
            price: 14.99,
        },
        {
            name: "Red Bean Buns",
            price: 12.49,
        },
        {
            name: "Kurobuta Pork Shao Mai",
            price: 14.99,
        },
    ],
];
