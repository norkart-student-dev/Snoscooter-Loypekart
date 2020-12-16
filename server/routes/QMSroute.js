
const axios = require('axios')
const express = require('express');
const router = express.Router();

const webqmsapi_login = "https://privva-qms11-app.norkart.no/QMSWebAPI/QMSWebApiService.svc/json/";
const portalStr = "Portal=Portal_scooter";
const taskStr = "Task=Scooter_1824";

router.post('/login', async(req, res) => {
  const user = req.body.username;
  const password = req.body.password;
  try {
    const url = webqmsapi_login + "Login?" +
      portalStr + "&" +
      "User=" + user + "&" +
      "Pass=" + password;

    let config = {
      method: "get",
      url :  url,
     }
    let response = await axios(config);
    console.log(response.data[1]);
    console.log(response.data);
    let valid_str = "{\"result\":\"ok\"";
    if (response.data.startsWith(valid_str)) {
      res.send(true);
    }
    else {
      res.send(false);
    }
    
  }
  catch(err) {
    console.log("An error occured when logging in");
    console.log(err);
    res.send(false);
  }
});

module.exports = router;