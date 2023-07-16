const asyncHandler = require("express-async-handler");
const Token = require("../models/tokenModel");

const getPrevCodes = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { userID } = req.body;

  const userExists = await Token.findOne({ userID });
  if (userExists) {
    res.json({ prevCodes: userExists.token, success: true });
  } else {
    res.json({ prevCodes: [], success: false });
  }
});

module.exports = getPrevCodes;
