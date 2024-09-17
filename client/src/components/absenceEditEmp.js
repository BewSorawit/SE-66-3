import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import moment from 'moment';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

function AbsenceEditEmp({user}) {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState();
    const [shiftRange, setShiftRange] = useState();

    const location = useLocation();
    const navigate = useNavigate();
    const shiftDetail = location.state.shiftDetail;

    useEffect(() => {
        if (shiftDetail) {
          const startDateTime = moment(shiftDetail.start).format('DD/MM/YYYY, HH:mm');
          const endDateTime = moment(shiftDetail.end).format('DD/MM/YYYY, HH:mm');
          setShiftRange(`${startDateTime} - ${endDateTime}`);
        } else {
          setShiftRange('');
        }
      }, [shiftDetail]);

    useEffect(() => {
        console.log(shiftDetail);
        fetchUsers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    const fetchUsers = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/all`);
            const bID = user.branchID;
            const filteredData = response.data.filter(data => (data.branchID === bID) && (data.userID !== shiftDetail.leaveUserID) && (data.roleID ==="2" ||data.roleID ==="3"));
            setUsers(filteredData);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const editData = async () => {
        try {
            console.log(shiftDetail.absenceID);
            const response = await axios.put(`${process.env.REACT_APP_API_URL}/absences/updateUser/${shiftDetail.absenceID}`, { userIDchange: selectedUser });
            
            console.log(response.data);
            window.alert('Data saved successfully.');
            navigate('/absenceManagePage/absenceSum', { state: { shiftDetail: shiftDetail, newUserID: selectedUser} });
        } catch (error) {
            console.error('Error updating absence:', error);
        }
    };

    return (
        <div className='bg-success' style={{ minHeight: '100vh', padding: '50px' }}>
            <section className="rounded border mx-auto border-3 bg-white d-flex" style={{ width: '1300px', padding: '25px' }}>
                <div className='d-inline' style={{ width: '650px' }}>
                    <div>
                        <h5>Edit Shift Detail</h5>
                        <div className="d-flex mt-3">
                            <div className="d-inline">
                                <label className="form-label">กะที่เลือก</label>
                                <input type="text" className="form-control border-2  mt-2" value={shiftDetail.shiftID} style={{ width: '100px' }} readOnly />
                            </div>
                            <div className="d-inline mx-5">
                                <label className="form-label">ช่วงเวลาของกะ</label>
                                <input type="text" className="form-control border-2  mt-2" value={shiftRange} style={{ width: '300px' }} readOnly />
                            </div>
                        </div>
                    </div>
                    <div className="mt-4">
                        <label className="form-label">เลือกพนักงาน</label>
                        <select className="form-select border-2  mt-2" style={{ width: '200px' }} value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
                            <option value="">---</option>
                            {users.map(user => (
                                <option key={user.userID} value={user.userID}>
                                    {user.firstName} {user.surName}
                                </option>
                            ))}
                        </select>
                    </div>
                    
                    <div className="mt-3" style={{ paddingTop: '17px' }}>
                        <button className="btn btn-success" onClick={editData} style={{ width: '100px' }}>Save</button>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default AbsenceEditEmp