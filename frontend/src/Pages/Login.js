import React, { useState } from 'react';
import { Box, Typography, useTheme, useMediaQuery, TextField, Button, Alert, Collapse } from '@mui/material';
import { Link, useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import axios from "axios";


const Login = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  //media
  const isNotMobile = useMediaQuery("(min-width:1000px");


  //state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");


  //register ctrl
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      var userData = { email, password }
      console.log(userData);
      console.log("hii chhotelal patel")
      // http://localhost:8000
     const res=await axios.post('https://aichatgpt-clone.onrender.com/api/v1/auth/login', userData);
      if(res.data.success == false ){
        setError(res.data.error);
        return;
      }
      localStorage.setItem("authToken", true);
      toast.success("Login Successfully");
      navigate("/");
    } catch (err) {
      setError("Something went wrong");
      setTimeout(() => {
        setError("");  
      }, 1000);
    }
  };


  return (
    <Box
      width={isNotMobile ? "40%" : "80%"}
      p={"2rem"}
      mt={"8rem"}
      mb={"2rem"}
      ml={"auto"}
      mr={"auto"}
      borderRadius={5}
      sx={{ boxShadow: 5 }}
      backgroundColor={theme.palette.background.alt}
    >
      <Collapse in={error}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      </Collapse>


      <form onSubmit={handleSubmit}>
        <Typography variant="h3">Login</Typography>
        <TextField
          label="email"
          type="email"
          required
          margin="normal"
          fullWidth
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <TextField
          label="password"
          type="password"
          required
          margin="normal"
          fullWidth
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          sx={{ color: "white", mt: 2 }}
        >
          Login
        </Button>
        <Typography mt={2}>
          Don't have an account ? <Link id='registerandlogin' to="/register">Please Register</Link>
        </Typography>
      </form>
    </Box>
  );
}

export default Login;
