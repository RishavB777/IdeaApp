const express = require('express');
const serverConfig = require('./configs/server.config');
const mongoose = require('mongoose');
const dbConfig = require('./configs/db.config');
const userModel = require('./models/user.model');

const app = express();

/** Connect to MONGODB and create ADMIN user */

mongoose.connect(dbConfig.DB_URL);
const db = mongoose.connection;

db.on("error", ()=>{
    console.log(`ERROR while connecting to DB`);
});

db.once("open", ()=>{
    console.log(`DB is connected`);
    init();
});

async function init()
{
    // Initialize mongodb

    // Check if the admin user is already present
    let admin = await userModel.findOne({
        userId: "admin"
    })

    if(admin)
    {
        console.log("Admin already created");
        return;
    }

    admin = await userModel.create({
        name: "Rishav Bhattacharjee",
        userId: "admin",
        email: "rishavbhattacharjee777@gmail.com",
        userType: "ADMIN",
        password: bcrypt.hashSync("WELCOME1",8) // 8 is the salt, higher value higher efficiency but slower
    });
    console.log(admin);

}

app.listen(serverConfig.PORT, ()=>{
    console.log(`server started on port no ${serverConfig.PORT}`);


})