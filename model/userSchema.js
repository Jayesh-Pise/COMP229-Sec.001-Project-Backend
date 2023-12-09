const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    work: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cpassword: {
        type: String,
        required: true
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]

}, { timestamps: true });

// Password Hashing
userSchema.pre('save', async function (next) {
    console.log("This code is running");
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
        this.cpassword = await bcrypt.hash(this.cpassword, 12);
    }
    next();
});

// Generating Token
userSchema.methods.generateAuthToken = async function () {
    try {
        let tokenAuth = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({ token: tokenAuth });
        await this.save();
        return tokenAuth;
    } catch (err) {
        console.log(err);
    }
}

//Collection creation
const User = mongoose.model('USER', userSchema);

module.exports = User;