require('dotenv').config();
const { connect } = require('mongoose');

module.exports = {
    mongoConnect: async () => {
        try {
            await connect(process.env.MONGO_URL);
            console.log('MongoDB conectado!');
        } catch (error) {
            console.log("Erro de conexao MongoDB", error);
        }
    }
}
