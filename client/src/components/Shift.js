import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';


const Shift = ({ user }) => {
    const [events, setEvents] = useState([]);
    const [userInbranch, setUserInbranch] = useState({})
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!user) return;
                console.log(user);
                // ดึงข้อมูลตารางเวลาเข้างานที่ต้องการแสดง
                const shiftDetailResponse = await axios.get(`${process.env.REACT_APP_API_URL}/shiftdetails/showShift`);

                const userInbranch = await axios.get(`${process.env.REACT_APP_API_URL}/users/all`);
                const filterUserInbranch = userInbranch.data.filter(data => data.branchID === user.branchID && data.roleID !== "2");
                // console.log("filterUserInbranch", filterUserInbranch);
                setUserInbranch(filterUserInbranch);


                // Filter out the events where absenceId is null and branchID matches the user's branchID
                const filteredData = shiftDetailResponse.data.filter(shiftDetail =>
                    shiftDetail.absenceID === null && shiftDetail.shift.branchID === user.branchID
                );

                const eventsData = filteredData.map((shiftDetail, index) => {
                    const startDateTime = new Date(`${shiftDetail.shift.schedule.date}T${shiftDetail.shift.typetime.timeStart}`);
                    let endDateTime = new Date(`${shiftDetail.shift.schedule.date}T${shiftDetail.shift.typetime.timeEnd}`);

                    // Check if end time is before start time, indicating it's on the next day
                    if (endDateTime < startDateTime) {
                        // Increment end time's day by 1
                        endDateTime.setDate(endDateTime.getDate() + 1);
                    }

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
    }, [user]);

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

            <div>
                {userInbranch.length > 0 && userInbranch.map((user) => {
                    console.log("User ID:", user.userID);
                    return (
                        <div key={user.userID}>
                            {user.firstName}
                        </div>
                    );
                })}
            </div>



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
