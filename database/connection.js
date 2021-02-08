const { Sequelize, Model, DataTypes } = require('sequelize');
const dbConfig = require('./config.json')
const sequelizeConnection = new Sequelize(
    dbConfig.development.database,
    dbConfig.development.username,
    dbConfig.development.password,
    {host:"35.198.48.222", dialect:"mysql"});
    
module.exports = sequelizeConnection;