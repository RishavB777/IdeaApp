const express = require('express');
const serverConfig = require('./configs/server.config');
const mongoose = require('mongoose');
const dbConfig = require('./configs/db.config');
const app = express()

/** Connect to MONGODB and create ADMIN user */

mongoose.connect(dbConfig.DB_URL);
const db = mongoose.connection;

db.on("error", ()=>{
    console.log(`ERROR while connecting to DB`);
});

db.once("open", ()=>{
    console.log(`DB is connected`);
})

app.listen(serverConfig.PORT, ()=>{
    console.log(`server started on port no ${serverConfig.PORT}`);
})