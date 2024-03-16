// client/src/function/login.js
// import axios from 'axios';

// import { values, navigate,setErrors,errors } from '../components/Login';

// // 2 
// export const handleSubmit = (event) =>{
//     event.preventDefault();    // updating the valuse       3 
//     setErrors(Validation(values));  // loginValidation     return here              5 
//     if( errors.email ==="" && errors.passworduser === "" ) {
//         axios.post('http://localhost:8081/login' , values)  // return Success
//         .then(res => {
//             if(res.data === "Success"){
//                 alert("Login suck seed");
//                 navigate('/home') 
//             }
//             else{
//                 alert("No record existed");
//             }
//         })
//         .catch(err => console.log(err));
//     }
// };