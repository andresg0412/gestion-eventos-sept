import instance from './axios';

export const getEvents = async () => {
    try{
        const response = await instance.get('/events');
        return response.data;
    } catch (error) {
        console.log('Error: ', error);
        throw error;
    }
};

export const registerAttendee = async (attendee) => {
    try{
        const response = await instance.post('/attendee', attendee);
        return response.data;
    } catch (error) {
        console.log('Error: ', error);
        throw error;
    }
}