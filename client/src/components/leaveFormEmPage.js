import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import moment from "moment";
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from 'react-router-dom';


function LeaveFormEmPage({user}) {
    const [date, setDate] = useState(new Date());
    const [shiftDetails, setShiftDetails] = useState([]);
    const [selectedShiftDetail, setSelectedShiftDetail] = useState('');
    const [shiftRange, setShiftRange] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        date.setHours(7, 0, 0, 0);

        console.log("leaveEm");
        console.log(user);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    useEffect(() => {
        if (selectedShiftDetail) {
            const selectedShift = shiftDetails.find(shiftDetail => shiftDetail.shiftDetailID === selectedShiftDetail);
            if (selectedShift) {
                const startDateTime = moment(selectedShift.start).format('DD/MM/YYYY, HH:mm');
                const endDateTime = moment(selectedShift.end).format('DD/MM/YYYY, HH:mm');
                setShiftRange(`${startDateTime} - ${endDateTime}`);
            } else {
                setShiftRange('');
            }
        } else {
            setShiftRange('');
        }
    }, [selectedShiftDetail, shiftDetails]);


    const fetchShiftDetail = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/shiftdetails/showShiftDetail`);
            console.log(response)
            console.log("อิอิ")
            console.log(user);

            console.log(date);
            const filteredData1 = response.data.filter(shiftDetail =>
                moment(shiftDetail.shift.schedule.date).format('YYYY-MM-DD') === moment(date).format('YYYY-MM-DD') && shiftDetail.userID === user.userID
            );

            const eventsData = filteredData1.map((shiftDetail, index) => {
                const startDateTime = new Date(`${shiftDetail.shift.schedule.date}T${shiftDetail.shift.typetime.timeStart}`);
                let endDateTime = new Date(`${shiftDetail.shift.schedule.date}T${shiftDetail.shift.typetime.timeEnd}`);

                if (endDateTime < startDateTime) {
                    endDateTime.setDate(endDateTime.getDate() + 1);
                }

                return {
                    shiftDetailID: shiftDetail.shiftDetailID,
                    shiftID: shiftDetail.shiftID,
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

    useEffect(() => {
        fetchShiftDetail();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [date]);

    const addData = async () => {
        if (!selectedShiftDetail) {
            window.alert('Please fill in all fields.');
            return;
        }
        console.log("ลองแอด")
        console.log(selectedShiftDetail)
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/absences/createWeb`, {
                absenceType: "absence",
                status: "in branch",
                userIDsend: user.userID,
                shiftDetailID: selectedShiftDetail
            });
            window.alert('Data saved successfully.');
            navigate('/homeEmployee');
        } catch (error) {
            console.error('Error creating Absence:', error);
            window.alert('Failed to save data.');
        }
    };

    return (
        <div className='bg-success' style={{ minHeight: '100vh', padding: '50px' }}>
            <section className="rounded border mx-auto border-3 bg-white d-flex" style={{ width: '1300px', padding: '25px' }}>
                <div>
                    <h5>Employee Leave Form</h5>
                    <div className="my-3" style={{ width: '400px' }}>
                        <label className="form-label">ประเภทการลา</label>
                        <input type="text" className="form-control border-2  mt-2" id="absenceType" value={"ลา"} style={{ width: '300px' }} readOnly />
                    </div>

                    <div className="">
                        <div className="d-flex mt-3">
                            <div className="d-inline">
                                <p>เลือกวันที่ต้องการลา</p>
                                <DatePicker className="rounded border border-2" selected={date} onChange={(date) => setDate(date)} showIcon isClearable />
                            </div>
                            <div className="d-inline mx-5">
                                <label className="form-label">เลือกช่วงเวลากะ</label>
                                <select className="form-select border-2  mt-2" value={selectedShiftDetail} onChange={(e) => setSelectedShiftDetail(e.target.value)}>
                                    <option value="">---</option>
                                    {shiftDetails.map(shiftDetail => (
                                        <option key={shiftDetail.shiftDetailID} value={shiftDetail.shiftDetailID}>
                                            {shiftDetail.shiftDetailID}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="d-inline mx-5">
                                <label className="form-label">ช่วงเวลาของกะ</label>
                                <input type="text" className="form-control border-2  mt-2" value={shiftRange} style={{ width: '300px' }} readOnly />
                            </div>
                        </div>
                        <div className="mt-3" style={{ paddingTop: '17px' }}>
                            <button className="btn btn-success" onClick={addData} style={{ width: '100px' }}>Save</button>
                        </div>
                    </div>

                </div>
            </section>
        </div>
    )
}

export default LeaveFormEmPage