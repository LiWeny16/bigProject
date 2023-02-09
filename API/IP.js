const os = require('os');
function getIPAdress() {
    var interfaces = os.networkInterfaces();
    // console.log(interfaces);
    if (interfaces.WLAN) {
        return interfaces.WLAN[0].address
    }
    else if(interfaces['以太网 5']){
        return interfaces['以太网 5'][0].address
    }
    else {
        return '127.0.0.1'
    }
}
 module.exports = getIPAdress()

// console.log(getIPAdress());
debugger