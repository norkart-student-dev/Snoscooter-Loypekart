const express = require('express')
const router = express.Router()
const PoI = require('../models/poiSchema')

// Getting all points of interest
router.get('/', async (req, res) => {
  try {
    const pois = await PoI.find()
    res.json(pois)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})
 
// Getting one point of interest
router.get('/:id', getPoi, (req, res) => {
  res.json(res.poi)
})
 
// Creating one point of interest
router.post('/', async (req, res) => {
  if(req.session.loggedIn) {
    const poi = new PoI({
      name: req.body.name,
      type: req.body.type,
      location: req.body.location
    })
    
    try {
      const newPoi = await poi.save()
      res.status(201).json(newPoi)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  }
  else {
    res.status(503).send();
  }
})
 
// Updating one point of interest
router.patch('/:id', getPoi, async (req, res) => {
  if(req.session.loggedIn) {
    if (req.body.name != null) {
      res.poi.name = req.body.name
    }

    if (req.body.type != null) {
      res.poi.type = req.body.type
    }
    if (req.body.location != null) {
      res.poi.location = req.body.location
    }
    try {
      const updatedPoi = await res.poi.save()
      res.status(201).json(updatedPoi)
    } catch(err) {
      res.status(400).json({ message: err.message })
    }
  }
  else {
    res.status(503).send();
  }
})
 
// Deleting one point of interest
router.delete('/:id', getPoi, async (req, res) => {
  if (req.session.loggedIn) {
    try {
      await res.poi.remove()
      res.status(201).json({ message: 'Deleted This Point of Interest' })
    } catch(err) {
      res.status(500).json({ message: err.message })
    }
  }
  else {
    res.status(503).send();
  }
})

// Middleman function for finding poi by id
async function getPoi(req, res, next) {
  try {
    poi = await PoI.findById(req.params.id)
    if (poi == null) {
      return res.status(404).json({ message: 'Cant find poi'})
    }
  } catch(err){
    return res.status(500).json({ message: err.message })
  }

  res.poi = poi
  next()
}

module.exports = router