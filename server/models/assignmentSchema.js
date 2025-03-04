const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  dueDate: { type: Date, required: true },
  submitted: { type: Boolean, default: false },
  githubRepo: { type: String }, // Link to the GitHub repository
  deployedLink: { type: String }, // Link to the deployed application
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
});

module.exports = mongoose.model("Assignment", assignmentSchema);
