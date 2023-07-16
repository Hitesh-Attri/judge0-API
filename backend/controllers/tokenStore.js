const Token = require("../models/tokenModel");
const User = require("../models/userModel");

const tokenStore = async (userID, token) => {
  const userExists = await Token.findOne({ userID });
  let codeData;
  if (userExists) {
    userExists.token.push(token);
    userExists.save();
  } else {
    codeData = await Token.create({
      userID,
      token: [token],
    });
  }

  if (codeData) {
    console.log("token stored");
  } else {
    console.log("token not store, some error occured");
  }
  return;
};

module.exports = tokenStore;
