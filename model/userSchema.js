

const mongoose = require("mongoose")
const bson = require("bson")

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['auser', 'admin'],
    default: 'user'
  }
});
   

const authentication = new mongoose.model("authentication", userSchema)

module.exports = authentication