const _getTemperaments  = require('../controllers/_getTemperaments');

const getTemperaments = async (req, res) => {
    try {
        const getTemps = await _getTemperaments();

        if(getTemps) return res.status(200).json(getTemps);
        else return res.status(404).json('No Temperaments found');
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = getTemperaments;