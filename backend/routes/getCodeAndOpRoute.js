const express = require("express");
const axios = require("axios");

const router = express.Router();

router.post("/", async (req, res) => {
  // const options = {
  //   method: "GET",
  //   url: "https://judge0-extra-ce.p.rapidapi.com/languages",
  //   headers: {
  //     "X-RapidAPI-Key": "e05b012b86msh66e2b351b7aba3cp10f0f9jsn95e4adfbca74",
  //     "X-RapidAPI-Host": "judge0-extra-ce.p.rapidapi.com",
  //   },
  // };

  const options = {
    method: "GET",
    url: `https://judge0-ce.p.rapidapi.com/submissions/${req.body.token}`,
    params: {
      base64_encoded: "true",
      fields: "*",
    },
    headers: {
      "X-RapidAPI-Key": "e05b012b86msh66e2b351b7aba3cp10f0f9jsn95e4adfbca74",
      "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    // console.log(response.data);
    res.json({ codeOpIp: response.data, success: true });
    return;
  } catch (error) {
    console.error(error);
  }
  res.json({ codeOpIp: null, success: false });
});

module.exports = router;
