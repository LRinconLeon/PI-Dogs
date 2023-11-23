const axios = require('axios');
const { Dog, Temperament } = require('../db');
const URL = 'https://api.thedogapi.com/v1/breeds';
require('dotenv').config(); 
const { API_KEY } = process.env;
 
const _getDogs = async () => {
    //*Recuerda through es para la tambla intermedia de los modelos
    const dogsDB = await Dog.findAll({
        include: {
            model: Temperament,
            attributes: ['name'],
            through: {
                attributes: []
            },
        },
    });

    const dataAPI = (await axios.get(`${URL}?api_key=${API_KEY}`)).data;

    const dogsAPI = dataAPI.map((dog) => ({
        id: dog.id,
        img: dog.reference_image_id,
        name: dog.name,
        height: dog.height.metric,
        weight: dog.weight.metric,
        life_span: dog.life_span,
        Temperament: dog.temperament ? dog.temperament.split(', ').map((temp) => ({ 'name': temp })) : [],
    }));

    return [...dogsDB, ...dogsAPI];
};

module.exports = _getDogs;