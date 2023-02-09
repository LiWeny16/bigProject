const express=require('express')
const router=express.Router()
const multer = require('multer')
const file_handler = require('../router_handler/file')
const getIp = require('../API/IP');
const getPort = require('../API/Port')
const getcpolarURL = require('../API/cpolarURL')
var ip = getIp
var port = getPort
var cpolarURL = getcpolarURL
// console.log(`port:${port}`);
// console.log(`ip:${ip}`);
// console.log(`cpolarURL${cpolarURL}`);
var upload = multer({
    dest: '../uploadFiles/',
    fileFilter(req, file, callback) {
        // 解决中文名乱码的问题
        file.originalname = Buffer.from(file.originalname, "latin1").toString(
            "utf8"
        );
        callback(null, true);
    },

})
router.post('/file', upload.any(),file_handler.handle)

router.post('/fileInfo', file_handler.fileInfo)

router.get('/getIp', function (req, res) {
    res.send(getIp)
})
router.get('/getPort', function (req, res) {
    res.send(`${port}`)
})
router.get('/getcpolarURL', function (req, res) {
    res.send(`${cpolarURL}`)
})
router.use(express.static('uploadFiles'))

module.exports=router