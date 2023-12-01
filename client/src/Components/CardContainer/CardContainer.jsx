import React from 'react';
import style from './CardContainer.module.css';
import { Link } from 'react-router-dom';

const CardContainer = ({ props }) => {
    return (
        <div className={style.card}>
            <Link to={`/detail/${props.id}`}>
                <img className={style.image} src={props.image} alt={`Pic of ${props.name}`} />
            </Link>
            <h1 className={style.name}>{props.name}</h1>
            <p className={style.temp}>Temperaments: {props.temperaments?.map((temp) => temp.name).sort().join(', ')}</p>
            <p>Weight: {props.weight}</p>
        </div>
    )
};

export default CardContainer;