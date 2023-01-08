const express= require('express')
const { createAddress } = require('../controllers/addressController')
const { createUser } = require('../controllers/userController')
const router=express.Router()


/**  --------- Customer's API's ---------- **/
router.post('/users/register', createUser)
router.post('/user/address', createAddress)


router.get('/testing', (_req, res) => {
    return res.status(200).send({status: true, message: " Hello Testing API is Live"})})
router.all('/**', (_req, res) => {
    return res.status(404).send({status: false, message: " Requested API not Available"})})

module.exports=router; 