const mongoose = require('mongoose')
const { pointSchema } = require('../models/geoJsonSchema.js')



const poiSchema = new mongoose.Schema({
  name: String,
  type: {
    type: String,
    enum: ['Parkeringsplass', 'Rasteplass', 'Rasteplass med WC', 'Matservering', 'Teltplass'],
    required: true
  },
  location: {
    type: pointSchema.schema,
    required: true
  }
})

module.exports = mongoose.model('Points_of_Interest', poiSchema)