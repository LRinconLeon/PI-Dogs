const { Dog, Temperament } = require('../db');
const _getDogs = require('./_getDogs');

const _getDogsIDapi = async (id) => {
    //* Se trae a todos los perros con la funcion _getDogs y se hace un filtrado por id
    const allDogs = await _getDogs();

    const dogFilter = allDogs.filter((dog) => {
        return dog.id == id //! Preguntar por que funciona con == y no con === si se supone que es un num
    })

    return dogFilter;
}

const _getDogsIDdb = async (id) => {
    const searchDog = await Dog.findByPk(id, {
        include: {
            model: Temperament,
            attributes: ['name'],
            through: {
                attributes: []
            },
        },
    });

    return searchDog;
}
module.exports = {
    _getDogsIDapi,
    _getDogsIDdb
}