const express = require('express')
const testData = require('../wfs_respons.json')
const Track = require('../models/trackSchema')
const router = express.Router()

// Getting all points of interest
router.get('/', async (req, res) => {
    try {



      const tracksRes = await Track.find()
      res.status(200).json(tracksRes)

    } catch (err) {
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