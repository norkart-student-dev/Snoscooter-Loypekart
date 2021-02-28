const express = require('express')
const router = express.Router()
const axios = require('axios')
const wfs_scooter_url = "http://www.webatlas.no/wms-qms11_vafelt_wfs/?SERVICE=WFS&REQUEST=GetFeature&typeNames=QMS_VA_FELT:SCOOTERLOYPER_1824"
const output_format = "json" // default to json, also supports GML and XML
const db = require('../models')

async function loadTracks(reloading = false) {
  try {
    const url = wfs_scooter_url + "&outputFormat=" + output_format;
    let config = {
      method : "get",
      url : url
    }
    const response = await axios(config);
    await response.data.features.map((item, index) => {
      db.tracks.findOrCreate({
        where :  {
          LOKAL_ID : item.properties.LOKALID
        },
        defaults : {
          LOKAL_ID : item.properties.LOKALID,
          MIDL_STENGT : false,
          coordinates: item.geometry.coordinates,
          KOMMENTAR : item.properties.KOMMENTAR,
        }
      })
    })
  } catch(err) {
      console.log(err)
  }
}

async function reloadTracks() {
  try {
    const url = wfs_scooter_url + "&outputFormat=" + output_format;
    let config = {
      method : "get",
      url : url
    }

    const response = await axios(config);

    await response.data.features.map((item, index) => {
        db.tracks.findOrCreate({
          where :  {
            LOKAL_ID : item.properties.LOKALID
          },
          defaults : {
            LOKAL_ID : item.properties.LOKALID,
            MIDL_STENGT : false,
            coordinates: item.geometry.coordinates,
            KOMMENTAR : item.properties.KOMMENTAR,
          }
        })
    })    

    const dbLOKAL_IDs = await db.tracks.findAll({attributes : ['LOKAL_ID']})
    let dbIDs = []
    dbLOKAL_IDs.forEach(e => {dbIDs.push(e.LOKAL_ID)})

    let resIDs = []
    response.data.features.forEach(e => {resIDs.push(e.properties.LOKALID)})

    let outdatedTrackIDs = dbIDs.filter(x => !resIDs.includes(x)) //tracks in db, but not in response

    outdatedTrackIDs.forEach(id => {
      db.tracks.destroy({
        where : {
          LOKAL_ID : id
        }
      })
    })
  }
  catch(error) {
    console.log(error)
  }
}

router.get('/reload', async (req, res) => {
  try {
    await reloadTracks()
    res.status(200).send()
    console.log("successfully updated tracks")
  }
  catch(error) {
    res.status(err.response).send()
  }
})

// Getting all tracks
router.get('/', async (req, res) => {  
  try {
    const tracks = await db.tracks.findAll()
    res.status(200).json(tracks)

  }
  catch (err) {
    console.log(err)
    res.status(err.response.status).send()
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
      KOMMENTAR : "Splittet fra: " + res.track.LOKAL_ID,
      LOKAL_ID : res.track.LOKAL_ID,
      SPLITTED : true
    })


    const track2 = await db.tracks.create({
      coordinates : coordinates.slice(index, coordinates.length),
      MIDL_STENGT : null,
      KOMMENTAR : "Splittet fra: " + res.track.LOKAL_ID,
      LOKAL_ID : res.track.LOKAL_ID,
      SPLITTED : true
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
    console.log(req.body)
    console.log(req.body.MIDL_STENGT);
    if ((req.body.MIDL_STENGT != null) || (req.body.KOMMENTAR != null)) {
      try {
        const updatedTrack = await db.tracks.update(req.body, {
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
  if (req.session.loggedIn) {
    let id = req.params.id;
    try {
      const current_track = await db.tracks.findByPk(id);
      const current_lokal_id = current_track.LOKAL_ID;

      console.log("THE CURREN LOCAL ID IS " + current_lokal_id)

      const tracksToDelete = await db.tracks.destroy({
        where : {
          LOKAL_ID : current_lokal_id,
          SPLITTED : true
        }
      })      

      console.log("deleting tracks" + tracksToDelete)
      
      res.status(201).json({ message: 'Track deleted' })
    } 
    catch(err) {
      console.log(err)
      res.status(500).json({ message: 'Could not delete the specified track.'})
    }
  }
  else {
    res.status(403).send();
  }
})

// Middleman function for finding track by id
async function getTrack(req, res, next) {
  try {
    // track = await Track.findById(req.params.id)
    console.log("Getting track by ID: " + req.params.id)
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

module.exports = {router, loadTracks}