function Validation(values) {
    // alert(values)
    let error ={}    // object
    const email_pattern =  /^[^\s@]+@[^\s@]+\.[^\s@]+$/                              // ห้ามเว้นช่องเดกขาด
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/       // ห้ามเว้นช่องเดกขาด

    if(values.email === "" ){
        error.email = "Name should not be empty"
    }
    else if(!email_pattern.test(values.email)){
        error.email = "Email Didn't match"
    }
    else {
        error.email = ""
    }

    if(values.passworduser === "" ){
        error.passworduser = "Password should not be empty"
    }
    else if(!password_pattern.test(values.passworduser)){
        error.passworduser = "Password didn't match"
    }
    else {
        error.passworduser = ""
    }

    return error;
}

export default Validation;