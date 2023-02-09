const sendMail = require('./apiFunction/sendMail')
const verifyCode = require('../schema/verifyCode')
const fs = require('fs')
const path = require('path')
exports.send = (req, res) => {
    // verifyCode.getRandomSym(0,6)
    if (!req.body.email || !req.body.username || !req.body.password) {
        res.cc("请输入完整信息！")
    }
    else {
        let veriCode = verifyCode.getRandomSym(0, 6)
        let Mailto = req.body.email
        try {
            sendMail.send({
                from: '"Bigonion Mail Check" <bigonion@bigonion.cn>', // login user must equel to this user
                to: Mailto,
                subject: 'Bigonion验证码',
                text: 'test',
                html:
                    `
                <div id="qm_con_body">
                <div id="mailContentContainer" class="qmbox qm_con_body_content qqmail_webmail_only" style="opacity: 1;">
                    <table border="0" cellspacing="0" cellpadding="0" style="max-width: 600px;">
                        <tbody>
                            <!-- <tr>
                                <td>
                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                        <tbody>
                                            <tr>
                                                <td align="left"><img width="92" height="32"
                                                        src="https://ssl.gstatic.com/images/branding/googlelogo/2x/googlelogo_color_188x64dp.png"
                                                        style="display: block; width: 92px; height: 32px;"></td>
                                                <td align="right"><img width="32" height="32"
                                                        style="display: block; width: 32px; height: 32px;"
                                                        src="https://ssl.gstatic.com/accountalerts/email/keyhole.png"></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr> -->
                            <tr height="16"></tr>
                            <tr>
                                <td>
                                    <table bgcolor="#4184F3" width="100%" border="0" cellspacing="0" cellpadding="0"
                                        style="min-width: 332px; max-width: 600px; border: 1px solid #E0E0E0; border-bottom: 0; border-top-left-radius: 3px; border-top-right-radius: 3px;">
                                        <tbody>
                                            <tr>
                                                <td height="22px" colspan="3"></td>
                                            </tr>
                                            <tr>
                                                <td width="32px"></td>
                                                <td
                                                    style="font-family: Roboto-Regular,Helvetica,Arial,sans-serif; font-size: 24px; color: #FFFFFF; line-height: 1.25;">
                                                    Bigonion 用户验证码</td>
                                                <td width="32px"></td>
                                            </tr>
                                            <tr>
                                                <td height="18px" colspan="3"></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <table bgcolor="#FAFAFA" width="100%" border="0" cellspacing="0" cellpadding="0"
                                        style="min-width: 332px; max-width: 600px; border: 1px solid #F0F0F0; border-bottom: 1px solid #C0C0C0; border-top: 0; border-bottom-left-radius: 3px; border-bottom-right-radius: 3px;">
                                        <tbody>
                                            <tr height="16px">
                                                <td width="32px" rowspan="3"></td>
                                                <td></td>
                                                <td width="32px" rowspan="3"></td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <p>尊敬的Bigonion用户：</p>
                                                    <p>我们收到了一项请求，要求通过您的电子邮件地址访问您的 Bigonion 帐号 <span style="color: #659CEF"
                                                            dir="ltr"><a href="mailto:${Mailto}" rel="noopener"
                                                                target="_blank">${Mailto}</a></span>。您的账号验证码为：</p>
                                                    <div style="text-align: center;">
                                                        <p dir="ltr"><strong
                                                                style="text-align: center; font-size: 24px; font-weight: bold;">${veriCode}</strong>
                                                        </p>
                                                    </div>
                                                    <p>如果您并未请求此验证码，则可能是他人正在尝试访问以下帐号：<span style="color: #659CEF"
                                                            dir="ltr"><a href="mailto:${Mailto}" rel="noopener"
                                                                target="_blank">${Mailto}</a></span>。<strong>请勿将此验证码转发给或提供给任何人。</strong>
                                                    </p>
            
                                                    <p>此致</p>
                                                    <p>Onion 敬上</p>
                                                </td>
                                            </tr>
                                            <tr height="32px"></tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            <tr height="16"></tr>
                            <tr>
                                <td
                                    style="max-width: 600px; font-family: Roboto-Regular,Helvetica,Arial,sans-serif; font-size: 10px; color: #BCBCBC; line-height: 1.5;">
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td>此电子邮件地址无法接收回复。如需更多信息，请发件询问
                                                    <a href="mailto:bigonion@bigonion.cn"
                                                        style="text-decoration: none; color: #4d90fe;" rel="noopener"
                                                        target="_blank">bigonion@bigonion.cn</a>。
                                                    <table
                                                        style="font-family: Roboto-Regular,Helvetica,Arial,sans-serif; font-size: 10px; color: #666666; line-height: 18px; padding-bottom: 10px">
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <style type="text/css">
                        .qmbox style,
                        .qmbox script,
                        .qmbox head,
                        .qmbox link,
                        .qmbox meta {
                            display: none !important;
                        }
                    </style>
                </div>
                <style>
                    #mailContentContainer .txt {
                        height: auto;
                    }
                </style> 
                `
            })
            res.cc('发送邮箱成功！', 1)
            console.log("用户" + req.body.username + " " + req.body.email + " " + req.socket.remoteAddress + "发起了邮箱请求")
            let content ={
                "email":req.body.email,
                "veriCode":veriCode
            }
            fs.readFile(path.join(__dirname, '../temp/veriCode.json'), 'utf-8', (err, data) => {
                if (err) throw err
                data = data?data:`[{"email":"454888395@qq.com","veriCode":"114514"}]`
                // console.log(data);
                data = JSON.parse(data)
                data.push(content)
                fs.writeFile(path.join(__dirname, '../temp/veriCode.json'), JSON.stringify(data), (err) => {
                    if (err) throw err
                })
            })
        } catch (error) {
            res.cc(error)
        }
    }

}
// const nodemailer = require('nodemailer')
// const smtpTransport = require('nodemailer-smtp-transport')
// const config = require('../config.js')
// const veriCode = require('../schema/verifyCode')
// const transport = nodemailer.createTransport(smtpTransport({
//     host: 'smtp.exmail.qq.com', // 服务 由于我用的163邮箱
//     port: 465, // smtp端口 默认无需改动
//     secure: true,
//     auth: {
//         user: config.user[1], // 用户名
//         pass: config.pass[1] // SMTP授权码
//     }
// }))
// // console.log(veriCode.getRandomSym())
// exports.send = () => {
//     mailOptions = {
//         from: '"Bigonion Mail Check" <bigonion@bigonion.cn>', // login user must equel to this user
//         to: '454888395@qq.com',
//         subject: 'A mail sent by Node.js from Onion',
//         text: '123456789',
//         html: '<b>Aha this is an emial sent automatically by nodejs for test</b></br>接下来就用<b>这个邮箱<b>来发验证码嘞<br><span>您的验证码是:114514</span>'
//     }
//     transport.sendMail(mailOptions, function (error, info) {
//         if (error) {
//             return console.log(error)
//         }
//         console.log('Message sent: ' + info.response)
//     })
// }
