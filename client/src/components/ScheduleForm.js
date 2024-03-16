// client/src/components/ScheduleForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ScheduleForm = () => {
    const [schedules, setSchedules] = useState([]);
    const [times, setTimes] = useState([]);

    useEffect(() => {
        // Fetch schedules and times from the server
        const fetchData = async () => {
            try {
                const schedulesResponse = await axios.get(`${process.env.REACT_APP_API_URL}/schedules/all`);
                const timesResponse = await axios.get(`${process.env.REACT_APP_API_URL}/typetimes/all`);
                setSchedules(schedulesResponse.data);
                setTimes(timesResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h2>Schedule Form</h2>
            <div>
                <label htmlFor="schedule">Select Schedule:</label>
                <select id="schedule">
                    {schedules.map(schedule => (
                        <option key={schedule.scheduleID} value={schedule.scheduleID}>
                            {schedule.date} {/* Display the date */}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="time">Select Time:</label>
                <select id="time">
                    {times.map(time => (
                        <option key={time.timeID} value={time.timeID}>
                            {time.timeStart} - {time.timeEnd} {/* Display the start and end times */}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default ScheduleForm;
