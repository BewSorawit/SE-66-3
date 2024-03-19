import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';



function Admin(){
    const[data,setData]=useState([])
    const[User,setUser]=useState([])

    useEffect(()=>{
        axios.get('http://localhost:8080/')
        .then(res => setData(res.data))
        .catch(err => console.log(err));
    },[])
    
    const handleDelete = (id) => {
        axios.delete(`http://localhost:8080/delete/${id}`)
            .then(res => {
                console.log(res);
                // ให้ทำการอัปเดต state หรือทำการรีเฟรชหน้าเว็บตามต้องการ
            })
            .catch(err => console.log(err));
    }
    
    
    return (
        <div className='d-flex justify-content-center align-items-center bg-Light min-vh-100'>
            <div className='bg-white p-3 rounded w-75'>
               
                <div className='d-flex justify-content-end'>
                    <Link to="/Add"  className='btn btn-warning w-100 '>Add</Link>
                </div>
                <table className='table table-striped'>
                    <thead>
                        <tr>
                            <th>userID</th>
                            <th>firstName</th>
                            <th>surName</th>
                            <th>email</th>
                            <th>dateBirth</th>
                            <th>passwordUser</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((user, index) => (
                            <tr key={index}>
                                <td>{user.userID}</td>
                                <td>{user.firstName}</td>
                                <td>{user.surName}</td>
                                <td>{user.email}</td>
                                <td>{user.dateBirth}</td>
                                <td>{user.passwordUser}</td>
                                <td>
                                <div className='d-flex justify-content-end'>
                                    <Link to={'/edit/${user.ID}'} className='btn btn-sm btn-primary mx-2'>Edit</Link>
                                    <button onClick={()=> handleDelete(user.ID)} className='btn btn-sm btn-danger'>Delete</button>

                             
                                 </div>
                                    
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Admin