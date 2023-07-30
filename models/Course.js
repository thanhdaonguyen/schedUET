const mongoose = require("mongoose");

const Schedule = new mongoose.Schema({
  day: {
    type: String,
    required: [true, "must provide day time"],
  },
  start: {
    type: Number,
    required: [true, "must provide start time"],
    min: 1,
    max: 15,
  },
  end: {
    type: Number,
    required: [true, "must provide start time"],
    min: 1,
    max: 15,
  },
  group: {
    type: Number,
    required: [true, "must provide group session"],
    min: 0,
  },
  location: {
    type: String,
    required: [true, "must provide location"],
  },
});
const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "must provide name"],
    trim: true,
  },
  code: {
    type: String,
    required: [true, "must provide id"],
    trim: true,
  },
  credits: {
    type: Number,
    required: [true, "must provide credit"],
  },
  instructor: {
    type: String,
  },
  schedule: {
    type: [Schedule],
    required: [true, "must provide schedule"],
  },
});

module.exports = CourseSchema;
