# js三种本地存储方式

## sessionStorage

> 以键值对方式**临时保存**同一窗口(或标签页)的数据，在关闭窗口或标签页之后将会删除这些数据，最多保存**5M**数据。

| 属性   | 描述 |
| ------ | ---- |
| length | 长度 |

| 方法             | 描述                             |
| ---------------- | -------------------------------- |
| setItem(key,val) | 写入一个值，将value存储到key字段 |
| getItem(key)     | 读取一个值                       |
| removeItem(key)  | 删除一个字段                     |
| clear()          | 清空所有的sessionStorage字段     |

```js
window.sessionStorage.setItem("msg", "你好世界！")
window.sessionStorage.setItem("say", "hello！")
window.sessionStorage.setItem("name", "window！")
var str = window.sessionStorage.getItem('msg')
console.log(str);
window.sessionStorage.removeItem('say')
window.sessionStorage.clear()
console.log(window.sessionStorage);
```

## localStorage

> localStorage会可以将第一次请求的数据直接存储到本地，相当于一个**5M**大小的针对于前端页面的数据库
>
> 在**IE8**以上的IE版本才支持localStorage这个属性。localStorage属于**永久性存储**，即使页面关闭后还是会保存在本地，下次打开时一样可以读取

| 方法             | 描述       |
| ---------------- | ---------- |
| setItem(key,val) | 写入一个值 |
| getItem(key)     | 读取一个值 |
| removeItem(key)  | 删除一个值 |
| clear()          | 删除所有值 |

```vue
<!-- html -->
<button onclick="add()">添加</button>
<!-- js -->
<script>
function add() {
    window.localStorage.setItem("msg", "你好世界！")
    window.sessionStorage.setItem('say', "hello!")
}
console.log(window.localStorage);
console.log(window.sessionStorage);
</script>
```

**localStorage储存json**

```js
 var data = {
    id: "001",
    name: "zhangsan",
    age: "19",
};
//封装成字符串
var str = JSON.stringify(data);
//储存本地
window.localStorage.setItem("data", str);
//拆解为json
var val = JSON.parse(window.localStorage.getItem("data"));
console.log(val);
```

## cookie

> cookie必须处于服务器端程序才可以设置，cookie会保留在计算机中，到指定时间时作废。
>
> cookie最大数为每个域名**50**个cookie，不同的浏览器略有不同，建议不要超过20个
>
> 如果不为cookie设置时间，则网页关闭后移除。

| 方法            | 描述             |
| --------------- | ---------------- |
| document.cookie | 设置/读取 cookie |

### 设置cookie

```js
document.cookie = "user=admin"
//没有设置时间，cookie将在会话结束时移除
```

> cookie一次只能设置一个不可以多个
>
> 为cookie设置失效时间，关键字 `expires`

```js
document.cookie = "user=zhang;expires=" + date.toUTCString();
```

> 为cookie设置时间时需在键值对后面加个关键字`expires`在跟上时间，中间以`;`分号分隔

```js
var date = new Date()  //获取时间对象
date.setTime(date.getTime() + 24*60*60*1000*7)  //设置失效时间,7天后失效
//24*60*60*1000 为 24时60分60秒1000毫秒 加起来刚好一天再乘以7
document.cookie = "user=admin;expires=" + date.toUTCString() //字符拼接
//date.toUTCString 是将时区转换为世界时
```

> 由于时区问题需要将时区转换一下 `date.toUTCString()`

### 设置时间(max-age)

> 除了`expires`可以设置失效时间之外还有`max-age`属性
>
> max-age用来设置失效时间
>
> * 正数
>
>   如果maxAge属性为正数，则表示该Cookie会在**maxAge秒之后自动失效**。浏览器会将maxAge为                                   正数的Cookie持久化，即写到对应的Cookie文件中。
>
> * 负数
>
>   如果maxAge为负数，则表示该Cookie仅在本浏览器窗口以及本窗口打开的子窗口内有效，关**闭窗口后该Cookie即失效**。maxAge为负 数的Cookie，为临时性Cookie，不会被持久化，不会被写到Cookie文件中。
>
> * 0
>
>   如果maxAge为0，则表示**删除该Cookie**。Cookie机制没有提供删除Cookie的方法，因此通过设置该Cookie即时失效实现删除Cookie的效果。失效的Cookie会被浏览器从Cookie文件或者内存中删除 。
>
> 如果maxAge属性为正数，则表示该Cookie会在maxAge秒之后自动失效。

```js
 document.cookie = "user=admin;max-age=60";  //60秒后失效
```

> 注意：修改、删除 Cookie 时，新建的 Cookie 除 value、maxAge之外的所有属性，例如 name、path、domain等，都要与原Cookie完全一样。否则，浏览器将视为两个不同的Cookie不予覆盖，导致修改、删除失败。
>
> ==从客户端读取Cookie时，包括maxAge在内的其他属性都是不可读的，也不会被提交，只能读取name和vale 。==

### 设置路径(path)

> 为cookie设置路径，只有在指定路径及子级下才可以读取cookie
>
> 添加关键字`path`

```js
document.cookie = "user=admin;path=/;expires=" + date.toUTCString();
//根目录 / 所有路径下都可以读取这个cookie
document.cookie = "user=admin;path=/child;expires=" + date.toUTCString();
//设置了路径 path=/child
//只有在/child下的路径才可以读取，像/child/list这样的子级下也可以读取
```

### 设置域(domain)

> cookie虽然是由一个网页所创建，但并不只是创建cookie的网页才能读 取该cookie。
>
> 在默认情况下，只有和设置cookie的网页在同一个Web服务器的网页才能访问该网页创建的cookie。
>
> 但可以通过domain参数来实现对其 的控制，其语法格式如下：

```js
document.cookie="name=value; domain=cookieDomain";
```

> 例如 "www\.baidu.com" 与 "mp3.baidu.com" 公用一个关联的域名"baidu.com"，我们如果想让 "www\.baidu.com" 下的cookie被 "mp3.baidu.com" 访问，我们就需要用到 cookie 的domain属性，并且需要把path属性设置为 "/"

```js
document.cookie = "user=admin; path=/; domain=baidu.com"
```

### 设置Secure

> Secure属性是说如果一个cookie被设置了Secure=true，那么这个cookie只能用https协议发送给服务器，用http协议是不发送的。

```js
document.cookie = "user=admin;max-age=20;secure=true";
```

### 设置HttpOnly

> 设置HttpOnly为true后客户端是不可以读取cookie只有服务器端才可以读取该cookie

### 封装方法

> 以下是一些已经封装好的 写/读/删 方法

```js
//setCookie
function setCookie(name, value,days) {
    var exp = new Date();
    exp.setTime(exp.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie =
      name + "=" + escape(value) + ";expires=" + exp.toGMTString();
    //  escape,encodeURI,encodeURIComponent
}
//getCookie
function getCookie(name) {
    var arr,
      reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if ((arr = document.cookie.match(reg))) return unescape(arr[2])
    // unescape,decodeURI,decodeURIComponent 
    else return null;
    // unescape,decodeURI,decodeURIComponent 
}
//removeCookies
function delCookie(name)
{
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=getCookie(name);
    if(cval!=null)
        document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}
```
