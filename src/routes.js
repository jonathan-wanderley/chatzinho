const express = require('express');
const User = require('./models/User');
const router = express.Router();
const Auth = require('./middlewares/Auth');
const AuthValidator = require('./validators/AuthValidator');
const AuthController = require('./controllers/AuthController');

router.get('/ping', async (req, res) => {
    res.json({pong: true});
});


router.post('/signin', AuthValidator.signin, AuthController.signin);
router.post('/signup', AuthValidator.signup, AuthController.signup);


router.post('/auth', Auth.private, AuthController.auth);


module.exports = router;