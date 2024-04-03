const mongoose = require("mongoose");

//定義dataType(資料模型Schema)
const memberSchema = new mongoose.Schema(
  {
    account: {
      type: String,
      required: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    password: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          // 密码至少包含 8 到 12 位字符，并且包含至少一个数字和一个字母
          return /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,12}$/.test(value);
        },
        message: "密码必须为 8 至 12 位的英文和数字组合",
      },
    },
  },
  { timestamps: true, collection: "customer" }
);

// 創建模型 -> 將Schema轉化為Model取得操作資料庫方法
const memberModel = mongoose.model("Member", memberSchema);

module.exports = memberModel;
