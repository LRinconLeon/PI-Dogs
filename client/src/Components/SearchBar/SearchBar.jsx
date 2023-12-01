import React from "react";
import style from "./SearchBar.module.css";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { getByName } from "../../Redux/Actions/actions";

const SearchBar = () => {
    const dispatch = useDispatch();
    const [name, setName] = useState("");

    const inputHandle = (event) => {
        setName(event.target.value);
    };

    const submitHandle = (event) => {
        event.preventDefault();
        dispatch(getByName(name));
        document.getElementById('searchInput').value = ''; //esto es para que se borre lo que escribes despues del enter
    };
    //el preventDefault es para que no se recargue la pagina

    return(
        <div className={style.mainContainer}>
            <form onSubmit={submitHandle}>
                <input type="text"  id="searchInput" onChange={inputHandle} placeholder="Search by Breed" />
                <input type="submit" onClick={submitHandle} />
            </form>
        </div>  
    )
};
//Los inputs se ponen en un form para que se pueda sumbitear apretando el boton o con enter
export default SearchBar;