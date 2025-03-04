const express = require("express");
const {
  registerAdmin,
  adminLogin,
  dashboard,
} = require("../controllers/adminController");
const adminAuth = require("../middleware/adminAuth");

const router = express.Router();

router.post("/registeradmin", registerAdmin);
router.post("/adminlogin", adminLogin);
router.get("/dashboard", adminAuth, dashboard);

module.exports = router;
