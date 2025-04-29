const express = require("express");

const app = express();

//routing
app.get("/", (req, res) => {
  res.send("Hola mundo");
});

app.get("/ecommerse", (req, res) => {
  res.send("este es el ecommerce");
});

app.get("/blog", (req, res) => {
  res.send("este es el blog");
});

app.listen(4000, () => {
  console.log("Servidor funcionando");
});
