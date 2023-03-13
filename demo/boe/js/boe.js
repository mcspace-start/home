/*微信 微博 图片变色*/
function img_show(img) {
    img.src = "img/" + img.className + "02.png";
}

function img_none(img) {
    img.src = "img/" + img.className + "01.png";
}
/*gotop*/
window.onload = function () {


    /*banner img切换 */
    var bannerImg = document.getElementById('banner_img');
    var banner_li1 = document.getElementById('banner_li1');
    var banner_li2 = document.getElementById('banner_li2');
    var banner_li3 = document.getElementById('banner_li3');
    banner_li1.onclick = function () {
        bannerImg.src = "img/banner1.jpg";
        banner_li1.className = "fn";
        banner_li2.className = "fa";
        banner_li3.className = "fa";
    }
    banner_li2.onclick = function () {
        bannerImg.src = "img/banner2.jpg";
        banner_li1.className = "fa";
        banner_li2.className = "fn";
        banner_li3.className = "fa";
    }
    banner_li3.onclick = function () {
        bannerImg.src = "img/banner3.jpg";
        banner_li1.className = "fa";
        banner_li2.className = "fa";
        banner_li3.className = "fn";
    }

    /*weixin weibo yl*/
    var oWeixin = document.getElementById('footer_top_i_span_l');
    var oWeibo = document.getElementById('footer_top_i_span_c')
    var oYl = document.getElementById('footer_top_i_span_r');
    var oWeixin_ewm = document.getElementById('weixin_ewm');
    var oWeibo_ewm = document.getElementById('weibo_ewm');
    var oYl_ewm = document.getElementById('yl_ewm');
    oWeixin.onmousemove = function () {
        oWeixin_ewm.style.display = "block";
    }
    oWeixin.onmouseout = function () {
        oWeixin_ewm.style.display = "none";
    }
    oWeibo.onmousemove = function () {
        oWeibo_ewm.style.display = "block";
    }
    oWeibo.onmouseout = function () {
        oWeibo_ewm.style.display = "none";
    }
    oYl.onmousemove = function () {
        oYl_ewm.style.display = "block";
    }
    oYl.onmouseout = function () {
        oYl_ewm.style.display = "none";
    }

    /*返回顶部*/
    var product = document.getElementById('product');
    var new_view = document.getElementById('new_view');
    var goTop = document.getElementById('gotop_a');
    var footer = document.getElementById('footer');
    var news = document.getElementById('news');
    new_view.onmousemove = function () {
        goTop.style.display = "block";

    }
    news.onmousemove = function () {
        goTop.style.display = "block";

    }
    footer.onmousemove = function () {
        goTop.style.display = "block";
    }
    product.onmousemove = function () {
        goTop.style.display = "none";
    }
    goTop.onclick = function () {
        goTop.style.display = "none";
    }

}