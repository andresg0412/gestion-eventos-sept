import { createSlice } from '@reduxjs/toolkit';

const eventSlice = createSlice({
    name: 'event',
    initialState: {
        event: {},
        status: 'idle',
        error: null,
    },
    reducers: {
        addEvent(state, action) {
            state.event = action.payload;
            state.status = 'succeeded';
        }
    },
});

export const { addEvent } = eventSlice.actions;
export default eventSlice.reducer;