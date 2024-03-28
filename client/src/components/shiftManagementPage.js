import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from './UserContext';
import { Link, useNavigate } from 'react-router-dom';


function ShiftManagementPage() {
    const [shift, setShift] = useState([]);
    const { user } = useUser();
    const navigate = useNavigate();

    const fetchShift = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/shifts/allPage`);

            // Filter out the events where absenceId is null and branchID matches the user's branchID
            const filteredData = response.data.filter(shift =>
                shift.branchID === user.branchID
            );

            const eventsData = filteredData.map((shift, index) => {
                const startDateTime = new Date(`${shift.schedule.date}T${shift.typetime.timeStart}`);
                let endDateTime = new Date(`${shift.schedule.date}T${shift.typetime.timeEnd}`);

                // Check if end time is before start time, indicating it's on the next day
                if (endDateTime < startDateTime) {
                    // Increment end time's day by 1
                    endDateTime.setDate(endDateTime.getDate() + 1);
                }

                return {
                    shiftID: shift.shiftID,
                    start: startDateTime,
                    end: endDateTime,
                    branch: shift.branch.branchName
                };
            });
            setShift(eventsData);
            console.log(eventsData);
        } catch (error) {
            console.error('Error fetching shift:', error);
        }
    };

    useEffect(() => {
        fetchShift();
        console.log("ใหม่shift");
        console.log(user);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const assignShift = (shift) => {
        navigate('/shiftManagementPage/addShiftDetailPage', { state: { shift: shift } });
    };

    const handleDelete = async (shiftID) => {
        try {
            const confirmed = window.confirm('Are you sure you want to delete this shift?');
            if (!confirmed) return; // ถ้าผู้ใช้ยกเลิกการลบ
    
            // เรียก API ลบ Shift
            await axios.delete(`${process.env.REACT_APP_API_URL}/shifts/delete/${shiftID}`);
    
            fetchShift();
        } catch (error) {
            console.error('Error deleting shift:', error);
            // ดำเนินการเพิ่มโค้ดเพื่อแสดงข้อความผิดพลาดหรือดำเนินการอื่นๆ ตามที่ต้องการ
        }
    };

    return (
        <div className='bg-success' style={{ minHeight: '100vh', padding: '50px' }}>
            <section className="rounded border mx-auto border-3 bg-white" style={{ width: '1300px', padding: '25px' }}>
                <h2 style={{ display: 'inline' }}>Shift List</h2>
                <div className="me-5" style={{ display: 'inline', alignItems: 'center', float: 'right', paddingTop:'10px' }}>
                    {/* <input type="text" placeholder="Search..." style={{ marginRight: '20px' }} /> */}
                    <Link to="./addShiftPage" className="btn btn-primary">Add</Link>
                </div>
                <table className="table" style={{ textAlign: 'center' }}>
                    <thead>
                        <tr>
                            <th style={{ width: '10%' }}>Shift ID</th>
                            <th style={{ width: '25%' }}>วันและเวลาที่เริ่มกะ</th>
                            <th style={{ width: '25%' }}>วันและเวลาที่สิ้นสุดกะ</th>
                            <th style={{ width: '20%' }}>สาขา</th>
                            <th style={{ width: '20%' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {shift.map((shiftItem, index) => (
                            <tr key={index}>
                                <td style={{ paddingTop: '15px' }}>{shiftItem.shiftID}</td>
                                <td style={{ paddingTop: '15px' }}>{shiftItem.start.toLocaleDateString('en-GB')} - {shiftItem.start.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}</td>
                                <td style={{ paddingTop: '15px' }}>{shiftItem.end.toLocaleDateString('en-GB')} - {shiftItem.end.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}</td>
                                <td style={{ paddingTop: '15px' }}>{shiftItem.branch}</td>
                                <td>
                                    <button className="btn btn-primary" onClick={() => assignShift(shiftItem)} >Assign Shift</button>
                                    <button className="btn btn-danger ms-3" onClick={() => handleDelete(shiftItem.shiftID)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </div>
    )
}

export default ShiftManagementPage;
