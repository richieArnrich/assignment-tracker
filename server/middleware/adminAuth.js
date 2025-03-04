const jwt = require("jsonwebtoken");
const JWT_SECRET = "mySecretKey";

const adminAuth = (req, res, next) => {
  const token = req.cookies.token;
  console.log(req.cookies);
  if (!token) return res.status(401).json({ error: "Unauthorized access" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.role !== "admin")
      return res.status(403).json({ error: "Forbidden" });

    req.admin = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = adminAuth;
