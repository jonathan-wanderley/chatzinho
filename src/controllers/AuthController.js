require('dotenv').config();
const { validationResult, matchedData } = require('express-validator');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

module.exports = {
    signin: async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({error: errors.mapped()});
        }
        const data = matchedData(req);

        // Valida o email
        const userFoundByEmail = await User.findOne({email: data.email});
        if(!userFoundByEmail) {
            return res.status(400).json({
                error: {
                    emailOrPassError: {
                        location: "body",
                        msg: "Email e/ou senha errados!",
                    }
                }
            });
        }

        // Valida a senha
        const isValidPassword = await bcrypt.compare(data.password, user.passwordHash);
        if(!isValidPassword) {
            return res.status(400).json({
                error: {
                    emailOrPassError: {
                        location: "body",
                        msg: "Email e/ou senha errados!",
                    }
                }
            });
            
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

        res.json({ token });
    },
    signup: async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(409).json({error: errors.mapped()});
        }
        const data = matchedData(req);
        
        // Verificar se o nickname ja existe
        const userFoundByNick = await User.findOne({
            nickname: data.nickname
        });

        if(userFoundByNick) {
            return res.status(409).json({
                error: {nickname:{msg: 'Esse nick já existe'}}
            });
            
        }
        
        // Verificar se o email ja existe
        const userFoundByEmail = await User.findOne({
            email: data.email
        });

        if(userFoundByEmail) {
            return res.status(409).json({
                error: {email:{msg: 'Email já existe'}}
            });
        }

        const passwordHash = await bcrypt.hash(data.password, 10); 

        const newUser = new User({
            nickname: data.nickname,
            email: data.email,
            passwordHash
        });

        await newUser.save();
        
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);

        res.status(201).json({token});
    },
    auth: async (req, res) => {
        const user = await User.findById(req.userID);
        res.json({ id: user._id , nickname: user.nickname});  
    }
};