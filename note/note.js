"use strict";
// 节流函数
function throttle(func, delay, context) {
    var timer = null;
    return function () {
        if (timer === null) {
            // 只有为null时才可运行，运行时timer不为null
            timer = setTimeout(() => {
                if (!context) {
                    var context = this;
                    let gs = arguments;
                    func.apply(context, args);
                }
                func.apply(context);
                timer = null; // 执行完后设置为Null以继续下次运行
            }, delay);
        }
    };
}
// 判断是否为ie
function IEVersion() {
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isIE =
        userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器
    var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器
    var isIE11 =
        userAgent.indexOf("Trident") > -1 && userAgent.indexOf("rv:11.0") > -1;
    if (isIE) {
        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(userAgent);
        var fIEVersion = parseFloat(RegExp["$1"]);
        if (fIEVersion == 7) {
            return 7;
        } else if (fIEVersion == 8) {
            return 8;
        } else if (fIEVersion == 9) {
            return 9;
        } else if (fIEVersion == 10) {
            return 10;
        } else {
            return 6; //IE版本<=7
        }
    } else if (isEdge) {
        return "edge"; //edge
    } else if (isIE11) {
        return 11; //IE11
    } else {
        return -1; //不是ie浏览器
    }
}
// 滚动条移动
function scrollTop(target, el) {
    // 无参数返回 scrollTop
    if (arguments.length === 0)
        return document.documentElement.scrollTop || document.body.scrollTop;
    // if (arguments.length === 0) return document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
    // 有参数滚动
    try {
        if (!el) {
            document.documentElement.scrollTop = target;
            document.body.scrollTop = target;
            window.pageYOffset = target;
        } else {
            el.scrollTop = target;
        }
    } catch (err) {
        console.log("滚动错误！");
    }
}
// 页面可是高度
function getViewPortHeight() {
    return document.documentElement.clientHeight || document.body.clientHeight;
}
// 用于旧版生成列表
try {
    var a = noteContent.content.match(/.*\n/g);
    var note = document.getElementById("note");
    if (!note) {
        var ul = document.createElement("ul");
        ul.setAttribute("class", "note");
        ul.setAttribute("id", "note");
        document.body.appendChild(ul);
    }

    var box = document.getElementById("note");
    box.innerHTML = "<p>" + noteContent.title + "<p/>";
    // for (let i = 0; i < a.length; i++) {
    for (var i = 0; i < a.length; i++) {
        var li = document.createElement("li");
        var pre = document.createElement("pre");
        pre.innerText = a[i];
        li.appendChild(pre);
        box.appendChild(li);
    }
} catch (err) { }
// 大纲可折叠
try {
    // 获取所有级别列表
    var outlineList = document.querySelectorAll('li[class|="outline"]');
    for (var i = 0; i < outlineList.length; i++) {
        if (outlineList[i].childNodes[1].childNodes.length !== 0) {
            // outlineList[i].setAttribute("data-title", "+"); //初始值);
            outlineList[i].setAttribute("data-title", "-"); //初始值);
            // outlineList[i].className += " act";
        }
    }
    // 事件委托
    var tocBox = document.getElementsByClassName("outline-content")[0];
    tocBox.addEventListener("click", function (e) {
        var outline = e.target.parentNode;
        if (/\boutline-h[2-6]\b/.exec(outline.className)) {
            // 避免点击到 label
            if (!/\boutline-h/.exec(outline.className)) {
                outline = e.target.parentNode.parentNode;
            }
            if (outline.childNodes[1].childNodes.length !== 0) {
                // console.log('有子标签');
                // 切换展开
                if (!/\bact\b/.exec(outline.className)) {
                    outline.className += " act";
                    outline.setAttribute("data-title", "+"); //初始值);
                } else {
                    outline.className = outline.className.replace(/\s*\bact\b/, "");
                    outline.setAttribute("data-title", "-"); //初始值);
                }
            }
        }
    });
} catch (err) { }

// 丝滑滚动
try {
    var running = {
        // 存储计时器
        timer: null,
        // 避免连续触发
        dblclick: false,
        // 存储状态 1 前进 2 后退 0 不用动
        status: 0,
        oldTarget: 0,
        // 参数 target:number totaltime:number fps:number totaltime和fps可以为空
        goWhere: function (target, totalTime, fps) {
            // 避免连续点击
            if (this.dblclick) return console.log("正在滚动中-打断");
            // 参数不能为空
            if (target === undefined) throw "缺少参数target";
            // 必须是数字
            if (typeof target !== "number") throw "必须为number";
            // 设置默认值
            if (!totalTime) totalTime = 1000;
            if (!fps) fps = 30;

            // 保存this
            var that = this;
            // 执行间隔
            var time = 1000 / fps;
            // 步数
            var step = totalTime / time;
            // 总距离
            var totalGap = Math.abs(target - scrollTop());
            // 距离
            var gap = Math.ceil(totalGap / step);
            // 状态
            if (target > scrollTop()) {
                // 需要前进
                this.status = 1;
            } else if (target < scrollTop()) {
                // 需要后退
                this.status = 2;
            } else {
                // 不用移动
                this.status = 0;
            }

            // 避免最后页面高度不够
            if (this.status === 1) {
                var dH = document.documentElement.scrollHeight || document.body.scrollHeight;
                if ((dH - target) < getViewPortHeight()) {
                    // 减去不够的高度
                    target -= (getViewPortHeight() - (dH - target));
                }
            }

            // 正在运行
            this.dblclick = true;

            // console.log("目标位置：" + target + "\n当前位置：" + scrollTop() + "\n耗时：" + totalTime + "ms\n帧率：" + fps + "\n时间间隙：" + time + "ms\n距离间隙:" + totalGap + "\n步数：" + step + "\n距离：" + gap + "\n状态：" + status);
            // 开始滚动

            this.timer = setInterval(function () {
                // 判断是前进还是后退
                if (that.status == 1) {
                    // 保存当前位置用于打断判断
                    that.oldTarget = scrollTop();
                    scrollTop(scrollTop() + gap);
                } else if (that.status == 2) {
                    that.oldTarget = scrollTop();
                    scrollTop(scrollTop() - gap);
                }
                // 到达目标附近
                if (Math.abs(target - scrollTop()) <= Math.abs(gap)) {
                    // if (target == scrollTop()) {
                    clearInterval(that.timer);
                    // 可以再次触发
                    that.dblclick = false;
                    // 微调
                    if (that.status == 1) {
                        scrollTop(scrollTop() + (target - scrollTop()));
                    } else if (that.status == 2) {
                        scrollTop(scrollTop() - (scrollTop() - target));
                    }
                    // 重置状态
                    that.status = 0;
                }
                // console.log("循环中");
            }, time);
        },
        // 用于打断滚动
        stop: function () {
            // 只有在滚动时才有打断事件
            if (this.status === 1) {
                if (scrollTop() < this.oldTarget) {
                    clearInterval(this.timer)
                    // 重置默认值
                    this.dblclick = false;
                    this.status = 0;
                    console.log("打断1");
                }
            } else if (this.status === 2) {
                if (scrollTop() > this.oldTarget) {
                    clearInterval(this.timer);
                    // 重置默认值
                    this.dblclick = false;
                    this.status = 0;
                    console.log("打断2");
                }
            }
        },
    };
} catch (err) { }

// 创建返回顶部按钮
function createBtn() {
    if (document.getElementById("gotop")) {
        return document.getElementById("gotop");
    }
    var btnBox = document.createElement("button");
    btnBox.setAttribute("id", "gotop");
    btnBox.innerText = "顶部";
    document.body.appendChild(btnBox);
    btnBox.className = "show";
    // 为注册事件
    btnBox.onclick = function () {
        running.goWhere(0);
    }
}

// 为目录和大纲注册事件(事件委托)
if (document.getElementsByClassName("outline-content")[0]) {
    document.getElementsByClassName("outline-content")[0].onclick = function (e) {
        if (e.target.nodeName.toLowerCase() === "a") {
            e.preventDefault();
            var id = e.target.getAttribute("href").substring(1);
            running.goWhere(document.getElementById(id).offsetTop, 600, 60);
        }
    };
}
if (document.getElementsByClassName("md-toc")[0]) {
    document.getElementsByClassName("md-toc")[0].onclick = function (e) {
        if (e.target.nodeName.toLowerCase() === "a") {
            e.preventDefault();
            var id = e.target.getAttribute("href").substring(1);
            running.goWhere(document.getElementById(id).offsetTop,600,60);
        }
    };
}
// 创建按钮
createBtn();
var goTopBtn = createBtn();

window.onscroll = function () {
    // 为全局添加打断滚动事件
    running.stop()
    if (scrollTop() < getViewPortHeight()) {
        goTopBtn.className = "hide"
    } else {
        goTopBtn.className = "show"
    }
}