import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./Creative.css";
import InfoModal from './InfoModal';
import { Link, useParams } from 'react-router-dom'


function ManagerView() {
    //จัดการ Modal
    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const [selectedOption, setSelectedOption] = useState('');
    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
    };


    //ManagerView ถ้าไม่ได้เพิ่ม /sent/:adsenceID แล้ว เรียก .map ตรงปุ่ม
    const [mana, setmana] = useState([])

    const [absenceUserList, setAbsenceUserList] = useState([]);
    const { absenceID } = useParams();

    const getAbsenceUser = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/ManagerView/sendFC` + absenceID)
            .then((response) => {
                setAbsenceUserList(response.data);
            }, [absenceID]);
    };

    const handleClick = () => {
        handleOpenModal();
        getAbsenceUser();
    }

    //รายชื่อพนักงาน
    const [userList, setUserList] = useState([]);
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/ManagerView/User`)
            .then(response => response.json())
            .then(data => {
                setUserList(data);
            })
            .catch(error => {
                console.log("Error:", error);
            });
    }, []);


    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/ManagerView/`)
            .then(res => setmana(res.data))
            .catch(err => console.log(err));

    }, [])

    return (

        <div className=' d-flex  modalBackground bg-success justify-content-center align-items-center'>

            <div className='w-80 bg-white rounded p-3 sarabun'>

                <table className='table fonttext2'>
                    <thead>
                        <tr>
                            <th>สาขา</th>
                            <th>วันที่ต้องการ</th>
                            <th>เวลาเริ่มงาน</th>
                            <th>เวลาเลิกงาน</th>
                            <th>สถานะ</th>
                            <th>รายละเอียด</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            mana.map((data, i) => (
                                <tr key={i}>
                                    <td>{data.branchName}</td>
                                    <td>{data.date}</td>
                                    <td>{data.timeStart}</td>
                                    <td>{data.timeEnd}</td>

                                    <td><button className='btn btn-primary '>{data.status}</button></td>

                                    <td>
                                        <Link to={`/sendFC/${data.absenceID}`} variant="primary" onClick={handleClick}>
                                            รายละเอียด
                                        </Link>
                                        {absenceUserList.map((val, key) => (
                                            <InfoModal
                                                key={key}
                                                data={val}
                                                userList={userList}
                                                selectedOption={selectedOption}
                                                handleSelectChange={handleSelectChange}
                                                show={showModal}
                                                handleClose={handleCloseModal}
                                            />
                                        ))}
                                    </td>

                                </tr>
                            ))
                        }

                    </tbody>
                </table>

            </div>
        </div>
    );
}

export default ManagerView;


/*import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Link } from 'react-router-dom';
import "./Creative.css";


function ManagerView() {
    const [mana, setmana] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8081/ManagerView/')
        .then(res => setmana(res.data))
        .catch(err => console.log(err));
            
        }, [])
    
  return (
    
    <div className=' d-flex  modalBackground bg-success justify-content-center align-items-center'>
  
        <div className='w-80 bg-white rounded p-3 sarabun'>
         
            <table className='table fonttext2'>
                <thead>
                    <tr>
                        <th>สาขา</th>
                        <th>วันที่ต้องการ</th>
                        <th>เวลาเริ่มงาน</th>
                        <th>เวลาเลิกงาน</th>
                        <th>สถานะ</th>
                        <th>รายละเอียด</th>
                    </tr>
                </thead>
                <tbody>
                   { 
                            mana.map((data, i) => (
                            <tr key={i}>
                                <td>{data.branchName}</td>
                                <td>{data.date}</td>
                                <td>{data.timeStart}</td>
                                <td>{data.timeEnd}</td>
                             
                                <td><button className='btn btn-primary '>{data.status}</button></td>
                            
                                <td>
                                    <Link to={`/InfoModal`} className='btn btn-warning'>รายละเอียด</Link>
                                </td>
                               
                            </tr>
                            ))
                    }

                </tbody>
            </table>
            
        </div>
    </div>
    );
}

export default ManagerView;*/
