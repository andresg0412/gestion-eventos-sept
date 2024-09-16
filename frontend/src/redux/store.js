import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import authReducer from './reducers/authReducer';
import eventReducer from './reducers/eventReducer';
import eventsReducer from './reducers/eventsReducer';

const store = configureStore({
    reducer: {
        auth: authReducer,
        events: eventsReducer,
        eventSelected: eventReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;