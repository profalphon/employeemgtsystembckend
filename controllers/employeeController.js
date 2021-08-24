const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  Employee
} = require("../models/employeeModel");
const {
  EmployeeValidation
} = require("../models/employeeModel")




// creating new users
exports.signUp = async (req, res, next) => {
  try {

    const {
      error
    } = EmployeeValidation(req.body);
    if (error) return res.send(error.details[0].message);

    let checkEmail = await Employee.findOne({
      email: req.body.email
    });
    if (checkEmail) {
      return res.json({
        status: "failed",
        msg: "E-mail already exists, try another one"
      });
    }

    let {
      email, firstName, middleName, lastName, password, confirmPassword, contactNo, gender, 
      dateofBirth, religion, nationality, stateOfOrigin, maritalStatus, photo, permanentAddress, 
      presentAddress, emergencyContactNo, position, hobbies, department, salary, education,  leaveApplication
    } = req.body;
    if (password !== confirmPassword) {
      return res.json({
        status: false,
        msg: "Please Confirm Password"
      });
      //Also check if the new user filled all the fields correctly
    } else if (!email || !firstName || !lastName || !password || !confirmPassword) {
      res.json("All fields are required. You need to fill all")
    } else {

      const hashedPassword = await bcrypt.hash(password, 10);
      password = hashedPassword;
      console.log(password);


      // Finally create the new user, and add to the array/list of users
      const newEmployee = {
        email, firstName, middleName, lastName, password, contactNo, gender, dateofBirth,
        religion, nationality, stateOfOrigin, maritalStatus, photo, permanentAddress,
        presentAddress, emergencyContactNo, position, hobbies, department, salary, education, leaveApplication
      };
      const createEmployee = await Employee.create(newEmployee);
      const id = createEmployee._id;
      // sign jwt token with user id as payload
      const token = jwt.sign({
        id
      }, process.env.JWT_SECRET, {
        expiresIn: `${process.env.JWT_EXPIRES_IN}`,
      });

      //push new user to database
      res.status(200).json({
        msg: `User successfully created`,
        token,
        data: {
          id: createEmployee._id,
          firstName: createEmployee.firstName,
          middleName: createEmployee.middleName,
          lastName: createEmployee.lastName,
          email: createEmployee.email,
          contactNo: createEmployee.contactNo,
          gender: createEmployee.gender,
          dateofBirth: createEmployee.dateofBirth,
          religion: createEmployee.religion,
          nationality: createEmployee.nationality,
          stateOfOrigin: createEmployee.stateOfOrigin,
          maritalStatus: createEmployee.maritalStatus,
          photo: createEmployee.photo,
          permanentAddress: createEmployee.permanentAddress,
          presentAddress: createEmployee.presentAddress, 
          emergencyContactNo: createEmployee.emergencyContactNo,         
          position: createEmployee.position,
          hobbies: createEmployee.hobbies,
          department: createEmployee.department,
          salary: createEmployee.salary,
          education: createEmployee.education,
          leaveApplication: createEmployee.leaveApplication       
        },
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "failed",
      error: err,
    });
    console.log(err);
  };
  next();
};

// // login for already created users
// exports.signIn = async (req, res) => {
//   const {email, password } = req.body;
//   const employee = employees.findOne({email: req.body.email});;
//   if (!employee) {
//     return res(404).json({ status: "error", error: "invalid email" });
//   };
//   try {
//   const validPassword = await bcrypt.compare(req.body.password, employee.employeePassword);
//   if (!validPassword) return res.status(400).send('Invalid Password.');

//   return res.json({ status: "ok", msg: "logged in", data: employees });
// } catch (err) {
//     res.status(400).send(err);
// };
// };


exports.updateInfo = async (req, res) => {
  try {
    if ((!req.body.email || !req.body.password))
      return res.status(404).json({
        status: "failed",
        message: "Please your email and password",
      });

    const employee = await Employee.findById(req.params.id);
    if (!employee)
      return res
        .status(404)
        .json({
          status: "failed",
          message: "Employee not found"
        });

    let {
      firstName, middleName, lastName, password, contactNo, gender, dateofBirth,
      religion, nationality, stateOfOrigin, maritalStatus, photo, permanentAddress,
      presentAddress, emergencyContactNo, position, hobbies, department, salary, education, leaveApplication
    } = req.body;
    if (firstName) employee.firstName = firstName;
    if (middleName) employee.middleName = middleName;
    if (lastName) employee.lastName = lastName;
    if (contactNo) employee.contactNo = contactNo;
    if (gender) employee.gender = gender;
    if (dateofBirth) employee.dateofBirth = dateofBirth;
    if (religion) employee.religion = religion;
    if (nationality) employee.nationality = nationality;
    if (stateOfOrigin) employee.stateOfOrigin= stateOfOrigin;
    if (maritalStatus) employee.maritalStatus = maritalStatus;
    if (photo) employee.photo = photo; 
    if (permanentAddress) employee.permanentAddress = permanentAddress;
    if (presentAddress) employee.presentAddress = presentAddress; 
    if (emergencyContactNo) employee.emergencyContactNo = emergencyContactNo; 
    if (position) employee.position = position; 
    if (hobbies) employee.hobbies = hobbies; 
    if (department) employee.department = department; 
    if (salary) employee.salary = salary; 
    if (education) employee.education = education; 
    if (leaveApplication) employee.leaveApplication = leaveApplication;
    // hash incoming password from req.body
    password = await bcrypt.hash(password, 12);
    if (password) employee.password = password;
    await employee.save();

    res.json({
      status: "success",
      message: "Profile updated successfully",
      employee
    });
  } catch (error) {
    console.log(error)
  }
};

// To get all created employees
exports.getAllEmployees = async (req, res, next) => {
  try {
    const employees = await Employee.find();

    res.status(200).json({
      status: "success",
      data: employees,
    });
  } catch (err) {
    console.log(err);
  }
  next();
};

// //To get single employee
exports.getSingleEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.findById(req.params.id);

    res.status(200).json({
      status: "success",
      data: employee,
    });
  } catch (err) {
    console.log(err);
  }
  next();
};

// Delete an employee
exports.deleteEmployee = async (req, res) => {
  let deleteEmployee = await Employee.findByIdAndDelete(req.params.id);
  if (!deleteEmployee) {
    return res.status(404).send(`Employee ${employeeId} not found`);
  } else {
    const employees = await Employee.find();
    //return only the remaining employees
    return res.json({
      msg: "The employee has been deleted.",
      remaining_employees: employees
    });
  }
};