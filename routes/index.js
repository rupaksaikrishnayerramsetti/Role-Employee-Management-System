const express = require("express")
const router = express.Router()
const  {
    handleGetEmployee,
    handleGetEmployeeById,
    handlePostEmployee,
    handlePutEmployeeById,
    handleDeleteEmployeeById
} = require('../controller/EmployeeController')
const {
    handleGetRole,
    handleGetRoleById,
    handlePostRole,
    handlePutRoleById,
    handleDeleteRoleById
} = require('../controller/RoleController')
const { handleGetEmployeeRole } = require('../controller/EmployeeRoleController')
const {
    handleAdminCreate,
    handleLoginCheck
} = require('../controller/AdminController')

//  Routes for Admin
router.post("/create-admin", handleAdminCreate)
router.post("/login", handleLoginCheck)

// Routes for Roles
router.get("/roles", handleGetRole)
router.get("/roles/:id", handleGetRoleById)
router.post("/roles", handlePostRole)
router.put("/roles/:id", handlePutRoleById)
router.delete("/roles/:id", handleDeleteRoleById)

// Routes for Employees
router.get("/employees", handleGetEmployee)
router.get("/employees/:id", handleGetEmployeeById)
router.post("/employees", handlePostEmployee)
router.put("/employees/:id", handlePutEmployeeById)
router.delete("/employees/:id", handleDeleteEmployeeById)

// Routes for Employee Role
router.get("/employee-role", handleGetEmployeeRole)

module.exports = router