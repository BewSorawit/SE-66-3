import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
    const [values, setValues] = useState({
        email: '',
        passwordUser: ''
    });
    // const [use, setUser] = useState([])

    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    const handleInput = (event) => (
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }))
    
        );

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(Validation(values));
        if (errors.email === "" && errors.passwordUser === "") {
            axios.post(`${process.env.REACT_APP_API_URL}/login`, values)
                .then(res => {
                    console.log(res.data);
                    if (res.data.roleID === "1") {
                        alert("Login success");
                        navigate('/home');
                    } else if (res.data.roleID === "2") {
                        navigate('/home2');
                    } else if (res.data.roleID === "3") {
                        navigate('/home3');
                    } else {
                        alert("No record existed");
                    }
                })
                .catch(err => console.log(err));
        }
    }

    return (
        <div className='d-flex justify-content-center align-items-center bg-success vh-100'>
            <div className='bg-white p-3 rounded w-25'>
                <div className='d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom'>
                    <h3>Sign in</h3>
                </div>
                <form action='' onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor='email'><strong>Email</strong></label>
                        <input type='email' placeholder='Enter Email' name='email'
                            onChange={handleInput} className='form-control rounded-0' />
                        {errors.email && <span className='text-danger'>{errors.email}</span>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='passwordUser'><strong>Password</strong></label>
                        <input type='password' placeholder='Enter Password' name='passwordUser'
                            onChange={handleInput} className='form-control rounded-0' />
                        {errors.passwordUser && <span className='text-danger'>{errors.passwordUser}</span>}
                    </div>
                    <button type='submit' className='btn btn-success w-100 rounded-0'>Log in</button>
                </form>
            </div>
        </div>
    );
}

function Validation(values) {
    let error = {};
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;

    if (values.email === "") {
        error.email = "Email should not be empty";
    } else if (!email_pattern.test(values.email)) {
        error.email = "Email format is incorrect";
    } else {
        error.email = "";
    }

    if (values.passwordUser === "") {
        error.passwordUser = "Password should not be empty";
    } else if (!password_pattern.test(values.passwordUser)) {
        error.passwordUser = "Password format is incorrect";
    } else {
        error.passwordUser = "";
    }

    return error;
}

export default Login;
