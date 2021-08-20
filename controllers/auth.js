const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { generateJWT } = require('../helpers/jwt');

const loginUser = async (req, res = response) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        const validatePassword = bcrypt.compareSync(password, user.password);

        if (!user || !validatePassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Invalid credentials'
            });
        }

        // JWT
        const token = await generateJWT(user.id, user.name);

        res.status(200).json({
            ok: true,
            uid: user.id,
            token
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Internal server error'
        });
    }
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

        //JWT
        const token = await generateJWT(user.id, user.name);

        res.status(201).json({
            ok: true,
            uid: user.id,
            token
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Internal server error'
        });
    }
};

const renewToken = async (req, res = response) => {
    const { uid, name } = req;
    const token = await generateJWT(uid, name);
    res.json({
        ok: true,
        token
    });
};

module.exports = {
    loginUser,
    newUser,
    renewToken
}