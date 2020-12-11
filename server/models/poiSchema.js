const mongoose = require('mongoose')
console.log(require('../models/geoJsonSchema.js'))
const { pointSchema } = require('../models/geoJsonSchema.js')



const poiSchema = new mongoose.Schema({
  name: String,
  type: {
    type: String,
    enum: ['Parkeringsplass'],
    required: true
  },
  location: {
    type: pointSchema.schema,
    required: true
  }
})

module.exports = mongoose.model('Points_of_Interest', poiSchema)