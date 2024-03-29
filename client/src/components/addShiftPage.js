import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import moment from "moment";
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from 'react-router-dom';



const AddShiftPage = ({user}) => {
  const [shiftID, setShiftID] = useState('');
  const [date, setDate] = useState(new Date());
  const [typetimes, setTypetimes] = useState([]);
  const [selectedTypetime, setSelectedTypetime] = useState('');
  const [hourDiff, setHourDiff] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    date.setHours(7, 0, 0, 0);
    fetchTypetimes();
    console.log("ใหม่addshift");
    console.log(user);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchTypetimes = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/typetimes/all`);
      setTypetimes(response.data);
    } catch (error) {
      console.error('Error fetching typetimes:', error);
    }
  };

  const handleInputShiftIDChange = (event) => {
    setShiftID(event.target.value);
  };

  useEffect(() => {
    if (selectedTypetime) {
      const typetime = typetimes.find(item => item.timeID === selectedTypetime);
      if (typetime) {
        const startMoment = moment(typetime.timeStart, 'HH:mm');
        let endMoment = moment(typetime.timeEnd, 'HH:mm');

        if (endMoment.isBefore(startMoment)) {
          endMoment.add(1, 'day');
        }

        if (startMoment.isValid() && endMoment.isValid()) {
          const duration = moment.duration(endMoment.diff(startMoment));
          const hours = duration.hours();
          const minutes = duration.minutes();

          setHourDiff(`${hours} ชั่วโมง ${minutes < 10 ? '' : ''}${minutes} นาที`);
        }
      }
    } else {
      setHourDiff('');
    }
  }, [selectedTypetime, typetimes]);

  const addData = async () => {
    console.log(shiftID, selectedTypetime, user.branchID);

    if (!shiftID || !selectedTypetime || !date) {
      window.alert('Please fill in all fields.');
      return;
    }

    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/shifts/check/${shiftID}`);
      if (response.status === 200) {
        try {
          await axios.post(`${process.env.REACT_APP_API_URL}/shifts/createShiftWeb`, {
            shiftID: shiftID,
            date: date,
            timeID: selectedTypetime,
            branchID: user.branchID
          });
          window.alert('Data saved successfully.');
          navigate('/shiftManagementPage');
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
    <div className='bg-success' style={{ minHeight: '100vh', padding: '50px' }}>
      <section className="rounded border mx-auto border-3 bg-white" style={{ width: '1300px', padding: '25px' }}>
        <div>
          <h5>Insert Shift</h5>
          <div className="my-3" style={{ width: '400px' }}>
            <label className="form-label">รหัสกะการทำงาน</label>
            <input type="text" className="form-control border-2" id="shiftID" placeholder='Sxx (x = เลข)' value={shiftID} onChange={handleInputShiftIDChange} />
          </div>

          <div className="">
            <div className="d-flex mt-3">
              <div className="d-inline">
                <p>เลือกวันของกะ</p>
                <DatePicker className="rounded border border-2" selected={date} onChange={(date) => setDate(date)} showIcon isClearable />
              </div>
              <div className="d-inline mx-5">
                <label className="form-label">เลือกช่วงเวลากะ</label>
                <select className="form-select border-2  mt-2" value={selectedTypetime} onChange={(e) => setSelectedTypetime(e.target.value)}>
                  <option value="">---</option>
                  {typetimes.map(typetime => (
                    <option key={typetime.timeID} value={typetime.timeID}>
                      {moment(typetime.timeStart, 'HH:mm').format('HH:mm')} - {moment(typetime.timeEnd, 'HH:mm').format('HH:mm')}
                    </option>
                  ))}
                </select>
              </div>
              <div className="d-inline mx-5">
                <label className="form-label">ชั่วโมงการทำงาน</label>
                <input type="text" className="form-control border-2  mt-2" id="hourDiff" value={hourDiff} style={{ width: '300px' }} readOnly />
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
};

export default AddShiftPage;
