console.log("app get node mongodb mongoose");
const express = require("express");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
const Item = require("./models/product");
const Member = require("./models/customer");
const session = require("express-session");

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

app.use(express.json());

app.use(
  session({
    secret: "userinfo1073298516114", // 用於簽署 session ID 的密鑰，可以是一個字串或一個數組
    resave: false, // 是否每次請求都重新保存 session，建議設置為 false
    saveUninitialized: true, // 是否保存未初始化的 session
  })
);
app.get("/api/logout", (req, res) => {
  console.log("Logout");
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
      return res.status(500).json({ success: true, message: "登出失敗！" });
    }
    res.status(200).json({ success: true, message: "登出成功！" });
  });
});

app.post("/api/login", (req, res) => {
  console.log(req.method, req.body);
  const { username, password } = req.body;

  Member.findOne({ account: username })
    .then((userInfo) => {
      if (userInfo.password === password) {
        // 密码匹配，验证通过，将用户名存储在会话中
        req.session.username = username;
        req.session.isLogin = true;
        return res.status(200).json({ success: true, message: "登入成功！" });
      } else {
        // 密码不匹配，返回错误
        res.status(401).json({ success: false, message: "密码不正确" });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "登入失敗",
      });
    });
});

app.post("/api/register", (req, res) => {
  const { username, password } = req.body;
  console.log("register", username, password);

  Member.findOne({ account: username }).then((response) => {
    if (response) {
      console.log(response);
      return res.status(402).json({ success: false, message: "用戶已存在" });
    }
    // 用户不存在，执行注册逻辑
    Member.create({ account: username, password: password })
      .then(() => {
        // 假设注册成功后自动登录
        req.session.username = username;
        req.session.isLogin = true;
        return res
          .status(200)
          .json({ success: true, message: "注册成功并登录！" });
      })
      .catch((err) => {
        return res
          .status(500)
          .json({ success: false, message: "注册失败：" + err.message });
      });
  });
});

// app.get("/cart", (req, res) => {
//   if (req.session.username) {
//     // continue
//   } else {
//     redirect("/login");
//   }
// });

// ===============================================

app.get("/api/productlist/:id", (req, res) => {
  console.log("id", req.params.id);
  let order = {};
  let limitCount = 0;
  if (["01", "02", "03", "04"].includes(req.params.id)) {
    order = { categoryId: req.params.id };
  }
  // status="new" || status="sale"
  if (req.params.id === "sale") {
    order = { sale: { $gt: 0 } };
  } else if (req.params.id === "new") {
    limitCount = 10;
  }

  Item.find(order)
    .sort({ createdAt: -1 })
    .limit(limitCount)
    .then((response) => res.send(response))
    .catch((err) => console.log(err));
});

app.post("/api/filterData", (req, res) => {
  const ids = req.body;
  console.log(ids);

  Item.find({ _id: { $in: ids } })
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

// app.get("/productlist/trial-version", (req, res) => {
// const ItemToAdd = new Item(dataToAdd);
// ItemToAdd.save()
//   .then(() => {
//     res.send(ItemToAdd);
//   })
//   .catch((err) => res.send(err));
// });
