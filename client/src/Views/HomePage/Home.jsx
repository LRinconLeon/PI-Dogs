import React from "react";
import CardsContainer from "../../Components/CardsContainer/CardsContainer";
import { useEffect } from "react";
import { getDogs, getTemperaments, filterByTemp, filterBySource, orderByABC, orderByWeight, changePage, restart } from "../../Redux/Actions/actions";
import { useDispatch, useSelector } from 'react-redux';

const Home = () => {
    const dispatch = useDispatch();
    //COMPONENTE FUNCIONAL:
    // La función pasada a useSelector toma el estado completo como argumento y 
    // devuelve la parte deseada del estado (state.dogs).
    const dogs = useSelector(state => state.dogs);
    const allTemps = useSelector(state => state.allTemps);
    const currentPage = useSelector(state => state.currentPage);

    useEffect(()  => {
        dispatch(getDogs());
        dispatch(getTemperaments());
    }, [dispatch]); 

    const filterTemp = (event) => {
        dispatch(filterByTemp(event.target.name))
    }

    const pagination = (event) => {
        dispatch(changePage(event.target.name))
    }

    const filterSource = (event) => {
        dispatch(filterBySource(event.target.value))
    }

    const orderHandler = (event) => {
        dispatch(orderByABC(event.target.value))
    }

    const weightHandler = (event) => {
        dispatch(orderByWeight(event.target.value))
    }

    const reset = (event) => {
        dispatch(restart())
    }

    return (
        <div>
            <div>
                <h3>RESTART</h3>
                <button onClick={reset}>Restart</button>
                <h3>FILTROS</h3>
                <div>
                    <select onChange={filterSource}>
                        <option>By Source</option>
                        <option value="DB">By DataBase</option>
                        <option value="API">By API</option>
                    </select>
                
                    <select name="filterByTemps" onChange={filterTemp}>
                        <option value="temps">By Temperaments</option>
                        {allTemps.map(temp => <option key={temp.name} value={temp.name}>{temp.name}</option>)}
                    </select>
                </div>
                <h3>ORDENAMIENTOS</h3>
                <div>
                    <select onChange={orderHandler}>
                        <option value="A" key='A'>A to Z</option>
                        <option value="D" key='D'>Z to A</option>
                    </select>

                    <select onChange={weightHandler}>
                        <option value="Higher" key='Higher'>Higher</option>
                        <option value="Lower" key='Lower'>Lower</option>
                    </select>
                </div>
            </div>
            <div>
                <CardsContainer dogs={dogs} />
            </div>
            <div>
                <h3>currentPage: {currentPage + 1}</h3>
            </div>
            <div>
                <button onClick={pagination} name="prev">{"<<"}</button>
                <button onClick={pagination} name="next">{">>"}</button>
            </div>
        </div>
    )
};

export default Home;

//* NOTAS:

//? useSelector:
/* La función useSelector se utiliza en componentes funcionales de React para seleccionar
y acceder a partes específicas del estado global almacenado en el store de Redux. En 
lugar de acceder directamente al estado global utilizando store */