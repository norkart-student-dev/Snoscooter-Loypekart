const express = require('express')
const testData = require('../wfs_respons.json')
const Track = require('../models/trackSchema')
const router = express.Router()

// Getting all points of interest
router.get('/', async (req, res) => {
    try {

      //console.log(testData)
      const tracks = testData.features.map((item,index) => (
        new Track({
          _id: item.properties.LOKALID,
          type: item.type,
          properties: item.properties,
          geometry: item.geometry
        })
      ));
      
      tracks.forEach((item, index) => {
          item.save().then((doc) => {console.log(doc)}, (err) =>(console.log('woop')))

      })

    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  })

module.exports = router