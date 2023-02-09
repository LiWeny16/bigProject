const db = require('../db/index')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config')
const fs = require('fs')
const path = require('path')

exports.regUser = (req, res) => {
    const userInfo = req.body//eg:{ username: 'ls', password: '123' }
    let codeArr = []
    fs.promises.readFile(path.join(__dirname, '../temp/veriCode.json')).then((data) => {
        // console.log(JSON.parse(data))
        return JSON.parse(data)
    }).then((data) => {
        data.forEach((e) => {
            if (e.email == userInfo.email) {
                codeArr.push(e.veriCode)
            } else {
                codeArr = []
            }
        })
    }).then(() => {
        // console.log(codeArr[codeArr.length - 1])
        if (userInfo.verifyCode == codeArr[codeArr.length - 1]) {
            const sqlStr = 'select * from usertb where username=?'
            db.query(sqlStr, userInfo.username, (err, results) => {
                if (err) {
                    // return res.send({ status: 1, msg: err.message })
                    return res.cc(err)
                }

                else if (results.length > 0) {
                    res.cc('您的名字太火爆了！已经被占用')
                    // console.log(typeof (results));
                    // console.log(results);
                    const temp = JSON.stringify(results[0], null, 1)
                    // const  temp = {...results[0]}
                    // console.log(temp);
                    // return 0
                    // return res.send(results.length)

                }
                else {
                    console.log(`用户名:${req.body.username}发起了注册请求`)
                    userInfo.password = bcrypt.hashSync(userInfo.password, 10)// 加水加盐
                    // console.log(userInfo.password);
                    const sqlStr2 = 'insert into usertb set ?' // 插入MySQL语句
                    db.query(sqlStr2, { username: userInfo.username, password: userInfo.password, email: userInfo.email }, (err, results) => {
                        if (err) {
                            return res.cc(err)
                        }
                        else if (results.affectedRows !== 1) {
                            console.log('并发错误发生！')
                            return res.cc('注册失败，请您稍后再试')
                        }
                        else {
                            res.cc(`${req.body.username}注册成功`, 1)
                            console.log(`${req.body.username} 用户注册成功`)
                        }

                    })
                }
            })
        } else {
            res.cc('验证码有误,请仔细检查')
        }

    })
}

exports.login = (req, res) => {

    const userinfo = req.body
    const sqlStr = `select * from usertb where username=?`
    db.query(sqlStr, userinfo.username, (err, results) => {
        if (err) return res.cc(err)
        else if (results.length !== 1) {
            return res.cc('用户名不存在，登陆失败！')
        }
        else if (results) {
            const compareResult = bcrypt.compareSync(userinfo.password, results[0].password)
            if (!compareResult) {
                return res.cc('密码错误，登陆失败')
            }
            else {
                // res.cc(`${req.body.username} 用户登陆成功!`,1)
                console.log(`${req.body.username} 用户登陆成功`)
                const user = { ...results[0], password: '', user_pic: '' }// token
                // console.log(user);
                const tokenStr = jwt.sign(user, config.jwtSecret, { expiresIn: config.expiresIn })
                // console.log(tokenStr);
                res.send({
                    status: 1,
                    msg: `${req.body.username} 用户登陆成功!`,
                    user: req.body.username,
                    email:user.email,
                    token: 'Bearer ' + tokenStr
                })
            }

        }
    })



}