// 创建背景
// 创建事件 取消右键事件 右键标记
// 随机生成炸弹  空白一片等
// 触发事件 爆炸
// "use strict";
var vm = new Vue({
    el: "#app ",
    data: {
        list: [], // 总内容
        diff: "low", // 游戏难度
        timer: null, // 计时器
        time: false, // 游戏时长
        titleMsg: "点击方块开始游戏", //头部提示信息
        checkCount: 0,
        showBomb: false, // 显示炸弹图片
        allBomb: [], // 全部炸弹位置
        isover: false, // 游戏是否结束
        step: 0, // 统计步长
        openPie: 0, // 格子
        openMark: false, // 标记炸弹
        markCount: 0, // 提示炸弹次数
        markList: [], // 九方格信息
        openTips: false, // 框
        recordList: [], // 成绩记录
        mainBgColor: 0, // 背景颜色
        boxWidth: 380, // 固定背景宽度
    },
    created: function() {
        this.play(9, 9, 10);
    },
    watch: {
        // 难度选择
        diff: function(val) {
            switch (val) {
                case "low":
                    this.play(9, 9, 10);
                    this.markCount = 0;
                    this.boxWidth = 380;
                    break;
                case "middle":
                    this.play(16, 16, 40);
                    this.markCount = 1;
                    this.boxWidth = 590;
                    break;
                case "height":
                    this.play(16, 30, 99);
                    this.markCount = 3;
                    this.boxWidth = 1010;
                    break;
                case "customize":
                    // 行:x 列:y
                    let y;
                    let x;
                    let count;
                    y = Number(prompt("请输入宽(9-30)"));
                    x = Number(prompt("请输入高(9-24)"));
                    count = Number(prompt("请输入雷的数量(10-200)"));

                    if (!(x >= 9 && x <= 24)) {
                        x = 9;
                    }
                    if (!(y >= 9 && y <= 30)) {
                        y = 9;
                    }
                    if (!(count >= 10 && x <= 200)) {
                        count = 10;
                    }

                    if ((count / (x * y)) * 100 > 30) {
                        // alert("雷都超过三分之一了怎么玩")
                        count = Math.floor(x * y * 0.3);
                        alert("已将雷的数量设置为:" + count);
                    }

                    this.play(x, y, count);

                    // 设置固定宽度
                    this.boxWidth = y * 30 + 110;
                    break;
            }
        },
        step: function(val) {
            var stepBox = document.querySelector(".step");
            if (!this.isIE()) {
                if (val <= 9) {
                    stepBox.innerText = "00" + val;
                } else if (val <= 99) {
                    stepBox.innerText = "0" + val;
                } else if (val <= 999) {
                    stepBox.innerText = val;
                } else {
                    stepBox.innerText = 999;
                }
            } else {
                if (val <= 9) {
                    stepBox.textContent = "00" + val;
                } else if (val <= 99) {
                    stepBox.textContent = "0" + val;
                } else if (val <= 999) {
                    stepBox.textContent = val;
                } else {
                    stepBox.textContent = 999;
                }
            }
        },
        // 修改body颜色
        mainBgColor: function(v) {
            v = v / 100;
            document.body.style.backgroundColor = "rgba(0,0,0," + v + ")";
        },
        openTips: function(s) {
            if (this.openTips) this.openMark = false;
        },
        openMark: function(v) {
            if (this.openMark) {
                this.openTips = false;
                this.titleMsg = "点击任意方块检测地雷！";
            } else {
                this.titleMsg = "-";
            }
        },
    },
    methods: {
        /*游戏*/
        play: function(x, y, count) {
            /*还原默认操作*/
            this.openPie = 0;
            this.list = [];
            this.allBomb = [];
            this.time = false;
            this.isover = false;
            this.titleMsg = "点击方块开始游戏";
            document.querySelector(".time").innerText = "000";
            var resetBox = document.querySelector(".reset");
            resetBox.style.background = "url(img/joy.png) #ccc no-repeat center";
            resetBox.style.backgroundSize = "90%";
            clearInterval(this.timer);
            /*创建背景和炸弹*/
            this.list = this.createBg(x, y);
            this.createBomb(count, x, y);
        },
        /*左键打开*/
        confirm: function(el, x, y) {
            // 是否打开检测
            if (this.openMark) {
                if (!this.list[x][y].hide) {
                    // 区域内所有地雷
                    let arr = [];
                    // console.log(this.markList);
                    for (let i = 1; i < this.markList.length; i++) {
                        if (this.list[this.markList[i][0]][this.markList[i][1]].bomb) {
                            arr.push([this.markList[i][0], this.markList[i][1]]);
                        }
                    }

                    if (arr.length !== 0) {
                        // console.log("有地雷");
                        // 随机值
                        function randomNum(min, max) {
                            var range = max - min;
                            var rand = Math.random();
                            var num = min + Math.round(rand * range);
                            return num;
                        }
                        // console.log(arr);

                        //　去除已经标记的雷
                        var bomb = arr.filter((x) => {
                            return this.list[x[0]][x[1]].tab !== 1;
                        });
                        // 随机标记一个地雷
                        if (bomb.length !== 0) {
                            let rand = randomNum(0, bomb.length - 1);
                            this.list[bomb[rand][0]][bomb[rand][1]].tab = 1;
                        }
                        // 次数减一
                        this.markCount--;
                        this.mark(el);
                    } else {
                        // console.log("没有地雷");
                        // 次数减一
                        this.markCount--;
                        this.mark(el);
                    }
                    // 关闭
                    this.openMark = false;
                    return;
                }
            }
            // 标记点不能打开
            if (this.list[x][y].tab === 1) {
                return;
            }
            // 开始计时
            if (!this.time) {
                // 为避免第一个是炸弹而导致计时器不能停止
                if (!this.list[x][y].bomb) {
                    this.startTime();
                    this.titleMsg = "-";
                }
            }
            /*游戏是否已经结束*/
            if (this.isover) {
                return;
            }
            /*检查打开是否是炸弹*/
            this.check(el, x, y);
            if (this.timer == null) {
                this.titleMsg = "游戏开始";
            }
        },
        /*右键标记*/
        tab: function(ev, index, cou) {
            var even = ev || window.event;
            // 开始计时
            if (!this.time) {
                this.startTime();
            }
            /*游戏是否已结束*/
            if (this.isover) {
                return;
            }
            /*清除默认事件*/
            even.returnValue = false;
            even.cancelBubble = true;
            even.preventDefault();
            // 方块是否已打开
            if (this.list[index][cou].hide) {
                return;
            }
            var that = this;
            /*判断步数*/
            if (this.step > 0) {
                if (this.list[index][cou].tab < 2) {
                    this.list[index][cou].tab++;
                } else {
                    this.list[index][cou].tab = 0;
                }
                if (this.list[index][cou].tab == 1) {
                    this.step--;
                } else if (this.list[index][cou].tab == 2) {
                    this.step++;
                }
            } else {
                if (this.list[index][cou].tab == 1) {
                    this.list[index][cou].tab++;
                    this.step++;
                } else if (this.list[index][cou].tab == 2) {
                    this.list[index][cou].tab = 0;
                }
            }
            return false;
        },
        // 统计游戏时长
        startTime: function(x) {
            // x=1 获取时间
            var timeBox = document.querySelector(".time");
            // 获取时间
            if (x === 1) {
                return timeBox.innerText;
            }
            var that = this;
            var time = 0;
            this.time = true;
            this.timer = setInterval(function() {
                if (time < 9) {
                    timeBox.innerText = "00" + ++time;
                } else if (time < 99) {
                    timeBox.innerText = "0" + ++time;
                } else if (time < 999) {
                    timeBox.innerText = time++;
                } else {
                    that.gameover();
                }
            }, 1000);
        },
        /*创建背景*/
        createBg: function(x, y) {
            // 渲染成绩记录
            if (window.localStorage.getItem("record")) {
                // 获取本地记录
                this.recordList = JSON.parse(window.localStorage.getItem("record"));
                // 冒泡排序
                var compare = function(arr) {
                    for (let i = 0; i < arr.length - 1; i++) {
                        for (let j = 0; j < arr.length - 1 - i; j++) {
                            if (arr[j][0] > arr[j + 1][0]) {
                                let tmp = arr[j];
                                arr[j] = arr[j + 1];
                                arr[j + 1] = tmp;
                            }
                        }
                    }
                };
                // 缓存格式改变
                // if (this.recordList.length !== 0) {
                //     if (!Array.isArray(this.recordList[this.diff][0])) {
                //         let m = this.recordList[this.diff].map((x) => {
                //             return [x, 0];
                //         });
                //         this.recordList[this.diff] = m;
                //         window.localStorage.setItem(
                //             "record",
                //             JSON.stringify(this.recordList)
                //         );
                //     }
                // }
                // 排序+裁剪
                compare(this.recordList[this.diff]);
                this.recordList = this.recordList[this.diff].splice(0, 10);
            } else {
                this.recordList = [];
                let record = {
                    low: [],
                    middle: [],
                    height: [],
                    customize: [],
                };
                // 创建
                window.localStorage.setItem("record", JSON.stringify(record));
            }
            // 渲染格子
            var list = [];
            for (let i = 0; i < x; i++) {
                list.push([]);
                for (let j = 0; j < y; j++) {
                    // 格子信息
                    let person = {
                        key: j,
                        tab: 0, //是标记还是问号
                        bomb: false, //是否是炸弹
                        // count: 0,
                        hide: false, //方块是否打开
                        showBomb: false, //是否显示炸弹图片
                        bombCount: 0, //周围炸弹数量
                        color: "",
                        bgColor: "",
                        one: false, //是否是第一个炸弹
                        borderL: false, //tips框
                        borderT: false, //tips框
                        borderR: false, //tips框
                        borderB: false, //tips框
                        mark: false,
                    };
                    list[i].push(person);
                    this.openPie++; //统计方块数
                }
            }
            var box = document.querySelector(".main");
            box.style.width = 30 * y + 10 + "px";
            return list;
        },
        /*创建炸弹*/
        createBomb: function(bombCou, x, y) {
            this.step = bombCou;
            var that = this;
            /*c创建随机值*/
            function randomNum(min, max) {
                var range = max - min;
                var rand = Math.random();
                var num = min + Math.round(rand * range);
                return num;
            }
            /*随机坐标*/
            function randomCoord() {
                var xx = randomNum(0, x - 1);
                var yy = randomNum(0, y - 1);
                if (that.list[xx][yy].bomb == false) {
                    that.list[xx][yy].bomb = true;
                    that.list[xx][yy].bombCount = "";
                    that.allBomb.push([xx, yy]);
                } else {
                    randomCoord();
                }
            }

            for (let i = 0; i < bombCou; i++) {
                randomCoord();
            }
        },
        /*检查是否是炸弹*/
        check: function(el, x, y) {
            var that = this;
            /*是炸弹游戏结束*/
            if (that.list[x][y].bomb) {
                that.list[x][y].showBomb = true;
                that.list[x][y].one = true;
                this.gameover();
                this.titleMsg = "游戏结束！";
            } else {
                /*不是炸弹检查周围炸弹数量*/
                this.checkRangeBomb(x, y);
            }
        },
        /*检查周围炸弹数量*/
        checkRangeBomb: function(x, y) {
            /*如果改位置已打开则不检测*/
            if (this.list[x][y].hide) {
                return false;
            }
            /*打开和统计已开数量*/
            this.list[x][y].hide = true;
            this.openPie--;
            if (this.list[x][y].tab == 1) {
                this.step++;
            }
            var bombCount = 0;
            var _x = x - 1;
            var _y = y - 1;
            /*边界处理*/
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    /* 
                                           _x+i=-1,_y>this.list[].length 为边界值超出
                                           思路 (_x)(_y)用于循环判断当前坐标，需要判断的值为鼠标点击中间点周围9个格子也就是中间点-1(左上)和+1(右下)的坐标
                                           _x 保存的是x坐标减1，如果我们点击的是0行_X保存的则是-1行，这就意味着超出左侧和上面边界值，
                                           i 循环值为 0 1 2，假如_x为-1;第一轮:-1+i(0)=-1(边界值)直接跳过，第二轮也就是中心的那一行
                                         */
                    if (
                        _x + i != -1 &&
                        _y + j != -1 &&
                        _x + i < this.list.length &&
                        _y + j < this.list[0].length
                    ) {
                        if (this.list[_x + i][_y + j].bomb == true) {
                            bombCount++;
                        }
                    }
                }
            }
            /*如果周围有炸弹则标记数量*/
            if (bombCount != 0) {
                this.list[x][y].bombCount = bombCount;
                this.color(bombCount, x, y); //显示颜色
            } else {
                /*没有炸弹则找相连的空白*/
                this.list[x][y].bombCount = "";
                this.checkGap(x, y);
            }
            /*判断游戏胜利*/
            if (this.openPie - this.allBomb.length == 0) {
                this.gameover(true);
                let resetBox = document.querySelector(".reset");
                resetBox.style.background = "url(img/win.png) #ccc no-repeat center";
                resetBox.style.backgroundSize = "90%";
                this.titleMsg = "你胜利了!";

                // 成绩记录
                // 获取时间
                let currentTime = Number(this.startTime(1));
                // 判断是否存在
                if (window.localStorage.getItem("record")) {
                    // console.log("有记录");
                    let recordObj = JSON.parse(window.localStorage.getItem("record"));
                    switch (this.diff) {
                        case "low":
                            recordObj.low.push([currentTime, 0]);
                            break;
                        case "middle":
                            if (this.markCount !== 1) {
                                recordObj.middle.push([currentTime, 1]);
                            } else {
                                recordObj.middle.push([currentTime, 0]);
                            }
                            break;
                        case "height":
                            if (this.markCount !== 3) {
                                recordObj.height.push([currentTime, 1]);
                            } else {
                                recordObj.height.push([currentTime, 0]);
                            }
                            break;
                    }
                    // 自定义没有算入其中
                    // 写入
                    window.localStorage.setItem("record", JSON.stringify(recordObj));
                } else {
                    // console.log("没有记录");
                    alert("本次存储记录失败！");
                }
            }
            return true;
        },
        /*匹配周围空白*/
        checkGap: function(x, y) {
            var _x = x - 1;
            var _y = y - 1;
            /*以打开空白位置周围9个再一次检查*/
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    if (
                        _x + i != -1 &&
                        _y + j != -1 &&
                        _x + i < this.list.length &&
                        _y + j < this.list[0].length
                    ) {
                        /*已打开则跳过*/
                        if (!this.checkRangeBomb(_x + i, _y + j)) {
                            continue;
                        }
                    }
                }
            }
        },
        /*游戏结束移除事件*/
        gameover: function(result) {
            this.isover = true;
            var resetBox = document.querySelector(".reset");
            resetBox.style.background = "url(img/sorrow.png) #ccc no-repeat center";
            resetBox.style.backgroundSize = "90%";
            if (this.time) {
                clearInterval(this.timer);
            }
            /*打开所有炸弹*/
            for (let i = 0; i < this.allBomb.length; i++) {
                this.list[this.allBomb[i][0]][this.allBomb[i][1]].hide = true;
                this.list[this.allBomb[i][0]][this.allBomb[i][1]].showBomb = true;
                if (result) {
                    this.list[this.allBomb[i][0]][this.allBomb[i][1]].bgColor =
                        "rgb(128,255,128)";
                }
            }
        },
        /*重新开始游戏*/
        reset: function() {
            // location.reload();
            clearInterval(this.timer);
            switch (this.diff) {
                case "low":
                    this.play(9, 9, 10);
                    this.markCount = 0;
                    break;
                case "middle":
                    this.play(16, 16, 40);
                    this.markCount = 1;
                    break;
                case "height":
                    this.play(16, 30, 99);
                    this.markCount = 3;
                    break;
                case "customize":
                    this.play(this.list.length, this.list[0].length, this.allBomb.length);
                    break;
                default:
                    break;
            }
        },
        //显示对应颜色字体
        color: function(color, x, y) {
            var box = this.list[x][y];
            switch (color) {
                case 1:
                    box.color = "#0000ff";
                    break;
                case 2:
                    box.color = "#008100";
                    break;
                case 3:
                    box.color = "#f42020";
                    break;
                case 4:
                    box.color = "#1b1b89";
                    break;
                case 5:
                    box.color = "#810303";
                    break;
                case 6:
                    box.color = "#018080";
                    break;
                case 7:
                    box.color = "#000000";
                    break;
                case 8:
                    box.color = "#808080";
                    break;
            }
        },
        // 判断是否是ie兼容字体
        isIE: function() {
            if (!!window.ActiveXObject || "ActiveXObject" in window) {
                return true;
            } else {
                return false;
            }
        },
        pieHover: function(el, s) {
            var el = el.target;
            if (el.nodeName.toLocaleLowerCase() === "li") {
                var x = Number(el.getAttribute("x"));
                var y = Number(el.getAttribute("y"));
                // 用于计算周围格子
                var _x = x - 1;
                var _y = y - 1;
                var pieList = [];
                // 第一个为九宫格中心点
                pieList.push([x, y]);
                for (let i = 0; i < 3; i++) {
                    for (let j = 0; j < 3; j++) {
                        if (
                            _x + i != -1 &&
                            _y + j != -1 &&
                            _x + i < this.list.length &&
                            _y + j < this.list[0].length
                        ) {
                            // console.log((_x + i), (_y + j));
                            pieList.push([_x + i, _y + j]);
                        }
                    }
                }
                this.markList = pieList;

                // console.log(this.markList);
                if (this.openTips || this.openMark) {
                    if (this.openTips) {
                        this.tips(el, s);
                    } else {
                        // this.mark(pieList, s)
                        if (s) {
                            for (let i = 1; i < pieList.length; i++) {
                                // console.log(pieList[i]);
                                this.list[pieList[i][0]][pieList[i][1]].mark = true;
                            }
                        } else {
                            for (let i = 1; i < pieList.length; i++) {
                                // console.log(pieList[i]);
                                this.list[pieList[i][0]][pieList[i][1]].mark = false;
                            }
                        }
                    }
                }
            }
        },
        // 九宫格提示框
        tips: function(el, s) {
            var that = this;
            if (el.nodeName.toLocaleLowerCase() === "li") {
                var x = Number(el.getAttribute("x"));
                var y = Number(el.getAttribute("y"));
                // 用于计算周围格子
                var _x = x - 1;
                var _y = y - 1;

                // console.clear()
                // console.log(x, y);
                // 1为添加 0为删除
                if (s === 1) {
                    for (let i = 0; i < 3; i++) {
                        for (let j = 0; j < 3; j++) {
                            if (
                                _x + i != -1 &&
                                _y + j != -1 &&
                                _x + i < this.list.length &&
                                _y + j < this.list[0].length
                            ) {
                                switch (i) {
                                    case 0:
                                        // console.log("top:" + (_x + i), (_y + j))
                                        that.list[_x + i][_y + j].borderT = true;
                                        if (_y + j === y - 1) {
                                            that.list[_x + i][_y + j].borderL = true;
                                        } else if (_y + j === y + 1) {
                                            that.list[_x + i][_y + j].borderR = true;
                                        }
                                        break;
                                    case 1:
                                        // console.log("conter:" + (_x + i), (_y + j))
                                        if (_y + j === y - 1) {
                                            that.list[_x + i][_y + j].borderL = true;
                                        } else if (_y + j === y + 1) {
                                            that.list[_x + i][_y + j].borderR = true;
                                        }
                                        break;
                                    case 2:
                                        // console.log("bottom:" + (_x + i), (_y + j))
                                        that.list[_x + i][_y + j].borderB = true;
                                        if (_y + j === y - 1) {
                                            that.list[_x + i][_y + j].borderL = true;
                                        } else if (_y + j === y + 1) {
                                            that.list[_x + i][_y + j].borderR = true;
                                        }
                                        break;
                                }
                            }
                        }
                    }
                } else {
                    for (let i = 0; i < 3; i++) {
                        for (let j = 0; j < 3; j++) {
                            if (
                                _x + i != -1 &&
                                _y + j != -1 &&
                                _x + i < this.list.length &&
                                _y + j < this.list[0].length
                            ) {
                                switch (i) {
                                    case 0:
                                        // console.log("top:" + (_x + i), (_y + j))
                                        that.list[_x + i][_y + j].borderT = false;
                                        if (_y + j === y - 1) {
                                            that.list[_x + i][_y + j].borderL = false;
                                        } else if (_y + j === y + 1) {
                                            that.list[_x + i][_y + j].borderR = false;
                                        }
                                        break;
                                    case 1:
                                        // console.log("conter:" + (_x + i), (_y + j))
                                        if (_y + j === y - 1) {
                                            that.list[_x + i][_y + j].borderL = false;
                                        } else if (_y + j === y + 1) {
                                            that.list[_x + i][_y + j].borderR = false;
                                        }
                                        break;
                                    case 2:
                                        // console.log("bottom:" + (_x + i), (_y + j))
                                        that.list[_x + i][_y + j].borderB = false;
                                        if (_y + j === y - 1) {
                                            that.list[_x + i][_y + j].borderL = false;
                                        } else if (_y + j === y + 1) {
                                            that.list[_x + i][_y + j].borderR = false;
                                        }
                                        break;
                                }
                            }
                        }
                    }
                }
            }
        },
        // 提示地雷
        mark: function(el, arr) {
            var el = el.target;

            var x = Number(el.getAttribute("x"));
            var y = Number(el.getAttribute("y"));
            // 用于计算周围格子
            var _x = x - 1;
            var _y = y - 1;
            var pieList = [];
            // 第一个为九宫格中心点
            pieList.push([x, y]);
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    if (
                        _x + i != -1 &&
                        _y + j != -1 &&
                        _x + i < this.list.length &&
                        _y + j < this.list[0].length
                    ) {
                        // console.log((_x + i), (_y + j));
                        pieList.push([_x + i, _y + j]);
                    }
                }
            }
            this.markList = pieList;
            for (let i = 1; i < pieList.length; i++) {
                // console.log(pieList[i]);
                this.list[pieList[i][0]][pieList[i][1]].mark = false;
            }
        },
    },
});