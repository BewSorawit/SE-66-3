import axios from 'axios'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import "./Creative.css";

function AfterSend() {
    const navigate = useNavigate();
    const [after] = useState([])

    function handleSubmit(event) {
        event.preventDefault();
        axios.get(`${process.env.LOCALHOST}/AfterSend`)
            .then(res => {
                console.log(res);

                navigate('/');

            }).catch(err => console.log(err));
    }
    return (

        <div className='d-flex vh-100 bg-success justify-content-center align-items-center'>
            <div className='w-90 bg-white rounded p-3'>
                <form onSubmit={handleSubmit}>

                    <thead>
                        <p className="card-text font-size:25px" > You're send success! </p>
                        <p></p>
                    </thead>
                    <tbody>
                        {
                            after.map((data, i) => (
                                <tr key={i}>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            ))
                        }

                    </tbody>
                    <div className='marginafter'>
                        <Link to="/" className='btn btn-danger '>HOME</Link>

                    </div>

                </form>
            </div>
        </div>

    )
}

export default AfterSend