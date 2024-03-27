import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import moment from 'moment';
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";
import { useUser } from './UserContext';
import { useNavigate } from 'react-router-dom';

function AddShiftDetailPage() {
  const [shifts, setShifts] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedShift, setSelectedShift] = useState();
  const [selectedUser, setSelectedUser] = useState();
  const { user } = useUser();
  const [shiftRange, setShiftRange] = useState();

  useEffect(() => {
    fetchShifts();
    fetchUsers();
  }, [user]);

  const fetchShifts = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/shifts/allPage`);
      const filteredData = response.data.filter(shift => shift.branchID === user.branchID);
      const eventsData = filteredData.map((shift, index) => {
        const startDateTime = new Date(`${shift.schedule.date}T${shift.typetime.timeStart}`);
        let endDateTime = new Date(`${shift.schedule.date}T${shift.typetime.timeEnd}`);
        if (endDateTime < startDateTime) {
          endDateTime.setDate(endDateTime.getDate() + 1);
        }
        return {
          shiftID: shift.shiftID,
          start: startDateTime,
          end: endDateTime,
        };
      });
      setShifts(eventsData);
    } catch (error) {
      console.error('Error fetching shift:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/all`);
      const bID = user.branchID;
      const filteredData = response.data.filter(user => user.branchID === bID);
      setUsers(filteredData);
    } catch (error) {
      console.error('Error fetching typetimes:', error);
    }
  };

  useEffect(() => {
    if (selectedShift) {
      const shift = shifts.find(item => item.shiftID === selectedShift);
      if (shift) {
        const startDateTime = moment(shift.start).format('DD/MM/YYYY, HH:mm');
        const endDateTime = moment(shift.end).format('DD/MM/YYYY, HH:mm');
        setShiftRange(`${startDateTime} - ${endDateTime}`);
      }
    } else {
      setShiftRange('');
    }
  }, [selectedShift, shifts]);

  return (
    <div className='bg-success' style={{ minHeight: '100vh', padding: '50px' }}>
      <section className="rounded border mx-auto border-3 bg-white" style={{ width: '1300px', padding: '25px' }}>
        <div>
          <h5>Insert Shift Detail</h5>
          <div className="d-flex mt-3">
            <div className="d-inline mx-5">
              <label className="form-label">เลือกช่วงเวลากะ</label>
              <select className="form-select border-2  mt-2" value={selectedShift} onChange={(e) => setSelectedShift(e.target.value)}>
                <option value="">---</option>
                {shifts.map(shift => (
                  <option key={shift.shiftID} value={shift.shiftID}>
                    {shift.shiftID}
                  </option>
                ))}
              </select>
            </div>
            <div className="d-inline mx-5">
              <label className="form-label">ช่วงเวลา กะ</label>
              <input type="text" className="form-control border-2  mt-2" value={shiftRange} style={{ width: '300px' }} readOnly />
            </div>
          </div>
        </div>
        <div>
        <div className="d-flex mt-3">
            <div className="d-inline mx-5">
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
          </div>
        </div>

      </section>
    </div>
  )
}

export default AddShiftDetailPage;
