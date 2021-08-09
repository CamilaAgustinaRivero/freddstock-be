const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const loginUser = (req, res = response) => {
    const { email, password } = req.body;
    res.status(200).json({
        ok: true,
        email,
        password
    });
};

const newUser = async (req, res = response) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                ok: false,
                msg: 'Email already in use'
            });
        }

        user = new User(req.body);

        // Encrypt password / 10 default
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        res.status(201).json({
            ok: true,
            uid: user.id
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Internal server error'
        });
    }
};

const renewToken = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'renew'
    });
};

module.exports = {
    loginUser,
    newUser,
    renewToken
}