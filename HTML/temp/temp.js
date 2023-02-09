const fs = require('fs')
const { array, func } = require('joi')
const path = require('path')
// fs.writeFile(path.join(__dirname,'../../temp/veriCode'),'hello 1234567',(err)=>{
//     console.log(err);
// })

// fs.readFile(path.join(__dirname, '../../temp/veriCode.json'), 'utf-8', (err, data) => {
//     if (err) throw err
//     data = data?data:`[{"example":"123456@qq.com"}]`
//     console.log(data);
//     data = JSON.parse(data)
//     data.push({ b: 2 })
//     fs.writeFile(path.join(__dirname, '../../temp/veriCode.json'), JSON.stringify(data), (err) => {
//         if (err) throw err
//     })
// })
// function arrayFilter(arr) {
//     let obj = {}
//     arr.forEach((item, index) => {
//         obj[item] = arr[index]
//     })
//     let newArr = []
//     for (const key in obj) {
//         newArr.push(Number(key))
//     }
//     return newArr
// }
function checkEmail(useremail, arr) {
    fs.readFile(path.join(__dirname, '../../temp/veriCode.json'), 'utf-8', (err, data) => {
        if (err) throw err
        // console.log(JSON.parse(data));
        data = JSON.parse(data)
        data.forEach((e) => {
            // console.log(e.email)
            if (e.email == useremail) {
                console.log(e.email)
                arr.push(e.email)
            } else {
                arr = []
            }
        })
    })
}
// checkEmail('454888395@qq.com')
// console.log(arr);
let arr = []
fs.promises.readFile(path.join(__dirname, '../../temp/veriCode.json')).then((data) => {
    // console.log(JSON.parse(data))
    return JSON.parse(data)
}).then((data) => {
    data.forEach((e) => {
        if (e.email == '454888395@qq.com') {
            arr.push(e.veriCode)
        } else {
            arr = []
        }
    })
}).then(() => {
    console.log(arr[arr.length - 1])
})

// fs.appendFile(path.join(__dirname,'../../temp/veriCode'),JSON.stringify(content) ,(err)=>{
//     console.log(err);
// })