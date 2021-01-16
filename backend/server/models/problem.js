const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Creating a schema, sort of like working with an ORM
const ProblemSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name field is required."],
  },
  point: {
    type: Number,
    required: [true, "Point field is required."],
  },
  type: {
    type: String,
    required: [true, "Type field is required."],
  },
  statement: {
    type: String,
    required: [true, "Statement field is required."],
  },
  options: {
    type: Array,
    required: [true, "Option field is required."],
  },
  answers: {
    type: Array,
    required: [true, "Answer field is required."],
  },
  
});

// Creating a table within database with the defined schema
const Problem = mongoose.model("problem", ProblemSchema);

// Exporting table for querying and mutating
module.exports = Problem;
