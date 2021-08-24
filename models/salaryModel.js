const mongoose = require("mongoose")
const { Schema } = mongoose

const salarySchema = new mongoose.Schema({
    basicSalary: { type: Number, required: true },
    bankName: { type: String, required: true },
    accountNo: { type: String, required: true },
    employeeID: { type: String, required: true }
  });
  salarySchema.plugin(autoIncrement.plugin, {
    model: "Salary",
    field: "SalaryID"
  });
  
  const salary = mongoose.model("Salary", salarySchema);

  const salaryValidation = Joi.object().keys({
    BasicSalary: Joi.string()
      .max(20)
      .required(),
    BankName: Joi.string()
      .max(200)
      .required(),
    AccountNo: Joi.string()
      .max(200)
      .required(),
    AccountHolderName: Joi.string()
      .max(200)
      .required(),
    IFSCcode: Joi.string()
      .max(200)
      .required(),
    TaxDeduction: Joi.string()
      .max(100)
      .required()
  });

  module.exports = {salary, salaryValidation};