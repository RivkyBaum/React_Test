import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from "react-redux"
import { currentUser } from '../redux/Actions';
import TextField from '@mui/material/TextField';
import { Table, TableHead, TableRow, TableCell, TableBody, Typography } from '@mui/material';
import '../Components/home.css'
import axios from "axios"
import { UserPosts } from './userPosts';
export const Home = () => {
    const [data, setData] = useState([]);
    const [filterText, setFilterText] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    let dispathCurrentUser = useDispatch()
//Receiving users from the server
    useEffect(() => {
        const fetchData = async () => {
            try {
                debugger
                const response = await axios.get('https://jsonplaceholder.typicode.com/users');
                setData(response.data);
                console.log(data);

            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);
//Filter by email and name
    useEffect(() => {
        if (filterText.trim() === '') {
            setFilteredData(data);
        }
        else {
            const filtered = data.filter((user) => {
                return (
                    user.name.toLowerCase().includes(filterText.toLowerCase()) ||
                    user.email.toLowerCase().includes(filterText.toLowerCase())
                );
            });
            setFilteredData(filtered);
        }
    }, [filterText, data]);

    const handleFilterChange = (e) => {
        setFilterText(e.target.value);
    };
    const handleUserSelect = (user) => {
        dispathCurrentUser(currentUser(user));
        setSelectedUser(user)
    }

//Displaying the user table and filter box
    return <>
     <div style={{height:"5%"}}></div>
        <TextField id="outlined-basic" label="Filter by name or email" variant="outlined" value={filterText}
          onChange={handleFilterChange} />
        <div className="container" >
            <div className="user-list">
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell >
                                    <Typography variant="h6" fontWeight="bold" color="primary">Name</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="h6" fontWeight="bold" color="primary">Email</Typography></TableCell>
                                <TableCell>
                                    <Typography variant="h6" fontWeight="bold" color="primary">Company</Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredData.map((user) => (
                                <TableRow key={user.id} onClick={() => handleUserSelect(user)}>
                                    <TableCell style={{ cursor: "pointer" }}>{user.name}</TableCell>
                                    <TableCell style={{ cursor: "pointer" }}>{user.email}</TableCell>
                                    <TableCell style={{ cursor: "pointer" }}>{user.company.name}</TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
{/* Showing posts to the selected user */}
    {
    selectedUser &&
    <div className="post-list">
       <UserPosts></UserPosts>
    </div>
    }
    </div>
    </>

}
