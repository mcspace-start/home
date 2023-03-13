document.getElementById("loadShade").style.display = "none";
// 顶部固定框显示与隐藏
/*由于其他地方用了ES6语法所以以下滚动事件也没用兼容ie*/

var headWrapper = document.getElementById("head_wrapper");
var fixed_Nav = document.getElementById("fixed_Nav");
var clientHeight = document.documentElement.clientHeight;
/**阻止重复点击 */
var bool = true;
/**到达位置 */
var target = 0;
/*用于判断是否打断滚动*/
var loTop = 0;
/*前进或后退*/
var b = 0;
/* 用于存放计时器*/
var timer = null;

/**左侧固定栏对应li标签 -----------------------begin---------*/
var fixedNavList = fixed_Nav.querySelectorAll("li");
/**用于存储固定栏对应的标签实际位置 */
var listPerson = [];
/*获取固定栏对应的标签实际位置*/
for (let i = 2; i < fixedNavList.length - 1; i++) {
    let n = { url: "", offsetTop: "" };
    n.url = fixedNavList[i].getAttribute("url");
    n.offsetTop = document.querySelector(fixedNavList[i].getAttribute("url")).offsetTop;
    listPerson.push(n);
}
/**以上代码用于滚动事件内操作-------------------end---------*/
// 对位置排序
function compare(property) {
    return function(a, b) {
        var value1 = a[property];
        var value2 = b[property];
        return value1 - value2;
    }
}
window.onscroll = function() {
    var dtop = document.documentElement.scrollTop || document.body.scrollTop;
    if (dtop >= clientHeight) {
        headWrapper.className = "show";
        fixed_Nav.className = "show";
    } else {
        headWrapper.className = "";
        fixed_Nav.className = "";
    }
    /*goTop()打断*/
    if ((document.documentElement.scrollTop ? document.documentElement.scrollTop > loTop : document.body.scrollTop > loTop)) {
        bool = true;
        clearInterval(timer);
        timer = null;
        b = 0;
    }
    /*以下是调到指定位置---------------begin*/
    // 打断机制
    if (b == 1) {
        if (dtop < loTop) {
            bool = true;
            clearInterval(timer);
            timer = null;
        }
    } else if (b == 2) {
        if (dtop > loTop) {
            bool = true;
            clearInterval(timer);
            timer = null;
        }
    }
    // 到达目的地
    if (b == 1) {
        if (dtop > target) {
            if (!(dtop == 0)) {
                let gaps = dtop - target;
                // 微调
                if (gaps < 0) {
                    document.documentElement.scrollTop ? document.documentElement.scrollTop -= gaps : document.body.scrollTop -= gaps;
                } else if (gaps > 0) {
                    document.documentElement.scrollTop ? document.documentElement.scrollTop -= gaps : document.body.scrollTop -= gaps;
                }
            }
            bool = true;
            clearInterval(timer);
            timer = null;
            b = 0;
        }
    } else if (b == 2) {
        if (dtop < target || dtop == 0) {
            if (!(dtop == 0)) {
                let gaps = dtop - target;
                // 微调
                if (gaps < 0) {
                    document.documentElement.scrollTop ? document.documentElement.scrollTop -= gaps : document.body.scrollTop -= gaps;
                } else if (gaps > 0) {
                    document.documentElement.scrollTop ? document.documentElement.scrollTop -= gaps : document.body.scrollTop -= gaps;
                }
            }
            bool = true;
            clearInterval(timer);
            timer = null;
            b = 0;
        }

    }
    // 判断是否到达浏览器底部 解决页面长度不够问题
    var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
    if (document.documentElement.scrollHeight == document.documentElement.clientHeight + scrollTop) {
        bool = true;
        clearInterval(timer);
        timer = null;
        b = 0;
    }
    /*以上是调到指定位置--------------end*/

    /*以下是到达指定位置变化颜色功能实现-----------------begin*/
    //排序以处理左侧标签位置和实际位置不相同问题 
    listPerson.sort(compare("offsetTop"));
    // 指定标签添加类名act 
    for (let i = 0; i < listPerson.length; i++) {
        // 对于左侧第2个天猫官网单独处理
        if (dtop < listPerson[0].offsetTop) {
            fixedNavList[1].className = "act";
            for (let x = 2; x < fixedNavList.length; x++) {
                fixedNavList[x].className = "";
            }
        }
        // 主要代码
        if (dtop >= listPerson[i].offsetTop) {
            //    清除原有类名
            for (let a = 0; a < fixedNavList.length; a++) {
                fixedNavList[a].className = "";
            }
            for (let b = 0; b < fixedNavList.length; b++) {
                if (fixedNavList[b].getAttribute("url") == listPerson[i].url) {
                    fixedNavList[b].className = "act";
                }
            }
        }
    }
    /*以上是到达指定位置变化颜色功能实现-----------------end*/

};

function goTop() {
    if (!bool) {
        return;
    }
    var time = 500;
    var stepTime = Math.floor(time / 30);
    sTop = (document.documentElement.scrollTop || document.body.scrollTop);
    step = Math.floor(sTop / 30);
    timer = setInterval(function() {
        document.body.scrollTop -= step;
        document.documentElement.scrollTop -= step;
        if ((document.documentElement.scrollTop || document.body.scrollTop) == 0) {
            clearInterval(timer);
            timer = null;
        }
        loTop = document.documentElement.scrollTop || document.body.scrollTop;
    }, stepTime);
}

/** 滚动条到达指定位置功能实现*/
function goWhere(id) {
    var step = 0;
    if (!bool) {
        return;
    }
    target = document.querySelector(id).offsetTop;
    var time = 300;
    var current = document.documentElement.scrollTop || document.body.scrollTop;
    var length = current - target;
    step = Math.ceil(Math.abs(length) / 30);
    /*判断是前进还是后退*/
    if (length > 0) {
        b = 2;
    } else if (length < 0) {
        b = 1;
    } else {
        b = 0;
    }
    // console.clear()
    // console.log(length)
    // console.log(step)
    // console.log("现在是：" + current + "，目的地：" + target + "，绝对值：" + Math.abs(length));
    // console.log("状态:" + b)
    // console.log(Math.floor(time / 60))
    timer = setInterval(function() {
        if (b == 1) {
            document.documentElement.scrollTop ? document.documentElement.scrollTop += step : document.body.scrollTop += step;
        } else if (b == 2) {
            document.documentElement.scrollTop ? document.documentElement.scrollTop -= step : document.body.scrollTop -= step;
        } else {
            clearInterval(timer);
            timer = null;
        }
        loTop = document.documentElement.scrollTop || document.body.scrollTop;
    }, Math.floor(time / 30));

    /*解决页面长度不够问题 防止死循环*/
    setTimeout(function() {
        if (timer !== null) {
            bool = true;
            clearInterval(timer);
            timer = null;
            b = 0;
        }
    }, 1000);

    if (b != 0) {
        bool = false;
    }
}


function topNavShow(n, id) { //封装函数
    // n:表示第n个标签 id:对应显示标签
    var topNav_rightList = document.querySelectorAll(".topNav_right li");
    let selector = topNav_rightList[n];
    selector.className = "act";
    var slBoxIs = document.getElementById(id);
    slBoxIs.style.display = "block";
}

function topNavHide(n, id) {
    var topNav_rightList = document.querySelectorAll(".topNav_right li");
    let selector = topNav_rightList[n];
    selector.className = "";
    var slBoxIs = document.getElementById(id);
    slBoxIs.style.display = "none";
}
//搜索框聚焦
var searchText = document.querySelector(".searchBox input");
searchText.focus();

// 海报轮播图
var bannerIndex = 0; //海报图索引值
var banner = document.querySelector(".banner");
var bannerBox = document.querySelector(".bannerBox");
var bannerPic = document.getElementById("bannerPic");
var bannerLiterpicBox = document.querySelector(".bannerLiterpic");
var bannerPoints = document.querySelectorAll(".bannerPoint li");
// 切换函数
function fun() {
    bannerIndex++;
    // if (bannerIndex == bannerData.length) {
    //     bannerIndex = 0;
    // }
    // bannerPointClick(bannerIndex);
}
// 定时器
var bannerTimer = setInterval(fun, 3000);
// 海报轮播事件
function bannerPointClick(n) {
    bannerIndex = n;
    bannerBox.style.background = bannerData[n].bgColor;
    //banner图片切换
    bannerPic.src = bannerData[n].bannerPic;
    var literPics = bannerData[n].litterPic;
    bannerLiterpicBox.innerHTML = "";
    //banner小图
    for (let i = 0; i < literPics.length; i++) {
        let str =
            "<li><img src='./" + literPics[i] + "'></li>";
        bannerLiterpicBox.innerHTML += str;
    }
    for (let j = 0; j < bannerPoints.length; j++) {
        bannerPoints[j].className = ""; //清除选中
    }
    bannerPoints[n].className = "act";
}
// 移入清除定时器
banner.onmouseover = function() {
    clearInterval(bannerTimer);
};
//移出加入定时器
banner.onmouseout = function() {
    bannerTimer = setInterval(fun, 3000);
};

//侧边栏的自动生成
var asideLeftBox = document.querySelector(".asideLeft ol");
for (let i = 0; i < goodsClass.length; i++) {
    let str = "<li index=" + i + "><span class='iconfont " + goodsClass[i].iconfont + "'" + "></span>" + goodsClass[i].title + "</li>";
    asideLeftBox.innerHTML += str;

}
/* 鼠标移上侧边栏显示对应内容 */
//左侧标签
var asideLeftLisBox = document.querySelector(".asideLeft");
var asideLeftLis = asideLeftLisBox.querySelectorAll("ol>li");
//中间大标签
var asideCenterBox = document.querySelector(".asideCenter ul");
var asideRightBox = document.querySelector(".asideRight ul");
var asideCenter = document.querySelector(".asideCenter");
var asideRight = document.querySelector(".asideRight");
var enterIndex = 0;
var leaveIndex = 0;

// 控制侧边栏中间和右边显示
function asideShow() {
    asideLeftLis[enterIndex].className = "act";
    asideCenter.style.display = "block";
    asideRight.style.display = "block";
}
// 控制侧边栏中间和右边隐藏
function asideHide() {
    asideLeftLis[enterIndex].className = "";
    asideCenter.style.display = "none";
    asideRight.style.display = "none";
}
//--------------------------------------------------------------------------------------
/**侧边栏中间与右侧 */
function CAR() {
    var centerUl = document.createElement("ul");
    var rightUl = document.createElement("ul");
    var asideLeftLisLength = asideLeftLis.length;
    let i = 0;
    for (; i < asideLeftLisLength; i++) {
        let data = goodsClass[i].details;
        let li = document.createElement("li");
        li.setAttribute("style", "display:none");
        // 侧边栏中间部分
        let j = 0;
        for (; j < data.length; j++) {
            let str = "<li class='asideCenter_li'> <p class='asideCenter_title'>" + data[j].tips + " <span class='iconfont icon-31fanhui2'></span> </p><ol class='asideCenter_list'>";
            let aText = data[j].tipList;
            let k = 0;
            for (; k < aText.length; k++) {
                let flag = aText[k].flag;
                if (flag) {
                    str += "<li><a href=" + aText[k].linkURL + " class='act'>" + aText[k].tit + "</a></li>";
                } else {
                    str += "<li><a href='" + aText[k].linkURL + "'>" + aText[k].tit + "</a></li>";
                }
            }
            str += "</ol></li>";
            li.innerHTML += str;
        }
        centerUl.appendChild(li);
        asideCenter.appendChild(centerUl);
        let centerLists = asideCenter.querySelectorAll("ul>li");
        /* 右侧部分*/
        let picsData = goodsClass[i].pics;
        let pic = document.createElement("li");
        pic.setAttribute("style", "display:none");
        let l = 0;
        for (; l < picsData.length; l++) {
            let str = "";
            if (picsData.length == 1) {
                str = "<li class='one'><a href='#'><img src=" + picsData[l] + " alt=''></a></li>";
            } else {
                str = "<li class='tow'><a href='#'><img src=" + picsData[l] + " alt=''></a></li>";
            }
            pic.innerHTML += str;
        }
        rightUl.appendChild(pic);
        asideRight.appendChild(rightUl);
        var rightLists = asideRight.querySelectorAll("ul>li");
        //添加鼠标移入事件
        asideLeftLis[i].addEventListener("mouseover", function() {
            let liIndex = this.getAttribute("index");
            asideShow();
            this.className = "act";
            enterIndex = liIndex; //获取li下标
            // asideLeftLis[i].onmouseover = function() {
            centerLists[liIndex].style.display = "block";
            rightLists[liIndex].style.display = "flex";
            //先清空所有li选中状态
            for (let x = 0; x < asideLeftLis.length; x++) {
                asideLeftLis[x].className = "";
            }
            // 鼠标移入选中li(act)
            //侧边栏鼠标移上显示中间右边部分
            // };
        });
        // li移出事件
        asideLeftLis[i].onmouseout = function() {
            let liIndex = this.getAttribute("index");
            leaveIndex = liIndex;
            asideHide();
            centerLists[leaveIndex].style.display = "none";
            rightLists[leaveIndex].style.display = "none";
            asideLeftLis[enterIndex].className = "";
        };
    }
}
CAR();

asideCenter.addEventListener("mouseover", function() {
    asideCenter.querySelectorAll("ul>li")[enterIndex].style.display = "block";
    asideRight.querySelectorAll("ul>li")[enterIndex].style.display = "flex";
});
asideCenter.addEventListener("mouseout", function() {
    asideCenter.querySelectorAll("ul>li")[enterIndex].style.display = "none";
    asideRight.querySelectorAll("ul>li")[enterIndex].style.display = "none";
});
asideRight.addEventListener("mouseover", function() {
    asideCenter.querySelectorAll("ul>li")[enterIndex].style.display = "block";
    asideRight.querySelectorAll("ul>li")[enterIndex].style.display = "flex";
});
asideRight.addEventListener("mouseout", function() {
    asideCenter.querySelectorAll("ul>li")[enterIndex].style.display = "none";
    asideRight.querySelectorAll("ul>li")[enterIndex].style.display = "none";
});

//--------------------------------------------------------------------------------------

// 模块三数据生成
var moder3_TopPic = document.querySelector(".moder3_TopPic img");
moder3_TopPic.src = moder3_Data.moder3_topPic;
var moder3_listBox = document.querySelector(".moder3_list");
var moder3Banners = moder3_Data.moder3_banner;
for (let i = 0; i < moder3Banners.length; i++) {
    let str = "<li><a href=" + moder3Banners[i].linkUrl + "><img src=" + moder3Banners[i].picUrl + " alt=''></a></li>";
    moder3_listBox.innerHTML += str;
}
// 模块四数据生成
//moder4_Data
var moder4_Box = document.querySelector(".moder4");
for (let i = 0; i < moder4_Data.length; i++) {
    let str = "<li class='moder4_left'><a href=" + moder4_Data[i].linkUrl + "><div class='title'>" + moder4_Data[i].title + "<span class='iconfont icon-iconfont31yiguanzhudianpu'></span></div><div class='moder_pic'><img src=" + moder4_Data[i].picUrl + " alt=''></div></a></li>";
    moder4_Box.innerHTML += str;
}
// 模块五数据生成
var moder5_Box = document.querySelector(".moder5");
for (let i = 0; i <= moder5_Data.length; i++) {
    let str = "";
    if (i != moder5_Data.length) {
        str = "<li>\
            <a href=" + moder5_Data[i].linkUrl + ">\
                <div class='moder5Pic'>\
                    <img src=" + moder5_Data[i].picUrl + " alt=''>\
                </div>\
                <div class='shadowBox'>\
                    <div>" + moder5_Data[i].title + "</div>\
                    <button>点击进入</button>\
                </div>\
            </a>\
        </li>";
    } else {
        str = "<li>\
        <a href='#'>\
        <div>\
            <span class='iconfont icon-shuaxin'></span>\
            <p>换一批</p>\
        </div>\
        </a>\
    </li>";
    }
    moder5_Box.innerHTML += str;
}
// 天猫超市数据生成
// 右侧第一个固定生成  今日疯抢and量贩装切换将在290行后写
// 右侧li自动生成
var tmMarketGoods = tmMarketData.goodsList;
var tmMarketRightBox = document.querySelector(".tmMarketRight");
/*通用方法*/
function data() {
    for (let i = 0; i < tmMarketGoods.length; i++) {
        let str = "\
    <li class='goodList'>\
             <a href=" + tmMarketGoods[i].linkUrl + ">\
                <img src=" + tmMarketGoods[i].picUrl + " alt=''>\
                <p>" + tmMarketGoods[i].title + "</p>\
                <p class='goodPrice'>" + tmMarketGoods[i].price + "</p>\
           </a>\
     </li>";
        tmMarketRightBox.innerHTML += str;
    }
}
data();
// 天猫国际
tmMarketGoods = tmInterData.goodsList;
tmMarketRightBox = document.querySelector(".tmInterRight");
data();
// 美丽人生
tmMarketGoods = tmbeautData.goodsList;
tmMarketRightBox = document.querySelector(".tmbeautRight");
data();
// 户外出行
tmMarketGoods = tmoutdoorData.goodsList;
tmMarketRightBox = document.querySelector(".tmoutdoorRight");
data();
// 潮电酷玩
tmMarketGoods = tmelectronicsData.goodsList;
tmMarketRightBox = document.querySelector(".tmelectronicsRight");
data();
// 潮电酷玩
tmMarketGoods = tmhomeData.goodsList;
tmMarketRightBox = document.querySelector(".tmhomeRight");
data();
// 猜你喜欢
likeList = likeData.likesList;
likeBox = document.querySelector(".likeContent");
for (let i = 0; i < likeList.length; i++) {
    let str = "\
    <li class='likeList'>\
    <a href=" + likeList[i].linkUrl + ">\
        <div>\
            <img src=" + likeList[i].picUrl + " alt=''>\
            <p>\
            " + likeList[i].title + "</p>\
            <p class='likePrice'>" + likeList[i].price + "</p>\
        </div>\
    </a>\
    </li>";
    likeBox.innerHTML += str;
}

// 右侧第一个固定生成  今日疯抢 因为前面js插入数据所以后面编写
var tmMarketToday_ContentPic = document.querySelector(".tmMarketToday_Content img");
var mark01 = document.querySelector(".mark p:first-of-type");
var mark02 = document.querySelector(".mark p:last-of-type");
tmMarketToday_ContentPic.src = tmMarketData.todayCrazy.picUrl;

mark01.innerHTML = "\
<span class='iconfont icon-chanpincanshu'></span>" + tmMarketData.todayCrazy.title;
mark02.innerHTML = tmMarketData.todayCrazy.tip;
// 量贩装  
var tmMarketTodayList = document.querySelectorAll(".tmMarketToday_Nav li");
for (let i = 0; i < tmMarketTodayList.length; i++) {
    tmMarketTodayList[i].onmouseover = function() {
        for (let j = 0; j < tmMarketTodayList.length; j++) {
            tmMarketTodayList[j].className = "";
        }
        this.className = "act";
        if (this.textContent == "今日疯抢") {
            mark01.innerHTML = "\
            <span class='iconfont icon-chanpincanshu'></span>" + tmMarketData.todayCrazy.title;
            mark02.innerHTML = tmMarketData.todayCrazy.tip;
            tmMarketToday_ContentPic.src = tmMarketData.todayCrazy.picUrl;

        } else {
            mark01.innerHTML = "\
            <span class='iconfont icon-chanpincanshu'></span>" + tmMarketData.massSales.title;
            mark02.innerHTML = tmMarketData.massSales.tip;
            tmMarketToday_ContentPic.src = tmMarketData.massSales.picUrl;
        }
    };
}

// 尾部区域 footer
var footerList01 = ["关于天猫", "帮助中心", "开放平台", "诚聘英才", "联系我们", "网站合作", "法律声明", "隐私权政策", "知识产权", "廉正举报"];
var a01 = document.getElementById("a01");
let str01 = "";
for (var i = 0; i < footerList01.length; i++) {
    str01 += "<a href='#'>" + footerList01[i] + "</a>";
};
a01.innerHTML = str01;
var footerList02 = ["阿里巴巴集团", "淘宝网", "天猫", "聚划算", "全球速卖通", "阿里巴巴国际交易市场", "1688", "阿里妈妈", "飞猪", "阿里云计算", "AliOS", "阿里通信", "万网", "高德", "UC", "友盟", "虾米", "钉钉", "支付宝", "阿里安全"];
var a02 = document.getElementById("a02");
let str02 = "";
for (var i = 0; i < footerList02.length; i++) {
    str02 += "<a href='#'>" + footerList02[i] + "</a>";
}
a02.innerHTML = str02;

/*
.....（〜^㉨^)〜
*/