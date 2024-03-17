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

                const eventsData = shiftDetailResponse.data.map(shiftDetail => {
                    const startDateTime = new Date(`${shiftDetail.shift.schedule.date}T${shiftDetail.shift.typetime.timeStart}`);
                    const endDateTime = new Date(`${shiftDetail.shift.schedule.date}T${shiftDetail.shift.typetime.timeEnd}`);

                    // Construct event title with time range
                    const timeRange = `${formatTime(startDateTime)}-${formatTime(endDateTime)}`;
                    const eventTitle = `${shiftDetail.user.firstName} (${timeRange})`;

                    return {
                        title: eventTitle,
                        start: startDateTime,
                        end: endDateTime,
                        borderColor: 'white'
                    };
                });

                setEvents(eventsData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    // Function to format time (HH:MM)
    const formatTime = (dateTime) => {
        const hours = dateTime.getHours().toString().padStart(2, '0');
        const minutes = dateTime.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    };

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
