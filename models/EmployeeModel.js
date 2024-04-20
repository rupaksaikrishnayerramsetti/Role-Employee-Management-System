const mongoose = require('mongoose')

const employeeSchema = mongoose.Schema({
    rid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role',
        required: true
      },
      name: {
        type: String,
        required: true
      },
      empcode: {
        type: String,
        required: true
      },
      mail_id: {
        type: String,
        required: true,
        unique: true
      },
      phone_number: {
        type: String,
        required: true
      }
}, {timestamps: true})

const Employee = mongoose.model("employee", employeeSchema, "employee")

module.exports = Employee