const mongoose = require('mongoose')

const poiSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  geojson: {
    type: String,
    required: true,
  }
})

module.exports = mongoose.model('Points_of_Interest', poiSchema)