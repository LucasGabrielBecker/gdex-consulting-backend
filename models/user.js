const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelizeConnection = require("../database/connection")
const bcrypt = require('bcryptjs')

const User = sequelizeConnection.define("user", {
    id:{
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },  
  name: {
      type: DataTypes.STRING,
      allowNull:false
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    specialties: {
      type: Sequelize.STRING,
      allowNull: false,
      get() {
          return this.getDataValue('specialties').split(';')
      },
      set(val) {
        
          this.setDataValue('specialties',val.join(';'));
      },
    },
    password: {
      type:DataTypes.STRING,
      allowNull: false
    },
    nickname:{
      type:DataTypes.STRING,
      allowNull:true,
      trim:true
    },
    email:{
      type:DataTypes.STRING,
      allowNull:false,
      trim:true
    },
    birthday:{
      type: DataTypes.DATEONLY, //MM-DD-YYYY
      allowNull:true
    },
    sex:{
      //0 = woman, 1 = man
      type:DataTypes.INTEGER,
      allowNull:true
    }
  },
  //begining of sequelize models hooks, applied at life cycle level
  {
    hooks:{
      beforeCreate:(user, options)=>{
        user.password = bcrypt.hashSync(user.password, 10)
      }
    }
  }
  );


module.exports = User;