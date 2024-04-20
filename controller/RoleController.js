const Role = require('../models/RoleModel')
const {roleSchemaCheck} = require('../helper/InputDataValidation')

/**
 * Handles retrieving a list of roles with pagination.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
async function handleGetRole(req, res) {
    try {
        let { page, limit } = req.query;
        page = page ? parseInt(page) : 1;
        limit = limit ? parseInt(limit) : 5;
        if (page < 1) {
            return res.status(400).json({ message: 'Invalid page number' });
        }
        const totalRoles = await Role.countDocuments()
        const roles = await Role.find()
            .skip((page - 1) * limit)
            .limit(limit);
        return res.status(200).json({
            totalRoles,
            totalPages: Math.ceil(totalRoles / limit),
            currentPage: page,
            roles
        });
    } catch (err) {
        return res.status(500).json({ message: 'Error occurred while retrieving roles', error: err });
    }
}

/**
 * Handles retrieving a role by ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
async function handleGetRoleById(req, res) {
    try{
        const { id } = req.params;
        const role = await Role.findById(id);
        if (!role) {
            return res.status(404).json({ error: 'Role not found' });
        }
        return res.status(200).json(role)
    } catch(err) {
        return res.status(500).json({message: 'Error occured while retrieving a Role', error: err})
    }
}

/**
 * Handles creating a new role.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
async function handlePostRole(req, res) {
    try {
        const body = req.body;
        if (!body) {
            return res.status(400).json({ error: 'This API requires body data' });
        }
        const {error} = roleSchemaCheck(body)
        if (error) {
            return res.status(400).json({ message: error });
        }
        const result = await Role.create(body);
        return res.send(result ? "Data Successfully inserted" : "Some problem occurred while inserting data");
    } catch (err) {
        return res.status(500).json({ message: 'Error occurred while creating a Role', error: err });
    }
}

/**
 * Handles updating a role by ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
async function handlePutRoleById(req, res) {
    try{
        const { id } = req.params
        const body = req.body
        if (!body) {
            return res.status(400).json({ error: 'This API requires data inside the body' });
        }
        const {error} = roleSchemaCheck(body)
        if (error) {
            return res.status(400).json({ message: error });
        }
        const result = await Role.findByIdAndUpdate(id, body)
        return res.send(result ? "Data Successfully updated" : "Some problem occurred while updating data");
    } catch(err) {
        return res.status(500).json({message: 'Error occured while updating a Role', error: err})
    }
}

/**
 * Handles deleting a role by ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
async function handleDeleteRoleById(req, res) {
    try{
        const { id } = req.params
        const role = await Role.findById(id);
        if (!role) {
            return res.status(404).json({ error: 'Role not found' });
        }
        const result = await Role.findByIdAndDelete(id)
        return res.send(result ? "Data Successfully Deleted" : "Some problem occurred while deleting data");
    } catch(err) {
        return res.status(500).json({message: 'Error occured while deleting a Role', error: err})
    }
}

module.exports = {
    handleGetRole,
    handleGetRoleById,
    handlePostRole,
    handlePutRoleById,
    handleDeleteRoleById
}