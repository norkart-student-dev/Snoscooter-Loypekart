const express = require('express')
const router = express.Router()
const axios = require('axios')
const Track = require('../models/trackSchema')
const wfs_scooter_url = "http://www.webatlas.no/wms-qms11_vafelt_wfs/?SERVICE=WFS&REQUEST=GetFeature&typeNames=QMS_VA_FELT:SCOOTERLOYPER_1824"
const output_format = "json" // default to json, also supports GML and XML
const db = require('../models')
// Getting all tracks
router.get('/', async (req, res) => {
  try {
    const url = wfs_scooter_url + "&outputFormat=" + output_format;
    let config = {
      method : "get",
      url : url
    }
    const response = await axios(config);
    const verifyNonEmpty = await db.tracks.findOne();
    let tracks;
    if (verifyNonEmpty === null) {
      console.log("Database is empty, load from wfs");
      response.data.features.map((item,index) => (
        db.tracks.create({
          lokalID: item.properties.LOKALID,
          MIDL_STENGT : item.properties.MIDL_STENGT,
          coordinates: item.geometry.coordinates,
          KOMMENTAR : item.properties.KOMMENTAR,
          properties : item.properties
        })
      ));
    }
    tracks = await db.tracks.findAll();
    console.log(tracks)
    res.status(200).json(tracks)

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
    let coordinates = [...res.track.coordinates]
    console.log(coordinates);
    // find splittig coordinate
    let index = coordinates.findIndex((item) => (item[0] === split[0] && item[1] === split[1]))

    res.track.coordinates = coordinates.slice(0, index+1)

    const track1 = await db.tracks.create({
      coordinates : res.track.coordinates,
      MIDL_STENGT : null,
      KOMMENTAR : "",
      lokalID : ""
    })

    const track2 = await db.tracks.create({
      coordinates : coordinates.slice(index, coordinates.length),
      MIDL_STENGT : null,
      KOMMENTAR : "",
      lokalID : ""
    })

    res.status(201).json([track1, track2])
  }
  else {
    res.status(403).send();
  }
})

// Updating one track
router.patch('/:id', getTrack, async (req, res) => {
  if (req.session.loggedIn) {
    if ((req.body.MIDL_STENGT != null) && (req.body.KOMMENTAR != null)) {
      res.track.MIDL_STENGT = req.body.MIDL_STENGT
      try {
        const updatedTrack = await db.tracks.update({MIDL_STENGT : req.body.MIDL_STENGT}, {
          where : {
            id : res.track.id
          }
        })
        res.status(201).json(updatedTrack)
      } catch(err) {
        console.log(err)
        res.status(400).json({ message: 'Could not update track properties.'})
      }
    }


  }
  else {
    res.status(403).send();
  }
})

// deletes the specified track and splits derived from it
router.delete('/:id', getTrack, async (req, res) => {
  let id = req.params.id.split('-')[0]
  console.log(id)
  try {
    await db.tracks.destroy({where : {id : id}})
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
    // track = await Track.findById(req.params.id)
    track = await db.tracks.findByPk(req.params.id)
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