const mongoose = require('mongoose')
const {Schema} = mongoose
const Joi = require ("joi")

const employeeSchema = new Schema({
    firstName: { type: String, required: true },
    middleName: { type: String, default: "" },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    contactNo: { type: String, default: true },
    gender: { type: String, required: true },
    dateofBirth: { type: Date, required: true },
    religion:{type: String, required: true},
    nationality: {type: String, required: true},
    stateOfOrigin: {type: String, required: true},
    maritalStatus: {type: String, required: true},
    Photo: { type: String },
    permanentAddress: { type: String },
    presentAddress: { type: String },
    emergencyContactNo: { type: String },
    hobbies: { type: String },
    position: {type: String, default: ""},
    department: { type: String, required: true},
    salary: { type: String, default:""},
    education: { type: String, required: true},
    leaveApplication: { type: String, default: ""}
  });

const Employee = mongoose.model('Employee', employeeSchema);

const EmployeeValidation = (employee) =>{
const schema = Joi.object({
  firstName: Joi.string().min(3).max(35).required(),
  middleName: Joi.string().min(3).max(35).required(),
  lastName: Joi.string().min(2).max(35).required(),
  email: Joi.string().min(6).max(200).required().email(),
  password: Joi.string().min(8).max(20).required(),
  confirmPassword: Joi.string().required().valid(Joi.ref("password")),
  contactNo: Joi.string().max(11).required(),
  gender: Joi.string().min(2).max(100).required(),
  dateofBirth: Joi.date().required(),
  //photo
  }).unknown();

  return schema.validate(employee)
};

module.exports = {
Employee,
EmployeeValidation
};