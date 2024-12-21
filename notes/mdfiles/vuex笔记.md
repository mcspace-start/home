# Vuex


> vuex 是基于 vue 框架的一个状态管理库。可以管理复杂应用的数据状态，比如兄弟组件的通信、多层嵌套的组件的传值等等。
>
> 简单说是一个用于存储数据的”数据库“，更便于管理

## 安装

**CDN**

 ```html
 <script src="/path/to/vue.js"></script>
 <script src="/path/to/vuex.js"></script>
 ```

**NPM**

```sh
npm install vuex --save
```

**Yarn**

```sh
yarn add vuex
```

### 配置

> **CLI**

`main.js`

```js
import Vue from 'vue'
import App from './App'
import store from './store/index.js'

Vue.config.productionTip = false  //阻止启动生产消息

/* eslint-disable no-new */
new Vue({
    el: '#app',
    store,        //使用store插件，等同于 stroe:store
    components: { App },
    template: '<App/>'
})
```

`src/store/index.js`

```js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
    state: {			 //state是数据存储中心
        count: 0;        //配置数据
    },
    mutations: {
        increment(state) {    //配置触发方法
            state.count++;
        }
    }
})
export default store;
```

## 核心概念

### State

> state就是数据源存放地。
>
> 应用将仅仅包含一个 **store** 实例。
>
> 每当 `store.state.count` 变化的时候, 都会重新求取计算属性，并且触发更新相关联的 DOM。
>
> store 在main注册全局后可以直接使用 `this.$store` 访问 store实例

```js
const Counter = {
  template: `<div>{{ count }}</div>`,   //使用count方法
  computed: {
    count () {
      return this.$store.state.count  //获取state下count数据
    }
  }
}
```

#### mapState 辅助函数

> mapState 辅助函数
>
> 当一个组件需要获取多个状态的时候，将这些状态都声明为计算属性会有些重复和冗余。为了解决这个问题，我们可以使用 `mapState` 辅助函数帮助我们生成计算属性
>
> mapState辅助函数就是把 state 的数据映射到组件里来，不用老是 `this.$store.count`，可以直接 count
>
> 省略字数节省时间，更方便的执行函数

```js
// 在单独构建的版本中辅助函数为 Vuex.mapState
import { mapState } from 'vuex' //解构赋值 mapState 固定写法

export default {
  // ...
  computed: mapState({     //直接在computed内使用 mapState 而不是 computed:{}
     //各种写法
     //1   普通写法
     count : function(state){   //方法默认传递一个 state 参数
         //1.1
         return this.$store.state.count;  //最容易理解的赋值，定义count返回store里的count
     	 //1.2
         return state.count; //与上面效果相同，这次是利用 state 参数来返回值
     },
     //2  ES6写法
     count(state){	
         //2.1
         return this.$store.state.count;    //...
     	 //2.2
         return state.count; //...
     },
     //3  箭头函数写法
     count:state => state.count,  //因为箭头函数this指向不同所有这里就没有this写法了
         
     //4 字符串写法
     count : "count"
  })
}
```

> 如果computed需要使用 `this` 获取局部状态，必须使用常规函数，用 state 来引用数据
>
> 当映射的计算属性的名称与 state 的子节点名称相同时，我们也可以给 mapState 传一个字符串数组。
>
> 也就是这边接受变量名与store变量名相等，可以有不一样的写法：

```js
computed: mapState([   //注意此时mapState的参数不是对象而是数组
  // 映射 this.count 为 store.state.count
  'count'
])
```

#### 对象展开运算符

> 如果想上那样的写法，计算属性只能对应一个 map 辅助函数，不能映射更多的辅助函数也不能在计算属性中写别的方法，使用对象展开运算符可以解决这个问题
>
> `mapState` 函数返回的是一个对象。我们如何将它与局部计算属性 **混合使用** 呢？通常，我们需要使用一个工具函数将多个对象合并为一个，以使我们可以将最终对象传给 `computed` 属性。但是自从有了对象展开运算符 ，我们可以极大地简化写法：

```js
computed:{
    sum:function(var1,var2){    //其他的计算属性
    //...
    }
    ...mapState(['count']),     //使用对象展开符将mapState定义的值展开混合到computed里
    //...mapState({count:state =>state.count})  //mapState语法与上面一样不变
    ...mapGetters(['fn'])
}
```

> 控制台报黄色警告的话把 `import { mapState } from 'Vuex'` 中的 Vuex 改成小写的 vuex

### Getters

> Vuex 允许我们在 store 中定义“getter”（可以认为是 store 的计算属性）。就像计算属性一样，getter 的返回值会根据它的依赖被 **缓存** 起来，且只有当它的 **依赖值** 发生了改变才会被重新计算。
>
> getters主要是从state之中派生出的额外的状态。类似于vue对象之中的computed了。getters对象之中的每一个元素都是一个方法，传递state对象作为参数。并且getters是会缓存相关的计算数据的，**并会随着state的变化而做出相应改变的**。
>
> Getter 接受 state 作为其 **第一个参数**。

```js
const store = new Vuex.Store({
  state: {
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false }
    ]
  },
  getters: {
    doneTodos: state => {  //getters可以通过参数 state 访问 state 数据
      return state.todos.filter(todo => todo.done)   //进行数据过滤
    }
  }
})
```

#### 通过属性访问

>  和 State 一样 Getter 会暴露为 `store.getters` 对象，你可以以属性的形式访问这些值：

```js
store.getters.doneTodos // 输出 -> [{ id: 1, text: '...', done: true }]
// this.$store.getters.doneTodes
```

> Getter 也可以接受其他 getter 作为 **第二个参数**：

```js
 getters: {
    doneTodos: state => {
        return state.todos.filter(todo => todo.done)
    },
    doneTodosCount(state, getters) { // 第二个参数可以访问gettr，这里的getters是所有的getter
        return getters.doneTodos.length
    }
}
```

> 注意，getter 在通过属性访问时是作为 Vue 的响应式系统的一部分缓存其中的

```js
getters: {
    todosRandom(state) {
        return state.nub + "--" + Math.random();
        //结果将缓存起来，每次调用结果都一样，随机数并不会变，除非依赖的nub发生改变
        //才会重新计算
    }
}
```

#### 通过方法访问

> 你也可以通过让 getter 返回一个函数，来实现给 getter 传参。在你对 store 里的数组进行查询时非常有用。

```js
getters: {
  // ...
  getTodoById: (state) => (id) => {
    return state.todos.find(todo => todo.id === id)
  }
  
  //es5写法
  getTodoById:function(state){
      return function(id){   //返回了一个方法
          return state.todos.find(todo => todo.id === id)
      }
  }
}
```

```js
store.getters.getTodoById(2) // 输出 -> { id: 2, text: '...', done: false }
```

> 注意，getter 在通过方法访问时，每次都会去进行调用，而不会缓存结果。

#### mapGetters

>  mapGetters 辅助函数仅仅是将 store 中的 getter 映射到局部计算属性：

```js
import { mapGetters } from 'vuex'
//和mapState导入一样
export default {
  // ...
  computed: {
  // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters([
      'doneTodosCount',
      'anotherGetter',
      // ...
    ])
  }
}
```

> 如果你想将一个 getter 属性另取一个名字，使用 **对象形式**：

```js
...mapGetters({
  // 把 `this.doneCount` 映射为 `this.$store.getters.doneTodosCount`
  doneCount: 'doneTodosCount'
})
```

```js
import { mapState, mapGetters } from "vuex"; //导入mapState和mapGetters
export default {
  name: "HelloWorld",
  computed: {
    ...mapState({          //mapState
      todos : "todos",
      nub : "nub",
    }),
    ...mapGetters({       //mapGetters
      getTodoById1:"getTodoById1",
    })
    //或者数组写法
    ...mapGetters(['getTodoById1'])
    
  }
};
```

>   **需要注意的是：**
>
>   mapGetters不同与mapState会提供一个 state 参数用于返回，mapGetters **不会提供 state 参数**
>
>   若像mapState写一个getters则会报错：<span style="color:red">[vuex] unknown getter</span>
>
>   **错误写法**
>
>   `{ getTodoById : getters => getters.getTodoById }`  // getters 是不存在的
>
>   **正确写法**
>
>   `[ 'getTodoById' ]`   // 字符串写法
>
>   `{ getTodoById : ‘getTodoById’ }`  // 键值对起名写法

### Mutations

> **更改 Vuex 的 store 中的状态的唯一方法是提交 mutation**。Vuex 中的 mutation 非常类似于事件：每个 mutation 都有一个字符串的 **事件类型 (type)** 和 一个 **回调函数 (handler)**。这个回调函数就是我们实际进行状态更改的地方，并且它会接受 state 作为第一个参数：

```js
const store = new Vuex.Store({
  state: {
    count: 1
  },
  mutations: {
    increment (state) {  //定义increment方法
      // 变更状态
      state.count++
    }
  }
})
```

> 需要使用 **commit** 来调用
>
> 你不能直接调用一个 mutation handler。这个选项更像是事件注册：“当触发一个类型为 increment 的 mutation 时，调用此函数。”要唤醒一个 mutation handler，你需要以相应的 type 调用 store.commit 方法：

```js
store.commit('increment')   // commit
```

#### 提交载荷

> 提交载荷（Payload）
>
> 你可以向 `store.commit` 传入额外的参数，即 mutation 的 **载荷（payload）**：
>
> 载荷就是向 mutations 里的方法进行传值

```js
// ...
mutations: {
  increment (state, n) {
    state.count += n   //state 为 store 里的state，接受一个参数 n
  }
}
```

```js
store.commit('increment', 10)  //使用commit来触发 mutations 里的方法并传递一个参数 10
```

> 在大多数情况下，载荷应该是一个**对象**，这样可以包含多个字段并且记录的 mutation 会更 **易读**：

```js
// ...
mutations: {
  increment (state, payload) {
    state.count += payload.amount
  }
}
```

```js
store.commit('increment', { amount: 10 })  //提交一个对象
```

#### 对象风格提交方式

> 提交 mutation 的另一种方式是直接使用包含 `type` 属性的对象：

```js
store.commit({
  type: 'increment',    //type 来指定对应的 mutation
  amount: 10  //需要传的值
})
```

>  以对象风格的方式提交的话，mutations接受的对象会带一个 **type** 属性，type指定mutation名称
>
> **Mutation 必须是同步函数，不能是异步函数**；如果写成异步 devtools 无法很好的进行状态的追踪，会造成状态改变的不可追踪，给调试带来困难。

#### 常量替代 Mutation 类型

> 使用常量替代 mutation 事件类型在各种 Flux 实现中是很常见的模式。这样可以使 linter 之类的工具发挥作用，同时把这些常量放在单独的文件中可以让你的代码合作者对整个 app 包含的 mutation 一目了然：

```js
// mutation-types.js
export const SOME_MUTATION = 'SOME_MUTATION'
```

```js
// store.js
import Vuex from 'vuex'
import { SOME_MUTATION } from './mutation-types'

const store = new Vuex.Store({
  state: { ... },
  mutations: {
    // 我们可以使用 ES2015 风格的计算属性命名功能来使用一个常量作为函数名
    [SOME_MUTATION] (state) {
      // mutate state
    }
  }
})
```

>  mutation 事件类型比较多的时候，我们可以使用常量替代 mutation
> 事件类型。同时把这些常量放在单独的文件中可以让我们的代码合作者对整个 app 包含的 mutation 一目了然
>
> ES6 允许字面量定义对象时，用方法二（表达式）作为对象的属性名，即把表达式放在方括号内。

```js
let propKey = 'foo';
 
let obj = {
  [propKey]: true,
  ['a' + 'bc']: 123
}

var lastWord = 'last word';
// 
var a = {
  'first word': 'hello',
  [lastWord]: 'world'
};
 
a['first word'] // "hello"
a[lastWord] // "world"
a['last word'] // "world"

//表达式用于定义方法名
let obj = {
  ['h' + 'ello']() {
    return 'hi';
  }
};
 
obj.hello() // hi
```

#### mapMutations

> mapMutations 辅助函数
>
> 你可以在组件中使用 `this.$store.commit('xxx')` 提交 mutation，或者使用 `mapMutations` 辅助函数将组件中的 methods 映射为 `store.commit` 调用（需要在根节点注入 `store`）。

```js
import { mapMutations } from 'vuex'

export default {
  // ...
  methods: {    //在 methods 里面映射 store 里mutations的方法
    ...mapMutations([
      'increment', // 将 `this.increment()` 映射为 `this.$store.commit('increment')`

      // `mapMutations` 也支持载荷：
      'incrementBy' 
// 将 `this.incrementBy(amount)` 映射为`this.$store.commit('incrementBy', amount)`
    ]),
    ...mapMutations({
      add: 'increment' // 将 `this.add()` 映射为 `this.$store.commit('increment')`
    })
  }
}
```

**使用：**

```js
export default {
  name: "HelloWorld",
  methods: {
    ...mapMutations(['add'])，
    /*
    ...mapMutations({
    	met : "add"  	//效果与上相同
  	})
  	*/
    addcount() {
      this.add(20);  // 直接this调用
    }
  }
};
```

> 要注意的是：
>
> mapMutations 对应的是 **methods**，应该在 methods 里面映射而不是 **computed**

### Actions

> Action 类似于 mutation，不同在于：
>
> - Action 提交的是 mutation，而不是 **直接变更状态**。
> - Action 可以包含任意 **异步** 操作。
>
> action 提供一个 `content` 参数带有 commit、dispatch和getters方法，可以直接使用content来触发mutations方法或访问state数据
>
> 通过action执行异步可以使 vue-devtools 插件更好监控到数据变化

```js
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  },
  actions: {
    increment (context) {  //context.commit || context.state ||  context.getters
      context.commit('increment') //用content.commit执行mutations里的方法 
    }
  }
})
```

> 可以使用解构参数来简化代码

```js
actions: {
  increment ({ commit }) {   //把content解构
    commit('increment')      //不解构的话则是 content.commit
  }
}
```

####  分发 Action

> Action 通过 `store.dispatch` 方法触发：

```js
this.$store.dispatch('increment')
```

**在action里面执行异步**

```js
actions: {
  incrementAsync ({ commit }) {
    setTimeout(() => {
      commit('increment')
    }, 1000)
  }
}
```

> Actions 支持同样的载荷方式和对象方式进行分发：

```js
// 以载荷形式分发
store.dispatch('incrementAsync', {
  amount: 10
})

// 以对象形式分发
store.dispatch({
  type: 'incrementAsync',  //方法名
  amount: 10               //传递参数
})
```

#### 在组件中分发 Action

> 也就是 mapAction 辅助函数，在 **methods** 中映射

```js
import { mapActions } from 'vuex'

export default {
  // ...
  methods: {   //在methods里面进行映射
    ...mapActions([
      'increment', // 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`

      // `mapActions` 也支持载荷：
      'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.dispatch('incrementBy', amount)`
    ]),
    ...mapActions({
      add: 'increment' // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
    })
  }
}
```

#### 组合 Action

> `store.dispatch` 可以处理被触发的 action 的处理函数返回的 Promise，并且 `store.dispatch` 仍旧返回 Promise：

```js
actions: {
    emitAdd({ commit }) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {    // 1秒后执行代码
                commit("add");
                resolve();
            }, 1000)
        })
    },
    show({ state }) {    //需要排队执行的目标
        console.log(state.count)   
    }
}
```

```js
methods: {
    ...mapActions(['emitAdd','show']),
    addcount() {
        this.emitAdd().then(()=>this.show())//实现异步顺序执行
    }
}
```

> 将方法转化成promise对象使用then进行异步顺序执行

在另一个 actions 可以这样：

```js
actions: {
  // ...
  actionB ({ dispatch, commit }) {
    return dispatch('actionA').then(() => {  //因为dispatch返回的是一个promise
      commit('someOtherMutation')
    })
  }
}
```

最后，如果我们利用 async / await，我们可以如下组合 action：

```js
// 假设 getData() 和 getOtherData() 返回的是 Promise

actions: {
  async actionA ({ commit }) {
    commit('gotData', await getData())  //等待getdate返回的数据作为传值传递给gotdata
  },
  async actionB ({ dispatch, commit }) {
    await dispatch('actionA') // 等待 actionA 完成
    commit('gotOtherData', await getOtherData())
  }
}
```

> **action 返回的是一个 promise 对象**
>
> 直接即可then但是因为他是立即resolve所以我们return一个promise对象可以使用我们自定义resolve
>
> async/await可以便于我们在 **Actions** 里面等待别的actions执行

### Modules

> 由于使用单一状态树，应用的所有状态会集中到一个比较大的对象。当应用变得非常复杂时，store 对象就有可能变得相当臃肿。
>
> 为了解决以上问题，Vuex 允许我们将 store 分割成 **模块（module）**。每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块——从上至下进行同样方式的分割：

```js
const moduleA = {  //模块A
  state: () => ({ ... }),
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}

const moduleB = {  //模块B
  state: () => ({ ... }),
  mutations: { ... },
  actions: { ... }
}

const store = new Vuex.Store({
  modules: {  // 导入模块
    a: moduleA,
    b: moduleB
  }
})

store.state.a // -> moduleA 的状态
store.state.b // -> moduleB 的状态
```

**分开文件写**

```js
//index.js
import moduleA from './moduleA.js'
import moduleB from './moduleB.js'
const store = new Vuex.Store({
    modules: {
        moduleA,  // 导入模块A
        moduleB   // 导入模块B
    }
})
```

```js
//moduleA.js
const moduleA = {
    state: () => ({
        id: 1
    })
}
export default moduleA;
```

```js
//moduleB.js
const moduleB = {
    state: () => ({
        id: 2
    })
}
export default moduleB;
```

> **state将会分别存储互不冲突** 
>
> **模块内 state 必须使用返回函数包裹**
>
> 打印全局state结果：

```js
//cosnole.log(this.$store.state)
state : {
    moduleA : {
        id : 1
    },
    moduleB : {
    	  id : 2
    }
}

```

> 但是对与 **getters** 不能重复命名否则将报错：<span style="color:red">duplicate getter key: fn</span>
>
> mutations 可以重命名，当组件 commit 执行 mutations 时，同名的 mutations 将会 **全部执行**
>
> 拥有命名命名空间 namespace 即使 getters 重名也不会冲突，下面会讲

#### 模块的局部状态

> 对于模块内部的 **mutation** 和 **getter**，接收的第一个参数是**模块的局部状态对象**。

```js
const moduleA = {
  state: () => ({     //需要使用方法返回state数据
    count: 0
  }),
  mutations: {
    increment (state) {
      // 这里的 `state` 对象是模块的局部状态
      state.count++
    }
  },
  getters: {
    doubleCount (state) {
      return state.count * 2
    }
  }
}
```

> 同样，对于模块内部的 **action**，局部状态通过 `context.state` 暴露出来，根节点状态则为 `context.rootState`：

```js
const moduleA = {
  // ...
  actions: {
    incrementIfOddOnRootSum ({ state, commit, rootState }) { //第三个参数为根节点 state
      if ((state.count + rootState.count) % 2 === 1) {
        commit('increment')
      }
    }
  }
}
```

> 对于模块内部的 **getter**，根节点状态会作为第三个参数暴露出来

```js
const moduleA = {
  // ...
  getters: {
    sumWithRootCount (state, getters, rootState) { //getters提供第三个参数 rootState
      return state.count + rootState.count
    }
  }
}
```

> 多个模块数据的mapState

```js
computed:{
  ...mapState({
      id : state => state.moduleA.id;   //需要带上指定模块名称
  })
}
```

> **要注意的是：**
>
> - 在模块内部的 **getter** 和 **actions **里的 **content** 都会提供第三个参数 为 **rootState** 来访问根节点数据
> - 模块内部定义顶  **getters** 不能与别的模块定义的 **getters** 重名
> - **mutations** 可以重名，当执行时则会全部执行，**actions** 和 **mutations** 一样
> - `mapState` 则需要指定模块名
>
> **当然这些都是默认没有命名空间的情况下，下面会讲到使用命名空间来解决冲突**

#### 命名空间

> 默认情况下，模块内部的 action、mutation 和 getter 是注册在 **全局命名空间** 的——这样使得多个模块能够对同一 mutation 或 action 作出响应。
>
> 也就是如果没有开启命名空间，模块内 **state、getters、mutations、actions** 都会映射到全局里面，会可能造成命名冲突
>
> 如果希望你的模块具有更高的封装度和复用性，你可以通过添加 `namespaced: true` 的方式使其成为带命名空间的模块。当模块被注册后，它的所有 getter、action 及 mutation 都会自动根据模块注册的路径调整命名。例如：

```js
const store = new Vuex.Store({
  modules: {
    account: {   //模块名
      namespaced: true,   //开启命名空间
      // 模块内容（module assets）
      state: () => ({ ... }), // 模块内的状态已经是嵌套的了，使用 `namespaced` 属性不会对其产生影响
      getters: {
        isAdmin () { ... } // -> getters['account/isAdmin'] 
                           //开启命名空间后需要带上模块名称加正斜杠然后方法名 
      },
      actions: {
        login () { ... } // -> dispatch('account/login')
      },
      mutations: {
        login () { ... } // -> commit('account/login')
      },

      // 嵌套模块
      modules: {
        // 继承父模块的命名空间，因为这里没有使用 namespaced
        myPage: {  //使用的是和父级一样的模块名称
          state: () => ({ ... }),
          getters: {
            profile () { ... } // -> getters['account/profile']  没有命名空间和父级一样写法
          }
        },
        // 进一步嵌套命名空间
        posts: {
          namespaced: true,   //嵌套的方法则需再加上一个子级名
          state: () => ({ ... }),
          getters: {
            popular () { ... } // -> getters['account/posts/popular']
          }
        }
      }
    }
  }
})
```

> 启用了命名空间的 getter 和 action 会收到局部化的 `getter`，`dispatch` 和 `commit`。换言之，你在使用模块内容（module assets）时不需要在同一模块内额外添加空间名前缀。更改 `namespaced` 属性后不需要修改模块内的代码。

```js
//moduleA.js
const moduleA = {
    namespaced: true,
    getters: {
        fn(state, getters, rootState, rootGetters) {
            getters['met']  //getters直接访问局部 met 不需要模块前缀
        },
        met() {
            console.log("met")
        }
    }
}
```

##### 命名模块访问全局

> 如果你希望使用全局 state 和 getter，`rootState` 和 `rootGetters` 会作为 **第三和第四个参数** 传入 getter，也会通过 `context` 对象的属性传入 action。
>
> 若需要在 **全局** 命名空间内分发 action 或提交 mutation，将 `{ root: true }` 作为第三参数传给 `dispatch` 或 `commit` 即可。
>
> 也就是如果局部 mutations 或 actions 和全局同名的情况下区分

```js
modules: {
  foo: {
    namespaced: true,   //开启命名空间
    getters: {
      // 在这个模块的 getter 中，`getters` 被局部化了
      // 你可以使用 getter 的第四个参数来调用 `rootGetters`
      someGetter (state, getters, rootState, rootGetters) {
          //getters访问局部方法
          //rootGetters访问全局方法，需要加上前缀
      },
      someOtherGetter: state => { ... }
    },

    actions: {
      // 在这个模块中， dispatch 和 commit 也被局部化了
      // 他们可以接受 `root` 属性以访问根 dispatch 或 commit
      someAction ({ dispatch, commit, getters, rootGetters,rootState }) {
          //提供一个rootGtters
        getters.someGetter // -> 'foo/someGetter'
        rootGetters.someGetter // -> 'someGetter'

        dispatch('someOtherAction') // -> 'foo/someOtherAction'  访问局部方法
        dispatch('someOtherAction', null, { root: true }) // -> 'someOtherAction' 访问根部
		
        commit('someMutation') // -> 'foo/someMutation'
        commit('someMutation', null, { root: true }) // -> 'someMutation'
        //风格化传值
        commit({
            type:'someMutation',
            val:"msg"
        },{
            root:true    //执行根actions方法
        })
      },
      someOtherAction (ctx, payload) { ... }
    }
  }
}
```

> 要注意的是，如果在局部模块内是通过 **this.dispatch** 或者 **this.commit** 执行的话则是全局，因为 **this** 指向全局；但如果直接使用参数 **dispatch** 来调用则是局部的，所以如果要使用 **dispatch** 来调用全局的方法话需要传递参数 `null, { root: true }`
>
> **null 是传参位置**，因为例子中没有传递参数所以设置为 null 

#####  命名模块注册全局

> 命名模块注册全局action
>
> 若需要在带命名空间的模块注册全局 action，你可添加 `root: true`，并将这个 action 的定义放在函数 `handler` 中。例如：

```js
{
  actions: {
    someOtherAction ({dispatch}) {
      dispatch('someAction')
    }
  },
  modules: {
    foo: {
      namespaced: true,
      actions: {
        someAction: {
          root: true,  //root和handler都是固定写法
          handler (namespacedContext, payload) { ... } // -> 'someAction'
          //namespacedContext为全局的content
        }
      }
    }
  }
}
```

> **root 和 handler 都是固定写法**
>
> 注册全局后改方法将提升，运行时也不需要前缀

##### 命名模块绑定函数

> 带命名空间的模块内绑定辅助函数
>
> 当使用 `mapState`, `mapGetters`, `mapActions` 和 `mapMutations` 这些函数来绑定带命名空间的模块时，写起来可能比较繁琐：

```js
computed: {
  ...mapState({
    a: state => state.some.nested.module.a,  //各级模块名称
    b: state => state.some.nested.module.b
  })
},
methods: {
  ...mapActions([
    'some/nested/module/foo', // -> this['some/nested/module/foo']()
    'some/nested/module/bar', // -> this['some/nested/module/bar']()
    }),
  ])
    //或者
  ...mapActions({
    fn : 'moduleB/addupdate'
  }),
}
```

> 简化绑定
>
> 对于这种情况，你可以将模块的空间名称字符串作为第一个参数传递给上述函数，这样所有绑定都会自动将该模块作为上下文（**必须开启命名空间**）。
>
> 于是上面的例子可以简化为：

```js
//简化写法
computed: {
  ...mapState('some/nested/module', {  //将模块路径作为第一个参数传递
    a: state => state.a,    //直接数据名称无需前缀
    b: state => state.b
  })
},
methods: {
  ...mapActions('some/nested/module', [  //将模块路径作为第一个参数传递
    'foo', // -> this.foo()
    'bar' // -> this.bar()
  ])
}
```

> 而且，你可以通过使用 `createNamespacedHelpers` 创建基于某个命名空间辅助函数。它返回一个对象，对象里有新的绑定在给定命名空间值上的组件绑定辅助函数：

```js
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions } = createNamespacedHelpers('some/nested/module')
//从导入时就已经初始化了路径对应的模块路径

export default {
  computed: {
    // 在 `some/nested/module` 中查找
    ...mapState({
      a: state => state.a,
      b: state => state.b
    })
  },
  methods: {
    // 在 `some/nested/module` 中查找
    ...mapActions([
      'foo',
      'bar'
    ])
  }
}
```

> createNamespacedHelpers 就是为了简化代码

#####  插件开发注意事项

> 如果你开发的插件（Plugin）提供了模块并允许用户将其添加到 Vuex store，可能需要考虑模块的空间名称问题。对于这种情况，你可以通过插件的参数对象来允许用户指定空间名称：

```js
// 通过插件的参数对象得到空间名称
// 然后返回 Vuex 插件函数
export function createPlugin (options = {}) {
  return function (store) {
    // 把空间名字添加到插件模块的类型（type）中去
    const namespace = options.namespace || ''
    store.dispatch(namespace + 'pluginAction')
  }
}
```

#### 模块动态注册

* store.registerModule      
* store.unregisterModule
* store.hasModule

> 在 store 创建**之后**，你可以使用 `store.registerModule` 方法注册模块：

```js
const store = new Vuex.Store({
    modules: {
        moduleA
    }
})
store.registerModule('moduleB', moduleB)   //将moduleB注册到store里面

//嵌套模块
store.registerModule(['moduleA', 'moduleAA'], {  //相当于 moduleA/moduleAA
    state: () => ({
        id: 1
    })
})
```

> 你也可以使用 `store.unregisterModule(moduleName)` 来动态卸载模块。注意，你不能使用此方法卸载静态模块（即创建 store 时声明的模块）。

```js
const store = new Vuex.Store({
    modules: {
        moduleA,
    }
})
store.registerModule('moduleB', moduleB)  //注册了moduleB模块

store.unregisterModule('moduleB')         //卸载了moduleB模块

console.log(store.hasModule('moduleB'))   //检查是否已经注册了某个模块

```

> preserveState 保留state
>
> `store.registerModule('a', module, { preserveState: true })`。

```js
store.registerModule('moduleB', moduleB)   //moduleB的state将一起注册到store

store.registerModule('moduleB', moduleB, { //moduleB的state将不会注册到store
    preserveState: true
})
```

#### 模块重用

> 有时我们可能需要创建一个模块的多个实例，例如：
>
> 如果我们使用一个纯对象来声明模块的状态，那么这个状态对象会通过引用被共享，导致状态对象被修改时 store 或模块间数据互相污染的问题。
>
> 实际上这和 Vue 组件内的 `data` 是同样的问题。因此解决办法也是相同的——使用一个函数来声明模块状态（仅 2.3.0+ 支持）：

```js
const MyReusableModule = {
  state: () => ({  //也就是 state 得是一个函数
    foo: 'bar'
  }),
  // mutation, action 和 getter 等等...
}
```

## 进阶

### 项目结构

> Vuex 并不限制你的代码结构。但是，它规定了一些需要遵守的规则：
>
> 1. 应用层级的状态应该集中到单个 store 对象中。
> 2. 提交 **mutation** 是更改状态的唯一方法，并且这个过程是同步的。
> 3. 异步逻辑都应该封装到 **action** 里面。
>
> 只要你遵守以上规则，如何组织代码随你便。如果你的 store 文件太大，只需将 action、mutation 和 getter 分割到单独的文件。
>
> 对于大型应用，我们会希望把 Vuex 相关代码分割到模块中。下面是项目结构示例：

```sh
├── index.html
├── main.js
├── api
│   └── ... # 抽取出API请求
├── components
│   ├── App.vue
│   └── ...
└── store
    ├── index.js          # 我们组装模块并导出 store 的地方
    ├── actions.js        # 根级别的 action
    ├── mutations.js      # 根级别的 mutation
    └── modules
        ├── cart.js       # 购物车模块
        └── products.js   # 产品模块
```

### 插件

这里没有深入了解插件，插件请看 [vuex 插件](https://vuex.vuejs.org/zh/guide/plugins.html)

### 严格模式

> 开启严格模式，仅需在创建 store 的时候传入 `strict: true`：

```js
const store = new Vuex.Store({
  // ...
  strict: true
})
```

> 在严格模式下，无论何时发生了状态变更且不是由 mutation 函数引起的，将会抛出错误。这能保证所有的状态变更都能被调试工具跟踪到。

**开发环境与发布环境**

> **不要在发布环境下启用严格模式**！严格模式会深度监测状态树来检测不合规的状态变更——请确保在发布环境下关闭严格模式，以避免性能损失。
>
> 类似于插件，我们可以让构建工具来处理这种情况：

```js
const store = new Vuex.Store({
  // ...
  strict: process.env.NODE_ENV !== 'production'
})
```

> process.env.NODE_ENV 是node.js语法 
>
> 属性返回的是一个包含用户环境信息的对象，开发模式(development)或者生产模式(production)

### 表单处理

> 当在严格模式中使用 Vuex 时，在属于 Vuex 的 state 上使用 `v-model` 会比较棘手：

```js
<input v-model="obj.message">
```

> 假设这里的 `obj` 是在计算属性中返回的一个属于 Vuex store 的对象，在用户输入时，`v-model` 会试图直接修改 `obj.message`。在严格模式中，由于这个修改不是在 mutation 函数中执行的, 这里会抛出一个错误。
>
> 也就是不应该组件内 **直接修改** state信息，而是应该触发方法来代替
>
> 用“Vuex 的思维”去解决这个问题的方法是：给 `<input>` 中绑定 value，然后侦听 `input` 或者 `change` 事件，在事件回调中调用一个方法:

```html
<input :value="message" @input="updateMessage">
```

```js
// ...
computed: {
  ...mapState({
    message: state => state.obj.message
  })
},
methods: {
  updateMessage (e) {
    this.$store.commit('updateMessage', e.target.value)//触发mutations方法
  }
}
```

> 下面是 mutation 函数：

```js
// ...
mutations: {
  updateMessage (state, message) {
    state.obj.message = message  //利用mutations来更改数据，vuex则不会报错
  }
}
```

#### 双向绑定

> 利用计算属性来实现双向绑定

```html
<input v-model="message">
```

```js
// ...
computed: {
  message: {   //在computed利用get set封装好对应执行的方法
    get () {
      return this.$store.state.obj.message
    },
    set (value) {  //set调用updateMessage修改
      this.$store.commit('updateMessage', value)
    }
  }
}
```

## 一个vuex例子

```js
const store = {
    state: {}, // 根状态，数据存放点
    getters: {}, // 定义getters，用于访问state中的数据
    mutations: {}, // 定义mutations，用于同步修改state中的数据
    actions: {}, // 定义actions，用于处理异步操作
    modules: { // 定义模块
        modeA: { // 定义一个名为modeA的模块
            namespaced: true, // 开启命名空间，使得该模块下的state、getters等都具有唯一性
            state() { return {}; } // modeA模块的状态
        }
    },
    strict: true // 开启严格模式，用于开发阶段捕捉状态管理错误（生产环境建议关闭）
}
```

## 归纳

> - **state**
>
>   　Vuex 使用单一状态树，用一个对象就包含了全部的应用层级状态。作为一个“唯一数据源”而存在，存放组件中的状态。
>
> - **getter**
>
>   getter 的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算（可以认为是 store 的计算属性）。
>
>   - 接受 state 作为第一个参数
>   - 接受其他 getter 作为第二个参数
>
> - **mutation**
>
>   更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。每个 mutation都有一个字符串的 事件类型 (type) 和 一个 回调函数 (handler) 。
>
>   - mutation 必须是同步函数
>   - 接受 state 作为第一个参数
>   - mutation handler，需要以相应的 type 调用 store.commit 方法
>   - 在组件中使用 this.$store.commit('xxx'[, args1, args2...]) 提交 mutation
>
> - **action**
>
>   - 通过 store.dispatch 方法触发。
>   - action 提交的是 mutation，而不是直接变更状态。
>   - action 可以包含任意异步操作。
>   - 接受一个与 store 实例具有相同方法和属性的 context 对象，因此可以调用 context.commit 提交一个 mutation，或者通过 context.state 和 context.getters 来获取 state 和 getters。
>
> - **module**
>
>   * 当应用变得非常复杂时，store对象就有可能变得相当臃肿。为了解决以上问题，Vuex允许我们将store分割成模块（module）。每个模块拥有自己的state、mutation、action、getter、甚至是嵌套子模块——从上至下进行同样方式的分割
>   * module.mutation
>     - 接收的第一个参数是模块的局部状态对象
>   * module.getter
>     - 模块内部的 getter,第一个参数是模块的局部状态对象,第二个参数是模块的局部geeter,第三个参数是根节点状态
>   * module.action
>     - 对于模块内部的 action，第一个参数contextstore 实例具有相同方法和属性的 context 对象,state局部状态通过 context.state 暴露出来，根节点状态则为 context.rootState
>
> **辅助函数**
>
> * **mapState**
>
> * **mapGetters**
>
> * **mapMutations**
>
> * **mapActions**
>
>   * import {mapState,mapGetters,mapActions,mapMutations} from 'vuex'
>
>   　　export default {
>
>   　　　　computed: {
>
>   　　　　　　 ...mapGetters({ num2: 'filterCount' }),
>
>   　　　　　　 ...mapState(['count']),
>
>   　　　　 },
>
>   　　　　methods: {
>
>   　　　　　　...mapActions({ addHandle: 'addAction' }),
>
>   　　　　　　...mapMutations({ deHandle:'deIncrement' })
>
>   　　　　 }
>
>   　    }

归纳摘抄于 [vuex的理解](https://www.cnblogs.com/0314dxj/p/11121302.html)
