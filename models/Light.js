const express = require("express");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LightSchema = new Schema({
  light: {
    type: Number,
    required: true,
  },
  uv: {
    type: Number,
    required: true,
  },
  windDensity: {
    type: Number,
    required: true,
  },
  updatedAt: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("light", LightSchema);
