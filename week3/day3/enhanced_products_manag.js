const express = require("express");
const products = require("./products");
const { generateId, findProductID } = require("./utils");

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  console.log(
    `Method : ${req.method} | PATH : ${req.path} | URL : ${
      req.url
    } | BODY : ${JSON.stringify(req.body)}`
  );
  next();
});

app.get("/products", (req, res) => {
  if (!products || products.length === 0)
    return next(Error("No Products are available"));
  else res.json(products);
});

app.get("/products/search", (req, res) => {
  let { q, minPrice, maxPrice } = req.query;
  console.log(req.query);
  if (!products || products.length === 0)
    return next(Error("No Products are available"));
  let res_products = products.filter((x) => {
    let is_q = q ? RegExp(q, "i").test(x.name) : true;
    let is_max = maxPrice ? x.price <= Number(maxPrice) : true;
    let is_min = minPrice ? x.price >= Number(minPrice) : true;
    return is_q && is_min && is_max;
  });
  res.json(res_products);
});

app.post("/products", (req, res) => {
  let { name, price } = req.body;
  if (!name) {
    // res.status(400).json({ error: "name is not provided" });
    return next(Error("Name key/value is not provided in the Request Body"));
  }
  if (!price) {
    // res.status(400).json({ error: "Price is not provided" });
    return next(Error("Price key/value is not provided in the Request Body"));
  }
  let genId = generateId();
  products.push({ id: genId, name, price });
  res.json("Product Added Successfully");
  console.log(products);
});

app.put("/products/:id", (req, res) => {
  let { name, price } = req.body;
  let { id } = req.params;
  if (!name) {
    // res.status(400).json("name is not provided");
    return next(Error("Name key/value is not provided in the Request Body"));
  }
  if (!price) {
    // res.status(400).json("price is not provided");
    return next(Error("Price key/value is not provided in the Request Body"));
  }
  let f_index = findProductID(Number(id));
  if (f_index === -1) {
    // res.status(404).json("product not found");
    return next(Error("Product Not Found"));
  } else {
    products[f_index].name = name;
    products[f_index].price = Number(price);
  }
  res.json(`Product(${id}) updated Successfully`);
  console.log(products);
});

//deleting a product
app.delete("/products/:id", (req, res) => {
  let { id } = req.params;
  if (isNaN(id)) {
    // res.status(400).json("Invalid id");
    return next(Error("Invalid id (must contain only numbers)"));
  }
  let d_index = findProductID(Number(id));
  if (d_index === -1) {
    // res.status(400).json("product not found");
    return next(Error("Product Not Found"));
  } else {
    products.splice(d_index, 1);
    res.json("Product Deleted Successfully");
    console.log(products);
  }
});

app.use((err, req, res, next) => {
  //400 status code for bad request
  res.status(400).json(err.message);
});
//server starts
app.listen(4007, () => {
  console.log("listening on 4007 port");
});
