const mongoose = require('mongoose');
const config = require('dotenv/config');
const dotenv = require('dotenv');

const mongoUrl = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?authSource=admin`;

async function mongo(){
    mongoose.connect(mongoUrl)
        .then(async (mongo)=> {
                console.log('MongoDB connected');
            }
        )
        .catch(err=>console.log('MongoDB connection error: ',err));
}

module.exports = mongo;