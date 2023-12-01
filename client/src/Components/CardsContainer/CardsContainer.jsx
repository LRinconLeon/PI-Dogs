import React from 'react';
import CardContainer from '../CardContainer/CardContainer';
import style from './CardsContainer.module.css';

const CardsContainer = ({ dogs }) => {
    return(
        <div className={style.card}>
            {dogs.map((dog) => <CardContainer key={dog.id} props={dog} />)}
        </div>
    );
};

export default CardsContainer;