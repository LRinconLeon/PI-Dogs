const axios = require('axios');
const { Temperament } = require('../db');
const URL = 'https://api.thedogapi.com/v1/breeds';
require('dotenv').config(); 
const { API_KEY } = process.env;

const _getTemperaments = async () => {
    const DBTemp =  await Temperament.findAll();

    if(DBTemp.length) return DBTemp;
    else {
        //* Se extrae toda la info de la api
        const APITempData = (await axios.get(`${URL}?api_key=${API_KEY}`)).data;
        
        //! CHECAR SI PONER UNKNOWN POR DEFAULT NO ROMPE EL FRONT
        //! ESTUDIAR FLATMAP
        //* Aqui se utiliza flatmap para crear un solo array y no usar join, se crea unknown como default
        //* y se quitan los espacios de inicio y final con trim.
        let aux = APITempData
        .flatMap((dog) => (dog.temperament || '').split(', ').map(temp => temp.trim()))
        .filter(Boolean); 
        //* Se filtra boolean porque quieres limpiar los elemento null, y null es false
         
        //* Set: elimina temps duplicados y sort: ordena
        const orderTemps = [...new Set(aux)].sort();

        //*Aqui los crea en la bdd y luego te retorna los temps
        const createdTemps = await Temperament.bulkCreate(
            orderTemps.map(temp => ({name: temp}))
        );
        
        return createdTemps.map(temp => temp.name);
    }
};

module.exports = _getTemperaments;