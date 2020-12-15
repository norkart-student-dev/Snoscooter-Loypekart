const express = require('express')
const router = express.Router()
const axios = require('axios')

const wfs_scooter_url = "http://www.webatlas.no/wms-qms11_vafelt_wfs/?SERVICE=WFS&REQUEST=GetFeature&typeNames=QMS_VA_FELT:SCOOTERLOYPER_1824"
const output_format = "json" // default to json, also supports GML and XML

// Getting all points of interest
router.get('/', async (req, res) => {
    try {
      const url = wfs_scooter_url + "&outputFormat=" + output_format;
      let config = {
        method : "get",
        url : url
      }
      let response = await axios(config);
      console.log(response);
      res.send(response.data)
    } catch (err) {
      console.log(err);
      res.send(err)
      // res.status(500).json({ message: err.message })
    }
  })

module.exports = router