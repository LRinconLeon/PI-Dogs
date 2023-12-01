import React from "react";
import style from "./Landing.module.css"
import { Link } from 'react-router-dom'

const Landig = () => {
    return (
        <>
        <div className={style.divUno}>
            <div className={style.divTop}>
                <h1 className={style.acheUno}>Discover, Learn, and Create with Our Dog Breeds!</h1>
            </div>
            <div className={style.divDown}>
                <p className={style.pi}>Explore a wide variety of dog breeds and uncover their fascinating characteristics. You can even create your own custom breed!</p>
                <Link className={style.btn} to='/home'><button>LET'S GO!</button></Link>
            </div>
        </div>
            
        </>
    )
};

export default Landig;