# Axios

**安装**

>CDN：
>
>* `<script src="https://unpkg.com/axios/dist/axios.min.js"></script>`
>* `<script src="https://cdn.staticfile.org/axios/0.18.0/axios.min.js"></script>`
>* `<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>`
>
>npm、yarn、bower
>
>* `$ npm install axios`
>* `$ yarn add axios`
>* `$ bower install axios`

**返回值**

> axios 返回的是 `promise` 对象，最好使用 `async`  和 `await` 来解析 

```js
async fun() {
  const { data: res } = await axios.get('url')
  console.log(res)
}
//
axios.get('http://rap2api.taobao.org/app/mock/284961/test3')
  .then(response => {
    console.log(response)
  })
  .catch(err => err)
  .then(() => {
    // 总是执行
  })
```

## get

> 语法：`axios.get` 给一个参数时为 **url** 两个参数时，第一个为 **URL**；第二个为 **options**  

```js
// 直接访问
axios.get('http://xxx/test3')
// 带参数
axios.get('http://xxx/test3?id=10')
// URL带参数和 options 配置参数
axios.get(
'http://xxx/test3',
  {
  // params 请求url带参数 ?id=10
  params: {
      id: 10
    }
  }
)
// 
axios.get(
'http://xxx/test3?id=10',{
  // 会叠加 id=10&id=20
  params: {
    id:20
  }
}

```

## post

> post 一个参数时为访问 **url** ；两个时则第二个为 **options** 参数

```js
// 默认
axios.post('http://xxx/test4')
// 带参
axios.post(
  'http://xxx/test4',
  // data中带参数
  {
    firstName: 'Fred', // 参数 firstName
    lastName: 'Flintstone' // 参数 lastName
  }
)
```

## axios API

> axios(config)
>
> 通过相关配置创建请求

```js
axios({
  method: 'post',  方法名
  url: 'http://xxx/test4', 地址
  data: {   // bodyData 配置参数体
    firstName: 'Fred',
    lastName: 'Flintstone'
  }
})
```

> axios(url[, config])

```js
axios('http://xxx/test4');  //默认get

axios('http://xxx/test4', {
  method: 'post',
  data: {
    firstname: 'zhang',
    lastname: 'san'
  }
})
```

## 请求方法的别名

> 使用别名方法不需要配置或声明方法类型
>
> 使用别名方法时，不需要在配置中指定 ==**url**==、==**method**== 和 ==**data**== 属性。
>

| 格式                               | 参数                   |
| ---------------------------------- | ---------------------- |
| axios.request(config)              | [{配置}]               |
| axios.get(url[, config])           | [“路径”,{配置}]        |
| axios.post(url[, data[, config]])  | [“路径”,{数据},{配置}] |
| axios.delete(url[, config])        | [“路径”,{配置}]        |
| axios.head(url[, config])          | [“路径”,{配置}]        |
| axios.options(url[, config])       | [“路径”,{配置}]        |
| axios.put(url[, data[, config]])   | [“路径”,{数据},{配置}] |
| axios.patch(url[, data[, config]]) | [“路径”,{数据},{配置}] |

```js
// 原始的Axios请求方式 相当于 axios.request(config)
axios({
  method: 'post',
  url: '/user/12345',
  data: { // 为 post 配置数据体
    firstName: 'Fred',
    lastName: 'Flintstone'
  },
  timeout: 1000,  // 超出时间
  ...  // 其他相关配置
});
    
//axios.get(url[, config])
axios.get('http://xxx/test3', {
  params: {  // 参数
  id: 10,
  page: 1
  },
  timeout: 1000  // 超时时间
  // ...其他相关配置
})
//axios.post(url[, data[, config]])
axios.post('http://xxx/test4',
  { name: 'Henry' },
  { timeout: 1000 }  // 需要注意的是 post config配置 是在第二个参数内设置；与 get 不同
)
```

> **params** 是在 **url** 中带入参数；**data** 是在请求体中带入参数；**data** 只能用在默认 `axios.request` 方法中

## HTTP 请求方法

| 方法    | 描述                                                        |
| ------- | ----------------------------------------------------------- |
| GET     | 请求页面信息，返回响应体                                    |
| HEAD    | 类似 GET 请求，只不过返回的响应中没有具体内容，用于获取报头 |
| POST    | 提交数据进行请求，数据被包含在请求体中，具有加密性          |
| PUT     | 从客户端向服务器端发送数据取代指定的内容和文档              |
| DELETE  | 请求服务器删除指定页面                                      |
| CONNECT | 1.1协议中预留给能够将连接改为管道方式的代理服务器           |
| OPTIONS | 允许客户端查看服务器的性能                                  |
| TRACE   | 回显服务器收到的请求，主要用于测试或诊断。                  |
| PATCH   | 是对PUT方法的补充，用来对已知资源进行局部更新。             |

## 并发请求

> `axios.all([request,request,...])`
>
> 同一时刻发送请求
>
> 并发无返回值 响应处理返回的是数组

```js
// 参数为数组形式
axios.all([  // 要并发的请求数组
  axios.get('http://xxx/test3'),
  axios.post('http://xxx/test4')
])
.then(response => {
  console.log(response)  // 响应结果
})

// 返回值写法
function getAPI() {
  return axios.get('http://xxx/test3')
}
function postAPI() {
  return axios.post('http://xxx/test4')
}
axios.all([getAPI(), postAPI()]).then((x)=>{
  console.log(x); // 数组
  console.log(x[0]);
})

// spread
axios.all([getAPI(), postAPI()]).then(
  axios.spread(function(a, b) { // 拆解了数组
    console.log(a) // getAPI  response
    console.log(b) // postAPI  response
  })
)

// Promise.all
Promise.all([axios.get(...), axios.post(...)])
  .then(res => {
      console.log(res);  // 数组
  })
```

![tips](data:image/jpeg;base64,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)

> `Prmise.all` **then** 回调执行是在所有输入的promise的resolve回调都结束，或者输入的iterable里没有promise了的时候。

## 创建实例

> `axios.create([config])`
>
> 实例就像是提前配置好默认值，在往后调用中课简化操作

```js
//axios.create([config])
const instance = axios.create({
  baseURL: 'https://some-domain.com/api/',
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
});

// 示例 1
const getA = axios.create({
  // 配置默认值
  baseURL: 'http://rap2api.taobao.org/app/mock/284961/test3',
  params: {
    id: 10,
    age: 18
  }
})

getA.get().then(x => { // getA.get()
  console.log(x)  // 响应
})
// 示例 2
const getA = axios.create({
  baseURL: 'http://xxx/', // 基本地址
  params: {  
    id: 10,
    age: 18
  }
})

getA.get('test3', {  // 传递地址
    params: {  // 参数会覆盖 axios.create 里的对应参数
      id: 20
    }
  })
  .then(x => {
    console.log(x)
  })
}
// http://xxx/test3?id=20&age=18
```

### 实例方法

> 下面列出了可用的实例方法。指定的 **配置** 将与实例 **配置** 合并。
>
> * `axios#request(config)`
> * `axios#get(url[, config])`
> * `axios#delete(url[, config])`
> * `axios#head(url[, config])`
> * `axios#options(url[, config])`
> * `axios#post(url[, data[, config]])`
> * `axios#put(url[, data[, config]])`
> * `axios#patch(url[, data[, config]])`
> * `axios#getUri([config])`
>
> 就是说以上的方法可以和实例配置进行合并使用

### 配置实例说明

> **为什么要使用实例？和直接 `axios.get` (别名方法) 有啥区别**
>
> * 而之所以要创建axios实例，是因为我们实际工作项目中，可能需要访问多个服务地址，而这些服务请求和响应的结构也可能都完全不同，那么你可以通过axios.create创建不同的实例来处理。
> * 比如axios1是用http状态码确定响应是否正常，而axios2是服务器自己定义的状态码，又或者他们请求头不同，支持的content-type不同，那么我可以单独为axios1和axios2写 **拦截器**。

## ==请求配置项 options==

> [config]
>
> 下面是创建请求时可用的配置选项，注意只有 **url** 是必需的。如果没有指定 method，请求将默认使用 **get** 方法。

| 参数               | 描述                                                         |
| ------------------ | ------------------------------------------------------------ |
| url                | 用于请求的服务器 URL                                         |
| method             | 创建请求时使用的方法；使用别名方法时 无效                    |
| baseURL            | 基础路径；将自动加在 url 前面，除非 url 是一个绝对 URL；可以用于减少重复书写同样地址 |
| transformRequest   | 发送请求前对请求体 **data** 进行操作，必须 **return** 才会有 **data** |
| transformResponse  | 接受到相应后对响应体 **data** 进行操作，会自动转换成字符串，必须 **return**<br>data 想要保持 json 格式可以  `return JSON.parse(data)` |
| headers            | 即将被发送的自定义请求头                                     |
| params             | url 参数；多用于 get                                         |
| paramsSerializer   | 对 url 参数进行操作；必须 **return**；会自动将 url 参数转化为 **"对象形式"** 时需自己转换一下；也可以使用插件；例如官方提到的 ` Qs` 和 `jquery.param` |
| data               | 作为请求主体被发送的数据；只适用于这些请求方法 "PUT", "POST", 和 "PATCH" |
| timeout            | 指定请求超时的毫秒数(0 表示无超时时间)；超时则中断           |
| withCredentials    | `withCredentails`选项表明了是否是跨域请求、默认是default     |
| adapter            |                                                              |
| auth               | 表示应该使用 HTTP 基础验证，并提供凭据；这将设置一个 `Authorization` 头，覆写掉现有的任意使用 `headers` 设置的自定义 `Authorization`头 |
| responseType       | 示服务器响应的数据类型                                       |
| xsrfCookieName     |                                                              |
| xsrfHeaderName     |                                                              |
| onUploadProgress   | 上传处理进度事件                                             |
| onDownloadProgress | 下载处理进度事件                                             |
| maxContentLength   | `maxContentLength` 定义了 node.js 中允许的 http 响应内容的最大大小（以字节为单位） |
| validateStatus     | `validateStatus` 定义是解析还是拒绝给定 HTTP 响应状态代码的承诺；规定在允许状态码下解析；否则，承诺将被拒绝 |
| maxRedirects       | `maxRedirects` 定义了 node.js 中最大的跳转次数（一个服务发送请求的时候做的跳转）。如果设置为 0，则不会进行跳转；默认值最多跳转五次 |
| httpAgent          |                                                              |
| httpsAgent         |                                                              |
| proxy              |                                                              |
| cancelToken        | 指定用于 **取消请求** 的 cancel token `cancelToken: source.token` |

> 以下配置全部可用在 `axios.request` 和 `axios.create` 创建的实例上；有些属性不可用在 **别名方法上**
>
> 例如 **data** 只能用在非别名由声明的 "PUT", "POST", 和 "PATCH" 的方法上

```js
{
  // `url` 是用于请求的服务器 URL
  url: "/user",

  // `method` 是发出请求时使用的请求方法
  method: "get", // 默认是 get

  // 除非 url 是绝对的，否则 baseURL 将会被加在 url 前面。
  // 为 axios 的实例设置‘baseURL’来传递相对 url 会很方便。
  // 可以减去许多重复的字段。
  baseURL: "https://some-domain.com/api/",

  // `transformRequest` 允许在向服务器发送前，修改请求数据
  // 只能用在 "PUT", "POST" 和 "PATCH" 这几个请求方法
    // 后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream
  transformRequest: [function (data) {
    // 对 data 进行任意转换处理
    return data;
  }],
  // 甚至可以多个方法
  // transformRequest[fun,fun,fun,……]
 
  // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
  transformResponse: [function (data) {
    // 对 data 进行任意转换处理
		// 会将json 自动转换成字符串
    return data;
    // return JSON.parse(data)
  }],

  // `headers` 是即将被发送的自定义请求头
  headers: {"X-Requested-With": "XMLHttpRequest"},

  // `params` 是即将与请求一起发送的 URL 参数
  // 必须是一个无格式对象(plain object)或 URLSearchParams 对象
  params: {
    ID: 12345
  },

  // `paramsSerializer` 是一个负责 `params` 序列化的函数
  // (e.g. https://www.npmjs.com/package/qs, http://api.jquery.com/jquery.param/)
  paramsSerializer: function(params) {
    // Qs
    return Qs.stringify(params, {arrayFormat: "brackets"})
  },

  // `data` 是作为请求主体被发送的数据
  // 只适用于这些请求方法 "PUT", "POST", 和 "PATCH"
  // 在没有设置 `transformRequest` 时，必须是以下类型之一：
  // - 字符串、普通对象、ArrayBuffer、ArrayBufferView、URLSearchParams
  // - 浏览器专属：FormData, File, Blob
  // - Node 专属： Stream、Buffer
  data: {
    firstName: "Fred"
  },

  // `timeout` 指定请求超时的毫秒数(0 表示无超时时间)
  // 如果请求花费了超过 `timeout` 的时间，请求将被中断
  timeout: 1000,

  // `withCredentials` 表示跨域请求时是否需要使用凭证
  withCredentials: false, // 默认的

  // `adapter` 允许自定义处理请求，以使测试更轻松
  // 返回一个 promise 并应用一个有效的响应 (查阅 [response docs](#response-api)).
  adapter: function (config) {
    /* ... */
  },

  // `auth` 表示应该使用 HTTP 基础验证，并提供凭据
  // 这将设置一个 `Authorization` 头，覆写掉现有的任意使用 `headers` 设置的自定义 `Authorization`头
  auth: {
    username: "janedoe",
    password: "s00pers3cret"
  },

  /* 
      `responseType` 表示服务器响应的数据类型，
      可以是 "arraybuffer", "blob", "document", "json",
      "text", "stream"
      会对响应结果自动进行转换
  */
  responseType: "json", // 默认的

  // `xsrfCookieName` 是用作 xsrf token 的值的cookie的名称
  xsrfCookieName: "XSRF-TOKEN", // default

  // `xsrfHeaderName` 是承载 xsrf token 的值的 HTTP 头的名称
  xsrfHeaderName: "X-XSRF-TOKEN", // 默认的

  // `onUploadProgress` 允许为上传处理进度事件
  onUploadProgress: function (progressEvent) {
    // 对原生进度事件的处理
  },

  // `onDownloadProgress` 允许为下载处理进度事件
  onDownloadProgress: function (progressEvent) {
    // 对原生进度事件的处理
  },

  // `maxContentLength` 定义允许的响应内容的最大尺寸
  maxContentLength: 2000,

  // `validateStatus` 定义对于给定的HTTP 响应状态码是 resolve 或 reject  promise 。如果 `validateStatus` 返回 `true` (或者设置为 `null` 或 `undefined`)，promise 将被 resolve; 否则，promise 将被 rejecte
  validateStatus: function (status) {
    return status &gt;= 200 &amp;&amp; status &lt; 300; // 默认的 >=200 && <300
  },

  // `maxRedirects` 定义在 node.js 中 follow 的最大重定向数目
  // 如果设置为0，将不会 follow 任何重定向
  maxRedirects: 5, // 默认的

  // `httpAgent` 和 `httpsAgent` 分别在 node.js 中用于定义在执行 http 和 https 时使用的自定义代理。允许像这样配置选项：
  // `keepAlive` 默认没有启用
  httpAgent: new http.Agent({ keepAlive: true }),
  httpsAgent: new https.Agent({ keepAlive: true }),

  // "proxy" 定义代理服务器的主机名称和端口
  // `auth` 表示 HTTP 基础验证应当用于连接代理，并提供凭据
  // 这将会设置一个 `Proxy-Authorization` 头，覆写掉已有的通过使用 `header` 设置的自定义 `Proxy-Authorization` 头。
  proxy: {
    host: "127.0.0.1",
    port: 9000,
    auth: : {
      username: "mikeymike",
      password: "rapunz3l"
    }
  },

  // `cancelToken` 指定用于取消请求的 cancel token
  // （查看后面的 Cancellation 这节了解更多）
  cancelToken: new CancelToken(function (cancel) {
  })
}
```

> **onDownloadProgress && onUploadProgress**

| 属性      | 描述     |
| --------- | -------- |
| total     | 总大小   |
| loaded    | 现在大小 |
| timeStamp | 耗时     |

```js
// upload    上传
onUploadProgress(progress) {
  console.log(Math.round(progress.loaded / progress.total * 100) + '%');
}
// download  下载
onDownloadProgress(progress) {
  console.log(Math.round(progress.loaded / progress.total * 100) + '%');
}
```

## 配置的默认值

> 你可以指定将被用在各个请求的配置默认值。
>
> ==重要提示：如果 axios 与多个域一起使用，AUTH_TOKEN 将被发送到所有域。==
>
> **全局** 的默认值：

```js
// 直接配置（优先级最高）
axios.defaults.baseURL = 'https://api.example.com';
// 配置通用 (优先级最低)
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// 为post配置（优先级中等）
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// 为get配置
axios.defaults.headers.get['Fname'] = 'aaaaaaaaaaaaaaaaaaaaaaaaa';
```

> **实例** 配置默认值：

```js
// 创建实例时设置配置的默认值
var instance = axios.create({
  baseURL: 'https://api.example.com'
});

// 在实例已创建后修改默认值
instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;
```

## 配置的优先顺序	

> 配置会以一个优先顺序进行合并。这个顺序是：在 lib/defaults.js 找到的库的默认值，然后是实例的 defaults 属性，最后是请求的 config 参数。后者将优先于前者。这里是一个例子：

```js
// 使用由库提供的配置的默认值来创建实例
// 此时超时配置的默认值是 `0`  不配置timeout则默认为零；没有超时时间
var instance = axios.create();

// 覆写库的超时默认值
// 现在，在超时前，所有请求都会等待 2.5 秒；这行已经覆盖 timeout 默认 0
instance.defaults.timeout = 2500;

// 为已知需要花费很长时间的请求覆写超时设置；请求配置优先级-最高
instance.get('/longRequest', {
  timeout: 5000
});
// 结果是： timeout: 5000
```

```js
// 全局配置
axios.defaults.params = {
  id: 30
}
//实例配置
const getA = axios.create({
  baseURL: 'http://xxx/',
  params: {
    id: 20,
    age: 18
  }
})
// 请求配置
getA
  .get('test3', {
    params: {
      id: 10
    }
  })
  .then(x => {
    console.log(x)
  })
}
// http://xxx/test3?id=10
```

> 优先级：`请求配置(axios.get)` **>** `实例配置(axios.create)` **>** `全局配置(axios.default)`

```js
axios.defaults.headers['Fname'] = 'aaaaaaaaaaaaaaaaaa'
axios.defaults.headers.get['Fname'] = 'bbbbbbbbbbbbbbbbbb';
axios.defaults.headers.common['Fname'] = 'ccccccccccccccccccc';
```

> 关于头部优先级：
>
> 1：`axios.defaults.headers['Fname']`（最高） <br>2：`axios.defaults.headers.get['Fname']`（中等） <br>3：`axios.defaults.headers.common['Fname'])`（最低）
>
> **实现效果都相同，只是优先级不同**

## 响应结构

> 请求返回响应体

```js
{
  // `config` 是为请求提供的配置信息
  config: {}
  
  // `data` 由服务器提供的响应
  data: {},

  // `status`  HTTP 状态码
  status: 200,

  // `statusText` 来自服务器响应的 HTTP 状态信息
  statusText: "OK",

  // `headers` 服务器响应的头
  headers: {},
}
```

> `console.log()` 打印
>
> ![响应结构](data:image/gif;base64,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)

## 拦截器

> 在请求或响应被 **then** 或 **catch** 处理前拦截它们。

```js
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    NProgress.start(); // 进度条插件开始 NProgress 是一个进度条插件
    return config;  // 必须返回
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    NProgress.done(); // 进度条插件结束
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });
```

> 如果你想在稍后移除拦截器，可以这样：

```js
var myInterceptor = axios.interceptors.request.use(function () {/*...*/});
axios.interceptors.request.eject(myInterceptor);  // 移除
```

> 可以为自定义 axios 实例添加拦截器。

```js
var instance = axios.create();  // 创建实例
instance.interceptors.request.use(function () {/*...*/});	
```

> 错误处理：

```js
axios.get('/user/12345')
  .catch(function (error) {  // catch
    if (error.response) {    // error.respose
      // 请求已发出，但服务器响应的状态码不在 2xx 范围内
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else {
      // 设置触发错误的请求时发生了一些事情
      console.log('Error', error.message);
    }
    //响应config
    console.log(error.config);
  });
```

> 可以使用 validateStatus 配置选项定义一个自定义 HTTP 状态码的错误范围。

```js
axios.get('/user/12345', {
  validateStatus: function (status) {
    // 设置允许范围
    console.log('状态码大于300');
    return status < 300; // 状态码在大于或等于500时才会 reject 报错
  }
})
```

## 取消请求

> 使用 cancel token 取消请求。
>
> 在 **cancelToken** 属性中 加入 `CancelToken.source()` 返回值
>
> 可以使用 CancelToken.source 工厂方法创建 cancel token，像这样：

```js
const CancelToken = axios.CancelToken; // 保存到变量

// 返回两个字段，{ token, cancel }
// token用于表示某个请求，是一个Promise类型
// cancel是一个方法，当被调用时，则取消token注入的那个请求
const source = CancelToken.source();

axios.get('/user/12345', {
  cancelToken: source.token  // 将token注入到请求中，cancelToken属性
})
  .catch(function(thrown) {
    if (axios.isCancel(thrown)) { // isCancel判断是否由用户取消 true | false
      console.log('Request canceled', thrown.message);
    } else {
      // 处理错误
      console.log('非取消错误');
    }
  });

// 取消请求（message 参数是可选的）主动取消请求
source.cancel('Operation canceled by the user.');  // 取消方法，参数为控制台打印输出
```

> 还可以通过传递一个 executor 函数到 CancelToken 的构造函数来创建 cancel token：

```js
const CancelToken = axios.CancelToken;
let cancel;

axios.get('/user/12345', {
  // CancelToken创建的
  cancelToken: new CancelToken(function executor(c) {
    // An executor function receives a cancel function as a parameter
    cancel = c;
  }),
});

// cancel the request
cancel();
```

> - Cancel: Cancel 类，**message** 和__CANCEL__属性，用于标识取消的某个请求；
> - isCancel: 判断当前参数是否是 Cancel 的实例；
> - CancelToken: 主流程，创建 Cancel 实例和取消的方法；
>
> ![cancel](data:image/gif;base64,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)

## 请求时使用 application/x-www-form-urlencoded

> axios 会默认序列化 JavaScript 对象为 **JSON**。 如果想使用 **application/x-www-form-urlencoded** 格式，你可以使用下面的配置。<br>`'content-type': 'application/x-www-form-urlencoded'`
>
> application/x-www-form-urlencoded 格式就是（name1=value1&name2=value2…）用于URL params
>
> 你可以使用 **URLSearchParams** API
>
> 除此之外，你可以使用 **qs** 库

```js
// URLsearchParams API
const params = new URLSearchParams(); // 浏览器 API 存在兼容性问题
params.append('param1', 'value1'); // 添加内容
params.append('param2', 'value2');
axios.post('/foo', params);  // ?param1=value1&param2=value2

// qs 插件
const qs = require('qs');
axios.post('/foo', qs.stringify({ 'bar': 123 }));

//
const data = { 'bar': 123 };
const options = {
  method: 'POST',
  // 设置信息头为 application/x-www-form-urlencoded
  headers: { 'content-type': 'application/x-www-form-urlencoded' },
  data: qs.stringify(data),
  url,
};
axios(options);
```

> 配置 `{content-type:'application/x-www-form-urlencoded'}` 不然参数则为 **request payload** 形式
>
> 关于 data 的数据格式
>
> 如果是 **application/x-www-form-urlencoded** 的话，则为 **formdata** 方式；
>
> 如果是 **applocation/json** 或 **multipart/form-data** 的话，则为 **request payload** 方式。
>
> axios 默认 applocation/json 格式 所以如果需要格式为formdata需设置 content-type

## Node.js 环境

> 在 node.js里, 可以使用 querystring 模块
>
> querystring 作用于将对象序列化

```js
const querystring = require('querystring');
axios.post('http: //xxxx.com/', querystring.stringify({ foo: 'bar' }));
```

> ![stringify](data:image/gif;base64,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)
>
> ![qsstringify](data:image/gif;base64,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)
>
> 当然，同浏览器一样，你还可以使用 qs 库。

## Promises

> axios 依赖原生的 ES6 Promise 实现而被支持。
>
> 如果你的环境不支持 ES6 Promise，你可以使用 [polyfill](https://github.com/jakearchibald/es6-promise)（ polyfill用于转义新型 API，与 babel 不同）

## TypeScript支持

axios 包含 TypeScript 的定义

```js
import axios from "axios";
axios.get("/user?ID=12345");
```