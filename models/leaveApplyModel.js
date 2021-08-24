const mongoose = require('mongoose')
const {Schema} = mongoose
const Joi = require ("joi")

const leaveApplicationSchema = new Schema({
  Leavetype: { type: String, required: true },
  FromDate: { type: Date, required: true },
  ToDate: { type: Date, required: true },
  Reasonforleave: { type: String, required: true },
  Status: { type: String, required: true },
  employee: [{ type: mongoose.Schema.Types.ObjectId, ref: "Employee" }]
});


const leaveApplication = mongoose.model("LeaveApplication",leaveApplicationSchema);

const leaveApplicationValidation = Joi.object().keys({
  Leavetype: Joi.string()
    .max(100)
    .required(),

  FromDate: Joi.date().required(),
  ToDate: Joi.date().required(),
  Reasonforleave: Joi.string()
    .max(100)
    .required(),
  Status: Joi.number()
    .max(1)
    .required()
});


const EmployeeValidation = (employee) =>{
  const schema = Joi.object({
    leaveType: Joi.string().min(3).max(35).required(),
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
  leaveApplication,
  leaveApplicationValidation
  };