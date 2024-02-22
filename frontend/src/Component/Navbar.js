import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
const Navbar = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const loggedIn = JSON.parse(localStorage.getItem('authToken'));

  //handlelogout
  const handleLogout = async () => {
    try {
      await axios.post('https://aichatgpt-clone.onrender.com/api/v1/auth/logout');
      localStorage.removeItem("authToken");
      toast.success("Logout sucessfully");
      navigate('/login');
    } catch (error) {
      console.log(error)
    }

  };


  return (

    <div >
      <Box
        width={'100%'}
        position={'fixed'}
        zIndex={"100"}
        top={0}   
        backgroundColor={theme.palette.background.alt}
        p="1rem 6%"
        textAlign={'center'}
        sx={{ boxShadow: 3, mb: 2 }}>
        <Typography variant="h1" color={"primary"} fontWeight="bold"  >
          AI GPT3 CLONE
        </Typography>
        {
          loggedIn ? (<>
            <NavLink id="registerandlogin" to="/" p={1}>Home</NavLink>
            <NavLink id="registerandlogin" to="/login" onClick={handleLogout} p={1}>Logout</NavLink>
          </>) :
            <>
              <NavLink id="registerandlogin" to="/register" p={1}>Register</NavLink>
              <NavLink id="registerandlogin" to="/login" p={1}>Login</NavLink>
            </>
        }

      </Box>
    </div>


  )
}

export default Navbar