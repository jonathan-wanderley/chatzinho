const express = require('express');
const User = require('./models/User');
const router = express.Router();
const Auth = require('./middlewares/Auth');
const AuthValidator = require('./validators/AuthValidator');
const AuthController = require('./controllers/AuthController');

router.get('/ping', async (req, res) => {
    let users = await User.find({});
    res.json({pong: true, users});
});

router.post('/user/signin', AuthValidator.signin, AuthController.signin);
router.post('/user/signup', AuthValidator.signup, AuthController.signup);

module.exports = router;