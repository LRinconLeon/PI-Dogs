const { Dog, Temperament } = require('../db');

const _postDogs = async (image, name, height, weight, life_span, temperaments) => {
    console.log("Temperaments received:", temperaments);

    const verification = await Dog.findOne({ where: { name: name } });

    if (verification) return new Error('This Dog already exists');
    else {
        const newDog = await Dog.create({ image, name, height, weight, life_span });

        // Aqui asociamos los temperamentos con el perro
        if (temperaments) {
            const tempModels = await Temperament.findAll({
                where: { name: temperaments },
            });
            console.log("Temp Models:", tempModels);

            //? Notas
            await newDog.addTemperaments(tempModels);
        };

        // Recuperar el perro con los temperamentos asociados
        const dogWithTemperaments = await Dog.findByPk(newDog.id, {
            include: Temperament,
        });

        console.log("Dog with Temperaments:", dogWithTemperaments);

        //? Notas
        // Se hace el map para que los temperamentos no salgan con toda su info y se limite a su nombre
        const temperamentNames = dogWithTemperaments.Temperaments.map(temp => temp.name);

        return {
            id: dogWithTemperaments.id,
            image: dogWithTemperaments.image,
            name: dogWithTemperaments.name,
            height: dogWithTemperaments.height,
            weight: dogWithTemperaments.weight,
            life_span: dogWithTemperaments.life_span,
            created: dogWithTemperaments.created,
            temperaments: temperamentNames,
        };
    }
};

module.exports = _postDogs;

//* NOTAS:
//* Recuerda que addTemperaments sirve para agregar temperamentos al perro
//* a diferencia de setTemperaments que remplaza los temperamentos que ya existian
//* en el perro y los cambia por los nuevo, esto te podria servir en alguna ruta PUT

//* PROPIEDAD DE ASOCIACION ( TEMPERAMENTSSS ):
//* Cuando defines una asociación entre dos modelos, Sequelize genera una propiedad en el 
//* modelo principal para representar la relación. Esta propiedad contendrá un array de 
//* instancias de Temperament asociadas al perro en cuestión.

//* En este caso, Temperaments es la propiedad generada en el modelo Dog para representar
//* la relación entre perros y temperamentos. Esta propiedad contendrá un array de 
//* instancias de Temperament asociadas al perro en cuestión.
//* Y viceversa Temperament tendra la propiedad Dogs.

