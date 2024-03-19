import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function Edit() {
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        axios.get('http://localhost:8080/'+id)
        .then(res => {
            console.log(res)
            setValues({...values,userid:res.data[0].userid, 
                firstname:res.data[0].firstname,
                surname:res.data[0].surname,
                email:res.data[0].email,
                date:res.data[0].date,
                passworduser:res.data[0].passworduser})
    })
            
        .catch(err => console.log(err));
    },[])

    const [values, setValues] = useState({
        userid: '',
        firstname: '',
        surname: '',
        email: '',
        date:'',
        passworduser: ''
    });
    const handleUpdate = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8080/Edit/${id}`, values)

            .then(res => {
                console.log(res);
                navigate('/');
            })
            .catch(err => console.log(err));
    };

    return (
        <div className='d-flex justify-content-center align-items-center bg-light min-vh-100'>
            <div className='bg-white p-3 rounded w-50'>
                <form onSubmit = {handleUpdate}>
                    <h2> Edit </h2>
                    <div className="mb-3">       
                        <label htmlFor='userid'><strong>USER id  : </strong></label>
                        <input type="text" placeholder='Enter an userid' name='userid'
                        className='form-control rounded-0' value={values.userid} onChange={e=> setValues({ ...values,userid: e.target.value })} />
                        
                        {/* {errors.userid && <span className='text-danger'> {errors.userid} </span>} */}

                    </div>
                    <div className="mb-3">
                        <label htmlFor='firstname'><strong>First Name : </strong></label>

                        <input type="text" placeholder='Enter First Name' name='firstname'
                        className='form-control rounded-0'value={values.firstname} onChange={e=> setValues({ ...values,firstname: e.target.value })} />

                    </div>

                    <div className="mb-3">
                        <label htmlFor='surname'><strong>SurName : </strong></label>

                        <input type="text" placeholder='Enter Surname' name='surname'
                        className='form-control rounded-0'value={values.surname} onChange={e=> setValues({ ...values,surname: e.target.value })} />

                        {/* {errors.surname && <span className='text-danger'> {errors.surname} </span>} */}

                    </div>


                    <div className="mb-3">
                        <label htmlFor='email'><strong>Email : </strong></label>

                        <input type="email" placeholder='Enter Email' name='email' 
                        className='form-control rounded-0'value={values.email} onChange={e=> setValues({ ...values,email: e.target.value })} />

                        {/* {errors.email && <span className='text-danger'> {errors.email} </span>} */}

                    </div>

                    <div className="mb-3">       
                        <label htmlFor='date'><strong>Date birth day : (02/15/2014) </strong></label>
                        <input type="date" placeholder='select date (mm/dd/yyyy) (02/15/2014) ' name='date' 
                        className='form-control rounded-0'value={values.date} onChange={e=> setValues({ ...values,date: e.target.value })} />

                        {/* {errors.date && <span className='text-danger'> {errors.date} </span>} */}

                    </div>
                    
                    
                    <div className="mb-3">    
                        <label htmlFor='passworduser'><strong>Password :  </strong></label>

                        <input type="text" placeholder='Enter the password' name='passworduser' 
                        className='form-control rounded-0'value={values.passworduser} onChange={e=> setValues({ ...values,passworduser: e.target.value })} />

                        {/* {errors.passworduser && <span className='text-danger'> {errors.passworduser} </span>} */}

                    </div>
                    
                    <div className="d-flex justify-content-between">
                        <Link to="/" className='btn btn-sm btn-warning'>Back</Link>
                        <Link to={'/edit/${user.ID}'}  className='btn btn-sm btn-success'>Update</Link>
                    </div>
                    
                </form>
            </div>
        </div>
    );
}


export default Edit;
