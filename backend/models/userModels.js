const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookie = require('cookie')

//model
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required']
    },
    email: {
        type: String,
        required: [true, 'Email is Required']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password shold be 6 character long']
    },
    customerId: {
        type: String,
        default: ""
    },
    subscription: {
        type: String,
        default: ""
    }
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        return next();
    } catch (error) {
        return next(error);
    }
});

userSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.getSignedToken = function () {
    const accessToken = jwt.sign({ id: this._id },
        process.env.JWT_ACCESS_SECRET,
        { expiresIn:  '1h' });

    const refreshToken = jwt.sign({ id: this._id },
        process.env.JWT_REFRESH_TOKEN,
        { expiresIn:  '7d' });

    return { accessToken, refreshToken };
}

const User = mongoose.model("User", userSchema);

module.exports=User