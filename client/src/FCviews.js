import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import "./Creative.css";

function FCviews() {
    const [FCviews, setFCviews] = useState([])

    useEffect(() => {
        axios.get(`${process.env.LOCALHOST}`)
            .then(res => setFCviews(res.data))
            .catch(err => console.log(err));

    }, [])

    return (
        <div className=' d-flex  modalBackground bg-success justify-content-center align-items-center'>

            <div className='d-flex  w-80 bg-white'>

            </div>
            <div className='w-80 bg-white rounded p-3'>

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
                            FCviews.map((data, i) => (
                                <tr key={i}>
                                    <td>{data.branchName}</td>
                                    <td>{data.date}</td>
                                    <td>{data.timeStart}</td>
                                    <td>{data.timeEnd}</td>

                                    <td><button className='btn btn-primary '>{data.status}</button></td>

                                    <td>
                                        <Link to={`/send/${data.ID}`} className='btn btn-warning'>รายละเอียด</Link>
                                    </td>
                                </tr>
                            ))
                        }

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default FCviews