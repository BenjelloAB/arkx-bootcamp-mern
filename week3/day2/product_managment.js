const express = require("express");
const products = require("./products");
const { generateId, findProductID } = require("./utils");
const app = express();
app.use(express.json());

app.get("/products", (req, res) => {
  res.json(products);
});

app.get("/products/search", (req, res) => {
  let { q, minPrice, maxPrice } = req.query;
  console.log(req.query);
  let res_products = products.filter((x) => {
    let is_q = q ? RegExp(q, "i").test(x.name) : true;
    let is_max = maxPrice ? x.price <= Number(maxPrice) : true;
    let is_min = minPrice ? x.price >= Number(minPrice) : true;
    return is_q && is_min && is_max;
  });
  res.json(res_products);
});

app.post("/products", (req, res) => {
  let { name, price } = new_data;
  if (!name) {
    res.status(400).json({ error: "name is not provided" });
    return;
  }
  if (!price) {
    res.status(400).json({ error: "Price is not provided" });
    return;
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
    res.status(404).json("name is not provided");
    return;
  }
  if (!price) {
    res.status(404).json("price is not provided");
    return;
  }
  let f_index = findProductID(Number(id));
  if (f_index === -1) {
    res.status(404).json("product not found");
    return;
  } else {
    products[f_index].name = name;
    products[f_index].price = Number(price);
  }
  res.json(`Product(${id}) updated Successfully`);
  console.log(products);
});

app.delete("/products/:id", (req, res) => {
  let { id } = req.params;
  if (isNaN(id)) {
    res.status(400).json("Invalid id");
  }
  let d_index = findProductID(Number(id));
  if (d_index === -1) {
    res.status(400).json("product not found");
  } else {
    products.splice(d_index, 1);
    res.json("Product Deleted Successfully");
    console.log(products);
  }
});
app.listen(4007, () => {
  console.log("listening on 4001 port");
});
