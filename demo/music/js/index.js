var vm = new Vue({
    el: "#app",
    data: {
        loadShade: true,
        mvShow: false,
        songList: "",
        isPlay: "paused",
        comment: null,
        currentMusicIndex: 0,
        titleMsg: "搜索框输入搜索内容",
        timer: null,
        shade: true,
        mainShow: false,
        mvUrl: "",
        songName: "",
        songsAct: -1,
        // 下载或多选按钮框
        moreBox: false,
        moreBtn: true,
        checkboxBtn: false,
        currentMusic: null,
        downloadMusicList: [],
        errorList: [],
    },
    watch: {
        mvUrl(val) {
            document.getElementById("videoMv").load();
        },
    },
    mounted() {
        this.isPlay = false;
        this.$refs.search.focus();
        var that = this;
        document.body.addEventListener(
            "click",
            function () {
                that.moreBox = false;
            },
            true
        );
        // 配置 baseURL
        axios.defaults.baseURL = "http://localhost:3000/";
    },
    updated() {
        this.loadShade = false;
    },
    methods: {
        search: function (el) {
            this.songsAct = -1;
            this.shade = false;
            this.comment = "";
            this.titleMsg = "正在搜索...";
            document.querySelector(".center_box").className += " hide";
            var val = el.target.value.replace(/\s*/g, "");
            var that = this;
            if (val !== "") {
                axios
                    .get("search?keywords=" + val)
                    .then(function (res) {
                        if (res.status == 200) {
                            that.titleMsg = "";
                            that.songList = res.data.result.songs;
                        } else {
                            that.titleMsg = "获取歌曲列表失败,请重试";
                        }
                    })
                    .catch(function (err) {
                        console.log("搜索失败");
                        that.titleMsg = "请求失败，换一个关键字吧";
                    });
            }
            el.target.value = "";
            el.target.blur();
        },
        openSongs: function (item, index) {
            this.songsAct = -1;
            this.titleMsg = "正在加载音乐..";
            if (this.timer === null) {
                this.timer = setInterval(() => {
                    if (dian == 2) {
                        this.titleMsg = "正在加载音乐...";
                        dian = 3;
                    } else if (dian == 3) {
                        this.titleMsg = "正在加载音乐.";
                        dian = 1;
                    } else {
                        this.titleMsg = "正在加载音乐..";
                        dian = 2;
                    }
                }, 1000);
            }

            this.isPlay = "paused";
            this.currentMusicIndex = index;
            document.querySelector(".audio_box").classList += " hide";
            var that = this;
            var dian = 2;
            document.getElementById("player").pause();
            /*切换唱片图片*/
            axios
                .get("album?id=" + item.album.id)
                .then(function (e) {
                    if (e.data.code == 200) {
                        if (e.data.album.picUrl !== null) {
                            document.querySelector(".cover").src = e.data.album.picUrl;
                        } else {
                            document.querySelector(".cover").src = "image/cover.png";
                        }
                    } else {
                        document.querySelector(".cover").src = "image/cover.png";
                    }
                })
                .catch(function (err) {
                    that.titleMsg = "获取专辑信息错误,请重试";
                    document.querySelector(".cover").src = "image/cover.png";
                });
            /*获取音乐源*/
            axios
                .get("song/url?id=" + item.id)
                .then(function (e) {
                    console.log("song/url?id=" + item.id);
                    console.log(e);
                    if (e.data.code == 200) {
                        if (e.data.data[0].url !== null) {
                            document.getElementById("player").src = e.data.data[0].url;
                            // document.querySelector(".player").src = e.data.data[0].url;
                            that.songName = item.name + "--" + item.artists[0].name;
                            that.songsAct = index;
                        } else {
                            clearInterval(that.timer);
                            that.titleMsg = "音乐播放源为获取失败";
                            vm.musicEnd();
                        }
                    } else {
                        that.titleMsg = "获取音乐失败";
                        // vm.musicEnd();
                    }
                })
                .catch(function (err) {
                    clearInterval(that.timer);
                    that.titleMsg = "获取音乐错误,请重试";
                    vm.musicEnd();
                });

            /*获取评论*/
            axios
                .get("comment/hot?type=0&id=" + item.id)
                .then(function (e) {
                    if (e.data.code == 200) {
                        that.comment = e.data.hotComments;
                    } else {
                        that.comment = null;
                    }
                })
                .catch(function (err) {
                    that.titleMsg = "获取评论信息错误,请重试";
                    that.comment = null;
                });
        },
        playing: function (status) {
            if (status) {
                this.isPlay = "running";
            } else {
                this.isPlay = "paused";
            }
        },
        musicEnd: function () {
            this.songsAct = -1;
            this.songName = null;
            clearInterval(this.timer);
            this.isPlay = "paused";
            var that = this;
            if (this.currentMusicIndex < this.songList.length - 1) {
                that.titleMsg = "播放完毕,正在播放下一首";
                this.comment = "";
                this.currentMusicIndex += 1;
                this.songName =
                    this.songList[this.currentMusicIndex].name +
                    "--" +
                    this.songList[this.currentMusicIndex].artists[0].name;

                axios
                    .get("song/url?id=" + this.songList[this.currentMusicIndex].id)
                    .then(function (e) {
                        if (e.data.code == 200) {
                            if (e.data.data[0].url !== null) {
                                document.getElementById("player").src = e.data.data[0].url;
                                that.songsAct = that.currentMusicIndex;
                            } else {
                                clearInterval(that.timer);
                                that.titleMsg = "音乐播放源为获取失败";
                                vm.musicEnd();
                            }
                        } else {
                            vm.musicEnd();
                        }
                    })
                    .catch(function (err) {
                        that.titleMsg = "获取音乐信息错误,请重试";
                        vm.musicEnd();
                    });
                axios
                    .get(
                        "comment/hot?type=0&id=" + this.songList[this.currentMusicIndex].id
                    )
                    .then(function (e) {
                        if (e.data.code == 200) {
                            if (e.data.hotComments != null) {
                                that.comment = e.data.hotComments;
                            } else {
                                that.comment = null;
                            }
                        } else {
                            console.log("获取评论失败");
                            that.comment = null;
                        }
                    })
                    .catch(function (err) {
                        that.titleMsg = "获取评论信息错误,请重试";
                        that.comment = null;
                        console.log("获取评论信息错误");
                    });
                axios
                    .get("album?id=" + this.songList[this.currentMusicIndex].album.id)
                    .then(function (e) {
                        if (e.data.code == 200) {
                            if (e.data.album.picUrl != null) {
                                document.querySelector(".cover").src = e.data.album.picUrl;
                            } else {
                                document.querySelector(".cover").src = "image/cover.png";
                            }
                        } else {
                            document.querySelector(".cover").src = "image/cover.png";
                        }
                    })
                    .catch(function (err) {
                        that.titleMsg = "获取专辑信息错误,请重试";
                        document.querySelector(".cover").src = "image/cover.png";
                    });
            } else {
                this.songsAct = -1;
                this.titleMsg = "列表播放完毕";
                this.currentMusicIndex = 0;
                this.songName = "";
            }
        },
        musicReady: function () {
            this.titleMsg = "音乐加载完毕";
            clearInterval(this.timer);
            var that = this;
            setTimeout(function () {
                that.titleMsg = "";
            }, 500);
            document.getElementById("player").play();
            this.isPlay = "running";
        },
        imgError: function (el) {
            //处理失效头像
            var errorImg = el.target;
            var parent = errorImg.parentNode;
            parent.removeChild(errorImg);

            var node = document.createElement("img");
            node.src = "image/userdefault.jpg";
            node.className = "userImageDfault";
            parent.appendChild(node);
        },
        playMv: function (mvid) {
            var that = this;
            this.mvShow = true;
            this.mainShow = true;
            document.getElementById("player").pause();

            axios
                .get("mv/url?id=" + mvid)
                .then(function (e) {
                    if (e.data.code == 200) {
                        that.mvUrl = e.data.data.url;
                    }
                })
                .catch(function (err) {
                    this.titleMsg = "视频信息失败";
                });
        },
        closeMv: function () {
            this.mvShow = false;
            this.mainShow = false;
            this.isPlay = "paused";
            setTimeout(function () {
                document.getElementById("player").play();
            }, 800);
        },
        more: function (currentItem, el) {
            this.downloadMusicList = [];
            this.downloadMusicList.push(currentItem);
            this.currentMusic = currentItem;
            var moreBox = document.querySelector(".moreBox");
            this.moreBox = !this.moreBox;
            moreBox.style.left = el.pageX - 90 + "px";
            moreBox.style.top = el.pageY + "px";
        },
        downloadSong: function () {
            this.moreBtn = true;
            this.checkboxBtn = false;
            this.titleMsg = "正在尝试下载";
            setTimeout(function () {
                that.titleMsg = "";
            }, 800);
            var that = this;
            for (let i = 0; i < this.downloadMusicList.length; i++) {
                var url = "song/url?id=" + this.downloadMusicList[i].id;
                // var name = "text/plain";
                // var realName = "";
                get(i, this.downloadMusicList.length); //创建作用域三来作用于for顺序异步
            }
            /*创建兼容url地址*/
            function createObjectURL(file) {
                if (window.webkitURL) {
                    return window.webkitURL.createObjectURL(file);
                } else if (window.URL && window.URL.createObjectURL) {
                    return window.URL.createObjectURL(file);
                } else {
                    return null;
                }
            }
            /*定义下载方法*/
            function get(i, leng) {
                /*下载*/
                axios
                    .get(url)
                    .then(function (e) {
                        /*文件名称*/
                        var filename =
                            that.downloadMusicList[i].name +
                            "--" +
                            that.downloadMusicList[i].artists[0].name;
                        if (e.data.data[0].url != null) {
                            axios
                                .get(e.data.data[0].url, {
                                    responseType: "arraybuffer",
                                })
                                .then(function (musicdata) {
                                    var data = new Blob([musicdata.data], {
                                        type: "audio/mpeg",
                                    });
                                    var audioName = filename + ".mp3";
                                    that.titleMsg = "正在下载中...";
                                    setTimeout(function () {
                                        that.titleMsg = "";
                                    }, 1000);
                                    var downloadUrl = createObjectURL(data);
                                    var anchor = document.createElement("a");
                                    anchor.href = downloadUrl;
                                    anchor.download = audioName;
                                    anchor.click();
                                    window.URL.revokeObjectURL(data);
                                })
                                .catch(function (err) {
                                    console.log(err);
                                });
                        } else {
                            that.errorList.push(filename);
                        }
                    })
                    .catch(function (error) {
                        alert("出现了一个错误，因为接口资源来自https，可能无法下载");
                        console.log(error);
                    });
            }
        },
        checkboxDown: function () {
            this.moreBtn = false;
            this.checkboxBtn = true;
        },
    },
});
