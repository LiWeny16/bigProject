const express=require('express')
const router=express.Router()
const validateFunction=require('../schema/userReg')
const validateFunction_login =require('../schema/userLogin')
const user_handler=require('../router_handler/user') 

// const expressJoi = require('@escook/express-joi')



router.post('/reguser',validateFunction,user_handler.regUser)  //中间件导入Joi模块检测

router.post('/login',validateFunction_login,user_handler.login)

module.exports= router