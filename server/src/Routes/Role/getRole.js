const express = require('express');
const roleRoute = express.Router();
const { verifyToken } = require('../../middlewares/baseToken.js');

const { createRole } = require('../../Controllers/Role/createRole.js')

roleRoute.post('/createRole', verifyToken, createRole);

module.exports = roleRoute;