const mongoose = require("mongoose");

//定義dataType(資料模型Schema)
const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    sale: {
      type: Number,
    },
    size: {
      type: Object,
    },
  },
  { timestamps: true, collection: "product" }
);

// 創建模型 -> 將Schema轉化為Model取得操作資料庫方法
const itemModel = mongoose.model("Item", itemSchema);

module.exports = itemModel;
