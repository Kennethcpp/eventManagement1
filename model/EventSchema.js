
const mongoose = require("mongoose")
const authentication = require("./userSchema")
const timestamp = require("timestamp")


// Define schema for Event
const EventSchema = new mongoose.Schema({
       
    title: {
      type: String,
      require: true
     
    },
    description: {
      type: String,
      require: true
    },
    date: {
      type: Date,
      require: true
    },
    location: {
      type: String,
     
    },
    organizer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      require: true
    },
    participants: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],
    rsvps: [{
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      response: {
        type: String,
        enum: ['yes', 'no', 'maybe']
      }
    }],
    created_at:{
      type: Date,
      default: Date.now,
      }
  });
     

      



const startevent = new mongoose.model("startevent", EventSchema)

module.exports = startevent
 