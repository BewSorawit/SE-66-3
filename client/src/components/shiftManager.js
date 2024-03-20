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
    const startDate = new Date(`2000-01-01T${startTime}`);
    const endDate = new Date(`2000-01-01T${endTime}`);

    // const timeDifferenceMs = endDate - startDate;
    // const hoursDifference = timeDifferenceMs / (1000 * 60 * 60);
    var ms = moment(startDate, "DD/MM/YYYY HH:mm:ss").diff(moment(endDate, "DD/MM/YYYY HH:mm:ss"));
    var d = moment.duration(ms);
    var hoursDifference = d.format("hh:mm:ss");

    return hoursDifference;
  };

  const addData = async () => {
    if (!startTime || !endTime || !timeId) {
      window.alert('Please fill in all fields.');
      return;
    }

    try {
      // ตรวจสอบว่า ID ซ้ำหรือไม่
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/typetimes/check/${timeId}`);
      if (response.status === 200) {
        // สร้างข้อมูลใหม่เมื่อไม่พบข้อมูลซ้ำ
        try {
          await axios.post(`${process.env.REACT_APP_API_URL}/typetimes/create`, {
            timeID: timeId,
            timeStart: startTime,
            timeEnd: endTime
          });
          window.alert('Data saved successfully.');
        } catch (error) {
          console.error('Error creating type time:', error);
          window.alert('Failed to save data.');
        }
      }
    } catch (error) {
      // หากมีข้อผิดพลาดในการตรวจสอบว่า ID ซ้ำหรือไม่
      console.error('Error checking duplicate type time:', error);
      window.alert('Failed to check duplicate data.');
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
              <input type="text" className="form-control border-2" id="hourDiff" value={isNaN(calculateHoursDifference()) ? '' : calculateHoursDifference() + " ชั่วโมง"} readOnly />
            </div>
          </div>
          <div className="mt-3">
            <button className="btn btn-success" onClick={addData}>Save</button>
          </div>
          {/* {JSON.stringify(endTime)} */}
          {/* {JSON.stringify(timeId)} */}
        </div>
      </div>
    </section>
  );
};

export default ShiftManager;
