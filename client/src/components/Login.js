import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import Validation from './LoginValidation';
import axios from 'axios'


function Login() {
    // 1
    const [values,setValues] = useState({
        email: '',
        passworduser: ''
    })

    const navigate = useNavigate();
    
    // like if   มั้งนะ        6 
    const [errors,setErrors] = useState({})

    // 4
    const handleInput = (event) =>(
        setValues(prev => ({...prev, [event.target.name]:[event.target.value] }))
    )
    
    // 2 
    const handleSubmit = (event) =>{
        event.preventDefault();    // updating the valuse       3 
        setErrors(Validation(values));  // loginValidation     return here              5 
        if( errors.email ==="" && errors.passworduser === "" ) {
            axios.post(`${process.env.REACT_APP_API_URL}/login` , values)  // return Success
            .then(res => {
                if(res.data === "Success"){
                    alert("Login suck seed");
                    navigate('/home') 
                }
                else{
                    alert("No record existed");
                }
            })
            .catch(err => console.log(err));
        }
    }

    

    return( 



                                // V this is an the css but it will add this location    in the css  not have this class        content is the  data in the final margin
        <div className='d-flex justify-content-center align-items-center bg-success vh-100'>
            
            <div className='bg-white p-3 rounded w-25'>
                
                <head className='d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom'>
                        <h3>Sign in</h3>
                </head>
                <form action='' onSubmit={handleSubmit} >
                                                {/* mb - 3  is a margin layer 3  */}
                    <div className='mb-3'>  
                        <label htmlFor='email'><strong>Email</strong></label>
                        <input type='email' placeholder='Enter Email' name='email'
                        onChange={handleInput} className='form-control rounded-0' ></input>

                        {errors.email && <span className='text-danger'> {errors.email} </span>}

                    </div>

                    <div className='mb-3'>
                        <label htmlFor='passworduser'><strong>Password</strong></label>
                        <input type='password' placeholder='Enter Password' name='passworduser'
                        onChange={handleInput} className='form-control rounded-0' ></input>

                        {errors.passworduser && <span className='text-danger'> {errors.passworduser} </span>}

                    </div>

                    {/* <button className='button button-success'>Log in</button>      the bootstrap cannot read char some character  */}
                    <button type='submit' className='btn btn-success w-100 rounded-0'>Log in</button>                                   
                                                                                                           
                    {/* <p>You are agree to our terms and policies</p>                                         */}
                                                                                                           
                    {/* <button className='button button-default border'>Create Account</button>       the bootstrap cannot read char some character   */}
                    {/* <Link to='/signup' className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none '>Create Account</Link>      */}
                                             {/* first this is an button style  */}

                </form>
            </div>
        </div>
    )
}

export default Login