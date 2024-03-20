import React, { useState, useEffect } from 'react';
import axios from 'axios';
function Home1() {
    const [branches, setBranches] = useState([]);
    const [role, setRole] = useState([]);

    useEffect(() => {
        // Fetch schedules and times from the server
        const fetchData = async () => {
            try {
                const branchesResponse = await axios.get(`${process.env.REACT_APP_API_URL}/branches/all`);
                const rolesResponse = await axios.get(`${process.env.REACT_APP_API_URL}/roles/all`);
                setBranches(branchesResponse.data);
                setRole(rolesResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h2>Schedule Form</h2>
            <div>
                <label htmlFor="schedule">Select Schedule:</label>
                <select id="schedule">
                    {branches.map(branch => (
                        <option key={branch.branchID} value={branch.branchID}>
                            {branch.branchName}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="time">Select Time:</label>
                <select id="time">
                    {role.map(role => (
                        <option key={role.roleID} value={role.roleID}>
                            {role.roleName}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}
export default Home1