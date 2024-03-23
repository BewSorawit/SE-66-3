function Validation(values) {
    // alert("")
    let error ={}    // object
    const email_pattern =  /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                              
                            //    at least one number    one lowercase letter  one uppercase letter   [all having when writing]  the password musch have 8 letter
    const password_pattern =                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
    
    const password_pattern_letter =         /^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d]{2,}$/
    const password_pattern_number =         /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{3,}$/
    const password_pattern_count =         /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/


    // userid: '',         /
    // firstname: '',      /
    // surname: '',         /
    // email: '',         / 
    // date:'',           /
    // passworduser: ''   /


 // ?????????????????????????????????????????????????????????????
    if(values.date === "" ){
        error.date = "Name should not be empty"
    }
    else {
        error.date = ""
    }

   
   
    // ?????????????????????????????????????????????????????????????
    if(values.userid === "" ){
        error.userid = "userid should not be empty"
    }
    else {
        error.userid = ""
    }



    // ?????????????????????????????????????????????????????????????
    if(values.firstname === "" ){
        error.firstname = "Firstname should not be empty"
    }
    else {
        error.firstname = ""
    }


    // ?????????????????????????????????????????????????????????????
    if(values.surname === "" ){
        error.surname = "Surname should not be empty"
    }
    else {
        error.surname = ""
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


    if(values.passworduser === "" ){
        error.passworduser = "Password should not be empty"
    }
    else if(!password_pattern.test(values.passworduser)){
        // let text = "Password didn't match\nhellow "  
        // alert(text);
        // error.passworduser = "Password didn't match"
        
        if(!password_pattern_letter.test(values.passworduser)){
            error.passworduser = "Password about letter"
            let text = "Password must have at least 1 lowercase letter \nPassword must have at least 1 uppercase letter\nand the password must have 8 charactor "
            alert(text);
        }
        else if(!password_pattern_number.test(values.passworduser)){
            error.passworduser = "Password about number"
            let text = "Password must have \" Number \"  at least 1 letter"
            alert(text);
        }
        else if(!password_pattern_count.test(values.passworduser)){
            error.passworduser = "Password about count charactor"
            let text = "Password must have at least 8 charactor on it"
            alert(text);
        }
        
        
    }
    else {
        error.passworduser = ""
    }

    return error;
}

export default Validation;