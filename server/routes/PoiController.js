const express = require('express')
const { poi } = require('../models')
const router = express.Router()
const db = require('../models')

// Getting all points of interest
router.get('/', async (req, res) => {
  let index = parseInt(req.query.index)
  let limit = 500;
  let pois = await db.poi.findAll({ offset: index, limit: limit, })
  let nextIndex = null;
  if (pois.length > 0) {
    nextIndex = index + limit
  }
  res.status(200).send({ data: pois, nextIndex: nextIndex })
})


// Getting one point of interest
router.get('/:id', (req, res) => {
  const id = req.params.id;

  db.poi.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Point of Interest with id=" + id
      });
    });
})

// Creating one point of interest
router.post('/', async (req, res) => {
  const poi = {
    name: req.body.name,
    type: req.body.type,
    komnr: req.body.komnr,
    info: req.body.info,
    location: req.body.location
  };

  db.poi.create(poi)
    .then(data => {
      res.status(201).send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Poi."
      });
    });
})

// Updating one point of interest
router.patch('/:id', async (req, res) => {
  let id = req.params.id
  db.poi.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.status(201).send({
          message: "Point of Interest was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Point of Interest with id=${id}. Maybe Point was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Point of Interest with id=" + id
      });
    });
})


router.post('/clear', async (req, res) => {
  console.log("cake")
  let kode = req.query.kode;

  if (kode === "slettalle") {
    poi.destroy({
      where: {},
      truncate: true
    });
    res.status(200).send()
  }
  else {
    res.status(403).send
  }
})

// Deleting one point of interest
router.delete('/:id', async (req, res) => {
  let id = req.params.id
  db.poi.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.status(201).send({
          message: "Point of Interest was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Point of Interest with id=${id}. Maybe Point was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Point of Interest with id=" + id
      });
    });
})

module.exports = router