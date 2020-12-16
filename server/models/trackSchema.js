const mongoose = require('mongoose')
const { polyLineSchema } = require('../models/geoJsonSchema.js')



const trackSchema = new mongoose.Schema({
  _id: String,
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
    type: polyLineSchema.schema,
    required: true
  }
  
})

module.exports = mongoose.model('tracks', trackSchema)