const router = require("express").Router();
const Admin = require("../db/models/admin");
const { z } = require("zod");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const adminValidateSchema = z.object({
  username: z.string(),
  password: z.string(),
});

router.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;
    const adminValidate = adminValidateSchema.safeParse(req.body);
    if (!adminValidate.success) {
      return res.status(400).json({ message: "Invalid inputs" });
    } else {
      const existingAdmin = await Admin.findOne({ username });
      if (existingAdmin) {
        return res.status(400).json({ message: "Username already exists" });
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = await Admin.create({
          username,
          password: hashedPassword,
        });
        const token = jwt.sign({ username }, process.env.JWT_KEY, {
            expiresIn: "2d",
        });
        console.log(token);
        return res.status(200).json({ id: newAdmin._id, token: token });
      }
    }
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Internal server error", Error: error });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const existingAdmin = await Admin.findOne({ username });
  if (!existingAdmin) {
    return res.status(400).json({ message: "Invalid credentials" });
  }
  bcrypt.compare(password, existingAdmin.password, (err, data) => {
    if (data) {
      const token = jwt.sign({ username }, process.env.JWT_KEY, {
        expiresIn: "2d",
      });
      return res.status(200).json({ id: existingAdmin._id, token: token });
    } else {
      return res.status(400).json({ message: "Invalid credentials" });
    }
  });
});

module.exports = router;
