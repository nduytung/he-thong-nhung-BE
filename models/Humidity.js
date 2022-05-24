const express = require("express");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HumiditySchema = new Schema({
  humidity: {
    type: Number,
    required: true,
  },
  updatedAt: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("humi", HumiditySchema);
