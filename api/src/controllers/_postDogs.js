const { Dog, Temperament } = require('../db');

const _postDogs = async (img, name, heigth, weigth, life_span, Temperaments) => {
    const newDog = await Dog.create({ img, name, heigth, weigth, life_span });
    
    await newDog.addTemperament(Temperaments);

    return newDog
}

module.exports = _postDogs;