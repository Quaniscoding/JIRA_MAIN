const express = require('express');
const projectCategoryRoute = express.Router();
const { verifyToken } = require('../../middlewares/baseToken.js');

const {getProjectCategory} = require('../../Controllers/ProjectCategory/getProjectCategory.js')

projectCategoryRoute.get('/getProjectCategory', verifyToken, getProjectCategory);

module.exports = projectCategoryRoute;
