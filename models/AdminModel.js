const mongoose = require('mongoose')

const adminSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }, 
    password_digest: {
        type: String,
        required: true
    }
}, {timestamps: true})

const Admin = mongoose.model('admin', adminSchema, 'admin')

module.exports = Admin