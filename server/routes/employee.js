const router = require("express").Router();
const Employee = require("../db/models/employee");
const { z } = require("zod");

const employeeValidateSchema = z.object({
  f_Name: z.string(),
  f_Email: z.string().email(),
  f_Mobile: z.number(),
  f_Designation: z.string(),
  f_Gender: z.string(),
  f_Course: z.string(),
});

router.post("/create", async (req, res) => {
  try {
    const { f_Name, f_Email, f_Mobile, f_Designation, f_Gender, f_Course } =
      req.body;
    const employeeValidate = employeeValidateSchema.safeParse(req.body);
    if (!employeeValidate.success) {
      return res.status(400).json({ message: "Invalid inputs " });
    } else {
      const existingEmail = await Employee.findOne({ f_Email });
      if (existingEmail) {
        return res
          .status(400)
          .json({ message: "Email already exists. Try another one" });
      } else {
        const newEmployee = await Employee.create({
          f_Name,
          f_Email,
          f_Mobile,
          f_Designation,
          f_Gender,
          f_Course,
        });
        return res
          .status(201)
          .json({
            message: "Employee created successfully",
            id: newEmployee._id,
          });
      }
    }
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Internal server error", Error: error });
  }
});

router.get("/all", async(req,res)=> {
  try {
    const all_employees = await Employee.find();
    return res.status(200).json({ Employee_list: all_employees })
  } catch (error) {
    return res.status(400).json({ message: "Internal server error", Error: error}) 
  }
})

router.put("/edit/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { f_Name, f_Email, f_Mobile, f_Designation, f_Gender, f_Course } =
      req.body;
    await Employee.findByIdAndUpdate(id, {
      f_Name,
      f_Email,
      f_Mobile,
      f_Designation,
      f_Gender,
      f_Course,
    })
    return res.status(200).json({ message: "Employee details updated successfully"})
  } catch (error) {
    return res.status(400).json({ message: "Internal server error", Error: error})
  }
});

router.delete("/delete/:id", async(req,res) =>{
  try {
    const { id } = req.params;
    await Employee.findByIdAndDelete(id)
    return res.status(200).json({ message: "Employee details deleted successfully"})
  } catch (error) {
    return res.status(400).json({ message: "Internal server error", Error: error})
  }
})

module.exports = router;
