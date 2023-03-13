var navs = document.querySelectorAll(".nav_top li");
var erWerMa = document.getElementById("erWeiMa");
var mimaBox = document.querySelectorAll(".mimaBox");


// 函数
//密码短信登录
function mimaBoxShow(id, boxName) {
    for (var i = 0; i < navs.length; i++) {
        navs[i].className = "";
    }
    id.className = "act";
    for (var j = 0; j < mimaBox.length; j++) {
        mimaBox[j].className = "mimaBox";
    }
    document.getElementById(boxName).className = "mimaBox act";
}

//扫码登录
function boxShow(id) {
    var loginBox = document.querySelectorAll(".loginBox");
    //隐藏全部盒子
    for (var i = 0; i < loginBox.length; i++) {
        loginBox[i].className = "loginBox";
    }
    //扫码出现
    var scanBox = document.getElementById(id);
    scanBox.className = "loginBox act";
}

var footerList01 = ["关于天猫", "帮助中心", "开放平台", "诚聘英才", "联系我们", "网站合作", "法律声明", "隐私权政策", "知识产权", "廉正举报"];
var a01 = document.getElementById("a01");
let str01 = "";
for (var i = 0; i < footerList01.length; i++) {
    str01 += "<a href='#'>" + footerList01[i] + "</a>";
}
a01.innerHTML = str01;
var footerList02 = ["阿里巴巴集团", "淘宝网", "天猫", "聚划算", "全球速卖通", "阿里巴巴国际交易市场", "1688", "阿里妈妈", "飞猪", "阿里云计算", "AliOS", "阿里通信", "万网", "高德", "UC", "友盟", "虾米", "钉钉", "支付宝", "阿里安全"];
var a02 = document.getElementById("a02");
let str02 = "";
for (var i = 0; i < footerList02.length; i++) {
    str02 += "<a href='#'>" + footerList02[i] + "</a>";
}
a02.innerHTML = str02;