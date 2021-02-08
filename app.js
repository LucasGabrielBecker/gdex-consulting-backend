const express = require("express");
const app = express();
const PORT = process.env.PORT || 3333;
const logger = require('morgan')
const helmet = require('helmet')
const sequelizeConnection = require('./database/connection')
require('dotenv').config({path:"./database/.env"})
const User = require("./models/user")
const { QueryTypes} = require('sequelize')
const usersRouter = require('./routes/users')
const cors = require('cors')

app.use(express.json())
app.use(logger('dev'))
app.use(helmet())
app.use(cors())
app.use('/users', usersRouter)

async function connectDB(){
    await sequelizeConnection.sync().then(async (res)=>{
        console.log('Mysql connected to GCP')
    }).catch(err =>{
        console.log(err.message)
    })
}

connectDB();

app.listen(PORT, () => {console.log(`app running in http://127.0.0.1:${PORT}/`)})