/*
    User routes / Auth
    host + /api/auth
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/fields');
const { newUser, loginUser, renewToken } = require('../controllers/auth');
const router = Router();


router.post(
    '/',
    [
        check('email', 'Email is required.').isEmail(),
        check('password', 'Password is too short').isLength({ min: 6 }),
        validateFields
    ],
    loginUser
);

router.post(
    '/new',
    [
        check('name', 'Name is required.').not().isEmpty(),
        check('surname', 'Surname is required.').not().isEmpty(),
        check('email', 'Email is required.').isEmail(),
        check('password', 'Password is too short').isLength({ min: 6 }),
        validateFields
    ],
    newUser
);

router.get('/renew', renewToken);

module.exports = router;