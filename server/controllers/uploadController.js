const xlsx = require("xlsx");
const Student = require("../models/studentSchema");

const uploadStudents = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const workbook = xlsx.readFile(req.file.path);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const studentsData = xlsx.utils.sheet_to_json(sheet);

    const students = studentsData.map((s) => ({
      name: s["Student Name"],
      email: s["Email ID"],
      mobile: s["Mobile No"],
      regNo: s["Reg No"],
      assignments: [],
    }));

    await Student.insertMany(students);
    res.json({ message: "Students imported successfully!" });
  } catch (error) {
    console.error("Error uploading students:", error);
    res.status(500).json({ error: "Error processing file" });
  }
};

module.exports = { uploadStudents };
