const Joi = require('joi')


const validateFunction = (req, res, next) => {
    const reg_login_schema = Joi.object({  //验证规则
        username: Joi.string().min(2).max(15).required().error(new Error(`
        {
            status:0,
            msg:'用户名不合法，宝'
        }`
        )),
        password: Joi.string().required().regex(/^[a-zA-Z0-9]{5,15}$/).error(new Error(`
        {
            status:0,
            msg:'密码不合法，宝'
        }`
        )),
        nicname: Joi.string().regex(/^[a-zA-Z0-9]{3,18}$/).error(new Error(`
        {
            status:0,
            msg:'昵称不合法，宝'
        }`
        )),
        veriCode: Joi.string().regex(/^[a-zA-Z0-9]{5,7}$/).error(new Error(`
        {
            status:0,
            msg:'验证码不合法，宝'
        }`
        )),
        email: Joi.string().required().email().error(new Error(`
        {
            status:0,
            msg:'邮箱不合法，宝'
        }`
        ))
        

    })
    const result = reg_login_schema.validate(req.body, {
        abortEarly: true,
        allowUnknown: true
    })
    const  {error}  = result
    if (error) {
        // console.log(error);
        return res.send(`${result.error}`)
    }
    else {
        if (req.body.username)
        next()
    }
}

module.exports = (validateFunction)
