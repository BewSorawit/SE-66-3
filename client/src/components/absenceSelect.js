import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import moment from 'moment';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import { useUser } from './UserContext';
import { useNavigate, useLocation } from 'react-router-dom';

function AbsenceSelect() {
    const { user } = useUser();
    const location = useLocation();
    const navigate = useNavigate();
    const shiftDetail = location.state.shiftDetail;

    const shiftRange = (start, end) => {
        const startDateTime = moment(start).format('DD/MM/YYYY, HH:mm');
        const endDateTime = moment(end).format('DD/MM/YYYY, HH:mm');
        return `${startDateTime} - ${endDateTime}`;
    };

    const inBranch = async (shiftDetail) => {
        try {
            console.log(shiftDetail.absenceID);
            const response = await axios.put(`${process.env.REACT_APP_API_URL}/absences/updateStatus/${shiftDetail.absenceID}`, { status: 'success' });
            navigate('/absenceEditEmp', { state: { shiftDetail: shiftDetail } });
            console.log(response.data);
        } catch (error) {
            console.error('Error updating absence:', error);
        }
    };

    const outBranch = async () => {
        try {
            console.log(shiftDetail.absenceID);
            const response = await axios.put(`${process.env.REACT_APP_API_URL}/absences/updateStatus/${shiftDetail.absenceID}`, { status: 'out branch' });
            navigate('/absenceManagePage');
            console.log(response.data);
            window.alert('ส่งเรื่องไปที่ FC เรียบร้อย');
        } catch (error) {
            console.error('Error updating absence:', error);
        }
    };

    return (
        <div className='bg-success' style={{ minHeight: '100vh', padding: '50px' }}>
            <section className="rounded border mx-auto border-3 bg-white" style={{ width: '1300px', padding: '25px' }}>
                <div>
                    <h5>รายละเอียดการลา</h5>
                    <div>
                        <div className='d-flex justify-content-center mb-3'>
                            <div className='d-inline' style={{width:"200px"}}>
                                <p>ชื่อ-สกุลของผู้ลา</p>
                            </div>
                            <div className='d-inline'>
                                <input type="text" className="form-control border-2" value={shiftDetail.firstName + " " + shiftDetail.surName} style={{ width: '300px' }} readOnly />
                            </div>
                        </div>
                        <div className='d-flex justify-content-center mb-3'>
                            <div className='d-inline' style={{width:"200px"}}>
                                <p>ประเภทการลา</p>
                            </div>
                            <div className='d-inline'>
                                <input type="text" className="form-control border-2" value={shiftDetail.leaveType} style={{ width: '300px' }} readOnly />
                            </div>
                        </div>
                        <div className='d-flex justify-content-center mb-3'>
                            <div className='d-inline' style={{width:"200px"}}>
                                <p>วันที่ลา</p>
                            </div>
                            <div className='d-inline'>
                                <input type="text" className="form-control border-2" value={moment(shiftDetail.leaveDate).format('DD/MM/YYYY')} style={{ width: '300px' }} readOnly />
                            </div>
                        </div>
                        <div className='d-flex justify-content-center mb-3'>
                            <div className='d-inline' style={{width:"200px"}}>
                                <p>รายะเวลาของกะที่ลา</p>
                            </div>
                            <div className='d-inline'>
                                <input type="text" className="form-control border-2" value={shiftRange(shiftDetail.start, shiftDetail.end)} style={{ width: '300px' }} readOnly />
                            </div>
                        </div>
                        <div className='d-flex mt-5' style={{marginLeft:"395px"}}>
                            <div className='d-inline float-start' style={{width:"300px"}}>
                                <button className="btn btn-info btn-sm" onClick={() => inBranch(shiftDetail)}>ได้พนักงานในสาขา</button>
                            </div>
                            <div className='d-inline'>
                                <button className="btn btn-info btn-sm" onClick={() => outBranch()}>ส่งเรื่องไปยังนอกสาขา</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default AbsenceSelect