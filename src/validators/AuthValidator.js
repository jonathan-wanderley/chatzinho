const { checkSchema } = require('express-validator');
// /^[A-Za-z0-9._-]+$/  REGEX
module.exports = {
    signup: checkSchema({
        nickname: {
            trim: true,
            matches: {
                options: [/^[A-Za-z0-9._-]+$/],
                errorMessage: "São permitidos apenas letras, numeros, traços -, pontos . e sublinhados _"
            },
            isLength: {
                options: {
                    min: 2
                }
            },
            errorMessage: 'Seu Nick deve ter pelos menos 2 caracteres'
        },
        email: {
            isEmail: true,
            normalizeEmail: true,
            errorMessage: 'Email inválido'
        },
        password: {
            isLength: {
                options: { min: 2 }
            },
            errorMessage: 'A senha precisa ter pelo menos 2 caracteres'
        }
    }),
    signin: checkSchema({
        email: {
            isEmail: true,
            normalizeEmail: true,
            errorMessage: 'Email inválido'
        },
        password: {
            isLength: {
                options: { min: 2 }
            },
            errorMessage: 'A senha precisa ter pelo menos 2 caracteres'
        }
    })
};