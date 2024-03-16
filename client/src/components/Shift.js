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
                const schedulesResponse = await axios.get(`${process.env.REACT_APP_API_URL}/schedules/all`);
                const timesResponse = await axios.get(`${process.env.REACT_APP_API_URL}/typetimes/all`);

                // สร้าง event สำหรับแต่ละ Schedule และ Time
                const eventsData = [];

                schedulesResponse.data.forEach(schedule => {
                    timesResponse.data.forEach(time => {
                        eventsData.push({
                            title: `${schedule.date} (${time.timeStart} - ${time.timeEnd})`,
                            start: schedule.date,
                            end: schedule.date,
                            backgroundColor: getRandomColor(), // สุ่มสี
                            borderColor: 'white'
                        });
                    });
                });

                setEvents(eventsData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const getRandomColor = () => {
        // สุ่มสี HEX แบบสุ่มแบบง่าย
        return '#' + Math.floor(Math.random()*16777215).toString(16);
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
