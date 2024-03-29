import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Make sure axios is imported

function HomeFc({ user }) {
    const [usersInBranch, setUsersInBranch] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {

                const responseFcDetails = await axios.get(`${process.env.REACT_APP_API_URL}/Fcdetails`);
                const responseAllUsers = await axios.get(`${process.env.REACT_APP_API_URL}/users/all`);

                // Step 1: Filter fcDetails to get branchID associated with the FC
                const userFcBranchIDs = responseFcDetails.data.filter(fcDetail => fcDetail.userID === user.branchID);

                console.log(userFcBranchIDs);

                // Step 2: Filter responseAllUsers to get users associated with branchID from fcDetails
                const usersInFCBranch = responseAllUsers.data.filter(user => fcBranchIDs.includes(user.branchID));

                // Step 3: Extract names of users
                const fcUserNames = usersInFCBranch.map(user => `${user.firstName} ${user.surName}`);

                // console.log(fcUserNames);


            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData(); // Call fetchData function

    }, [user]); // Dependency array to trigger effect when user changes

    return (
        <div>
            <h1>Users in the Same Branch</h1>
            <ul>
                {usersInBranch.map((name, index) => (
                    <li key={index}>{name}</li>
                ))}
            </ul>
        </div>
    );
}

export default HomeFc;
