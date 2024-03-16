import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import axios from 'axios';

const Shift = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const shiftDetailResponse = await axios.get(`${process.env.REACT_APP_API_URL}/shiftdetails/showShift`);
    
                // Create events based on the shiftDetail data
                const eventsData = shiftDetailResponse.data.map(shiftDetail => {
                    // Check if timeStart and timeEnd are not null or undefined
                    if (shiftDetail.shift.typetime && shiftDetail.shift.typetime.timeStart && shiftDetail.shift.typetime.timeEnd) {
                        // Format date and time to ISO 8601 format
                        const startDate = new Date(`${shiftDetail.shift.schedule.date}T${shiftDetail.shift.typetime.timeStart}`).toISOString();
                        const endDate = new Date(`${shiftDetail.shift.schedule.date}T${shiftDetail.shift.typetime.timeEnd}`).toISOString();
                        
                        return {
                            title: shiftDetail.user.firstName, // Display the firstName of the user
                            start: startDate, // Use the formatted start time
                            end: endDate, // Use the formatted end time
                            borderColor: 'white'
                        };
                    } else {
                        return null; // Return null for invalid data
                    }
                }).filter(event => event !== null); // Filter out null values
    
                setEvents(eventsData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    
        fetchData();
    }, []);
    


    return (
        <div>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay',
                }}
                initialView="dayGridMonth"
                events={events}
                selectable={true}
            />
        </div>
    );
};

export default Shift;
