const express = require('express');
const roleRoute = express.Router();
const { verifyToken } = require('../../middlewares/baseToken.js');

const { updateRole } = require('../../Controllers/Role/updateRole.js')

roleRoute.put('/updateRole/:id', verifyToken, updateRole);

module.exports = roleRoute;