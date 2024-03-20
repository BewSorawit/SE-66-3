import React, { useState,useEffect } from 'react'
import axios from 'axios'

import { Link, useNavigate } from 'react-router-dom'

function Signup() {
    
    const [branches, setBranch] = useState([]);
    const [role, setRole] = useState([]);

    useEffect(() => {
        // Fetch schedules and times from the server
        const fetchData = async () => {
            try {
                const branchResponse = await axios.get(`${process.env.REACT_APP_API_URL}/branches/all`);
                const roleResponse = await axios.get(`${process.env.REACT_APP_API_URL}/roles/all`);
                setBranch(branchResponse.data);
                setRole(roleResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);


    const [values,setValues] = useState({
        userID: '',
        firstName: '',
        surName: '',
        email: '',
        dateBirth:'',
        passwordUser: '' ,
        branchID: '' ,
        roleID: ''
    })
    const [errors,setErrors] = useState({})

    const navigate = useNavigate();

    const handleChange = (event) => {
        setValues({...values,[event.target.name]:event.target.value})
    }

    const handleInput = (event) =>{
        setValues(prev => ({...prev,[event.target.name]:event.target.value }))
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(Validation(values));
        if(errors.userID === "" && errors.email === "" && errors.passwordUser === "" && errors.firstName === "" && errors.surName === "" && errors.branchID === "" && errors.roleID === ""  ){
            axios.post(`${process.env.REACT_APP_API_URL}/users/create`,values)
            .then(res => {
                alert("Add success!!")
                navigate('/home2');
            })
            .catch(err => console.log(err));
        }
    }


    return (

        <body className='d-flex justify-content-center align-items-center bg-light min-vh-255'> 
            <div className="bg-white p-5 rounded w-50  ">
                
                <h3>Sign Up</h3>
                <form action="" onSubmit={handleSubmit}>

                    <div className="mb-3">       
                        <label htmlFor='userID'><strong>User id : </strong></label>

                        <input type="text" placeholder='Enter an id user ( only for admin do it )' name='userID'
                        className='form-control rounded-0' onChange={handleInput} />

                        {errors.userID && <span className='text-danger'> {errors.userID} </span>}

                    </div>


                    <div className="mb-3">
                        <label htmlFor='firstName'><strong>First Name : </strong></label>

                        <input type="text" placeholder='Enter First Name' name='firstName'
                        className='form-control rounded-0' onChange={handleInput} />

                        {errors.firstName && <span className='text-danger'> {errors.firstName} </span>}

                    </div>

                    <div className="mb-3">
                        <label htmlFor='surName'><strong>SurName : </strong></label>

                        <input type="text" placeholder='Enter Surname' name='surName'
                        className='form-control rounded-0' onChange={handleInput} />

                        {errors.surName && <span className='text-danger'> {errors.surName} </span>}

                    </div>


                    <div className="mb-3">
                        <label htmlFor='email'><strong>Email : </strong></label>

                        <input type="email" placeholder='Enter Email' name='email' 
                        className='form-control rounded-0' onChange={handleInput} />

                        {errors.email && <span className='text-danger'> {errors.email} </span>}

                    </div>

                    <div className="mb-3">       
                        <label htmlFor='date'><strong>Date birth day : (02/15/2014) </strong></label>

                        {/* <DatePicker 
                            selected={selectedDate} 
                            onChange={date => setSelectedDate(date)} 
                            // onChange={handleChange}

                        >
                        </DatePicker> */}

                        <input type="date" placeholder='select date' name='dateBirth' 
                        className='form-control rounded-0' onChange={handleInput} />

                        {errors.dateBirth && <span className='text-danger'> {errors.dateBirth} </span>}

                    </div>
                    
                    
                    <div className="mb-3">    
                        <label htmlFor='passwordUser'><strong>Password :  </strong></label>

                        <input type="text" placeholder='Enter the password' name='passwordUser' 
                        className='form-control rounded-0' onChange={handleInput} />

                        {errors.passwordUser && <span className='text-danger'> {errors.passwordUser} </span>}

                    </div>
                    
                    
                    <div className="row">
                        <div className="col-sm-12">

                            <label className='' htmlFor='branchID'><strong>Branch : </strong></label>

                            <div className="row mb-3" >
                                <div className="form-group col-md-4">

                                    <select name='branchID' className='form-select' onChange={(e) => setValues({ ...values,branchID: e.target.value })} >
                                        <option>-- select branch -- </option>
                                        {
                                            branches.map( (getcon)  => (
                                                <option key={getcon.branchID} value={getcon.branchID}>    {getcon.branchName}    </option>
                                            ))
                                        }
                                    </select>
                                    {errors.branchID && <span className='text-danger'> {errors.branchID} </span>} 
                                </div>
                            </div>
                            
                        </div>
                    </div>


                    <div className="row">     
                        <div className="col-sm-12">
                            
                            <label htmlFor='roleID'><strong>Role : </strong></label>

                            <div className="row mb-3" >
                                <div className="form-group col-md-4">

                                    <select name='roleID' className='form-select' onChange={(e) =>setValues({ ...values,roleID: e.target.value })} >
                                        <option>-- select role -- </option>
                                        {
                                            role.map( (getcon)  => (
                                                <option key={getcon.roleID} value={getcon.roleID}>    {getcon.roleName}    </option>
                                            ))
                                        }
                                    </select>
                                    {errors.roleID && <span className='text-danger'> {errors.roleID} </span>} 
                                </div>
                            </div>


                        </div>
                    </div>



                    {/* <button className='button button-default border'>Create Account</button>       the bootstrap cannot read char some character   */}
                    {/* <Link to="/"  type='submit' className='btn btn-success w-100 rounded-0'>Regis (Sign up)</Link> */}
                                                     {/* first this is an button style  */}
                

                    {/* <button className='button button-success'>Log in</button>      the bootstrap cannot read char some character  */}
                    <button type='submit' className='btn btn-success w-100 rounded-0 '>Sign up or checking up</button>                                   
                                                                                 
                    <p></p>                                        
                                                                                                           
                    {/* <button className='button button-default border'>Create Account</button>       the bootstrap cannot read char some character   */}
                    <Link to='/home2' className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none  '>Back</Link>     
                                             {/* first this is an button style  */}
                </form>
            
            </div>
        </body> 
    )
}

function Validation(values) {
    // alert("")
    let error ={}    // object
    const email_pattern =  /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                              
                            //    at least one number    one lowercase letter  one uppercase letter   [all having when writing]  the password musch have 8 letter
    const password_pattern =                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
    
    const password_pattern_letter =         /^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d]{2,}$/
    const password_pattern_number =         /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{3,}$/
    const password_pattern_count =         /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/


    // userID: '',
    // firstName: '',
    // surName: '',
    // email: '',
    // dateBirth:'',
    // passwordUser: '' ,
    // branchID: '' ,
    // roleID: ''

// ?????????????????????????????????????????????????????????????
if(values.branchID === "" ){
    error.branchID = "Branch should not be empty"
}
else {
    error.branchID = ""
}



// ?????????????????????????????????????????????????????????????
if(values.roleID === "" ){
    error.roleID = "Role should not be empty"
}
else {
    error.roleID = ""
}



 // ?????????????????????????????????????????????????????????????
    if(values.dateBirth === "" ){
        error.dateBirth = "DateBirth should not be empty"
    }
    else {
        error.dateBirth = ""
    }

   
   
    // ?????????????????????????????????????????????????????????????
    if(values.userID === "" ){
        error.userID = "Userid should not be empty"
    }
    else {
        error.userID = ""
    }



    // ?????????????????????????????????????????????????????????????
    if(values.firstName === "" ){
        error.firstName = "Firstname should not be empty"
    }
    else {
        error.firstName = ""
    }


    // ?????????????????????????????????????????????????????????????
    if(values.surName === "" ){
        error.surName = "Surname should not be empty"
    }
    else {
        error.surName = ""
    }


    if(values.email === "" ){
        error.email = "Email should not be empty"
    }
    else if(!email_pattern.test(values.email)){
        error.email = "Email didn't match"
    }
    else {
        error.email = ""
    }


    if(values.passwordUser === "" ){
        error.passwordUser = "Password should not be empty"
    }
    else if(!password_pattern.test(values.passwordUser)){
        // let text = "Password didn't match\nhellow "  
        // alert(text);
        // error.passwordUser = "Password didn't match"
        
        if(!password_pattern_letter.test(values.passwordUser)){
            error.passwordUser = "Password about letter"
            let text = "Password must have at least 1 lowercase letter \nPassword must have at least 1 uppercase letter\nand the password must have 8 charactor "
            alert(text);
        }
        else if(!password_pattern_number.test(values.passwordUser)){
            error.passwordUser = "Password about number"
            let text = "Password must have \" Number \"  at least 1 letter"
            alert(text);
        }
        else if(!password_pattern_count.test(values.passwordUser)){
            error.passwordUser = "Password about count charactor"
            let text = "Password must have at least 8 charactor on it"
            alert(text);
        }
        
        
    }
    else {
        error.passwordUser = ""
    }

    return error;
}


export default Signup 