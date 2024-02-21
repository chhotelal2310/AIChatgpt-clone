const errorHandler = require("../middelwares/errorMiddleware");
const userModels = require("../models/userModels");
const  errorResponse = require("../utils/errorResponse");

//JWT TOKEN
 module.exports.sendToken = (user, statuscode, res) => {
    // const token = user.getSignedToken(); // Assuming you have a getSignedToken method in your user model
    // res.status(statuscode).json({
    //     success: true,
    //     token,
    // });
    const { accessToken, refreshToken } = user.getSignedToken();

    // Set the refreshToken as a cookie
    res.cookie("refreshToken", refreshToken, {
        maxAge: 86400 * 7000, httpOnly: true
    });

    // Send the accessToken in the response or however you handle it
    // res.json({ accessToken });
    return res.status(200).json({
        success: true,
        message: "Register Succesfully",
        accessToken 
      });

};




//Register
module.exports.registesrController = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
          var text=email;
          var p=password .length;
          var a=text.search("@gmail.com");
        if(a<=0){
            return res.json({ success: false, error: 'Please Enter the vailid Email' });
        }
        if(p<6){
            return res.json({ success: false, error: 'Please Enter the 6-digite Password' });
        }
        const existingEmail = await userModels.findOne({ email });
        if (existingEmail) {
            return res.json({ success: false, error: 'This Email is already registered' });
        }
        const user = await userModels.create({ username, email, password }); 
        this.sendToken(user, 201, res);
    } catch (error) {
        return res.status(500).json({ success: false, error: 'Something went wrong' });
    }
};



//login
module.exports.loginController = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        console.log(req.body +" Chhotelal Patel");
        var p=password .length;
        var text=email;
        var a=text.search("@gmail.com");
        if(a<=0){
            return res.json({ success: false, error: 'Please Enter the vailid Email' });
        }
        if(p<6){
            return res.json({ success: false, error: 'Please Enter the 6-digite Password' });
        }

        // Validation
        if (!email || !password) {
            return res.json({ success: false, error: 'Please provide a valid email or password' });
        }

        const user = await userModels.findOne({ email });
        if (!user) {
            return res.json({ success: false, error: 'Please Enter the Currect Email which are Enter During Register'});
        }
        const isMatch = await user.matchPassword(password); 
        if (!isMatch) {
            return res.json({ success: false, error: 'Please Enter the Currect Password'});
        }

        // Respond
        this.sendToken(user, 200, res);
    } catch (error) {
        return res.json({ success: false, error: 'Something went wrong' });
    }
};

module.exports.logoutController = async (req, res) => {
    res.clearCookie("refreshToken");
    return res.status(200).json({
      success: true,
      message: "Logout Succesfully",
    });
  };
  


