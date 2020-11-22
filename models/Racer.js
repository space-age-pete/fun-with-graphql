const { Schema, model } = require("mongoose");

const RacerSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  car: {
    type: String,
    required: true,
    unique: true,
  },
  wins: {
    type: Number,
    required: true,
    default: 0,
  },
});

module.exports = model("Racer", RacerSchema);

//better to use default = 0, or required = false?
