const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: String, required: true },
  regNo: { type: String, required: true, unique: true },
  assignments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Assignment" }],
});

module.exports = mongoose.model("Student", studentSchema);
