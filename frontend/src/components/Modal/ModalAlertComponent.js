import React from 'react';
import './ModalAlertComponent.css';

const ModalAlertComponent = ({ text, onClose }) => {
    return (
        <>
            <div className="modal-overlay">
                <div className="modal-content">
                    <p>{text}</p>
                    <div className="modal-buttons">
                        <button onClick={onClose}>Close</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ModalAlertComponent;