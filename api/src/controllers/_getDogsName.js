const { Temperament, Dog } = require('../db');
const _getDogs = require('./_getDogs');

const _getDogsName = async (name) => {
    const allDogs = await _getDogs();

    const filterDogAPI = allDogs.filter((dog) => dog.name.toLowerCase() === name.toLowerCase());

    const filterDogDB = await Dog.findAll({ 
        where: { name: name }, 
        include:{
            model: Temperament,
            attributes: ['name'],
            through:{
                attributes: []
            },
        },  
    });
    return [...filterDogAPI, ...filterDogDB];
};

module.exports = _getDogsName;