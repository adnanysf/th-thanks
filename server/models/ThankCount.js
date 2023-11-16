const mongoose = require('mongoose');

const ThankSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  thankCount: {
    type: Number,
    default: 0
  },
  messages: {
    type: [String],
    default: []
  }
});

const Thank = mongoose.model('Thank', ThankSchema);

module.exports = Thank;