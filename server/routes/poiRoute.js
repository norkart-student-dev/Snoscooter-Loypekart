const express = require('express')
const router = express.Router()
const db = require('../models')

// Getting all points of interest
router.get('/', async (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  
    db.poi.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving points of interest."
        });
      });
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
  if(req.session.loggedIn) {
    const poi = {
      name: req.body.name,
      type: req.body.type,
      comment: req.body.comment,
      location: req.body.location
    };

    db.poi.create(poi)
    .then(data => {
        res.status(201).send(data);
    })
    .catch(err => {
        res.status(500).send({
        message:
            err.message || "Some error occurred while creating the Tutorial."
        });
    });
  }
  else {
    res.status(503).send();
  }
})
 
// Updating one point of interest
router.patch('/:id', async (req, res) => {
  if(req.session.loggedIn) {
    const id = req.params.id;

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
  }
  else {
    res.status(503).send();
  }
})
 
// Deleting one point of interest
router.delete('/:id', async (req, res) => {
  if (req.session.loggedIn) {
    const id = req.params.id;

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
    }
  else {
    res.status(503).send();
  }
})

module.exports = router