import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import axios from 'axios';
import moment from "moment";
import { Table, Button } from 'react-bootstrap';
import { useUser } from './UserContext';
// import { useNavigate } from 'react-router-dom';



const TimeManager = () => {
  const [timeId, setTimeId] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [typetimes, setTypetimes] = useState([]);
  const { user } = useUser();
  // const navigate = useNavigate();

  useEffect(() => {
    const fetchTypetimes = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/typetimes/all`);
        setTypetimes(response.data);
      } catch (error) {
        console.error('Error fetching typetimes:', error);
      }
    };

    

    console.log("ใหม่time");
    console.log(user);
    fetchTypetimes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInputTimeIdChange = (event) => {
    setTimeId(event.target.value);
  };

  const calculateHoursDifference = () => {
    if (!startTime || !endTime) return '';

    const startMoment = moment(startTime, 'HH:mm');
    const endMoment = moment(endTime, 'HH:mm');

    if (!startMoment.isValid() || !endMoment.isValid()) return '';

    if (endMoment.isBefore(startMoment)) {
      endMoment.add(1, 'day');
    }
    const duration = moment.duration(endMoment.diff(startMoment));
    const hours = duration.hours();
    const minutes = duration.minutes();



    return `${hours} ชั่วโมง ${minutes < 10 ? '' : ''}${minutes} นาที`;
  };

  const addData = async () => {
    if (!startTime || !endTime || !timeId) {
      window.alert('Please fill in all fields.');
      return;
    }

    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/typetimes/check/${timeId}`);
      if (response.status === 200) {
        try {
          await axios.post(`${process.env.REACT_APP_API_URL}/typetimes/create`, {
            timeID: timeId,
            timeStart: startTime,
            timeEnd: endTime
          });
          window.alert('Data saved successfully.');
          window.location.reload();
        } catch (error) {
          console.error('Error creating type time:', error);
          window.alert('Failed to save data.');
        }
      }
    } catch (error) {
      console.error('Error checking duplicate type time:', error);
      window.alert('Duplicate data. Please recheck the data.');
    }
  };

  const handleDelete = async (typetimeId) => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_API_URL}/typetimes/delete/${typetimeId}`);
      if (response.status === 200) {
        window.alert('Data deleted successfully.');
        // อัพเดทข้อมูล typetimes หลังจากลบข้อมูลสำเร็จ
        const updatedTypetimes = typetimes.filter((typetime) => typetime.timeID !== typetimeId);
        setTypetimes(updatedTypetimes);
      }
    } catch (error) {
      console.error('Error deleting typetime:', error);
      window.alert('Failed to delete data.');
    }
  };

  //กันคนเข้าผ่านลิ้งค์โดยไม่ล็อคอิน
  // useEffect(() => {
  //   if (!user || (user.role !== '2' && user.role !== '3')) {
  //     // หาก Role ไม่ใช่ 2 หรือ 3 ไม่ให้แสดงหน้านี้
  //     navigate('/'); // ส่งไปหน้าหลักหรือหน้าที่ต้องการ
  //   }

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [user]);

  return (
    <div className='bg-success' style={{ minHeight: '100vh', padding: '50px' }}>
      <section className="rounded border mx-auto border-3 bg-white" style={{ width: '1300px', padding: '25px' }}>
      <div>
        <h5>รายละเอียดทั่วไป</h5>
        <div className="mb-3" style={{ width: '400px' }}>
          <label className="form-label">รหัสเวลากะการทำงาน</label>
          <input type="text" className="form-control border-2" id="timeId" placeholder='Txx (x = เลข)' value={timeId} onChange={handleInputTimeIdChange} />
        </div>
        <div className="mt-5">
          <div className="d-flex mt-4">
            <div className="d-inline">
              <p>เวลาเริ่มต้นกะ</p>
              <TimePicker label="เวลาเริ่มต้นกะ" onChange={setStartTime} value={startTime} disableClock={true} hourPlaceholder="00" minutePlaceholder="00" />
            </div>
            <div className="d-inline mx-5 px-5 ">
              <p>เวลาสิ้นสุดกะ</p>
              <TimePicker label="เวลาสิ้นสุดกะ" onChange={setEndTime} value={endTime} disableClock={true} hourPlaceholder="00" minutePlaceholder="00" />
            </div>
            <div className="d-inline mx-5">
              <label className="form-label">ชั่วโมงการทำงาน</label>
              <input type="text" className="form-control border-2" id="hourDiff" value={calculateHoursDifference()} style={{ width: '300px' }} readOnly />
            </div>
            <div className="d-inline mt-3 pull-right float-right" style={{ paddingTop: '17px', paddingLeft: '100px' }}>
              <button className="btn btn-success" onClick={addData} style={{ width: '100px' }}>Save</button>
            </div>
          </div>
        </div>
        <p style={{ marginTop: '60px'}}>จัดการเวลากะการทำงาน</p>
        <div className="" style={{ width: '400px', maxHeight: '144px', overflowY: 'auto' }}>
          <Table striped bordered hover >
            <tbody>
              {typetimes.map((typetime) => (
                <tr key={typetime.timeID}>
                  <td>{typetime.timeID}: {moment(typetime.timeStart, 'HH:mm').format('HH:mm')} - {moment(typetime.timeEnd, 'HH:mm').format('HH:mm')}</td>
                  <td style={{ textAlign: 'center' }}>
                    <Button variant="danger" size="sm" onClick={() => handleDelete(typetime.timeID)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </section>
    </div>
  );
};

export default TimeManager;
