import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import moment from "moment";
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from 'react-router-dom';

function AbsenceManagePage({user}) {
    const [shiftDetails, setShiftDetails] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchShiftDetail();
        console.log("abmana");
        console.log(user);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    const fetchShiftDetail = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/shiftdetails/showShiftDetail`);
            console.log("อิอิ")
            const filteredData = response.data.filter(shiftDetail =>
                shiftDetail.absenceID != null && shiftDetail.shift.branchID === user.branchID
            );
            console.log("filteredData")

            const eventsData = filteredData.map((shiftDetail, index) => {
                const startDateTime = new Date(`${shiftDetail.shift.schedule.date}T${shiftDetail.shift.typetime.timeStart}`);
                let endDateTime = new Date(`${shiftDetail.shift.schedule.date}T${shiftDetail.shift.typetime.timeEnd}`);

                if (endDateTime < startDateTime) {
                    endDateTime.setDate(endDateTime.getDate() + 1);
                }

                return {
                    shiftDetailID: shiftDetail.shiftDetailID,
                    shiftID: shiftDetail.shiftID,
                    absenceID: shiftDetail.absenceID,
                    status: shiftDetail.absence.status,
                    leaveType: shiftDetail.absence.absenceType,
                    leaveDate: shiftDetail.shift.schedule.date,
                    leaveUserID: shiftDetail.userID,
                    newUserID: shiftDetail.absence.userIDchange,
                    firstName: shiftDetail.user.firstName,
                    surName: shiftDetail.user.surName,
                    start: startDateTime,
                    end: endDateTime,
                };
            });
            setShiftDetails(eventsData);
            console.log(eventsData);
        } catch (error) {
            console.error('Error fetching shift detail:', error);
        }
    };

    const shiftRange = (start, end) => {
        const startDateTime = moment(start).format('DD/MM/YYYY, HH:mm');
        const endDateTime = moment(end).format('DD/MM/YYYY, HH:mm');
        return `${startDateTime} - ${endDateTime}`;
    };

    const inform = (shiftDetail) => {
        if(shiftDetail.status === "in branch"){
            navigate('/absenceManagePage/absenceSelect', { state: { shiftDetail: shiftDetail} });
        } else {
            navigate('/absenceManagePage/absenceSum', { state: { shiftDetail: shiftDetail, newUserID: shiftDetail.newUserID } });
        }
        
    };

  return (
    <div className='bg-success' style={{ minHeight: '100vh', padding: '50px' }}>
            <section className="rounded border mx-auto border-3 bg-white" style={{ width: '1300px', padding: '25px' }}>
                <h2>Absence Management</h2>
                <table className="table" style={{ textAlign: 'center' }}>
                    <thead>
                        <tr>
                            <th style={{ width: '10%' }}>Absence ID</th>
                            <th style={{ width: '10%' }}>ประเภทการลา</th>
                            <th style={{ width: '10%' }}>วันที่ลา</th>
                            <th style={{ width: '30%' }}>ระยะเวลาของกะที่ลา</th>
                            <th style={{ width: '15%' }}>สถานะ</th>
                            <th style={{ width: '25%' }}>รายละเอียด</th>
                        </tr>
                    </thead>
                    <tbody>
                        {shiftDetails.map((item, index) => (
                            <tr key={index}>
                                <td style={{ paddingTop: '15px' }}>{item.absenceID}</td>
                                <td style={{ paddingTop: '15px' }}>{item.leaveType}</td>
                                <td style={{ paddingTop: '15px' }}>{moment(item.leaveDate).format('DD/MM/YYYY')}</td>
                                <td style={{ paddingTop: '15px' }}>{shiftRange(item.start, item.end)}</td>
                                <td style={{ paddingTop: '15px' }}>{item.status}</td>
                                <td><button className="btn btn-info btn-sm" onClick={() => inform(item)}>รายละเอียด</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </div>
  )
}

export default AbsenceManagePage