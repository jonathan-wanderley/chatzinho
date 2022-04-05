const mongoose = require('mongoose');

const modelSchema = new mongoose.Schema({
    nickname: String,
    email: String,
    passwordHash: String,
    token: String
})

const modelName = 'User';

if(mongoose.connection && mongoose.connection.models[modelName]) {
    module.exports = mongoose.connection.models[modelName];
} else {
    module.exports = mongoose.model(modelName, modelSchema);
}