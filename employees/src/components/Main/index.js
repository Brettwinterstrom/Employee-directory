import React, { useState, useEffect } from "react";
import API from "../../utils/API";

export default function Main() {

    const [employeeData, setEmployeeData] = useState([]);
    const [employeeFilteredData, setEmployeeFilteredData] = useState([]);
    const [order, setOrder] = useState("1");
    const [filteredEmployees, setfilteredEmployees] = useState([]);

    useEffect(() => {
        API.getUser().then((res) => {
            setEmployeeData(res.data.results);
            setEmployeeFilteredData(res.data.results);
        });
    }, []);

    const renderEmployeeCards = () => {
        const employeeCards = employeeFilteredData.map(({ login, picture, name, phone, email, dob }) => {
            return (
                <tr key={login.uuid}>
                    <td><img src={picture.medium} /></td>
                    <td>{name.first} {name.last}</td>
                    <td>{phone}</td>
                    <td>{email}</td>
                    <td>{dob.date}</td>
                </tr>
            );
        });
        return employeeCards;
    };

    const handleChange = () => {
        //get userinput
        const userInput = document.querySelector("#search").value.toLowerCase();

        //filter
        const filteredEmployeeList = employeeData.filter((employee) => employee.name.first.toLowerCase().indexOf(userInput) > -1);

        //set filtered state
        setEmployeeFilteredData(filteredEmployeeList);
    }

    const handleClick = (event) => {
        event.preventDefault();
        //flip the order
        if (order === "^" || order === "") {
            const filteredArray = employeeData

            filteredArray.sort((a, b) => (a.name.first < b.name.first) ? 1 : -1);
            setOrder({ order: 'v' });
            setfilteredEmployees({ filteredArray })

        } else {
            const filteredArray = employeeData
            filteredArray.sort((a, b) => (a.name.first > b.name.first) ? 1 : -1);
            setOrder({ order: '^' });
            setfilteredEmployees({ filteredArray })
        }
    }



    return (
        <>
            <input id="search" placeholder="Search Employee Here" onChange={handleChange} />
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Image</th>
                        <th scope="col" onClick={handleClick}>Name</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Email</th>
                        <th scope="col">DOB</th>
                    </tr>
                </thead>
                <tbody>
                    {renderEmployeeCards()}
                </tbody>
            </table>
        </>
    );


};