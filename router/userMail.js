const express = require('express')
const router = express.Router()
const usermail_handler = require('../router_handler/userMail')
const validateFunction=require('../schema/userReg')

router.post('/sendMail',validateFunction,usermail_handler.send)

module.exports=router