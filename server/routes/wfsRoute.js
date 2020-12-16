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

      //console.log(testData)
      const tracks = response.data.features.map((item,index) => (
        new Track({
          _id: item.properties.LOKALID,
          type: item.type,
          properties: item.properties,
          geometry: item.geometry
        })
      ));
      
      tracks.forEach((item, index) => {
        console.log(item._id)
        Track.findById(item._id, function (err, docs) {
          if (!docs){
              item.save().then(
                (doc) => {console.log(doc)}, 
                (err) => {})
          }
        })
      })

      const tracksRes = await Track.find()
      res.status(200).json(tracksRes)

    }
    catch (err) {
      console.log(err);
      res.send(err)
      res.status(500).json({ message: err.message })
    }
  })

// Updating one track
router.patch('/:id', getTrack, async (req, res) => {
  if (req.body.MIDL_STENGT != null) {
    res.track.properties.MIDL_STENGT = req.body.MIDL_STENGT
  }
  try {
    res.track.markModified('properties')
    const updatedTrack = await res.track.save()
    res.status(201).json(updatedTrack)
  } catch(err) {
    res.status(400).json({ message: err.message })
  }

})

// Deleting one point of interest
router.delete('/', async (req, res) => {
  try {
    await Track.remove({})
    res.status(201).json({ message: 'Deleted all Tracks' })
  } catch(err) {
    res.status(500).json({ message: err.message })
  }
})

// Middleman function for finding track by id
async function getTrack(req, res, next) {
  try {
    track = await Track.findById(req.params.id)
    if (track == null) {
      return res.status(404).json({ message: 'Cant find track'})
    }
  } catch(err){
    return res.status(500).json({ message: err.message })
  }

  res.track = track
  next()
}

module.exports = router