const express=require('express');
const authController = require('../controllers/authController');

// router Oject
const router=express.Router();

//router


//register
router.post('/register',  authController.registesrController)
//login
router.post('/login', authController.loginController);

//logout
router.post('/logout', authController.logoutController)

module.exports=router


