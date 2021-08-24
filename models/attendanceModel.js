
const mongoose = require("mongoose")
const {Schema} = mongoose.schema()

const attendanceSchema = new Schema({
    date: {type: Date, required: true},
    timeIn: {type: Date, required: true},
    timeOut: {type: Date, required: true},
    employeeId: {type: Date, required: true},
    firstName: {type: Date, required: true},
    lastName: {type: Date, required: true}
  });



const Attendance = mongoose.model("Attendance", attendanceSchema);


module.exports = Attendance;