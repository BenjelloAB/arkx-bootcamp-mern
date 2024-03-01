const mongoose = require("mongoose");
const url = "mongodb://127.0.0.1:27017/mydb2";
const products = require("./products");

async function main() {
  try {
    await mongoose.connect(url);
    var client = mongoose.connection.getClient();
    console.log("Connected to the MongoDB Server");

    const ProductSchema = new mongoose.Schema(
      {
        name: { type: String, required: true },
        price: {
          type: Number,
          required: true,
          validate: {
            validator: function (value) {
              return value > 0;
            },
            message: (props) => `${props.value} is not a positive number`,
          },
        },
        description: { type: String },
        inStock: { type: Boolean, default: true },
      },
      {
        timestamps: true,
      }
    );

    const ProductModel = mongoose.model("Product", ProductSchema);
    //!inserting some dummy products
    await ProductModel.insertMany(products);
    const info = await ProductModel.deleteMany({})
    console.log("prodcuts deleted successfully : ["+ info.deletedCount + "]");

    //! sorting desc:
    const product_sorted = await ProductModel.find().sort({ price: -1 });
    console.log(product_sorted);

    //! pagination :
    const products_paginated = await ProductModel.find().limit(5);
    console.log(products_paginated);

    //! pagination with variables
    const pageSize = 2;
    const pageNumber = 3;
    const prods = await ProductModel.find()
      .sort({ price: -1 })
      .skip(pageNumber * pageSize)
      .limit(pageSize);
    console.log(prods);

    //!Aggreation Count porducts in stock
    const c = await ProductModel.aggregate([
      {
        $match: { inStock: { $eq: true } },
      },
      {
        $count: "stocked_products",
      },
    ]);
    console.log(c)
    if (c.length === 0)
      console.log("No Products Are Available in Stock");
    else console.log(c[0].stocked_products);

    //! Sort by name asc:
    const prods_ = await ProductModel.aggregate([
      {
        $sort: { name: 1 },
      },
    ]);
    console.log(prods_)

    client.close();
  } catch (err) {
    console.log(err.message);
    client.close();
  }
}

main();
