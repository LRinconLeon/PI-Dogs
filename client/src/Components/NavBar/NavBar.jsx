import React from "react";
import { Link } from "react-router-dom";
import style from './NavBar.module.css';
import SearchBar from '../SearchBar/SearchBar';

const NavBar = () => {
    return(
        <div className={style.navBar}>
            <Link to='/home'>HOME</Link>
            <Link to='/'>LANDING</Link>
        </div>
    )
};
//! REMOVER EL HOME Y CAMBIARLO POR IMAGEN

const NavBarHome = () => {
    return(
        <div className={style.navHome}>
            <Link to='/home'>HOME</Link>
            <div>
            <SearchBar />
            </div>
            <Link to='/create'>FORM</Link>
            <Link to='/'>LANDING</Link>
        </div>
    )
};
//! REMOVER EL HOME Y CAMBIARLO POR IMAGEN

export {
    NavBar,
    NavBarHome
};