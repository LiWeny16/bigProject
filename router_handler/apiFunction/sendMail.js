const nodemailer = require('nodemailer')
const smtpTransport = require('nodemailer-smtp-transport')
const config = require('../../config.js')
const transport = nodemailer.createTransport(smtpTransport({
    host: 'smtp.exmail.qq.com', // 服务 由于我用的163邮箱
    port: 465, // smtp端口 默认无需改动
    secure: true,
    auth: {
        user: config.user[1], // 用户名
        pass: config.pass[1] // SMTP授权码
    }
}))
// console.log(veriCode.getRandomSym())
exports.send = (mailOptions) => {
    mailOptions = mailOptions?mailOptions:{
        from: '"Bigonion Mail Check" <bigonion@bigonion.cn>', // login user must equel to this user
        to: '454888395@qq.com',
        subject: 'A mail sent by Node.js from Onion',
        text: '123456789',
        html: '<b>Aha this is an emial sent automatically by nodejs for test</b></br>接下来就用<b>这个邮箱<b>来发验证码嘞<br><span>您的验证码是:114514</span>'
    }
    transport.sendMail(mailOptions, function (error, info) {
        if (error) {
            return console.log(error)
        }
        console.log('Message sent: ' + info.response)
    })
}
