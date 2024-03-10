// client/src/function/fullcalendar.js
import axios from 'axios';

export const createEvent = async (values) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/events`, values);
        console.log('Event created successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error creating event:', error);
        throw error;
    }
};
