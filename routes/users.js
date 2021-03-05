const User = require('../models/user')
const router = require('express').Router()
const usersController = require('../controllers/userController')
const authController = require('../controllers/authController')

router.get('/findall',usersController.getall)
router.post('/create', usersController.create)
router.post('/authenticate',authController.authenticate);
router.post('/validate', authController.validate)


module.exports = router ;