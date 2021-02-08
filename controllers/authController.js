const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports = {
    authenticate: async(req,res)=>{
        const {email, password} = req.body
        const user = await User.findOne({where:{email: email}})
        const match = await bcrypt.compare(password, user.password)

        if(!match){
            return res.json({succes:false, msg:"Wrong credentials"})
        }
        const token = jwt.sign(JSON.stringify(user), 'secret');
        
        res.json({user, token}).status(200)

    }
}