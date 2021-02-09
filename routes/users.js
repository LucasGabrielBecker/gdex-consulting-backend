const User = require('../models/user')
const router = require('express').Router()
const usersController = require('../controllers/userController')
const authController = require('../controllers/authController')

router.get('/findall', async(req, res, next)=>{
    try {
        const users = await User.findAll()
        res.json(users).status(200)
    } catch (err) {
        res.json({succes:false, msg:"An error ocurred", err})        
    }

})
router.post('/create', usersController.create)
router.post('/authenticate',authController.authenticate); 


module.exports = router ;