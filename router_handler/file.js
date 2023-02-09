const fs=require('fs')


exports.handle=  (req, res)=> {

    var originalname = req.files[0].originalname
    var extendName = originalname.slice(originalname.lastIndexOf('.'))
    var fileName = originalname.slice(0, originalname.lastIndexOf('.'))
    var newNameDay = `uploadFiles/${originalname}`
    function run(filePath) {
        let str;
        fs.readFile(filePath,{encoding:"utf-8"}, function (err, fr) {
               //readFile回调函数
               if (err) {
                 console.log(err);
                }else {
                 str = fr;
                }
            });
        return str;
    }
    // console.log(extendName)
    // console.log(fileName);
    // console.log( originalname);s
    // console.log(req.files[0].originalname);
    // console.log(req.files[0].path);
    // console.log(newName);
    // console.log(req.files[0]);
    fs.exists(`uploadFiles\\${originalname}`, (exists) => {
        if (exists) {
            fs.rename(req.files[0].path, newNameDay, function (err) {
                if (err) {
                    res.send('失败！')
                } else {
                    res.send(`{status:2}`)
                }
            })
        }
        else {
            fs.rename(req.files[0].path, newNameDay, function (err) {
                if (err) {
                    res.send('失败！')
                } else {
                    res.send('{status:1}')
                }
            })
        }
    })

    // res.send('1')


}

exports.fileInfo =function (req, res) {
    // var fileNames=fs.readdir('./uploadFiles')
    // console.log(fileNames);
    fs.readdir('./uploadFiles', (err, files) => {
        if (err) {
            return err
        }
        else {
            // console.log(files);

            var i = 0
            var filesLength = files.length
            // console.log(filesLength);
            res.send(files)
        }
    })

}