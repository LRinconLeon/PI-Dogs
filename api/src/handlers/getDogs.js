const _getDogs = require('../controllers/_getDogs');
const _getDogsName = require('../controllers/_getDogsName');

const getDogs = async (req, res) => {
    const { name } = req.query;

    try {
        if(name) {
            const dogName = await _getDogsName(name);
            res.status(200).json(dogName);
        } else {
            const response = await _getDogs();
            res.status(200).json(response);
        }
    } catch(error) {
        res.status(500).json({ error: 'Error interno del servidor', details: error.message });
    }
}

module.exports = getDogs;