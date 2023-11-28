const _postDogs = require('../controllers/_postDogs');

const postDogs = async (req, res) => {
    const { image, name, height, weight, life_span, temperaments } = req.body;

    try {
        if( !image || !name || !height || !weight || !life_span) {
            return res.status(400).json({ error: 'Missing required fields' });
        } else {
            const newDog = await _postDogs(image, name, height, weight, life_span, temperaments)
            return res.status(201).json(newDog); //201 significa Created
        }
    } catch(error) {
        if(error.message === 'This Dog already exists') return res.status(409).json({ error: error.message }); 
        else return res.status(500).json({ error: error.message });
    };
};

module.exports = postDogs;
