import React, { useEffect, useState } from 'react';
import './ModalComponent.css';
import { useSelector } from 'react-redux';
import { registerAttendee } from '../../services/eventService';
import { ModalAlertComponent } from './ModalAlertComponent';

const ModalComponent = ({ onClose, setIsRegisterSuccess }) => {
    const event = useSelector((state) => state.eventSelected.event);
    const [eventSelected, setEventSelected] = useState({});
    const [isForm, setIsForm] = useState(false);
    const [nameForm, setNameForm] = useState('');
    const [emailForm, setEmailForm] = useState('');

    useEffect(() => {
        setEventSelected(event);
    }, [event]);

    const onSubmit = async () => {
        const registAttendee = await registerAttendee({ name: nameForm, email: emailForm, eventId: eventSelected.id, userId: 2 });
        if (registAttendee) {
            onClose();
            setIsRegisterSuccess(true);
        }
    }

    return (
        <>
            <div className="modal-overlay">
                <div className="modal-content">
                    <p>{eventSelected.title}</p>
                    <p>{eventSelected.description}</p>
                    <p>{eventSelected.start_date}</p>
                    <p>{eventSelected.end_date}</p>
                    <p>{eventSelected.location}</p>
                    <div className="modal-buttons">
                        <button onClick={() => setIsForm(true)}>Quiero asistir</button>
                        <button onClick={onClose}>Close</button>
                    </div>
                    {isForm ? (
                        <div>
                            <div>
                                <div className="form-group">
                                    <label htmlFor="name">Nombre</label>
                                    <input name="name" type="text" onChange={(e) => setNameForm(e.target.value)} placeholder="Nombre completo" required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input name="email" type="email" onChange={(e) => setEmailForm(e.target.value)} placeholder="Email" required />
                                </div>
                                <button onClick={onSubmit}>Registrarme</button>
                            </div>
                        </div>
                    ) : null}
                </div>
            </div>
        </>
    );
};

export default ModalComponent;