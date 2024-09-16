import React, { useEffect, useState } from 'react';
import CardComponent from '../Card/CardComponent';
import './ListComponent.css';
import { useDispatch } from 'react-redux';
import { addEvents } from '../../redux/reducers/eventsReducer';
import { getEvents } from '../../services/eventService';
import { addEvent } from '../../redux/reducers/eventReducer';


const ListComponent = ({ setIsEventSelected }) => {
    const dispatch = useDispatch();
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const events = await getEvents();
                setEvents(events);
                dispatch(addEvents(events));
            } catch (error) {
                console.log('Error: ', error);
            }
        };

        fetchEvents();
    }, []);

    const handleClick = (event) => {
        dispatch(addEvent(event));
        setIsEventSelected(true);
    };

    return (
        <>
            <h1>ListComponent</h1>
            <div className="listEvents">
                {events.map((event) => (
                    <CardComponent
                        key={event.id}
                        event={event}
                        onClick={handleClick}
                    />
                ))}
            </div>
        </>
    );
};

export default ListComponent;