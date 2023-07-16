const express = require("express");
const axios = require("axios");
const tokenStore = require("../controllers/tokenStore");

const router = express.Router();

router.post("/", async (req, res) => {
  console.log(req.body);

  // post code to judge0 api
  const options = {
    method: "POST",
    url: "https://judge0-ce.p.rapidapi.com/submissions",
    params: {
      base64_encoded: "true",
      wait: "true",
      fields: "*",
    },
    headers: {
      "content-type": "application/json",
      "Content-Type": "application/json",
      "X-RapidAPI-Key": "e05b012b86msh66e2b351b7aba3cp10f0f9jsn95e4adfbca74",
      "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
    },
    data: {
      language_id: req.body.langID,
      source_code: req.body.encodedCode,
      stdin: req.body.enchodedInput,
    },
  };

  axios
    .request(options)
    .then((response) => {
      // console.log(response.data);
      // const options2 = {
      //   method: "GET",
      //   url: `https://judge0-ce.p.rapidapi.com/submissions/${response.data.token}`,
      //   params: {
      //     base64_encoded: "true",
      //     fields: "*",
      //   },
      //   headers: {
      //     "X-RapidAPI-Key":
      //       "e05b012b86msh66e2b351b7aba3cp10f0f9jsn95e4adfbca74",
      //     "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
      //   },
      // };

      // axios
      //   .request(options2)
      //   .then((response2) => {
      //     console.log(response2.data, "code output");
      //     res.json({ output: response2.data, msg: "get output success" });
      //   })
      //   .catch((err) => {
      //     console.error(err);
      //   });
      res.json({ output: response.data, success: true });

      // call method to store in mongodb
      tokenStore(req.body.userID, response.data.token);

      return;
    })
    .catch((err) => {
      console.error(err);
      res.json({ output: null, success: false });
    });

  // const response2 = await axios.request;
});

module.exports = router;
