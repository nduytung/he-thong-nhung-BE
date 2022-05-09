const express = require("express");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TempSchema = new Schema({
  celcius: {
    type: Number,
    required: true,
  },
  fahrenheit: {
    type: Number,
    required: true,
  },
  updatedAt: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("temp", TempSchema);
