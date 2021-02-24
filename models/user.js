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
      allowNull: true,
      defaultValue: 0,
    },
    specialties: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: "",
      get() {
          return this.getDataValue('specialties').split(';')
      },
      set(val) {
          if(!val){
            return
          }
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
      trim:true,
      unique: true
    },
    birthday:{
      type: DataTypes.DATEONLY, //MM-DD-YYYY
      allowNull:true
    },
    sex:{
      //0 = woman, 1 = man
      type:DataTypes.INTEGER,
      allowNull:false
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
