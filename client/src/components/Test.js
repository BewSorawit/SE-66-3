import React, { useState, useEffect } from 'react';

const Test = ({ user }) => {
    const [inputUser, setInputUser] = useState(user);
    const [newUserData, setNewUserData] = useState({});

    // Initialize the input fields with the user's current data
    useEffect(() => {
        if (user) {
            setNewUserData({
                firstName: user.firstName,
                surName: user.surName,
                email: user.email,
                dateBirth: user.dateBirth,
                passwordUser: user.passwordUser,
                branchID: user.branchID,
                roleID: user.roleID,
                typerole: user.typerole
            });
        }
    }, [user]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewUserData({ ...newUserData, [name]: value });
    };

    const updateUserData = () => {
        setInputUser({ ...inputUser, ...newUserData });
        setNewUserData({});
    };

    return (
        <div>
            <input type="text" placeholder='number'/>
            <label>First Name:</label>
            <input type="text" name="firstName" value={newUserData.firstName || ''} onChange={handleInputChange} />
            <label>Surname:</label>
            <input type="text" name="surName" value={newUserData.surName || ''} onChange={handleInputChange} />
            <label>Email:</label>
            <input type="text" name="email" value={newUserData.email || ''} onChange={handleInputChange} />
            <label>Date of Birth:</label>
            <input type="date" name="dateBirth" value={newUserData.dateBirth || ''} onChange={handleInputChange} />
            <label>Password:</label>
            <input type="password" name="passwordUser" value={newUserData.passwordUser || ''} onChange={handleInputChange} />
            {/* Add more input fields for other user data */}
            <button onClick={updateUserData}>Update User Data</button>
        </div>
    );
};

export default Test;
