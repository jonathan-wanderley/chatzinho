const express = require('express');
const User = require('./models/User');
const router = express.Router();
const Auth = require('./middlewares/Auth');
const AuthValidator = require('./validators/AuthValidator');
const AuthController = require('./controllers/AuthController');

//Paginas
router.get('/', (req, res) => {
    res.render('index');
})
router.get('/chat-publico', (req, res) => {
    res.render('chat-publico');
})
router.get('/chat-privado', (req, res) => {
    res.render('chat-privado');
})


//API routes
router.post('/api/signin', AuthValidator.signin, AuthController.signin);
router.post('/api/signup', AuthValidator.signup, AuthController.signup);
router.get('/api/auth', Auth.private, AuthController.auth);


module.exports = router;