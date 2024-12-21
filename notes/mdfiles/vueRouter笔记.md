# Vue-Router

1. 引入 router 核心 js 文件
2. 创建路由对象并自定义路由规则
3. 将路由注册到 vue 实例里面（挂载）
4. 在 vue 作用域范围内使用 `<router-view>` 标签显示路由界面

CDN导入方式

> 开发：`<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js">\</script>`
>
> 生产：`<script src="https://cdn.jsdelivr.net/npm/vue">\</script>`

NPM

> `npm install vue-router`

创建路由

| 属性      | 描述                                                        |
| --------- | ----------------------------------------------------------- |
| path      | 路径                                                        |
| name      | 名称，标识，必须唯一                                        |
| component | 目标文件                                                    |
| mode      | 路由模式 hash或者 history<br>hash URL带 `#` history不带 `#` |
| children  | 子路由配置                                                  |

> `#` 为hash路由
>
> `/` 为跟目录
>
> 下面是 CDN 环境下配置

```js
创建
const rouer  = new VueRouter({
    mode: "history",  //不带#
    routes: [
        { path: '/', redirect: "/home" },   //重定向
        { path: "/home", name: 'home', component: home }, //name也可用于跳转，命名路由
        { path: "/study", name: 'study', component: study },
        { path: "/news", name: 'news', component: news }
    ]
})

使用
new Vue({
  el: '#app',
  data:{},
  router:router,  //es6可以简写成 router
})
```

> 需要注意的是在CDN使用下是 `new VueRouter` cli 环境下则是引用变量名

**脚手架环境下配置 vue-cli**

> rouer文件夹下index.js文件配置

```js
//router/index.js
//导入路由和vue核心
import Vue from 'vue'
import Router from 'vue-router'
//使用插件
Vue.use(Router);
//导入home组件
import home from "../components/Home.vue"
//创建路由配置
export default new Router({
    mode: "history",    //配置路由模式
    routes: [           //配置路由路径及对应文件
        { path: '/', redirect: "/home" },   //设置根目录下访问的组件
        { path: '/home', name: 'home', component: home } //设置/home路径访问home组件
    ]
})
```

> mode 属性可以省略，默认为 hash 模式

**视图层**

| 标签                                       | 描述                                        |
| ------------------------------------------ | ------------------------------------------- |
| \<router-link  to="" tag="">\<router-link> | 生成跳转路由标签，link标签会自动转化为a标签 |
| \<router-view>\</router-view>              | 展示路由组件显示位置                        |

| 属性 | 描述                                                         |
| ---- | ------------------------------------------------------------ |
| to   | 指向哪个路由                                                 |
| tag  | 有时候想要\<router-link> 渲染成某种标签，例如 \<li>。 于是我们使用 tag prop 类指定何种标签，同样它还是会监听点击，触发导航，tag默认是a标签 |

```html
<router-link to="/home">Home</router-link>
<router-link to="/study">Study</router-link>
<router-link to="/news">News</router-link>
```

**默认指向（跟路径）**

```js
export default new Router({
    mode: "history",
    routes: [
        { path: "/", name: 'home', component: home }, // / 为跟路径，一打开页面就指向跟路径
        { path: "/home", name: 'home', component: home },
        { path: '/', redirect: "/home" },  //重定向，当访问跟目录时路径路由路径指向home
    ]
})
```

> 直接跟目录访问home是没有发生url改变的，重定向相当于发生了一次跳转，url会改变

## 路由动态匹配

| 方法    | 描述                   |
| ------- | ---------------------- |
| $route  | 代表的是当前路由       |
| $router | 代表的是所有的路由对象 |

> 实例使用 watch 来监控路由变化
>
> watch 可以监听路由的变化

```js
const User = {
  template: '...',
  watch: {
    $route(to, from) {
      // 对路由变化作出响应...
    }
  }
}
```

**路由参数传递**

> 路由传递参数有两种方法一个是用 `query` 接受，另一个是用 `params` 接受
>
> 以下就称之为 **query** 模式和 **params** 模式

### query 

>  路由配置无需改变

```js
export default new Router({
    routes: [
        { path: "/home", name: 'home', component: home },
    ]
})
```

> html 配置
>
> 直接在**to**上面像 url 传递参数一样传递

```html
<router-link to="/home?id=20&name=张三">Home</router-link>
```

> home.vue 组件接受参数
>
> 利用钩子函数 created 来执行方法

```js
//home.vue
export default {
  name: 'Home',
  data () {
    return {
    }
  },
  created () {
    console.log(this.$route);
    console.log(this.$route.query);
  }
}
```

> 控制台结果
>
> query 获得参数

```json
//chosnle.log
{
    fullPath: "/home?id=20&name=%E5%BC%A0%E4%B8%89"  // 携带参数
    hash: ""
    matched: [{…}]
    meta: {}
    name: "home"
    params: {}
    path: "/home"
    query: {id: "20", name: "张三"}   //query接受到参数
}
```

### params

> 动态路径参数，一个“路径参数”使用冒号` : `标记。当匹配到一个路由时，参数值会被设置到 `this.$route.params`，可以在每个组件内使用。
>
> 需要注意的是如果，在路由配置设置了路径参数，在跳转时若没有输入符合的参数时是**不会跳转**的<br>若没有设置，使用编程式传入 params 时，则会正常跳转，也相当于设置了一个过滤器
>
> 路由配置：

```js
export default new Router({
    routes: [
        { 
            path: "/home/:id", //:id 代表需要传递的参数
            name: 'home', 
            component: home 
        },
    ]
})
```

> HTML 配置
>
> 在跳转路径后面直接 `/`  接上参数即可不用像url传递那样使用 `?` 和 `&`

```html
<router-link to="/home/22">Home</router-link>
<router-link to="/home/22">Home</router-link>
<!-- 下面跳转则会失败不会跳转成功 -->
<router-link to="/home">Home</router-link>  跳转失败
```

> home 组件接受参数

```js
export default {
  name: 'Home',
  data () {
    return {
    }
  },
  created () {
    console.log(this.$route)
  }
}
```

> 控制台结果

```json
{
    fullPath: "/home/22"
    hash: ""
    matched: [{…}]
    meta: {}
    name: "home"
    params: {id: "22"}   // params 接受到参数
    __proto__: Object
    path: "/home/22"
    query: {}
    __proto__: Object
}
```

> params 多个参数传递
>
> 如果参数连接有 `/` 的话地址则需加个 `/`

```js
{ path: "/home/:id/:name", name: 'home', component: home },
//对应 router-link    以/分隔
<router-link to="/home/22/张三">Home</router-link>
```

### 捕获所有路由

> 常规参数只会匹配被 `/` 分隔的 URL 片段中的字符。如果想匹配任意路径，我们可以使用通配符 ( * )
>
> 当使用通配符路由时，请确保路由的顺序是正确的，也就是说含有通配符的路由应该放在最后。
>
> 路由 `{path:'*'}` 通常用于客户端 404 错误。如果你使用了**History** 模式，请确保正确配置你的服务器。
>
> 当使用一个通配符时，`$route.params` 内会自动添加一个名为 **pathMatch** 参数。它包含了 URL **通过通配符被匹配的部分** 也就是 `*` 匹配的那部分
>
> **pathMatch** 将会存在 `$route.params` 下

```js
{
  // 会匹配所有路径
  path: '*'
}
{
  // 会匹配以 `/user-` 开头的任意路径
  path: '/user-*'
}
//示例
{ path: "*", name: 'home', component: home }
//无论router-link 路径是什么最终都跳向 home
<router-link to="/home">Home</router-link>
<router-link to="/study">Study</router-link>
<router-link to="/news">News</router-link>
//以 home- 开头的任意地址
{ path: "/home-*", name: 'home', component: home }
//router-link
<router-link to="/home-a1">Home</router-link>
<router-link to="/home-b2">Home</router-link>
<router-link to="/home-c3">Home</router-link>
```

**params参数**

```json
//output
/* /home-a1 */
params: {pathMatch: "a1"}
/* /home-b2 */
params: {pathMatch: "b2"}
/* /home-c3 */
params: {pathMatch: "c3"}
```

> 匹配优先级。有时候，同一个路径可以匹配多个路由，此时，匹配的优先级就按照路由的定义顺序：**路由定义得越早**，优先级就越高，匹配先定义的那一个页面。

## 嵌套路由

> 可以在路由下面在嵌套子路由
>
> 直接在跟路由下使用 **children** 来配置子路由
>
> 在 home 组件下在配置一个 home-child 的路由
>
> 子路由路径 **不需要** 加 `/` ，因为 `/` 开头的嵌套路径会被当作根路径

```js
//router index.js
import home from "../components/Home.vue"
import homeChild from "../components/Home-Child.vue"
export default new Router({
    routes: [
        {
            path: "/home",
            name: 'home',
            component: home,
            children: [{
                path: "home-child",   //子路由访问路径，路径无 "/" 
                component: homeChild  //子路由指向组件
            }]
        }
    ]
})
```

> home 组件下配置

```vue
<template>
  <div >
      <div class="home">home</div>
      <!-- 为子路由配置router-link -->
      <router-link to="home/home-child">home-chlid</router-link>
      <!-- 为子路由配置显示router-view -->
      <router-view></router-view>
</div> 
</template>
```

> url 地址

```url
#/home/home-child
```

> 当然你也可以使用 **template** 模板创建组件，这取决于你的灵活使用，也可以 `<router-link>`，也可以在任意位置，只要跳转地址符合即可。

```js
const User = {
  template: `
    <div class="home">
      <h2> home </h2>
      <router-view></router-view>
    </div>`
}
```

> 如果在路由中设置了 params 也就是 `/class/:id` 再访问子路由 `/class/student` 由于子路由将其视为路径的一部分，而不是参数，会导致路由跳转失败，需要使用命名参数来避免这个问题，需要在子路由加上参数`/class/:id/student` 

## 编程式的导航

> 除了使用 `<router-link>` 创建 a 标签来定义导航链接，我们还可以借助 router 的 **实例方法**，通过编写代码来实现。

| 方法                                          | 描述                                                         |
| --------------------------------------------- | ------------------------------------------------------------ |
| router.push(location, onComplete?, onAbort?)  | 使用 `router.push` 方法。**这个方法会向 history 栈添加一个新的<br/>记录**，所以，当用户点击浏览器后退按钮时，<br/>则回到之前的 URL。 |
| router.replace(location,onComplete?,onAbort?) | 跟 `router.push` 很像，唯一的不同就是，<br>**它不会向 history 添加新记录**，<br>而是跟它的方法名一样，替换掉当前的 **history** 记录。 |
| router.go(n)                                  | 跳转到指定的历史记录位置                                     |
| router.back()                                 | 返回上一个地址                                               |
| router.forward()                              | 若返回过，可用 forward 继续前进                              |

> **location**           - 是指跳转路径
>
> **onComplete**   - 是指成功跳转后的回调
>
> **onAbort**          - 是指失败后的回调

### push

> push就是跳转到指定路径，会留下记录。

| 声明式                   | 编程式           |
| ------------------------ | ---------------- |
| \<router-link :to="..."> | router.push(...) |

```js
// 字符串
this.$router.push('home');
// 对象
this.$router.push({ path: 'home' });
// 命名的路由
this.$router.push({ name: 'user', params: { userId: '123' }});
// 带查询参数，变成 /register?plan=private
this.$router.push({ path: 'register', query: { plan: 'private' }});
// 携带params和qauery
this.$router.push({
  name: "study", // 使用name指定路由
  params: {  // 传递parmas
    name: "张三",
    id: "001"
  },
  query: {  // 传递query
    query1: 10,
    query2: 20
  }
});
```

如果直接提供 `path`，那么 `params` 将被忽略，因为 `path` 已经指定了完整的路径。在这种情况下，你只能传递 `query` 参数。

> - 使用 `name`：当使用命名路由时，可以同时传递 `params` 和 `query`。
>- 使用 `path`：如果直接提供 `path`，则只能传递 `query`，`params` 将被忽略。
> 
>使用`name`跳转时即使传递的`params`数量不够还是会尝试跳转
> 
>同样的规则也适用于 `router-link` 组件的 `to` 属性。

````js
// 字符串
$router.push('study')
$router.push("/study")
// 对象
$router.push({path:'study'})
$router.push({path: `/user/${userId}` }) // -> /user/123
// 命名路由
$router.push({name: 'studyname'})
//直接路由带查询参数query，地址栏变成 /apple?color=red
$router.push({path: 'study', query: {color: 'red' }})
// 命名路由带查询参数query，地址栏变成/apple?color=red
$router.push({name: 'studyname', query: {color: 'red' }})
//直接路由带路由参数params，params 不生效，如果提供了 path，params 会被忽略
$router.push({path:'study', params:{ color: 'red' }})
// 命名路由带路由参数params，地址栏是/apple/red
$router.push({name:'studyname', params:{ color: 'red' }})
````

```vue
<!-- 字符串 这里不是动态的 -->
<router-link to="study"> to study</router-link>
<!-- 对象 -->
<router-link :to="{path:'study'}"> to study</router-link>
<!-- 命名路由 -->
<router-link :to="{name: 'studyname'}"> to study</router-link>
<!-- 直接路由带查询参数query，地址栏变成 /apple?color=red -->
<router-link :to="{path: 'study', query: {color: 'red' }}"> to study</router-link>
<!-- 命名路由带查询参数query，地址栏变成/apple?color=red -->
<router-link :to="{name: 'studyname', query: {color: 'red' }}"> to study</router-link>
<!-- 直接路由带路由参数params，params 不生效，如果提供了 path，params 会被忽略 -->
<router-link :to="{path: 'study', params: { color: 'red' }}"> to study</router-link>
<!-- 命名路由带路由参数params，地址栏是/apple/red -->
<router-link :to="{name: 'studyname', params: { color: 'red' }}"> to study</router-link>
```

> push跟promise一样，后面是可以跟 **then** 和 **catch**

```js
router.replace(location).then(onComplete).catch(onAbort)  // 成功回调和失败回调
```

### replace

> replace 属性就是跳转到指定路径，不会留下记录，类似于 window.history.go(n)。
>
> 使用方法和 push 一样

| 声明式                           | 编程式              |
| -------------------------------- | ------------------- |
| \<router-link :to="..." replace> | router.replace(...) |

### go

> 前进或者后退指定步数，参数是 **正数** 或 **负数**
>
> 如果是使用 replace 跳转的话就可能出现失败了

```js
// 在浏览器记录中前进一步，等同于 history.forward()
this.$router.go(1)
// 后退一步记录，等同于 history.back()
this.$router.go(-1)
// 前进 3 步记录
this.$router.go(3)
// 如果 history 记录不够用，那就默默地失败呗
this.$router.go(-100)
this.$router.go(100)
```

> 最后汇总一下各个方法如何使用

```js
router.push(location, onComplete?, onAbort?)	          // 可在location后写回调方法
router.push(location).then(onComplete).catch(onAbort)   // 跟promise一样回调

router.replace(location, onComplete?, onAbort?)
router.replace(location).then(onComplete).catch(onAbort)// 和push一样的回调方式

router.go(n)
router.back()
router.forward()
```

## 命名路由

> 有时候，通过一个名称来标识一个路由显得更方便一些，特别是在链接一个路由，或者是执行一些跳转的时候。你可以在创建 **Router** 实例的时候，在 `routes` 配置中给某个路由设置名称，也就是加上 **name** 属性。

```js
const router = new VueRouter({
  routes: [
    {
      path: '/user/:userId',
      name: 'user',	   //为路由配置name
      component: User
    }
  ]
})
```

`router-link` 通过 **name** 跳转

```html
<router-link :to="{ name: 'user', params: { userId: 123 }}">User</router-link>
```

编程式通过 **name** 跳转

也就是 **name** + **params** 搭配方式

```js
router.push({ name: 'user', params: { userId: 123 } })
```

> 这两种方式都会把路由导航到 `/user/123` 路径。

## 命名视图

> 有时候想同时 (同级) 展示多个视图，而不是嵌套展示，例如创建一个布局，有 `sidebar` (侧导航) 和 `main` (主内容) 两个视图，这个时候命名视图就派上用场了。你可以在界面中拥有多个单独命名的视图，而不是只有一个单独的出口。如果 `router-view` 没有设置名字，那么默认为 `default`，通过给视图命名来实现视图不冲突。

```html
<router-view class="view one"></router-view>
<router-view class="view two" name="a"></router-view>    //name属性来给视图命名
<router-view class="view three" name="b"></router-view>
```

**路由 index.js 配置**

```js
export default new Router({
    // mode: "history",
    routes: [
        {
            path: "/home",
            name: 'home',
            components: {        // 将 component 变成 components 
                default: home,   // 默认无 name 属性则用 default
                a: study,        // a视图，通过 name 区别视图显示内容
                b: news          // b视图
            }
        },
    ]
})
```

> 注意：使用命名视图时，路由配置应该是 **components** 而不是 **component**，记得带上 **s**

### 命名视图嵌套

> 命名视图也是可以嵌套的
>
> 我们也有可能使用命名视图创建嵌套视图的复杂布局。这时你也需要命名用到的嵌套 `router-view` 组件

**路由配置**

```js
export default new Router({
    routes: [
        {
            path: "/action",
            name: 'action',
            component: action,
            children: [{                 // 创建子路由
                path: "person",
                components: {            // 在子路由里面配置命名视图
                    default: person,     // 默认视图
                    helper: person1      // 命名视图helper
                }
            }]
        },
    ]
})
```

**视图层配置**

> 注意：`router-view` 是在主要展示组件下配置，而不是在路由组件里

```vue
//action.vue
<template>
  <div >
      <div class="">action</div>
      <router-link to="/action/person">person</router-link>
      <router-view></router-view>
      <router-view name="helper"></router-view> <!-- 与上面视图同级 -->
</div> 
</template>
```

## 重定向和别名

### 重定向

> “重定向”的意思是，当用户访问 `/a` 时，URL 将会被替换成 `/b`，然后匹配路由为 `/b`
>
> 就是当访问某个地址是帮你跳转到另一个地址，并修改地址。

```js
export default new Router({
  routes: [
    { path: '/', redirect: "/home" },       // 将跟路由定位到 home 组件
    { path: "/study", redirect: "/home" },  // 将 /study 定位到 /home
    { path: "/home-*", redirect: "/home" }, // 使用通配符
})
```

甚至可以是一个方法，动态返回重定向目标：

```js
const router = new VueRouter({
  routes: [
    { path: '/a', redirect: to => {
      // 方法接收 目标路由 作为参数
      // return 重定向的 字符串路径/路径对象
    }}
  ]
})
//示例
routes: [{
    path: '/',
    redirect: to => {
        return "/home"    //返回字符串做路由路径
    }
}]
//
routes: [{
    path: '/',
    redirect: to => {
        return { path: "/home" }  // 返回对象做为路由参数
    }
}]
//
routes: [{
    path: '/a',
    redirect: to => {
        return { name: "home", params: { id: 20 } }  // name + params
    }
}]       
```

> 使用对象作为返回参数和路由匹配是一样的

### 别名

> `/a` 的别名是 `/b`，意味着，当用户访问 `/b` 时，URL 会保持为 `/b`，但是路由匹配则为 `/a`，就像用户访问 `/a` 一样，页面还是 `/a` 的页面。（多起了一个名字）
>
> 就跟重定向一样，只是地址会保持访问的地址

```js
routes: [{
    path: '/home',
    component: home,  
    alias: "/study"      //当访问呢/study时，页面显示的是 home 页面，但是地址仍是/study
}]
routes: [{
    path: '/home',
    component: home,  
    alias: ['/study','/news']  //可以使用数组包含多个地址    
}]
```

> 就像是取多了几个名字你无论用哪个都是指向这里，但是地址会变

## 路由组件传参

### 布尔模式

> 通过 props 来传递参数而不使用 `this.$route`，这样可以是组件降低耦合度

```js
routes: [{ 
    path: "/news/:id",  //配置了 id 形参
    name: 'news',
    component: news,
    props: true         //props 设置为 true 表示打开布尔传递
}]
```

**接受组件配置**

```js
export default {
  name: 'News',
  props:['id'],   //直接 props 来接受参数 id
  mounted(){
    console.log(this.id);
  }
}
```

> 如果 props 被设置为 true，`route.params` 将会被设置为组件属性。
>
> 会将参数传递到 `$route.params` 里面
>
> 设置为 **false** 的话则是 **undefined**
>
> **接受的 props 不能和 data 里面数据重名**

**对于包含多个命名视图的处理**

```js
// 对于包含命名视图的路由，你必须分别为每个命名视图添加 `props` 选项：
{
  path: '/user/:id',
  components: { default: User, sidebar: Sidebar },
  props: {
    default: true,   // 单独设置
    sidebar: false
  } 
}
```

> props要写成对象形式，为每个视图规定是否打开 props

### 对象模式

> 通过 props 以对象的方式传递，当 `props` 是**静态**的时候有用。

**路由配置**

```js
{ 
    path: "/news",
    name: 'news', 
    component: news,
    props: { id: 20, page: 30 }  //以对象的方式传递
},

```

**组件接受参数**

```js
export default {
    name: 'News',
    props:['id','page'],   //同样是 props 接受
    mounted(){
        console.log(this.id)
        console.log(this.page)
    }
}
```

> 对象模式传递是不用在url里传递参数，直接在props里面传递就行了

### 函数模式

> 你可以创建一个函数返回 `props`。这样你便可以将参数转换成另一种类型，将静态值与基于路由的值结合等
>

```js
export default new Router({
    routes: [   
    {
        path: "/news/:name/:id",
        name: 'news',
        component: news,
        props: (route) => ({  // 提供router参数
                name: route.params.name,    // 获取params值并传递过去
                id: route.params.id,
                query1: route.query.query1, // 获取query值并传递过去
                query2: route.query.query2
        })
    }
])
```

> URL: `localhost:/#/张三/20/?s1=aaa&s2=bbbb`
>
> params：`/张三/20`
>
> query：`?s1=aaa&s2=bbb`

```js
//你也可以这样
export default new Router({
routes: [
    {
        path: "/news/",  //这样设置的话 path 就不用改动了
        name: 'news',
        component: news,
        props: (route) => ({
                name: "张三", // 直接固定写死了
                id: 20,
                query1: route.query.query1,
                query2: route.query.query2
        })
        /*  非 es6 写法
        props: function(route) {
            return {
                name: "张三",
                id: 20,
                query1: route.query.query1,
                query2: route.query.query2
            }
        } 
        */
}
}])
```

**组件接受**

```js
export default {
  name: 'News',
  props: ['name', 'id', 'query1', 'query2'], //props 接受
  mounted(){
    console.log(this.name)
    console.log(this.id)
    console.log(this.query1)
    console.log(this.query2)
  }
}
```

> 函数模式传递参数灵活多变，可以最大限制的传参方式

## History 模式

> Vue Router 默认使用 **hash** 模式，通过 URL 的 hash 部分实现页面跳转，不会引起页面重新加载，但 URL 中会包含 `#` 符号。
>
> 若想避免 `#`，可以使用 **history** 模式，它利用 HTML5 的 `history.pushState` API 来更新 URL，无需页面刷新。
>
> **history** 模式的 URL 更加美观，但需要后端配置以支持服务器端渲染，且兼容性相对较差。 

```js
const router = new VueRouter({
  mode: 'history',    //通过 mode 属性设置 history 模式
  routes: [...]
})
```

1. hash 模式

   `http://localhost:8080/#/home`

2. history 模式

   `http://localhost:8080/home`

**配置404页面**

> 在你设置好后端后，你的服务器就不再返回 404 错误页面，因为对于所有路径都会返回 index.html 文件。为了避免这种情况，你应该在 Vue 应用里面覆盖所有的路由情况，然后再给出一个 404 页面，这样当访问到不存在的页面时跳转 404 页面

```js
const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '*', component: NotFoundComponent } // 将所有匹配到404再将正确跳转到指定页面
  ]
})
```

> 缺点:
> (1) 在用户手动输入地址或刷新页面时会发起 url **请求**, 后端需要配置 index.html 页面用户匹配不到静态资源的情况, 否则会出现404错误
> (2) 兼容性比较差, 是利用了 HTML5 History对象中新增的 `pushState()` 和 `replaceState()` 方法,需要特定浏览器的支持

## 导航守卫

> 导航守卫可以理解为就是路由跳转时的钩子函数
>
> 正如其名，vue-router 提供的导航守卫主要用来 **通过跳转或取消** 的方式守卫导航。有多种机会植入路由导航过程中：全局的, 单个路由独享的, 或者组件级的。
>
> 记住参数或查询的改变并不会触发进入/离开的导航守卫。你可以通过观察 `$route` 对象来应对这些变化，或使用 `beforeRouteUpdate` 的**组件内守卫**。

### 全局前置守卫

> 使用 `router.beforeEach` 注册一个全局前置守卫，router 为路由对象
>
> 当一个导航触发时，全局前置守卫按照创建顺序调用。守卫是**异步**解析执行，此时导航在所有守卫 **resolve** 完之前一直处于 **等待中**。

```js
// index.js
var router = new Router({
    routes: [...]
})
//创建全局守卫  
router.beforeEach((to, from, next) => {   //router为全局路由对象
    console.log("来自" + from.name);
    console.log("去往" + to.name);
    next();  // 放行
})
```

* `to: Route:` 即将要进入的目标 路由对象
* `from: Route:` 当前导航正要离开的路由
* `next: Function:` 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。
  * `next()`: 进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 confirmed (确认的)。
  * 不执行next()的话，路由是不会跳转的
  * `next(false)`: 中断当前的导航。如果浏览器的 URL 改变了 (可能是用户手动或者浏览器后退按钮)，那么 URL 地址会重置到 `from` 路由对应的地址。
  * `next('/')` 或者 `next({ path: '/' })`: 跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航。你可以向 `next` 传递任意位置对象，且允许设置诸如 `replace: true`、`name: 'home'` 之类的选项以及任何用在 `router-link` 的 `to` prop 或 `router.push` 中的选项。
  * `next(error)`: (2.4.0+) 如果传入 `next` 的参数是一个 `Error` 实例，则导航会被终止且该错误会被传递给 `router.onError()`注册过的回调。

> 确保 `next` 函数在任何给定的导航守卫中都被严格调用一次。它可以出现多于一次，但是只能在所有的逻辑路径都不重叠的情况下，**否则钩子永远都不会被解析或报错**，也就是无响应了。

```js
router.beforeEach((to, from, next) => {     
  if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
    //如果不符合条件则跳转到 login 组件那，符合则 else 通过
  else next();
})
```

### 全局解析守卫

> 在 2.5.0+ 你可以用 `router.beforeResolve` 注册一个全局守卫。这和 `router.beforeEach` 类似，区别是在导航被**确认**之前，同时在所有**组件内守卫和异步路由组件被解析之后**，解析守卫就被调用。
>
> 全局解析守卫是在组件内守卫运行**后**运行

```js
rou.beforeResolve((to, from, next) => {  //rou为全局路由对象
    console.log("全局解析守卫 - beforeResolve")
    next();
})
```

### 全局后置钩子

> 你也可以注册全局后置钩子，然而和守卫不同的是，这些钩子不会接受 `next` 函数也不会改变导航本身

```js
router.afterEach((to, from) => {
  // ...
})
```

### 路由独享守卫

> 你可以在路由配置上直接定义 `beforeEnter` 守卫：
>
> 这个守卫与 **全局前置守卫** `beforeEach` 的方法参数是一样的
>
> [beforeEnter]：和 `beforeEach` 完全相同，如果都设置则在 `beforeEach` 之后紧随执行，参数 `(to,from,next)`

```js
const router = new VueRouter({
  routes: [
    {
      path: '/foo',
      component: Foo,
      beforeEnter: (to, from, next) => {
        // ...
      }
    }
  ]
})
```

### 组件内的守卫

> 在组件自己特有的钩子函数

* `beforeRouteEnter`
* `beforeRouteUpdate `   (2.2 新增)
* `beforeRouteLeave`

```js
export default {
  name: '-----',
  beforeRouteEnter(to, from, next){
    console.log("组件内守卫 - beforeRouteEnter ");
    next();
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
  },
  beforeRouteUpdate(to,from ,next){
    console.log("组件内守卫 - beforeRouteUpdate");
    next()
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
  },
  beforeRouteLeave(to, from, next){
    console.log("组件内守卫 - beforeRouteLeave");
    next()
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
  }
}
```

> `beforeRouteEnter` 守卫 **不能** 访问 `this`，因为守卫在导航确认前被调用，因此即将登场的新组件还没被创建。
>
> 不过，你可以通过传一个回调给 `next`来访问组件实例。在导航被确认的时候执行回调，并且把组件实例作为回调方法的参数。

```js
beforeRouteEnter (to, from, next) {
  next(vm => {
    // 通过 `vm` 访问组件实例
  })
}
```

> `beforeRouteUpdate ` 和 `beforeRouteLeave` **this** 可用，所以没有 vm 作为回调方法的参数

### next(false)

> 给 `next()` 传递 **false** 打断他的跳转

### 导航解析流程

**钩子函数执行后输出**--进入

<table>
<tr><td>全局前置守卫：beforeEach</td></tr>
<tr><td>路由独享守卫：beforeRouteEnter</td></tr>
<tr><td>组件路由守卫：beforeRouteEnter，此时this不指向组件</td></tr>
<tr><td>全局解析守卫 : beforeResolve</td></tr>
<tr><td>全局后置守卫：afterEach</td></tr>
<tr><td>---- 生命周期</td></tr>
</table>



* 【全局的】：是指路由实例上直接操作的钩子函数，他的特点是 **所有路由** 配置的组件都会触发，直白点就是触发路由就会触发这些钩子函数，钩子函数按执行顺序包括beforeEach、beforeResolve（2.5+）、afterEach三个。
  * `beforeEach`
  * `beforeResolve`
  * `afterEach`
* 【路由独享的】是指在 **单个路由配置** 的时候也可以设置的钩子函数，其位置就是下面示例中的位置，也就是像Foo这样的组件都存在这样的钩子函数。目前他只有一个钩子函数beforeEnter。
  * `beforeEnter`
* 【组件内的】：是指在组件内执行的钩子函数，类似于组件内的生命周期，相当于为配置路由的组件添加的生命周期钩子函数。钩子函数按执行顺序包括beforeRouteEnter、beforeRouteUpdate (2.2+)、beforeRouteLeave三个。
  * `beforeRouteEnter`
  * `beforeRouteUpdate `
  * `beforeRouteLeave`

**路由进入时：**

> ```mermaid
> graph TD
> A[全局前置守卫 beforeEach] --> B[组件独享守卫 beforeRouteEnter]
> 	B --> C[beforeRouteEnter 组件内守卫]
>     C --> D[全局解析守卫 beforeResolve]
>     D --> F[全局后置钩子 afterEach]
>     F --> G[组件内生命周期]
>     G --> H[leave的next执行]
> ```

**路由更新时：**

因为不需要重新进入组件，路由独享守卫和组件内守卫enter也不会触发

>```mermaid
>graph TD
>A[全局前置守卫 beforeEach] --> B[beforeRouteUpdate 组件内守卫]
>	B --> C[全局解析守卫 beforeResolve]
>    C --> D[全局后置钩子 afterEach]
>    ```

**路由离开时：**

> ```mermaid
> graph TD
> A[beforeRouteLeave 组件内守卫] --> B[全局前置守卫 beforeEach]
> 	B --> C[全局解析守卫 beforeResolve]
>     C --> D[全局解析守卫 beforeResolve]
>     D --> F[全局后置钩子 afterEach]
> ```

### 完整的解析流程

1. 导航被触发。
2. 在失活的组件里调用 `beforeRouteLeave` 守卫。
3. 调用全局的 `beforeEach` 守卫。
4. 在重用的组件里调用 `beforeRouteUpdate` 守卫 (2.2+)。
5. 在路由配置里调用 `beforeEnter`。
6. 解析异步路由组件。
7. 在被激活的组件里调用 `beforeRouteEnter`。
8. 调用全局的 `beforeResolve` 守卫 (2.5+)。
9. 导航被确认。
10. 调用全局的 `afterEach` 钩子。
11. 触发 DOM 更新。
12. 调用 `beforeRouteEnter` 守卫中传给 `next` 的回调函数，创建好的组件实例会作为回调函数的参数传入。

## 路由元信息

> 定义路由的时候可以配置 meta 字段：

```js
new Router({
    // mode: "history",
    routes: [
        {
            path: "/home",
            name: 'home',
            component: home,
            meta: { title: "home页" },   // 用meta给每个组件传入不同的title
            children: [{
                path: "home-one",
                component: homeOne,
                meta: { title: "home子页1" }
            }, {
                path: "home-two",
                component: homeTwo,
                meta: { title: "home子页2" }
            }, {
                path: "home-three",
                component: homeThree,
                meta: { title: "home子页3" }
            }]
        }
    ]
})
```

> routes 配置中的每个路由对象为 **路由记录**。路由记录可以是嵌套的，因此，当一个路由匹配成功后，他可能匹配多个路由记录
>
> 一个路由匹配到的**所有路由记录**会暴露为 `$route` 对象 (还有在导航守卫中的路由对象) 的 `$route.matched` **数组**。因此，我们需要遍历 `$route.matched` 来检查路由记录中的 **meta** 字段。
>
> `$route.matched` 是数组，可以使用数组方法遍历。
>
> 或者组件内 `this.$route.meta` 只包含**当前组件 meta 记录**
>
> `$route.meta` 用于直接访问当前路由的元信息，而 `$route.matched` 用于访问当前路由链中所有路由的记录，包括它们的 `meta` 信息。
>
> 我们可以使用全局守卫来获得 meta 字段，这样可以包含多个 meta，也可以在组件内来访问特定 meta
>
> 使用：例如在 meta 里面传递 title 属性和 keepAlive 属性再打开页面时根据 meta 里的 title 动态修改页面 title，根据 keepAlive 选择是否开启缓存

```js
// 使用全局前置守卫访问
router.beforeEach((to, from, next) => {
  	console.log(to.matched)   //这里包含页面的所有meta
    console.log(to.meta)      //则是只包含当前最先访问的路由的meta字段
    next() // 确保一定要调用 next()
})
```

```js
// 组件内
mounted() {
  console.log(this.$route.meta);
  box.title = this.$route.meta.title;// 获取并使用meta
},
```

## 过渡动效

> 给路由进入或离开时设置动画特效

### 单个路由过渡

> `<router-view>` 是基本的动态组件，所以我们可以用 `<transition>` 组件给它添加一些过渡效果：

```html
<transition>  <!-- 过渡动画组件包裹 -->
  <router-view></router-view>
</transition>
```

### 路由动态过渡

**官方案例：**

> 还可以基于当前路由与目标路由的变化关系，动态设置过渡效果：

```html
<!-- 使用动态的 transition name -->
<transition :name="transitionName">  //name动态
  <router-view></router-view>
</transition>
```

```js
// 接着在父组件内
// watch $route 决定使用哪种过渡
watch: {
  '$route' (to, from) {
    /*以下用来判断是几级路由*/
    const toDepth = to.path.split('/').length
    const fromDepth = from.path.split('/').length
    this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
    //transitionName为动态绑定的name值
  }
}
```

## 数据获取

### 导航完成后获取数据

> 先完成导航，然后在接下来的组件生命周期钩子中获取数据。在数据获取期间显示“加载中”之类的指示。
>
> 例如生命周期 `created`

### 导航完成之前获取

> 导航完成前，在路由进入的守卫中获取数据，在数据获取成功后执行导航。
>
> 例如 `beforeRouteEnter` 在获取数据成功后调用 `next` 方法

## 滚动行为

> 使用前端路由，当切换到新路由时，想要页面滚到顶部，或者是保持原先的滚动位置，就像重新加载页面那样。 `vue-router` 能做到，而且更好，它让你可以自定义路由切换时页面如何滚动。
>
> **注意: 这个功能只在支持 `history.pushState` 的浏览器中可用。**
>
> 当创建一个 Router 实例，你可以提供一个 `scrollBehavior` 方法

```js
const router = new VueRouter({
  routes: [...],
  scrollBehavior (to, from, savedPosition) {
    // return 期望滚动到哪个的位置
  }
})
```

> `scrollBehavior` 方法接收 `to` 和 `from` 路由对象。第三个参数 `savedPosition` 当且仅当 `popstate` 导航 (通过浏览器的 前进/后退 按钮触发) 时才可用。
>
> 两个返回方式，一个返回**锚点**字符串，一个只返回**位置坐标**对象
>
> 这里的“锚点”是指元素的 `id` 属性
>
> - `{ x: number, y: number }`
> - `{ selector: string, offset? : { x: number, y: number }}` (offset 只在 2.6.0+ 支持)

**scrollBehavior参数**

| 参数          | 描述                                                         |
| ------------- | ------------------------------------------------------------ |
| to            | 跳转到哪                                                     |
| from          | 从哪跳转来                                                   |
| savedPosition | 当 **后退后** 或 **前进后** 那个页面本来保留的位置信息，返回{ x : -- , y : -- } |

**仅返回位置的方式**

```js
scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 }  //返回 x y 集合，每次页面跳转时定位到对应位置
}
```

**返回锚点信息**

```js
scrollBehavior(to, from, savedPosition) {
    return {
        selector:"#app"    //页面跳转时，移动到指定锚点位置
    }
}
```

> 当然返回锚点信息时，可以动态判断路由目标和相应的锚点

**互相搭配**

```js
scrollBehavior(to, from, savedPosition) {
    return {
        selector:"#app",    //页面跳转时，移动到指定锚点位置
        x:0,    //返回位置
        y:0
    }
}
```

> 有锚点就到锚点位置，没有就跳到坐标位置

### 异步滚动

> 你也可以返回一个 Promise 来得出预期的位置描述

```js
scrollBehavior (to, from, savedPosition) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ x: 0, y: 0 })
    }, 500)
  })
}
```

### 平滑滚动

> 只需将 `behavior` 选项添加到 `scrollBehavior` 内部返回的对象中，就可以为支持它的浏览器启用原生平滑滚动

```js
scrollBehavior (to, from, savedPosition) {
  if (to.hash) {
    return {
      selector: to.hash,
      behavior: 'smooth',
    }
  }
}
```

**behavior属性**

| 属性接受值 | 描述             |
| ---------- | ---------------- |
| smooth     | 平滑滚动         |
| auto       | 直接跳到指定位置 |

## 路由懒加载

> 路由懒加载是针对于 **webpack打包** 来说，将组件切片，让单页面vue程序不用一次性加载这么多路由组件，当要路由跳转时，才进行组件加载
>
> 当打包构建应用时，JavaScript 包会变得非常大，影响页面加载。如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就更加高效了。
>
> 结合 Vue 的异步组件 (opens new window)和 Webpack 的代码分割功能 (opens new window)，轻松实现路由组件的懒加载。
>
> 首先，可以将异步组件定义为返回一个 Promise 的工厂函数 (该函数返回的 Promise 应该 resolve 组件本身)：

```js
const Foo = () =>
    Promise.resolve({
    /* 组件定义对象 */
})
```

> 第二，在 Webpack 2 中，我们可以使用动态 import (opens new window)语法来定义代码分块点 (split point)：

```js
const Foo = () => import('./Foo.vue')
```

> 在路由配置中什么都不需要改变，只需要像往常一样使用 Foo：

```js
const router = new VueRouter({
  routes: [{ path: '/foo', component: Foo }]
})
```

```js
//原始导入
import home from "@/components/home.vue"
//懒加载方式导入
var home = () => import ("@/components/Home.vue")
```

> 定义为一个方法，跳转时执行方法加载组件，达成懒加载效果

### 把组件按组分块

> 有时候我们想把某个路由下的所有组件都打包在同个异步块 (chunk) 中。只需要使用 命名 chunk (opens new window)，一个特殊的注释语法来提供 chunk name (需要 Webpack > 2.4)。

```js
const Foo = () => import(/* webpackChunkName: "group-foo" */ './Foo.vue')
const Bar = () => import(/* webpackChunkName: "group-foo" */ './Bar.vue')
const Baz = () => import(/* webpackChunkName: "group-foo" */ './Baz.vue')
//将所有懒加载组件分类到 group-foo 一起作为一个文件
```

> Webpack 会将任何一个异步模块与相同的块名称组合到相同的异步块中。
>
> 将组件分为一大块一大块，比起直接懒加载如果组件很小那么文件文件将会很多。

## 导航故障

> 当使用 `router-link` 组件时，Vue Router 会自动调用 `router.push` 来触发一次导航。 虽然大多数链接的预期行为是将用户导航到一个新页面，但也有少数情况下用户将留在同一页面上：<br>
>
> * 用户已经位于他们正在尝试导航到的页面
> * 一个导航守卫通过调用 next(false) 中断了这次导航
> * 一个导航守卫抛出了一个错误，或者调用了 `next(new Error())`
>
> 当使用 router-link 组件时，这些失败都**不会打印出错误**。然而，如果你使用 `router.push` 或者 `router.replace` 的话，可能会在控制台看到一条 "**Uncaught (in promise) Error**" 这样的错误，后面跟着一条更具体的消息。让我们来了解一下如何区分导航故障。

### 检测导航故障

> 导航故障是一个 Error 实例，附带了一些额外的属性。要检查一个错误是否来自于路由器，可以使用 `isNavigationFailure` 函数：

```js
import VueRouter from 'vue-router'
const { isNavigationFailure, NavigationFailureType } = VueRouter;
```

> `isNavigationFailure` 为检查是否是导航故障
>
> `NavigationFailureType` 是检查是哪种故障类别

```js
import VueRouter from 'vue-router'
const { isNavigationFailure, NavigationFailureType } = VueRouter
// 正在尝试访问 admin 页面
router.push('/admin').catch(failure => {   
    //catch路由报错时，将报错结果带入isNavigationFailure为参数
  if (isNavigationFailure(failure, NavigationFailureType.redirected)) {
    	//如果报错类型是 NavigationFailureType.redirected 则会执行
      console.log("报错了")
  }
})
```

> 如果忽略第二个参数：`isNavigationFailure(failure)`，那么就只会检查这个错误是不是一个导航故障，返回结果是 **false** 或 **true**
>
> `isNavigationFailure(failure)` 判断是否是导航故障
>
> `isNavigationFailure(failure, NavigationFailureType.duplicated)` 判断是否是导航故障其中的一项

### 故障类别

> `NavigationFailureType` 可以帮助开发者来区分不同类型的导航故障。有四种不同的类型：
>
> - `redirected`：在导航守卫中调用了 `next(newLocation)` 重定向到了其他地方。
> - `aborted`：在导航守卫中调用了 `next(false)` 中断了本次导航。
> - `cancelled`：在当前导航还没有完成之前又有了一个新的导航。比如，在等待导航守卫的过程中又调用了 `router.push`。
> - `duplicated`：导航被阻止，因为我们已经在目标位置了。

```js
this.$router.push("/news").catch(failure => {
    if (isNavigationFailure(failure, NavigationFailureType.redirected)) {
       console.log("报错了 redirected")
    }else if(isNavigationFailure(failure, NavigationFailureType.aborted)) {
       console.log("报错了 aborted")
    }else if(isNavigationFailure(failure, NavigationFailureType.cancelled)) {
       console.log("报错了 cancelled")
    }else if(isNavigationFailure(failure, NavigationFailureType.duplicated)) {
       console.log("报错了 duplicated")
    }
})
```

### 导航故障的属性

> 所有的导航故障都会有 **to** 和 **from** 属性，分别用来表达这次失败的导航的目标位置和当前位置。

```js
// 正在尝试访问 admin 页面
router.push('/admin').catch(failure => {
  if (isNavigationFailure(failure, NavigationFailureType.redirected)) {
    failure.to.path // '/admin'
    failure.from.path // '/'
  }
})
```

> 在所有情况下，**to** 和 **from** 都是规范化的路由位置。

## 路由结构

```js
const R = new VueRouter({
  mode: "history", // 使用HTML5 History模式，不依赖URL的hash部分。
  base: '/app/', // 应用部署在/app/路径下，设置base以确保路由正确解析。
  routes: [
    { path: "/", redirect: "/name"}, // 根路径重定向到/name。
    { 
      path: "/A", 
     	name: "A", 
     	component: A
    }, // 路径/A对应组件A，并命名为A。
    { 
      path: "/B/:id/:name", 
     	name: "B",
     	component: B, // 路径/B/:id/:name携带动态参数。
      meta: { ... }, // 传递额外的元数据。
      props: true, // 将路由参数以props形式传递给组件。
      children: [{ ... }] // 子路由配置。
    },
    { 
      path: "/C",
     	alias: "/B",
     	component: C, // 路径/C别名为/B，对应组件C。
    },
    { 
      path: "/D",
      component: { // 命名视图组件。
      default: "D",
      viewA: D,
      props: { 
        default: true,
        viewA: route => ({ propA: route.query.propA })
      }, // 命名视图组件的props配置。
    }, 
    scrollBehavior(to, from, savedPosition) { // 路由跳转时的滚动行为。
      return {
        selector: "#app", // 滚动到指定元素。
        x: 0, // 水平方向位置。
        y: 0, // 垂直方向位置。
        behavior: 'smooth' // 滚动行为，平滑滚动。
      };
    }
  }
});

// 全局守卫
R.beforeEach((to, from, next) => { ... }); // 路由跳转前执行。
R.beforeResolve((to, from, next) => { ... }); // 路由解析前执行。
R.afterEach((to, from) => { ... }); // 路由跳转后执行。
```

```js
// 组件内
export default {
  data() {
    return {};
  },
  watch: {
    '$route'(to, from) { }// 对路由变化作出响应...
  },
  beforeRouteUpdate(to, from, next) {
    // 当路由发生变化，但该路由被复用时，会调用这个钩子。
    next();
  },
  beforeRouteEnter(to, from, next) {
    // 在渲染该组件的对应路由被确认前调用。
    next();
  },
  beforeRouteLeave(to, from, next) {
    // 导航离开该组件的对应路由时调用。
    next();
  }
};
```
