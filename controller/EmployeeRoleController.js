const Employee = require('../models/EmployeeModel')
const Role = require('../models/RoleModel')
const {employeeRoleCheck} = require('../helper/InputDataValidation')

/**
 * Handles retrieving the role of an employee based on the employee ID in the header.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
async function handleGetEmployeeRole(req, res) {
    try {
        const header = req.headers;
        if (!header) {
            return res.status(400).json({ error: 'This API requires header data' });
        }
        const { error } = employeeRoleCheck(header.eid);
        if (error) {
            return res.status(400).json({ message: error });
        }
        const employee = await Employee.findById(header.eid);
        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        const role = await Role.findById(employee.rid);
        if (!role) {
            return res.status(404).json({ error: 'Role id is not valid' });
        }
        return res.json({ "employee name": employee.name, "role name": role.role_name });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error occurred while retrieving employee role', error: err });
    }
}

module.exports = {
    handleGetEmployeeRole
}