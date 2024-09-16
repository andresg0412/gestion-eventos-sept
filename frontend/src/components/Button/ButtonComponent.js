import React from 'react';
import './ButtonComponent.css';

const ButtonComponent = ({ text, onClick }) => {
    return (
        <>
            <div>
                <button className="buttonComponent" onClick={onClick}>{text}</button>
            </div>
        </>
    );
};
export default ButtonComponent;