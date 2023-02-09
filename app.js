const fs = require('fs')
const express = require('express')
const app = express()
const cors = require('cors')
const userRouter = require('./router/user')
const expressJWT = require('express-jwt')
const config = require('./config')
const userinfoRouter = require('./router/userinfo')
const userfileRouter = require('./router/file')
const userMailRouter =require('./router/userMail')
const getPort = require('./API/Port')
const https = require('https')
const http = require('http')
// const enforceHttps = require('koa-sslify')
var options = {
    key: fs.readFileSync('./SSLcer/key_ecs.bigonion.cn.key'),
    cert: fs.readFileSync('./SSLcer/pub_ecs.bigonion.cn.crt')
}

// app.use(enforceHttps())
//解决跨域cors中间件，处理http头
app.use(cors())
app.use(express.static('HTML'))
app.use(express.static('uploadFiles'))

//全局挂载静态
//解析form 表单格式数据，到req.body
app.use(express.urlencoded({ extended: false }))

//全局函数
app.use((req, res, next) => {
    res.cc = function (err, status = 0, chose_data="") { //成功status=1
        res.send({
            status:status,
            msg: err instanceof Error ? err.message : err,
            data: chose_data
        })
    }
    next()
})

//jsonwebtoken 解析中间件，发生验证错误给err附加name属性值为：UnauthorizedError
// app.use(expressJWT({secret:config.jwtSecret}).unless({path:[/^(\/api\/)|(\/fs\/file\/)/]}))
app.use(expressJWT({ secret: config.jwtSecret }).unless({ path: [/^(\/api\/)|(\/fs\/getcpolarURL)|(\/mail\/sendMail)/] }))



//新加入
// app.use(helmet())


//路由模块
app.use('/api', userRouter)
app.use('/my', userinfoRouter)
app.use('/fs', userfileRouter)
app.use('/mail',userMailRouter)

//错误级别中间件
app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') return res.cc(`token验证失败！err:${err}`)
    res.cc(err)
})


https.createServer(options, app).listen(getPort, () => {
    console.log(`running now at ${getPort}`)
})
http.createServer((req,res)=>{
    res.writeHead(301,{
        'Location':'https://ecs.bigonion.cn'
    })
    res.end()
}).listen(80, () => {
    console.log(`running now at 80`)
})
// app.listen(getPort, () => {
//     console.log(`running now at ${getPort}`)
// })