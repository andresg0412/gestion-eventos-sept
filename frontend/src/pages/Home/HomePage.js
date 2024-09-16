import React, { useState } from 'react';
import ListComponent from '../../components/List/ListComponent';
import ModalComponent from '../../components/Modal/ModalComponent';
import { useSelector } from 'react-redux';
import ModalAlertComponent from '../../components/Modal/ModalAlertComponent';
const HomePage = () => {
    const [isEventSelected, setIsEventSelected] = useState(false);
    const [isRegisterSuccess, setIsRegisterSuccess] = useState(false);
    const [event, setEvent] = useState({});

    const onClose = () => {
        setIsEventSelected(false);
    };
    const onCloseAlert = () => {
        setIsRegisterSuccess(false);
    };

    return (
        <>
            <div>
                <h1>Bienvenido a Página de eventos</h1>
            </div>
            <div>
                <ListComponent
                    setIsEventSelected={setIsEventSelected}
                />
            </div>
            {isEventSelected ? (
                <ModalComponent
                    onClose={onClose}
                    setIsRegisterSuccess={setIsRegisterSuccess}
                />
            ) : null}

            {isRegisterSuccess ? (
                <ModalAlertComponent
                    text="Registrado con éxito"
                    onClose={onCloseAlert}
                />
            ) : null}
        </>
    )
};

export default HomePage;