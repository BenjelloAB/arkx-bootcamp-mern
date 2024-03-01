const mongoose = require("mongoose");
const url = "mongodb://127.0.0.1:27017/mydb3";
const products = require("./products");
const {
  descBulkUpdate,
  outOfStockBulkDel,
  paginationLimit,
  softDelete,
  sortCollection,
  sortCollectionWAggregate,
  countProdsAgg,
  countProds,
  updateProduct,
  dynamicPagination,
  avgPrices,
} = require("./helpers");

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
        isDeleted: { type: Boolean, default: false },
      },
      {
        timestamps: true,
      }
    );

    const ProductModel = mongoose.model("Product", ProductSchema);

    //!inserting some dummy products
    await ProductModel.insertMany(products);
    console.log("Products Added Succ");

    //! sorting by price desc:  works
    const sortedProducts = await sortCollection("price", ProductModel, -1);
    console.log(sortedProducts);

    //!Agg Count porducts in stock:  works
    const count_ = await countProdsAgg(ProductModel);
    console.log("The Number of Products is : ", count_);

    // //! Count porducts in stock : works
    const count = await countProds(ProductModel);
    console.log("The Number of Products is : ", count);

    //! calculate average prices : works
    const avg = await avgPrices(ProductModel);
    console.log("Averge Price is : ", avg);

    //! pagination with variables : works
    const prods = await dynamicPagination(ProductModel, 3, 2);
    console.log("Products : ", prods);

    //! Sort by name asc: works
    const prods_ = await sortCollectionWAggregate(ProductModel, "name");
    console.log(prods_);

    //! Updating the product :  works
    const newPd = await updateProduct(
      ProductModel,
      { name: "Camera" },
      { price: 7999 }
    );
    console.log(newPd);
    console.log("Product Updated Successfully");

    //! testing softdelete : works
    const softnewPd = await softDelete(ProductModel, { name: "Camera" });
    console.log(softnewPd);
    console.log("Product Softly deleted Successfully");

    //! dsec update * test :  works
    const { numUpdated } = await descBulkUpdate(
      ProductModel,
      "destroy descriptions attack : ) "
    );
    console.log(`Updated the description of ${numUpdated} products`);

    //! limiting the shown pages
    const prodsPaginated = await paginationLimit(5, ProductModel);
    console.log(prodsPaginated);

    //! delete unavailable items tets :
    const { numDeleted } = await outOfStockBulkDel(ProductModel);
    console.log("Number of deleted items : ", numDeleted);

    client.close();
  } catch (err) {
    console.log(err);
    client.close();
  }
}
main();
