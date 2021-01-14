const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Creating a schema, sort of like working with an ORM
const AssignmentSchema = new Schema({
  name: {
    type: Array,
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
  problem: {
    type: Array,
    required: [true, "problem field is required."]
  }
});

// Creating a table within database with the defined schema
const Assignment = mongoose.model("assignment", AssignmentSchema);

// Exporting table for querying and mutating
module.exports = Assignment;
