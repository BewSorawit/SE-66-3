import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

function InfoModal({ data, userList, selectedOption, handleSelectChange, show, handleClose }) {
      const [status, setStatus] = useState('');

      // ตรวจสอบว่าเลือกสถานะหรือไม่ก่อนส่งข้อมูล
    const handleSubmit = () => {
        if (status === '') {
          alert('กรุณาเลือกสถานะก่อนที่จะส่งข้อมูล');
        } else if (status === 'yes' && (selectedOption === 'เลือกพนักงาน' || selectedOption === '')) {
          alert('กรุณาเลือกพนักงาน');
        } else if (status === 'yes' && selectedOption !== 'เลือกพนักงาน') {
          // ทำงานเมื่อเลือกสถานะ "หาพนักงานได้" และเลือกพนักงานแล้ว
          // ส่งข้อมูลไปยัง backend หรือทำอย่างอื่นตามต้องการ
              console.log('Selected status:', status);
              console.log('Selected user:', selectedOption);

          axios.post(`${process.env.REACT_APP_API_URL}/ManagerView/saveDataUser`, { userID: selectedOption , status: status})
          .then(res => {
            console.log('Data saved successfully');
            // ทำสิ่งที่คุณต้องการหลังจากบันทึกข้อมูล
          })
          .catch(error => {
            console.error('Error saving data:', error);
            // แสดงข้อความหรือทำการจัดการเมื่อเกิดข้อผิดพลาด
          });

          handleClose();

          // ทำงานเมื่อเลือกสถานะ "หาพนักงานไม่ได้"
          // ส่งข้อมูลไปยัง backend หรือทำอย่างอื่นตามต้องการ

        }else if (status === 'no' && selectedOption === '') {
          console.log('Selected status:', status);
          console.log('Selected user:', selectedOption);

          axios.post(`${process.env.REACT_APP_API_URL}/ManagerView/saveDataUser`, { userID: null , status: status})
          .then(res => {
            console.log('Data saved successfully');
            // ทำสิ่งที่คุณต้องการหลังจากบันทึกข้อมูล
          })
          .catch(error => {
            console.error('Error saving data:', error);
            // แสดงข้อความหรือทำการจัดการเมื่อเกิดข้อผิดพลาด
          });

          handleClose();
          
        }else if (status === 'สถานะ') {
          alert('กรุณาเลือกสถานะก่อนที่จะส่งข้อมูล');
          
        }else if ( status === 'no' && selectedOption !== ''){
          selectedOption = '';
          console.log('Selected status:', status);
          console.log('Selected user:', selectedOption);

          
        }
  };

  // ปิด Modal พร้อมReset สถานะใหม่
  const handleCloseModal = () => {
          handleClose();
          handleSelectChange({ target: { value: 'เลือกพนักงาน' } });
          //yes เพื่อให้ช่องเลือกพยักงานแสดงหลังกดกลับ
          setStatus('yes');
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header>
          <Modal.Title>รายละเอียด</Modal.Title>
      </Modal.Header>
      <Modal.Body>
                  <p className="card-text">สาขาที่ต้องการ: {data.branchName}</p>
                  <p className="card-text">วันที่ต้องการ: {data.date}</p>
                  <p className="card-text">เวลาเริ่มงาน: {data.timeStart}</p>
                  <p className="card-text">เวลาเลิกงาน: {data.timeEnd}</p>
            <div className='userInBranch'>
                  <div className='mb-2'>
                    <h6>หาพนักงานได้หรือไม่</h6>
                    <Form.Select aria-label="Default select example" onChange={(e) => setStatus(e.target.value)}>
                      <option>สถานะ</option>
                      <option value="yes">หาพนักงานได้</option>
                      <option value="no">หาพนักงานไม่ได้</option>
                    </Form.Select>
                  </div>
            <div>
                  <h6>รายชื่อพนักงานในสาขา</h6>
                  <Form.Select aria-label="Default select example" value={status === 'no' ? 'เลือกพนักงาน' : selectedOption} onChange={handleSelectChange} disabled={status === 'no'}>
                    <option>เลือกพนักงาน</option>
                    {userList.map(user => (
                      <option key={user.userID} value={user.userID}>{user.firstName}</option>
                    ))}
                  </Form.Select>
            </div>
        </div>
      </Modal.Body>
            <Modal.Footer>
                  <Button variant="secondary" onClick={handleCloseModal}>Back</Button>
                  <Button variant="primary" onClick={handleSubmit}>Submit</Button>
            </Modal.Footer>
    </Modal>
  );
}

export default InfoModal;