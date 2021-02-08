const User = require("../models/user")

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
        const { name, age, specialties, password, nickname, sex, birthday, email} =req.body;
        if(!name || name === undefined || !age || age===undefined || !specialties || specialties === undefined){
            return res.json({succes:false, msg:"Missing info for register"})
        }

        try {
            const newUser = await User.create({name, age, specialties, password, nickname, sex, birthday, email})
            return res.json({msg:"Succes", newUser}).status(200)
            
        } catch (error) {
            console.warn(error.message)
            return res.json({succes:false, msg:" An error ocurred", error})
        }
    }
}