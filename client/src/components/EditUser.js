import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
// import { TypeRole } from '../../../server/models';

const EditUser = () => {
    const { id } = useParams();
    const [branches, setBranches] = useState([]);
    const [roles, setRoles] = useState([]);
    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [branchResponse, roleResponse, userResponse] = await Promise.all([
                    axios.get(`${process.env.REACT_APP_API_URL}/branches/all`),
                    axios.get(`${process.env.REACT_APP_API_URL}/roles/all`),
                    axios.get(`${process.env.REACT_APP_API_URL}/users/${id}`)
                ]);
                setBranches(branchResponse.data);
                setRoles(roleResponse.data);
                if (userResponse) {
                    setValues(userResponse.data);
                } else {
                    console.log("");
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [id]);

    const [updatedValues, setUpdatedValues] = useState({});

const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedValues({ ...updatedValues, [name]: value });
};

const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = Validation(updatedValues); 
    setErrors(validationErrors);

    console.log('Updated Values:', updatedValues);

    try {
    
            await axios.put(`${process.env.REACT_APP_API_URL}/users/${id}`, updatedValues);
            alert('User updated successfully');
            navigate('/homeAdmin');
        
    } catch (error) {
        console.error('Error updating user:', error); // คำขอ HTTP ไม่สำเร็จ หรือมีข้อผิดพลาดอื่น ๆ
        if (error.response) {
            console.error('Status code:', error.response.status); // สถานะของคำขอ (status code)
            console.error('Error message:', error.response.data); // ข้อความผิดพลาดที่อธิบายเพิ่มเติมในข้อมูล response
        }
    }
};



    return (
        <div className='d-flex justify-content-center align-items-center bg-light min-vh-100'>
            <div className="bg-white p-5 rounded w-50">
                
                <h3>EditUser</h3>
                            
                            
                            <form onSubmit={handleSubmit}>

                                {/* <div className="mb-3"> */}
                                    {/* <label htmlFor='userID'><strong>User id : </strong></label> */}
                                    {/* <input id="userID" type="text" placeholder='Enter an id user ( only for admin do it )' name='userID' className='form-control rounded-0' */}
                                        {/* onChange={handleChange} /> */}
                                    {/* {errors.userID && <span className='text-danger'> {errors.userID} </span>}  */}
                                {/* </div> */}

                                <div className="mb-3">
                                    <label htmlFor='firstName'><strong>First Name : </strong></label>
                                    <input id="firstName" type="text"   defaultValue={values.firstName} name='firstName' className='form-control rounded-0' onChange={handleChange} />
                                 {errors.firstName && <span className='text-danger'> {errors.firstName} </span>} 
                                </div>

                                <div className="mb-3">
                                    <label htmlFor='surName'><strong>SurName : </strong></label>
                                    <input id="surName" type="text" defaultValue={values.surName} name='surName' className='form-control rounded-0' onChange={handleChange} />
                                     {errors.surName && <span className='text-danger'> {errors.surName} </span>} 
                                </div>

                                <div className="mb-3">
                                    <label htmlFor='email'><strong>Email : </strong></label>
                                    <input id="email" type="email" defaultValue={values.email} name='email' className='form-control rounded-0' onChange={handleChange} />
                                    {errors.email && <span className='text-danger'> {errors.email} </span>} 
                                </div>

                                <div className="mb-3">
                                    <label htmlFor='date'><strong>Date birth day :  </strong></label>
                                    <input id="date" type="date" defaultValue={values.dateBirth} name='dateBirth' className='form-control rounded-0' onChange={handleChange} />
                                     {errors.dateBirth && <span className='text-danger'> {errors.dateBirth} </span>} 
                                </div>

                                <div className="mb-3">
                                    <label htmlFor='passwordUser'><strong>Password :  </strong></label>
                                    <input id="passwordUser" type="text" defaultValue={values.passwordUser} name='passwordUser' className='form-control rounded-0' onChange={handleChange} />
                                    {errors.passwordUser && <span className='text-danger'> {errors.passwordUser} </span>} 
                                </div>

                                <div className="row">
                                    <div className="col-sm-12">
                                        <label className='' htmlFor='branchID'><strong>Branch : </strong></label>
                                        <div className="row mb-3">
                                            <div className="form-group col-md-4">
                                                <select id="branchID" name='branchID'  className='form-select' onChange={(e) => setValues({ ...values, branchID: e.target.value })}>
                                                    
                                                    {branches.map(getcon => (
                                                        
                                                        <option key={getcon.branchID} defaultValue={getcon.branchID}>{getcon.branchName}</option>
                                                    ))}
                                                
                                                </select>
                                                {errors.branchID && <span className='text-danger'> {errors.branchID} </span>}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-sm-12">
                                        <label htmlFor='roleID'><strong>Role : </strong></label>
                                        <div className="row mb-3">
                                            <div className="form-group col-md-4">
                                                <select id="roleID" name='roleID' defaultValue={values.roleName} className='form-select' onChange={(e) => setValues({ ...values, roleID: e.target.value })}>
                                                
                                                    {/* <option>{roles.roleID}</option> */}
                                                    {roles.map(getcon => (
                                                        <option key={getcon.roleID} value={getcon.roleID}>{getcon.roleName}</option>
                                                    ))}
                                                
                                                </select>
                                                {errors.roleID && <span className='text-danger'> {errors.roleID} </span>}
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <button className='btn btn-success w-100 rounded-0 '>Save</button>
                                <p></p>
                                <Link to='/homeAdmin' className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Back</Link>
                            </form>
                </div>      
        </div>
    );
}

    function Validation(values) {
        let errors = {};

        const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const password_pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

        if (values.branchID === "") {
            errors.branchID = "Branch should not be empty";
        } else {
            errors.branchID = "";
        }

        if (values.roleID === "") {
            errors.roleID = "Role should not be empty";
        } else {
            errors.roleID = "";
        }

        if (values.dateBirth === "") {
            errors.dateBirth = "Date of birth should not be empty";
        } else {
            errors.dateBirth = "";
        }

        // if (values.userID === "") {
            // errors.userID = "User ID should not be empty";
        // } else {
            // errors.userID = "";
        // }

        if (values.firstName === "") {
            errors.firstName = "First name should not be empty";
        } else {
            errors.firstName = "";
        }

        if (values.surName === "") {
            errors.surName = "Surname should not be empty";
        } else {
            errors.surName = "";
        }

        if (values.email === "") {
            errors.email = "Email should not be empty";
        } else if (!email_pattern.test(values.email)) {
            errors.email = "Invalid email format";
        } else {
            errors.email = "";
        }

        if (values.passwordUser === "") {
            errors.passwordUser = "Password should not be empty";
        } else if (!password_pattern.test(values.passwordUser)) {
            errors.passwordUser = "Password must contain at least 8 characters with at least one uppercase letter, one lowercase letter, and one number";
        } else {
            errors.passwordUser = "";
        }

        return errors;
    }


export default EditUser;