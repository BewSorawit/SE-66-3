import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import moment from 'moment';
import axios from 'axios';
import { useUser } from './UserContext';
import { useNavigate, useLocation } from 'react-router-dom';

function AbsenceSum() {
    const { user } = useUser();
    const [changeUser, setChangeUser] = useState(null); 
    const location = useLocation();
    const navigate = useNavigate();
    const shiftDetail = location.state.shiftDetail;
    const newUserID = location.state.newUserID;

    const fetchUser = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/${newUserID}`);
            console.log("ลองดึง")
            console.log(response.data) 
            setChangeUser(response.data); 
        } catch (error) {
            console.error('Error fetching newUser:', error);
        }
    };

    useEffect(() => {
        fetchUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    const shiftRange = (start, end) => {
        const startDateTime = moment(start).format('DD/MM/YYYY, HH:mm');
        const endDateTime = moment(end).format('DD/MM/YYYY, HH:mm');
        return `${startDateTime} - ${endDateTime}`;
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
                        <div className='d-flex justify-content-center mb-3'>
                            <div className='d-inline' style={{width:"200px"}}>
                                <p>ชื่อ-สกุล คนที่มาแทน</p>
                            </div>
                            <div className='d-inline'>
                                <input type="text" className="form-control border-2" value={changeUser ? changeUser.firstName + " " + changeUser.surName : ''} style={{ width: '300px' }} readOnly />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default AbsenceSum;
