const express = require('express')
const testData = require('../skuterkort.json')
const router = express.Router()

// Getting all points of interest
router.get('/', async (req, res) => {
    try {
      res.json(testData)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  })

module.exports = router