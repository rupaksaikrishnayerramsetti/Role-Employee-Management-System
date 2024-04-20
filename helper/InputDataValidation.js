const roleSchemaCheck = (role) => {
    if (!role.role_name || !typeof role.role_name === 'string' || role.role_name.length < 3 || role.role_name.length > 50) {
        return { error: 'Invalid role name. Must be a string between 3 and 50 characters long.' };
      }
      return { error: null };
}

const employeeSchemaCheck = (employee) => {
    const errors = {};
    if (!employee.name || typeof employee.name !== 'string' || employee.name.length < 3 || employee.name.length > 50) {
        errors.name = 'Invalid employee name. Must be a string between 3 and 50 characters long.';
    }
    if (!employee.rid || typeof employee.rid !== 'string') {
        errors.rid = 'Invalid rid. Must be a string.';
    }
    if (!employee.empcode || typeof employee.empcode !== 'string') {
        errors.empcode = 'Invalid empcode. Must be a string.';
    }
    if (!employee.mail_id || !employee.mail_id.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
        errors.mail_id = 'Invalid email format.';
    }
    if (!employee.phone_number || !employee.phone_number.match(/^[0-9]{10}$/)) {
        errors.phone_number = 'Invalid phone number. Must be a 10-digit number.';
    }
    return Object.keys(errors).length > 0 ? { errors } : { errors: null };
}

const employeeRoleCheck = (id) => {
    if (!id || typeof id !== 'string') {
        return { error: 'Invalid Employee ID' }
    }
    return { error: null };
}

const adminSchemaCheck = (adminData) => {
    const errors = {}
    if (!adminData.email || !adminData.email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
        errors.email = 'Invalid email format.';
    }
    if (!adminData.password || adminData.password.length < 8 || adminData.password.length>32) {
        errors.password = 'Invalid password format. Password must be at least 8 characters long and try to keep a strong password';
    }
    return Object.keys(errors).length > 0 ? { errors } : { errors: null };
}

module.exports = {
    roleSchemaCheck,
    employeeSchemaCheck,
    employeeRoleCheck, 
    adminSchemaCheck
}