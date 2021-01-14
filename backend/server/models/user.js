const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Creating a schema, sort of like working with an ORM
const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name field is required."],
  },
  email: {
    type: String,
    required: [true, "Email field is required."],
  },
  studentCourse: {
    type: Array,
    required: [true, "Student Course field is required."],
  },
  teacherCourse: {
    type: Array,
    required: [true, "Teacher Course field is required."],
  },
  password: {
    type: String,
    required: [true, "Password field is required"],
  },
});

// Creating a table within database with the defined schema
const User = mongoose.model("user", UserSchema);

// Exporting table for querying and mutating
module.exports = User;
