import React, { useState, useEffect, useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from '@mui/material';

import { useLocation } from 'react-router-dom';
import AuthContext from "../Authcontext";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Button from '@mui/material/Button';

const LoginPanel = () => {

    const { authenticated, setAuthenticated, userDetails, setUserDetails } = useContext(AuthContext);
    const [userName, setUserName] = useState("");
    const currentPathLocation = useLocation();
    const navigate = useNavigate();


    useEffect(() => {
        if (userDetails != undefined && authenticated && userDetails.length > 0) {
            console.log("Go To Slide1");
            goToLevel1Page();
        }
    }, [userDetails]);

    const handleUserNameChange = (event) => {
        setUserName(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        let existingUser = userDetails.find(e => e.userName == userName);
        console.log("existingUser :: ", existingUser)
        if (existingUser != undefined) {
            console.log("existingUser.location :: ", existingUser.location)
            localStorage.setItem('userName', existingUser.userName);
            navigate(existingUser.location)
        }
        else {
            let userObj = { userName: userName, location: currentPathLocation.pathname };
            localStorage.setItem('userName', userObj.userName);
            console.log("Login :: handleSubmit :: userObj ", userObj)

            setUserDetails((prevuserDetails) => [
                ...prevuserDetails,
                userObj
            ]);

            console.log("Login :: handleSubmit :: ", userDetails);
        }
        setAuthenticated(true);
        //setUserName("");
    }

    const goToLevel1Page = () => {
        console.log("go to slide 1")
        navigate("/Slide_1");
    };


    return (
        <>
            <Card sx={{
                bgcolor: 'background.paper',
                boxShadow: 1,
                borderRadius: 2,
                p: 2,
                minWidth: 100,
                margin: 10
            }}>
                <form onSubmit={handleSubmit}>
                    <CardContent>
                        <h2>Login Page</h2>
                        <TextField
                            required
                            id="outlined-required"
                            label="User Name"
                            onChange={handleUserNameChange}
                        />
                    </CardContent>
                    <CardActions>
                        <Button type="submit" size="small" >Login</Button>
                    </CardActions>
                </form>
            </Card>
        </>
    );
};

export default LoginPanel;
