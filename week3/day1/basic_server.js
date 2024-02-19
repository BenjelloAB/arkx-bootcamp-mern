const express = require("express");

const port = 4000
const app = express();
app.get("/", (req, res) => {
    console.log("On the Front Page");
    res.send("Welcome to my Express server! ");
})
app.listen(port, () =>{
    console.log("We are listening");
    console.log(`http://localhost:${port}`);
})