const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log('DB online');
    } catch (error) {
        throw new Error('Failed to connect DB');
    }
}

module.exports = {
    dbConnection
}