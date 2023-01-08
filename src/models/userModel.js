const mongoose = require ('mongoose')

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim:true
      },
      email: {
        type: String,
        required: true,
        unique: true,
        trim:true
      },
      phone:{
        type: Number,
        required: true,
        length: 10,
        trim:true
      },
      DOB:{
        type: String, 
        required: true, 
        trim: true 
      },
      password: {
        type: String,
        required: true,
        trim:true
      }
    },{timestamps: true});

    module.exports = mongoose.model("Users", userSchema)

    
