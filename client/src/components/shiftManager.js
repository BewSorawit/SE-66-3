import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import axios from 'axios';
import moment from "moment";

const ShiftManager = () => {
  const [timeId, setTimeId] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const handleInputTimeIdChange = (event) => {
    setTimeId(event.target.value);
  };

  const calculateHoursDifference = () => {
    if (!startTime || !endTime) return ''; // ตรวจสอบว่ามีค่าเริ่มต้นและเวลาสิ้นสุด

    const startMoment = moment(startTime, 'HH:mm'); // สร้างวัตถุ moment จาก startTime
    const endMoment = moment(endTime, 'HH:mm'); // สร้างวัตถุ moment จาก endTime

    if (!startMoment.isValid() || !endMoment.isValid()) return ''; // ตรวจสอบว่า startTime และ endTime เป็นเวลาที่ถูกต้องหรือไม่

    const duration = moment.duration(endMoment.diff(startMoment)); // คำนวณระยะเวลาระหว่าง startMoment และ endMoment
    const hours = duration.hours(); // หาชั่วโมง
    const minutes = duration.minutes(); // หานาที

    return `${hours} ชั่วโมง ${minutes < 10 ? '' : ''}${minutes} นาที`; // คืนค่าเป็นชั่วโมงและนาทีที่รวมกัน
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


  return (
    <section className="rounded border mx-auto border-3" style={{ width: '1300px', margin: '50px', padding: '25px' }}>
      <div>
        <h5>รายละเอียดทั่วไป</h5>
        <div className="mb-3" style={{ width: '400px' }}>
          <label className="form-label">รหัสกะการทำงาน</label>
          <input type="text" className="form-control border-2" id="timeId" value={timeId} onChange={handleInputTimeIdChange} />
        </div>
        <div>
          <div className="d-flex">
            <div className="d-inline">
              <p>เวลาเริ่มต้นกะ</p>
              <TimePicker label="เวลาเริ่มต้นกะ" onChange={setStartTime} value={startTime} disableClock={true} hourPlaceholder="00" minutePlaceholder="00" />
            </div>
            <div className="d-inline mx-4">
              <p>เวลาสิ้นสุดกะ</p>
              <TimePicker label="เวลาสิ้นสุดกะ" onChange={setEndTime} value={endTime} disableClock={true} hourPlaceholder="00" minutePlaceholder="00" />
            </div>
            <div className="d-inline mx-8">
              <label className="form-label">ชั่วโมงการทำงาน</label>
              <input type="text" className="form-control border-2" id="hourDiff" value={calculateHoursDifference()} readOnly />
            </div>
          </div>
          <div className="mt-3">
            <button className="btn btn-success" onClick={addData}>Save</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShiftManager;
