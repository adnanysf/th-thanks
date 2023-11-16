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

const Thanks = mongoose.model('Thanks', ThankSchema);

module.exports = Thanks;