const express = require("express");
const routes = require("./routes/postRoutes");
const app = express();

app.use(express.json());

app.use((req, res, next) => 
{
    const now = new Date().toString()
    console.log(req.method+" "+req.path+" "+now);
    next();

});


app.use(routes);



app.use((err, req, res, next) => {
    console.log("ERROR : ", err);
    res.status(404).json(err.message);
});



app.listen(6001, () => {
  console.log("Server is listening on port 6001");
});
