
const axios = require('axios')
const express = require('express');
const router = express.Router();

const webqmsapi_login = "https://privva-qms11-app.norkart.no/QMSWebAPI/QMSWebApiService.svc/json/";
const portalStr = "Portal=Portal_scooter";

router.post('/login', async (req, res) => {
  if (req.session.loggedIn !== true) {
    const user = req.body.username;
    const password = req.body.password;
    try {
      const url = webqmsapi_login + "Login?" +
        portalStr + "&" +
        "User=" + user + "&" +
        "Pass=" + password;

      let response = await axios.get(url);
      let valid_str = "{\"result\":\"ok\"";
      if (response.data.startsWith(valid_str)) {
        req.session.loggedIn = true;
        res.status(200).send(true);
      }
      else {
        res.status(403).send(false);
      }

    }
    catch (err) {
      console.log("An error occured when logging inn");
      console.log(err);
      res.status(500).send(false);
    }
  } else {
    res.send("Allerede logget inn")
  }
});


router.post('/logout', async (req, res) => {
  try {
    req.session.loggedIn = false;
    res.status(200).send()
  }
  catch (err) {
    console.log(err);
    res.status(500).send()
  }
})

router.get('/isLoggedIn', async (req, res) => {
  try {
    if (req.session.loggedIn === true) {
      res.status(200).send(true);
    } else {
      res.status(200).send(false);
    }
  }
  catch (error) {
    console.log(error);
    res.status(500).send();
  }
})

module.exports = router;