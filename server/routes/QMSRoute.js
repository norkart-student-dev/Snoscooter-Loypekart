
const axios = require('axios')
const express = require('express');
const router = express.Router();

const webqmsapi = "http://www.webatlas.no/qms11-test/QMSWebApiService.svc/json/";
const portalStr = "Portal=Portal_scooter";
const taskStr = "Task=Scooter_1824";

router.get('/test', async(req, res) => {
    console.log("test router qms!");
    res.send("test qms");
})

router.post('/login', async(req, res) => {
  const user = req.body.username;
  const password = req.body.password;
  try {
    const url = webqmsapi + "Login?" +
      portalStr + "&" +
      "User=" + user + "&" +
      "Pass=" + password;

    let config = {
      method: "get",
      url :  url,
     }
    let response = await axios(config);
    console.log(response);
    res.send(response);
  }
  catch(err) {
    console.log("An error occured when logging in");
    console.log(err);
    res.send(false);
  }
});

router.post('/getFeatureType', async(req, res) =>{
  const username = req.body.username;
  const password = req.body.password;
  const featureType = req.body.featureType;
  try {
    const url = webqmsapi + "GetFeatureType?" +
      portalStr + "&" +
      taskStr + "&" +
      "User=" + user + "&" +
      "Pass=" + password + "&" +
      "FeatureType=" + featureType;

    let config = {
      method: "get",
      url :  url,
    }

    let response = await axios(config);
    res.send(response);
  }
  catch(err) {
    res.send(false);
    console.log("An error occured when attempting to acquire feature type");
  }
});

//extracts feature and opens up for editing by current user only, use unlcockFeature to release
router.post('/checkoutFeature', async(req, res) =>{
  const username = req.body.username;
  const password = req.body.password;
  const featureID = req.body.featureID;
  try {
    const portalStr = ""; 
    const url = webqmsapi + "CheckoutFeature?" +
      portalStr + "&" +
      taskStr + "&" +
      "User=" + username + "&" +
      "Pass=" + password + "&" +
      "id=" + featureID;
      
    let config = {
      method: "get",
      url :  url,
    }

    let response = await axios(config);
    res.send(response);
  }
  catch(err) {
    res.send(false);
    console.log("An error occured when attempting to checkout feature");
  }
});

//unlock feature, use after checkout to release feature for checking out by other users
router.post('/unlockFeature', async(req, res) =>{
  const username = req.body.username;
  const password = req.body.password;
  const featureID = req.body.featureID;
  try {
    const portalStr = ""; 
    const url = webqmsapi + "UnlockFeature?" +
      portalStr + "&" +
      taskStr + "&" +
      "User=" + username + "&" +
      "Pass=" + password + "&" +
      "id=" + featureID;
    let config = {
      method: "get",
      url :  url,
    }
    let response = await axios(config);
    res.send(response);
  }
  catch(err) {
    res.send(false);
    console.log("An error occured when attempting to unlock feature");
  }
});

//extract all info on object without any updates
router.post('/getFeature', async(req, res) =>{
  const username = req.body.username;
  const password = req.body.password;
  const featureID = req.body.featureID;
  try {
    const portalStr = ""; 
    const get_url = webqmsapi + "GetFeature?" +
      portalStr + "&" +
      taskStr + "&" +
      "User=" + username + "&" +
      "Pass=" + password + "&" +
      "id=" + featureID;
    let config = {
      method: "get",
      url :  url,
    }
    let response = await axios(config);
    res.send(response);
  }
  catch(err) {
    res.send(false);
    console.log("An error occured when attempting to acquire feature type");
  }
});

router.post('/checkinFeature', async(req, res) =>{
  const username = req.body.username;
  const password = req.body.password;
  const featureID = req.body.featureID;
  const json_feature = req.body.json_feature;
  try {
    const portalStr = ""; 
    const url = webqmsapi + "CheckinFeature?" +
      portalStr + "&" +
      taskStr + "&" +
      "User=" + username + "&" +
      "Pass=" + password + "&" +
      "id=" + featureID + "&" +
      "sJson=" + json_feature;
    let config = {
      method: "post",
      url :  url,
    }
    let response = await axios(config);
    res.send(response);
  }
  catch(err) {
    res.send(false);
    console.log("An error occured when attempting to checkin feature");
  }
});

router.post('/saveNewFeatureP', async(req, res) => {
  try {

  }
  catch (err) {
    res.send(false);
    console.log("An error occured while saving new feature");
  }
  
});

router.post('/deleteFeature', async(req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const featureID = req.body.featureID;
  try {
    const url = webqmsapi + "DeleteFeature?" +
      portalStr + "&" +
      taskStr + "&" +
      "User=" + username + "&" +
      "id" + featureID;
    let config = {
      method: "get",
      url :  url,
    }
    let response = await axios(config);
    res.send(response);
  }
  catch(err) {
    res.send(false);
    console.log("An error occured while deleting feature");
  }
})

router.post('/getObjectInfo', async(req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    const url = webqmsapi + "DoCommand?Command=GetObjectInfo," //unfinished, need to calrify docs  
  }
  catch(err) {
    res.send(false);
    console.log("An error occured while getting object info");
  }
})

module.exports = router;