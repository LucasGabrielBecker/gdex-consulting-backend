const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports = {
    authenticate: async(req,res)=>{
        const {email, password} = req.body
        const user = await User.findOne({where:{email: email}})
        if(!user || user === null || user === undefined || user.email != email){
            res.json({succes:false, msg:"User not founded", code: 404 }).status(400)
        }
        const match = await bcrypt.compare(password, user.password)

        if(!match){
            return res.json({succes:false, msg:"Wrong credentials", code:403})
        }
        const token = jwt.sign(JSON.stringify(user), 'secret');

        res.json({user, token}).status(200)

    },

    validate : async (req, res)=>{
        const { authorization } = req.headers
        if(!authorization){
            res.json({succes:false, msg:"No token provided"})
        }

        const [_, token] = authorization.split(" ")

        const match = jwt.verify(token, 'secret', (error, decoded)=>{
            if(error){
                res.json({succes:false, msg: "Invalid Token"}).status(403)
            }
            console.log(decoded)
            // res.send("ok")
            const {password, createdAt, updatedAt, id, ...result} = decoded
            res.json({succes:true, msg:"Valid token", result})
        })
    }
}
