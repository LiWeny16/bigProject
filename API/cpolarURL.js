const fs = require('fs');

function getcpolarURL(){
try {
    const data = fs.readFileSync('./config.json', 'utf8');
    const config = JSON.parse(data);
    cpolarURL = config.cpolarURL
    return cpolarURL
} catch (err) {
    console.log(`Error reading file from disk: ${err}`);
    return err
}
}
module.exports=getcpolarURL()