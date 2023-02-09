const express = require('express')
const router = express.Router()
const userinfo_handler = require('../router_handler/userinfo')
const validateFunction=require('../schema/userReg')

//获取user信息接口，方法：GET
router.get('/userinfo',userinfo_handler.getUserInfo)

//修改user信息接口，方法：POST
router.post('/userinfo',validateFunction,userinfo_handler.updateuserInfo)

module.exports = router