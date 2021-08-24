const mongoose = require("mongoose")
const {Schema} = mongoose.schema();

const taskSchema = new Schema({
    taskId: {type: String, required: true },
    name: {type: String, default: ""},
    description: {type: String, default: ""},
    startDate: {type: Date, required: true},
    completionDate: {type: Date, required: true},
    assignedTo: {
      one: {
        name: String,
        employeeId: String
      },
      two: {
        name: String,
        employeeId: String 
      },
      three: {
        name: String,
        employeeId: String
      }
    },
    status:{type: string, required: true }, //completed, ongoing or on hold
  });



const tasks = mongoose.model("Tasks", taskSchema);


module.exports = tasks;