const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signUp = async (req, res) => {
    const username = req.body.username;
    const password  = req.body.password;
    try {
        const user = new User({ username, password });
        await user.save();
        res.status(201).json({ message: 'User created successfully' });
        console.log('User created successfully' + '\nUser Name : ' + user.username + '\nPassword: ' + password + '\nHashed Password: ');
    } catch (error) {
        console.log('error' + error.message);
        res.status(400).json({ error: error.message });
    }
};

const login = async (req, res) => {
    const username = req.body.username;
    const password  = req.body.password;
    console.log('login userName: ' + username + ' pwd: ' + password);
    try {
        const user = await User.findOne({ username });
        if (!user) {
            console.log('User not found');
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const isMatch = await user.comparePassword(password);
        console.log('isMatch: ' + isMatch);

        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const payload = { userId: user._id };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};




module.exports = { signUp, login };
