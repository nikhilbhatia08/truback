const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSignup = async(req, res) => {
    try{
        const { email, name, password } = req.body;
        if(!email || !name || !password) {
            return res.status(400).json({error: "All fields are required"});
        }

        const userExists = await User.findOne({ email: email });
        if(userExists) {
            return res.status(400).json({error: "User already exists"});
        }

        const salt = bcrypt.genSaltSync(10);

        const user = new User({
            email: email,
            name: name,
            password: bcrypt.hashSync(password, salt),
            history: [],
            bookmarks: []
        });

        await user.save();
        res.status(200).json({message: "User created successfully"});
    }
    catch(err) {
        console.log(err);
    }
}

const userLogin = async(req, res) => {
    try{
        const { username, password } = req.body;
        if(!username || !password) {
            return res.status(400).json({error: "All fields are required"});
        }

        const user = await User.findOne({ email: username });
        if(!user) {
            return res.status(400).json({error: "User does not exist"});
        }

        const isMatch = bcrypt.compareSync(password, user.password);
        if(!isMatch) {
            return res.status(400).json({error: "Invalid credentials"});
        }
        else {
            const jwtToken = {
                email: user.email,
                name: user.name
            }

            const token = jwt.sign(jwtToken, process.env.JWT_SECRET, {expiresIn: '365d'});

            res.status(200).json({token: token});
            return;
        }
    }
    catch(err) {
        console.log(err);
    }
}

module.exports = { userSignup, userLogin };