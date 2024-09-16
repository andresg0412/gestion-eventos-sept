import { createSlice } from '@reduxjs/toolkit';

const eventsSlice = createSlice({
    name: 'events',
    initialState: {
        events: [],
        status: 'idle',
        error: null,
    },
    reducers: {
        addEvents(state, action) {
            state.events = action.payload;
            state.status = 'succeeded';
        }
    },
});

export const { addEvents } = eventsSlice.actions;
export default eventsSlice.reducer;