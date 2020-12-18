const mongoose = require('mongoose')
const { pointSchema } = require('../models/geoJsonSchema.js')



const poiSchema = new mongoose.Schema({
  name: String,
  type: {
    type: String,
    enum: ['Parkeringsplass', 'Rasteplass', 'Rasteplass med WC', 'Matservering', 'Teltplass'],
    required: true
  },
  comment: {
    type: String,
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  }
})

module.exports = mongoose.model('Points_of_Interest', poiSchema)