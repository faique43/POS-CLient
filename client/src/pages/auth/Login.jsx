import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

// redux
import { loginAdmin, loginUser } from '../../store/authSlice/authSlice';
import {uiActions} from '../../store/uiSlice/uiSlice';

export default function Login() {
    const dispatch = useDispatch()

    const [userData, setUserData] = useState({
        username: '',
        password: ''
    })

    const changeHandler = (event) => {
        if (event.target.name === 'username') {
            setUserData({
                ...userData,
                username: event.target.value
            })
        }
        else if (event.target.name === 'password') {
            setUserData({
                ...userData,
                password: event.target.value
            })
        }
    }

    const handleSubmit = (event) => {
        dispatch(uiActions.startLoading())
        // event.preventDefault()
        if(event.target.name === 'adminButton') {
            dispatch(loginAdmin(userData)).then(response => {
                dispatch(uiActions.stopLoading())
            })
        }
        else if(event.target.name === 'userButton') {
            dispatch(loginUser(userData)).then(response => {
                dispatch(uiActions.stopLoading())
            })
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Typography component="h1" variant="h5">
                    Login
                </Typography>
                <Box component="form" sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        // id="email"
                        label="Username"
                        name="username"
                        onChange={changeHandler}
                        // autoComplete="email"
                        value={userData.username}
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        onChange={changeHandler}
                        value={userData.password}
                    // id="password"
                    // autoComplete="current-password"
                    />
                    {/* <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    /> */}
                    <Button
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3 }}
                        name='userButton'
                        onClick={handleSubmit}
                    >
                        Login
                    </Button>
                    <Button
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        name='adminButton'
                        onClick={handleSubmit}
                    >
                        Login as Admin
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            {/* <Link href="#" variant="body2">
                                Forgot password?
                            </Link> */}
                        </Grid>
                        <Grid item>
                            {/* <Link href="#" variant="body2"> */}
                            {/* {"Don't have an account? Sign Up"} */}
                            {/* </Link> */}
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}