import React, { useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import axios from 'axios';

const ShiftManager = () => {
  const [timeId, setTimeId] = useState();
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();

  const handleInputTimeIdChange = (event) => {
    setTimeId(event.target.value);
  };

  const calculateHoursDifference = () => {
    const startDate = new Date(`2000-01-01T${startTime}`);
    const endDate = new Date(`2000-01-01T${endTime}`);

    const timeDifferenceMs = endDate - startDate;
    const hoursDifference = Math.floor(timeDifferenceMs / (1000 * 60 * 60));

    return hoursDifference;
  };

  const addData = async () => {
    if (startTime && endTime && timeId) {
      const existingTypeTime = await axios.get(`${process.env.REACT_APP_API_URL}/typetimes/${timeId}`);
      if (existingTypeTime) {
        window.alert('Time ID already exists.');
        return;
      }

      await axios.post(`${process.env.REACT_APP_API_URL}/typetimes/create`, {
        timeID: timeId,
        timeStart: startTime,
        timeEnd: endTime
      })
      .then(response => {
        console.log('Response:', response.data);
        window.alert('Data saved successfully.');
        // ทำอย่างอื่นๆ หลังจากบันทึกข้อมูลเรียบร้อยแล้ว
      })
      .catch(error => {
        console.error('Error:', error);
        window.alert('Failed to save data.');
      });
    } else {
      window.alert('Start time, end time, or time ID is null.');
    }
  }

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
              <input type="text" className="form-control border-2" id="hourDiff" value={isNaN(calculateHoursDifference()) ? '' : calculateHoursDifference()} readOnly />
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
  )
}

export default ShiftManager;
