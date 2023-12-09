const jwt = require('jsonwebtoken');
const User = require("../model/userSchema");
const bcrypt = require('bcryptjs');
const authenticate = require("../middleware/authenticate");

// Controller for user registration
exports.registerUser = async (req, res) => {
    try {
        const { name, email, phone, work, password, cpassword } = req.body;

        if (!name || !email || !phone || !work || !password || !cpassword) {
            return res.status(422).json({ error: "Please fill in all the fields properly" });
        }

        const userExist = await User.findOne({ email: email });

        if (userExist) {
            return res.status(422).json({ error: "Email already exists" });
        } else if (password !== cpassword) {
            return res.status(422).json({ error: "Passwords do not match" });
        } else {
            const user = new User({ name, email, phone, work, password, cpassword });

            await user.save();

            res.status(201).json({ message: "User registered successfully" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


// Controller for user sign-in
exports.signInUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Please fill in all the fields" });
        }

        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(400).json({ error: "Invalid Credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        const token =  await user.generateAuthToken();
        console.log(token);

        res.cookie("jwtoken", token, {
            expires: new Date(Date.now() + 25892000000),
            httpOnly: true
          });

        if (!isMatch) {
            return res.status(400).json({ error: "Invalid Credentials" });
        }

        res.json({ message: "User Signin Successfully" });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


exports.protectedRoute = (req, res) => {
    console.log("Hello my About");
    res.send(req.rootUser);
    return;
  }