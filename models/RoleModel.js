const mongoose = require('mongoose')

const roleSchema = mongoose.Schema({
    role_name: {
        type: String,
        required: true
      }
}, {timestamps: true})

const Role = mongoose.model("role", roleSchema, "role")

module.exports = Role