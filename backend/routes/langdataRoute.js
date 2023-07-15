const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/", async (req, res) => {
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
    url: "https://judge0-ce.p.rapidapi.com/languages",
    headers: {
      "X-RapidAPI-Key": "e05b012b86msh66e2b351b7aba3cp10f0f9jsn95e4adfbca74",
      "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    // console.log(response.data);
    res.json({ langs: response.data, msg: "get langs success" });
    return;
  } catch (error) {
    console.error(error);
  }
  res.json({ langs: [], msg: "get langs failed" });
});

module.exports = router;
