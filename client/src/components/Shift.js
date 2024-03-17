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

                // Filter out the events where absenceId is null
                const filteredData = shiftDetailResponse.data.filter(shiftDetail => shiftDetail.absenceID === null);

                const eventsData = filteredData.map((shiftDetail, index) => {
                    const startDateTime = new Date(`${shiftDetail.shift.schedule.date}T${shiftDetail.shift.typetime.timeStart}`);
                    const endDateTime = new Date(`${shiftDetail.shift.schedule.date}T${shiftDetail.shift.typetime.timeEnd}`);

                    return {
                        title: `${shiftDetail.user.firstName} (${formatTime(startDateTime)} - ${formatTime(endDateTime)})`,
                        start: startDateTime,
                        end: endDateTime,
                        borderColor: 'white',
                        backgroundColor: `rgb(${getRandomColor(index)})`
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

    // Function to generate random color
    const getRandomColor = (index) => {
        const colors = [
            [255, 99, 132],    // Red
            [54, 162, 235],    // Blue
            [255, 206, 86],    // Yellow
            [75, 192, 192],    // Green
            [153, 102, 255],   // Purple
            [255, 159, 64],    // Orange
        ];
        const colorIndex = index % colors.length;
        return colors[colorIndex].join(',');
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
