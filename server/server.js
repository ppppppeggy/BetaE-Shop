console.log("app get node mongodb mongoose");
const express = require("express");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
const Item = require("./models/product");

// const url = "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.1.1";

// async function main() {
//   await mongoose.connect("mongodb://127.0.0.1:27017/test");
// }
const port = 80;
const app = express();

mongoose
  .connect("mongodb://127.0.0.1:27017/labdb")
  .then(() => {
    console.log("succeed");
    app.listen(port, () => {
      console.log(`Running on http://localhost:${port}`);
    });
  })
  .catch((err) => console.log(err.name));

// app先使用cors連結product data
app.use(cors());

app.get("/api/productlist/:id", (req, res) => {
  console.log("id", req.params.id);
  let sort = 1;

  if (req.params.id === "sale") {
    return Item.find({ sale: { $gt: 0 } })
      .sort({ createdAt: sort })
      .then((response) => res.send(response))
      .catch((err) => console.log(err));
  }
  if (req.params.id === "new") {
    sort = -1;
  }
  Item.find()
    .sort({ createdAt: sort })
    .then((response) => res.send(response))
    .catch((err) => console.log(err));
});

// 新增data
// const dataToAdd = {
//   name: "外搭背心",
//   category: "Top",
//   image: "/images/p15.jpg",
//   price: 350,
//   sale: 250,
//   size: { F: 10 },
// };

// app.get("/productlist/:id/trial-version", (req, res) => {
//   const ItemToAdd = new Item(dataToAdd);
//   ItemToAdd.save()
//     .then(() => {
//       res.send(ItemToAdd);
//     })
//     .catch((err) => res.send(err));
// });
