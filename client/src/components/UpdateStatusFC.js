import axios from 'axios';
import React, { useState } from 'react'
import {  useNavigate, useParams } from 'react-router-dom';
import "./Creative.css";

function UpdateStatusFC() {
    const [status, setStatus] = useState('');
    const { absenceID } = useParams();
    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        axios.put(`${process.env.REACT_APP_API_URL}/FcView/update/` + absenceID, { status })
            .then(res => {
                console.log(res);
                navigate('/');
            })
            .catch(err => console.log(err));
    }

    return (
        
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>

                <form onSubmit={handleSubmit}>
                  
                                    <label htmlFor="status">Status: </label>
                                    <select name="status" id="status" onChange={e => setStatus(e.target.value)}>
                                        <option value='FC Broadcasting'>FC Broadcasting</option>
                                    </select>
                           
                               
                </form>

            </div>
        </div>
    );
}

export default UpdateStatusFC;
