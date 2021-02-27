const express = require('express')
const router = express.Router()
const axios = require('axios')
const Track = require('../models/trackSchema')
const wfs_scooter_url = "http://www.webatlas.no/wms-qms11_vafelt_wfs/?SERVICE=WFS&REQUEST=GetFeature&typeNames=QMS_VA_FELT:SCOOTERLOYPER_1824"
const output_format = "json" // default to json, also supports GML and XML

// Getting all tracks
router.get('/', async (req, res) => {
  try {
    const url = wfs_scooter_url + "&outputFormat=" + output_format;
    let config = {
      method : "get",
      url : url
    }
    let response = await axios(config);

    const tracks = response.data.features.map((item,index) => (
      new Track({
        _id: item.properties.LOKALID,
        type: item.type,
        properties: item.properties,
        geometry: item.geometry
      })
    ));
    
    tracks.forEach((item, index) => {
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
    console.log(err)
    res.status(err.response.status).send();
  }
})

router.patch('/split/:id/:coords', getTrack, async (req, res) => {
  if (req.session.loggedIn) {
    //make array out of coords string
    let split = req.params.coords.split(',').map(item => Number(item))
    //copy original line coordinates
    let coordinates = [...res.track.geometry.coordinates]
    // find splittig coordinate
    let index = coordinates.findIndex((item) => (item[0] === split[0] && item[1] === split[1]))

    res.track.geometry.coordinates = coordinates.slice(0, index+1)
    res.track.markModified('geometry')

    const updatedTrack = await res.track.save()

    let counter = 0
    let doc = true
    while(doc){
      counter = counter + 1
      doc = await Track.exists({_id: res.track._id + '-' + counter})
    }

    let updatedTrack2 = new Track({
      _id: res.track._id + '-' + counter,
      type: 'Feature',
      properties: res.track.properties,
      geometry: res.track.geometry
    })

    updatedTrack2.geometry.coordinates = coordinates.slice(index, coordinates.length)
    updatedTrack2.markModified('geometry')
    updatedTrack2 = await updatedTrack2.save()
    res.status(201).json([updatedTrack, updatedTrack2])
  }
  else {
    res.status(403).send();
  }
})

// Updating one track
router.patch('/:id', getTrack, async (req, res) => {
  if (req.session.loggedIn) {
    if (req.body.MIDL_STENGT != null) {
      res.track.properties.MIDL_STENGT = req.body.MIDL_STENGT
    }
    if (req.body.KOMMENTAR != null) {
      res.track.properties.KOMMENTAR = req.body.KOMMENTAR
    }
    try {
      res.track.markModified('properties')
      const updatedTrack = await res.track.save()
      res.status(201).json(updatedTrack)
    } catch(err) {
      console.log(err)
      res.status(400).json({ message: 'Could not update track properties.'})
    }
  }
  else {
    res.status(403).send();
  }
})

// deletes the specified track and splits derived from it
router.delete('/:id', getTrack, async (req, res) => {
  let id = req.params.id.split('-')[0]
  
  try {
    let docs = await Track.find({_id: {$regex: id}}).deleteMany()
    res.status(201).json({ message: 'Track deleted' })
  } catch(err) {
    console.log(err)
    res.status(500).json({ message: 'Could not delete the specified track.'})
  }
})

// Deletes ALL Tracks
router.delete('/', async (req, res) => {
    try {
      await Track.remove({})
      res.status(201).json({ message: 'Deleted all Tracks' })
    } catch(err) {
      console.log(err)
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
    // console.log(err)
    console.log("error getting tracks")
    return res.status(500).json({ message: 'Could not find track with id: ' + req.params.id })
  }

  res.track = track
  next()
}

module.exports = router