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
} from '../Actions/actions-types';

const initialState = {
    dogs: [],
    allTemps: [],
    dogsBackUp: [],
    dogsFiltered: [],
    currentPage: 0
}

const rootReducer = (state = initialState, action) => {
    const ITEMS_PER_PAGE = 8;

    switch (action.type) {
        case GET_DOGS:
            return {
                ...state,
                dogs: [...action.payload].splice(0, ITEMS_PER_PAGE), //aqui siempre seran 8 perros
                dogsBackUp: action.payload //aqui son TODOS los perros
            };

        case GET_BY_NAME:
            return {
                ...state,
                dogs: [...action.payload].splice(0, ITEMS_PER_PAGE),
                dogsFiltered: action.payload
            };

        case GET_TEMPERAMENTS:
            return{
                ...state,
                allTemps: action.payload
            };

        case FILTER_BY_TEMP:
            return{
                ...state,
                dogs: [...state.dogsBackUp].filter(dog => dog.temperaments.includes(action.payload)).splice(0, ITEMS_PER_PAGE),
                dogsFiltered: [...state.dogsBackUp].filter(dog => dog.temperaments.includes(action.payload))
            };

        case FILTER_BY_SOURCE:
            const source = action.payload === 'DB'
            ? [...state.dogsBackUp].filter(dog => dog.created)
            : [...state.dogsBackUp].filter(dog => !dog.created)

            return {
                ...state,
                dogs: source
            }
        
        case ORDER_BY_ABC:
            const orderDogs = action.payload === 'A'
            ? [...state.dogsBackUp].sort((a, b) => a.name.localeCompare(b.name))
            : [...state.dogsBackUp].sort((a, b) => b.name.localeCompare(a.name))
            return {
                ...state,
                dogs: orderDogs
            }

        case ORDER_BY_WEIGHT:
            const weight = action.payload === 'Higher'
            ? [state.dogsBackUp].sort((a, b) => b.weight - a.weight)
            : [state.dogsBackUp].sort((a, b) => a.weight - b.weight)
            return {
                ...state,
                dogs: weight 
            }

        case PAGINATION:
            const nextPage = state.currentPage + 1;
            const prevPage = state.currentPage - 1;
            const firstIndex = action.payload === "next" ? nextPage * ITEMS_PER_PAGE : prevPage * ITEMS_PER_PAGE;
            // Recuerda que action.payload es order que es el event.target.name que es name= 'prev' o 'next'

            if(state.filters){
                if(action.payload === "next" && firstIndex >= state.dogsFiltered.length) return state;
                if(action.payload === "prev" && prevPage < 0) return state;

                return{
                    ...state,
                    dogs: [...state.dogsFiltered].splice(firstIndex, ITEMS_PER_PAGE),
                    currentPage: action.payload === "next" ? nextPage : prevPage    
                };
            }; // Esto es para que se siga paginando cuando tiene un filtro aplicado 

            if(action.payload === "next" && firstIndex >= state.dogsBackUp.length) return state;
            if(action.payload === "prev" && prevPage < 0) return state;
            // Esto es para que tu prev y next tengan un limite 

            return{
                ...state,
                dogs: [...state.dogsBackUp].splice(firstIndex, ITEMS_PER_PAGE),
                currentPage: action.payload === "next" ? nextPage : prevPage    
            };
        case RESTART:
        return {
            ...state,
            dogs: [...state.dogsBackUp].splice(0, ITEMS_PER_PAGE),
            dogsFiltered: []
        }
        default:
            return { ...state };
    };
};

export default rootReducer;