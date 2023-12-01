import axios from 'axios';
import { 
    GET_DOGS, 
    GET_BY_NAME, 
    GET_BY_ID, 
    GET_TEMPERAMENTS,
    POST_DOGS,
    FILTER_BY_SOURCE,
    FILTER_BY_TEMP,
    ORDER_BY_ABC,
    ORDER_BY_WEIGHT,
    PAGINATION, 
    RESTART
} from "./actions-types";

const URL = 'http://localhost:3001';

export const getDogs = () => {
    return async (dispatch) => {
        try {
            const dogsData = (await axios.get(`${URL}/dogs`)).data;
            dispatch({
                type: GET_DOGS,
                payload: dogsData
            });
        } catch(error) {
            alert(error.respose.data.error)
        }
    };
};

export const changePage = (order) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: PAGINATION,
                payload: order
            })
        } catch(error) {
            alert(error.respose.data.error)
        }
    };
};
// ORDER: Es la direccion de la paginacion '<<' o '>>'

export const getByName = (name) => {
    return async (dispatch) => {
        try{
            const dogNameData = (await axios.get(`${URL}/dogs?name=${name}`)).data;
            dispatch({
                type: GET_BY_NAME,
                payload: dogNameData
            });
        } catch(error) {
            alert(error.respose.data.error)
        }
    };
};

export const getTemperaments = () => {
    return async (dispatch) => {
        try {
            const respose = await axios.get(`${URL}/temperaments`);
            console.log(respose);
            const tempsData = respose.data;
            dispatch({
                type: GET_TEMPERAMENTS,
                payload: tempsData
            })
        } catch(error) {
            alert(error.respose.data.error)
        }
    };
};

export const filterByTemp = (order) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: FILTER_BY_TEMP,
                payload: order
            });
        } catch(error) {
            alert(error.respose.data.error)
        }
    };
};
// order tomara el valor del temperamento que se seleccione en el select

export const filterBySource = (order) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: FILTER_BY_SOURCE,
                payload: order
            })
        } catch(error) {
            alert(error.respose.data.error)
        }
    };
};
// order sera api o db

export const orderByABC = (order) => {
    return{
        type: ORDER_BY_ABC,
        payload: order
    };
};
// order sera ascendente o descendente

export const orderByWeight = (order) => {
    return{
        type: ORDER_BY_WEIGHT,
        payload: order
    };
};
export const restart = () => {
    return async (dispatch) => {
        try {
            dispatch({
                type: RESTART
            })
        } catch(error) {
            alert(error.respose.data.error)
        }
    }
}