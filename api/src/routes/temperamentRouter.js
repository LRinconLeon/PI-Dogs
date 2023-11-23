const { Router } = require('express');
const getTemperaments = require('../handlers/getTemperaments');

const temperamentRouter = Router();

temperamentRouter.get('/', getTemperaments);

module.exports = temperamentRouter