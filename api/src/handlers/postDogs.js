const _postDogs = require('../controllers/_postDogs');

const postDogs = async (req, res) => {
    const { img, name, heigth, weigth, life_span, Temperaments } = req.body;

    try {
        if(!name || !img || !heigth || !weigth || !life_span) {
            return res.status(400).json({ error: 'Missing required fields' });
        } else {
            const newDog = await _postDogs(name, img, heigth, weigth, life_span, Temperaments)
            return res.status(200).json(newDog);
        }
    } catch(error) {
        res.status(500).json({ error: error.message });
    };
};

module.exports = postDogs;
