const db = require('../db/index')


exports.getUserInfo = (req, res) => {
    const sqlStr = 'select id,username,nickname,user_pic from usertb where id=?'
    // console.log(req);
    db.query(sqlStr, req.user.id, (err, results) => {
        if (err) return res.cc(err)
        else if (results.length !== 1) {
            res.cc('获取用户信息失败,找不到用户！')
        }
        else
           res.cc('获取userinfo成功！',1,results[0])
    }
    )
}

exports.updateuserInfo = (req,res) =>{
    const sqlStr = 'update usertb set ? where id=? '
    res.send(`${req.user.id}`)
} 