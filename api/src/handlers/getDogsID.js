const { _getDogsIDapi, _getDogsIDdb } = require('../controllers/_getDogsID');

const getDogsID = async (req, res) => {
    const { id } = req.params;
    
    const dogLocation = isNaN(id) ? 'db' : 'api';

    try { 
        if(dogLocation === 'db'){
            const dogDB = await _getDogsIDdb(id);
            
            if(dogDB) return res.status(200).json(dogDB);
            else return res.status(404).json(`Dog with ID: ${id} not found in DB`);
        } else {
            const dogAPI = await _getDogsIDapi(id);

            //*Recuerda que el filter del controller te envia un array por ello verificas si tiene valores
            if(dogAPI) return res.status(200).json(dogAPI);
            else return res.status(404).json(`Dog with ID: ${id} not found in API`);
        }
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = getDogsID;