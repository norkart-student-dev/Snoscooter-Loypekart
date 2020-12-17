const mongoose = require('mongoose')

const trackSchema = new mongoose.Schema({
  _id:{
    type: String,
    required: true
  },
  type: {
      type: String,
      enum: ['Feature'],
      required: true
  },
  properties: {
    type: Object,
    required: true,
    MIDL_STENGT:{
      type:Boolean
    }
  },
  geometry: {
    type: {
      type: String,
      enum: ['LineString'],
      required: true
    },
    coordinates: {
      type: [[Number]], // Array of arrays of arrays of numbers
      required: true
    }
  }
  
})

module.exports = mongoose.model('tracks', trackSchema)