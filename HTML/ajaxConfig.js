
var Ip = 0
var Port = 0
var cpolarURL = 0
var token =$.cookie('token')

$.ajax({
    url: "/fs/getIp",
    type: "get",
    async: false,
    beforeSend: function (request) {
        request.setRequestHeader("Authorization", token)
    },
    success: function (result) {
        Ip = result
    },
    error: (err) => {
        console.log(err);
    }
})
$.ajax({
    url: "/fs/getPort",
    type: "get",
    dataType: "text",
    async: false,
    beforeSend: function (request) {
        request.setRequestHeader("Authorization", token)
    },
    success:
        function (result) {
            Port = result
        }
});
$.ajax({
    url: "/fs/getcpolarURL",  //开放接口
    type: "get",
    dataType: "text",
    async: false,
    success:
        function (result) {
            cpolarURL = result
        },
    error:
        function (err) {
            console.log(err);
        }
});
var localURL = `http://${Ip}:${Port}`
console.log(`Ip:${Ip}`);
console.log(`Port:${Port}`);
console.log(`cpolarURL:${cpolarURL}`);
console.log(`localURL:${localURL}`);
