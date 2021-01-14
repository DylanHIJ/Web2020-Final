const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Creating a schema, sort of like working with an ORM
const GradeSchema = new Schema({
  user: {
    type: Number,
    required: [true, "User(ID) field is required."],
  },
  course: {
    type: Number,
    required: [true, "Course(ID) field is required."],
  },
  grade: {
    type: Number,
    required: [true, "Grade field is required."],
  },
  answer: {
    type: Array,
    required: [true, "Answer field is required."],
  },
  name: {
    type: String,
    required: [true, "Assignment name field is required."],
  },
});

// Creating a table within database with the defined schema
const Grade = mongoose.model("grage", GradeSchema);

// Exporting table for querying and mutating
module.exports = Grade;
