const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Creating a schema, sort of like working with an ORM
const GradeSchema = new Schema({
  email: {
    type: String,
    required: [true, "Email field is required."],
  },
  assignmentID: {
    type: String,
    required: [true, "Assignment ID field is required."],
  },
  grades: {
    type: Array,
    required: [true, "Grades field is required"],
  },
  answers: {
    type: Array,
    required: [true, "Answers field is required"],
  },
  graded: {
    type: Boolean,
    required: [true, "Graded or not field is required"],
  },
});

// Creating a table within database with the defined schema
const Grade = mongoose.model("grade", GradeSchema);

// Exporting table for querying and mutating
module.exports = Grade;
