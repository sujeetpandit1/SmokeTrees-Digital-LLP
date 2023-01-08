const mongoose = require('mongoose')

const addressSchema = new mongoose.Schema({
    
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
      required: true,
      trim: true
    },
    address: {
      type: String,
      required: true,
      trim: true
    },
    city: {
      type: String,
      required: true, 
      trim: true
    },
    state: {
      type: String,
      required: true,
      trim: true
    },
    pinCode: {
      type: String,
      required: true,
      length: 6,
      trim: true
    }
  }, {timestamps: true});
  
 
  module.exports= mongoose.model('Addresses', addressSchema);