const { Router } = require('express');
const { getDogs, getDogsID, postDogs } = require('../handlers/index');

const dogRouter = Router();

dogRouter.get('/', getDogs);
dogRouter.get('/:id', getDogsID);
dogRouter.post('/', postDogs);

module.exports = dogRouter;