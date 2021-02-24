const User = require("../models/user")
const ValidationError = require("sequelize").ValidationError

module.exports = {
    getall: async (req, res, next)=>{
        try {
            const users = await User.find()
            console.log(users)
            res.json(users)

        } catch (error) {
            res.json(error)
        }

    },

    create: async (req, res, next)=>{
        let { firstName, lastName,password, nickname, sex, day, month, year, email} =req.body;
        if(!firstName || firstName === undefined || !lastName || lastName === undefined){
            return res.json({succes:false, msg:"Missing info for register"})
        }

        try {
          const name = firstName + " " + lastName
          const birthday = `${month.toString()}-${day.toString()}-${year.toString()}`
          const newUser = await User.create({name, password, nickname, sex,age:23, birthday, email})
          return res.json({msg:"Succes", newUser}).status(200)
        } catch (error) {
          if(error.original.errno === 1062){
            return res.json({succes:false, msg:"Email ja existente", error})            
          }

          return res.json({succes:false, msg:" An error ocurred", error})
        }
    }
}
