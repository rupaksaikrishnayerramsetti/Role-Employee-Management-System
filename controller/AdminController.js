const { adminSchemaCheck } = require("../helper/InputDataValidation");
const { hashPassword, JWTTokenCreation } = require("../helper/JwtUtility");
const Admin = require("../models/AdminModel")

async function handleAdminCreate(req, res) {
    try {
        const body = req.body
        if (!body) {
            return res.status(400).json({ error: 'This API requires body data' })
        }
        const {errors} = adminSchemaCheck(body)
        if (errors) {
            return res.status(400).json({ message: error });
        }
        const password_digest = hashPassword(body.password)
        const result = await Admin.create({
            email: body.email,
            password_digest: password_digest
        })
        return res.send(result ? "Data Successfully inserted" : "Some problem occurred while inserting data");
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error occurred while creating Admin account', error: err });
    }
}

async function handleLoginCheck(req, res) {
    try {
      const body = req.body;
      if (!body) {
        return res.status(400).json({ error: 'This API requires body data' });
      }
  
      const { errors } = adminSchemaCheck(body);
      if (errors) {
        return res.status(400).json({ message: errors });
      }
  
      const password_digest = hashPassword(body.password);
      const admin = await Admin.find({ email: body.email, password_digest: password_digest });
  
      if (admin.length > 0) {
        const data = {
          admin_id: admin[0]._id
        };
        const token = JWTTokenCreation(data);
        return res.status(200).json({ authToken: token });
      } else {
        return res.status(404).json({ error: 'Admin not found' });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error occurred while logging in to Admin account', error: err });
    }
  }
  

module.exports = {
    handleAdminCreate,
    handleLoginCheck
}