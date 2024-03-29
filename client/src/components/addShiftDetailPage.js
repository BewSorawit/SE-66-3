import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import moment from 'moment';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';


function AddShiftDetailPage({user}) {
  const [shiftDetails, setShiftDetails] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState();
  const [shiftRange, setShiftRange] = useState();
  const location = useLocation();
  const navigate = useNavigate();
  const shift = location.state.shift;


  useEffect(() => {
    console.log("addShiftDetail")
    console.log(user);
    console.log(shift);
    fetchShiftDetails();
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const fetchShiftDetails = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/shiftdetails/showShiftDetail`);
      const filteredData = response.data.filter(shiftDetail => shiftDetail.shiftID === shift.shiftID);
      const eventsData = filteredData.map((shiftDetail, index) => {
        return {
          shiftDetailID: shiftDetail.shiftDetailID,
          shiftID: shiftDetail.shiftID,
          userID: shiftDetail.userID,
          firstName: shiftDetail.user.firstName,
          surName: shiftDetail.user.surName
        };
      });
      setShiftDetails(eventsData);
    } catch (error) {
      console.error('Error fetching shift:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/all`);
      const bID = user.branchID;
      const filteredData = response.data.filter(data => data.branchID === bID && (data.roleID === "3" || data.roleID === "2"));
      setUsers(filteredData);
    } catch (error) {
      console.error('Error fetching typetimes:', error);
    }
  };

  useEffect(() => {
    if (shift) {
      const startDateTime = moment(shift.start).format('DD/MM/YYYY, HH:mm');
      const endDateTime = moment(shift.end).format('DD/MM/YYYY, HH:mm');
      setShiftRange(`${startDateTime} - ${endDateTime}`);
    } else {
      setShiftRange('');
    }
  }, [shift]);

  const addData = async () => {
    if (!shift || !selectedUser) {
      window.alert('Please fill in all fields.');
      return;
    }

    const clChecked = document.getElementById('cl').checked ? 'yes' : 'no';
    const otChecked = document.getElementById('ot').checked ? 'OT' : 'shift';
    console.log({
      shiftID: shift.shiftID,
      userID: selectedUser,
      status: otChecked,
      statusCL: clChecked
    });

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/shiftdetails/createWeb`, {
        shiftID: shift.shiftID,
        userID: selectedUser,
        status: otChecked,
        statusCL: clChecked
      });
      window.alert('Data saved successfully.');
      //window.location.reload();
      navigate('/shiftManagementPage');
    } catch (error) {
      console.error('Error creating ShiftDetail:', error);
      window.alert('Failed to save data.');
    }
  };

  const handleDelete = async (shiftDetailID) => {
    try {
      console.log(shiftDetailID)
      const confirmed = window.confirm('Are you sure you want to delete this shift?');
      if (!confirmed) return; // ถ้าผู้ใช้ยกเลิกการลบ

      // เรียก API ลบ Shift
      const response = await axios.delete(`${process.env.REACT_APP_API_URL}/shiftdetails/delete/${shiftDetailID}`);
      if (response.status === 200) {
        window.alert('Data deleted successfully.');
        const updatedShiftDetails = shiftDetails.filter((sd) => sd.shiftDetailID !== shiftDetailID);
        setShiftDetails(updatedShiftDetails);
      }

      fetchUsers();
    } catch (error) {
      console.error('Error deleting shift:', error);
      // ดำเนินการเพิ่มโค้ดเพื่อแสดงข้อความผิดพลาดหรือดำเนินการอื่นๆ ตามที่ต้องการ
    }
  };

  return (
    <div className='bg-success' style={{ minHeight: '100vh', padding: '50px' }}>
      <section className="rounded border mx-auto border-3 bg-white d-flex" style={{ width: '1300px', padding: '25px' }}>
        <div className='d-inline' style={{ width: '650px' }}>
          <div>
            <h5>Insert Shift Detail</h5>
            <div className="d-flex mt-3">
              <div className="d-inline">
                <label className="form-label">กะที่เลือก</label>
                <input type="text" className="form-control border-2  mt-2" value={shift.shiftID} style={{ width: '100px' }} readOnly />
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
          <div class="form-check mt-4">
            <input class="form-check-input" type="checkbox" value="" id="cl" />
            <label class="form-check-label fw-bold" for="flexCheckDefault">
              หัวหน้ากะ
            </label>
          </div>
          <div class="form-check mt-2">
            <input class="form-check-input" type="checkbox" value="" id="ot" />
            <label class="form-check-label text-danger fw-bold" for="flexCheckDefault">
              OT
            </label>
          </div>
          <div className="mt-3" style={{ paddingTop: '17px' }}>
            <button className="btn btn-success" onClick={addData} style={{ width: '100px' }}>Save</button>
          </div>
        </div>
        <div className='d-inline' style={{ width: '650px' }}>
          <h4 >พนักงานในกะ {shift.shiftID}</h4>
          <div className="" style={{ width: '500px', maxHeight: '500px', overflowY: 'auto' }}>
            <Table striped bordered hover >
              <thead>
                <tr style={{textAlign:"center"}}>
                  <th style={{ width: '70%' }}>ชื่อ - สกุล พนักงาน</th>
                  <th style={{ width: '30%' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {shiftDetails.map((shiftDetail) => (
                  <tr key={shiftDetail.shiftDetailID}>
                    <td>{shiftDetail.firstName} {shiftDetail.surName}</td>
                    <td style={{marginLeft:"=20px"}}>
                      <button className="btn btn-danger btn-sm mx-5" onClick={() => handleDelete(shiftDetail.shiftDetailID)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AddShiftDetailPage;
