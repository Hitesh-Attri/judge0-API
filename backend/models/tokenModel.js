const mongoose = require("mongoose");

const tokenSchema = mongoose.Schema(
  {
    userID: { type: String, required: true },
    token: { type: [String], required: true },
  },
  { timestamps: true }
);

const Token = mongoose.model("Token", tokenSchema);

module.exports = Token;
