import React from 'react';
import { Link } from 'react-router-dom';
import './CardComponent.css';

const CardComponent = ({ event, onClick }) => {

    const handleClick = () => {
        onClick(event);
    };
    return (
        <>
            <li key={event.id} className="cardComponent">
                <button onClick={handleClick}>
                    <p>{event.title}</p>
                    <p>{event.description}</p>
                </button>
            </li>
        </>
    );
};

export default CardComponent;