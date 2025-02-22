const express = require('express');
const roleRoute = express.Router();
const { verifyToken } = require('../../middlewares/baseToken.js');
const { deleteRole } = require('../../Controllers/Role/deleteRole.js')

roleRoute.delete('/deleteRole/:id', verifyToken, deleteRole);

module.exports = roleRoute;