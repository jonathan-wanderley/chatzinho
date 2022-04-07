const { checkSchema } = require('express-validator');

module.exports = {
    signup: checkSchema({
        nickname: {
            trim: true,
            isAlphanumeric: true,
            isLength: {
                options: { min: 2 }
            },
            errorMessage: 'Seu Nick deve ter pelos menos 2 caracteres e não deve ter espaços.'
        },
        email: {
            isEmail: true,
            normalizeEmail: true,
            errorMessage: 'Email inválido.'
        },
        password: {
            isLength: {
                options: { min: 2 }
            },
            errorMessage: 'A senha precisa ter pelo menos 2 caracteres.'
        }
    }),
    signin: checkSchema({
        email: {
            isEmail: true,
            normalizeEmail: true,
            errorMessage: 'Email inválido.'
        },
        password: {
            isLength: {
                options: { min: 2 }
            },
            errorMessage: 'A senha precisa ter pelo menos 2 caracteres.'
        }
    })
};