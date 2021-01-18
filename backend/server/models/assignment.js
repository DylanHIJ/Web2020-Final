const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Creating a schema, sort of like working with an ORM
const AssignmentSchema = new Schema({
  courseID: {
    type: String,
    required: [true, "Course ID field is required."],
  },
  info: {
    name: {
      type: String,
      required: [true, "Name field is required."],
    },
    beginTime: {
      type: Date,
      required: [true, "Begin Time field is required."],
    },
    endTime: {
      type: Date,
      required: [true, "End Time field is required."],
    },
    weight: {
      type: Number,
      required: [true, "Weight field is required."],
    },
  },
  problems: {
    type: Array,
    required: [true, "Problem field is required."],
  },
});

// Creating a table within database with the defined schema
const Assignment = mongoose.model("assignment", AssignmentSchema);

// Exporting table for querying and mutating
module.exports = Assignment;
