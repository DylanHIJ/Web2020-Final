const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Creating a schema, sort of like working with an ORM
const CourseSchema = new Schema({
  info: {
    name: {
      type: String,
      required: [true, "Name field is required."],
    },
    teacher: {
      type: String,
      required: [true, "Teacher field is required."],
    },
    describe: {
      type: String,
      required: [true, "Discribe field is required."],
    },
    classTime: {
      type: String,
      required: [true, "Class Time field is required."],
    },
    classroom: {
      type: String,
      required: [true, "Class Room field is required."],
    },
    // required: [true, "info field is required."],
  },
  TAs: {
    type: Array,
    required: [true, "TA(ID) field is required."],
  },
  students: {
    type: Array,
    required: [true, "Student(ID) field is required."],
  },
  assignments: {
    type: Array,
    required: [true, "Assignment(ID) field is required."],
  },
});

// Creating a table within database with the defined schema
const Course = mongoose.model("course", CourseSchema);

// Exporting table for querying and mutating
module.exports = Course;
