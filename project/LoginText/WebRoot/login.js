//点击验证码图片
function changeImg() {
    //需要让每次请求的url都发生变化。否则服务器会认为访问的是同一张图片，就不会刷新请求了
    document.getElementById("vcodeImg").src = "CreateVerfifyCodeImage.do?t=" + Math.random();
}
var xmlHttp;

//创建XMLHttpRequest对象
function createXmlHttp() {
    if (window.XMLHttpRequest) {
        xmlHttp = new XMLHttpRequest();
    } else {
        xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
}

/*
* 使用原生的js实现ajax登录
* */
function ajaxCheckLogin() {
    var userName = document.getElementById("userName").value;
    var password = document.getElementById("password").value;
    var vcode = document.getElementById("vcode").value;
    var autoLogin = document.getElementById("autoLogin").value;
    createXmlHttp(); //调用自定义函数创建XMLHttpRequest对象
    xmlHttp.open("post", "ajaxLoginCheck.do", true);
    xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlHttp.send("userName=" + userName + "&password" + password + "&vcode" + vcode + "&autoLogin" + autoLogin);
    xmlHttp.onreadystatechange = function () { //回调函数
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            var response = xmlHttp.responseText;
            var json = JSON.parse(response); //调用系统函数将字符串转换为json对象
            if (json.code == 0) { //登陆成功
                window.location.href = "main.jsp";
            } else { //登录失败
                document.getElementById("checkError").innerText = json.info; //显示返回错误信息
            }
        }
    }
}
/**
 * 使用jQuery实现基于ajax的用户登录
 */
function jqAjaxCheckLogin() {
    if (!userName_correct || !password_correct || !vcode_correct) {
        $("#userName").blur();
        $("#password").blur();
        $("#vcode").blur();
        return;
    }
    var data;
    if ($("#autoLogin").prop("checked"))
        data = { userName: $("#userName").val(), password: $("#password").val(), vcode: $("#vcode").val(), autoLogin: "y" }
    else
        data = { userName: $("#userName").val(), password: $("#password").val(), vcode: $("#vcode").val() }
    $.ajax({
        type: "post",
        url: "ajaxLoginCheck.do",
        data: data,
        dataType: "json",
        success: function(response) {
            if (response.code == 0) {
                window.location.href = "main.jsp";
            } else {
                $("#checkError").text(response.info);
            }
        }
    });
}


$(document).ready(function() {
    $("#userName").blur(function(e) {
        if ($(this).val() == "") {
            $("#userNameError").text("用户名不能为空！");
        } else {
            $("#userNameError").text("");
            userName_correct = true;
        }
    });

    $("#password").blur(function(e) {
        if ($(this).val() == "") {
            $("#passwordError").text("密码不能为空！");
        } else {
            $("#passwordError").text("");
            password_correct = true;
        }
    });

    $("#vcode").blur(function(e) {
        if ($(this).val() == "") {
            $("#vcodeError").text("验证码不能为空！");
        } else {
            $("#vcodeError").text("");
            vcode_correct = true;
        }
    });
});