const express = require('express');
const projectCategoryRoute = express.Router();
const { verifyToken } = require('../../middlewares/baseToken.js');

const {createProjectCategory} = require('../../Controllers/ProjectCategory/createProjectCategory.js')

projectCategoryRoute.post('/createProjectCategory', verifyToken, createProjectCategory);

module.exports = projectCategoryRoute;
