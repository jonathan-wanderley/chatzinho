const { validationResult, matchedData } = require('express-validator');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

module.exports = {
    signin: async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            res.json({error: errors.mapped()});
            return;
        }
        const data = matchedData(req);

        // Valida o email
        const user = await User.findOne({email: data.email});
        if(!user) {
            res.json({error: 'Email e/ou senha errados!'});
            return;
        }

        // Valida a senha
        const match = await bcrypt.compare(data.password, user.passwordHash);
        if(!match) {
            res.json({error: 'Email e/ou senha errados!'});
            return;
        }

        const payload = (Date.now() + Math.random()).toString();
        const token = await bcrypt.hash(payload, 10);

        user.token = token;
        await user.save();

        res.json({token, email: data.email});

    },
    signup: async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            res.json({error: errors.mapped()});
            return;
        }
        const data = matchedData(req);
        
        // Verificar se o nickname ja existe
        const userByNick = await User.findOne({
            nickname: data.nickname
        });

        if(userByNick) {
            res.json({
                error: {nickname:{msg: 'Esse nick já existe'}}
            });
            return;
        }
        
        // Verificar se o email ja existe
        const user = await User.findOne({
            email: data.email
        });

        if(user) {
            res.json({
                error: {email:{msg: 'Email já existe'}}
            });
            return;
        }

        const passwordHash = await bcrypt.hash(data.password, 10);

        const payload = (Date.now() + Math.random()).toString();
        const token = await bcrypt.hash(payload, 10);

        const newUser = new User({
            nickname: data.nickname,
            email: data.email,
            passwordHash,
            token
        });

        await newUser.save();

        res.json({token});
    },
    auth: async (req, res) => {
        const user = await User.findOne({token});
        res.json({token, nickname: user.nickname});
        
    }
};