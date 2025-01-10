# vue3

## setup

> 使用`<script setup>` 则不需要导出vue实例
>
> 要在组件模板中访问 ref，请从组件的 `setup()` 函数中声明并返回它们：

```js
import { ref } from 'vue'

export default {
  // `setup` 是一个特殊的钩子，专门用于组合式 API。
  setup() {
    const count = ref(0)

    // 将 ref 暴露给模板
    return {
      count
    }
  }
}
```

## 模板内调用函数

```html
<time :title="toTitleDate(date)" :datetime="date">
  {{ formatDate(date) }}
</time>
```

> vue3 内调用需要加括号，vue2 则不需要

## 响应式基础

* `ref` 引用
* `reactive` 响应式

`ref()` 接收参数，并将其包裹在一个带有 `.value` 属性的 ref 对象中返回：

```js
import { ref, reactive } from "vue"
var num = ref(20);
const obj = reactive([1,2])
const obj1 = reactive({name:"tom"})
```

在模板中使用 ref 时，我们 **不** 需要附加 `.value`。

```html
  <div class="game-board">
    {{ count }} // 不需要加value
  </div>
```

reactive不需要 `.value`

```js
const person = reactive({
  name: "lisi",
  age: 18,
});

console.log(person.name);
console.log(person.age);
```

## 计算属性

> `computed`
>
> 不需要加括号

```html
<div>
  {{ randomNum }}
  {{ randomNum }}
  {{ randomNum }}
</div>
```

```js
const randomNum = computed(function () {
  return Math.floor(Math.random() * 100);
});

//换种写法
function getRandomNum() {
  return Math.floor(Math.random() * 100);
}

// 使用具名函数作为computed的getter
const randomNum = computed(getRandomNum);
```

## 可写计算属性

```js
import { ref, computed } from 'vue'

const firstName = ref('John')
const lastName = ref('Doe')

const fullName = computed({
  // getter
  get() {
    return firstName.value + ' ' + lastName.value
  },
  // setter
  set(newValue) {
    // 注意：我们这里使用的是解构赋值语法
    [firstName.value, lastName.value] = newValue.split(' ')
  }
})
```

> vue3 里没有 `methods` 普通法方法即等效 methods

```html
  <div >
    {{ randomNum() }}
    {{ randomNum() }}
    {{ randomNum() }}
  </div>
```

```js
const randomNum = function(){
  return Math.floor(Math.random() * 100)
};
```

## 类样式绑定

### 组件绑定

> 如果你的组件有多个根元素，你将需要指定哪个根元素来接收这个 class。你可以通过组件的 `$attrs` 属性来指定接收的元素：

```html
<!-- MyComponent 模板使用 $attrs 时 -->
<p :class="$attrs.class">Hi!</p>
<span>This is a child component</span>
```

```html
<MyComponent class="baz" />
```

这将被渲染为：

```html
<p class="baz">Hi!</p>
<span>This is a child component</span>
```

> 使用 `$attrs` 获取父级属性
>
> 在Vue组件中，`$attrs` 包含了所有父作用域中未被 `props` 捕获的属性。
>
> 如果组件有多个根元素，属性将不会 **自动继承**，可以通过在元素上使用 `v-bind="$attrs"` 来继承。这样所有未被识别为 `props` 的属性都会被应用到这些元素上。
>
> `inheritAttrs` 是一个组件选项，用来控制组件的属性是否被继承到组件的根元素上。默认情况下为 `true`，会自动被应用到子组件模板中的**第一个**根元素上。如果子组件有多个根元素，那么这些属性将**不会应用**到任何根元素上

### 绑定数组

我们还可以给 `:style` 绑定一个包含多个样式对象的数组。这些对象会被合并后渲染到同一元素上：

```html
<div :style="[baseStyles, overridingStyles]"></div>
```

1. **同名样式合并**：如果数组中的多个样式对象包含相同的样式属性（即属性名相同），那么后面的样式对象的值会覆盖前面样式对象的值。
2. **不同名样式累加**：如果样式对象包含不同的属性，那么这些属性都会被保留，累加到最终的样式中。

## v-if v-for

> 当 `v-if` 和 `v-for` 同时存在于一个元素上的时候，`v-if` 会首先被执行。请查看[列表渲染指南](https://cn.vuejs.org/guide/essentials/list.html#v-for-with-v-if)获取更多细节。

- 在vue2中，v-for的优先级高于v-if
- 在vue3中，v-if的优先级高于v-for

## v-for

> 使用解构

```html
<li v-for="{ message } in items">
  {{ message }}
</li>
<!-- 有 index 索引时 -->
<li v-for="({ message }, index) in items">
  {{ message }} {{ index }}
</li>
```

你也可以使用 `of` 作为分隔符来替代 `in`，这更接近 JavaScript 的迭代器语法：

> 效果一样，没有区别

```html
<div v-for="item of items"></div>
```

### 使用范围值

`v-for` 可以直接接受一个整数值。在这种用例中，会将该模板基于 `1...n` 的取值范围重复多次。

```html
<span v-for="n in 10">{{ n }}</span>
```

> 注意此处 `n` 的初值是从 `1` 开始而非 `0`。

### key

> v-for默认是高效渲染,添加key使其可以跟踪，例如`v-move` 动画操作

```html
<div v-for="item in items" :key="item.id">
  <!-- 内容 -->
</div>
```

## 生命周期

1. `onBeforeMount`：在组件挂载之前调用。
2. `onMounted`：在组件挂载之后调用。
3. `onBeforeUpdate`：在组件更新之前调用。
4. `onUpdated`：在组件更新之后调用。
5. `onBeforeUnmount`：在组件卸载之前调用。
6. `onUnmounted`：在组件卸载之后调用。
7. `onActivated`：对于`<keep-alive>`缓存的组件，当组件被激活时调用。
8. `onDeactivated`：对于`<keep-alive>`缓存的组件，当组件被停用时调用。
9. `onErrorCaptured`：当捕获一个来自子孙组件的错误时被调用。
10. `onRenderTracked`：在依赖项被追踪时调用（调试用）。
11. `onRenderTriggered`：在依赖项被触发重渲染时调用（调试用）。

> 可多次调用

```js
onMounted(() => {
  const msg = "mounted1";
  console.log(msg + "准备好");
});
onMounted(() => {
  const msg = "mounted2";
  console.log(msg + "准备好");
});
```

## 侦听器

### watch

> 只能监听响应式数据

```js
let num = ref(99);
// 单个 ref
watch(num, (newVal, oldVal) => {
  // newVal会自动解析value
  console.log(newVal);
  console.log(oldVal);
});
```

### getter

1. **Getter 函数的作用**：在Vue的`watch`函数中，getter函数主要用于获取或计算响应式数据的状态。这个函数会在`watch`被创建时立即执行一次，以获取初始值，并且只要getter函数内部的响应式数据发生变化，Vue的响应式系统就会重新执行这个getter函数。
2. **响应式数据变化**：Vue的响应式系统会追踪getter函数内部使用的响应式数据（如`ref`、`reactive`对象的属性等）。当这些响应式数据的值发生变化时，Vue会自动重新执行getter函数。
3. **返回值**：每次getter函数执行后，它的返回值会被传递给`watch`的第二个参数——回调函数。这个回调函数会在getter函数的返回值发生变化时被调用。
4. **回调函数的执行**：回调函数不仅会在getter函数的返回值发生变化时执行，而且会接收到这个变化后的值作为参数。你可以在这个回调函数中执行任何逻辑，比如处理数据、执行副作用等。

```js
import { watch, ref } from 'vue';

// 创建两个响应式引用
const x = ref(1);
const y = ref(2);

// 使用 watch 函数来观察一个响应式源
watch(
  // 这是一个 getter 函数，它会在 watch 被创建时立即执行一次，并且只要这个函数内部的响应式数据（x.value 和 y.value）发生变化，Vue 的响应式系统就会重新执行这个函数。
  () => x.value + y.value,
  (sum) => {
    // 这是回调函数，它会在 getter 函数的返回值发生变化时被调用。
    // 当 x.value 或 y.value 发生变化时，这个函数会被触发，并且打印出 x 和 y 的最新和值。
    console.log(`sum of x + y is: ${sum}`);
  }
);

// 注意：这个注释说明了 watch 函数的工作原理：
// 1. getter 函数会立即执行一次以获取初始值。
// 2. Vue 的响应式系统会追踪 getter 函数内部使用的响应式数据（这里的 x.value 和 y.value）。
// 3. 当响应式数据的值发生变化时，getter 函数会被重新执行。
// 4. getter 函数的返回值（这里是 x 和 y 的和）会被作为参数传递给回调函数。
// 5. 回调函数会在 getter 函数的返回值发生变化时执行，你可以在这个函数中执行任何逻辑，比如处理数据、执行副作用等。
```

注意，你不能直接侦听响应式对象的`属性值`，例如:

```js
const obj = reactive({ count: 0 })

// 错误，因为 watch() 得到的参数是一个 number
watch(obj.count, (count) => {
  console.log(`Count is: ${count}`)
})
```

这里需要用一个返回该属性的 getter 函数：

```js
// 提供一个 getter 函数
watch(
  () => obj.count,
  (count) => {
    console.log(`Count is: ${count}`)
  }
)
```

### 深层侦听

```js
watch(()=>obj.count,(newValue,oldValue)=>{...},{deep:true})

watch(num, (val) => {
  console.log(val);
},{
  deep:2
});

```

1. 直接给 `watch()` 传入一个响应式对象，会隐式地创建一个深层侦听器——该回调函数在所有嵌套的变更时都会被触发

2. 直接传递对象是深层侦听 `watch(obj,(n,o)=>{...})`

3. 使用 getter 函数的是千层侦听 `watch(()=>obj.count,(n,0)=>{...})`

4. 加上 `{deep:true}` 可转化为深层侦听`watch(()=>obj.count,(n,0)=>{...},{deep:true})`

5. deep 可以使用数字表示层数 `{ deep:1 }`

6. 传递 `{ immediate: true }` 立即侦听一次

> `{ once: true }` 只侦听一次 immediate 也算一次

```js
watch(num,(val) => {
    console.log(val);
  },
  {
    once:true
  }
);
```

> 选项例子:

```js
watch(监控值,()=>{
  // 代码逻辑
},{
  immediate:false, // 立即侦听一次
  deep:false, // 深层侦听
  flush:"post", // 侦听时机  pre post sync
  once:false  // 只侦听一次
})
```

### watchEffect

```js
watchEffect(async()=>{
  return x.value++;     // 被侦听
})
```

> watchEffect 会侦听函数内要用到的响应式数据，并会立即执行一次侦听等于 `{ immediate: true }`
>
> watcheffect 不接受deep等参数
>
> watcheffect就类似于watch里的getter函数

### 副作用清理

> 有时我们可能会在侦听器中执行副作用，例如异步请求：

```js
watch(id, (newId) => {
  fetch(`/api/${newId}`).then(() => {
    // 回调逻辑
  })
})
```

```js
import { watch, onWatcherCleanup } from 'vue'

watch(id, (newId) => {
  const controller = new AbortController()

  fetch(`/api/${newId}`, { signal: controller.signal }).then(() => {
    // 回调逻辑
  })

  onWatcherCleanup(() => {
    // 终止过期请求
    controller.abort()
  })
})
```

`onWatcherCleanup`

```js
import { ref, watch, onWatcherCleanup } from "vue";
const add = () => {
  count.value++;
};
// watch
watch(count, () => {
  const timer = setTimeout(() => {
    console.log("watch");
  }, 1000);
  // 副作用清除
  onWatcherCleanup(() => {
    clearTimeout(timer);
  });
});
// watchEffect
watchEffect(() => {
  count.value;
  const timer = setTimeout(() => {
    console.log("watch");
  }, 500);
  onWatcherCleanup(() => {
    clearTimeout(timer);
  });
});
```

`onCleanup`

```js
// 作为 watch 的第三个传入参数
watch(count, (newV, oldV, onCleanup) => {
  const timer = setTimeout(() => {
    console.log("watch");
  }, 500);
  // 副作用清除
  onCleanup(() => {
    clearTimeout(timer);
  });
});
// 作为 watchEffect 的第一个传入参数
watchEffect((onCleanup) => {
  count.value;
  const timer = setTimeout(() => {
    console.log("watch");
  }, 500);
  onCleanup(() => {
    clearTimeout(timer);
  });
});
```

> `onWatcherCleanup`需要 **import** `onCleanup` 则是通过参数传入使用
>
> 他们两个在使用上没有什么区别，就是命名不一样

### flush

1. **'pre'**：默认值，在状态更新（`set`）之前同步执行
2. **'post'**：在状态更新（`set`）之后异步执行。
3. **'sync'**：在当前执行栈中同步执行，不等待异步操作。

> 默认情况下，用户创建的侦听器回调，都会在 Vue 组件更新**之前**被调用。这意味着你在侦听器回调中访问的 DOM 将是被 Vue 更新之前的状态。

如果想在侦听器回调中能访问被 Vue 更新**之后**的 DOM，你需要指明 `flush: 'post'` 选项：

```js
watch(source, callback, {
  flush: 'post'
})

watchEffect(callback, {
  flush: 'post'
})
```

```js
import { watch, ref } from 'vue';

const isVisible = ref(false);

watch(isVisible, (newVal) => {
  if (newVal) {
    // 这个回调会在DOM更新前执行，可能无法滚动到最新的DOM位置
    someElement.scrollIntoView();
  }
});
```

### watchEffect别名方法

同步触发的 `watchEffect()` 有个更方便的别名 `watchSyncEffect()`：

后置刷新的 `watchEffect()` 有个更方便的别名 `watchPostEffect()`：

```js
import { watchPostEffect } from 'vue'

watchPostEffect(() => {
  /* 在 Vue 更新后执行 */
})

import { watchSyncEffect } from 'vue'

watchSyncEffect(() => {
  /* 在响应式数据变化时同步执行 */
})
```

### 停止侦听

> 在 `setup()` 或 `<script setup>` 中用同步语句创建的侦听器，会自动绑定到宿主组件实例上，并且会在宿主组件卸载时自动停止。
>
> 一个关键点是，侦听器必须用**同步**语句创建：如果用异步回调创建一个侦听器，那么它不会绑定到当前组件上，你必须手动停止它，以防内存泄漏。如下方这个例子：

```html
<script setup>
import { watchEffect } from 'vue'

// 它会自动停止
watchEffect(() => {})

// ...这个则不会！
setTimeout(() => {
  watchEffect(() => {})
}, 100)
</script>
```

> 使用侦听器返回方法停止侦听

```js
const unwatch = watch(x,()=>{...})

//
unwatch()
```

## 模板引用

> `ref` 获取标签
>
> vue 中的定义的ref 变量必须和dom定义的ref值相同

```html
<p ref="myRef">这是一段标题</p>
```

```js
export default {
  name: "Person",
  mounted(){
    console.log(this.$refs.myRef); // 打印refs
  }
};
```

> 要在组合式 API 中获取引用，我们可以使用辅助函数 [`useTemplateRef()`](https://cn.vuejs.org/api/composition-api-helpers.html#usetemplateref) 

```js
import { onMounted, useTemplateRef } from "vue"; // 导入 useTemplateRef
const box = useTemplateRef("myRef");
// 要在元素渲染后获取
onMounted(() => {
  console.log(box.value);
});
```

### 函数模板引用

> 函数的形式绑定ref

```html
<p :ref="box">这是一段标题</p>
```

```js
const box = (el)=>{
  console.log(el);  // dom元素
}
```

### 组件上的 ref

1. **引入 `defineExpose`**： 在子组件中，你需要从 `vue` 包中引入 `defineExpose`。

   ```javascript
   import { defineExpose } from 'vue';
   ```
   
2. **使用 `defineExpose` 暴露属性或方法**： 在 `<script setup>` 中，调用 `defineExpose` 并传入一个对象，对象的键是你想要暴露的属性或方法的名称，值是实际的属性或方法。

   ```javascript
   const someData = ref(0);
   const someMethod = () => {
     // ...方法逻辑
   };
   
   defineExpose({
     someData,
     someMethod
   });
   ```
   
3. **在父组件中访问暴露的属性或方法**： 父组件可以通过模板引用（`ref`）来访问子组件暴露的属性或方法。

   ```html
   <template>
     <ChildComponent ref="childRef" />
   </template>
   
   <script setup>
   import ChildComponent from './ChildComponent.vue';
   const childRef = ref(null);
   
   // 访问子组件暴露的属性或方法
   const childData = computed(() => childRef.value.someData);
   const callChildMethod = () => childRef.value.someMethod();
   </script>
   ```

## 组件

```html
<template>
  <HelloWorld ref="myHello" /> // 组件
</template>
```

### 注册

#### 全局注册

```js
import MyComponent from './App.vue'

app.component('MyComponent', MyComponent)
```

链式调用

```js
app
  .component('ComponentA', ComponentA)
  .component('ComponentB', ComponentB)
  .component('ComponentC', ComponentC)
```

#### 局部注册

在使用 `<script setup>` 的单文件组件中，导入的组件可以直接在模板中使用，无需注册：

```vue
导入后直接使用
<script setup>
import ComponentA from './ComponentA.vue'
</script>

<template>
  <ComponentA />
</template>
```

如果没有使用 `<script setup>`，则需要使用 `components` 选项来显式注册：

```js
import ComponentA from './ComponentA.js'

export default {
  // 这是组合式api并非选项卡式api因为有setup()
  components: { 
    ComponentA
  },
  setup() {
    // ...
  }
}
```

> 局部注册的组件在后代组件中**不**可用。在这个例子中，`ComponentA` 注册后仅在当前组件可用，而在任何的子组件或更深层的子组件中都不可用。

### props

> 使用 definedProps
>

```html
<child msg="传递父级内容"></child>
```

```js
// 没有使用 setup 标签
export default {
  props: ['foo'], //捕获props
  setup(props) {
    // setup() 接收 props 作为第一个参数
    console.log(props.foo)
  }
}
```

> 使用`<script setup>`
>
> 不需要导入 `defineProps` 因为它是宏函数，可直接使用

```vue
<script setup>
  console.clear();
  const msg = defineProps(['msg'])
  console.log(msg);
</script>
```

规定类型

```js
// 使用 <script setup>
defineProps({
  title: String,
  likes: Number
})
```

#### 响应式 Props 解构 

```js
const { foo } = defineProps(['foo'])

watchEffect(() => {
  // 在 3.5 之前只运行一次
  // 在 3.5+ 中在 "foo" prop 变化时重新执行
  console.log(foo)
})
```

#### 将解构的 props 传递到函数中

当我们将解构的 prop 传递到函数中时，例如：

```js
const { foo } = defineProps(['foo'])

watch(foo, /* ... */)
```

> **无效**，因为它等价于 `watch(props.foo, ...)`——我们给 `watch` 传递的是一个值而不是响应式数据源。实际上，Vue 的编译器会捕捉这种情况并发出警告。

使用**getter**监听

```js
const props = defineProps(["count"]);

watch(()=>props.count,(newX) => {
    console.log(newX);
  },
  {deep: true}
);
```

watch监听整个props 

```js
const props = defineProps(["count"]);

watch(props,(newX) => {
    console.log(newX.count);
  },
  {deep: true}
);
```

使用 watchEffect 进行监听

```js
const { count } = defineProps(["count"]);
watchEffect(()=>{
    console.log(count);
})
```

#### props修改

> 与父级无关联

```js
const props = defineProps(['initialCounter'])

// 计数器只是将 props.initialCounter 作为初始值
// 像下面这样做就使 prop 和后续更新无关了
const counter = ref(props.initialCounter)
```

### 编译器宏

> 不用导入直接使用

1. **`defineProps`**：用于在 `<script setup>` 中声明组件的 props，替代传统的 `props` 选项 。
2. **`defineEmits`**：用于声明组件可以触发的事件，替代传统的 `emits` 选项 。
3. **`defineExpose`**：用于明确指定组件实例对外暴露哪些属性和方法 。
4. **`defineSlots`**：用于声明组件内部的插槽，替代传统的 `slots` 选项 。
5. **`defineOptions`**：用于声明组件的选项，如 `data`、`methods`、`computed` 等，主要用于向后兼容 。

`defineProps`

```vue
<child :title="'父级传递title'"></child>
```

```vue
<script setup>
// 获取父级传递的props
const { title } = defineProps(["title"]);
console.log(title);
</script>
```

`defineEmits`

```vue
<child @myEvent="show"> </child>
```

```vue
子级
<script setup>
const emit = defineEmits(['myEvent'])
emit("myEvent")
</script>
```

`defineSlots`

```vue
<script setup>
const slots = defineSlots()
console.log(slots); // 插槽
</script>
```

`defineOptions`

定义配置项

```vue
<script setup>
defineOptions({
  inheritAttrs: false, // 不继承属性
});
</script>
```

### 事件

#### $emit

> `$emit` 在子级触发父级事件

```html
父级内容
<template>
  <child @enlarge-text="postFontSize += 1" :style="{ fontSize: postFontSize + 'px' }" ></child>
</template>
```

```vue
子级内容
<template>
  <p :style="$attrs.style">子级内容</p>
  <!-- 模板内直接使用$emit -->
  <button @click="$emit('enlarge-text')">changeSize</button>
</template>
```

> 编译宏

```vue
<template>
  <p :style="$attrs.style">子级内容</p>
  <button @click="changeFontSize">changeSize</button>
</template>

<script setup>
console.clear();
const emit =  defineEmits(["enlarge-text"])
function changeFontSize(){
   emit("enlarge-text")
}
</script>
```

如果显式地使用了 `setup` 函数而不是 `<script setup>`，则事件需要通过 `emits`选项来定义，`emit` 函数也被暴露在 `setup()` 的上下文对象上：

```js
export default {
  emits: ['inFocus', 'submit'],
  setup(props, ctx) {
    ctx.emit('submit')
  }
}

export default {
  emits: ['inFocus', 'submit'],
  setup(props, { emit }) {
    emit('submit')
  }
}
```

### 组件v-model

> 组件上使用 `v-model` 实现父级和子级双向数据绑定

```vue
<template>
  <input type="text" name="" id="" v-model="msg" />
</template>

<script setup>
import { ref, watchEffect } from "vue";
const msg = ref(""); // 需要响绑定应式数据
// 监控msg变化
watchEffect(() => {
  console.log(msg.value);
});
</script>
```

使用 `definedModel`

```vue
<template>
  <div></div>
</template>
<script setup>
// 获取父级v-model
let msg = defineModel();
// 直接修改父级属性
msg.value = "子级修改内容"
</script>
```

#### 底层机制

`defineModel` 是一个便利宏。编译器将其展开为以下内容：

- 一个名为 `modelValue` 的 prop，本地 ref 的值与其同步；
- 一个名为 `update:modelValue` 的事件，当本地 ref 的值发生变更时触发。

在 3.4 版本之前，你一般会按照如下的方式来实现上述相同的子组件：

```vue
<!-- Child.vue -->
<script setup>
const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <input
    :value="modelValue"
    @input="emit('update:modelValue', $event.target.value)"
  />
</template>
```

然后，父组件中的 `v-model="foo"` 将被编译为：

```vue
<!-- Parent.vue -->
<Child
  :modelValue="foo"
  @update:modelValue="$event => (foo = $event)"
/>
```

如你所见，这显得冗长得多。然而，这样写有助于理解其底层机制。

> 配置项

```js
// 使 v-model 必填
const model = defineModel({ required: true })

// 提供一个默认值
const model = defineModel({ default: 0 })
```

```vue
<template>
  <input type="text" name="" id="" v-model="msg" />
</template>

<script setup>
let msg = defineModel({default:"默认内容"});
</script>
```

#### 参数

> `v-model` 带参数实际上是在父组件和子组件之间建立了一个自定义的双向绑定

```vue
父级
<template>
  <!-- 带参数v-model -->
  <person v-model:title="msg"></person>
</template>
<script setup>
  import Person from "./Person.vue";
  const msg = ref("父级")
</script>
```

```vue
子级
<template>
  <input type="text" name="" id="" v-model="title">
</template>

<script setup>
  const title = defineModel("title");
</script>
```

需要额外的 prop 选项，应该在 model 名称之后传递：

```js
const title = defineModel('title', { required: true })
```

多个 `v-model` 绑定

```vue
父级
<template>
  <!-- <child> </child> -->
  <person 
    v-model:title="titleData"
    v-model:msg="msg"
  ></person>
  {{ msg }}
  {{ titleData }}
</template>
<script setup>
  import Person from "./Person.vue";

  const titleData = ref("父级title")
  const msg = ref("父级msg")
</script>
```

```vue
子级
<template>
  <input type="text" name="" id="" v-model="title">
  <input type="text" name="" id="" v-model="msg">
</template>

<script setup>
  const title = defineModel("title");
  const msg = defineModel("msg");
</script>
```

### Attributes 继承

> 在 Vue 3 中，当父组件向子组件传递属性时，如果子组件只有一个根元素，那么这些属性（未被子组件的 props 声明吸收的属性）会自动被添加到这个**根元素**上
>
> 如果子组件有多个根元素，Vue 将**不会自动进行属性透传**。在这种情况下，你需要显式地使用 `$attrs` 来处理这些属性。`$attrs` 包含了所有未被识别为 props 的特性绑定，你可以通过 `v-bind="$attrs"` 将这些属性手动绑定到子组件中的特定元素上。
>
> 事件也一样
>

```vue
<template>
  <child :style="childCss"> </child>
</template>

<script setup>
import Child from "./Child.vue";
const childCss = {
  width:"100px",
  border:"1px solid black"
}
</script>
```

```vue
子级
<template>
只有一个根元素div会自动继承父级传递属性
  <div>
    <div class="box">box</div>
    <p class="title">title</p>
  </div>
  </template>
<style scoped>
.box {
  height: 100px;
  background: pink;
}
.title {
  color: blue;
}
</style>

```

#### 事件

```html
<child :style="childCss" @click="echo" > </child>
```

多个根元素

```vue
<template>
	多个跟元素，继承事件
    <div class="box" @click="$attrs.onClick" :style="$attrs.style" >box</div>
    <p class="title">title</p>
</template>
```

#### 深层组件继承

子组件内模板是另一个组件，只要是**一个根元素**就会自动继承

```vue
<!-- <MyButton/> 的模板，只是渲染另一个组件 -->
<BaseButton />
```

#### 禁用继承属性

> 使用 `definedOptions` 宏编译函数
>
> 与 vue2 一致

```js
defineOptions({
  inheritAttrs: true,
});
```

#### $attrs

> 没有参数的 v-bind 会将一个对象的所有属性都作为 attribute 应用到目标元素上。

使用v-bind继承所有属性包括事件

```vue
<child :style="childCss" @click="echo" @myEvent="show" > </child>
```

```vue
<template>
包括click事件
  <div v-bind="$attrs" class="box" :title="console.log($attrs)">box</div>
</template>
```

> ==注意：属性穿透只会穿透那些未被props的属性对吧==

#### setup访问透传属性

> 使用 `useAttrs`

```vue
<script setup>
import { useAttrs } from "vue";
console.log(useAttrs());
</script>
```

### 插槽

插槽就是将内容从父组件传递到子组件的模板中

> ![](data:image/png;base64,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)

父级

```vue
<template>
  <child>
    传递插槽内容
  </child>
</template>
```

子级

```vue
<template>
  <button>
    <!-- 子级插槽占位符 -->
    <slot/>❤
  </button>
</template>
```

####  渲染作用域

插槽内容可以访问到父组件的数据作用域，因为插槽内容本身是在父组件模板中定义的

```vue
<template>
  <child>
    <!-- 访问父级作用域内容 -->
    {{message}}
  </child>
</template>

<script setup>
  import { ref, reactive, watchEffect, watch } from "vue";
  import Child from "./Child.vue";
  
  const message = ref("父级作用域内容")
</script>
```

#### 默认内容

> 直接在`<slot>` 中书写内容就是默认内容

```vue
子级
<button type="submit">
  <slot>
    Submit <!-- 默认内容 -->
  </slot>
</button>
```

#### 具名插槽

```vue
父级
<template>
  <child>
    即使顺序错的，还是会按照具名渲染顺序
    <template v-slot:header> 头部内容 </template>
    <template v-slot:footer> 尾部内容 </template>
    <template v-slot:default> main 默认插槽 </template>
  </child>
</template>
```

```vue
子级
<template>
  <header>
    <slot name="header"></slot> 使用name具名
  </header>
  <main>
    <slot></slot>
  </main>
  <footer>
    <slot name="footer"></slot>
  </footer>
</template>
```

#### 简写

> `#`

```vue
父级
<child>
    <template #header> 头部内容 </template>
  </child>
```

```vue
子级
 <header>
    <slot name="header"></slot>
  </header>
```

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABWAAAAKACAYAAAASFNHRAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAANjNSURBVHgB7P1PkBtZnth5/p4jWMXM6t2KXBvrah1mC6w5SDIbKYPFzLHuuSSC1arKrJY6SV20rYMY/E+N2YgRZNeYlbpJIpIqyUxqMoJ92OLfJLiH6j01g9J2Mau2i4E8da8ymYxcjZmkwxaRO4ft7p2ZjJrKP8xmwN+8nzsceO5wIBARQASA+H7SIkE4/O9zB/z5z5//nggAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAYGQYAYAOrp56vyLGHEne29AePX/rlYoAAAAA2LIrZz7Qa/JHxtpSY5Ctm/Dg966/WhUAwNiYEAAAAABj6+rpx0+7j2FWrciqCcMlUyg8mLu+vyZj4OrJ989KYGa9QQ/O3TgwKwAAANuMACzG1sLMk0nZUz/UHGBkde7mK0sbmIUsnHmvJHVTbA74SmFpbnH/qmDL2sq2UKiOywUfAABDptj9Yxs/FheYkrXh4tVTT8rnbu6flxFnjX3JiCkm7902flXQ0cKp9w+5Q2GyOWCb6r1uufqyI8sed5QtAAwPArAYX3tl0lpz1xtSc38bCsDa0My4i5HmI/j1Z2s191IVbFm2bG29ftS9VAQAAOwsE5avnHr8i/M3DywKdo0wCM6mHoPfpnqvW67G/1PLNs+i5RIk3KKcsuV6BgB2SCAAAAAAdhE7q3nd9U//Ldbek/hGdZMxcmlh9smkAAAAYMsIwKLNVivbvUzfjwr9sF8UbMc2bmUZgyq/7dgvXBACALB5xhQeaKea+nfuxivXzt18ZcaYYFpsqsXhpP1cXltvXjtVF9mpusBOLJd6T2eubPpx7dJ1HltZRj/WL3e+Z57oX1EGaFDrDgC7lRGMrKunnhyxxs4k74NwbS6UYMoEwVkRO9UYXLMi1cAE853yay6c/PdT9SCYCcS8KakcYWZFrFk8d3P/vbZln35/0UrwcnPZL5jDrpJ+RGxYdkfVpDuwKnM3Dhz1p7ly8v0ZCYIjxrp1M0keomgZSyaQe9n1044TbBAc8pchz9amQlu4ZKT1GI3bviW3fXPJ9Lo9YTCx4NZh0isHtWp1ebpUcdt1Y/8D6eDKmcd33XoV0+uqCzMr1shqYO3K3M0Dc/40WkGxn8lZMeGMX45umVVjTSWvHJPlNMZcPX/jwOGrp5/o/ptprrvV9Q4qwYsyr/mamtvnrZsuw9rw2u9mcty2laExR60Vt5/DWW8da2KDSl6ut6un3q+4q7RWmoDQHtWLtfzttocy5Z177CXHTqeyTcohbxnueC/5+77bMQoAwG6j+dVD6+qBNvzw/M1Xy8nwq6cfW388F2zdl1cvdOfoJ+7T5rm823m//ZzcQ53TBYzqtj6bW+cUUzFGOnYAtpm6wJVT75Xdtl5qjplTP11P13V2yzUvunVu5NPUcUNr/fRXUf01m2/T1eEv6XY0B1j7wE/30KlO2W1bk/phc7k5ddV/c+K9UlAotMqjUT/tod77xM3r3JXT7+u14yNjCxVXd393q7n7r5z+IJpfvC7pZWvdNv6HfdeVTbm5nS4oqPlM3XVHz3VufzkSl80TVxc95/55KTOPZp3YfZf0fan9usMsu/r0sUzdVue/4F0b2WCv+YfROmqdu3Xd88SV6bW29TvzQaNcvfQPJjz4veuvVnvZbj0urNgV/7vn9qnO8+1e9utWyhYA0DtywI4wK2v7jASl5H0cdNQTd6qOXXRn3xkXnCu5k+r+tgrgGVcBdEHT/KbQerK2launP5g1L5hpf1progBaqTnq51YrfDN5IX2tRIaf2/vNdTNty5hyQcEZV2mdTlXkjOxPVbDdMlzFZsakt09ndyjavjNu+3T6gplMrVvLZDI/G4ZdKw/GihvPFtu2x62rDgpNeh20wm0/D5fd+MW2eekyXSXbVf5mspXw5nJiqwunH9+1ElV4/Bm49Q5nw8/N1B+cev+aNea+yZSjLsMYU/o3Z96b9itr2TIMrdzNXCypouZ6c/v5UHY/r0cr+2677+dtt3jH3r8++e8P/w+3/pso+N08djqUrWQegfTLtv3wSo7Rx2XzQrCfDgUAALtNFKz7tH5Eb7haq8HJqLb1oWyCO0evunN0831YsLXUsrzzfk6VLznvH3Ln/enkvJ+4+k+fHLH1cNEFr3Ja1OkNXLvoFj3bVh+UXusC7fXVrdKb4q7OWO64zm65LlhVS9ZZ/1wwbtIPYoefhnojvJKa1AW3jBfcqgdh8yZ4VMafRdvacZlRvccE6XLK1H+zdVXltqOYDibW341WZ/16bzQzE4+g9caKDrly+nElMOG9Ob/uuQGNOn2p8Sb7WTTcBeWfJsNc2Yh8+ny/NYVHeeXTrHOfevLy+Zv7z+UuR/Q417K305mGA8m2ld30k26KX7gLhkvt1x122n3PPnDH+EGvbqsvqWsj+0yWtfzSs7f7df+5cnvt/I0Dx6RH7rsj9gt3nVUPFzodF6743PVU+Jo7Fg/qcdHY/aVe9qtqlm1Q+OPu1zOP3wxeCI5R5waAjSMFwRjJCaz5ihoE9QdELVK1xaovfvSslp7UToWfhwtd5q1Vk5lOn7WCr10VXaVhudtjLt2WIfqYnK3Pyg6ILgrcuss6PQxrGaxTjpPdtlGnDyTVqVibQlhYWG8dOn/q9vNnaz2XYbTdQUGPqWJrFnnHjxQn3HibeYQpuqjsoWwl5/gGAGCc6Tkyakn5WfjURdYWe6hrdZ/fmfdKmRvYtVQLvN7P+5PuvJ+q00WPSrvgayZ4VLPGVjNpD5I6laSW21NdQOur/asLaCDU1WLT69yhnuO3enXblHrCKghMKo2DlrOkt6VZztG2mkKH4Gt6mevVm7dDHHAPll3w+wN9Mk8GSB+5l8KefZ2Cr6n1MuGctn7uMkoxJ/jqTz+rwdfOk8tLhWDiqnTVZf6u3K6cetxTnVu32wVT97UFX/OPxX0uOPzHskHNstXg67rXM3I4/EwuCgBgwwjAjhlrwvkvTLBvLazvb3So0KQV838TV/ri94E+FuNNa8P5czcPvHTuxoF9dRNOp6eVmR4reVFlOrprLHGQN3VBEFUW7KyuY7wM47eOKHYNAOqj+I3t02k19UB6hPhReb0L35p/et10uP4FXyksSRdunGkdz617ZrzgkA7/a1M4mgyph/WyZB4D0mXreK4sdLxa8xNXjv4+yFFzlfjD3vrX0psok64StqSf6T62QTiX/txOdc0HtU4ZGhOc7bUyH9brJfG2W9fLvBjs0+NHH23MrHsx/LSuLUAk2GsO55WtO/7mGvunud/ss+gYLXqj1ZKy1XKSVNmmj28AAMaRBvCunP5g2X4efqyt9XJbAhrzcbd5hDZc0MfOm386PxdIS40T2FQdY/3zfqpON+nqdDPNacO1mdTj5VrndNOdv/7KtAmC/ZKpM/jn8/Z61vbUBcIgSAXg/HpytL1e4FiXm9S/ApmopKYTOZSej0m9N15v9Lpf0vuzc51S1qs3b0BS73Vrt5Je9Wa991hzkNiclo/asjPUlrlPr5x+fLfX3KRu3jaef/CN7LKT7ZYXolQBEupVjti3M+XzpFkn1vLx94kJLnav08bTNss2fSMgWY1rOu94/q1WytHUus+7zd/Kx12uedxXtLcgpjv+jfu75G+3++7d1++eHodGyy617nZKvwONsp3OKVvJ7tfmMtLXM086Xs+4ADV1bgDYOFIQjBHNa3Xueivfl+jd1TMffN1vzRCE0eM3Vf23NVFFoHlCPn+jNa3eib96+v0V/xEq+fR50R8/o9b2KJQqBEfEe5TNvZ8998Nm7qDawsyTafsl+7RZqTCFzp09uGnP//CAP+2K/VJY8iokk1oR0kdivu/WQ+/mWldd832/x1xVyXhXT73/C/+xnbpZ+8X3r79aS943WmX4d/xXXY3q8Pda41RcBaVW8C5qCnHFu5q3XBPWD/9u65G9mgtgz5sg1eq1NnczlR91xe3jN1OPPFnR/FO1vPm78pg/f/3VxWReuh5XT3/wxLtLP9kIlFZkPYWoGt4cz1XS7n1v8UBUAdTj4Mqp9665Y6LZItcF/KNlNB5ZWs2WrTsgV9v2j02nY9Bj7HvXDyTj1FzZrvplO2ED3RdVAQBgjLSnGWh/vNyKrbrIzLvB3onF9R4P1vRN6Vmk3qy6c/rh7/0w81j5+uf9e+483aw3BqbVV4ARU0wt30w8Sf4dTXvmfQ1uNetTgTd+I/eqN+321AXctn7kVrzSXI8XJhb9dXb1mAfJzX/VCFBX4u35oOrVzSY1WOW1Jk7XdcP6NX1p1Cn94GxtvTpl48b54lYfB/9+M2/oB6kUFNl677kbr1i3Di5gbkuF0LigetS6t+jNqthIQzHjArFLgbX35jL9E2SWG22n5kDNpr+YkIna95L+Hc5Eh4uWT8mb/Kl5wRz83uKr0ba740/zoL5kJGi2TG3cBFjMWbS7DDL/MCnbK2feq9jAFo1tBd3dvJbP33ilGeB2wWVN63Ektb2dr42sCxYf+90b8ba7a5aaeznornl+7l+3ZI6LXCa+kFpxK9wsHBcQvvY/NL577nqt5kZy10em2bDGXe9Nff/mfp1vbtn6+9UrW/965qlfPm49K+635SN37CV5dI1/TQkA6A0B2DHi7pp/1DawHt5zNeBS8tadTJsV4/PXu3dCkD1ZrxVMx7u8rhJ+1KsMR1xlYzJTUVr1gq+Rucr+1aji0Aj0JneT8yqSdbv2Ufu0j3W81no9i/69pUroRri7xVOBSUUR2zokiIPZj1tjeJ2XtSnsSa17ULA1a403bToXmzKh2+/eOtiw/pJ04oKcbYNsPXXBlARK13P+etQpR6XrslJ5as1XZQO0hY87/IrN2bkLy3N5ZXvq8ao0OyNr5fcCAGBsPFubkiBYbAu86pMtQXjN3W6ufm+TeThzTLpAy10/f7va6Hk/9VFga8b6H4aL7jz/iyR3aKd5N+oCrZaz21gX+F0v+LZhYf2Bq1CVkrfJzfdGkNWvZ9XmGmWsAVx30735gbaMzatTZoO76zSQ6Du3DvpS1b9/0+ioKgrGaqDcb6WpfTSYKHi+5Scuw3BNXw4Z48/KPvCvF4IguqxdcuWbBGBdcQZ/t9M8U2Vbj8r9I39NXeC/5o9v47q2O46bfTd0vTZyx3xz3dw1iwZK9X1boFTWCWKevxmV92LH5djoYk0bgCSD9B+T0iN3LaMvqeuZ7LE38Swq2xX75VbDFre8lwUAsCEEYMdcUChUXUWkNcAGX8+Os3Dq/UOhMUc0ebuk8npZ2ZK97mLBputc+ohb23g2kxx+m4OoW2GilqP+ypuXc7fRu2AyrU63hoJ1FczUFmwiUFp3FxbtvQNvTVg3Rb+era1nOpStX8nsucIJAMAo09Q9LjizKJtiZ1318Bf+EBd/Kbn/Ja3gilEe16SDU89mzvvBs4lF+6XwrBegK0a5Q13gVJ/IshJ+WDCFxeyyQhegMumbudteF9DtDSU4EndU1eP2/vVExQWrvLz8UVnNZoOsbh9ea46RuQEe2jC3I7XsjXe3bjrdtgVgfX4w1gUYdaUW/ABjv5h4g9MBPxuU/GMhdNctJrPvwyGqc2uTWPfyoVe3dTFM8/Vep19oBLs3eiyup3FT52X/esYNmU6VbeM6Jn1/hQAsAGwUAdjdxthUhwjaaYCVuMfcbTCZ20HENi18mxSHLcC6noK7Q++3st1IZfXqmSeX3MVDeSDJpI2uR+rg6KVsCcACAHYFTfNz9fQHR1yUsmIKhQdzPaZZiqctPDh3q238ytVT74sXhE06OG09hr3J874+tfSvT/776QmT6cTLxHVDF2ArufmevXL6cSUwwby3Ldnz+rbVBfSJLO3UK075sDG6vZmWqsWo3i02lZorCCaWmm+0pW8mNVPevPVpKDMkleckKKgBebe+R8RsYz3M2KlRv4TotdHDwunHGid9Wzvr7fc2m7jp7Ga+ZwCADSIAO+6C55NSL7Tee5U57dQgMK30BHFy+LASWvlIH5spWLOQygG7VZog3oxGy9ZN62Eb89IIjCLtYM3dzi83BzQeg7ShWdHjx12clfxcWpuQLsfdcPwAAJDn2cSK3Vs/aqzJdJRjpyQwiy54uXjltAb8TMUE8u5GgrE+FxusunBMKxekDZr5Srd63m+kM9h35Yybj8gRt66l7Dhx/tAoL/3+xqAdqwvUP6svpuvJmjvfLib15AlrzlpJd6iVkklDoB2RGe+9q5OvzN3w9lOP2+XiZTt6szkJutpw4jUbhrMadI0C8pnIoKaLcMfTNRmUno4FM9T1RldGv1hvnKtRnxZyKdMvQs2a8F7y3Wvk4z0im5CTwmBXXc8AwHYiADvuwnQlzZ2so5NpTudRNfOCmZ5bfKV5ss0m4t+4iZr4nWC5E7n2HCvjJV05Mfbeua3kDNsB7Y/3yYe9TOcu8FKPmNWD8LCff85dqBW3lPUrk0tOH1E8f+Ob0wIAwC6jLSolzpFa6RTAjJ4yMlZzpsrVU09mzt1M593vhXV1tXQjzLBVz8l0rBqKPfq7119ttuDs9bzv53vVTojag0d26urpJ2+eu7H/QVs+eSNLcze692HQD1E/BibbyWq6s9mrp9x+6NIcMUpD8KWw2Xu9kSD9aH7BLPpvXRys5gfBOuXktyZ42a+fh4XtC4RdOf3YuAD0H0eduJmwfYQocGfv1Y1d6mNO4iS4u5peVHjN70B42Ln92ZZGwe3zdQOwLvCq0/nHotVj8Vyj740rp96T+GnGLbWNTa+HsRV3PTMnAIC+GsiTw9gZeXfE61FSfG+cZnBtrZge03641R5Us6JKqk1Vlopa0c4bVwPC+icjJpiw1fQQc6TTdvzBqfc7t5LYSUHhzcz7J71NmG4d3deKtq7G88JSamnaQVuXstVHBQUAgDGnAUz3N+2CMPtcBOdepq4VsbK22RveHesqLvKWOu//bpfe7X0azNR8ksnfwqnHzdyoWnc4d/OVGRfsnPensXYtagGbrQu4sOOhTnWBTnXMTXkx6tjKW65d2WirYg2a20CfLmvIPJ5vrLzrvw+DbB7X9haNuu1eWoPIxN6JeDqv06d4/kF7vcjYLdWVTPzXHhjW1tBuH5oXg33aEKHfdUIX0LXu70FqXUzwT/LqftpCd6Gfx8ImFexEJr1AVHp+ndu6fV7tNg/33RHzRbQfi97g2mZbuOdx65B77OV9z1x9e3ivZwBgBBCAHSvmiLYYSN5d/adPjgSZx1H0jnT0j0wlzU37mn+i1ZNrtoK3Gfpomv++YIP7V089aa6TVpzc+0s2DJ+4u8D3BxxEm9xqkDcIJ1LByrn/63+z4m5DV/1lWBsu+xU/3aaF008W3L64f+XUkwXZQSYwlxZO/vtmxVlzuWX3c/aCoKPMBZ9/4RNdIASme/qB7KNNppBqFRBduKTLVvLKVo8fLdvw83BHyxYAgO2kQRgNXpog2G+N1VahtV6ntVZe1vNp8+/k+zMaHM3WG01QqLTepM/bWs9M/t3tvK/nc1fXmIpzvdqSNTLTVh+zQTYX5moybS/1LK0LuDqmC/A+vitdhFFd0NvuvD+ti4Z70sFMd9PZX+d4+eZNWU89zG2FrI/nZ4NoGrTMbqtuT7Lc+Ok1ez+9XlJpNqD4bE9qfpoj9cqpx7P+OrugZdcOsqIOvry3rt77293G1+2om3D63M0DL52//mq5j4053KrIP3P7Itq/2tmX279VSR/j++zn9pFXPlEZiZ1YsDZ4pMeE7By3a8KFqIGJbsPZJ5NGgquSCaRuMlBdbG3zexIEojdjOqcf0M6YbZjaL/5+1bINpJA99l5y37NHyTVDsg0FU9DrmT/e4bIFgJFFCoLx4oKX4ZL2KBu9C8N0+gHxHgfSStqXwlXvbvykBkFd5XulkXS9mJ15+53c9UW93n45eoSr2FxHE1aunn5cEc1f9HlYbD0xY6fcex3elzurWrGNysLfRhs+dcvWQN78+ZvrP7ZkA1szXgdVxoSzbvqoMnvuxoHog3p9bW7CFJbzevaN5vF5az9E0596srKZxwL7pGiDwpPmMWLTx0hUke/5rrq2RGhdqMUXPh9UTVzOU+tOnX3ULqdsAzFH3XhPcsvWXQj6x4/mjXNlW93BsgUAYNs1ztsV/dOboYHtpRf6cMmdT1tvg2Zv6L7auR/659TovN+adxhW3Hl/ppfzvi2E8yYMkhulURDVBRerrh7ykbsB+1q2k1a/c6qudQFp1LN6rAvoo/Nu2q71zPqztWmtL7s6SU28+qvWIeN6jnXLl2IvT3xrC177JXeDONv61Q9se0KpzxckKHnrO+OWO6Pr4l6LqZH1RngQNFsO53T8pSkbFlw5RWkQeskqllPvnXPL1kfRn7q62TckPkZcUNzOBzJROdenlpgabXU+knS9cM5+LtGy3d836pr8QOSYq28+8tZ4vzs2nuqxYHUefjmbUBsdPJiLcw/vhH16zMhnjRsXmWPAffZ/W28Gbp9GKeHcxP5+NcmxaLXjNrFdv3uNEv0oNSyzX921jJbtuYmg8EFq/RvXDPaz9rL9g1Pvf9hrK3gAQIwWsOPIRL2oZluS1gJTaObyiVoUFNKPeyU90UpS2cy0cLR244+zRa0eTDAt+a0yipn3LiBXmJU+yrbA3SitXOY92ufTTiU0D1rbeDn7QVsKmBflgey0DseIuyKY73kWQaEsmf0aHz+NimCmPEIxRf+95kZbr2z1onLN1tuPn3jdi5k1WtGORwQAgF1KA4fnb7xyuJebzN25c2pcf2sNMYVF2cB539pWqqLzP3zVTWv9OllRg4tuGZeywVcXXJrzbwZ3rQu01WXcevepnuUCfkezw7rVk/Nytsa5e23b+nR62ihuBRvm1cWKqXdu2caVSfamuQZwpX2lvTIyXYORUb23C/NCwbq/6ai1ax8fg68H1rq/rjfQo5aaRpZd3f5c24d5x4K193Yw+No6PvKP0ye9fkc1OOr+zrUdb12+e4EJ/s/Jv9fC0Lq/rmXrrmWkUAieRC3pe7yeKbxYqAoAYEMIwI4RbdWZqdzGwzXol+k4QGllOPeRtUYepyio6DOF9R+1yqHLNV/o43FRhbIm7SsY5416Idjfz8qc0gpiXpn0StenUQ61buPpHWB9BLBTLja3Dit6QeEuiqb7nWt3I3QdonXMDu9wjHQT7Vc3jasALuXOTy+WvLJw4035KSb0oiT3gipDA9zRRWDHso16gp0/d+ObfT9+AADYRWr6tFRo7eG8c2py3u9Yj8ic9/UReP+8r7lB43qnzQ2KJY+zu8DUYvazDdUF+lTP0mCoro90qCdr56PpwcHLefNxgcVKeoh90K2+onVXze/ryqra9qEuW8va1TnzgotxALdz3d4U1o5KF1G91+1/6VA3c2Urg6jHesHVubZla0dsDe7aRQI7sdDMf5xDyycM3DF885WjsnOsFILZvDqy+2jRvGAOSo80OLqnsOeJ2+ffzD0m3HWOmagfTC+89TShTu8Csk+67Vd1/vormoqg0ryeyWWfSBDMuOuZgzt5PQMAo6qHh2cwrK6cek8raM0cPMlj9VrZXXu2Ft0R1cT8vZwg//XJfz9lCmbS1u3qnq/sqQ3ypJosS/+9JhO1729D0Mwvk80ucyNltBPbmOfqqfcrfs/CNrRHz996pbKZY6Sbrc5vFMsWAIDdaqvnfX/6zdQ9t7susJV6suZe1ZQJzQEugJVO7dBl2i2U01br9klu/+24NsgsV19KvSzbH1f1o067GVfOfKDX1I+8NAHWBe8PTshE1f27uCZrxX6Uo+a5Tean/9jo9m6kbN3xoy/UuQGgjwjAjrBOAVgBGjoFYAUAAAAD9weuLuZ3bmZeCF6i9eB46RSA3WQnWwCAMUUnXAAAAADQJ1Hv8SYo1kUOpYKv2tkpwVcAAHYlArAAAAAA0CdhYWJBW0O2dbaxgc5OAQDAeKETLgAAAAAYIE0VRmehAADsXrSAHWWB0d5qq833xtQE8NjA1txLNXkfFqL3AAAAGBBjww/FmrjzLGNXbCDXfveHry4JxpLb3/ryoW31rmK1kysBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAsEOMYKxcOfn+jAnM3eT9uRsHUvv46unH1n/P53zO53zO53zO50P2eWhnz9165ZoAAAAAGAuBYKQtzD6ZvHrqyZHkvTWyKgAAYGTVC/bD5N9/cOr9Q3quFwAAAAAja0IwsvSCzH5ul8XYKXeB9ovfvfnKUuGvC1X75VAAAMBomtg7saKv0VMtxtx15/oVd86fnlvcz01WpPT5yaea+3xf8mbhzJOiteHT7frciq2ev/HKdOvz90rWBsvb9bkrmMrcjQNHk/fZsh30564s5s/ffLXc/PzUe2Vjgkvb9nloj56/9UpF/3311Pt6nNwVY460JrfHBvl53YQHv3f91Wq0bmc+0M8fGWtL2/W5K4tvzF3fX4vW7/Rj/fzn7q+4XZ+770azYVTjc/+CbtCfP3Wff0P/4b6X+rLP7bCfb9fn7ru57L6bB+PP39OXaffdfLRdn7vCuOu+m8f03+57qS9H3Xfz7e363P9uuu+lvnT87g7g84F/t/nuD+y7byW0czwxNVpoATvC6p/VS+57N6X/DtwFmgZk5yrRxVlNAADAKKppoFWDU+4CrXGBZKfsF/KmYNfjyScAAKCSJ6b+4NT7PDE1ImgBO8K0xeuVM+8fNTa6QCvK5+GCez3qty7IyrZ84HM+53M+53M+5/Ph+9za+qyIKYqV1bBgj/7uD/cvCXY1nnwCAAAJfWIqalVt41bVro7wxNUVDvLE1PCiBeyIO3/9lYoxwbT71l2TF4I5AQAAI898USi7KOw982Kw73d/+ArBV/DkEwAASNTkmawGhcI+F3y9GA/iialhZwQj6cqp92aDQFbE3fXgDgcAAOMreqTMBd+sFL567ub+e4Jd68qZ92eSJ5+yOUUBAMDucfV0lFN3wYX1zoqVj8OCPcZN++FGC9gRZUywoB0H2M/Dj6+eevyxAACAsXP19OOneq63xtwXE1YEuxpPPgEAAGW+KFj3Ny/WVsyLwTcIvg4/csCOAyMkWwYAYDwVBbte5smnmhs0KwAAYNeaq+zXF22Md3Rh9oksnH0yKZ/zxNQwowUsAAAAMMR48gkAAOS5evqxcfWDp/ZZ84mpu4KhRAvYEbVeb8oAAGD0cb5HG558AgAAaUXB0KMFLAAAAAAAAAAAAAAAAAAAAEYLj7WNqIUzT4r++7nrUYcMAABgjHC+BwAAAEYfOWBHlLXh08wggukAAIwZzvcAAADA6CMHLAAAAAAAAAAMCC1gAQAAgCF29fRj678/d+MALaEBAIDWEbROEHqDrKsn0NhyCBGAHV01AQAA464mAAAAAEYaAdgR5e5o7BMAADDWON8DAAAAo49myQAAAAAAAAAwILSABQAAAIbYFyagJTQAAGjj6giaJ556wggggf+IWjjzpOi/n7u+vyYAAGCscL4HAAAARh8tYEeUteHTzCCC6QAAjBnO9wAAAMDoIwcsAAAAAAAAAAwILWABAACAIXb19ONUS+hzNw6Q6w0AAGgdQZ+O+rk3yLp6wjcEQ4cA7IiyxlYFAACMNc73aCgKAABAvqL3bysYSgRgR9T5669MCwAAGGuc7wEAAIDRRw5YAAAAAAAAABgQWsACAAAAQ+wLE5DzFQAAtHF1BE05QD1hBBjBSFo4817Jfz93/dWqAACAscL5HgAAABh9tIAdUdYGy5lBBNMBABgznO8BAACA0UcOWAAAAAAAAAAYEFrAAgAAAEPs6unHT/33524cINcbAADQOoI+HfVzb5B19YRvCIYOAdgRZY1UBAAAjDXO92goCgAAQL6i928rGEoEYEfU+esHjgoAABhrnO8BAACA0UcOWAAAAAAAAAAYEFrAAgAAAEPsCxOQ8xUAALRxdQRNOUA9YQQYwUhaOPn+jP9+7tYrFQEAAGOF8z0AAAAw+mgBO6JsYO5mBlUEAACMFc73AAAAwOgjBywAAAAAAAAADAgtYAEAAIAhduX0B8v++/M3vjktAABg13N1BE0t+sgbZF094aBg6BCAHVHW8AgiAADjjvM9lBFbEgAAgAxXR9CXkjfICoYSAdgRdf76gaMCAADGGud7AAAAYPSRAxYAAAAAAAAABoQWsAAAAMAQq5uQnK8AAKCNqyNoygHqCSPACEbSlVPvlf3352++WhYAADBWON8DAAAAo48WsCPKmOBSZlBZAADAWOF8DwAAAIw+csACAAAAAAAAwIDQAhYAAAAYYldOf7Dsvz9/45vkegMAAFpH0NSij7xB1tUTDgqGDgHYEWVtOC8AAGCscb6HMmJLAgAAkOHqCPpS8gZZwVAiADui6IRjfaX75clgb3Co0+fGhqt1I6tSkNXqt8srsguVflw+FJhgMnkfSlitvlGuCQBgKHC+BwAAAEYfAViMr70yKcbc7fSxNYU4CXIocvCdyzX3r2po6/O7KQBpgsJZ8e6WBTY46l4qAgAAAAAAgL4gAAvEiu5vJjCFUumnPzhc/fbv7coWsRi833x4uWSNNHs1t8auPPrOxTkBAKCDugnJ+QoAANq4OoKmHKCeMAIIwI6oK2cep1p2nr9+4KigH4qBDZdL98v7qofLqwL0WSi2KGJKyXtjjQBAJ5zvob53/dWqAAAAZLg6gr5UBUOPAOyIMlZmMoO4IOvBo9cvpKJdpZ/+YMqE4YwbeLY50MpksNfMun+VBQCAHcT5HgAAABh9BGCxqzVSDcxOP7w8aYwcSYZbY6bWm1Y7+YryzOp8tpA31p+PPJPVrbS8LT0sF/sxn37oV/n00zCVDwAAAAAA2B0IwGKkaZAveDE4a60cstbMVd+4UJVNMGKr7v/NAGwg5qu5y3MBPGPNrCkER7SlbDL84DuX3Tyk6v5X+dl3LtyTntfblIzXCZa8sPEOwXLX6YWd6Vgs2S4XwZ6ROK9uZL3y0enMC8GyETPZGmqvPXr94mKnZR388b+YlcA2Wy5bkdry6xfact+48ikZU7jkAuxT6fJ5a8UYs9htfx38yVsLblsOJe+Dgpn907/3+w+y402/c9mte2t7w6B+uPrt8oq3/U+bIxu3DtbbSreKqc+T0cLwwc++e2k2tT4P58vGBK/1epwBAMbDldMfLPvvz9/4JrneAACA1hH0Kd9H3iDr6gkHBUOHAOyIsqHd1Y8gRkE1FxhLgo76i2NlC4xM+m9Dsb9oW+ZPLh8JRBajIF7OwjSQ5v7ngmlvzYafh9OdWlhqwDQwhWU3brFD9s+ixB2CzbgAYPnRdy7OSwff+unlszZ065RfAMl8tqVjsVT55GiVz+WyCwpP+0FhLSsXXHwgxjQ7p2r8u2MAthF8LTZHz8l745aluRNnkhVIM1MucF/JW5/mOof2JRekLSbvw7XwJcnRCL42x5N6IVsGrc/yD9Ri27KDIPcmgF+Oss0BdgDbb7ef7xFzN4pLAgAAkGHiC8ySN2hLoREMDgHYEXX+1isV2WWiR9q/LCUTFM5GrUa3HHX15ivmrD/MGnM/Nc5Py1NBKJWcyWvSFjwzU4UXCjp9XmvMOPjaHnCrWbGrLuhYNH4A05qyC+j+Iq8lqAvOXnLB17KsL+5Y7GF5/6ACddF22V7LR4oFU9DAaKp8wmd2MXhBWgFYVw6lh5dLea2aNQCfna8GIv33cevVttyJeaJ94o6D/SOWlqAojUD9t9653HPrawCjZTee7wEAAIBxEwgw5DRAqsHG4MXC0yAo3DfpuzsbcvDhWzP+3/SP5xd1vuIF81wgdKWaCWSZsLCQmpGRpfDz+kuPXr+wL+rYy0oq+KetFDV4mF1+IEEpu6xkPsuvX9y//J0LL2XnpS1B4yBxS5TL1AVnM8ushlamwyDYH1p71MbBz+TDyUbQcyCMFMqZAanyCUMzJ+l1bSsfDX5aK6lyDwI522F5M5lBFT+4rPvWlU/q8X0XrL4WlY3+ufWxRvxga7HR8dpAuODwvuTPrX2qLEzcinVf29/n9bm2+Yip5c1fy7PRmveptvpt5roFAAAAAAA7jhawGFrN3J3xI9e5NOjognRL9U/r93pqvWjM3fRb02xFqwE544J09lnY6bH3WvKP0NTn/eU9euNCefqdy6/5weHAWO3Iqyqp9bUlI63EA7YQlKuHL6bWW+flgmiaj7bYmGhSvhL9u5lCIBvw1HLI5D9dcUHbJXmh8CTJTRoFPV0gdxCtPF0x6uPyteR96MrRX071u7+/6LbpNffPVj5VCUvSVj5Scet7xBvUts5RzluTGkdzrl5LzceYI356Bw2+Ln/3gh9gXSn9+HLNBNJq6RwEZ92yFgdRPpngsLZ07vh59/lcrLjtr7qVdd+NaBtLmVGK0kxfcXnJ1Ov3fvZddxwAAEYaqSgAAEAeV0fQiAb1hBFAAHZEjXtnDI1OjUp5n2046NojffTfxcVek73Ro/Sp+eZ17tS+YuFHYrxG5da250JNt7qUIIyCkG2dOmnLUekmkDdTHTllW81KM6/qPbdOzcf6g72BBkAr0mdufQ+vO5INP3Tr0gzAun9/PTuKphtw+77a3PdunwQvBDPi5YJttCJuzcZN5nd4FXXolTl2rKm3BdWr372w1OiorNhc1oDKp58awdqK/sUtXTsEY7VjuqBwaPqdtx4sv37xkAAYSXS+BEUqCgAAkMfVEfSlIhh6BGBH1G7rjEEf1Q8CU+lD0LWSemdk0gUvp/xWokFQeFL66Q+mO3VapS1zC4XCyzaUqcxHr8k6rA2WXJC39Vi9NbMuCHjIrceKG16t1+sfyjNZ6baNpT/5wZSxYSq4G4gtRo/dZ5cnJtXRl7V2SgYsKZ9wLdxnUh1J9bZsDSa7sigl742YN8XvjMvvqMupm8w+3ZveL9bYlerr+S1MrQ3fNSYoekOKMkLyg7Fy1pVZswwCMV8VACOLzpcAAACA0UcAFiNBA0oa8Cx8WT5ybzf9SPWj1y/kNs2ffufyogtUxoFRzZdqQ835mmplFKdECBYa67Ip2sLz4MPL826D/CBi0S2z6AKPhwJTEHlBpGunSsFzF3wtpIdlUis0B2ffpwKi/eWC1lMmDBe0JaaWj1tWduk9zafRCraWSp3Q6Iwr2/mW5rnN5usNxA+ouvfWdAxmGz9PbjSgvVXuKNBWvy7o/WYYyiG3TQMPsgMAAAAAgN4RgMVQMjZ81wXDSpnBMzaIcluuusjbkgnrD/qV39J+Xi/Li4UjmoYgeh8F/crFJDfnt358+ZA1Xr5QiXPGirXu82aAr2i84GAnmuPVzbsSBIUFfUw8d33ivLelg+9cLoe2Pt1rjtCdosHXIAyf+MM2Wz7KiL3m/t/s+MwdD1pO1WznW24ZZdmlNOiqKRMa+W7joHdmnHgfmAcCABhpV848Tt1oPX/9ALneAACA1hH0MvBtb5B19YRjgqFDAHZE1U041jngHr1xKQpSNvJbXkoF7uIgaV+DsVG+1Hcua6DQe7S/UJRGC0kbyII/vnbqZL+ol/1UAdMP5yti0q0vOy4vDqgebj42Lqbkoowv+4+ONxQLpqAXXZ33twbZQjsnPQglrMkAuOBrOjidUz4HH86X/Xy03YSfhxXzYuFSEhA3heCIK6tFP/ettn6VsP5udlpjzar1IpGhycnFm6ynkUmTXvGPZIilgq5GpvS7kN+u2K5o4NXdWFhcHkCnYgC2z7if79Ebdz6cyQwiAAsAALSOoGa8QTqEAOwQIgA7or53/dWqjLl0fsvLLkgpM9ne7/1grBtnWh9Tl02KgnG2fbjmXHVhvGJrkVJb/u6FWekDfxujZWlA1k4cCgK74C2vVPppearZ0dQzWdE0Ba0Vl8mwEK74HVFtJw0Kih8gdwHhrZZPowOxa82ArXaQZQqXGvu7sRipLue0DK6b+krgpWhwQe2irmN+Xt3gZf9dOFF4Il3tbI7YYK+ZlfiGhEjOsaod1GkO3eobF6sCYCzshvM9AAAAMO4CAUaABlaX37gwE9r6PhdkumazuTu36Fs/vXzWWEm3lHxWjwOaUc5Vj7G5LQqN6Z5fVYOrB9+5bJO/6Z+81Rbs04Bs9bu/rx1OpVvz1gvNddBAogba/I8LYWGh23J1+2RQMp1euShgbvlY6a11cCJ8Zhczg2ZSn9v6fN50WobaaZu34MkocJmh5aKP7qcGrq196L9tyxEbpAO2yXw0eC89MpmctG7aqUYQe1PiNAMyH35ef2n59QtbugkBAAAAAAD6jxawGCmNFqMaTJstPXxrxjTyX/Y6/UE3TXaYPs5tw/Q8tHVls8VkuGfVRThbn1kzdfCdt2YfvX4xChBGj4W/GFzqlM/VX/fpd95aSdIMRPP5yVuXHn3nYiqQGKclyAQ1C/V00M4F3IxprbO2knVB3acuKHnULaeazCcIgiNuSbNu+ybdsiazy2pjzGuujGQ9oYRVLy9tLfNxsUP5HJENaKSF0EB0XrlWuuXFtWFwzwS2VYYmuOTWabW5Tg/LpSBO7dB1nqEEVXeXqpU2we3j1LZF8wkWxPYegM220I0CxC8W7pZ+Wp7XVsxRMPYrUgzqwdSjNy5WOs2n2dr1dQKuADDubGhJOQAAANq4OoI+G0k9YQT01i05hs6V0x8s++/P3/jmrs0RF7dkLJRtFEBrBaOiAKQpPJUN0haFNqzv94Nx0y642daBVNzyUAOjxdz5hOG15e9eSrW8LP348qEgSHfmJRrANLKi87LaUVUjt6e3nKVH37lwODv/gw8vl91nPeVUTWgryVTe2ncuL28kgN1k7VE/OJg7n3XKx6k8ev1C1xOFpp4IjCxnh4dW1m3puZFt0xbVtkNnZ7n7Pju921a/BfV669frumX3l7ZktnV5KXxWX6yS2xXYFTjfAwAAAKOPFrAjyogtCSKNoNmM9EEUiDPBYRc8q6WGB8FhF1FdTqUpiP892XprV/xOtIKcx9Wr372w5AKn85nAadFNXNR/ZHN76jxdIDe3g61Hb1wou3lJL0HYOKgshwcVtHPBy6NiCss5naV55SM1/3Nr7NR689UgpgtWVv1gpZtupfr6+jlOc9cpbzwtG93n307v89Z85KjJCQI3P9d0B6H9UEzQcwtfdzzNtR1Peb4SrXszncLPvn3hmgDYVTjfAwAAAKOPHLBA3AJ1yQQyaz+v769++/faOrPSYdoqNpt7VUU5OMXM2XrhaGZ4bm5PDZxGuWyt3IunzaO92Mv88usX93d71N6fV+5cGvlB7Wf1fYPMDRrlXbX16bz1aJaPK1t/uKZg6CX3qTEmtT+smEXpga7T8usX9kXbn5MzuFH2lai1c84+b83nQjV0wevsPJKy1X1kNpiTuNvxlMw7+qwutHIFAAAAAGDEkYJgRF09/TjVB/q5GwfYl9skChruLcStNwvBarfgXU/z++kPpqQetgKRz+orm22pqo/st97Va92Ct4PSz/JppJHQ1qdFfa9B0Cioupl5+eXs1ks+fV7baDmn5rGF/ZSaZ5Tzt1BsDdmZ/QZgOHG+h7py5nEqb/n56wfI9QYAALSOoHXDt71B1tUTjgmGDikIRtQXJthUEApb1wi6VaVPthrATc3rjZ3vkKmf5aO5fSWVtkDKskn9KOd+7qvmPONga00AIAfneyhj21ItEYAFAABaR1Az3iAdQgB2CBGAHVHfv76/JsAYO/iTty65U0czr2r0yH9Yf1cAYBfhfA8AAACMPgKwAIbKwXfeeiLamZlNDzehXFvm0XwAAAAAADBiCMACGDJmKjvEil1ZfuNiWQAA2IVsaEk5AAAA2rg6gjZdop4wAujIYURdPf34qf/+3I0D5IjDyCv9yQ+mgkL4xB9mQ7lmv6iX+9HhFQCMGs73AAAAwOijBezoKgowZqq/9XsrpYeXpwOxRX0fPguXCLwC2OWKAgAAAGCkEYAFMFSqb1yoCgAAAAAAwJggAAsAAAAMsSun3iv778/ffLUsAABg13N1BH0p+8OoJwwnArAj6tyNA+TvBQBgzHG+hzImuJQZVBYAALDruTqC1hX9eoJ2ylUWDJ1AAAAAAAAAAAADQQAWAAAAAAAAAAaEFAQAAADAELM2nBcAAIAMV0fQlAPUE0YAecVG1NXTj63/nhxxAACMH873AAAAwOgjBQEAAAAAAAAADAgBWAAAAAAAAAAYEHLAAgAAAEPsyqn3yv778zdfLQsAANj1XB1BX8r+MOoJw4kA7IgiBxwAAOOP8z2UMcGlzKCyAACAXc/VEbSu6NcTtP+AsmDoEIDF2LLHjy+6lzfdL1Ix9YExNXPr1r6O0504UXIvy50+d9NX3PRHu0xflvQPYHb6o276SpfpddmljtNPTOwz16/XukxvpfOyB73tFfdyRDqbNrdvVztOf/z407b95S/+9u2OgQg7M1N0ZfNUOqu66ac7Tn/s2IwEwd0u08+76csdpx/ktnPMcszmTT+cx+yKWLti7tzpWOYAAAAAsNuQAxbjy5iXuwVGAAB9NyUAAAAAgBRawI6ohTNPiv77uev7a4KseenWKg8A0H/G3BP0Ded7KGvDeQEAAMhwdQR9mpB6wgggADui3Jcs+9gqOeIy9NFZe/x4jVawALBNrK2ZO3eqgr7hfA9FZxoAACCPqyPoS1kw9KjEj6irpx+ncibSSUe+KMeiyKqpVFYFADBQ+pvrfm9rgr7hfA8AAACMPlrAYizY48crYsxX3T+v+Z3GEAgAgO2T/c1tdJJ2Saz90Ny5MysAAAAAsAsRgB1dNUGLdrgVd/5yKEo7UK9PE3wFgJ1hz5wpyvPny+6fxWhAEOgrAdjNqQl2vYWT78/47+duvVIRAACw67k6gr7M+MOoJwwnArAj6tyNA/sEvlbP28bwCCwA7KRnz1ZlYqLYfG9tUbApnO+hbGDuZgZVBAAA7HqujqDpqfx6gqavqgiGTiAAAAB9RN5tAAAAAGihBSyAoWJPnCivM8qquX17UbDj7MmTM6mWjcYsmVu3VmSXaDtW19YWCTwCwHApPSwXAzEzzQHGrD56/WLP9YjS/fJk9XB5V/+2H3w4ry/lriNtsFyR7+DDt/RlxtUyivqPsDCxVP32762UfnxZ3x4KTDjlDxcMHfeboS+T+r/d/ttRehgdt6VAwpL+I5SgWn3jQrXTcAHGHAHYEbVw5r2S/37u+qtVAcbDpa6fGlNz/6eC30d2ZmZSguBQ9KZQWEmCqC7AOiX1elTRN2+/XWmf0B5x/y95Q2rubzddDKSP1b17K+7/BGDRV5zvoazhUcItKIoJ/N/rmvRQj9DArTGFu8b98+BPLq+6c978rg0wmkAfb720zlhPhfrZllkTPUp8xIgp6dugXq+51xVjQh1+yO2LI/5wwVA5+JO3dD9ddTtytvF+4dF3Lp6TXcoFWPWllPwGBzZ6X+00XLAp1kQvFX+QYCgRgB1R1gbLmUFGAGAzJiY0yBrnDbJWA7ErjX8vuMBsSeKgYkUAbDvO91Dnrx84KthWLg42a5KbjFYm3YBLpfvlym5v0YbtFUrU8KB9+ETwsWColB5ekjAMS4EptDoddYHY0sPL/5bWnRgkV0fQgCv1hBFAABbjYlpGjD116og7S880BwTBu+bmzbLsdtbWMkP0omdSdpg9caIk6dYfK+b27TkZD34ndh81/63pBaKGGLSwwKaM3O8yAHRkZcfrIjus5r+xRiYNZbJz1uwvZJcq/bSsL/sLYeFqMswa+2TnW5p2CK1MmK8KlAsS5t5QsJrCRIBdgAAsxoILhFVl1ISh9mxdar5vDzzuSubOnVSP343A57LstDAsNlqDjqPXkn800w9oWgJjitFAaz8UYING8ncZABqstYti5E2jKQyiATK/W1u/Pnr9grauatbPtKWfi3hNG1N4JBiswtrqhobvBnU9HM2kuwlQSgYZF4GVHVZ944JMv/NW1WojDTFR4wYrdqX69y48EEQ6tty2pPDC7kAAdkS5c0xVAKA/khYsrZaucVqCxBMBsCM430MtnHx/xn8/d+uVimCgqm+Ua6X75f12b2FKCsEqHR5hR9Q7tAys02JwGC2/ftGWHl7eb7WRDb8b7Tq03O6UagO9cXUEfZnxh1FPGE4EYEfU+euv8Ggn2tgzZ4rRP/buXTWLi5uqmEXzyExvZ2cn5dmzSXP9ek02KFmnzUzbT8k2DMO6JPqxv/qk1Hj9yBuWn5ZgA7a675v7bCvHc5/2ez+P40Edi+vNVz/f4eMMm8D5HsoG5m5mUEWQSzvP0lcNoMoWNVq8VmXMJGUkz2R1J1v1NnuL39voMX4L+8xtk74Uozdb2K5+zadfOpbJs421GBzW8vHn14/v7KbWIXMcbnW7tCWs9Ol3Y6vl08/v2HbMt9NyyL3dnasjaM44v56gLcIrgqFDRw5AH0UBkE8/PdLoyGjefwTXzswUpVDwH6VP5za1Vk8s7SeXIFg0t25dk07L1MDQ8+ez7p9HMvOriZ789+yZzw3GnDixHOX4jJdRdes2L2tr+sNdaoyy4t5Py8TEJTfeTDRvnacxFbdd85l53XefNQN2mkbAnjx5VsKwnMnfWnXzO7qRoFNbCgJjaq489vU0re6PTz4521j/Yubjlahsb96813H648efem/bc9HmpY0Iggdu/Wal0zw3ub/6qVGmsTi1QnLCXnR/Dxrrc9at36HG8FYAaG1txVQqq4356H5pzcuYo/KVryw1yny2uX3xsb3Uy7Z13GcbKJ9197s7ht3x/mAD88ndFlcWT1MTTEzs6zTPLtvVe9nE36lZb3mz5saNB274VNRhmr8vlH5Xb91qJuSP9ru1d922l6Oc00NyIwLA+q6efpx6vPbcjQO7og7vLr4ngxeDs9bKIWvNXKeObDSgaEzhrrsEnfJytbo6i62EYfhuYFL1r9qj1y+01SOm37m83Ew3kK/qpuvYycnBd95y59Ko5/qIW5fyz75zIbeOcfDhW3ouaOaVdzu3tvz6hYHebHFlVHJldClTRrr0FWPMYv2z+oNegxxRCgIx00E6BcFTVz7fWHdaDagYmQxeCNw50cxIpsyNnuuNVDqVne9bP72sL2fDUA6ZtnOgq1NbWQpt/Z4LDlW7zcftD32ZscYc2cp8+sEdh/rdftRYD+vKNIiGP5yPAizGBEf84d009lOH/R7l9K267ZpfL3jWfT72iTt+rnU81uPt+WNp3di34ef1b+qOjo4BMbOZ9arkrZNXLkVvcDGzuJq0W3ZldSw7cL3jMPpeBKZSr7vvRYfySY4/G0rHer/OyG3PwU7zOPiTt3S7rrp1OOSPL1/Iam75GLkfhvVz3fZZ121rHc9d93vOttmgYObWrNHrhP0mDK/mHFN3s2V98GF0yeiuB4NLjW37hi63bXiw9s3qt+dX2ral9Vtzxy1vvh7W392pQP0wc3UEPY5Cb5B19YR1fyOw/dgpQB9oYMMF6xbll798KpozLFt5S2jgpfU3mflsMvN5/GftSx2XqwEZDQIZczZnfjr9jAv2LUcBmraJrb8MDQqmg2laUZqY0GGt4FMcOCqnAnix1Lo3ArKLOZ1nlXR9ow7IBswt41C0P6KTu1uvdlMumFXRIGuzJWpWt/3V/nmxsZyvdlmnI66cn3TdX2trT9w6HZIBiW4ExAHt+K8VfFWzzeGt4Kukxt+7d7LzzN1x9MtfarqCdOA9PrbjY7FTWcs6+6xVPl2Pn+hYb61DMWeUqejYXG9d9LN1tkV6FH1fOm/XZHO7Tpy41H1G7rfAP9bC8KXoN8BaXc9S2/hh2P6YVzxdJVre8eN3c38bAGCHabBw+sfzi8GLBVevMuUkn2LuuD/9wVQQFJ5EAat0MKCo0wYmWOhlmY3ATse/dYKz6sPUNDb9OGh6YebN9LztQHNEuiDPggahc8pIV2bKBbgrwQuFJ82WsQNS+okL6rxYmHHLivar5JSpPrqt6+MCdz/vtD7aKtD97XPRnCcuQLRo8s6B8XbO6Ha77b/abT5u52vd7O5m59NPth5Y9zcXWpkOg+CbzeHhhHV/i9FwKwfXm49bV1fFK5Q77/eo7HW7Hul3qMt8jJtPt+Nnf7f9ZeO/SfG/G3tlf7C38CQ6BtrXK16nzLyM5H5HJWebUn9539uoVele2ddch9x5ue+FO7a6lY+th/r3kqzz2yFduGNY/1LzKNjCVMfysXLY7Y8POq2TGy7ylT37O25b63j+udu3HeudedsW1sN9bmVngjD8IO9YsDn1TjcX/askx20SPG0bnhN8zdgX/U6ZwlN3rN3Vc4QAI4gUBCNq4cx7Jf/93PVXq4JtFwXKNJimJ6G4t/jtW7YGa6wtrztiHGDVYNP+Li3eOq1/foUsbuFblc66BxDDcNGtz8Ba4DVamd7NbbGq5eHT93HL32kZoCi4qIGv9Y8TDcjdd/t3egQ7MTqbG6hOdCnrRvnc7+l7pIHzEyc+ypZPY7/fb9vHcevZyUwgNbrp4ALS+5MWvSnPn3cK4Lam70Gjdepyj78PZfeb8qG5c2epl5GjVsqdvqMSrWNNutHAr7UzrizXbQ2OncP5Hsqa8X+UUFu7ypelZILC2ejiXn821+lWR4M0gZ47RDqfe7oEb/sp/DysmBcLl0wjKKGBRN2mvFal2nmQ32VQaMPefvc3IQqyWDPbw6hFDbJp3ttBPO4bBb3C+j63jLs5H9ekPVC1r2AKb7vXtmCjm0fUGjJnmpqNWj7LlPGDQ9bMaUDy0Xcunuv3fHpsBZknalH4p3/v91PB9+pv/Z6+tAWjOg3Po+soetPXmks9jL4vsKEGPL+ZbVnYmE+vx8++RuD04DotFE2wfudtHff9VjUe6d/XWIdi5uOa+25OmnRgcZ/7jflj97345jY9Bm9sQe7mBKZbrLxUsKHeDEiVT7Rt9ef7XIBWt63Lb2K8HD0+Dr7z1i8evX5xUXpYL/d3JLAd653W7diPsgPdsaAvNcm0Tu40vEcaQJ5xgdinUavYDbTeH1c2vsyo+IMEQ4kWsCPK2mDZ/xNsG32UWIOfLlDysQbKpFNr1wwX5KnpI8rNP2uzaQUepD5P/tbW2k6KjZZ75czgqmhgy5j9LkB1NPN4/GQj8NVlBc1RiQNjrRNYPI9p93o4M+5rsr75aF30T/+dNtl4DH8w4uCZX/HQdAovaWoEF7QzrnzmMlOUclr1Smo/tE9Tzd1fz59nx4v3V72ebYGzEpWrThOXcS3zeS+V5s1YlXg/J3/VtuF6/CSsveePv07QXNNUVCQ5DnX72rer5IKe6TvmvZSPPqafmsi2H89ra4fa0hasre2L9vudOy81tqt1fOu4ExMz2dlEx4IxRzLLW5LO36/O4sCApNYpvd/TQU9j7mbLp4upzLxXGykNEiuZea92nE/SGlxbxXZpGYztx/ke6vz1A0f9PxkjGqTUIKG2dnWBg/umx3qVCoLoceyiP8wFwq6FQbBfW1a5K9Br0jNXL7PhfPJnrWzoplQUALBhaprghWAmO16UCsALrrjtrQ4sf6K2IoxbwTVF5RO3rnRlZI9ak0p/VQz2moHUz4wUXKykcCkz8H74ef0lTQkRhsa4v1SANApiP7xc8odF6QI0nY+33914T0Nb36fz0VQOJpSX3MB03dMFEaMgf8O3fnxZ3HiHus3H1s1L2XXKzmcDrSDb/sK1sONTbpulQbgw1JaKJlvWS6n97ge+XEDP2KhBSWs+P3XzMeH+nCBupeN8NFgZFHptJezNJ/quVv0PkxsYyXu3X/Tx9WndP/rnjoFj6c2T5eQz/69u66nxgvi/knTY77Yubp/LP2z7XuR8l0M3J/dX9X83or+tcr8PWh5uPQ4n5aP7Lz2KK5+fXkrVA/WGQhRY9n5fov3j9lNcHq6c079rxtUNL/rl3F36ZpaWkV9OoTU93SDYkPBL7m9Pp/pr3Cr2xUar2Ex57CauXmAz9YRjgqFEC1iMBXvs2Iz/3rz9dkX6rBGguySffFKKF2LyRqtGgZp6/V5eqzo/eOXml/7cmI97bhEaBxhTy3WBRb9V4YoL4ixJofDEC0hFga/c1n5xXtVKY71qkgR2dHijlaELzLRaj3Zr5RjT/Lfl1PqcOKGvl7xl6kXTYIKwxnw1FSAzZs7fbnd8LLrtKTZaL8dyWvWm9texY133Z1fZ1pS6bvX6tLdONdFKxIkT+ih5UnmIgsL9bgXbWGa1uSonTiSBzxVvXx9qTWDub2AdFl2g0w9A63GogWp9/L51zOzZo/OvNN/X66Wc8jkc3bSI6Ws1lXPWRKkusuXz9UxgtOzNI/pdcNMUJX0cvixZcZ5Wf8iK267Dqe2Kvyddg2H25MmZZp7l1nZN52zX16UVcJiUL39Zb3D09jhqHHAtZ39ztOWt+06nKsL63u2PfS5iUXJ/+vjrodS84n2g6RC0VWzVjVPZSqvY7fhdBjC6mjlJ40dZc2kQIghkqf5p/V5uC6c4v6E/wfzydy+UvSHVgw/nVxt5BrvKtgKL1k8KR2QD3E2SJXf6aNYtXHRDf2tT83XznPHf1wfYutktq5wZVHHl49e9VlyAs+bWuXk+Mybo5Sb7xtclPq1qmqZaY5B1AaY/TPZr9bu/L9PvzC+6ff51I8HZ5mQ21DKstuYUHSxfjxvkxQOMtW8te0HsR29c0Jy8Ggh7MxU0+pWJ5vnVmihd4stee6S2+eg6ufno/vsn/nyCvUG6HjNEjIlK+mx6qH3y6DsXm/UYd2yvuMDVu+779/PmdIXoZkazDmfqhXg+6cudVI5Pd+zofD5yS2y1aLVyqFPL79ZK2gW/FbHmLHWBvA/lhcLP/ZsTfjl7LSajvKChhLVACqnZ9nQjI4i26O+69UzGtW7Z89XX42mr372geUvvuwW87P1uaIN1PXYW08trdrZVTYY1ct5utRHF3eVMLtXpn1x+1635/5oqn3pBj8morte8MeHVpzWwbG39oHdM1w7qfPR7aBt1QBvlip3JblsnGnA1ehPnWX0x2cdR2gO9fvn0eU36TFt+u+Pjifu2viTueAgC95tqM/XXJK1CODHzrXcuV3vNIQ3sBAKwGA/pPJaqIn1kT51aSHV+k9Y16DoQce4wX9vdVl0XF0TRk0+rEpANfOXrxzZU24ZoS96JCa0QJhWHybwgUT+4oNzh9UfKtAYMgq/K4GQvZsodjhXdX/7dW/13VQak0dIyXp61HzY/MN7Fiml/nKgjYz5sGxQfh3qx07qItTYdwLc2e4GbCpx6411zyyh571NBc7ff9cKhrQVyShjW3L7251lsG6c9KFtuG8UFfhs3FTrb7HaFoW5XbwHYen1/3jw7fa8a41b0L9r/gbu4yQvGakAkDPUmwKzb1v2yGQP+XQYwuhodXpXyPls36NrQyBFZ9IeFUq9kxwvFVoPBPVWSop2ETb/z1kqSs9YFK6aywSgXrGrWCbR1WnWQgYJA3vSD22FQv5a7zj+5vOqlTijKALjAna5J1/qZWwcdZ9UP+pls/SyO5Pq5Jl281vy2Ox5SLYldQF3n1fn8lTcfI/9so/MJ4wBuNbChbFRYmOh/HTguPL/eacNCkLpO0GCmCyzX3EcrzcBy5pH3RsD8SGo+wdofpudzQb/LVf3O+t/ndQJ6mvzz/52az+GydjK26uodDyTuZCzZmPUafGyYC/zq/lynvhhtfKr+6+K2g7xOSLPh/7dtWBgdX375uJX06rBx4P23/bkYsX+4nAlKh2H0HfvDwDTrfW4683elxzWzYX1/dp7Vb/eeHmMz9PiQ+Pq04n5PK6LXkh2CsTa+oVc6+JO3zrp9/U0BhgwB2BG1G3KBDZWw7RGhlehR6+0MujY0ckqmKyRhWMy2NotHjjra8sebkh3SCMTVpD3AOLATtmp0MvSatD+uvS1lEQW5/NadKggmc/dXGH41FRzMa53ZTxMTfqC15n2SLHd1EAFyac9LVUq9M2Zfh+P566njOVuu/qhxWoM3RR/D8y/e8gKu7dLHxtrau7I56fl03q7J1Hb1to7qQW5At0eN366KpIOxWrEvtUZat7U7BozzPdTCyfdn/Pdzt16pyBhxcbeVQHscXyfomlFMzcPYlaQV204y1j5o3sjU1mVeK75GxzHF5rgDvMmqAepMLksXKCnnntOXv3Oh74/Cd9Po2bxUKBRednHLTH2se/0sjAOdSyYoXGxuX9wx0fTBn1yuuvP+h24frNS/kGq3Yyl3PmL2a4duqfkYWenWsjKvFeTOiuoT6TL8pL0e0y2wXPqTH0hYl6mgEPqzXc3vKCkax92AD0rNMXsP6HVj2q53+qyRD7bojsM3w7Vwnx/sdxtRtDI8TNz0u9bp80YOUD+3dFR+Bx++NZMZM0o54dc73W9nT9dE7nf6waDSpfSqUzDWxZ+PpG7q2d1Vf3V1BH2Z8YeNWz1hXBCAHVHjlv9rBE1FLda+9KVVOzv7wCwubl8QNq8y0t7SLN9gW3n2QltIbk/gMw5UL7i/kuys9v1l7WIq0NqJtX29IIqCkmtrM96gl71lvewC5OXGv6eiipm1q81hErX6LEufucBfMWfwpZ7KJ36UMT2/eBvvur9SNCDeDtnA+rTtry3cZMnOq7ft6hJYzoz3sfSB5rWWTz7R7+WR5r7H0OB8D2UDM9Ytyk3c4/hU4ctRq7OlXqYJJCim3luzrTfEOwmf2cXghVSqG70JXIn/aVKttfJapPZRMfO+Jjus8ajyfhOGVzVYkt9otPs5SFtvlh6+9dSG9pwrz7ebH8RB1ENigkMajHL7QFt5PnHjXMt7HNmbz5wEZsEL5qbnI93nM0z0Uf7wWd0F/TOP5m+0g6Lgr93/NIDVmo8LvtXyRjU2Cvl96O82N+62BvQ3KumIy5jC28lxaDL1s2EKvvaiEXhN1zs7pV4x2Wl7C1a63+m+1Dv7QY91iYKv7kaB/sYad305ajutj1wdQfeqX0/Q0qgIhg4BWKAXYbgSPfafbg12KHpU+JNPNI/mkgusLMmLL25vMHb0bEsAOArCPX++nNN6T+/cx/snbh1clOHW3/JaWytKp8cwjZdHLwnAxeXjj1+WIebt92L6A3fR0Grh20q7kG9X3DFvBl01F/Mvf3mo+V3JBl+tHWgLdQC7k7Hhuy44UMoMnrFBYebgTy6vukvHJRPWH/zsu+WegrHDRINd+lh2szVW/Kjv0fifQTOFVJR+oEOL1L7QjmsKG38sflCS4Gtgw7Ye2m38KHxSfy6addIgVN+4qEG0u6GVZc1z605dR/LHNPu1k56D71y+FNr6wWzrvcZ8Ki4AV5VNzqf08HL0EkhYkg0KCxNL1W//Xv+Ogb3R/3e8HrOtj+tvUBJ8jTqryrlJ0epUzE6aTKdT2FnpoGvhSPTb2rpxkmaE+iuGEgFYoAdRp00zM5XoEV1jLuUE7tqCsVvpvGaDNGfSXE9jBkFNdlY29+dg7qSurd1PBV+1p/l6fTbVSVHcsnNbcsK1CcPeWrSZ4WjNM2Dt22jMrNtfv1h3ymz5ZDs704D72tp0ar9rCoAuLcb1kf5sbteOnddt1Ga3q09yg67aOrg96Lrqhl3TvM3bnWIFwO7w6I1LZQ186WPLxtWrUgG3Rocq6wVjjTWr1s+yZAb7uPJGuJ/WeffTWorfyKQL0rl/12vi97xuBnxTM3i+6rdgHEQ+zY0IwrrurbfjlpUxDWraZ/W5pIXmwYfz+lLupdO0pFMmdxzNuPmUxRamjAZBg+Bl055fOAm4faPf8wniR/BLvaxzhg3q0THRt0BRnNv1ci07fN1OsbK053mtn3kB/M6tJNs6RRM7BK2tO3EB+6STrGIyzN0AeGI/Dw+2jsO39OWoG/ltGV3WBMGc7aHeaYbk6YE8Gwm65nUQBgwbArAjatxzgQ2jVL7EEydKjZ4m8+6UR8FYN85H/e7BPrK2tiITqa/upBQKKwPK1dlv2TvJ6wejNijVsVSiXi/vVCCpEdDTZbcqri4QPpBjY711iZfZ6jb4xImPG+v1wH12KBp2/LgG5u43Rpke9Ho2cgOny8faD91Nj6psVLZzurW1w5va73GL2WLzfZwrtyoblZ2PtcZtV0V2SpxmYDk36Bqrur95c+dOVTA0ON9DWWOrMmYarQgr+qcBSverNNPWAtELxrpxprXDqOSjuqmv+L2gGzHFDQeaBiTbsZWx4SGTvQke1t+VAdLy9dchCgR3KJ/Sj8uHAhM0z8OP3rhYkT6KH40P9dF4L/e8fLz8+oUtp1hJAqiNvyVdlk3yQvqpBVzATY8z/xgaxHyGRE38mxpxuVf9EUo/jvLw5u/3v36u+6fmri/8SfK/X65wxE9pFScZTXWytR167jwuzjTgd05nXST8WPXw/IgH7KINWhGv1a51Nz36/V3ednt1u8z+xo2P3NwQ2gmc3vSqvj7U38mBijOBpL7juzghw3AjADuixj0X2LBrBKWqLthXdsEZdyfOnt3E4+zpE32PHe80AlZVSSUatwvu/9N54yedEbkA7SDzjGW1VfTsyZMzmfy1qwMK7mXv0K926Hm+uKFcl+2tEqc20DJSg+Ml7/2Cm3Y6b9rt2l+NXKmT3volSs1/abB/O2gLZWPOeu/vuvWbNtev19pGjVtxznbIR9u279vGCIL1WwAZoxfFRW99NCBQTa1HXH7rzUdbwV/y5nPWTbe0ie0aHFq7Dj3O91Dnr78yLWOsEcyqlh6Wy8YUZt2/31z/MfT2AGNe7+uNjp62nw3dOSCIzm0u+PqmtgpMah3b1pmNTdc/gr1Gy7bsj6Kddbngxv3mJCZKPVORfvrSHv1/sdFhU7Ju7XUgiYJ5xU61s6g1nJGXXCD3f20OdIHcR9+58H9K3iad9Ew/nL8noS15vca72Furrn3wncu6mHDd+bzj5hN13BqczZtPGN/Xrm2mQzUrqQ5Q+8LGm/TAtNZXQ6T/RLz1i8rxr6Ny1OuHYnPSxn7XbZ9+5/KqBra8VsAmeDG46F7PNefz0AXWbV2Pn0P+OoRBvSqDlNNCV1t493IDJjdX6qeZ/WByxhl2NurwoNUBYNwZ2j9z+2gp+1vT+B5pB4EXH71+8ZyMoGZr10LQ3zQeI8rVEXT/j3U9YVwQgAW2oBHY04r+YuPR5nQP4t1lTxYlF1jV9AYPtDVrIxCnvaO/nJPOYD6znJI9fvypG/doEtRsBIiOyPPns/qosZv3pPtsXrbHJXvq1MfJekcthsNwIdPT+1LehNG4qQH25WygtG2ciYmaF9TKVrx02zWwFV2QNQJdWintkOerg3q9veXxxMRdF1ieT+2vMCyaO3ey25bdX1PuivCJW6/0/nKB18Zj9IPfX3E+2MST5r/c8db41+q2BeTq9UVXlro/kjykUS5XdwyVm8dQUj6//KUez0VXPl915ZNNvZFuSTsxofs5KsPmfrd2tofAe0X848OYGbe8mpvfPdm7dzVqSfr8+d115+OCmo11aNuuJF90tF6ffnqkuV3Hj3/dHT9bbhHUg6ori2uuTKsEXgEMi0agQIOEs6WHb8209WydYcLwWurRb2Mufesnlz+uf1Z/oG9dwOisC0vMSg9KPy1PSb11DskGbjXFgQtmlFITPZOVTgEfa4Mld5pIgmDFKAVAo02SLfTYeeoWpVIhKFdWB995a9UFXaI6kW5PYIIFfxpjTVswo/Qwai1Z8oflBbbbykfz3Oo+7dCi0q3LrK5LEhAygb3kIisd62e5gUEXeD/4k7cuPfrOxXlvPTTIrYHB1/zpQy/g2dgV3eejrWCfWW25+2an+WgeWWm05JYh4I67KBDnHXtqxm3bR+Fn4bXoeP2KdoRWuCreTY5sANkdOzqft1LHjzWzbj6/0PnIXqvH/bQr49Rj+jqf6rfnBxsQyzuerAsov1h4u/TTS2+5gKouf9JtZzGoB1N+K9BG2pJVr0VzM7CcHIcSlZ27WbFOG8JGPtmieOXoAtIu4J3uBM3VBV/WGx3ekFq/b8CEz/TpJrlmXpCz3rZFKTPcb+J84zcxqie7wGucUi/6Dl6efPT6hWMyIvS7HwSyFH5av7dMmgGMIAKwGAsuELOBpowDWof40eJK1Kt7oVB2wdjud2Bd4M0FW2qZlrOupmfLUQ7KpHWdjSo499qmPXFCK4j+RYfOZ7mZvzKZvhUkKrt1u7ZNwRYNRGqqhoq01i89Rr3eKbi4nHrXnp+y2DbO2prOqxyNntdCWFucHj+uZaXBs6JsQiOVQDUzX239fCi1v9z6unJ+yS/nTe+vkycfDDC1RMlbl4+84cmd8227mxyV7bFj8+47s+CtUzF1DLWXz6z77EGqFXW2Ja2W4fHjeuG96gKck1HO0/agaVsLh8b+qkp6X5fdOpQ1z3NmPbpt16rbrrlUztnGdjXyRUvb/OJg772BtA7XVtxRsMIsbUcKjGH4XQYwuqpx0KSigQvtaClvHBd0WDQvegEH9+ou0CvBC40AyAYewgzCwn0XwCgm77PBRReYnDKmkKp/hHvr+yTvaQtppCHwOuNK1jHqfOvv/f4D2Qa6Dgd/cnnJLdRroWgWXNBlIW98XTdr2+tngZnQ3/PUtue0KtZgz3JqdtZqYKfSqUVltC4/uXyp0Rq22Mv+ygkMuoqXKbttmok63nHz0sfRTdwreivfbBT0aj2i3Mt8GnlzS93mM2zcumlZV916XnMF3GwFq9vmvhe6famGyA22buvHOswnvc8a88lbtgtufhyG9YEH8zocT7pzDgd24rC80HgfxmvsfkOqzYBnfODe81s0uxWfc8fh0eY+t+11w7wc00HcVHZmnfy/JqjbJWkFZZvfC+kjLRN30+pjG9pz7saVHxTfp7mWm7+J7WZK/89/8WC7fpM2LG7t/LE1a9esCZaGPPUHsC4CsCPK2nBwLeOwJY1WsTO9jWy0pdvyOmNN5j3qro8qN4J3l2Q98WPGh7etpVu8vG6P7sznpgXol7W1oy4IvpwKbsfr46+TBhinmu+ix8vWYcycG29Z1nssac+eomQCmBveX0EwN+C8vq2Wro3lNPLnNi5i7YeyjaKO7o4dk1QQtpP4+JpvCyLW62W339/sut+zeVk7PeKadwyl16HWmH/+58ni3Y0Zt12TbrsuSW+Ps80NKjja2M+zgpHC+R5q4cx7Jf/93PVXq7JLNAInM7mfHS6vln58+agJ5H6n6V20Y2WnejN3sZ8H2Zajm3lUfSvCz+pHzQtBcb0y0Ed6XYDjcPXbF2oyAC6wqwHPYy4Q9Sin07VUgNOkOitL1880MOgCTcuhlaPZ3Kxu4mg605iRN8+nbvkHNzqftk5+cuYzjJZfv2BdgHIuyp4pqZawbTRoqkG7vBaZ9nO3z4z8Q9kbPOrh+Ok4n0HoeDzlmZjQOm8tmu5zq9s0L3szaU6S4zBppZ45DjXHtAw5bY3tfg/vumN61cV73zZ23XqnNps9N7TBV6f6W7+nL9Rf1+HqCPpS8oftpnrCKAkEI+n8zVfL/p9gJEWBFmP2N4M5WXGgqdJlem2Vty9q+ddpen0Eu17ft82dPh3tsE56Ap0edJ7LKLhbr0/nrkNcJnOu3KYzn0w1ApCd56sBrLW1/dLp4imed1WeP88NdKf2Vzxu+/TxY+H73bIqMljFxmsryBt3NhUzZr0bA32nQdiey6eRUiI1vd5g6L7f9bug+8+f92RbSgtZ5xjSfayfxblie92u/V23S2RJtz1vu7C7cb6HsjZY9v8ETdXvXlgKbX1fXs/rNpRr9vNQz/c12QHh52FFA5upYba+rTdVNEi9/PrF/aG1R3PLSAOvYXjNhvX9g8yl2OjkSgOY0y4Edi9nPT52Z8w5+6z+TX+4tjzW3J7peekT465s3TrrvLJl7Km5ENO8CyR+My8w2K/5DCMNwjqzXfe7PokV6jbld9SkrSqrh8ofu7LZv5X5DIJ3PGlAfClvnMa6VV39qtmoIMrt+2UXLO58HK5G+9odh6njQTuxe3i5JEPO/R66L039fvOY7rLPwiD45qPXf5965xhw9QKTqSc8EgwlHg8EhkSUumBiotgckM5r2sv0k6kA2gan3woXwNKLwZI3aDp6jNtfp21cn9S6+etgzGq/WpVudX9F8zh5cqrZMVkf121cbKV8svvdBcVrm20B3u/jOLtdW1k3ALvD1dOPU23xzt04QB0+R+mnP5iSehj/vj6rr1TJEdgmVUaFYFU+fV7b7nKKcm1qa8O9halkPbYS/HXbpC+t7YrUN5xns1/zGTatXKWFYjRgk/u9rXx26PhpW6/s8RRZf7/lHYfDsD39NKz7DP3l6gjpTgXd5YarJ9DYcghReQOwZZ0CsAIAwBY0Ori82xxgTMXdjDkquwwBWAAAkIcA7OggB+yIunLqvbL/nscSAQAYP5zvoayxVQEAAMhwdQR9qfqDBEOJAOyIMu29LZYFAACMFc73UOevvzItAAAAGa6OoAFX6gkjgGbJAAAAAAAAADAgtIDFWLAnT9713+/G/HAAMEz4XQYAAACAGAHYEWVDy4Wsz9qZzBDKZzutrR2WvXtbPcY+e0bPmsBux+9yX+zU+d7Ozk6axcXVrY7Tj+Vs5zx3atr1LJx5r+S/n7v+alUAAMCu5+oI+lLyh1FPGE4EYEfU+VuvVAQYEqZS0QtOgq4A0GeDPN/bU6eOSBjONAcYM+f+/5obVpZPPpm0J0/WzK1b+1LTnDhRci+XXIB9KhrnxAkNttdEO3/Ys2feXL9eyx2/Zb7xqsNKbh5ijx/X88dS3vQ9b8vJkzNuPY5k1qun+TbW8awbv5Sa1piqTEzM9TBtz+WxWdYGy5lBRgAAwK7n6ghaJ/DrCZoTlnSjQ4idAgAAsBuFoQZXS80/axfc36ILPE7mje6CiwsSV/BLqXGMKbq/GVlbe+KCqYcyyyimliHSmkdr+slo+ufPl+2ZM0XZAB3frdcTt953c9ZrsrFeT904s5K/TZca63OobVodFk97qcO065dHHKAFAADALkcAFgAAAKrU6YNGEHJWutOA5911gqhTHT/RwOXa2l3ZCBe0bZuntkCNW7/6FrLB0KjVrEhZ1ldum7bX8hC5v9GgMgAAAMYPKQhG1JUzj1MXKOevHyC3HgAAY2ZHzvcawDRGg5jxWw0grq2VM2PNy8RERer1SQnDWTf+kcbwyUYQdbrL/K9JEFQa/9YWs34L05IGO83t21VZbzXjoGgxtd71+rSpVGqNz++LtmJtfa7/rjbfh+Elt97p9dqzZzFnm6SxjtG0mygPbSl7WLbAGlsVAACADFdH0JeqP0gwlAjAjij3HZvJDCIACwDAmNnW830ceD1q7typpoY/f15OBSpdsNEFSMve+xkX7Py6tFrQTtmZmclGfvCsB27+fsvRFXv8eDEV7MwGSrsxpuJN9yAJvjZcEz8Aa8zLzVHjnLFFb9pKZr2y21RqbtPGy6PUpTx6cv76K9MCAACQ4eoIGnClnjACCMACAABAA5T3clueeoHLyNpapW0caz9045Ua7yZlz56ie13JmdfHOcMq7v9HvPevSS+rG69rteMIa2s1mehQ1Q3DqVQQ1ZilnHEeSJDK1qUpBTSI+lpmOZW2aXstDwAAAOwKBGAxLqoCABgmVcG4SOdYnZi4a0+cSI/htyZtTdNbwHFtbSUVKO3QCVgndnZ2Uj755Kxoa1ddj16mzwaVRX7RNsrbby+6l8WcaYup9/0uDwAAAIwdArAjyoaWlAMec/s2Te4BYIjwu9wfO32+10fncwaX2oakH8nfEH00vy2A2SN76tQR+eUvF5tB182ux8RErZfRXHkUcwaX2oZsoTzyLJx5UvTfz13fXxMAALDruTqCvhT9YdQThhMB2BF1/tYrFQEAAGNtp8/3ucFRzRW7vo+lRx2CvOtPF3eGVWnrSMvaFQkC7URs0n12v6eZaedZvWnP49rn8shjbfg0M6i/EV4AADCSXB1B6wR+PUFzwgaCoUMAFhgCUU/Ocacjb7Y92ojESnRRvWfPvLl+vSYAgO2iQcdWgLJe37+VDqXaaH5U63XYa21v837+fDbT0nTO3LnTTBkQtVad6FjV/Sj1zlrtNCuVIiBKbfDsWXO79dzTCEgPtjywYa+XbSlYk0PucvNNk2kFBABAB+76Ulb2FGR+qWxqAgwYUXFgB+nFnbuQW3D/XHYXkWcJvnalHabMyNraUy2zzbaYAgBsWDp36cTEpbyRtEWqPXlySjbK2iOZ973lSm3P45qebs+ebueJlcwy21NmaGoDd85J/qIWt3nTTkzMSo5Nlwd6dqhsJ3/rkl0ohLJsAjlL8BUAsAHu+lJmnofy9Lcu2KulWcv1JQaKAOyIunL6g2X/TzByGp2G6L6bFWzUrLvgXSYIC2DcDcn5fj7zftbdCLsUnccaoic5nj9fljC87wUq21l7KMrb6k9n7UxqHGOWpDfZVqdvNuer6xaGZzOft84ZmrrAn97dBE2t16lTh9ywI95617ynL7Llcckvj8bN1d7Ko3e1zN+up8FXd9G8LJZ6FABgi4zMfeX/KI9GOAhbE+oJQ48UBCPKiC0JRtsnn2gLIlrGbN5UoxXWnADAmBqG8725fbvqAooaFD3kDS6781jZHj9eaz69kaQDWFvTvKv7O8xOA6MVN91i8306h2vN3LnzQHrzbmadZqPAp/rlL4vNjrmaG9J630glcM39s9Wa11+vMMxOe6/5z7g8qpLufKtVHp98UmxME3/SvTx6cu7GgX2ClOdWqEcBAPpp/1f+D3LRvZ6TEeLqCJrHiXrCCKAFLLADGq1haLGxda2LbQDA4KytHXX/r7YNz6bO0fytxlyT9WgwNBsg1Wnr9WnpVdyKNZuuYErilDWTbblkbbpViwuklt2wez2s171o3PSyD0uv5RGXHfroUNkWafkKAOg7I7N/v0xjNwwGAVhgJzx/Xhb0R9x5GQBggLTFqAtCTksYHtVWqm0jaKDR2krUIdWtW5XOMzL62XzOJ1UNvrrl1GQD6+SCm9NtQVRvfpIOkk5mb9qZO3dmumyTDpuLxslZdg/lca3RQVdvOW3Rs+drUhYAAPrPhGutlEZAPxnBSPo3Z94r+e+/d/3Vquxi9vjxp/57d7E01E3w3QXgE+Gxuf4wpuYu9nnkAhgyo/a7PKyG9Xwf5eCemIjPY8asuhuLtSggmh3v2LEZCYK7zQEuAOt+s4+mpp+Y8POrbn19Njm/qMOspJXsBueRLQ+3jX0Nui6ceVL0389d31+TXey3LlrqUQCAQXn6J2+Zb8iIcHUEfSn6w3Z7PWFYkQN2RO32gGub7CN/w4+Lhn6xtigAhs/o/S4PpWE93zeCrVXZpK1OP4j5bSVo2u/tybI2fJpdpOxu1KMAAINSlBHi6ghaJ/DrCZoTlqfdhxA7BQAAAAAAAAAGhAAsAAAAAAAAAAwIKQhG1NXTj1OPop27cYDcegAAjBnO92ioCQAAQL6a928rGEoEYEdXUQAAwLgryijTDrr83Khh2NfOqXYLAu8AACCPqyNowJV6wgggAAsAAICBMHfuLLmXJcGuZk+fftPcuPFAAAAAdikCsAAAAAAGp15fssePV2TPnnlz/XpNsK5/XOr++afPRB78uQAD9+t/S+Qbvxb/+8//k8jP/6L78KxvTYl8bbL1vtu44yj7XdbvrX5/h93fKcZ/6j/U4r9uwwGsjwDsiPrCBDQxT5sXAMAw4Xe5DzjfQy2ceVL0389d31+TUWPMjKytzdgTJ8ru9ZqpVFYFHf3j6e6f/+UqAVhsDw20/ub++N963PkB2LzhPiPxOEnArtu448iY9HdZnxP/05XRCcAm6/6j5XQANm/4ZmgAf9+vtd5rcH4UymbYuDqCvhT9YSNZT9gFCMCOqO/zhUoxt2+XBQAwNPhd7g/O91DWhk8zg4yMrrIUCjP21KmyuXnzngAYGQTH0C96Ejv5Ris4r8Hp4wscY5vh6ghanH49QYszEAwdArAAAAAAto8xRQnDij1+vCx79kyTlqDdX2baB//KXpGv7JUd57d+U//BXfL/qCrYBTSikxcc0+F/RXv2sfaXqxsb3otfnUy3jNaWtBxHGHcEYAEAAABsPw3Erq09JT9sO20J5tNAxb86KjsuGzT5SwImwNgbRKvU/7qYfv+zJwKMPQKwI+rq6cepR9HO3ThAjjgAAMYM53vsCnF+2EP2xIlFc/s2+aOBITWIlpAYboNo+ZzkBvbnRWde2A0IwI6uogAAgHFXFOx6LvA+yjlfe6X9pJft8eMzUiiMTX7Yr3ipAzSIMQz5DX+10SP9uD7uu5Xt8/fXX23x8ersPJJ5b3S+yXTDcPwMYvlbPR77UT79+p7287vVr2OxH/Pt937PtqT/8//YeV2SfYvOXB1BY9i7oZ4w8gjAAgAAABgOSX7YEydmZGLi6DClJdBAwG9Oifz63+7e+7eO9+ZvxAEGP8igtKWgTqfTb2cANMndml0f7Y3+wZ+J/Gwlfzq9or8913r/K5k8tL/xt9w859qn+7dung/+XAbi93+n1XP6J5+LnL0eB3T+ccmtz99OB9L+7D+tX9bJ/vqW27dfm0x/tl75+Ovy1I1786HI3OFWOf+FW+7ZH8at/XT9knX7UTVer/XW6c1fT+f+3anjJ2I7BMLs5oLK2e3rdX/502f3WT/moXS/6z7/s//Y+3yy++pP3fR/tCwb0o/t0vX47d9ovb/ljsk/d9N+49fiTq/0Nbuei/e7z/OTDgHQzbZ8zqYf0PXrRNd39nDrN5c8sRhlBGABAAAADJvSsOSH1WDar/+tOIi2XkdYGgjUXK3ZgE5Ch39tKg7k/qjaPQjXD7q+GhDU9c+jwQ39XIOz37+bE9wwnbclmX9emQyqwzDTmHeyTlre/5Xbhn95tH2ZScBcgz0aBM0LHnaaNpGUz++48vnnmfLJrovK7vtfc//+w3/aXoa/U4o7MMsL4n/LHWenXs9fp+T40cD3zXe2J2/mv/3z/AB0p+Hr+VqHMvH31z+/2znQpt9HDXx3Ou5+s/H90sBjp5sA631Pdb9/w+2Df+CCmf/yj+KA7Ebno+uQveHRTbdj0d+uH1XXD97766P/1qDuydfzx//08/zhGphNjk9/X3Qa3qu89APdArA6vm6Dfg+T5etxT8oCjCICsCNqlzyK1jN75kzRf08nDruLPXHCCgCMo/oPU2/n+L3DbqP5YZ8/L7lz/TVz+/aibCMNWiYtWXvRKRijrcQ0+KfD/eCKtojU4MegWoqqbsFX39ca6/7Pfjhaj/vqBVG3AKr6tUbr2FvvpIfrNudNq/sruw91Hr/3f4lb23bSLeiet96//evtQSTdV3OHZF26zrNuvL/6uH0e2RaQvUpaSmZ1Cj52Gr4e/U6tt7+0xaMGYbP+bjHeZ7048Ua8jtny6fY9/ZXMDQVdl3/+O50D+HpcdbtB0e2z7HjrHcf+MnVdew2+a0D/G7/W+fNOQVQdnvdZp+G9yqYf0CD+Rn5zkkC0loEGovWYJUUBRgUBWIyHtbWnmSEEqAEAAMaBpiUQWbDHj5/V/LB/Xwan0+PEvdCggh9w0eCPtir1gwMaPNHWps3303GLrkEEEPQx5mzw1X+cXj/z1yVqKffrcQu7hHW3fI4ttN5ry0t9jDmhuRtvZgKbajsDIrqfdLuSQIwGeHQd/X2hQagfVdPrpa1Q/X38//mLOOiXjKNl4W/rN/5GvI+7tbxL1sNvoal3zZJgoj98XyYolqy3T48hDTLp69cmW4+QK73Y0Za5/+Fue3n0GvjLTrcddDl6zCd5P/P2l5ZzNvenbu/Zw+l5aRBOA8dJ+eh3Nznmo/FdkPrEYnqa7PdU00T4LW6jIPjhVnloEFYDftkbJRoM9ltyqiQ9hK637l/9fq23L/JuImS3S7/L/rK0NauWXy/fs2zwNZlGl6fH5mYD6ZuV/U3S7eim0zYmrWKT9Aya9mS7t2VYXD39WA+j0Btkz904EAiGDgFYAAAAAKMhDD+SAeiUI9WnwRUNFnQKmGanTQIxqWHVOBiYBGWSYNkgAgdv/kb7+ujyE7pMXT8/6KfTaKDJX2+/tVs2F+QnX+x8Tsa87fofayJ35lpBrU7lnOSw1EDU7Yfp7dZy+NXJVjlqhEODR50CsBqs1la2prEOyfHwl41WqqaxvE6tETW4nQ0M+gF8LWdtianBumTeSZ7hUXocW8tVg4uJvP2VlLWf4uDgVPfAqb7qfPzy+dpL7eWj5e/nLv2jTF5VDaBrIN2/OaFpEbIBWF0f3198HO8vf7v+/6vrt9jtdbuSbVHaUjdbPt3oMfTgz9q/29myGDTdr9/yAsmaw7lb+gGlN0b+0b+Kt1dzPGcDuH56Bt3Pf/pkc6kxgO1AABYAAADA8LJ2VYy5Zu7cKevb37p4S/pJW5O92eGR7fWCrr7s539nX35w4fiCDJwGDrOBvj/NCUpoQEYDTX6gUqcblYCeBk7z1lX3hR/s1MCPtkj0A7CLS7Ku7D79yguyJZ2OoWxgSv1RTgBft1cDTEkgTqfLBhiTVpgb9XSbWg/+/P/XPkwD+9rhld/K0w9KZvOGqj/K6ZBKy0cDjX75ZIPmGiS/ldNq25cNSmb3u85XW0Sn1qcqbf7DOreL8rbr3/1Z/nbp9v4dL5irvy+9BBp12v/+h/k3Sra7xWj2d+nP/3Nv0+n3QLdV/76yt3MwNrkhoek9uqULAXYKAdgRdfX041QOOHLCYjczt29z/ANDJpubme/p5nC+hxr142BLudqtvSb1etlUKgNrp5V99DrqAf3JxlMDaLDVD+TqI+waINDAlna4pPNNWp0OWjb42q338Gzga5QCsN1spJx1mzVws+9vtA/fDkng2/crL8SPnmdlH2n/1ZfS73XfjV0HRaa9hXnyaH5WW/l0SQGgn2nLY331g6zrpnAw6f2lP3CbDWBn97seC3nb9SuZ36l9X5OeJKkehoEGRn3rpR/IkxeM1d8v//jYrnQawEYRgAUAAACG2C4NvFfd37y5c6cq20wDIn+1L26Vt5EOXpKWh9m8qvrnt9TajsdkswGITj2dR5896z7tONN9rSkYNtJb/SDklXmnXuuzfnW9YOEY+NWvtg/zv2fd5LVa/tVG/tC+7Xe7ydakpn3f97xdPX5PP/1ChkLUGvlvt95ryob10g90k9y00JbA23WjZFi5OoLeA+AG/QggAAsAAABgOFhbc/+fc4HXHh4Q74+njVapfkBDA6ZJ0FSDBNpKtJdg7I+qccvZU2+0Px6bSB6T1UDL9+9uT+u0T7oEYXZrD+IaGP9XR/NbQCdl8quTm+vQaiclx9dG6fG9Gzox+tXGfs/uV007kHwX81okY2u0PP0y/x83kc072S+arkNbLncKQj/9SwGGEgHY0VUTwPff/Xci+xvPj/3n/yxSqYj8z/+zbNhRVyP5b//brc/nH/0jkd/8za3PBwB2t5oAu0Ejz6vU64uDTDeQR/OgatBUA6Z5vZbnBWO7tV7VIM6/+KM40JMEwzRfZDagk/Ti/f27MnDdgknZXJa7gTYVmz2cDuBoq2TNDeoHpP9xqfcWif22cL+38dpyDxc3t84agBzWAGzeTQLdV598vvFpdZ/633Ht5Omf302PpykA9LvZs0ZL1n7czNjsdg27f+ClH9DmmprmpRe9Bl07dTQGDBMCsCPq3I0D+wRIaKBzv5e862/+TZGZGZE/+APZEJ1PEnzdynx0HknwdSvzAYBdjvM9dgVrKy7wOu8CrzXZIX5eQQ1gaQAm2zmOSoKxGmRdL8+mjpPMUyX5JvWR90QUnP21/ge+suumAadOAaLsI+y7oRWkloXfSlQDQj+q7lzgRo8VvxW2ld6Osd0i6VTND5xqkHKjaTw08P4b3mPwWs7X7m9iv9v29dlU7uSc+eiwQaYn2QlRZ3FebeYvP+69rP4rV67/8mjnz5PUL3xXMAoIwGJc7NC96SExlZOp/b/4L2TH5uMHcRP/5X8pAHaV3f27DPTRGHfGVpUdyvPaTdKJ0Y+qccD0t39j/cfQNYj59lzrvQYx/9kP0+NoQE1bZ2kgwk9PMIicq9mAnr7+5lS8fJ+uR16HXb369b8pIykvR25eKojtyq+qX3C/MzT9gp94o71lpr9eGkjUFn9Zf7nJwO2wdNSUR8tHO2zyO7n7nenOncvp/tVO8H5UzXyQk3P1L3Om/5W966+Pdqz3NW9/ReuTac2el7s2Ox9tCeq3WP4Hbhv/7D913i4d99ZDGSl6s2Or6Qd8SWvX3ZI2Yz2ujqCHYOgNsq6eEAiGDgFYjAVz+3ZVdrP/6X+KW5n6NvO4f958PvtMNixvPv/L/yIAdo9d/7sMoDNNNyAy6wKv92SIJQFT/UtaxHbKrflXjce3k2CmvmqgRFtm+TRwti8T8MwLsGWXk5dCIDuOn8NSaYDCD+zovz951mpdp9P7rXGVpmLo1hqwlgl2/MoL8Tw0iKTbr9unwSt93UoHO4OW3UbdDn9/RQG838hvBT0o/+7P08vTln9/+E/jYFtSlkkr6uSmgK5n9hjzW12Pk3/bKJ8kgPprjVyuuv1JfubkRkOzfF7IBCtt+saERq38gGay39/89fXX59FKen/93WI8L01locvQ7+xsD2kMdLt0mRvaLvd+sccUFcPgoNfGZyPpB7I04K6B+PV+p4BhRQB2RC2ceVL0389d318T7F5/+qdx69WktaoGTTXnaj/mc3cTicn6NR8A2OU432Os7GCe161KgloaANMcknkX/xow+f3fab3X8TRwq518aeBTAycalPFb4HVqwfWvujxyq5IOpHyaM9QPvGngWHsdT4K3ulzNa9kpt6UGcLPBvCxdVw2C+MFfDVZlA1bWRVn+QVmGlu6/7Hbo/tLtSPbVdtNcpBoI9IPiuh7+MZX1O6W4JeZuePw6OT6z5dMtV+tv/3ocsEvKR4N/GiD1W9LqPtfgpu53vXmQ1yL9K19uH5a0lM8eQ/q3Ebrcmw/T27Hedun6/vl/HO6bHImtpB9Qn3itXUkzgFFHAHZEWRs+zQwal0fRsBnauvT732+1OtUWqJtpuTps8wGAXY7zPcZI1QVej+5kntd+0Bami0v5n2mAQANEfqtTDaR0CuZpMPPmAB8l1iCjdgaW1+N7lga3fvBH6z+GrgGs2w/jnIxdUyeYOFg9rI+163ZowDpbNl/JBOD8Vs1q39dkoDRonjxmvp5PG4G73RSUSlJoZFtu59HyycsN+kfV+MZEt/2ezcua9/3pdAz5kvQG633/khsnp97oLSWJ3yp62GXTD/y/Nrje+h38+TsCjAUCsMA4+c//Wfpi2OYDAMAu9oUJRr0ztundkpbkR9X48VhtBac5OvOCKRpQ0NZrOu6gaQBUc9FqKz/tRTwbCNpMz+HaUvO//2HcMjMvNYLOZxTyMmrZfP9uvK+yqQaSctHHw//v328N/8bfGHxg+UfV7seQrpu24tR9Nsx5WwdFt1tzpG62fLRFZS/7/c6cl0P5hTiQmA3mdjuGdFwN0OpnX+shlYUGYXUaHV9bjOZ9V/V7pfMcpf3eln5gDNNj7DRXR9CipdPWEUArihE1xp0x7Ar2xAkr6Bt3UcfxD2Ascb4H2v3WRTsy9ahsygENoOxk7kJ/fZKe5beyPr+aaeGbzUM7KrRMkmDysAWQs/uMTofStnJMZ/f7Vr4P/rz68T3o93d1J2iF5fZc6zfiLz4WObEoo8D+yVuGTqzQd7SAHV01AQAA464mAEbWsAXL+r0+fzWiAdesJCfsMCLg2t1Wyqef+73fx9A47Pf/uhi/JqkY/t2fC7Cr0YoC2AG0gO0vWsACALB7jFILWADAyKEFLAaCFrAYC/bYsRn/vXn77YoAAHYMv8tA/1w9/TjVGdu5GwfI9QYAALSOoI2Rfu4Nsq6e8A3B0CEAi/EQBHczQyoCANg5/C4D/VQUAACAfEXv3zwlMqQIwI6ohTPvlfz3c9dfrQoAABgrnO8BAACA0UcAdkRZGyxnBpEDEwCAMcP5HgAAABh9BGABAACAIfaFCcj5CgAA2rg6gqYcoJ4wAgjAAgAAAEPs+9f31wQAACDD1RH0pSYYegRgR5Q1tioAAGCscb4H2ll3oWnomAwAMADuHLMiwAAQgB1R56+/Mi0AAGCscb4Hcj1wf2cFAIA+M4YALAaDACywE6ytuV/2oqAfOEECAMba1dOPn/rvz904sKtzvQV1WbIFArAAgL6zdSNvyQhxdQTtoPXn3iDr6gnfEAwdArAYC+b27VHrFZqWG/1iLQFYYAiN4O8yMMyKgqb/xw9M9e9ftNcsdSkAQB/ZUK6985apyegpev+2gqFEAHZELZx8f8Z/P3frlYpgdBizJFw09Ee9Pi8AMKY43wP5JgIpPw/lNffPKQEAYOuefDYhXFtiYALBSLKBuev/CUaKuX27KtZeE2yNK0NTqdQEAMYU53sg31LZrO4JZNqIUJ8CAGyJDWXx00AOVt25RYABoQUssFPq9bJMTNByY/NWojIEAGDMfWGCXZ3ztZOl+EJ59vWyXSyEUnb/flmoVwEAemBFau7lQRDK0p/8C1OVEeXqCJpygHrCCCA/24i6evpxKq/HuRsH2JcjyM7MTEqhUBZjSEewEdp62AVfTaXCHUoAY43zPQAAADD6aAE7oqyRimDkNQKIsy4Qu9gIxNJyoxNra6KdlxmzZO7cqQoA7AKc7wEAAAAAAAAAAAAAADrgMTYAAABgiF05/cGy//78jW9OCwAA2PVcHUHjeo+8QdbVEw4Khg4pCDAW7MmTqZ6hza1bRwUAsGP4XQb6x4gtCQAAQIaRqLuAkjfICoYSAdgRtXDy/Rn//dytVyqym1k7kxnChT4A7CR+l/uC8z0AAAAw+gjAjigbmLuZQRUBAABjhfM9AAAAMPoIwAIAAABDrG5Ccr4CAIA2ro6gKQeoJ4wAArAAAADAEPve9VerAgAAkOHqCPpSFQw9ArAjytpwXoAxZE+cKK8zyqq5fXtRAGAX4HwPAAAAjD4CsCPq/M1XywKMp0tdPzWm5v5PABbArsD5HgAAABh9BGABAACAIXbl9AfL/vvzN75JrjcAAKB1BONeHnmDrKsnHBQMHQKwGBdVGTH21KkjEoYzzQFB8K65ebMsu521tcyQSTFmUnaYPXGiJOnWuSvm9u05AdBJVQD0hRFbEgAAgAxXR9CXkjfICoYSAdgRdeXUe2X//W5/RNEFwkavJUgY7hP/h7I98LgrmTt39vnvG4HPZdlpYVh0QfKSAOjJSP4uDyHO98BwKD0sFwMxM80Bxqw+ev1izymRSvfLk9XD5VUBAAC7EgHYEWVMkM2TWRYAADBWON8DW1P6cflQYILmkzSP3rhYkc0pSvr7WJMectJr4NaYwl3j/nnwncvuS23Lj75zkc71AADYZQjAAmPEnjlTjP6xd++qWVzcVCuLaB6Z6e3s7KQ8ezZprl+vyQYl67SZafsp2YZhWJdEP/YXAGD81U1Ii/JNiFqtmsL95L2JU6NUZBs1Ws2WmgOsKZful6/RGhYA0A+ujqApB6gnjAACsEAfRUG+Tz89ItYecm/nze3b1eZnMzNFKRRaj9Jbq7lNWxOH4SF7/HipbaZBsGhu3bomnZapQbznz2fdP4/I2lrcwuOTT8TNqyZ6obFnz3xewNGeOLHs1qHYWEbVrdu8m/6u+ytF0584seL+PS0TE5fkl7+c0Tys0TyNqbjtms/M676b11TyXtMI2JMnz7ptKifr5MaRaH0mJo5uVwA02h+ffHLWrduMey1Ka331ZSUq25s373Wc/vjxp97bbB7aUubzWBA8cPtrVjrNc5P7q7HeZffymltGpdt6AwDGy/euv1oVbFggQcl/XzfbG3xV1sikEQAABsPVEfSlKhh6BGBHlA3tUcHQiPKUatD1l7884nUY1f54mTHFjjOJp2vvbMralzpNEgU519YWU4Hc9LJmXLCv5MY77IKCK5n5Fpvro/9+/nw5s35TLli6HL0m848/L7vtfdcPLkvcUVZz2kZA9lDOepXc+j61p07NDDqA6Jah++NuVK4m99JnygWIKy7wWXZBz+ncoGe3/dX5869K53U64sp5MbdTsWR/ra1pIP6oC2IvdZhNya13KVrvdQK2AEYf53tg86wxR1I1gLD+rmwza60778ubRlMY6PtQaP0KAMAuRAB2RJ2/9UpFsONcEEyDjGdFg2Jme9s3uCDnJVerL687ogb2rF22Z87s7xKoK3UMUuYuPGrhW5XODkk3Ybjo1ufdQQUOG61M77YFOrWjs2zQVN9ry98BP7YRBYRdwLeH40QDxvfd/p3OBLnTWgHbGTdulVaxwHjifA9sTpR71Xv034p9UH2jXJNt1ljmvtLDyyUpBKvV139vRQAAwK5DABbYIO+x9tnclowdmEql5gKD+5oD9DH0OHibeCATE+2Prj971tZKIgowrq2VM4Oroq1ujVmVel1brV7ygo2T6wYZjTkaBShF7kvSEtfaVTf8cCNdwn1v3NdkfbouS435aEDW77hisvEY/qwMwvPn5cy+idIpuH0QlaU9dmzWBSwXvM9L2oq5LeA5MdHaX3/914cy00TpFNqW3Wl/PX++kAm+rrhymZc9e3TdNEh+NxMcviTZIHcY1tw6SA5axQLAGLty+oNl//35G98k19s6sukHrF+P6YEGcPW1X0Hb6hsXqgIAQJ+5OoJeZD7yBllXTzgoGDoEYIEeRWkGNCj2ySelaEB+S8aqC6QtuQDovSTY5/ODYm5+6c+N+bjnoFkcYEwt1wUP/YuxFTszsySFwhMvqFdywybz1suNUzO3blUa61WTpOWrMStJULKR/7XYGL5e4Fnz35ZT6xPnXb3kLfOIDCoAa8xXG8Hk5P2cv93m7bcX3fYUUwHwnFa9qf117FjX/dlVvL+K3rJq7hiZ9tap5v72uTJ6Iq1Wx21BYbfeFbcPtbVryf1p+ZXSKxQtI2kVu+SWc69LKgMAwIgwYkuyC5XulyeDF4Oz1soha83cRoKYbekHPqs/WG+aqNWsKdx1VawpsfHN6IPvXHb1H1sJw7Cn9AVufA30TnX63K1T7WevX5juPP1b7oa5KbWG2GuPXr+4mDfut358+ZANpHlz2Lp5L3vzPvhwvmxM8JpbaOVn37nAUzIAMIaM/vqnrwutYCgRgB1RV848vuu/P3/9wK7OEZftDEk7gZI+sqdOLUgYdgoWdg26DoQxb2aGtOWb1XVxQTitbLeCnnv2aJCxIt31YxuqbUM0V+3EhAY8k+DtpD15cqotN20fuKDl4fVHMuntDIKvyuBkWwyXOxwrur/8izb9d9UfQVtSS7wPK1HHbp2CsZoGwphD7hh44Mqje0oIYAAG/bu8W3C+x27kAqElY80hU3DnNxt3YrWRq8ls+gGnsl7e1dJPfzAV2HA5CrymF1Z00dxyYIKe6itu0skk32uHz9ebwbvuanomeWskqvPlBmBDI4f8ZRkb3mufnSsHKyUXGC43Asn3diIVAwAAux0B2BFlbKti1rC7L8jW6yxpq8Iw2xGWPj5e2daga4MGLaOUAL4wLNpjx2baR4462vLH69giY9AaAeGatAcYB5oLLSqvOACa3nZrt6UstNVx2/EZBJO5+ysMv5pKMWDMy9JFh2CsBrn9bRtkYBnobNC/y7sE53vsFtraVb4sJRMUzkbB041GXT0uWJq68RgWTNenQTRgG4RhKwVTLrMt9YbwWbhkXiwsmEYLXA2gatnkBpADedMvo1Bc3bSzRiC5UD74k8tLxtVhf/bdMk/JAACwTQjAApujOVZL8qUvrdrZ2QdmcXH7grDZ4KsKgru9TDrgVp69+FC6PJbXT41A9YL7K8nOat9f2iNyfi7X7HgvSQ+ivMSffvpmI43CjgXZAQCDYUM7toH3JM2AC3DOJo/998GR5r+MrFb/3u93TT8Q2IlD7m5H0R9mQ7lmJwJ3sz2cNHFL07PSA2PtPTd1M12BlaDopj8iPdJA6/Q7824eQXN5wQvBjGRawcathFvl5davmm3ZagrBx2472mlKh6BwSNMruHUr18P6u7SKBYDR5OoIeiuOG/QjgAAs0IswXIke+0/nPtVe7Q/JJ59IlG8zCJbkxRe3Nxg7erYlANzo9Go5J1ettraN90/cOrgow61jeUVB1//tfzsUpR9I8hK3jRR1orZuzjsAwHA7f+uVioyZKIBoCpdM/Ih8Lje46u5XLtU/rd9bL4WAN99iqrWqlfVbeQb2bGbB88vfvVD2hlQPPpx359Tg0nqzevTGxUpmfUpGCj0HYKPF22DJBUab65SXhsDNc8Z/XzftKaZ+9u0L19zyHxQKhTfDMAoilzKjFN1leyUwBc1dWwltXdMTVAUAMDJcHUFfKoKhRwB2RNVNSO+32yjqtGlmpuKCXZpX81JO4K4tGGtu3tyuzg5W3bLnehozCGqys9IBUWs/lkFYW7ufCr5qa5R6fdZPF+H2U1n8/LjbKQx7u0OZyVObCrr+8pdTmsqgw5QaaH7gtnlxu1NkAOgvzvcYR9PvXF7OCQZGNhN09RljZv33oZWu9bEo9UEmZ2so9Up2vFBsNdimeoN2NubKqJqUUV4aAhegbeWX11a+HTrZarRsvaZ/cXA6cIHvqIOyUmbUGReIndFA7KPXL9CSCgCAPiMAO6K+d/3VqmBbNQJZFf3T3uldUG/G1X7zWjREwVg3zkd+D/Z9s7a2IhOpr+6kFAorg+jMagCyj8f/QvosyrmaXU69Xt6pQKTmaXXHgi67FSx1gfBNHRuffDLrpo0v/vzcvi1V9zc/kOMOwI7gfI/dwIpdCQJT2WzQ1WckeLM1X6lpMLPrBHvTdQZr7Er19Z1/HN/Y8F0xQSl5H+wNmh2plv7kB26dw2Jz5F5a+UozGFvRv1YwVs6abcpvCwDAbkYAFtiERoCr6oJ9ZRcMPeSCsWc38Th7+gLDpnOPdVx23JlVVfyWC5rrVCS3lVT0OH69/qYL0F6T7aMV+ao/wJ48OZPJX7s6oEBhtlXoaqOzqrRsB2XrybRGdaY02NtjYFeD4yXv/YKbdjpv2g3vrzjNwDUXmKe1KwCMqStnHqdyvZ+/fmCsWihqANCGMlX4snzk3vYUTMyTDUyaTF0kT8EWJq1XHQisGYpzafjMLgYveC1ujdEWr5Xon4W1Ge2BqznuOq18s7Q1rZeWgOArAIwwV0fQs9jb3iDr6gnHBEOHACywBY3AnubkWox6tddHwzs8Upcj22K15AKrmt7ggbZmbQTiJt37l3PSGcxnllOyx48/deMeTYKa0fRra0fk+fNZfRzfzXvSfTYv2+OSPXXq42S9oxbDYbiQCnham3uBFY2bGmBfzgZK28aZmKiZ69drjXfZCyfd9lm37VHutOgx/k8+0bxqG8rH5vZFe8vjiYm7LrA8n9pfYVg0d+5kty27v6akUHji1iu9v1zg1e2vco/7S6ebd8uqCgBgrBkrM5lBIx2AzbbubJixQWHm4E8ur2qLThPWH/zsu+UNBWNNEG4o/YCyRm8Ob+CG7DaJO+NqpSFwq3jIBU7ndLgLWDfTD/TUylcaQdevFI4kuWC1c67sVrtA9KrtIWgNABgeJs6jPuMN0iEEYIcQAdgRdeX0B8v++/M3vrnbc8RtV2CxI/P22xXR9AQzM0UXXCu7YGzXFhQaeHNB01qm5WzZBRzLLvimqQbiIdrCUdIXENG0J07oNvstI3Q+y9G0Kpm+Fbwsu3W7tk2tJDUQqakaKtJav/QY9XqnfZY6ttumi1sKp8dZW9N5laPR81oIa4vT48e1rFZd8LUom9BIJVDNzFdbPx9K7S+3vq6cX/LLedP76+TJB6nUEpoz15h5WrtiROz47/I44HyPcfTojUvl0sNypZGPVDviKjY/tNGTLJsKxvp5UXsNTIYS1gIptN4bOylDwlp3o9U06h1aLnsLU67can4nYy5oWu40fS9B13jWcd7dsA8pIAAAQD4CsCPKhXhKgiYX4CrLkGi0ip3pbWSjLViW1xlrMu9Rd93mRvBu/Q4h4sfUD29b0C5eXrcLmPnctAD9srZ21AXBl1PB7Xh9/HXSwKbXS7Jd/xE8Y+bceMvSnuYgbc+eomRaOG94fwXBXDavr7lzZzvTSABbMky/y6OM8z3GVTof6eWSCwzOuGBj+ukULxjrxpnuFlB1gcmSeIFc03tLzpr/xogpZju82ilRZ1wuCG3ictCWw4eMCdJPUIX1dztNH+w1sy7oeik36GrcTel6eM+aYKmXQDUAANiaQADsmOjxc2P2u4BbLXeEOJBZ6TJ92QUb97nx7nWcXluh1ev7trljpqMd1kkvGqYHHZiJgrv1+nTuOsRlMufKLduKbKrRgVfn+WpAdG1tv3S6qIvnXZXnz3Mv2lL7Kx63fXprr7l13++WVREAABwb2qP+n4wZDQAuv3FhJrT1fVbkms0ERXthpDDjv+81L6oGgqNgZMIFOzVwmR0vkKAoO8CEYfPmqwmCN63XAawV+6ARyN4Au+ImnLef1fctf/fSLMFXABhtrl5gM/UE0g8MqeFLeISeXD392Prvz904wL4ccVHqgomJYnNAOq9pb/Pwc6NuYvrNcsvVVqElb9B09Ni9BjQnJqa2e31S6+avgzGr2ValW5jv1vfXyZNTzY7J+rhuAMYH53vsVqWHb80YF2xMcqC6gGrXFrAH37n8VBotYDWAu/z6hX3So4MP58suuumlCZJVt9zZ+mf1B/pWH+O3VtNEpZ6AqT3KWUbpp+UpqbfGKxQKL9sw6i+gOZ0LNKeD6M9kpVOLW+1YLCiET5L3GixOWsSGRmaq37lwr6ftMrIUhnKNgCsAADuDFAQjqm5CcsCNmcYj+TXZgm1u5bquRsqDquygQa1DX/YXAVcA6+B8j92q+sbFikTpCcpFI4Vyt3Gz6QckDB/IBoTP7KJ5Uc4mgU0NtLogbiV4Ic4Nq7lTe2XCwkIzb2v+tMXAFFLpp8K9dQ3k5gZgq7/1eyt+Z1zJOkY5brsEX6NxC8HHti7z4bP6IrldAQDYWQRgR9T3rr9aFQAAMNY432O3azxiP9NtnGz6ATthK7KRZbjgZOnh5cMucNoxL78Vu2K8zq+2kxHrAsqmlB62/s3ln337ArnjAQAYEgRgAQAAgCF25czju/7789cPjF0e2K1wgdPXkn9HLUO/Xd7wEyb6aH7pYXmfMcH9bKDVhnLNfhGWzQsFTQVQlG0Wfh5WzIuFS8ZLgRAGdYKrAACtI2h6qre9QdbVE8gDO4QIwAIAAABDzAXeZjKDCMA2fOvHlw9ZLyhqxG46MNlobbtf0x6IFIrRwGd1Pz/runlll1+/0Pe0IY3lvyQAAGSYuLeAGW+QDiEAO4QIwI6oq6cfP/Xfn7txoOeOBsaRPXOm6L/fic6eAAAt/C73B+d7oDtbsC+LNbXkfWjDJdmiRiC2JgAAAH1CAHZ0FQUta2tPM0PoJXo7ra0dlr17Wz0DP3tGRw/Absfvcr8UBUBHj75zcd69zAsAAMAQIwALYMtMpaIBV4KuAAAMgA0tKQcAAEAbV0fQlAPUE0YAAVgAAABgiJ2/9UpFAAAAMlwdQV8qgqFHAHZEfWECcsABADDmON8DAAAAo498bBgL9sQJmxqwtvZS47F4AMAOyP4um9u3qXMAAAAA2JVoAYvxYG1NjCk2/y2iHUIRgAWAHWDPnCnK8+et32WRFQGwaVdOvVf235+/+WpZAADArufqCPpS9odRTxhOBGAxLh64v5fd37y5c6cqAIAdY65fr7mXffbEiZK7KTbj/m0FwKYZE1zKDCoLAADY9VwdQZ8y8+sJWu8uC4YOAdgRdfX049TF7LkbB3b1o50u6DqbN1xbYTUCAQCAAbKzs5Py7Nmk/5trbt+uupeqYNM43wMAAACjjwAsxtvz58v2xIliapgxNXPrVsdOTaIWWyLLnT5301fc9Ee7TF+W9B2o7PRH3fSVLtPrsksdp5+Y2NctqNyWDze97EFve8W9HJHOphsBmfzpjx9/6j2y3L74Ljkk7cxM0ZXNU+ms6qaf7jj9sWMzEgR3u0w/76Yvd5x+kNvOMcsxmzf9sB2zn3ySpICh0ygAAAAA8BCAxdhqBGaKAgDYHi4gq7+93QK3ADbO2nBeAAAAMlwdQRuzUE8YAQRgMc7OCgBgu2lr6qoA6Bs60wAAAHlcHUFfyoKhRwB2RJEDrgfW/kKM0Z63pwQAMHhxCoIPBX3D+R4AAAAAAAAAAAAAAKADWlUAAADgf2/v7rbbuM4137+zQHnZzlod+goCrQvYphLntA0quxN/jWFqXUALtCTHR4ukvfdJJxJB0TnbMak+2bIlWVBfwBI92padrLFE+Dgfom8gQvoGzLQVf5Go2e9bVQCqCgUSJEESIP+/MWAQVaiqWRNFY+rhrDkxwn775h9q6dcMSQAAAIy2Eeypll5GO2E0MQQBAAAAMMKcCxZzi2oCAABOPW0jWMfKdDvBJuWqCUYOAeyYeu+Xf/Lp14wRBwDAycP3PQAAADD+AgEAAAAAAAAAHAp6wAIAAAAjzPtwSQAAAHK0jWB3S9FOGAMEsOOrKQAA4KRrCk49JtMAAABFtI1gTzUBAAAAAAAAAAAAAAAAAAAAgKFiJl0AAABghK1c+WM1/Xrh1gt1AQAAp562Eeypml5GO2E0MQbsmFp561E5/Xrh5rmmYF8qD2ozgQsm268fvnytnll/vzYZPB3M9Nve+XCz5WRTSrLZ+HltQ06hfB2GEjYaL9eaAgA4EL7vYXzg7uYW1QUAAJx62kawjpXpdoJNylUXjBwC2DHlffg4t4jezPtQ+bRWDlzpfvu1VmJD8v+zelomxfX8w6fDu5IE9kMocv6z5ab+1Ah9a+k0BZAuKM3pU6X9OvDBrPA/fQA4ML7vAQAAgPFHAItTLZCgkn7dcgcODcv6qGqoW6n8/jcXGj//1ansEYvD939/ulzxThbbr73zGw9/cW1BAAAAAADASCGAxanmnbuY6UoUtj6X4SgHPlyv3K+dbVyobQowZKH4soirtF87T6c4ADipvOOuEgAA0Cv5Z2A9vUgwkghgx5R3viE4EBt+wKVum/fiPxp02ICHL13NpF2V3/9myoVhVRfOSXeHk8HTbl5/qgkAAPvA9z3MOzd/MisAAAA52kawwJV2whgggB1T79x8YVpwIPnhB7xz92WfkqEG5qc/XZ50Ti6m9jm127Y2yVc0zqzt5wDjxqb3I9/K5kF63lo4PYz9DMOw6meYRql+AJxsfN8DAAAA448AFmPNwrng2WDOe5nx3i00Xr7aGHTbnuEHvm59JAfkxHoquU4AG4j7YdH7ot633s27UnDResq2l5//bDmeCMxJ/T9+cfWe7KJ7/q6S7s0rz6QmBAtaNxo/r+06Fm1hmZ45nonF2uelH1JV4nF1I7vVj23nngnWnbjJ7lJ/4+FL11b7Hev8p9er4lx3LFWRpv+mdSEfrGr9VJwrLWrAPpWtn+sbzrnVnT6v87+7vqLnMtN+7QJZ/Y+fX72Rf9/0Z8ta9u756md3If3Z6fl3J+NxWobUzSX6YyWzvv22MPzoP15ZnM+fs5b54qDXGQAAAAAA2D8CWIylKAzTQKsdFlqQupeBTvLDD6j6UHoyOplMvwzF/y3/lsrvli8GIqtRiFdQaAvS9D8WptU09JzuF3raOQSutK7vLfcZ/bMsNiFYWKpqALi60wRNP/v9soXYtT5livdzRBOLZeqnwE71Y5/h+U+XPkoHqsnPfQPYZH2581J3s567FvRYd/Wp2i5AbgdTWnf1nT4vH/rnNPAsd163wuekqChxOTrvk1YpXwfddcUXfLnn2EFQ+EeAdD3KEQfsAIC9Wbnyx2r69cKtF+oCAABOPW0j2FM1vYx2wmgigB1TK2/9oZJ+vXDzpw054aJb0f9BKi4ozUXh6V5T15TABTPp12HJrckBReUTN5delh/WIApNfeFEGk3pDc/KJVey4K/w9tMofO3dpunFb2qoWHbpANO7+fOfXf9rUU9QDWcXfTjQOLXxxGKf1s4dVlA3jPoJv/Wr7lmZ65y/Plc+Xa4U9Y62ID+/Xwsi06/j3qvZL7Q+okBcr4NzYzYsQVnigL36s8+WB+59DeBonMbve/TygbubW1QXAABw6mkbwZKRdDvBUpK6YOQQwI4p74P13KITOwV653Z0cfP9ekXuQ2eYAK25zcZ/+fWehh+IbltP8d5P5YcT0CB0o/GLa5kgS0OulcyOnKyFX7dm24Fd5cG780HgV7r7kEpReJgcv5w+lv8mnE4Hf+c/Xa7p/jM9QbUuMz19o7FMvatlzkWk4b0sSSnYlFZryul2ndvi9fx2CoUPykmplluw5/qx905/tqT1HnTC8FJcD42C41Vzi+rpcDmqZ+8yt+9rWH3Da7k69RO4lVTYXT7Midc0HD7b/jlwE/pHhG5dWM/dlm/1Dr7+rWz27sdtBgX/x6BXLDB6TtP3PQAAAHBSEcBiZHXG3IxDoUIWFgaBrLX+3ro3aK/DeAKl1ORYXvbe+9Vle6I4+6NTUkYN5zSYk3v+u7AmveW14RKa7deh04ArVe7GK79enf5s+fX08AiB81bWRnY/vuJS/wb3paDWuHAtc/4PX75a0yDNguZystGk/CD6uTOEQD7wtPpcf+lqOlzd0NB2TZ4pPWqHsHHoWSsfRjCn1Wi3yzfbr0MNO3vrZ6nsUuGq86H1Zm6k96OBxZruq/Me/UymLMjPh8/pCdOi43nJBOY94wRrQLv+ytV0ILuhAXBT99MNSIJgTo+1ehi9YHPhsPV07rt+x/28cnVNz1/D3KDi4nOs5N5SlqRX7PnfLa+5Vuvef7xSO3AvcQAAAAAATiMCWIykZDKiStG6/YSuaRo4ZXo05kO3g7LekC6Q51tPR70iM+XLhZt9tg8/FxdUOgu87+3167L7DVreQsieXrwPX7p6VnYSyOuZiZys52tOMq7qPS1TpzdtMoTDqgyZlvfCbu/R+t1M9/9yBWOcWo9YvYYanWtIP5N8z9RAgkpmv7pZuidtNKFX7hrMD0/QPpZNxNUJ9aNjRfVTlxGWhLV1e8R/lOgTxtoEd0FpZvqz6x+tv3RtRgAAR07/kFgXAACAHB//27ieXiQYSQSwY8o735BTxG6xDwJX32/omuYkeL27X2kWjQ06gHpup5MaXk6le4kGQelR5fe/me43aZX18C2VSs/7UKaya/yU7CLfw1NVz3+2bOPibkgYfhGKXh/fysZOdVX55DdTGvZmwt1AfDk/vEJ8Pi4z0ZcPfVkO2UHqJ3qXhslaR5XOgsDZ517rvE5P1KVa+X/cPp09rv7ObTReKu5hqtfn5y7Vq9qGpJAxUhzGylz6nAJxPxQAR+60fd+j2Ds3fzIrAAAAOdpGsMCVdsIYIIAdU+/cfOFQxuAcVRYEWRBX+gf5q77c963QFjqKhOXufnvHBR3Ew5euFv4Pbvqz5VXdZxyM2nipPrQxOjOfVTy0QrCSnFOB3Yf3s9C48uDdhfR4qGLhr9eHC2YCkUV5RmTHSZWCLQ1fS7lD90zyUViiol6nw6Kh9ZQLwxXribnf+jFxL9jrG50Q0bup9nix+esgCuJzdVTypUmfOlTgXd8we5BeueMgGm9Zgko09IKLricAx+y0fd8DAAAAJ1EgwAiKbsPvVfVB6f753y1/ef6z5bs/e1Db8+3QLggPdfgB/02r5lPDA7THS22//tmD5ZnAldYzvSX1/dEkWjb5VfxoDnIsGw/VJmXyO5yDHV/X17W+HqfLMaosfA182DP8xH7qx+h+MnWTjBfbcx3oZ1DLb+tdwdAPJ5CFrtbr2Yb9CJ4tPbYQPhl3uTuhXHSNuj1NVAcAAABAACBCD1iMpIcvL9Y0MKwn41Iutm/tj8TBkIWxNkHQpk2i5cLWR4NMEuScvNjdzb6HH+grGi/1s2ULYFPhXaksSWjoA0n3WBUfyg3/XauWHirg/KdLtfR4qzseL751vKp1VYvqym59D9yL6YA3US65kvVu7fakCs9sSinVxdSC49AvyABCCZtyCIKwpWV03eBPw2X/bWt+v/UTfhPW3bOlRZeEia4UXNTAsZYZ+zY671ZP4G/nGKR6CPv0NZijAeVkdoiG8G8ywqKerk8HM0lP1yn7nYrK39Pj1W/oyX2kf1hYXT+EScUAAINZufLHavr1wq0X6gIAAE49bSPYUzW9jHbCaCKAHVOnoSGeHZdyuaIBUTU/a306jNX3TO8UqNqt/5IK0fY7/MBuojCu4Nbt/G3vFvytv3J1XoYgVVfxsay3q5+YSQ9REPXG/X1tqvHzWjwm7fdbTXkmNQSB1mUobuih9KAsFJR0cGz189LVqhxAMoHYjU5gaxNkPVNaSffutAA/qb+sb2XDhnFIKVsZi8fVDZ5Pv/Kl4JGMsGiSsLina+EQ7VFPYy9LjZevNQTAsSJ4g/FBzxBBdQEAAKeethHsn3XpdoL9C68uGDkMQTCmrCGefsgJZ6Hg+stXq9Et9yI39nIbepuTUjX9etjDD5if/X55zqXDPfNtKw48ozFXU7wU9ij0EpRlBxaunv9s2bcf07+73hP2WaBoQxR4H2bP0U38qPMeDRJ9LoQuOVnc6bh2fnJYnjpTzrzeZ/3khd/61dyiama9by0VbVdUP8HTricwt3rJD5mQ71HrnNvIrA+ygW20Hw13LbyXAbncmLS67VQcYu9PNHSGhq7hN63nNPiePq4gHkDWafu+BwAAAE4iesBirCQ9FS0Em698er3q7BbqfPjVxzCHH7AxM3sWBu51H0pmXFrrZZvqMdnMbaFB6vX5hy9diwLC6LbwZ4NFLdxF2YHVQXpyKQ3ips7/7vriw19cywSJUTDoghczG/vtv2ZeauCm9VLpvNbNbLxYDSVn9TiN9n6CINAyuXk9v0k91mT+WD2ce1HrSHYTStjo9D7N98jdZ/3kWf1Pf7p8r6f3dKxe2Ps14b3X7Vyls8AFi1qmzU6ZPq1Vgnhohx33GXq3EWTGKJCZzLlF+wmyPXN30fqu1QhyPZiDZ0t3K7+vLVkv5yiM/YGUg1Yw9fDla/V+++n0dn2JwBUAAAAAgMNAAIux1YhDpXrcA7FU2+m9+eEHJAwPNqGQK+iFlLuV23oUhmFrtv06Dk6XG9nA2K2c/93yYtLbs3DWeV8QyvnQLblA7qcOVtPgtKqJ74bty8YrbY/t2T2UrHWGH+iU6Wrj/KfLS5Lt+Vq2icJ0f8XnpsfScO9GY+cxQbUsriq7CHxg9VOPymJB6T7qZxC6WV332xPA7tYL2q4xLdPFnjJ9trxSeBybrCrs7VFr9az7aWbGMi7Yj23vBgxhC+tLg93Al2Y6n50N8eui8Hot/XlpILwZiCyF37ZWG4ztCgAjzzvfEAAAgBwfj3/YSC8SjCQC2DGlQU1dEGlPRLXTe/LDD/gJX5dDZD1svQsuaPDWzCwPggVNT9dddgxS+7k78ZT4jfQkWkHB7eqNV66uFQWnunHZfsiP7RmVJ2wVTrD18OWrNd2XyA7DD3T2EwWMcuGwQjvvNbDW8Ldg0rVU/UgmyNQvnKnd9psEoJmwctBe0IVlKnqf1Y0LpvOfeXc/Mquh+Hrf7aMJr/zn+okPPMxDVLag9GjX0PYHUdk74btdP/q0JgBGHt/3MO/cfGFaAAAAcrSNYP/yp50wBhgDdky9c/Mns+mHYEc9ww/keoIOSdN6mbpA5v03rXONn/+q5xi2TIPQc75gArBoDE5xC75Vms0tLxzb04LTaExcL/fibfuUyctSVJ4dbrVP76tofXt8UP916+xhjg1qZdRQcbqoHJ360XNJL7chGAYZ+zQ/DqvuryYDsDKtv3T1bHT+BWMPJ3Vft8+16DPv7udqI9TwOr+PJNS+4b8Jp52XPQXbUX31uZ46+7Z1rb3tF8Do4PseAAAAGH9OgBPuZw+WZ3z6dn3xC+2xN49TFBo+XYp7b5aCzZ3Cu4H29/vfTEkr7AaR37Y29ttTtfLpcqX7qtXcKbw9LMOsn2gcW1ey3qdle20haBSq7mdf6XrWcsnft5p7refMPg7wOWX2ma6vyPF8bgAAAAAAIIsAFieeTVAlvjseaehb0wRTp8v0p8v19CRcoYbwjREI4QEAGMTKW3+opF8v3PxpQwAAwKmnbQR7qqSX0U4YTYwBO6Z+++YfaunX73zw05qg0MNfXLNJkZYEp1IcwOcm4PIh458CGAt838N4H+THEKcTBQAAsDaCtQnS7QQbE5bhRkcQAeyYci7IT5hUEwAd5z+7/khsMrP8HJBelugBDWBc8H0PAAAAjD9ScQAnlJvKL/HiN2zCMQEAAAAAADgi9IAFcOJUPvnNlI30muZDueG/C2sCAMCY8c43BAAAIEfbCPbUSC8SjCQC2DHlfciYpkAfjVd/tVH5dHk6EF+21+G34VrjQm1TAGDM8H0P887NF6YFAAAgR9sIFrjSTgAAAAAAAAAAAAAAAAAAAAAwZE4AAAAAjKyVt/5QSb9euPnThgAAgFNP2wj2VEkvo50wmhgDdkz99q0/3U2/fufmT2YFAACcKHzfw3gfrOcW0YkCAABYG8HaBOl2go0JGwhGDgHsmHJeqrlF/IMMAIAThu97AAAAYPyRigMAAAAAAADAIaEHLAAAADDCvPMNAQAAyNE2gj010osEI4kAdkz50HMLIgAAJxzf9zDv3HxhWgAAAHK0jWCBK+0EAAAAAAAAAAAAAAAAAAAAAEPmBAAAAMDIWnnrUTn9euHmuaYAAIBTT9sI9lROL6OdMJoYA3ZM/fatP91Nv37n5k8YIw4AgBOG73sY78PHuUV0ogAAANZGsDZBup1gY8IGgpFDADumnJdqbhH/IAMA4ITh+x4AAAAYf6TiAAAAAAAAAHBI6AELAAAAjLamAAAAFGumfvaCkUQAO6ZaLpwWAABwovF9D/P2+z85KwAAADnaRrDAlXYCAAAAAAAAAAAAAAAAAAAAgCFzAgAAAGBkrbz1qJx+vXDzXFMAAMCpp20Eeyqnl9FOGE2MATumfvvLP6+nX7/z/o8ZIw4AgBOG73sY78PHuUV0ogAAANZGsDZBup1gY8IGgpFDADumnPiKAACAE43vewAAAGD8kYoDAAAAAAAAwCGhBywAAAAw2poCAABQrJn62QtGEgHsmPrOBWcFAACcaHzfw7z9/k+4DgAAQA9tI1jgSjsBAAAAAAAAAAAAAAAAAAAAwJA5AQAAADCyVt56VE6/Xrh5rikAAODU0zaCPZXTy2gnjCbGgB1T7/3yT4/TrxkbDACAk4fvexjvw8e5RXSiAAAA1kawNkG6nWBjwgaCkUMAO77KAgAATrqyAAAAABhrpOIAAAAAAAAAcEgIYAEAAAAAAADgkDAEwZj6zgWMAQcAwAnH9z3M2+//hDFfAQBAD20j2JivtBMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADGA+NEjKn3fvknn37N2GAAAJw8fN/DcB0AAIAi2kawNkGYWuS1nRAIRg4fCgAAAAAAAAAcEgLYk6EpAADgRFmpPpoUvuPRqykAAODU07aiuO8C2otjYkIwlrzzsz6UzdKzpcbC6rlNAQAAJ8pCPfp+P7sy/2hy+9vtqSCUKcGpRLsPAADkaVvRnr7UtuJZ8TK5/R3txVHG+FEngP3DLPwmXAmeCRZolAMAMP7su731TatWcqXVhZvnmgIkaPcBAABtD4iFrq1vaS+OC4YgGHP/35t/nPFfh481Sa96/YeaAACAsdf6urUaiJvzPlx/781HFwUQ2n0AACCmbUWnf6xvtxcf0l4cffSAHWO/vfLHqgvc3eRl07lg2v7q8d6bf/pSP1kbB6RnltzdZtFlPetZz3rWs571x7q+qevO2viv/qnwcfv7PPT+wv/zwQtrglPrCNp90bXXfrHy1qOy/oPu8VGt9+Ib77z/wnR3/R8q3gfrR7VeK6a+8P5PZtuvc/V96Ou1Lpbe+eCntc76N/9Q08948cjWh372nVsv1O3n9978o10nd8W5i93N/RuHub7lwvP/782fNqKyvfVnW//QeV85qvVaF//c7j2WzCj+F32Uj2p9esby3WY0P4T1j3X9P9sP+ntpT2f1A/vLUa3X3811/d08H6//gz1N6+/mw6Nar5VxV38337Cf9ffSnmb1d/PDo1qf/t3U30t76vu7ewjrD/13m9/9Q/vdf+y+C+z36jltL/4laQdodft/ob04uugBO8aCrZL+YrmN+EVQs1/saMKOpBEOAADGTtluMbfxX0PxSVjjNmzsT8GpRrsPAAAkyvrtP9l6qvWlthffiBfRXhx1BLBjzP5x5r5z02HgL7z9/5+7Fy18epsBlwEAGGP+G3nRnq0Hg02+5J5x04z1Cdp9AACgzdqL2lYUF8j9pL14nvbiaJsQjLVkhuROF3Pv3fMCAADGV9Dt0fjOzfi2PcDQ7gMAAJGkvahtRXuqCwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA6OEEAHBk/OXLj/RpKn7hm+7OnbMCAACAsTJT8/Y0+a2XqaAlMy6QF/V12ZYlb9kULxveyxf6zsan77o1AQCcWhMCABg6Pz8/KU+ezEkQNN0HH9wrfJNzzcw2b745I2H4vExM3HM3bzYFAAAAIyUKXr1Mfh/KnBOZL1ngGhS+dVKcVJw9ROZeveabumX9qUDurdWybUAAwMkXCABgqPyVK3Py1VeP9ceaBqrV3OovUj//LbOm1VqJttnaWtcw9qIAAABgZLx2zcu2Bq9bXh47a7N1e7sOomzbbIXyUMNY2nkAcMrQAxYAhshXq5PifVWcazfIK/7y5Yq7fbuRvG6m3r7R2U7fI/Fta9YztqxhbE1/uicYO/pZ1vWp+w8r52bdrVt1OUR6TJ9+rdcbQwwBADBEry56p1+274mXeTkYG36q/upV//wny+5tAXbx8jVv7bq7Qbd96b2XNx4su7ocklfjY4apRf6T644OfAN65WrUNJ91Tj7sLHRy95Ml94bg1OIXCACGyNXrm7K9fUFs3K/OQtcN47a3Vy0cSx61znLvZ1I/NzWAnRYAAAAcOw1TnA81SDl4+NrlZEFD2A8FAHAq0AMWAIZMQ9imv3z5ggap9zV8vSFbW6updZuF29y5M6/b2LpFfSzYPtrrbDxZt7q6KcAxiHp1B0H3DwQ2rnG3RzcAACea9XyVuOdrVYbNyayGsJv0hMVp0h5H+dtQOu3LiZI0P665hoyBpPxlLX+lvewoyz/u9XeaEcACwAH5K1eqEoaLcubMdHvyLAuoNLg62y9wLWI9YnWb1fQ2/q23yvLkyX0NZ+/p+lUBjp4FsHdTrxvJAwCAE81uI/ahVJ0bYs/XPN33y1f9//p02dHOw6nwbfz0XMlJp33pW7IuY9K+/HZL7Pf2bCk4nvKPe/2dZgxBAAAHEAWkFr7auK02edalS52/RO4lfC3aJhoXdmvrkf44pY/FqCciAAAADp31MnsqkLMavl6Tw+UCPUZl3tPOA4ATjAAWAA5ie/tiFL4ae3bu/jCC0mQf91OTeU3KxMTh9b7YIxsWQfZhv9vtZR9HXbZhnNNJ2zcAAOPu+1AfPpr0qCyH77ln/5OMTDvvOFjgrY89t032u91e9nHUZRvGOZ20fY/D8YfhJJwD+mOWZAA4gKTH60onhBVZykyudZB9X75ck3hMWNMQ7+vuzp17cgT8lStzmYnBJiZmNWwuR+XxfioVDDdsXXvohZ79WC9em4QsDGdS28TbBUHdffDBvYJjr+oxnm+/1vqcjoZ58N7+EVSJ3+Stp/CanDmzZMeOeiJvb9/NlW1Dj7FadIxM+fLnZJOgWfmSfRduZ+HlV1/VxGajTdeFfv76qEp3lloL5mfdrVt1GVCfMm3qzxt96+zyZZ9+bZO8SVGZnzyZk7gOK6lVG7r/jfz5dsph4X/cC7ttM9rGlEqr7v33PxIAAE6YZBb4v8jRBLDmy7//b/nnxqrb8x1U4+C1a1FTZc77zriVvlWSN2wszVKo7Q0XtTWSdo+sn9F1azXXzO/npcVoP5WStbXifXXbl17bYk7qn1x3mbbSK/FnueK8tNuXWgw5r89VF7XlOu2iTd3Hmh7b2nNN/fnslk2+li6biN2ddiN/jJ7y5c8p3l/D9l10Xu1xPb9vSc0FUTuyXRcNfb3U8lINuu1LryfwxoNlV5cB7FAmO9+NojpLrv8wtcjre4LCMnuZ07qtpOrRbNi+0+f72q+8JVAV3bOVo7d96eP2pa5ffXDdDdS+3E99F10Pdi1+lnrfq1ej9zxMbeZdqNfM7uX33wfy9pkw+nnWOelOtOfk7idL7o10WdJ1KPH1WO4eMXs9D1h/0fH/fcltCEYOPWAB4AA0EF3Tx1n9cVqbQjeGFb5GtrdXNXSr274thDyq8DXi/TnpBnU2FIIFcevRz9kgtaLlfKQB6VTPLi5fjrfxvprbJt4uDOv6nvWeHsNx+FppP6L9eH9X0qGh7c+5qh77fnTseKiGfNmmkmPMS9EpXr68UnhOcU/manReb755sWc7C3u/+uqRvmeupy7i831R9qlTZ71lmpRune25l3WnzCI1yYavZio6XxtCI/05hmE5eW/+s52U9ucThs8JAAAnzGu/9uLiCW7KcnQm/3Gy5zv3xGhpa0Yf56KQLn5Ml1qyWNKwNQnuUu0emdbg88+v/DefqQ8NziTwUou2iSdFy7aH4v3UNTx7mB7Swfno8Xzq2PaoORtDMxsaavtSqnrsf9NA7NyWlz/3lM3OQeTuy1d9T/vSJmzTYHil8JzsWor3/WcNNzPtyySEO6vHe6QR51yuLioatq5rMLev9mWmznrLNNmus1eu+n/byzAYmTJb+9IVtS+j833Y/hxDTZ9CJ2eT9/a2L+PP5UXd70DtSy2zC0K5u0t9/0XrYDG9XeH1kOdEctdLZcDyV/7ByUD1+IrWYXKdPbY6dPn/33Sv5/fs5bCPj6NHAAsAQ2CTbmlAOi9DZOPBulu3ZkdixnkL6Pqb1NBxJb0g6rEah32phb6Z9FxNqwwwtEJth3UWsq4XBLxpi/kFSdC523Endd+rUXiZpkFlqsdzr53W7aCwzuKepo3cshmts0UZdL/W83W3Mhtb7/16z/kCAHDKaNDh9LHvP6jukwu35XU5TVwUovbznKaZ77Vf2IRoGszNuly7zltPx/junPR+p3cZ0sG5gvZhyjkN6Kz3Y7/2ZTRub3qBBZ0alC5qgXZrX1q4uKIBZrm9QENCtxUfr9xvI7ePPwb0qzOJe6c2Mvt3cuEH/zTYeMcWvuq5PrdbmRNn3YQ8TJ/vMFjYrWH1e27na8hEn3VRYH6cojGmNcDe5TqLOVloh7AYbwSwAIBBLWnwp391deest29u3VSmV6ZNTJa1YD2F9fGcrlvIrZuTncTB7YXo2HFP42ZmfRy+bkTrrGy9+59MbqePdxcHjDXpf27pnsaT0dAG7W1tyIl8kGl10S3b/nsp+2xvCD3uOQ3f7RGfV1Z14F6wNuxAusw712f3fMNwrfOerEa03B5bW2sCAMAJ0+khd9SOPvQ9dhqOLZ0J5Kx3GnqK3MitnGr3ytQUzeUmRNMUUBYeXHdnox6TXt7O7fdfdzqufsSPXSgXzjgNwUI5nwS5aXbcR7pu2sqW37+tf63mK/ZDFKbZfnJBZ/rc9GW6jfjcViu+Nb1fb2sfyo2kbNO5bQfm4vDxv6Z3a2X55Lo750vRef04t0F1kF6wNj7yVnzLfLmz453rMzrfr0si+rjffk9mpzbshNaVPv5Z37Nj+/KlX3lptaSSD7t3qO+hTHSXLr8NASF9yv+kPVTXDrQ+XDS8RTZ87Vxvuv9ZSf9hwcn811/J5CD1N8jxcTwmBACwLxrGPdZmTVPiL8cvhjr8QPsYFrJZD1HnfhSNCSpRb9tzcvTyY9vO6/m/ngr2JuXpp60BETcUgqCR3tjdurXa+fnDD1d123QoOGmhaL/xVnVfF3T7dkOiqdtawHq/s94CxFZr2noMJ0s2NHC1f8DMdAvQOZb1YK1FzdH+51bV7X8k3Vv1K/Y5JPufyZQtHpe33fhr6qOR23Zw3pc75dLrSo/XaTzZ+et+rSH5o9QW3freeb/VzPnGddVsl1nP7ZxeY4+l2wCs2FAESZ1v6nobAzizy76fFQAAJ0H8tTklR2w/vRzHmQVmH193tfbrV655a+O9nqqHSW1dxu2d+DNppDa3MUmj9uUny862tZ//Nb3tSzVf/qxgvFXbdsvJv/z7u/E4mRqCNoNQ3vaB/FvnDRoofh3I+cb1eEze1xb9F/r0n1Nj2ErYio+1tR2VbjHdvS1/bq9e9Rao/ahzu7s+WyCox/mbnbNkK+bug3ddp32p236e2XZAPq6zcqoV2HyQjA36oOZsnFf7+Z6ebLt96Tv1vQMX/4akOw74UOtKw/CmvdBAuqn19ONtH42hPNk+3zNepmxsUv1cNqUkruSz+10r/qx6lFzP8Xevby3HM/8U9ZZdlX1q1KKa3NQA2K7HZsll16fLH/U+7iMZvqG85bufZ/560/JvRH9YcN1e4Fb+T2tu9aD1h+NDAAsA+xWHeuXklTXGajJkFvolY6DKsXIFX+jxsnLndTxJV/Q+GzpBdt9f4bY9SqVsI7DV2sgEgnFYmW8oWiN5RoqPne3Rsr1d73mP10a2c5XO6zNnymJ/Tc5vGwQ3pNdfZT/SdaJhrAbNd23/7fBZQ+Kq7FHS87ecWrSRCl/jw9o1dunSvWhM286GUY8O/noOADjNDtRbboyOeVx86LNtPxc3d5saOpXbyybidkzzk6Vobd/25U7bFr1fw7NO23HbmpVeNtKBlu6vqYFb5z1hqO9w8oUral/GwWu6jei3A6mn35KEobZ9pb3szA+1fD5qs2a2/V7kv6e3DeNt/7rX25cL6uSsBnt3vw/khgWhGmDbO6qyB1Hv01AqpSDT+3UjHXRrEGiBuNXdPZe6020ijM794O3LuCLSoXVPfTvrH6316LsBrPWgtg4a+w5gh2WrFT3NSDrADeWjdvhqWiWxil3Ta7IdwLogkP9LMNYIYAEAh8ZfuTKnYd5M0ruzLKMh26NlYuKuBpXZd/iecapsm438tqmeuQdnQxmkQ18bd9f7qoaj+ld219Awdk0fn++p96n3k5ner67PjKjeb2Te54c7ThcAAMAwvHYtShXnrCeqhmvlEeo1nG4julJL7r6a7gVpP7psWc+E0URVX+S2lWHNYF8QQkbDDDzlpfqqBqRahw1t/q2dCeTzQXtPTsTNxcl01xDdR29542N/kQoZnfOZO7n2JRl/dnLbZ/5Y0cz3dC4M1eUYhhUp4OMevD9K568ukIpeL+udBRbS5ifTCk9XD/mTiAAWAPYvbmxYqOX9X1O3qQ9NMs7nksQNhslxCcaicVZt4qd2eZ2TEVbpWXIM5XV37qxpEGyf9WKuLHYNzEgYzkTdLy5frrnbt5cG2mk+gA3Dvw20XRD8UAAAON2sTXfUPVKH2o48SZLbts92Jn5yIiPdunT7GI5qyD5+18lrV/19uz3f907ENalNROvNO7OlzctXrvmlB9fdru3LpDfuZLrufUsGal+6khy4fflt/DRZkvGVZMKTuet3arQvaAwDASwA7NNRjMWaBLo1GTcWvmZ7vDY0/LunwV4zeb0ixzC2WqH8pF7FvkyeD/UfYzYWrYbudZmYqEp8a1VRHdU0hJ3U9y7IXhGsAgAwqKYcdVvFM/xPPxoSWjwVh69tXhoaZt0Lwug2e/HB6LQvfb+htdJvcYffvvx42clLNV/To9UnvFR9cfvS/lxfe/Wq/+Eny+7tvR5jGMEqZNPv/gcY/kAz5ghgAQBD1TPuqAac7s6d6dx7jrMBkW3ktlrnBu657G3QfdfZdsfJw/YpGaO1Zo+oB3SpVJFonCiXnmxgXtct7VruUmkjM35wvx7UQZBd7v3+xrEFAOAESL45P3dHHOb5eDxQ5PQZd/Txg2XXaV9qeOh04eYx9iJMty/91/9bzjVW3a7ty1euRaPDbrpU23SHycP25bN48qimPmqVOIyd/MeWVDSwth6w3falk/nKvL++U7mfiscm3dhKj0HQ79Z4lx1yQK/v/yUH9Fk8eVhTsvU9aROaZcq9JfGQD+mBc/2uofiRSC7RTB1rdd54kJpEDCfTXsdxBgAUsNDRX7lyNxkyYHj7vXRpNQk0x0cYljOvg6AhoyXbu2RiYrHoTRau6mea/YeXc59nXm9vVws23XMvgOj6uXx5vfP45S+jiQUsYLWhCfRRlezMv+2JwXa2tdWUbANvKhoeoqcA/mJuSUP6O+rbMQEAOFJBS3wQykdytLz+67wh6BFoahHkxk91boTqyku+97L7wT/JtfzbbBiFmUVffuW/+ansppJuXzq99qrp7WwcU33sqX35mobWr/3aR+OKth8a9r7e0ACzseQ2P37XremBZ60XcXq7aGKwXSS9e7vtSydTem6Z7fTzsV616falD3a4vr3bQ/uyt74n/3Ey+8eSkrOOuZnj7/gHjokjHEu46P8vWlf/1ULk/HtfWvQWyFcEJwIBLAAcgAZ0VQvM9Ecb77SqYd68DInudzGZmX5dg9jH+piRcRSGlXQwHU3MJcc6LlZ+fKt5q2s/P98to4XeNoxCGN7PBJber+W2nWuHpbZ9cm57/5xc9Bf7SufRahVdR3sOPqMest5/lNnH9nbnnKIyX768khkuwnos377d2GG35cIQFwCAE2LijN1EEgU8R3bHjoVaD667ow59x5eXSjuwsom5NO2bO65xV12o+aGX69mFMq+B56IGk1EZLUj71sv0lpd1NyH/1g4sS7ptqTeM+1cLS5PAdlIXzHm3t/alXcMTJflbVCfJQ8s4lytj70RPu1jTAHfbR78X6TI/txXG55Qq83simR7LzY9rrtFvvzaZWj7E7cdHWar8j/TmPpQP20FldD0Eeq5BNgAOJ+SG/WDj2OojfbeXC1vyrwXlL/S01u3Tpdz/GwpC6H4+/o2TMIiGz2imFp/9wX+Sh/9lMQ7n9VzsmilriLyi18dDu5Z23Okejo/jQwALAAcR39JdSS2ZG0Yv2GQftc4CC8icG40xU3cThhZSpv4q7sr6r5hHUc/OS5e+1DpblWOUhIv5ILUmT558GQXdly/b39XXkzovW2DZ2fbOnbXcmLGTGpauReel2+/33NytW/aPvEZqUSUJ3VeTXtAW8nc/fwtJ421212rVJNcLVs/J9v04KrMG0LktapmyxUMipLefjLbXerIJwQQAgBPGQiYNlL6024LliATZQAkpdtv7mUCy7cs4sHpkPTv1c7LPakWOiQVqUpKGhsDp9mU0rqpdRxqePS55DVp9ZwzbsxZYRtu+G4Vxa7kw7jndds221cB2X+eWXMMbmR6uTqZf1bK88mu/ag+Jy5Pujdv89yW3a/uyFYhvuahDQ/rzOKfHe/y9PqzMurN0+9LGWeh0gLBhBEo+14s2DnEfa/lsQrDaTsd/sOwssK3neu+e1aByXbf/suh60Pdfbw/rUBh6O7lgx2/Xea78PQrG+G2XP3zlqq/KLpJesG/kFp97yus1reeg5ftS6+hxUg67lhZfSwLmp/XxD3Hd7av+cHwIYAHgILa3LXCLv/xsfFCRCwOPJ7qDpOfihU7YZ8/b23UZA1HZwzDbyzTuYVnpjJ8a11V+/dHZ3p6V3hC2txzxmK/Zf3wFwQXJ94hJjQsrss8JNKxM6XA3DoDnkl7QlVSZmhqqTg+62yhAddEYaYPU+ZKGzPcKlh/ZP0ABABgFUejnou+/Q+8Fa+OZbgcaKKFQ1OsyjEKx67lV5aTXa7sdlvmswtbR3VY+4cRPiLyRC2Ejrvf29i8DL/+98yqIJuT6F+m91g7UvmyVNCgN5I1cWFi23qFRD9FUj2G7BjUIPj/Ifi1ADZw81lT1fL7MBecahZ+fXHeZ9qX3US/Wfbcv+5ybmZT8XWOh1D9Oja9qobePA/2iOk1fS4W/+3Y9tmzc3oLPelAW2mv9rWvFv92nDPlzuNfuQRwd30fjBt8TjBUCWAA4gFTYuBFN5pS6dTt9S/ug0ttEvS0taItDuVrSE3EsuA8/XNV6mc31Fm0Hrwsa/uWHAXhRjlA0turt2xeiMhY1vqyc3tejz/TWrXpmW+t5ur19rme79rl5vyT7EH2+ejyxHgL5euuW6UYyaVhzT/tul9n7fg21hj6mtU5qhWvtDw39twUA4MTZIfQbtqh34DAnXTqJPlm2ObZkRVO72YLQzT6nhdxn5TRk/M9yROx6WVtyX4ahXLAySnG4Z5OE1TU4/PH/XHb19sIHum3o5FHLyY8LtovOzYV7vw4tKH1ag9KnnJyza6yg3qIy6fLVr7VMe7kGU2W2tmtxG9FLQ8s9/XHB5FL2B46n4j9w7Kt9Oci5Rcu07j55183m1yW9eC8UHt/LehQu+/6hdztwlwOEoHZNa5C8ouU4KzvUof63mj+HCS3/RNwLmfb5GHECABg6/+abMzZ+qFhwevv2roFcFLw+eTKnIde8Nhcv7DIG51iJJrLyNpaS27RJoYbRQ3jYoiEfJiamohd7KKduV9btyodxbp16MxMTTXfzZlOGpDOx2x7LnamnIZcJAIBR9Fo8S/2Khjlzcgh8KKsP3nULgoG9UrNRQGUqaMlkOCGbX2vQ1qi5kWpfVuIyTv7jtkxZ6jJoOV+KtytPtKQ87HPr1Nu22Bin2pST5tqQgn+b9Euiu90GP9dog1w97bdM+z23gx6/83ltR72xD1SnnTo0uq8nE7KxWx0Oq/5wNAhgAWDIogmKbAKn9i3e3t9wd+7MRz9q0OpWVzd7fr58uS7dmTo39dvzHOEWAADA8Xv111EIezc3qc/BhVIv6p0HADh5GIIAAIYtHb4a57rjAz15Mp9MXuTt59RW9dTP8Uz1Q5jMCwAAAAejIal3gcy6IY6Jbj1fCV8B4PQggAWAYbMxQFOTZ+WGE3i+85NzP+r8GL+nkWxjvWLvjeKt+gAAAKfRx9edD73M9xmDdC+iMT0ZdgAAThcCWAAYMvfhh/Vklnob+zXfuO72avV+KrMmDO9F27RaZzWQXRUAAACMjAfLTsKS1EMn0ztMatSPzVq+9PdA/vmTZUc7DwBOGcaABYAj5C9depwanmBDg9ZzAgAAgLHz2q+jSXNmwkAqzsvz+q9r++N6+4/tdidTU9/xeRDK2iAT6gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4GCcAgEPj5+cn5cmTKfF+Rpx7UZ/L+jwZr/Sb+vOGPn+hrxruzp01AQAAAAAAJwoBLAAcgiR4ndNwdb4TuO66kW/qe+syMXHP3bzZFAAAAAAAMPYIYAFgyPyVK3MShrWBg9eeHWgQWyrV3Acf3BMAAAAAADDWCGABYIj85csr+jQvw7Hqbt9eEIwVvQbq+nSxs8C5WXfrVl0OkR7Tp1/rdcP3OwAAAACMiEAAAEPhL126K8MLX818sk8AAAAAADCmJgQAcGBJz9eqDJtzVd33Jj1hcVx8tTopQTDTWRAETb0eG3IK6O9eRcKw3Fnw1FONURqf2b/1Vlm+/77SWXCKPhsAAABgnBDAAsAB+StXqtFkW4dnXoOgv2qwsirA0bMANt0Tu5E8ToOqnnt3OIlWa1b/W5dRsb1dznw2Nonf6flsAAAAgLHBEAQAcABRD7QwXJTDtxj1RAQAAAAAAGOFABYADmJ7+6I4V5bDNykTE4fZy3ZP/Pz8vsLg/W63l30cddmGcU4nbd+HffyjuI5GYf/H/RkBAAAAGA5mSQaAA/CXLj0+ogDWbGrge9bV65tyyPyVK3PifXfcz4mJ2eh2Z5FFXT6l59wOhhq2rt+4mNEYms5dlDCcSW0TbxcEdffBB/cKjr2qx3i+/drdvj2dDPNgt4JX4jd5q4M1OXNmyY4d9UTe3r6bK9uGHmO16BiZ8uXPyftmVL5k34XbWTD21Vc1/fFipi5EliQeC7h727pzs+7WrboMqE+ZNvXnjb51dvmyT7/WOnOFZX7yZE7iOqykVm3o/jfy59sph4X/IlOp929G25hSadW9//5HMui55T/HHY5fWHbvq7nft+gzlu+//yj/exH1GJ+YuN9ZEASfy7PPrib7mc983s7Vtc6WUuWMr8Hs9RQfz85fPw93586FwjIW1W+f61CPY9dsOSlHtM/drvVo0Ztv2u9UVfKfTXwu0Xt2+r0EAAAAcLQIYAFgnzR8tVDxvhyt6aOYZEfDt7qkQ0Tv6zYhWJ+3Wzg4rSHjRm4fFt7VZGcNDU4vpMMz3W5dsgFWbYf9bFjAqWHUei4oS1soGj83mThtp17FmxqczeeDsyjs3dpa7xu8xyFYd90eAtgB62xN62w2V2c7BrC7lrld7iC40P4c/RtvVHNjv/Ya8NyScNJ+Vyqy0/HPnJnOh4YaSE7p53t/17LnttUAtqwh5OPUuxpR2Nl/P6vtye4KrsEsDTn1vM92jjVI/dq1ur09nfncsn/AseV16XdN2jm2Wudsey1fTeJwvL+JibMEsAAAAMBoYAgCANi/ihy1dK/Uo9Q/fDWTWq6V9IKoF18+SLQAKe7Nl1YZYGiF2g7rpnYJX01PUJUEnbsdd1L3vRqFa2m7BW377BFdWGdxj8tGbtmM1tnA4w5H4efu4WBcbu/Xe853GL76yoLciux2fC1neqzjZIzl+wOVPbdtgcou+5nfzzjLA4avZirTI7eXHbv/NWn7n5ioCgAAAICxQwALAPvl3PNy1Jx7UY7PkvWq0zKc06DuRm7dVCa86p2YbMHduXNWH8/puoXcujnZSRzcXoiOLTKdDBHQFYevG9E6K1vv/ieT2+nj3cUBY036n1u6x+tkNLRBe9u413M5V74bqbL1He5gV/Ft513b2+fc7dv2iM8rqzpwWGi3xafLvHN9ds83DNc678lqRMvtsbW1JruIgmXnZjLHD8PZwuPnQ8atrVpP2W0b29b2kd+2VFqRnTWke53MStzrtKt97O3tdv3kz28hWl4qdetke3uubxmtnrP1W0lfiz3yn017qIfU9skxVzt1kPVR+7Oh9ysAAAAwOiYEALBfU3L0ynI8ljQIrKVez2sY+XoqeJqUp5+2QDAOtIKgkd7Y3brVGQLAffjhqm6bDq0mLRTtGxilbotXTd3WAtZuT8L41uz0rd0bGnJZUN0N/dIBWRzqyQ7nVtXtfyTdHpsVCzuT/Wd7IHtf11C53WuxqY9GbtvBxbfHt8vb1ON1wjc7f92vhbs/Sm3Rre+d91vNnG9cV812mfXcziW36rcD3Yrd9p/U+aaut2Ays8s9hXv5YFnDb70G7qWOP50bKqCij9VkXN/sttmy13XbRmZbDXp12ULhOMl6nehnlQ6TrU7Lku4hnYzHmmxvt/r/LbMP5zZ7zt16pe9Uv5cv277WU/uwc2pIkfy1Xq1aUP0ote3zufI1c+X7kuAVAAAAGD0EsACwf3u+XXlMjymdiX16l5U7r+NJuqL3aYg0K7vvr3DbHqVSNkxrtTYygWAcVuYDty8kH5Z235/tuby9Xe95j/df6PsqnddnzpQlHm82u20Q3JBef5X9SNeJBoEaNN+1/bcDOQ2Jq7JHSW/LcmrRRiocjA9rY4peunRPj9/tiey9bbchw5H5Q4WGoPdyx7eQ0nqaxte2hojR89bWVC4o/6ig7LZtQ7qBt028ZeF778RgRddwGNq4t93XQfBD2YOC+m30lPH27UYSwnYC7r47zF3rFsLrtgIAAABgvBHAAgAOjb9yZS7qIbjz5EdHLdtzeWLibk/I1Z6ZPrvNRn7b/MRjB2JDGaRDXxt31/uqhqM2yVlDw8E1fXy+x96nk5kQ07mNPu/byLyv9/z3JRkmYTJ1/GbR+zSkvNC70OV7mPer688lG2qelaMShuVMgGvBeTyBV95k6j3H80cUAAAAAMeGABYA9i/dq+0ojznyOhMTtYO8bE/GUVPpWXIM5XV37qxpeLck+UnD4jFuZzTss4f1uqxpYLk00E7zAWwY/m2g7fbYE3QHw/z9GPTaP7rfySAoZ17Hf2Qo77IVASwAAABwyjAJFwDsX1OO3vB6XB6m3lnhG8mEQdNSPLnQ8YknPtrt8WXy7kMNwKOxaLe3rQenBaz96qimIexuk00VG16wilj2evB+c6DrCQAAAMCpQg9YANgv7z8vuE36sI/5hYy4nnExeyc/kmRMzOOS7bncap0rnLSpiAVscY/U+OVOk4ftUzKGaM0e0S38pVJFrAdsPHlT27yuW9q13KXShpa5+7rf0AL5npze728c25xkjNZuffe5/T7qMZ3ezuo0Pz5r/2ERns+9fiRHJQw3M2V0bkND9GkBAAAAgBR6wALAfjm3JkfNuXUZdTYuZloQNGS0ZHuWTkwsFr3JQkF/5Uo2YHfu88zr7e1qwaZ77mVqobWNHdp5/PKXr0eH04DVhibQR1WsF3FaPDHYzra2mpLtpTmVDzvjAviLuSUN6W+vt9Cn63syCeiztrcf6eNx8rgbLQvDRuY9GkAnY8p2ROfi/VRuX0f3R4owzP8/oLh+lX/zzRkBAAAAcCoRwALAfm1vW7B0dD05rSfp7dsfybgJw0o6OIsm5tppJvjDlx8/dV5DwUU/P98to4WENoxCGN7PBGre5wO3uXZYatsn57b3oM05u44qnUerNV/wrj2PHRr1kPX+o8w+trc75xSV2YYzSA8XEV9njR12W+4XMvaRvWa9v9tz/OwkVc2k7PbckHTZbcK01LZRWJsb6iLZ7nB4n+ltm/RAbki6jHrdpEPm5BwXo2vp0qW7cpi8n8nUDwAAAICRQAALAPuUhC835Kg4d0/GQdwrsBtMW0BWKj2KenZeuvSlhkSrcoyScDEfpNbkyZMvtXyPtZx2z348hq09NLDsbHvnzlpuDM9JDUvXovPS7fd7bu7WLQvzG6lFlagsly6tRg+tO13W7elpIWm8ze5arZrkesFaT1Pbf1RmDaBzW9QyZYsDzfT2k9H2Wk82IZjsZnu7nqmzuE4fd+osf/xWKx2Q58PymVzZK7ljzcpw5et4Pjlvnztm9nrX68fOL1XOWrKu6t9886IMy/Z2M7ek89nI3/9Oj1sAAABgRBDAAsBBbG9b4Hb4vWAtwLIgawxEwXQYZoOzOJSqdMZPtbFUe9cfnTg06x1CIl+OeMzXbMgeBBck/5mnxoWV/U4wZmXKB5XOzUWPdNBo72m1Bh5nNApQnZsuKHO54O1LGjIXBf37/kNDdD1YefOTT2XrrL1sNt2DNQrL48nb8u8rZ17Hn9Ps0Hu/xr9zO/5+d+q36Px663hDvv/+cxmSgl7CAAAAAEYQASwAHEBh2Hg4aod6a/WQuQ8/XI2Cs3woFQevCxpM5evsRTlC0diqt29fSMK93sA0ns2+Hk3QdetWPbOt9Tzd3j7Xs1373Lzf1/UQfb56PLFen/l665bpRjJpWHNP+26X2ft+vagb+pjWOqkVrrU/NPTfdvfjx+c2He0jH763j6/ly9d1tO2HH9Z13VkpCszb2+q+i7Y9qOj3uyhczb/P6nen84u3X9L6PXcIIXHxHxO8/1IAAAAAjAQnAIADs9vEk56Kh7Bzf8PduTMvYyqayMpmv7dxTre2msnQDSMlGqN2YiK+xX8P5dTtyrpd+TDOrVNvZmKi6W7ebMqQdMYo3WO5M/V0gDLt95rY7+c0DHsp82F+dn2P2b4Wj/CYAAAAAAZDAAsAQ6IhbN1mapdh8v6ehq9VAQAAAAAAY4khCABgSKKg1G4RH5a452tVAAAAAADA2CKABYAhioYKKBr7dC+SsUTHedgBAAAAAAAQYwgCADgEyXiM1iP2Yp/Z5gs2imZyv2ETHo3iOKkAAAAAAGDvCGAB4JD5S5dm9Kmi4erzGrJO6XM8OU8cuDb1+XN9XtPgdYPgFQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA9Pd/AIRUCLSfaKthAAAAAElFTkSuQmCC)

当一个组件同时接收默认插槽和具名插槽时，所有位于顶级的非 `<template>` 节点都被隐式地视为默认插槽的内容。所以上面也可以写成：

```vue
<BaseLayout>
  <template #header>
    <h1>Here might be a page title</h1>
  </template>

  <!-- 隐式的默认插槽 -->
  <p>A paragraph for the main content.</p>
  <p>And another one.</p>

  <template #footer>
    <p>Here's some contact info</p>
  </template>
</BaseLayout>
```

#### $slots

> 使用$slots获取父级传递的插槽

```vue
父级
<template>
  <child>
    <template #header> 头部内容 </template>
  </child>
</template>
```

```vue
子级
<template>
  <header>
    <slot name="header" v-if="$slots.header"></slot>
  </header>
  <header>
    main 不会被渲染出来因为父级并没有传入
    <slot name="main" v-if="$slots.main">12</slot>
  </header>
</template>
```

> 如果没有设置v-if main还是会被渲染出来并使用默认内容

#### 动态插槽名

```vue
<base-layout>
  <template v-slot:[dynamicSlotName]>
    ...
  </template>

  <!-- 缩写为 -->
  <template #[dynamicSlotName]>
    ...
  </template>
</base-layout>
```

#### defineSlots

```vue
<script setup>
  const slots = defineSlots()
  console.log(slots);
</script>
```

#### 作用域插槽

> 允许父组件访问子组件中定义的数据

```vue
<template>
  <child v-slot="scope">  // scope用于接受插槽传递过来内容
    {{ scope.msg.text }}
    {{ scope.msg.count }}
  </child>
</template>
```

```vue
<script setup>
import { reactive} from "vue";
const msg = reactive({
  count:66,
  text:"子级内容"
})
</script>
<template>
  <div class="box" >
    绑定在slot元素上
    <slot :msg="msg">默认内容</slot>
  </div>
</template>
```

![](data:image/gif;base64,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atzIsaPHIfv4LcJ2cKHJk6/AoVzJ8pfKOC/VfZxJs6bNmzhz6tzJswsAAUCDAgAVUuQHOqxaKl1aJybTp1D9sHJIomTEnlizbumntavXr2DDiq0B4MgRiZqKVgPR9GjUt3AbOI1Lt66FPVTL8CGHdqzfvzDMIgFMuLDhw4jdlRXcF5PaUxHuQLBLeencypjrRrYzuVzjxKC1Ch7wObTp0/+oU6uWsths6UqPM8uebQuC7by0c+te+Hq1b42je/8eTry4cdOtzxLdzby58+fQowM7Th1j8OrYs2vf3jP54E+xpYsfT768+V/CuatXdn29+/fw47fzTnr5+fv48+vfTye9/P+etAfggAQWaOAk/QwFHn8MNujgg+b5d+CEjwQFVH0UZqjhhhziEx6EIIYo4ogrSdjhiSimqOKKLH70IYkwxijjjLOY2OKNOOao4448evIijUAGKeSQa9jY45FIJqnkkkzq8CORUEYpJZBGNmnllVhmqeWGT07p5Zdg7lfllmSWaeaZaJZiIVAK+hjmm3DGqd+YaarIVZ145qmnJfT/0emTnIAGKihzfu6poYCGJqroolT0ad+gkEYqKVSFMlogopZmqummOTgKHm6ThirqqNu0yemNmJ6q6qqrerogqbDGKussBLCKKmO25qqrpa76COqswAYrbBm17ppiqsYmq6yWvXry67DQRhutqctmiGy12GbLY4KiBCTtt+BCS622Bq4JFLnopqtuD12G6+67cBa7boF3zmvvvfii0C68/PYrZAb5BizwwASv562/CCc8JMAFN+zwwxAndrDCFFcMIsMRZ6zxxhzr5MazFocsMnMPjNvxySinrLIMP61pMikJxizzzDTXbPPNOOes88489+zzz0AHLfTQRBdt9NFI/yet9NJMA70ydvU+LfXUEzVL9dVYZ93DtVp37fUxVn8t9thdc0322WhfEnbabLcdsdluxy03FmvPbffd5MKN9958/1B334AHrqneghduOAt/H6744lsSzvjjfGvgMuSUV27lmhharvnmnHfu+eeghy766KSXbvrpqKeu+uqst+7667DHLvvstNdu++245667cS1b+DIx3Kog8woxVyG577/vrjzKUS/v/KmJwxzA9NSP+xP12FN7PfbTVzoDUNxjL0Dyz5ffsOPmp39m9KMIEL714VefgvvxBxDF9vVTP776/J+P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)



#### 具名作用域插槽

```vue
子级
<script setup>
import { reactive, ref } from "vue";

const headMessage = "header content"
const mainMessage = "main content"
const footerMessage = "footer content"

</script>

<template>
  <div class="box" >
    <slot name="header" :msg="headMessage"></slot>
    <slot name="main" :msg="mainMessage"></slot>
    <slot name="footer" :msg="footerMessage"></slot>
  </div>
</template>
```

```vue
父级
  <child>
    <template #header="{ msg }">
      {{ msg }}
    </template>
    <template #main="{msg}">
      {{ msg }}
    </template>
    <template #footer="{msg}">
      {{ msg }}
    </template>
  </child>

```

### 依赖注入

> 用于跨组件层级传递数据，避免了深度 `props` 传递导致的复杂性。
>
> 依赖注入允许父组件向其任意深度的子孙组件注入数据或方法，而不必逐层手动传递

```vue
<script setup>
  import { ref, provide } from "vue";
  import Child from "./Child.vue";

  const content = ref("66")
  provide('msg',content) // provide
</script>

<template>
  <child> </child>
  <button type="button" @click="content++">add</button>
</template>
```

```vue
<script setup>
import { inject} from "vue";
  const msg = inject("msg") // 获取 provide 属性
  console.log(msg.value);
</script>

<template>
  <div class="box" >
    {{ msg }}
  </div>
</template>

```

#### 默认值

```js
// 如果没有祖先组件提供 "message"
// `value` 会是 "这是默认值"
const value = inject('message', '这是默认值')
```

> 在一些场景中，默认值可能需要通过调用一个函数或初始化一个类来取得。为了避免在用不到默认值的情况下进行不必要的计算或产生副作用，我们可以使用工厂函数来创建**默认值**：

```js
function Person(){
  this.name = "lee"
}
const msg = inject("msg",new Person() ,true)
// 有括号和无括号没区别
const msg = inject("msg",new Person ,true)

```

第三个参数表示默认值应该被当作一个**工厂函数**。

#### 禁止注入方修改

> 使用 `readyonly` 方法包裹
>
> readonly 接受一个对象 (不论是响应式还是普通的) 或是一个 ref，返回一个原值的只读代理。

```js
import { ref, provide, readonly } from "vue";
import Child from "./Child.vue";

const content = ref("66")
provide('msg',readonly(content))
```

> 用于避免子级双向修改父级属性

### 异步组件

> 编译宏 `defineAsyncComponent `

```js
import { defineAsyncComponent } from "vue";

const Person = defineAsyncComponent(()=>{
    return /** 组件 */
})

// 使用与普通组件使用上无区别
app.component("Person",Person)
```

```vue
<script setup>
import { defineAsyncComponent } from 'vue'

const AdminPage = defineAsyncComponent(() =>
  import('./components/AdminPageComponent.vue')
)
</script>
// 直接使用
<template>
  <AdminPage />
</template>
```

```vue
<template>
  // 同步组件
  <child> </child>
	// 异步组件
  <person></person>
</template>

<script setup>
import {  defineAsyncComponent } from "vue";
import Child from "./Child.vue";

const Person = defineAsyncComponent(() => {
  // 返回组件
  return new Promise((resolve, reject) => {
    // 使用promise和settimeout模拟异步
    setTimeout(() => {
      resolve(import("./Person.vue"));
    }, 3000);
  });
});
</script>
```

### 组合式函数

> “组合式函数”(Composables) 是一个利用 Vue 的组合式 API 来封装和复用**有状态逻辑**的函数。
>
> 组合式函数名以“use”开头

```js
// mouse.js
import { onMounted, onUnmounted, ref } from "vue";
// 导出函数
export function useMouse() {
    const x = ref(0)
    const y = ref(0)
		// 修改响应式值
    function update(event) {
        x.value = event.pageX
        y.value = event.pageY
    }
		// 注册和卸载事件
    onMounted(() => {
        window.addEventListener("mousemove", update)
    })
    onUnmounted(() => {
        window.removeEventListener("mousemove", update)
    })
		// 返回值，注意返回的式响应式值
    return {
        x,
        y
    }
}
```

```js
// 导入使用
import { useMouse } from "./mouse.js";
const {x,y} = useMouse();
```

#### 接受参数

```js
// fetch.js
import { ref } from 'vue'
// 需要传入参数
export function useFetch(url) {
  const data = ref(null)
  const error = ref(null)

  fetch(url)
    .then((res) => res.json())
    .then((json) => (data.value = json))
    .catch((err) => (error.value = err))

  return { data, error }
}
```

```html
<script setup>
import { useFetch } from './fetch.js'
// 传入值
const { data, error } = useFetch('...')
</script>
```

#### 接受响应式参数

```js
const count = ref(0);

const add = () => {
  count.value++;
};
// 传入响应式
useChange(count);
```

```js
import { watch } from "vue";
export function useChange(num) {
  // 侦听响应式数据变化
    watch(num,()=>{
        console.log(num.value);
    })
}
```

#### 传入getter函数

```js
useChange(()=>count.value);
```

#### toValue

- 如果传入的值是 `ref`，`toValue` 会返回 `ref.value`。
- 如果传入的值是 `getter` 函数（例如 `computed`），`toValue` 会调用该函数并返回结果。
- 如果传入的值是普通值，`toValue` 会直接返回它。

```js
// 传入响应式
useChange(count);
//传入getter
useChange(() => 'count:'+ count.value);
```

```js
import { toValue,watchEffect } from "vue";
export function useChange(getter) {
    watchEffect(()=>{
        console.log(toValue(getter)); // 使用 toValue 返回值进行侦听
    })
}
```



### 自定义指令

> 在 `<script setup>` 中，任何以 `v` 开头的**驼峰式命名**的变量都可以被用作一个自定义指令。在上面的例子中，`vFocus` 即可以在模板中以 `v-focus` 的形式使用。

```vue
<script setup>
// 在模板中启用 v-focus
const vFocus = {
  mounted: (el) => el.focus()
}
</script>

<template>
  <input v-focus />
</template>
```

在没有使用 `<script setup>` 的情况下，自定义指令需要通过 `directives` 选项注册：

```js
export default {
  setup() {
    /*...*/
  },
  directives: {
    // 在模板中启用 v-focus
    focus: {
      /* ... */
    }
  }
}
```

将一个自定义指令全局注册到应用层级也是一种常见的做法：

```js
const app = createApp({})

// 使 v-focus 在所有组件中都可用
app.directive('focus', {
  /* ... */
})
```

#### 指令钩子

```js
const myDirective = {
  // 在绑定元素的 attribute 前
  // 或事件监听器应用前调用
  created(el, binding, vnode) {
    // 下面会介绍各个参数的细节
  },
  // 在元素被插入到 DOM 前调用
  beforeMount(el, binding, vnode) {},
  // 在绑定元素的父组件
  // 及他自己的所有子节点都挂载完成后调用
  mounted(el, binding, vnode) {},
  // 绑定元素的父组件更新前调用
  beforeUpdate(el, binding, vnode, prevVnode) {},
  // 在绑定元素的父组件
  // 及他自己的所有子节点都更新后调用
  updated(el, binding, vnode, prevVnode) {},
  // 绑定元素的父组件卸载前调用
  beforeUnmount(el, binding, vnode) {},
  // 绑定元素的父组件卸载后调用
  unmounted(el, binding, vnode) {}
}
```

#### 简化

对于自定义指令来说，一个很常见的情况是仅仅需要在 `mounted` 和 `updated` 上实现相同的行为，除此之外并不需要其他钩子。这种情况下我们可以直接用一个函数来定义指令，如下所示：

```html
<div v-color="color"></div>
```

```js
app.directive('color', (el, binding) => {
  // 这会在 `mounted` 和 `updated` 时都调用
  el.style.color = binding.value
})
```
