const mongoose = require('mongoose')

const pointSchema = new mongoose.Schema({
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
});

const polygonSchema = new mongoose.Schema({
  type: {
      type: String,
      enum: ['Polygon'],
      required: true
  },
  coordinates: {
      type: [[[Number]]], // Array of arrays of arrays of numbers
      required: true
  }
});

module.exports = {
    pointSchema: mongoose.model('pointSchema', pointSchema),
    polygonSchema: mongoose.model('pointSchema', pointSchema)
}