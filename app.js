const express = require("express");
const app = express();
const PORT = process.env.PORT || 3333;
const helmet = require('helmet')
const sequelizeConnection = require('./database/connection')
require('dotenv').config({path:"./database/.env"})
const User = require("./models/user")
const usersRouter = require('./routes/users')
const cors = require('cors')

app.use(express.json())
app.use(helmet())
app.use(cors())
app.use('/users', usersRouter)

async function connectDB(){
    await sequelizeConnection.sync().then(async (res)=>{
      console.clear()
        console.log('Mysql connected')
        console.log(`Backend its up: http://localhost:${PORT}`)
    }).catch(err =>{
        console.log(err.message)
    })
}

connectDB();

app.listen(PORT)
