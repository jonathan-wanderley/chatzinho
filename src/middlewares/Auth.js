const User = require('../models/User');
const jwt = require('jsonwebtoken');

module.exports = {
    private: async (req, res, next) => {

        const { authorization } = req.headers;

        if(!authorization) {
            res.json({notallowed: true});
            return;
        }

        const token = authorization.replace('Bearer', '').trim();

        try {
            const data = jwt.verify(token, process.env.JWT_SECRET);
            const { id } = data;
            req.userID = id
            return next();

        } catch (error) {
            return res.json({notallowed: true});
        }
    }
};