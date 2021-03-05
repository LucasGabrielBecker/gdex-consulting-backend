const { Sequelize, Model, DataTypes } = require('sequelize');
const dbConfig = require('./config.json')
const sequelizeConnection = new Sequelize(
    dbConfig.development.database,
    dbConfig.development.username,
    dbConfig.development.password,
    {host:"35.198.48.222", dialect:"mysql"});//production
    // {host:"127.0.0.1", dialect:"mysql"}); //development
    
module.exports = sequelizeConnection;