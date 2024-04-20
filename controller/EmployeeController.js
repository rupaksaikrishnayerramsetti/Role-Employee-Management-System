const { employeeSchemaCheck } = require('../helper/InputDataValidation');
const Employee = require('../models/EmployeeModel')

async function handleGetEmployee(req, res) {
    try {
        let { page, limit } = req.query;
        page = page ? parseInt(page) : 1;
        limit = limit ? parseInt(limit) : 5;
        if (page < 1) {
            return res.status(400).json({ message: 'Invalid page number' });
        }
        const totalEmployees = await Employee.countDocuments()
        const employees = await Employee.find()
            .skip((page - 1) * limit)
            .limit(limit);
        return res.status(200).json({
            totalEmployees,
            totalPages: Math.ceil(totalEmployees / limit),
            currentPage: page,
            employees
        });
    } catch (err) {
        return res.status(500).json({ message: 'Error occurred while retrieving employees', error: err });
    }
}

async function handleGetEmployeeById(req, res) {
    try{
        const { id } = req.params;
        const employee = await Employee.findById(id);
        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        return res.status(200).json(employee)
    } catch(err) {
        return res.status(500).json({message: 'Error occured while retrieving a Employee', error: err})
    }
}

async function handlePostEmployee(req, res) {
    try{
        const body = req.body
        if (!body) {
            return res.status(400).json({ error: 'This API requires body data' })
        }
        const {errors} = employeeSchemaCheck(body)
        if (errors) {
            return res.status(400).json({ message: error });
        }
        const result = await Employee.create(body)
        return res.send(result ? "Data Successfully inserted" : "Some problem occurred while inserting data");
    } catch(err) {
        return res.status(500).json({message: 'Error occured while Creating a Employee', error: err})
    }
}

async function handlePutEmployeeById(req, res) {
    try{
        const { id } = req.params
        const body = req.body
        if (!body) {
            return res.status(400).json({ error: 'This API requires data inside the body' });
        }
        const {errors} = employeeSchemaCheck(body)
        if (errors) {
            return res.status(400).json({ message: error });
        }
        const result = await Employee.findByIdAndUpdate(id, body)
        return res.send(result ? "Data Successfully updated" : "Some problem occurred while updating data");
    } catch(err) {
        return res.status(500).json({message: 'Error occured while updating a Employee', error: err})
    }
}

async function handleDeleteEmployeeById(req, res) {
    try{
        const { id } = req.params
        const employee = await Employee.findById(id);
        if (!employee) {
        return res.status(404).json({ error: 'Employee not found' });
        }
        const result = await Employee.findByIdAndDelete(id)
        return res.send(result ? "Data Successfully Deleted" : "Some problem occurred while deleting data");
    } catch(err) {
        return res.status(500).json({message: 'Error occured while deleting a Employee', error: err})
    }
}

module.exports = {
    handleGetEmployee,
    handleGetEmployeeById,
    handlePostEmployee,
    handlePutEmployeeById,
    handleDeleteEmployeeById
}