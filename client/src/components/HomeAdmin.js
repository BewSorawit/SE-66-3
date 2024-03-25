import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 

const HomeAdmin = ({ user }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!user) return; // ตรวจสอบว่า user มีค่าหรือไม่

                const userResponse = await axios.get(`${process.env.REACT_APP_API_URL}/users/getAllUsersAndBranchAndRole`);
                const filteredData = userResponse.data.filter(variable => variable.branchID === user.branchID);
                setUsers(filteredData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [user]); // ระบุ user เป็น dependency ของ useEffect

    const handleDelete = (id) => {
        axios.delete(`${process.env.REACT_APP_API_URL}/delete/${id}`)
            .then(res => {
                console.log(res);
                // Update state or refresh page as needed
            })
            .catch(err => console.log(err));
    }

    return (
        <div className='d-flex justify-content-center align-items-center bg-Light min-vh-100'>
            <div className='bg-white p-3 rounded w-75'>
                <div className='d-flex justify-content-end'>
                    <Link to="/signup" className='btn btn-warning w-100 '>Add</Link>
                </div>
                <table className='table table-striped'>
                    <thead>
                        <tr>
                            <th>userID</th>
                            <th>firstName</th>
                            <th>surName</th>
                            <th>email</th>
                            <th>dateBirth</th>
                            {/* <th>passwordUser</th> */}
                            <th>Branch</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={index}>
                                <td>{user.userID}</td>
                                <td>{user.firstName}</td>
                                <td>{user.surName}</td>
                                <td>{user.email}</td>
                                <td>{user.dateBirth}</td>
                                {/* <td>{user.passwordUser}</td> */}
                                <td>{user.branch.branchName}</td>
                                <td>{user.typerole.roleName}</td>
                                <td>
                                    <div className='d-flex justify-content-end'>
                                        <Link to={`/edit/${user.ID}`} className='btn btn-sm btn-primary mx-2'>Edit</Link>
                                        <button onClick={() => handleDelete(user.ID)} className='btn btn-sm btn-danger'>Delete</button>
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

export default HomeAdmin;
