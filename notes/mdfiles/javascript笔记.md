# JavaScript笔记


> JavaScript 是一种 **轻量级** 的编程语言；以下是 js 特点：
>
> * **是一种解释性脚本语言**（代码不进行预编译）。
>
> * **具有跨平台性**
>   可以在多种平台下运行（如Windows、Linux、Mac、Android、iOS等）。
>
> * **弱类型脚本语言**
>   对使用的数据类型未做出严格的要求,可以进行类型转换，简单又灵活。
>
> * **安全性**
>   javaScript只运行在浏览器上，不能操作本地文件。
>
> * **面向对象 (ES6 class)**
>   易维护、质量高、效率高、易扩展。
>
> * **单线程，事件驱动**
>   js 是单线程语言但浏览器可能是多线程；可能将会将web划分开来如：
>   * javascript引擎线程
>   * 界面渲染线程
>   * 浏览器事件触发线程
>   * Http请求线程

## 书写位置

> `script` 标签可是放在 **任意位置**，但是建议放在 `head` 标签 **内部** 和放在 `body` 标签内 **最后**
>
> 放在head标签内部好处是在加载网页的第一时间加载script脚本
>
> 放在body标签最后则是为了等待DOM文档全部加载完成后才执行脚本
>
> 若script放在body最前面，而会发生先执行脚本再加载文档，若果script里面涉及DOM元素操作则会出现
>
> 错误，原因是DOM元素还未加载出来，script脚本未找到DOM元素

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <!-- head内部 -->
    <script>
      ...
    </script>
  </head>
  <body>
    <div></div>
    <!-- body尾部 -->
    <script>
       ...
    </script>
  </body>
</html>
```

## 操作符&运算符

### var let const

> var、let、const关键字是用来定义常量变量
>
> * var
>
>   定义变量
>
> * let
>
>   es6 新出关键字，用于定义变量，他比var更加完善，拥有局部作用域，在平时循环式我们使用var定义条件 `for(var i=0;;)` 缺陷是在循环外部也可以访问到变量 `i` 造成了变量污染，let 可以很好解决这个问题 `for(let i=0;;)` 在循环外部是无法访问到变量 `i`，let 不存在变量提升
>
> * const
>
>   es6 新出关键字，定义常量，常量具有不可修改性

```js
// var
for (var i = 0; i < 5; i++) {}
console.log(i);  // 5

{    //块域
    var i = 10;
}
console.log(i);  // 10

// let
for (let i = 0; i < 5; i++) {}
console.log(i); // 报错: i is not defined

{
    let i = 10;
}
console.log(i);// 报错: i is not defined

// const
const PI = 3.1415926;
PI = 3.14    // 报错，无法修改常量值
```

### 操作符

| 关键字 | 描述                       |
| ------ | -------------------------- |
| new    | 创建一个对象               |
| .      | 获取属性                   |
| []     | 获取属性，可以动态获取属性 |
| ...    | 展开操作符                 |
| void   | 代表不返回任何值           |
| delete | 用来删除一个对象的属性     |

```js
// new的作用是通过构造函数来创建一个实例对象。
function Foo(name) {
    this.name = name;
}
console.log("new Foo('mm')的类型：",typeof new Foo('mm')); // object
console.log("Foo的类型：",typeof Foo); // function

// . 的作用是获取属性
var Obj = { 'x': 10, y: 20, } // 也可以使用引号将属性括起来
alert(Obj.x);
alert(Obj.y);

// [] 可以动态获取属性
var Obj = { 'x': 10, y: 20, } 
var fo = 'y'
alert(Obj['x']); // 使用字符串指定属性
alert(Obj[fo]);  // 使用变量指定属性

// ... es6新展开符，展开运算符允许迭代器在接收器内部分别展开或扩展
var list = [1,3,5,7,9]
var list1 = [...list,11] // 先展开在复制到list1	
console.log(...list);  // 1 3 5 7 9 
console.log(...list1); // 1 3 5 7 9 11

var str = "abc"
var list = [...str]  // 展开字符串
console.log(list);   // ["a", "b", "c"]

var Obj = { x: 10, y: 20 };
var Obj1 = {
    ...Obj,  // 展开对象
    z: 30,
};
console.log(Obj1); // {x: 10, y: 20, z: 30}

var list = [1, 2, 3];
function foo(a,b,c) {
    console.log(a); //1
    console.log(b); //2
    console.log(c); //3
}
foo(...list); // 展开参数

// void 作用就是不返回任何值
console.log(void (2+1)); // undefined

function met() {
    return 10;
}
console.log(void met()); // undefined

// delete 作用是用来删除一个对象的属性，返回 true 或 false
var Obj = {
    x: 10,
    y: 20
};
console.log(delete Obj.x); // true
console.log(Obj); // {y: 20}

console.log(delete Math.PI); // false  内置对象属性不可删除

var list = [1, 3, 5, 7, 9];
console.log(list.length); //5
delete list[2];       // 删除数组元素
console.log(list[2]); // undefined
console.log(list);    // [1, 3, empty, 7, 9]
console.log(list.length); // 5  长度还是不变
```

> **delete** 删除数组元素后数组长度不变但是数组内容是为空的，不等于 **undefined** 而是真正意义上的 **空值** (empty)，undefined 是一种数据类型，但是进行判断的话 [empty] 还是会全等于 undefined 

**void 来做假链接替代 #**

```html
<a href="javascript:void(0)">超链接</a>
```

### 赋值运算符

| 关键字 | 描述                                                         |
| ------ | ------------------------------------------------------------ |
| =      | 赋值操作                                                     |
| +=     | 先把原有结果加上新的值再进行赋值                             |
| -=     | 先把原有结果减去新的值再进行赋值                             |
| *=     | 先把原有结果乘上新的值再进行赋值                             |
| /=     | 先把原有结果除以新的值再进行赋值                             |
| **     | 幂运算（存在兼容性问题）                                     |
| **=    | 先把原有结果与新的值进行幂运算后再进行赋值（存在兼容性问题） |

```js
// + 是赋值操作
var num = null;
num = 10;  // 将 10 赋值给 num
console.log(num); //10

// += 先把原有结果加上新的结果再进行赋值
var num = 10;
var con = num += 10;
console.log(con);  // 20

// -= 先把原有结果减去新的结果再进行赋值
var num = 10;
var con = num -= 10;
console.log(con); // 0

// *= 先把原有结果乘上新的值再进行赋值
var num = 10;
var con = num *= 10;
console.log(con); // 100

// /= 先把原有结果除以新的值再进行赋值
var num = 10;
var con = num /= 10;
console.log(con); // 1

// ** 幂运算
var num = 2 ** 10
console.log(num); // 1024

// **= 先把原有结果与新的值进行幂运算后再进行赋值
var num = 2
var con = num **= 10
console.log(con); // 1024
```

> 2**2 == Math.pow(2,2)

### 算数运算符

| 关键字 | 描述 |
| ------ | ---- |
| +      | 求和 |
| -      | 求差 |
| *      | 求积 |
| /      | 求商 |
| %      | 取模 |
| ++     | 自增 |
| --     | 自减 |

```js
// + 这是求两数之和
console.log(1 + 1); // 2

// + 这是求两数之差
console.log(1 - 1);   // 0
console.log(1 - 1.1); // -0.10000000000000009 浮点数精度问题

// * 这是求两个数的积
console.log(2 * 3); // 6

// % 这个取模，取模运算是一个表达式的值除以另一个表达式的值，并返回余数。
console.log(7 % 3); // 1

// ++ 这个是数值本身自增
var num = 10
console.log(++num);    // 11
console.log(num++);    // 10 原因是先打印 num 再自增
for(let i=0;i<5;i++){} // 用在循环上

// -- 这个是数值本身自减
var num = 10
console.log(--num); // 9
console.log(num--); // 10 原因是先打印 num 再自增
```

> 取模和取余是不同的概念

### 等同运算符

| 关键字 | 描述       |
| ------ | ---------- |
| ==     | 是否等于   |
| !=     | 是否不等于 |
| ===    | 是否全等于 |
| !==    | 是否不全等 |

```js
// == 作用是来判断是否等于
console.log(10 == 10);   // true
console.log(10 == 11);   // false
console.log(10 == '10'); // true  number与string比较

// === 作用是来判断是否全等于
console.log(10 === 10);   // true
console.log(10 === 11);   // false
console.log(10 === '10'); // false 不进行自动转换，数据类型不同，结果不等于

// != 作用是来判断是否不等于
console.log(10 != 10);   // false
console.log(10 != 11);   // true
console.log(10 != '10'); // false  number与string比较

// ！== 作用是来判断是否全不等
console.log(10 !== 10);   // false
console.log(10 !== 11);   // true
console.log(10 !== '10'); // true  不进行自动转换，数据类型不同，结果为 false
```

### 比较运算符

| 关键字 | 描述     |
| ------ | -------- |
| >      | 大于     |
| <      | 小于     |
| >=     | 大于等于 |
| <=     | 小于等于 |

```js
// >
console.log(10 > 10); // false
console.log(11 > 10); // true

// <
console.log(9 < 10);  // true
console.log(10 < 10); // false

// >=
console.log(10 >= 10); // true
console.log(11 >= 10); // true

// <=
console.log(9 <= 10);  // true
console.log(10 <= 10); // true
```

### 逻辑运算符

| 关键字 | 描述 |
| ------ | ---- |
| &&     | 和   |
| \|\|   | 或   |
| !      | 非   |

```js
// && 必须所有条件满足
console.log(1 < 2 && 3 < 2); //false  (true && false)

// || 其中一个条件满足即可
console.log(1 < 2 || 3 < 2); //true   (true || false)

//! 结果取反
console.log(!(1 < 2)); //false
```

### 字符串运算符

| 关键字 | 描述              |
| ------ | ----------------- |
| >      | 字符串比较 - 大于 |
| <      | 字符串比较 - 小于 |
| +      | 字符串拼接        |

```js
// >
console.log("a" > "b");   // false
console.log("abc" > "b"); // false  (首字母比较)

// <
console.log("a" < "b");   // true
console.log("abc" < "b"); // true   (首字母比较)

// + 
console.log("1" + 2);     // "12"
console.log("1" + 2 + 3); // "123"

console.log(2 + "1");     // 21
console.log(2 + 3 + "1"); // 51  (前面两个都是number先进行了运算再拼接)
```

### 三元运算符

| 关键机 | 描述                       |
| ------ | -------------------------- |
| ?  :   | 根据判断结果执行对应表达式 |

> 判断 ? 执行1 : 执行2       true 执行1 fasle 执行2

```js
//三元运算符 ?:
var bool = 1 < 2
var con = bool ? "hello" : "你好" 
console.log(con); // hello  (bool为true则第一个表达式)

var bool = 3 < 2
var con = bool ? "hello" : "你好"
console.log(con); // 你好    (bool为false则第二个表达式)
```

### 逗号运算符

> 逗号运算符是二元运算符，它能够 **先执行运算符左侧的操作数，然后再执行右侧的操作数，最后返回右侧操作数的值。**

实现多个变量赋值

```js
var a = 1,b = 2,c = 3,d = 4;

// 等同于
1. var a = 1;
2. var b = 2;
3. var c = 3;
4. var d = 4;
```

与条件运算符、逻辑运算符根据条件来决定是否执行所有或特定操作数不同的是，逗号运算符会执行所有的操作数，但并非返回所有操作数的结果，它只返回 **最后一个** 操作数的值。

```js
1. a = (b = 1,c = 2);  // 连续执行和赋值
2. console.log(a);  // 返回2
3. console.log(b);  // 返回1
4. console.log(c);  // 返回2
```

逗号运算符的优先级是最低的，赋值 `=` 运算符优先级高于逗号运算符

```js
1. a = b = 1,c = 2;  // 连续执行和赋值
2. console.log(a);  // 返回1
3. console.log(b);  // 返回1
4. console.log(c);  // 返回2
```

> a 的值为 b 的值而并非是 c 的 值。
>
> 与上 `a = (b = 1,c = 2)` 不同，因为 `()` 运算符优先级大于 `=` 运算符

逗号运算符可以作为仅需执行表达式的工具，这些表达式不需要返回值，但必须要运算。在特定环境中，可以在一个表达式中包含多个子表达式，通过逗号运算符让它们全部执行，而不用返回结果。

for 循环结构的小括号内包含 3 个表达式，第一个表达式为初始化值，第二个表达式为检测条件，第三个表达式为递增表达式。使用逗号运算符可以在 3 个表达式中添加多个 **额外的计算任务**，但要确保第二个表达式的最后一个子表达式返回一个可控布尔值，否则会导致死循环。

```js
for(var a = 1,b = 10,c = 100;++ c,a < b;a ++,c --){ 
  // a=1、b=10\++c、a++ 都是额外运算，不参数循环条件
  console.log(a * c);
}
```

**用于改变this指向**

<span style="color:red">在严格模式下无效</span> 严格模式下 **this** 不指向 **window** 而是 **undefined**

```js
!(0,console.log(this)); // window
```

在 `()` 中的的 this 指向的是window

```js
var person = {
  show: function () {
    console.log(this);
  }
};

!(person.show)()  // person
!(person.show = person.show)()  // window
!(person.show , person.show)()  // window

var a = person.show;
a()  // window
```

我们可以换个方式理解逗号运算符将右边的函数内容返回赋值到左边，此时左边是一个函数表达式，然后再运行左边这个函数表达式

> 因为我们知道逗号运算符前面只执行没有别的任何作用，所以前面的值可以是任意

```js
!(0, person.show)() // window
!(1, person.show)() // window
```

示例：

```js
var count = 1

var person = {
  count: 2,
  fun(a, b, c) {
      console.log(this.count);
  }
}

!(0, person.fun)("a", "b", "c"); // 1
```

> `!(0,fun)()`这样做的好处是 this 不会指向 person，而指向 window
>
> 至于前面为什么要加 `!` 是因为使用括号包裹定义函数体，解析器将会以函数表达式的方式去调用定义函数 类似 `var a = function(){}()` 若不加的话则有可能与上面的语句发生冲突

例如：

```js
var a = 1
(function(){})() // 报错
```

> 以上代码执行则会报错：<span style="color:red">Uncaught TypeError: 1 is not a function</span>
>
> 运算符 `()` 最高且从左到右，在编译器看来你在运行 `1(functin(){})`
>
> 所以你需要在前面加个运算符

```js
!(function(){console.log(this)})()
~(function(){console.log(this)})()
+(function(){console.log(this)})()
-(function(){console.log(this)})()
*(function(){console.log(this)})()
/(function(){console.log(this)})()
%(function(){console.log(this)})()
!=(function(){console.log(this)})()
==(function(){console.log(this)})()
void (function(){console.log(this)})()
```

> 当然不是所有运算符都可以的例如 `=` 运算符就不可以

**运用在无括号无函数名的函数身上**

```js
!function(){
  console.log('1');
}()
```

### viod&delete

> * `viod`
>
>   void 运算符保证返回值是 **undefined**
>
> * `delete`
>
>   1. 删除对象属性
>   2. 删除数组元素
>
> **void**
>
> void 是 **一元运算符** ，它可以出现在任意类型的操作数之前执行操作数，却忽略操作数的返回值，返回一个 undefined 。void 常用语 HTML 脚本中执行 JavaScript 表达式，但不需要返回表达式的计算结果。<br>     在早期ECMAScript标准中(v1?)并没有定义undefined 属性，因此，为了保证向后兼容， 当你需要undefined时，你可以 `var data = void 0;`<br>     void的作用便是返回undefined，在它右边的操作数会正常计算，但是无论结果是什么，void都会返回undefined。
>
> ```js
> var a = void (10 + 20)
> console.log(a); // undefined
> ```
>
> 作用真正意义上的假链接
>
> ```html
> <a href="javascript:void(0)">  // 不会跳转不会刷新页面
> ```
>
> **delete**
>
> delete 操作符
>
> ```js
> // delete 删除对象属性
> var person = {a: 10,b: 20,c: 30}
> delete person.b
> delete person['c']
> console.log(person);
> // delete 删除数组元素
> var list = [10,20,30]
> delete list[0]
> console.log(list) // [empty, 20, 30]
> ```
>
> 用于删除数组；删除后数组长度并不会改变，删除元素后会用 **empty [undefined]** 填充<br>用于删除对象的某个属性；如果没有指向这个属性的引用，那它最终会被释放；对象删除属性则是真的删除不会使用什么填充

### 运算符优先级

> 优先级代表先执行那个越高为越先执行

| **优先级** |                      **运算符**                       |                        **说明**                         |         **结合性**         |
| :--------: | :---------------------------------------------------: | :-----------------------------------------------------: | :------------------------: |
|     1      |                    `[]`、`.`、`()`                    |        字段访问、数组索引、函数调用和表达式分组         |          从左向右          |
|     2      |            ++ -- -~!delete new typeof void            |     一元运算符、返回数据类型、对象创建、未定 义的值     |          从右向左          |
|     3      |                        *、/、%                        |                   相乘、相除、求余数                    |          从左向右          |
|     4      |                         +、-                          |                 相加、相减、字符串串联                  |          从左向右          |
|     5      |                      <<、>>、>>>                      |               左位移、右位移、无符号右移                |          从左向右          |
|     6      |               <、<=、>、>=、instanceof                | 小于、小于或等于、大于、大于或等于、是否 为特定类的实例 |          从左向右          |
|     7      |                  \==、!=、\==\=、!==                  |               相等、不相等、全等，不全等                |          从左向右          |
|     8      |                           &                           |                        按位“与”                         |          从左向右          |
|     9      |                           ^                           |                       按位“异或”                        |          从左向右          |
|     10     |                          \|                           |                        按位“或”                         |          从左向右          |
|     11     |                          &&                           |                   短路与（逻辑“与”）                    |          从左向右          |
|     12     |                         \|\|                          |                   短路或（逻辑“或”）                    |          从左向右          |
|     13     |                          ?:                           |                       条件运算符                        |          从右向左          |
|     14     | =、+=、-=、*=、/=、%=、&=、\|=、^=、<、<=、>、>=、>>= |                     混合赋值运算符                      |          从右向左          |
|     15     |                           ,                           |                  逗号运算符，多个计算                   | 按优先级计算，然后从右向左 |

## 数据类型

> javaScript有多种数据类型，但总体可以分为两大类，分别是 **基本类型** 和 **引用类型** 
>
> 在[赋值运算](#赋值运算符)符面前基本数据类型是将值复制过去，引用数据类型则是将内存地址复制过去
>
> * 基本类型
>
>   变量之间的互相赋值，是指开辟一块新的内存空间，将变量值赋给新变量保存到新开辟的内存里面
>
> * 引用类型
>
>   变量之间的互相赋值，只是指针的交换，而并非将对象（普通对象，函数对象，数组对象）复制一份给新的变量，使用同一块内存空间

### 基本类型

| 类型      | 描述       |
| --------- | ---------- |
| Number    | 数字类型   |
| String    | 字符串类型 |
| Boolean   | 布尔类型   |
| Null      | 空值       |
| Undefined | 未定义     |

```js
var num = 10;          //数字类型
var str = 'hello'      //字符串类型
var bool = true;       //布尔类型
var foo = null;        //空值
var bar = undefined;   //未定义
var bar; //undefined   //未定义
```

### 引用类型

| 类型     | 描述 |
| -------- | ---- |
| Object   | 对象 |
| Array    | 数组 |
| Function | 函数 |

```js
var obj = { x : 10, y : 20}   //Object 对象类型
var list = [1,3,5,7,9]        //Array  数组类型
var met = function(){...}     //Function  函数类型
function met(){}              //Function  函数类型
```

> 在js中数组也是对象

## 语句

### 条件语句

| 关键字               | 描述                                                    |
| -------------------- | ------------------------------------------------------- |
| if                   | 只有当指定条件为 true 时，使用该语句来执行代码          |
| if...else            | 当条件为 true 时执行代码，当条件为 false 时执行其他代码 |
| if...else if....else | 使用该语句来选择多个代码块之一来执行                    |
| switch               | 使用该语句来选择多个代码块之一来执行                    |

```js
// if
var num = 10;
if (num < 10) {
    console.log("num小于10");
}
//条件不达成输出结果为空

//if...else
var num = 10;
if (num < 10) {
    console.log("num小于10");
} else {
    console.log("num不小于10");
}
//条件达成输出位：num不小于10

// if...else if....else
var num = 10;
if (num < 10) {
    console.log("num小于10");
} else if (num < 20) {
    console.log("num小于20");
} else {
    console.log("num不小于10");
}
//条件达成输出位：num小于20

// switch
var num = 10;
switch (num) {  // num 为判断的值
    case 10:    // case 后面跟着预期符合值，只要符合就执行代码块
        /*代码块书写位置*/
        console.log("num等于10");
        break;  // break 为跳出循环，以免执行所有符合条件的 case 代码块
    case 20:
        /*代码块书写位置*/
        console.log("num等于20");
        break;
    default:    // 当所有条件不符合时，执行 default 代码块
        /*代码块书写位置*/
        console.log("num不是10也不是20");
        break;
}
```

> `switch` 中的 **break** 是可选的，如果没有加入 **break** 跳出循环，将会执行所有符合条件的 **case** 代码块
>
> **break** 可用在所有的循环语句中

### 循环语句

| 关键字   | 描述                                       |
| -------- | ------------------------------------------ |
| for      | 循环代码块一定的次数                       |
| while    | 当指定的条件为 true 时循环指定的代码块     |
| do/while | 同样当指定的条件为 true 时循环指定的代码块 |

**for**

> for ([initialization]; [condition]; [final-expression])
>    statement
>
> for ([初始值]; [条件表达式]; [末尾循环体])
>    中间循环体
>
> 先定义**初始值**再判断**条件表达式**是否为符合，符合则执行**中间循环体**，之后再执行**末尾循环体**
>
> 这三个属性都可以省略，但分号不能省略，省略写法：`for(;;)` 或 `for(;条件;条件改变)` 

```js
for (let i = 0; i < 5; i++) {
    console.log(i);
}
// 输出 0 1 2 3 4 

for (let i = 0; i < 5; i++) {
    if (i === 3) {
        continue;
    }
    console.log(i);
}
// 输出 0 1 2 4 

for (let i = 0; i < 5; i++) {
    if (i === 3) {
        break;
    }
    console.log(i);
}
// 输出 0 1 2
```

**while**

> while (condition)
>   statement
>
> while (条件)
>   循环体
>
> 先判断条件是否符合，符合则执行循环体不符合则停止循环

```js
var i = 0;           //定义判断条件
while (i < 5) {      //条件判断
    console.log(i);  //循环体
    i++;             //递增
}
// 输出 0 1 2 3 4 

var i = 0;
while (i < 5) {
    console.log(i);
    i++;
    if (i === 3) {
        continue;
    }
}
// 输出 0 1 2 3 4  因为先递增后判断是否等于3

var i = 0;
while (i < 5) {
    console.log(i);
    i++;
    if (i === 3) {
        break;
    }
}
// 输出 0 1 2      因为递增在前所以起始为 1
```

**do/while**

> do
>    statement
> while (condition);
>
> do
>    循环体
> while (条件);
>
> 先执行循环体再判断条件，所以即使条件不符合也会先执行一次循环体

```js
var i = 0;
do {                 // 先执行一次循环体
    console.log(i);
    i++
} while (i < 5)      // 执行完循环体后进行判断
// 输出 0 1 2 3 4 
    
var i = 0;
do {
    console.log(i);
    i++
    if (i === 3) {
        continue;
    }
} while (i < 5)
// 输出 0 1 2 3 4   当结果为3时 continue 了后直接打印 3

var i = 0;
do {
    console.log(i);
    i++
    if (i === 3) {
        break;
    }
} while (i < 5)
// 输出 0 1 2 
```

### break和continue

> break 和 continue 都是用于跳出循环
>
> * break
>
>   结束整个循环
>
> * continue
>
>   结束本次循环，执行下次循环

```js
// break
for (let i = 0; i < 5; i++) {
    if (i === 3) {
        continue  // 结束本次循环，执行下次循环，结果只是 3 不输出
    }
    console.log("输出：" + i)
}

// continue
for (let i = 0; i < 5; i++) {
    if (i === 3) {
        break     // 结束整个循环，结果是输出只到 2 ，后面的将不会继续循环
    }
    console.log("输出：" + i)
}
```

## 函数(Function)

> 函数是由事件驱动的或者当它被调用时执行的可重复使用的代码块。
>
> 函数种类：
>
> * 具名函数
>
>   ​    具有指定名字的函数
>
> * 匿名函数
>
>   ​    用变量储存的函数
>
> * 自执行函数
>
>   ​    定义完就自己运行的函数

### 具名函数

> function name(参数 1, 参数 2, 参数 3) {
>     要执行的代码
> }

```js
function met(name,id) {   // 定义名为 met 函数，参数为 anme 和 id
    console.log("hello"); // 代码快
}
met()  // 调用函数

function met(){    // 无参数函数
	... 
}
```

### 匿名函数

> var name = function(参数 1, 参数 2, 参数 3) {
>     要执行的代码
> }
>
> var name = new Function("参数1,参数2","代码块")
>
> 使用 `new` 创建函数两个参数都为字符串类型

```js
var met = function() {    // 使用变量保存匿名函数
    console.log("hello"); // 代码块
}
met()   // 运行匿名函数

var met = new Function('name,id', 'console.log(' + "'hello'" + ')')
met()   // 运行匿名函数
```

### 自运行函数

> 函数一定义就自己运行
>
> 自运行函数有多种定义方式

```js
// 1 
(function() {
    console.log("hello");
}())     // 运行 () 在里面

(function(msg) {
    console.log(msg);
}("hello"))  // 带参数 hello

// 2 
(function() {
    console.log("hello");
})()     // 运行 () 在外面

(function(msg) {  // 带参数自运行函数
    console.log(msg);
})("hello")       // 传递参数

//3
(function met() {
    // 带名字的自运行函数，不过都是定义完了就运行有名无名作用已经不大
    console.log("hello");
})()

//4
!function(msg) {  // 加个 ! 使他变成表达式
    console.log(msg);
}("hello")

//5
void function(msg) {  // 使用关键字 void 使他变成表达式
    console.log(msg);
}('hello')
```

### 函数递归

> 递归的意思就是在函数里调用它自身。
>
> 递归可以在某些时候当作循环使用

```js
function A(){
    A(); // 内部调用自身
}

// 利用函数递归循环
function A(i) {
    console.log(i);
    if (i === 0)
        return   // 满足条件则 return
    A(--i)       // 继续调用自身
}
A(10)
```

### 自定义属性

> prototype是函数的原型对象，只有函数才拥有prototype
>
> 方法可以在自身的prototype上自定义属性
>
> **定义方式**：方法.属性 = 内容

```js
function met(name) {
    console.log(name);
}
met.A = "message";   //自定义属性 A
console.log(met.prototype); //从prototype可以查看自定义属性
console.log(met.A);

// 自定义属性保存方法
function met(name) {
    console.log(name);
}
met.foo = function() {       //将function保存到自定义属性上
    console.log("foo")
}
console.log(met.prototype);  //从prototype可以查看自定义属性
met.foo();  // 运行自定义属性方法
```

### arguments

> arguments是函数本身自带的属性，他用于返回接受到的参数，是一个类数组，并不是数组类型

| 属性   | 描述                                     |
| ------ | ---------------------------------------- |
| length | 长度                                     |
| callee | 返回函数本身，在 **严格模式** 下无法无效 |

```js
function met(name) {
    console.log(arguments);
}
met("hello")
```

**函数和方法的区别**

> 面向对象的 function 叫方法
> 面向过程的 function 叫函数
> 对象里面定义的叫方法，外边的叫函数

## 数组(Array)

> 数组是值得有序集合，每个值叫做一个元素，而每个元素在数组中有一个位置，以数字表示，称为索引。js的数组是无类型的，数组元素可以是任意类型，同一个数组中的不同元素可能是对象或数组。数组元素的索引**不一定要连续**，元素之间可以有空隙，叫做**稀疏数组** 。每个数组都具有一个 **length** 属性。针对非稀疏数组，length 属性就是数组元素的个数，针对稀疏数组，元素的length属性比所有元素的索引要大。非稀疏是我们学习掌握的主要知识点。

### 创建数组

> 1. `new Array()`
>
>    创建一个空数组
>
> 2. `new Array(5)`
>
>    创建一个长度为5的空数组
>
> 3. `new Array("red","blue",99)`
>
>    直接指名内容创建数组
>
> 4. `var list = [20,"apple",null]`
>
>    字面量创建数组

```js
// new Array()
var list = new Array()
console.log(list);        // []
console.log(list.length); // 0

// new Array(5)
var list = new Array(5)
console.log(list);        // [undefined,undefined,undefined,undefined,undefined]
console.log(list.length); // 5

// new Array("red","blue",99)
var list = new Array("red","blue",99)
console.log(list);        // ['red', 'blue', 99]
console.log(list.length); // 3

// var list = [20,"apple",null]
var list = [20,"apple",null]
console.log(list);        // [20, 'apple', null]
console.log(list.length); // 3
```

> **使用数组**
>
> 数组下标默认是数字填充，从 0 开始
>
> `list[0]`  代表数组第一个元素

```js
console.log(list[0]);  // 打印数组第一个元素
```

### 赋值和引用

> 根据下标进行操作 list[0]

```js
var list = [10,20,30];
var n = list[0];
list[2] = 40;
console.log(n);       // 10
console.log(list[1]); // 20
console.log(list[2]); // 40
```

### 自定义下标

> 数组下标默认是数字填充，我们可以修改为字符串作为数组下标

```js
var list = []
list[0] = 10;
list[1] = "hello";
list['i'] = "index"
list['b'] = "blue"
console.log(list);
console.log(list['i']);
console.log(list.length); // 2
```

> 需要注意的是这里的 length 显示为 2 而不是 4，**原因是length是根据数字下标最大的那个值才算**

```js
var list = []
list[0] = 10;
list[20] = 999;
list[1] = "hello";
console.log(list);
console.log(list.length); // 21 根据最大下标
```

> <span style="color:red">注意：</span>不建议使用字符串作为数组下标既不方便使用也不方便遍历数组

## 对象(Object)

> 对象是拥有属性和方法的数据集合，是被称为属性和方法的命名值的容器；可以定义以 “key: value” 对形式出现的相关数据的无序集合。
>

### 创建对象

> 若不懂原型对象和原型链即用最简单的方式<br>`var obj = {...}` 这样就创建一个 obj 对象

1. **new + Object**
2. **字面量定义**
3. **工厂模式(工厂函数)**
4. **构造函数定义**
5. **原型模式**
6. **混合模式（构造函数模式+原型模式）**

不懂原型对象和原型链的可以先跳过这些

> **new + Object**

```js
var person = new Object();  // 创建一个对象
person.name = "xuan";   // 为对象添加属性
person.age = 19;
person.fun = function(){
  console.log(this);
}
```

> 先是 new 一个对象，然后再往对象里添加属性
>
> 缺点就是不能复用



<hr>

> **字面量创建**
>
> 最简单的创建方式；属性以键值对方式定义 `key: value`。
>
> 弊端: 可复用性不强(只适用于临时生成的一个对象)，如需使用多个对象，还需要重新扩展其属性和方法。

```js
// 字面量
var obj = {
  firstname: 'jiang',
  lastname: 'jie',
  fun: function () {  // 成员方法
    console.log(this);
  }
}
console.log(obj);
```



<hr>

> **工厂函数模式**
>
> 工厂模式的实质还是基于已有对象扩充其属性和方法，只不过把创造对象的方法封装了，当需要创建多个对象的时候不需要重复写代码。
>
> 使用到的方法 `Object()`

```js
function createObject(username, password) {
  let o = new Object();  //  创建一个对象
  o.username = username; // 添加属性
  o.password = password;
  o.get = function () {  // 添加成员方法
    console.log(this.username + ", " + this.password);
  }
  return o;  // 将对象返回
}
var obj = createObject('admin', 'xxss')
console.log(obj);

console.log(obj instanceof Object);       // true
console.log(obj instanceof createObject); // false
```

> <span style="color:red">缺陷：</span>工厂模式解决了 **重复实例化** 多个对象的问题，但没有解决 **对象识别** 的问题（但是工厂模式却无从识别对象的类型，因为全部都是 **Object**。<br>不像Date、Array等可以区分



<hr>

> **构造函数创建**
>
> 定义一个 **function**，如果有 new 关键字去“实例化“，那么该function可以看做一个类

```js
function add(){}
var a = new add()

console.log(add);  // ƒ add(){}
console.log(a);    // add {}
```

> 可以看见 function 已经不是一个”函数“，而是一个对象

```js
function Person(username, password) {
  //在执行第一行代码前，js引擎会为我们生成一个对象
  this.username = username;
  this.password = password;
  this.getInfo = function () {
    alert(this.username + ", " + this.password);
  }
  //此处有一个隐藏的return语句，用于将之前生成的对象返回
  //只有在后面用new来调用构造函数的情况下，才会出现注释所述的这两点情况
}

var person1 = new Person("wuwu", "xxx");
var person2 = new Person("admin", "xxasd");

// 可以追溯“上级”
console.log(person1 instanceof Object); //true
console.log(person1 instanceof Person); //true
console.log(person2 instanceof Object); //true
console.log(person2 instanceof Person); //true
console.log(person1.constructor);       //constructor 属性返回对创建此对象的数组、函数的引用

// 方法不通用
console.log(person1 === person2);                 // false
console.log(person1.getInfo === person2.getInfo); // false
```

> **对比工厂模式有以下不同之处：**
>
> 1. 没有显式地创建对象
> 2. 直接将属性和方法赋给了 this 对象
> 3. 没有 return 语句
>
> 通过 `instanceof` 可以看出其既是 **Object** 的实例，又是 **Person** 的实例，知道来自哪里
>
> <span style="color:red">缺陷：</span>：每个实例都包含不同的 **Function实例**（明明做同一件事却创建多个实例，浪费资源）



<hr>

> **原型模式**

```js
function Person() { }
Person.prototype.name = "李斯"
Person.prototype.age = 20;
Person.prototype.fun = function () {
  console.log(this);
}
// 上面这些都属于共享属性（方法）
console.log(Person.prototype);  // 打印Person.prototype 共享属性

// 创建实例
var person1 = new Person();
console.log(person1.name);  // 李斯 继承了Person的属性

var person2 = new Person()
console.log(person2.name);  // 李斯
person2.name = "王刚"        // 覆盖 name属性；(私有属性)

console.log(person2);       // 王刚
console.log(person2.age);   // 20 继承属性
// console.log(person2.prototype.name);  // 实例化 不可找到Person.prototype 的属性

// 方法通用
console.log(person1 === person2);         // false
console.log(person1.fun === person2.fun); // true
```

> 原型模式的好处是所有对象实例 **共享它的属性和方法**（即所谓的共有属性，解决资源浪费），此外还可以设置实例自己的属性（方法）（即所谓的私有属性），可以覆盖原型对象上的同名属性（方法）。



<hr>

> **混合模式（构造函数模式+原型模式）**
>
> 用构造函数创建对象，使用原型链给他添加共享属性

```js
//（构造函数）
function Person(name, password) {
  this.name = name;
  this.password = password;
}

// 共有方法（原型模式）
Person.prototype = { // 字面量对象
  constructor: Person,
  //每个函数都有prototype属性，指向该函数原型对象，原型对象都有constructor属性，这是一个指向prototype属性所在函数的指针
  say: function () {
    alert(this.name);
  }
}

// 创建实例
var person1 = new Person("lisi", 21, ["lida", "lier", "wangwu"]);
console.log(person1);
var person2 = new Person("wangwu", 21, ["lida", "lier", "lisi"]);
console.log(person2);
```

> 也就是一部分**私有**和一部分**共用**<br>混合模式共享着对相同方法的引用，又保证了每个实例有自己的私有属性。最大限度的节省了内存。<br>过程中还提到了动态原型模式，寄生构造函数模式，稳妥构造函数模式。
>
> **为什么需要设置** `constructor ` ；假如我们不设置 constructor
>
> ```js
> console.log(person1);
> console.log(person1 instanceof Person);  // true
> console.log(person1.__proto__ === Person.prototype);  // true
> console.log(person1.__proto__.constructor  === Person);  // false
> ```
>
> `person1.__proto__.constructor`  不等于 Person 构造函数，这显然是不合理的，我们查看一下 `person1.__proto__.constructor`  打印结果
>
> ```text
> ƒ Object() { [native code] }
> ```
>
> 打印结果为 `f object(...)` 也就是 object 对象的构造方法为什么不是 Person ；如果我们把这段原型模式代码 **删了** 查看打印结果
>
> ```txt
> ƒ Person(name, age, family) { // 构造方法
> this.name = name;
> this.age = age;
> this.family = family;
> }
> ```
>
> ```js
> console.log(person1.__proto__.constructor === Person); // true
> ```
>
> 又成功指向 Person 构造方法为什么呢？
>
> 原来是因为覆盖 Person.prototype 时，等价于进行如下代码操作：
>
> ```js
> Person.prototype = new Object({  // Object的实例
> say: function () {
>  alert(this.name);
> }
> })
> ```
>
> 字面量创建时等同于 **new** 了一个 **Object** ，constructor自然指向object的构造方法<br>所以我们重新修改 `constructor` 的指向，如果觉得设置constructor麻烦，可以试试这个方法
>
> `Object.assgin(obj,newObj)`
>
> ```js
> function  Person() {}
> Object.assign(Person.prototype,{
>   func(){} // 内容
> })
> var person = new Person()
> person.__proto__.constructor === Person // true
> ```
>
> ```js
> function Person() {}
> Person.prototype = { func() {} } // 没有设置 constructor
> var person = new Person()
> person.__proto__.constructor === Person // false
> ```
>
> ```js
> function Person() {}
> Person.prototype = {
>   constructor: Person,
>   func() {}
> }
> var person = new Person()
> person.__proto__.constructor === Person // true
> ```
>
> `Object.assgin()` 方法方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象，如果目标对象中的属性具有相同的键，则属性将被源中的属性覆盖。后来的源的属性将类似地覆盖早先的属性。

#### 总结

> 1. **new + Object**
>
>    <span style="color:red">缺点</span>：不能复用
>
> 2. **字面量定义**
>
>    <span style="color:green">优点：</span>new + Object 的简写方式，最简单的创建方式
>
>    <span style="color:red">缺点</span>：与 new + Object 一样
>
> 3. **工厂模式(工厂函数)**
>
>    <span style="color:green">优点：</span>可以复用，相当于将 new + Object 装进了一个函数里面
>
>    <span style="color:red">缺点</span>：无法进行对象识别，不知道从哪创建的
>
> 4. **构造函数定义**
>
>    <span style="color:green">优点：</span>可以复用、可以进行对象识别
>
>    <span style="color:red">缺点</span>：全部属性都是私有包括方法也是，不能共用方法，每个实例方法都是独立的，浪费资源
>
> 5. **原型模式**
>
>    <span style="color:green">优点：</span>可以复用，可以进行对象识别
>
>    <span style="color:red">缺点</span>：全部都是公用属性没有私有属性
>
> 6. **混合模式（构造函数模式+原型模式）**
>
>    <span style="color:green">优点：</span>可以复用，可以进行对象识别，可以合理安排私有和公用属性

### 成员方法

> 方法是存储为对象属性的函数。

```js
var person = {  // 对象
  name: "张三",
  show: function(){   // 成员方法
    console.log(tihs.name)
  }
}
```

### 原型对象(Prototype)

> ![关系图](data:image/gif;base64,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)
>
> **new** 通过构造函数创建实例；实例 **[[prototype]] (.\__proto__)** 指向原型对象。<br>构造函数通过 **.prototype** 执行原型对象；原型对象 **.constuctor** 执行构造函数。
>
> * `[[prototype]]`
>
>   实例 **.\__proto__** 指向他的原型对象
>
> * `.prototype`
>
>   构造函数 **prototype** 指向他的原型对象
>
> * `constuctor`
>
>   原型对象 **constuctor** 属性指向构造函数
>
> 这三个都是属性隐性属性不会直接看见

```js
var str = new String('hello')
console.log(str);
console.log(str.__proto__ === String.prototype);    // true
console.log(str.__proto__ .constructor === String); // true
```

#### instanceof

> instanceof 是 Java 的保留关键字。它的作用是测试它左边的对象是否是它右边的类的实例，返回 boolean 的数据类型。
>
> 原理：测 A实例 的原型链（\__proto__）上是否有 B.prototype，若有返回 true，否则 false。

```js
function Person() { }
var p1 = new Person()

console.log(p1 instanceof Person);  // true
console.log(p1 instanceof Object);  // true 继承关系
console.log(Person instanceof Object); // true
```

> 图解
>
> 1.
>
> ![1](data:image/gif;base64,R0lGODlhbQQuAZEAAP///8xmMzOZzAAAACH5BAAAAAAALAAAAABtBC4BAAL/hI+py+0Po5y02ouz3rz7D4biSJbmiabqyrbuC8fyTNf2jef6zvf+DwwKh8Si8YhMKpfMpvMJjUqn1Kr1is1qt9yu9wsOi8fksvmMTqvX7Lb7DY/L5/S6/Y7P6/f8vv8PGCg4SFhoeIiYqLjI2Oj4CBkpOUlZaXmJmam5ydnp+QkaKjpKWmp6ipqqusra6voKGys7S1tre4ubq7vL2+v7CxwsPExcbHyMnKy8zNzs/AwdLT1NXW19jZ2tvc3d7f0NHi4+Tl5ufo6err7O3u7+Dh8vP09fb3+Pn6+/z9/v/w8woMCBBAsaPIgwocKFDBs6fAgxosSJFCtavIgxo8aN/xw7evzYLMAEkQwCDHAQQADKkxBSGnDZAGYClghgynxwE6TOnZ9MGhgANGhQlQB8LjBakmhMmgCEDiBqU+lLmjl/KoiaACkCpjy7esVU9SfTsFqvSj1g0inQpgeevoQKNShap0q5FoU7dW1etULPfv0L+BBVlSbP+uQ7tCjivgekEmXpMy1QAZKVugzLdu7QymgJ+635ObDo0YHkjhw7VqpMrJlTvzWbeYFd1qDvogxNOrduOpLpKnYLQDXq2p232rZ6Uybi35uXH2/K93VvvZh3W79uJq3n189hAldck+l329OHntRaXYHd2MVbEhbPHbv8+WUuI7Ycd254zfgfQP+mOll54603W4B84aUVZLjR1w9JETh41XpN0HbUZ7PhpdtlGK7WH3j6eWhUerGlpF180qllHH8mHmdfiiIyqI9Ri+V3lIQbjOcAjh5Q6OFzKRKXU1k82XdgewbQOFWP4NmklkqDcSegVATCxhxj5KHoI4wBYabXikmKoCMDYXLAmmSaJWZVVhua9peGUHaYFWpVkYjhT062x+NNU6q5IlZCZqklQE8WFid094EwpnoLXtAbZWiSFxpqzU1mZFdusggnc8LdZqJbT2LKZ1sv/YinYXVWGGhCbD443KMmpdUWmo3GSmmVju53WK20qnbqazZe6OWLG7kVVYmKLfqlmKf/emomlEW2JcCAVEbpJXGpDiQgsbVuqhm0U1kGHKF2zhVXXeV6C+u46n6nXHTTORrdc85Z+lSiSf5ZqHpslndneOGaupVdkvbK417XAlRimR2yO9yH6HHbVKZIfRfuf/v1iJSwac5E5W5MzvjxoRTo2W8Gf9p4sEZENokngBd/mSDEFMsMrrMXDxjXU9SKql6EOj+bctBCp3ApbRwmqyShMYf3mLlMq+thxU8faGyQ7zlFatUAD8111yGs7JuJSCZtsbcfRmx2sjhn3PCYIVu5ManOsux13XZjUHSdZDUMs2tns0tzeKs1jFmeUso27dZ3L844pwpXylm3xyItrrho/3+LOdRigfvfuUeWGmqaEAKbpcaNnz40sXBVbe9ckSspVpd51bXqbzW7/miVQAIdsbSh7ox68HcX1npkKCMNQ3LHx/lv6ND1rGLpyApPvZZvN3m9b/iywNX2HZxcffjin+A90YYtP3766vtQvgnpvrx+/PLPT3/99t+Pf/76kyDsydPvD8AA0moxXSJgYu5zKZwUCEsCbKAD/UMxjjVAQdK5Wu5g1z30PXCD+XtfmmbkIgT5JUgAMuD/OIjC9BkrResBm1OK1plspYQrfkuhDevnQRaKDEQi5E6BslbDGwpxfdtjSQs7ZLXisOR2sQPhEJ8oBANKcYpUrKIVr4jFLP9qcYtcxGIPihi3llXKR7VikrKgeBDTqaB/BDohFDTIDDi6AIyGotuvdDW5cZUFViRD4z9QRsUBghCB22nJArGWBTkqQ5EswJeMzFa4BVmuRbaLHbz8uI9swS1HEZSbBP1kQTxiMF+J1AYjV+DIutipLFKUUrTOx7xvnRIGXaylLW+Jy1zqcpe8JGCGJLmoHBpxh5kBZceSpckLSmGWxmAmClK5rvfEBDfaytcK6aRGGTgzHdu8SHqqs0KeHbFKLyykg0iEmBlKsFpvNOUXW2hEVSJvjGlTXo0qGIRunkOfFXEhBWskoWECLUQ9PM4PeUY5Nx6Bn8Bg6I42WZyVgSb/mX3Zmyh1RZPW1cCh4+BoRCgputDQcZxvCp1Llni2OhJzCh7lRUuvkK7XwU4HL/1GTRsC0mKK9FdhtFmfpNS8mWpOCzfFRVE9cdRtJFUDvWyqU58K1ahm8UHS5FnheKpSK91xPJarpr/IqFAjLJUWY9VEWa9xVgukVRfo8yc7HWlESIpUkoADUa0mVcpsrNUSe51GXyXwV1u0tarOg5+14slKE27llaTMiyyJ6s6G/vEHga3FYDl1T1RdzqualQ1h+wY4OuUVG3uV3SMq+wzU5ogcl51mSeAJNZd1diYSgy2k8snUyHJPtWPgbRwpy1qqAjSDyrxts95C0c18RqbQ/5Hn5Sg7S9+aoqymlYR0FwncjoIhprlrnw1OeV1SLLW6kwgvMsyL0HCg1w7kXa1eT1A7vk7WB+tVRX3ZS4H7IrUE7ZWvP+qr31MEmA79XSdaR1Bg//YDwMGdBfoGvAmOJvgSEP4Fg7VL1uNVOBP8jO9+/5tdcWy4DoDUbQYmHOH59mDEoWAxgSdoYrW6mAwzzsWFRWzjPZH2Ah4Wr4p5UONOBHkOAosxBFDc4h/vYMgp3oXsKuzdDLpvev4T6wSQLAomR7mxScEs4gzpWTHc+JmuPEptvOsea7UAzQv1RUYfCtEPtC+J+lIsIQGVWX8hMsSclEVR38W/5dF5JdSM1v+e23pIoXRhzOTL1Ms4q+d4hfS2kdYo3gbL5o1a+CT8XJoIyoclBtLQvcYEtGGljNsJYrkUfxZPWFkFQUVntYm+7FvPTJ1S9gj1CoyesiD3Fco9v/Ys56HMYyK02BHM+Z+p3vRDDfts9y7pcB8k5j8TOEa2KXbFYmJyG1oN7e9pWD966in0QOWrY2KslZClL9Eq6hf4mNGQNhocY9DT0vZJLYrC6DTfDEVsV3FaVwnCKO7WGVfYaBKGyE1ntAyczRYIbNWoAHdKLwi3XDEsYJ1UDCuRAx+EVmwtJx1Vw/mizqzlB+MEH0C6cpfxgVs6t+5eYyE7nufOUEdbxmtSUPH/zfGAtxzgFx962ugr1aQrfem8NDej+Aacinnuffve7LGnkpM3Z1XgJWXNQeP2sJrTWumQsLjampa5yhUQSVG/useJHSe3Py04yOmXd5Cd3rD/Jm1tz9zlSKL2nPkdwXyG78ZFpZ1k3txRShtL49f0aLTnUe0ZZbvkk/PqF3ibyOnVANuQRNCLAd2uH3JZuT/YWcMp8XNIYze3n3duEzB99hRHgdnV7jBujT5EsjU9tflEINXVfUT9YuLWw7Z72XoacmWbJ6IKX4LCeOf3/YMY6bH5cwCBntmkd1jzQ5/r17u08yYTNs6e231bo99TiKx6wn/3qUqVcWzJJsLyNj8D/9rD2H3mLzNXm9995xdqoGd9yGV3xcYe8+d86NdYMlJmBUdbovdvYAJ9/HMZ4KF1eNYxLseB94IX5/F+01F/4/J/lFM252dPzcZWnnRp3eYb//dZjTd2nvI3ajODd6VqMIguxAVWYtdnsWB2M8EyOohvVVUkslVMfCMkIiFat4UaTrNHJFdmZOMkLJNYlfc0o0cCvaZsxmZVbucdkoZOIHgsy7dKSCiELygcMehVR1iA4mdjBuZ5AWUhukc48fRl6xaActVlS9EfvBd1BnJfcIR/NEY+dBhm3ieBQ7UxbDNTADhRe2cbTxhR/xGIP/NvDphzsaI5vBduH8CFn4ZuaP/zKThCFY4YO+REHV64gGFSgmTzJWGSgkBQiN8We3PYh87jiYqIZ2hIhvJyhmnoRHaCI1HYOfolR7UnZIeYi2q2i+oXFr64JFSkNx+4WMXIg8eCajCzXIiYglpIeD7YaDOYMZKHULOYfu3yiWRhh4uIZ+gojoJ1i+U3bI2RdiN3j34Hhgc1fXpUb4UGO4CIH00Yj0fmCkE4d3Q3efi4kPrYiF/HZYe1ev5oTQRnbMrTOQ6pJDQSeCYoexXIP7hRjjfYHt2VkRAYfhrZkZKIe3mkkJjHb3E4jy34WrUja1jHdXuRgUtohM4FTYnoI38SehEncTzWCggZacIoODmpOw//qW5iEU4+FG9QA4/c2B0ciEe9kVLH1UTwk2lqBZJd6Fp5ZIr05JVPdisL2JQDtJRGt5ZmWJB+JiY78JUcF19uIlExRI0WZYodN3O0hAHKiAkQVpe/dkzh5EHYhnjdeFF+SX9REIpimZTaiCzJlVGe4iiPKW5MpZlAZlT7lwOF6ZRrOQPclZXo5Uy1uAWEyUzKJ2tROXfoxDyKZJolKJoxCYc1kD1xdk+WE5AedZs8NASqiQZYFZrE2U5MhZxWwJppEJy0GJZ+8JyyOZy3UGI68JyKoE/LSQXNiQbZGZc3wJ2lOZ4z+Qrj9l4dUJ7JuWDRaWTnaZDpqZ7r2QT0KWDu/ymfcukf70lzSQZi4alUZBUB9lkaYEKgbfafuWlTDgZY/MkBB1oEEDoKkRmgQHhlDvqgnyChWYafO2ahDZqfBrqMCeqZGAafFxqi4WhWSkZTDSZZKepkLJoDG2oINNpbGGqdMooDNkoIPBoGPooHQOoFQtpkCuoNRLpoOCqPJLpkLmphSmpZOiqeTupmtGelV4qlTRUMSMphHXpgmLRPUvpdWUqmZWqmuASmYcqkyXCTaYodXDqYziBzgummHQGnFCan4tRjddoVd6pgyxBytHI/fqpXZ2qoh4qoUpWnAVNn8kOnfAqpoMmCdSQ+jxqpl2qeGmap9LGpmOqp5CcWR//WqbtBqJ+aG9cpqqWKVqpqqqOBnoC1p/Mxqq1qqvfHY7Nqp6xKq6TxYNGFqxfxq7v6qYSonMEKEboqrKeaX/OJrDmWrM96IxUwqsZqENQKrZgKXkFjrdeKrYF5MM3KrcoamODaTOQarq4arbJqrueKrulqHdvKrsM6n6Qar/V6Yh6wrtaZr/baruoZGPDKr7WKKPt6kAQbsP0KijsBsAfbqi1lsPfJsBErrVv4sFlWsRL7rx+JEQuLsR0LohTBsR4rsqIqESE7sie7nw9xsShbqQ1hsiwLs6qmKisbs+lDs4jwsjWrs5L6Rze7s+qTs9bgsz8bP0PLB0FLtEk7l/n/gLRK67T6Yg9N+7RTK4fuILVUi7Wgqg5Gm7X1c7VV2rVhq2ncxLViO6hlK2Zoa7b4o7aL1rZry7bg8LVwS7eMqlRvW7f7g7eQmbd9O6N7ywRz67eDq7WACriEC0CCK2SHi7gCxLjQ1biR26Ln9biS20CKa12Va7kPpLna1Lmby7mfu1ugS7oAqp+li7pLJrr8tbqpy0GtO7CuK7srBrs3Uruzi0K3K2O4y7tIZ1+627s2hLlyMLzBa7x5qKHFe7zLK4RIBbzMi0bK21vPC72YJLrSW73ZKxuVi73a671Q6wjd+73jW7U1Sr3kC6niG7jqi77ta7elcb7uO6wVy77y/2u/4Buk9Xu/+9u8JBa//Pus+uu5/wvA1yrAEkfABXyuB2x4CazA8crAIvrAEwyZEWy7DkzBDGvB0rrBGezBA9rBOfjBI4wFISyoJIzCJRzBbZrCLcxrsbpRMOzCM9ydmMvCNIzDbivDCLbDOezDRHXD+CpsP0zExbkYICxpRazE/mtAS+zETwzFUSzFU0zFVWzFV4zFWazFW8zFXezFXwzGYSzGY0zGZWzGZ4zGaazGa8zGbezGbwzHcSzHc0zHdXwLEIITSwEHBWPHpSsjIgNX3JN5Z2QBFMUrfWKJTXx8DNTHMMslQZSS/DXIQAmWyItux/VNvTrJjbzAlQhLBP+0yYAVyiNYyCNUQoJYV5msQBjMyQPRw/PElTFHdLtiKx5HckFkJrPSRODyPnOyNb58JdpTb6LUyjGbLVdDFAX4He8xdTt3efV0ePGxzFQpdYPXU8VIO1iSUzn1VcVszJTyOFK5laSjfrEYb8and1VmIs/ojOTsOK4RyN6ss/5kkcjkaorijrEoMOjsN67oNLzYWDqSeM+yzZ/1ifIssnkTH0ejJDpChFCHluNMHP58dDKoWcZIMAgCzxICnggNrfRcV/bY0OeczxiEhR5ZknVY0ZC4WD+5M/5k0JHs0R2r0N3RjdD2jRNodRINSW3EfGrZXH1IZwW9ax0908Ja0wz/vRdraI8rOXqWN87NrBTm6NRbNVc/xU4LaNRHTavCdxesc0Jt2qbJJzsJQ1w6A1RdskJjDU+auZu9EpFAzdX8SjzB9IvZIdAjl9E6ecRn8pdzHa67qVx8HTZZ4JsRolCqDNiLzdiN7diPDdmRLdmTTdmVbdmXjdmZrdmbzdmd7dmfDdqhLdq8O2dTmBVnpk8wOdqbi2tfI2iO9jcxrYpijU9EudpZC5fR5mXzAtLHc9jFdne3bbngKGco0yhVIW+dGUu52NrCnbfgyHJDx5SzjE/PZdwX4sy2PNuMpYHOvbZa2HcLKXjqMjHm6JZsMdAgNH2vAmkB8HhZ7d1i+3n2/7zOALiLqCh95kh8wsXTkXGRQRXfz91/yfaKyac5xHKBh3GOVFYX7O2B6fZIAd63+OKGWUiJf0wXBPlPpSiGl2Q8aTlUPyPhE46I+AzQAThCo0iD4vwj7o2EciEgBjjiAt6MPw2LwqlZKFeKcFff+ayOM163cDXV9zjeLWk5sH02YchASm6Hn2XCQG5D26OVdtmW0TzlWc0k+r3feiw5wQjlyxucJGQadU1vihzUP6PcX566Wy3UoAxrvhmFah68bC7nVkzndY7nea7ne87nfe7nfw7ogS7og07ohW7oh47oia7oi87oje7ojw7pkS7pk07plW7pl47pma7pm87pnQru6Z8O6qEeQAUAADs=)
>
> 2.
>
> ![2](data:image/gif;base64,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)
>
> `a.constructor === String`
>
> 所有的对象 obj 都具有 `[[prototype]]` 属性（**null** 和 **undefined** 除外）
>
> 构造函数属性 **constructor**
> 假设 obj 是由函数对象 a 由 **new** 运算创造出来的，那么 obj 的 **constructor** 的属性就存放着一个对 a 的 **引用**，通过这个构造函数，我们还可以为 a 添加其他属性和方法
>
> 你只要记住只有函数才有 **prototype** 属性,这个属性值为一个 object 对象，准确的说，只有 `构造函数` 才有`prototype` 属性
>
> 构造函数准确说应该是构造实例的对象

### 原型链

> 由原型对象一系列的 `__proto__` 、`prototype` 、`constructor` 的链式联系就是原型链
>
> 实例如果访问了实例本身不存在的属性，顺着原型链往上找；也可以称为 **继承**
>
> ![3](data:image/gif;base64,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)
>
> **函数和对象之间的原型链**
>
> ![functionandobj](data:image/gif;base64,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)
>
> 
>
> ![2](data:image/gif;base64,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)

**原型链考核题**

```js
var F = function () { };

Object.prototype.a = function () {   // Object.prototype.a 
  console.log('123');
};
Function.prototype.b = function () { // Function.prototype.b
  console.log('456');
};

var f = new F();
F.a();
F.b();
f.a();
f.b();
```

> 解析：
>
> 1. F.a(); F.b();
>
>    F 是个构造函数，而 F 是 构造函数Function 的一个实例。因为 `F instanceof  Object === true` 、`F instanceof Function === true`，由此我们可以得出结论：F 是 Object 和 Function 两个的实例，即 F 能访问到 a， 也能访问到 b。
>
>    ```js
>    F instanceof Function  // true
>    F instanceof Object    // true
>    ```
>
> 2. f.a()；f.b();
>
>    对于 f 我们先来看一下下面的结果：
>
>    **f 并不是 Function 的实例**，因为它本来就不是构造函数，调用的是 Function 原型链上的相关属性和方法了（等于调用了function的返回值），只能访问到 Object 原型链。所以 f.a() 输出 123 ，而 f.b() 就报错了。
>
>    ```js
>    f instanceof Function // false
>    f instanceof Object   // true
>    ```
>
> 3. 分析查找路径
>
>    1. F.a 的查找路径：F 自身：没有 ---> **F.\_\_proto\__(Function.prototype)**：没有---> **F.\__proto__.\_\_proto\_\_(Object.prototype)**：找到了输出 123
>    2. F.b 的查找路径：F 自身：没有 ---> **F.prototype(Function.prototype)**：456
>    3. f.a 的查找路径：f 自身：没有 ---> **f.\__proto\_\_(Object.prototype)**：输出 123
>    4. f.b 的查找路径：f 自身：没有 ---> **f.\_\_proto\_\_(Object.prototype)**：没有 ---> **f.\_\_proto\_\_.\__proto\_\_(Object.prototype.\_\_proto__ : null)**：找不到，报错
>
> ```js
> F.a();  // 123
> F.b();  // 456
> f.a();  // 123
> f.b();  // error
> ```

#### in&hasOwnProperty

> in 关键字与 hasOwnProperty 方法用于判断某个属性是否存在
>
> `in` 和 `hasOwnProperty()` 区别
>
> in判断的是对象的所有属性，包括对象实例（自身）及其原型（继承）的属性；
> 而 hasOwnProperty 则是判断对象实例（自身）的是否具有某个属性。

```js
// 对象
var obj = {
  name: 'Li'
}
console.log('name' in obj);      // true
console.log('__proto__' in obj); // true
// hasOwnProperty
console.log(obj.hasOwnProperty('name'));     // true
console.log(obj.hasOwnProperty('__proto__'));// fasle

// 函数
function Person() {
  this.name = "Li"
}
Person.prototype.msg = 'content'

var p = new Person()

console.log('name' in p);             // true
console.log(p.hasOwnProperty('name'));// true

console.log('msg' in p);              // true
console.log(p.hasOwnProperty('msg')); // false

// 数组
var list = ['green','red','blue'];

console.log( 0 in list);     // true
console.log( '0' in list);   // true
console.log('green' in list);// false

console.log(list.hasOwnProperty(0));      // true
console.log(list.hasOwnProperty('0'));    // true
console.log(list.hasOwnProperty('green'));// false
```

> 判断数组时属性名为 **数组下标**
>
> **hasOwnProperty** 只判断属于”自己“的属性，继承的属性不会去计算，**in** 则是包括了继承属性
>
> 关于数组的一些注意点：
>
> ```js
> var list = ['green',undefined,null,,]
> delete list[0]
> 
> console.log(0 in list);  // false
> console.log(1 in list);  // true
> console.log(2 in list);  // true
> console.log(3 in list);  // false
> ```

### JSON对象

> JSON全称 JavaScript 对象表示法（JavaScript Object Notation）。
> JSON 是存储和交换文本信息的语法。类似 XML。
> JSON 比 XML 更小、更快，更易解析。
>
> 通常用在与服务器交换数据上

**语法规则**

- 数据是名称/值对
- 数据由逗号分隔
- 花括号保存对象
- 方括号保存数组

```json
{
  "name": "pingan",
  "box": ["a", "b", "c"],
  "list": [
    {
      "name": "leo", "age": 25,
      "box": ["a", "b", "c"]
    },
    {
      "name": "pingan", "age": 25,
      "box": ["a", "b", "c"]
    }
  ],
  "boolean": true
}
```

> **解析和生成JSON对象字符串**
>
> 1. `JSON.parse(string)`
>
>    将JSON字符串解析为js对象
>
> 2. `JSON.stringify(obj)`
>
>    将js对象转换为JSON对象字符串

```js
// JSON.stringify
var person = {
  name: 'Jerry',
  age: 10,
  cat: true,
  list: [
    { data: "A" },
    { data: "B" }
  ]
}
var jsonStr = JSON.stringify(person)
console.log(jsonStr);

// JSON.parse
var jsonStr = '{"name":"Jerry","age":10,"cat":true,"list":[{"data":"A"},{"data":"B"}]}'
var obj = JSON.parse(jsonStr)
console.log(obj);
```

### 面向对象

> JavaScript 语言中，生成实例对象的传统方法是通过构造函数和原型的组合模式 ES6 提供了更接近传统语言（java）的写法，引入了 Class（类）这个概念，作为对象的模板。通过 **class** 关键字，可以定义类。
>
> ES6 的 `class` 属于一种**“语法糖”**，所以只是写法更加优雅，更加像面对对象的编程，其思想和 ES5 是**一致**的。

```js
class Person {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  func() {
    console.log(`x:${this.x} y:${this.y}`);
  }
}
var p = new Person(10, 20)
console.log(p);
p.func()
```

> ES5 的构造函数Point，对应 ES6 的Point类的构造方法。
>**类的所有方法都定义在类的 prototype 属性上面。**
> 定义“类”的方法的时候，前面不需要加上 **function** 这个关键字，直接把函数定义放进去了就可以了
> 方法之间不需要逗号分隔，加了会报错，就跟写java一样
> ES6 的 **class** 使用方法与 ES5 的构造函数一模一样

```js
//类的所有方法都定义在类的prototype属性上面。
class point{
    constructor(){
		//
    }
    play(){
      ...  
    }
}
//上述代码等价于
point.prototype={
    constructor() {},
    play(){};
}

//在类的实例上面调用方法，其实就是调用原型上的方法。
class Ba{
	//
}
```

> 另外：ES5 的构造函数Point，对应 ES6 的Point类的构造方法。
>
> 由于类的方法都定义在prototype对象上面，所以类的新方法可以添加在prototype对象上面。`Object.assign()` 方法可以很方便地一次向类添加多个方法。

```js
class Person {
  constructor() {
  }
}
Object.assign(Person.prototype,{
  say: function () {},
  show(){}  // es6写法
})
// Class直接定义的方法之间不需要逗号分隔，加了会报错. 但是这里是Object.assign的方法格式, 这里面需要往Point.prototype里面添加的方法就需要符合对象的默认格式
var person = new Person()
person.__proto__.constructor === Person // true
```

1. 在类中声明方法的时候，方法前不加 function 关键字
2. 方法之间不要用逗号分隔，否则会报错
3. 类的内部所有定义的方法，都是不可枚举的（non-enumerable）
4. 一个类中只能拥有一个 constructor 方法

#### constructor

> constructor 方法是类的 **构造方法**，通过 **new** 命令生成对象实例时，**自动调用该方法**（默认返回实例对象 this）。**一个类必须有 constructor 方法**，如果没有显式定义，一个空的 constructor 方法会被默认添加。一个类只能拥有一个名为 “constructor” 的特殊方法，如果类包含多个 constructor 的方法，则将抛出 一个 SyntaxError 。
>
> ==实例后 constructor 将成为 实例的 `.constructor` constructor的属性会注册到实例上面==

```js
class Person {
  constructor(){
    console.log(arguments);
  }
  constructor(x,y){}
  sayHi(){
    console.log('hi');
  }
}
// Uncaught SyntaxError: A class may only have one constructor
```

> constructor方法默认返回实例对象（即this），完全可以指定返回另外一个对象
> (得是在创造class时就定义设置的, 在创造完class后,通过Object.assign的方式是没法改变构造函数的返回值的).

#### 类方法调用方式

> 必须  new 实例才可调用，而普通 es5 构造函数(非严格模式)是可以当成普通函数使用

```js
class Person{
  foo(){
    console.log(this);
  }
}

// bad
Person.foo()

// success
var person = new Person()
person.foo()
```

#### Getter&Setter

> Class的基本语法之getter和setter
> 与 ES5 一样，在“类”的内部可以使用get和set关键字，对某个属性设置存值函数和取值函数，拦截该属性的存取行为。

```js
class Person{
  constructor(age){
    this._age = age
  }
  get age(){
    return this._age
  }
  set age(newAge){
    this._age = newAge
  }
}

var person = new Person(18)
console.log(person.age);
person.age = 20
console.log(person.age);
```

#### 动态属性名

> es5构造函数是不支持这样写法

```js
var methodName = 'func'
class Person {
  constructor() {
  }
  [methodName]() { }
}

var p = new Person()
p.func()
```

#### 注意项

> 1. 严格模式
>
>    类和模块的内部，默认就是严格模式，所以不需要使用 `"use strict"` 指定运行模式。只要你的代码写在类或模块之中，就只有严格模式可用。考虑到未来所有的代码，其实都是运行在模块之中，所以 ES6 实际上把整个语言升级到了严格模式。
>
> 2. 不存在提升
>
>    ```js
>    new foo();
>    class foo{};
>    ```
>
>    上面代码中，Foo类使用在前，定义在后，这样会报错，因为 ES6 不会把类的声明提升到代码头部。
>
> 3. this指向
>
>    类的方法内部如果含有this，如果单独把class方法解构出来this会指向window但由于class默认是严格模式 this 会指向 undefined 所以会报错

#### 静态static

> 当类还没有实例化前我们可以用静态方法获取一些内容
>
> 如果静态方法包含 this 这个 this 指向 **类** 而不是实例
>
> 类相当于实例的原型，所有在类中定义的方法，都会被实例继承。如果在一个方法前，加上 `static` 关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”。

1. * 在静态方法中，**可以**调用静态方法。
   
   * 在静态方法中，<span style="color:red;font-weight:bold">不能</span>调用非静态方法。
   
   * 在静态方法中，**可以**引用类变量（即，**static** 修饰的变量）。

     `static name = "zhang"`
   
   * 在静态方法中，<span style="color:red;font-weight:bold">不能</span>引用成员变量（即，没有 **static** 修饰的变量）。
   
   * 在静态方法中，<span style="color:red;font-weight:bold">不能</span>使用 **super** 和 **this** 关键字。
   
2. 非静态方法:是不含有static关键字修饰的普通方法，又称为实例方法，成员方法。属于对象的，不属于类的。（成员属性，成员方法是属于对象的，必须通过new关键字创建对象后，再通过对象调用）。

   * 在普通方法中，可以调用普通方法。
   * 在普通方法中，可以调用静态方法
   * 在普通方法中，可以引用类变量和成员变量
   * 在普通方法中，可以使用 **super** 和 **this** 关键字

3. 静态方法和非静态方法的区别（调用方法不同）

   静态方法可以直接调用，类名调用。（类名.方法名 ）
   非静态方法通过实例调用。（实例名.方法名）

4. 静态方法和非静态方法的区别（生命周期不同）

   静态方法的生命周期跟相应的类一样长，静态方法和静态变量会随着类的定义而被分配和装载入内存中。一直到线程结束，静态属性和方法才会被销毁。（也就是静态方法属于类）
   非静态方法的生命周期和类的实例化对象一样长，只有当类实例化了一个对象，非静态方法才会被创建，而当这个对象被销毁时，非静态方法也马上被销毁。（也就是非静态方法属于对象）

5. **总结**：

   类方法可以直接通过类名调用，实例方法必需先实例化类，然后通过类的实例对象才能调用

```js
class Person {
  constructor() {}
  static show() {
    return this
  }
}
Person.show() ==== Person // true
```

```js
class Person {
  static name = "静静"  // 静态属性
  constructor(name, age) {
    this.name = name
    this.age = age
    this.height = 180  // 手动设置

  }
  static showName() {
    console.log(this.name)
  }
  showName() {
    console.log(this.name)   // 小李
    console.log(this.height) // 180 
    console.log(this.age)    // 20
  }
}
var person = new Person('小李', 20)
person.showName() // 小李 180 20
Person.showName() // 静静
```

> 在js中静态方法可以和普通方法重名但不建议

```js
class Person {
  static age = 18  // 静态属性
  constructor() {
    this.name = 'Jerry'
  } // 构造方法

  static showName() {  // 静态方法
    console.log(this.name)
  }
  showAge() {  // 普通方法
    console.log(this.age)
  }
}
var person = new Person()
Person.showName()  // Person // name属性返回 class 后面的类名
person.showAge()   // undefined
// 静态里面不能使用this
```

**调用方式**

1. 父类直接调用
2. 子类继承父类后调用
3. 子类通过super对象调用

```js
// 直接调用
class Foo {
  static classMethod() {
    return 'hello';
  }
}

Foo.classMethod();  // hello

// 子类继承父类调用
class Foo {
    static classMethod() {
        return 'hello';
    }
}
class Bar extends Foo {
}
Bar.classMethod() // hello

//子类通过super调用
class Foo {
    static classMethod() {
        return 'hello';
    }
}
class Bar extends Foo {
    static show() {
        return super.classMethod()
    }
}
Bar.show()  // hello
```

| 对比     | 静态方法                                                     | 普通方法                                                     | 构造方法                                                   |
| -------- | ------------------------------------------------------------ | ------------------------------------------------------------ | ---------------------------------------------------------- |
| 关键字   | static                                                       | 无                                                           | constructor                                                |
| 使用场景 | 声明一个仅供当前类或当前类的子类使用的方法                   | 创建实例化对象可直接调用的方法                               | 在用new关键字通过此类实例化对象时执行的方法                |
| 使用对象 | 当前类或当前类的子类                                         | 通过该类或该类的子类实例化生成的对象                         | 该类自身                                                   |
| 调用方法 | 1.父类直接调用<br/>2.子类继承父类后调用<br/>3.子类通过super对象调用 | 1.通过该类及该类的子类实例生成的对象调用<br/>2.该类通过prototype调用<br/>3.该类的子类通过_\_proto__隐式原型链调用 | 1.该类实例化对象时调用<br/>2.该类的子类使用super关键字调用 |

#### Class继承

> 关键字 **extends**
>
> 语法：`class child extends father`
>
> **class 没有多继承**

**首先我们要知道一下这些要点：**

1. Class 通过 extends 关键字实现继承。
2. 子类必须在 constructor 方法中调用 super 方法，否则新建实例时会报错。
3. 如果子类没有定义 constructor 方法，那么这个方法就会被默认添加。
4. 在子类的构造函数中，只有调用 super 方法之后才能够使用 this 关键字，否则会报错。

```js
class Person {
  constructor(name, age) {  // 父类构造方法
    this.name = name;
    this.age = age;
    this.msg = "这是父类属性"       // 父类属性
    console.log('父类方法执行了');
  }
  echoMsg() {               // 父类方法
    console.log(this.msg);
  }
}

class Child extends Person {
  constructor(name, age, sex) { // sex为子类构造函数参数
    super(name, age)            // 继承父类属性
    this.sex = sex;
    console.log('子类方法执行了');
  }
  show() {
    this.echoMsg()             // 执行父类方法
  }
  echoInfo() {                 // 子类方法
    console.log(`姓名：${this.name} 年龄：${this.age} 性别：${this.sex}`);
  }
}

var p = new Child('Li', 18, 'M')
p.show()      // 父类属性
p.echoInfo()  // 姓名：Li 年龄：18 性别：M
```

**<span style="font-size:20px">super</span>**

> super 关键字，super不仅仅是一个关键字，还可以作为函数和对象。
>
> 用法：
>
> * 继承父类属性，子类必须在 constructor 方法中调用 super 方法，否则新建实例时会报错。
> * 如果子类没有定义 constructor 方法，那么这个方法就会被默认添加。
> * 在子类的构造函数中，只有调用 super 方法之后才能够使用 this 关键字，否则会报错。
> * super 作为函数调用时表示父类的构造函数，用来新建父类的 this 对象。
> * super 虽然代表了父类的构造函数，但是返回的是子类的实例，即 super 内部的 this 指定的是子类。
> * super 只能用在子类的构造函数之中，用在其他地方会报错。
> * **super 作为对象时在普通方法中指向父类的原型对象 ；在静态方法中指向 父类。**
>
> 注意
>
> * 由于 super 指向父类的原型对象，定义在父类实例上的方法或属性是无法通过 super 调用的。如果定义在父类的 **原型** 上，super 就可以取到。
> * ES6规定，通过 super 调用父类的方法时，**super 会绑定子类的 this**。
> * 如果通过 super 对某个属性**赋值**，**这时 super 就是 this**，赋值的属性会变成子类实例的属性。
>
> **super 有两种使用方法，分别是当函数使用和当对象使用**

```js
class Person {
  static msg = '这是父类静态属性'
  constructor(name, age) {  // 父类构造方法
    this.name = name;
    this.age = age;
    this.msg = '这是父类属性'
  }
  echoMsg(){
    console.log(this.msg);
  }
}

class Child extends Person {
  constructor(name,age,sex) { // sex为子类构造函数参数
    super(name)           // 继承父类属性
    // super当函数使用
    this.sex = sex;
  }
  echoInfo(){
    console.log(this.name); // Li
    console.log(this.age);  // undefined  // 这个属性并没有super
    console.log(this.sex);  // M
    console.log(this.msg);  // 这是父类属性
    super.echoMsg()   // 这是父类属性
    // super当对象使用
    this.echoMsg()    // 这是父类属性
    //这里的super相当于A类的constructor构造函数，会执行A的constructor,但是此时的this指 
    //向的是B,所以打印出B
    //换一种方法理解是：在执行super时，A把constructor方法给了B，此时B有了A的功能，但是执 
    //行的是B的内容，也就是es5的A.prototype.constructor.call(this)。
  }
  static func(){
    console.log(super.msg);   // 这是父类静态属性
    console.log(this.msg);    // 这是父类静态属性
    console.log(super.echoMsg);// undefined 此时指向父类而不是父类prototype
  }
}

// super指向
class Person {
  age() {console.log("father");}
}

class Child extends Person {
    constructor(age) {
        super()
        this.age = age;}
    show() {
        super.age()  // 调用父类方法
        console.log(this.age); // 18
        super.age = 20; // 并非修改父类age方法而是对子类age属性进行赋值

        console.log(this.age); // 20
        super.age()  // 调用父类方法
    }
}
var c = new Child(18)
c.show()
```

> **class 定义的普通方法都会定义在原型上，静态方法或属性才会定义到类当中**
>
> 在 `constructor` 中必须调用 `super` 方法，因为子类没有自己的 `this` 对象，而是继承父类的 `this` 对象，然后对其进行加工,而 `super` 就代表了父类的构造函数。`super` 虽然代表了父类 A 的构造函数，但是返回的是子类 B 的实例，即 `super` 内部的 `this` 指的是 B，因此 `super()` 在这里相当于 ```A.prototype.constructor.call(this, props)``。

```js
class A {
  constructor() {
    console.log(new.target.name); // B  // new.target 指向当前正在执行的函数
  }
}

class B extends A {
  constructor() {
    super();  // super当函数使用
  }
}
new A(); // A
new B(); // B
```

> 可以看到，在 `super()` 执行时，它指向的是 子类 B 的构造函数，而不是父类 A 的构造函数。也就是说，`super()` 内部的 `this` 指向的是 **B**。
>
> super 在静方法中指向父类，父类的静态方法，可以被子类继承静态方法也是可以从 super 对象上调用的。

```js
class A {
  static name = "Zhang";
  static show() {
    console.log("静态方法");
  }
  shwo() {
    console.log("普通方法");
  }
}

class B extends A {
  static emit() {
    console.log(super.name);
    super.show();  // super当对象使用
  }
}
// 并没有创建实例
B.emit() // Zhang 静态方法
```

> 通过 super 调用父类的方法时，super 会绑定子类的 this。

```js
class A {
  constructor() {
    this.x = 1; } // 父类1
  s() { console.log(this.x); }
}

class B extends A {
  constructor() {
    super();
    this.x = 2; // 子类2
  }
  m() { super.s(); }
}

let b = new B();
b.m(); // 2
```

> `super.s()` 虽然调用的是 `A.prototytpe.s()`，但是 `A.prototytpe.s()` 会绑定子类 B 的 **this**，导致输出的是 **2**，而不是 **1**。也就是说，实际上执行的是 `super.s.call(this)`。
>
> 由于绑定子类的 this，所以如果通过 super 对某个属性赋值，这时 `super` 就是 **this**，赋值的属性会变成子类实例的属性。

```js
class A {
  constructor() {
    this.x = 1;
  }
}

class B extends A {
  constructor() {
    super();
    this.x = 2;
    super.x = 3;
    console.log(super.x); // undefined
    console.log(this.x); // 3
  }
}

let b = new B();
```

> 上面代码中，super.x 赋值为 3，这时等同于对 this.x 赋值为 3。而当读取 super.x 的时候，调用的是 `A.prototype.x`，但并没有 x 方法，所以返回 **undefined**。
>
> 注意，使用 super 的时候，必须显式指定是作为函数，还是作为对象使用，否则会报错。

```js
class A {}
class B extends A {
  constructor() {
    super();
    console.log(super); // 报错
  }
}
```

> 上面代码中，console.log(super); 的当中的 super，无法看出是作为函数使用，还是作为对象使用，所以 JavaScript 引擎解析代码的时候就会报错。这是，如果能清晰的表明 super 的数据类型，就不会报错。
>
> 一般情况使用不用考虑这么麻烦

#### 私有属性和私有方法

> `#` 私有属性和方法定义符号，私有属性具有更高的安全性，除了类本身其他均不可直接获取调用
>
> 存在兼容性
>
> * `firefox`
>
>   <span style="color:red">SyntaxError: private fields are not currently supported</span> （语法错误：当前不支持私有字段）
>
> * `edge`
>
>   <span style="color:red">SCRIPT1014: SCRIPT1014: Invalid character</span> （无效字符）
>
> * `chrome`
>
>   新版支持 # 作为私有属性符号

```js
class Foo {
  #a;
  #b;
  #sum() { return #a + #b; }
  printSum() { console.log(#sum()); }
  constructor(a, b) { #a = a; #b = b; }
}
let f = new Foo(1, 2);
f.printSum();  // prints 3
```

#### 重写

> 子类重写同父类同名方法
>
> js 没有 重载

```js
class A {
  show() {
    console.log("父类show内容");
  }
}
class B extends A {
  show() {
    console.log("子类show内容");
  }
}
var n = new B();
n.show();  // 子类show内容
```

#### new.target

> `new.target` 属性允许你检测函数或构造方法是否是通过 new 运算符被调用的。在通过 new 运算符被初始化的函数或构造方法中，`new.target` 返回一个指向构造方法或函数的引用。在普通的函数调用中，`new.target` 的值是 `undefined`。
>
> 描述
>
> `new.target` 语法由一个关键字"`new`"，一个点，和一个属性名"target"组成。通常"`new`"的作用是提供属性访问的上下文，但这里"`new`"其实不是一个真正的对象。不过在构造方法调用中，`new.target`指向被`new`调用的构造函数，所以"`new`"成为了一个虚拟上下文。
>
> `new.target`属性适用于所有函数访问的元属性。在 **箭头函数**（arrow functions）中，`new.target` 指向最近的 **外层函数** 的`new.target`（箭头函数表达式没有自己的 this、arguments、super 或 new.target) 。

```js
function Foo() {
  if (!new.target) throw "Foo()必须用new实例化";
  console.log("Foo用new实例化");
}

new Foo(); // logs "Foo用new实例化"
Foo(); // throws "Foo()必须用new实例化"
```

> 在类的构造方法中，`new.target` 指向直接被 `new` 执行的构造函数。并且当一个父类构造方法在子类构造方法中被调用时，情况与之相同。

```js
class A {
  constructor() { console.log(new.target.name); }
}

class B extends A {
  constructor() { super(); }
}

var a = new A(); // logs "A"
var b = new B(); // logs "B"

//
class C {
  constructor() {
    console.log(new.target);
  }
}
class D extends C {
  constructor() {
    super();
  }
}

var c = new C(); // logs class C{constructor(){console.log(new.target);}}
var d = new D(); // logs class D extends C{constructor(){super();}}
```

> `constructor`

```js
class A {
  constructor(){
    console.log(new.target.name);  // B
  }
}

class B extends A{
  constructor(){
    super();
  }
}

var b = new B() // B
```

> 这里的super相当于A类的constructor构造函数，会执行A的constructor,但是此时的this指向的是B,所以打印出B
>
> 简单说：<br>作用一：判断函数是否通过new调用, 如果是，则new.target等于函数本身，否则等于undefined
>
> 作用二：判断实例的构造函数，（限制类只能用于继承，不能实例化）
>
> `if new.target === currentClass throw "..."`

## DOM和BOM

> * BOM是浏览器对象模型
>
>   提供了独立于内容而与浏览器窗口进行交互的对象。描述了与浏览器进行交互的方法和接口，可以对浏览器窗口进行访问和操作，譬如可以弹出新的窗口，改变状态栏中的文本，对Cookie的支持，IE还扩展了BOM，加入了ActiveXObject类，可以通过js脚本实例化ActiveX对象等等）。
>
>   BOM的最根本对象是window。
>
> * DOM是文档对象模型
>
>   DOM是针对XML的基于树的API。描述了处理网页内容的方法和接口，是HTML和XML的API，DOM把整个页面规划成由节点层级构成的文档。
>
>   DOM最根本对象是document（实际上是window.document）。

<img src="data:image/gif;base64,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">

## DOM操作

### Document

> document 对象代表当前网页整个文档，document 对象可以对 HTML 文档进行检查、修改或添加内容，并处理该文档内部的事件

### 获取节点

| 方法                            | 描述                                                         |
| ------------------------------- | ------------------------------------------------------------ |
| document.getElementById         | 根据 **id** 获取节点                                         |
| document.getElementsByClassName | 根据 **class** 获取节点，获取的是一个节点数组                |
| document.getElementsByName      | 根据 **name**获取节点，获取的是一个节点数组                  |
| document.getElementsByTagName   | 根据 **标签名称** 获取节点，获取的是一个节点数组             |
| document.querySelector          | 方法返回文档中匹配指定 **CSS 选择器** 的一个元素，如果没有匹配项，返回null。(es6) |
| document.querySelectorAll       | 方法返回文档中匹配指定 **CSS 选择器** 的所有元素，是一个节点数组，没有返回空节点数组。(es6) |

> <span style="color:red">节点数组并不是一个普通的数组</span>

```html
<style>
div {height: 40px;width: 100px;margin-bottom: 10px;}
#box {background-color: #ccc;}
div.msg {background-color: pink;}
p.msg {background-color: goldenrod;}
ul {background-color: #eee;padding: 10px 20px;}
ul li {margin: 4px;}
ul li:nth-child(odd) {background-color: lightpink;}
ul li:nth-child(even) {background-color: paleturquoise;}
</style>
<!-- body -->
<div id="box">div #box</div>
<div class="msg">div .msg</div>
<p class="msg">p .msg</p>
<input type="text" name="txt" id="" value="123">
<ul>
    <li>li1</li>
    <li>li2</li>
    <li>li3</li>
    <li>li4</li>
    <li>li5</li>
</ul>
```

```js
// document.getElementById  根据 id 获取唯一节点
var node = document.getElementById('box')
console.log(node)

// document.getElementsByClassName  根据 class 获取节点数组
var nodeList = document.getElementsByClassName("msg")
console.log(nodeList);
console.log(nodeList[0]);  //打印具体节点

// document.getElementsByName  根据 name 获取节点
var input = document.getElementsByName("txt")
console.log(input);
console.log(input[0]);    //打印具体节点

// document.getElementsByTagName  根据标签名称获取节点
var listBox = document.getElementsByTagName("ul")
console.log(listBox);
console.log(listBox[0]);    //打印具体节点

// document.querySelector  根据 css选择器 匹配元素
var box = document.querySelector("#box")
console.log(box);

// document.querySelectorAll  根据 css选择器 匹配所有元素
var list = document.querySelectorAll("li")
console.log(list);
console.log(list[0]);    //打印具体节点
```

### 改变节点

#### 改变样式

| 方法                  | 描述                         |
| --------------------- | ---------------------------- |
| element.style         | 更改样式                     |
| element.style.cssText | 批量更改样式或者返回内联样式 |

> style使用方法
>
> 对象名.style.属性 = “属性值”
>
> 对象名.style = “属性名:属性值;属性名:属性值;”

```js
//element.style
//更改单个样式
var box = document.getElementById("box")
box.style.color = "black"              //添加单个样式
box.style.border = "4px solid blue"    //添加单个样式
box.style.textAlign = "center"         //驼峰式书写多个单词
//批量更改样式
var box = document.getElementById("box")
box.style = "color:white;background-color:blue;border-radius: 10px;"

//element.style.cssText  批量更改样式
var box = document.getElementById("box")
box.style.cssText = "background-color:#eee;border:4px solid black"
//style.cssText  返回样式
var box = document.getElementById("box")
box.style.color = "black"
box.style.border = "4px solid black"
console.log(box.style.cssText);   //打印元素样式
```

> style添加的是内联样式
>
> 更改样式还可以更改元素类名实现 element.className = ""
>
> cssText在ie中需添加分号以避免兼容问题 `box.style.cssText += ";color:red"`
>
> cssText兼容性比较强

#### 改变属性

| 方法                                               | 描述         |
| -------------------------------------------------- | ------------ |
| element.getAttribute(attributename)                | 获取属性值   |
| element.setAttribute(attributename,attributevalue) | 写入一个属性 |
| element.attributes                                 | 获取属性集合 |

```js
// element.getAttribute(attributename)  获取属性值
var box = document.getElementById("box")
console.log(box.getAttribute('id'));

// element.setAttribute(attributename,attributevalue)  写入一个自定义属性
var box = document.getElementById("box")
box.setAttribute("msg", "hello");  //自定义msg属性
console.log(box.getAttribute("msg"));  //获取msg属性值

// element.attributes   获取属性集合
var box = document.getElementById("box")
console.log(box.attributes);
console.log(box.attributes[0].name);    //属性名称
console.log(box.attributes[0].value);    //属性值
```

#### 改变内容

| 属性              | 描述                   |
| ----------------- | ---------------------- |
| element.innerText | 以文本形式添加内容     |
| element.innerHTML | 添加的内容将会进行解析 |

```js
// element.innerText  添加文本内容
var p = document.getElementsByClassName("msg")[1]
p.innerText = "<span>span</span>"    //<span> 不会被解析成标签

// element.innerHTML  添加内容，内容将会进行解析
var p = document.getElementsByClassName("msg")[1]
p.innerHTML = "<span class='icon'>span</span>"

```

添加多个内容儿不想 **覆盖** 则把 `=` 换成 `+=` 即可

```js
// element.innerText
var p = document.getElementsByClassName("msg")[1]
p.innerText += " span"
p.innerText += " span"

// element.innerHTML
var p = document.getElementsByClassName("msg")[1]
p.innerHTML += "<span></span>"
p.innerHTML += "<span></span>"
```

### 创建节点

> 创建节点有很多类型的节点，比如元素节点，文本节点，注释节点，属性节点和 CDATA section 节点
>
> 这里记载元素节点、属性节点和文本节点的创建方式

| 方法                     | 描述                   |
| ------------------------ | ---------------------- |
| document.createElement   | 创建指定类型的元素节点 |
| document.createTextNode  | 创建一个文本节点       |
| document.createAttribute | 创建一个属性节点       |

```js
var txt = document.createTextNode("hello")  //创建一个文本节点
var box = document.createElement("div")     //创建一个元素节点
var atr = document.createAttribute("data")  //创建一个属性节点，不过还没用赋值
atr.value = "test"        //为属性节点添加值
atr.nodeValue = "test"    //为属性节点添加值
console.log(atr)

//将属性节点添加至元素
msg.setAttributeNode(atr)
```

> value和nodevalue不一样，nodevalue 适用于"**文本节点**"和"**属性节点**"，对"**文档节点**"和"**标签节点**"不起作用。
>
> 对于"input"中的值不能使用nodevalue

### 添加节点

| 格式                    | 描述                                                         |
| ----------------------- | ------------------------------------------------------------ |
| parentNode.append       | 添加节点至parentNode里                                       |
| parentNode.appendChild  | 添加节点至parentNode里                                       |
| parentNode.insertBefore | 将节点插入到parentNode内子节点之前                           |
| parentNode.innerHTML    | 获取和插入HTML元素，解释执行，会把包含标签同名的字符串解析成标签 |
| parentNode.innerText    | 添加文本，innerText是一次性修改，会将标签里所有内容修改，原样输出 |

```js
var txt = document.createTextNode("好客")  // 创建一个文本节点
var box = document.createElement("div")   // 创建一个div元素
box.append(txt)         // 使用append将文本元素添加到div元素里面
box.appendChild(txt)    // 使用appendChil将文本元素添加到div元素里面
console.log(box)

box.append("让世界更美好！")   // append直接插入字符串作为文本元素
// box.appendChild("让世界更美好！")  // 报错，appendChild不支持以上操作

// append插入多个元素，appendChild则不可以
var box = document.createElement("div")
var txt = document.createTextNode("This is a text")
var span = document.createElement("span")
box.append("让世界更美好！", txt, span)  // 以逗号分隔插入的元素
cosnole.log(box)

//innerText
var msg = document.querySelector(".msg")
msg.innerText = "团结"   // 会覆盖掉之前内容
msg.innerText += "团结"  // 这样即是在后面追加
console.log(msg.innerText);  // 获取里面的text内容

//innerHTML
msg.innerHTML = "<span>友爱</span>";  // 添加元素，会进行解析渲染成span标签
msg.innerHTML += "String"     // 追加内容
console.log(msg.innerHTML);
```

> obj.insertBefore(newItem,existingItem);

```js
var msg = document.querySelector(".msg")
var txt = document.createTextNode("真诚")
msg.insertBefore(txt, msg.childNodes[0])  //第一个参数为插入的元素，第二个为位置元素
console.log(msg);
```

> **parentNode.append**与 **parentNode.appendChild()** 的区别在于：
>
> * parentNode.append()可以同时传入多个节点或字符串，没有返回值；
>
> * 而parentNode.appendChild()只能传一个节点，且不直接支持传字符串;
>
>   (需要parentNode.appendChild(document.createTextElement('字符串'))代替)。
>
> **innerHTML**、**innerText**、**document.write** 的区别：
>
> * innerHTML  页面获取内容的时候，会把标签也获取到，就是标签会渲染到页面上，如果内容中有标签，会解析标签。
> * 假如里面有a标签 他输出的不是标签文字而是超链接;
>   innerText 则是什么就输出什么 \<input> 就是字符串 \<input> 不会转换
> * document.write 是对整个文档流进行操作的 每次会**重写** 使用前必须调用document.open;
>   没有写open的话会自动调用的话每次写完关闭之后重新调用该函数，会导致页面被重写。(基本不用)

### 替换节点

| 方法                | 描述           |
| ------------------- | -------------- |
| parent.replaceChild | 替换某个子元素 |

```js
msg.replaceChild(txt, msg.childNodes[0])  // 第二个参数为位置元素
```

### 删除节点

| 方法               | 描述           |
| ------------------ | -------------- |
| parent.removeChild | 删除某个子元素 |

```js
msg.removeChild(msg.childNodes[0])  // 参数是要删除的对应元素
```

### 克隆节点

| 方法             | 描述                                                 |
| ---------------- | ---------------------------------------------------- |
| node.cloneNode() | 拷贝一个节点，有一个参数，为 true 时拷贝其所有子节点 |

```js
var lists = document.querySelectorAll("ul li")  //获取要克隆的元素
var li = lists[0].cloneNode()      //将克隆的元素保存下来
var li = lists[0].cloneNode(tue)   //会将被克隆元素里的子元素克隆下来
console.log(li);
```

> cloneNode() 方法，拷贝所有 **属性** 和 **值**，包括 onclick = "func()"，但不包括 **直接绑定** 和 **事件监听**

### Node 对象

#### 常用属性

| 属性                   | 描述                                                         |
| ---------------------- | ------------------------------------------------------------ |
| childNodes             | 获取子节点，是一个节点数组（只读）                           |
| firstChild             | 获取第一个子节点（只读）                                     |
| lastChild              | 获取最后一个子节点（只读）                                   |
| parentNode             | 获取父节点（只读）                                           |
| nextSibling            | 获取同级下一个节点（只读）                                   |
| nextElementSibling     | 属性返回指定元素之后的下一个兄弟元素（只读）                 |
| previousSibling        | 获取同级上一个节点（只读）                                   |
| previousElementSibling | 属性返回指定元素的前一个兄弟元素（只读）                     |
| attributes             | 节点的属性列表（只读）                                       |
| nodeValue              | 属性根据节点的类型设置或返回节点的值（可读写）               |
| textContent            | 属性设置或者返回指定节点的文本内容（可读写）                 |
| nodeType               | 属性返回以数字值返回指定节点的节点类型。元素：1、属性：2、文本：3 |
| nodeName               | 返回节点名称，大写字母（只读）                               |
| innerText              | 节点内获取和写入文本（可读写）                               |
| innerHTML              | 节点内获取或写入内容（可读写）                               |

> xxxxSibling 属性返回元素节点之后的兄弟节点（包括文本节点、注释节点）；
> xxxxElementSibling 属性只返回元素节点之后的兄弟元素节点（不包括文本节点、注释节点）；

**元素位置以及宽高**

| node属性     | 描述                                                        |
| ------------ | ----------------------------------------------------------- |
| clientWidth  | width+pad左+pad右（不包括滚动条宽度）                       |
| clientHeight | height+pad上+pad下（不包括滚动条宽度）                      |
| clienLeft    | 值即为div的border-left设置的值                              |
| clientTop    | 值即为div的border-top设置的值                               |
| offsetWidth  | width+pad左+pad右+border左+border右（offset包括滚动条宽度） |
| offsetHeight | offsetHeight: height+pad上+pad下+border上+border下          |
| offsetLeft   | border-left外距离HTML文档左部的距离，并不是相对于body       |
| offsetTop    | border-top外距离HTML文档顶部的距离，并不是相对于body        |
| scrollWidth  | 水平滚动的总宽度                                            |
| scrollHeight | 垂直滚动的总高度                                            |
| scrollLeft   | 水平滚动超出div被隐藏部分的高度，不叠加border               |
| scrollTop    | 垂直滚动超出div被隐藏部分的高度，不叠加border               |

![css模型](data:image/gif;base64,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)

![图片描述](data:image/gif;base64,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)

![offsetLeft](data:image/gif;base64,R0lGODlhswEIAaIAAH+lpc/Y1wYGBs40NMyprlCBvkurxv///yH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDUgNzkuMTYzNDk5LCAyMDE4LzA4LzEzLTE2OjQwOjIyICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RTI3N0E5NTBGN0JGMTFFQzk3REZFNUU1ODY0MTgzNjciIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RTI3N0E5NTFGN0JGMTFFQzk3REZFNUU1ODY0MTgzNjciPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpFMjc3QTk0RUY3QkYxMUVDOTdERkU1RTU4NjQxODM2NyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpFMjc3QTk0RkY3QkYxMUVDOTdERkU1RTU4NjQxODM2NyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PgH//v38+/r5+Pf29fTz8vHw7+7t7Ovq6ejn5uXk4+Lh4N/e3dzb2tnY19bV1NPS0dDPzs3My8rJyMfGxcTDwsHAv769vLu6ubi3trW0s7KxsK+urayrqqmop6alpKOioaCfnp2cm5qZmJeWlZSTkpGQj46NjIuKiYiHhoWEg4KBgH9+fXx7enl4d3Z1dHNycXBvbm1sa2ppaGdmZWRjYmFgX15dXFtaWVhXVlVUU1JRUE9OTUxLSklIR0ZFRENCQUA/Pj08Ozo5ODc2NTQzMjEwLy4tLCsqKSgnJiUkIyIhIB8eHRwbGhkYFxYVFBMSERAPDg0MCwoJCAcGBQQDAgEAACH5BAAAAAAALAAAAACzAQgBAAP/eLrc/jDKSau9OOvNu/9gKI5kaZ5oqq5s675wLM90bd94ru987//AoHBILBqPyKRyyWw6n9CodEqtWq/YrHbL7Xq/4LB4TC6bz+j0K8Buu9/wuHxOr9vv+Lx+z+8HCgR+goOEhYaHiIl5EwCKjo+QkYoHbgUCAmyBBJucnZ6foKGio6SlpqeoqaqrrK2nAQQAEwFqY5YCtbknshK0ul4BlwIFv8UgvBG+xlrCl8rL0BbIEM/RVATNw9bbjLPcVdnO3+MM0w/m5EwA4Zfp5OgN8O5I4bfy87/3Cvr4QsLrzoRV65evG8Ek4m5RusTvoBl+DR3y0HZAYUUBBCQWg6hR/4lFSh0LSogYcsfHkro4oixycqUalS6FtIx5ht9Amjxm4iRjcycQnT7D9AzaAyhRL0OP6jB6YcCAjAScZtwAR6mKpFZvMK0QNdABqR2cinWaddeEqWVtbKUQdcHTDAEGLGADNq0JfmjtzljLgJOvqFIBT4WVl7CvuHUPtO27iQEtWDf1OsArmQZfBYDBjt0MS+zgsVDHLlisYDPmzXkrTz6rWsbluFOd0or6mOzXt7GfAj6dl7RsxW8RU7LderWE1MVXXKatADZwt1MFnzY9vIFvtGTj+iKefAHl7i2WDziMW25ptNIzi20+vq/5r9jlai/9HvyB7/ZVvH77vD/85v+bBBYYWs6N9p5tzhXIHXj45YfCZbd5dhp00/GnXnzvkaaeeRsil1yDDpoAoWKbKAPLXMpwwliJc3kFoGMq8hajgyCGSMKIO8xn4z6s7ShiO0rouGONPoKAY45F3tdjkiIcyaQORD65gZNS3hBllRhQiSUNV24ZAVofEeNlEF2O6QCQwijAkJk/lMnmAmsqhA1Gb/bgZp1z/hEQRXXucGed7FziYZ81/PlmMPUQyoOhb97STGSKzsAom4gKI2akOUzKpqO4YArlkp4+IMygocagKZsAlZopqKoyUACkrbpwaqy0XsVqEpLkqqsegezq669xUJBrEbPm8EcByCar7LL/zDbr7LPQRivttNRWa+212Gar7bbS6hMAAOCGK+645JZLLqx+3noEAAUY4O678MYr77z01mvvvfjmq+++/Pbr778AB3xvAd6CG4u5CCccLrqfHtcEAe0KLPHEFFds8cUYZzwvwRcgKgvDUhSLA7sal2zyySinrDK8HFswZ6dIqWsEySvXnDIb9OJs884nt1zBo1+IbGXEPBcdMCUBuMsL0fDqLIfRUPfr81nNXMqF0DbQHPXW+T5mgIlIv8sLAF+zqyzXaNs7tQThkFoF1oUynfbc77JBNtiUuPtMI2zMRTbdgK8NAadpdgE3l3IDrvjXCryaN+PetYHi4nMLLio7/yQ9cbikiVNutBvvvpq013rvU7bjf3ietuUNEN6M4TIT27nqPPNdd9J6N93cq5A/TnvUrM9lqaCIWo3F5jJo/XvUuH/d/AFil/OtAQssv3Xwajrj8UUwZ4G8qbNbXzPuOrsLvdJwsPtY+OKjjP1FGSEaP5BafA+D8u3vTH7zjdTtPNlII13+dva+BggKDPZ7Af4GuLLRka8Rf7ud+RpQPgamrIAMOGDQYkeEBVrwZHxrXtnkpTNKhPCDNcMgnOi0QYepg30otBgEp6e0cMWLDe2yWxtiqDIVZs9tVkigrGDIw4lNL4RwaNofQji5IpbMhwfQYMxcuAQPzkthWMyiFv+3yMUuYtFu4mqDF8dIxjJi0V9QlCLsqKgEK94QWHCMoxznGEF9pZGFU/xSE9woNpDVahZSy1wU8bhGPb4QX4344wdEmK87AvFtHBwCH9GnSA8wEl+ORGAkhTBJAyQSGHDxYxguOTBBqvFqmyQTET/Zhe49IDX0i0csZvMJQQYpkBg45RaE2IJOspILrnRAMDIYzIXQQgCp+gIp1WZKQqKSjUnwpSg9Mgxk/cOaxoti425hTcd0ahiYAMMy65XJFhqyiqucJkJgFgxlxPJyajLRN7FhyyeMk17lzCMEHqlKRKqTHuzs3jvP9M29HZAh1iwmFe65sWbycwq8ZIE0s0D/P2ygpaJzyuBUwumqb14KG1tgqLzyWch97jGdFIVZ4QZ5pgVYAk7VeGkUP6rQKYg0XiR95jnbiFIsAGmY2mSpAWEKJ8fo6ZjIAKkWbsoyh2oSmkiYqE9xAdR4DrRTMo3nXCzijIwMtApMDZ1TzWnSQ97rl+DAiCtjcVU1edMxXK3pFcLqrpzuMpVAkOoVvpq9M62DmBS8xTH/6QS6GsCu9cNrm3q615q+cy0rdWZIcXkBXSYWqutirBX4RNAM0rITmbgHQwDQiaVS1gKW9Z5ifaDXzWZzH3KNhmERq1rMzkyzlYTLaX8m2cvuNJq4zW3HdkuB1B5vtXYKrnArMNux/+rzlSf153I10Nxc9ra2v42qcqfbC+JOwLhXiOgKWstdYXmXbdc9rm1lJ93yWqC6lU1veJG7qO26V5jnjQB4g0hfP9n3vo7JLwT2C8n1dvC/ADYdv2ir3uxmtr0K5JaEJ0zhCjMreQK+3END1l8oIVhEFg6xiEcsLcJ6oI6NdG5Joeuyw2z4A405x4dLQOIa25jEJu4AijGpYp1SwwJgQUyOYzyLBXlnxje6sZKXvK0cc2DHpbTui6HwJwvVx2UM4M9ZMhQPJI+AyWAO87ScvAEoM1PKT3WwMPljZAq05zwVQNCb9+HlJon5znhOFpk1YGZy9viuUM1Mhaizm7kkRv80/2nAeuizGeKQlwV5jrSY95yBPuPzz74tq4ECZJ4BBVlCwwG1dBLtFkQLuTMuuk+dQyDpVi+Z0hiwdEPRTFYWU2g48cvQZ4js6e1gpzACig52ugxhF7j62DWG9QVkPVJMY1fTpVEGmw1U6uA02te3HrSFhl2OVRsJ2eC2sLKlkWGCTllzrNLym3Xdot8MKMu/do9u0IOdvXn7A+HO94THXQFm49TZDf5xlnWj7tF8ZtHqcU90gsNoddNbGY9Wjr4nni1+U8DfTaX1c4XpAESXxuDVTpHHC53wUD/lLwRy9L09QPGWW8vijCi3AeXL315E96wwl4DLd15iU8mcmOf/dgJWgFvs8Ez8a9MCF8VzHgGMi1XjZxE20zWQ6gm8ti83txdaIT3xRjiLtIbZB2FIe+ypn+PnK+TnbhAT9Am1qBdu07LVO5yplXcA2WC3G2bcYDaQld3nCwb4wE+jTl7XhzQPiIsE5P6i1tF9ZHbnAN6FhazHgLEqf78f2n/IFtsgnrnE4c7nM8B44MT08UMrOtdd/bFAJLIRsaBE5StvNtq/Ctlmn8zmB5mazOS60eXRMmLWLZbZzJk4w5d2td39FM97vCKoz1rkp3Tsj+lZ1Rw7FrK8Ljrb4x7w+yKpYJjffM8M3zzn73RdNiRnU3OIOp7JDqgbFztE3YCz3Va9/8RZL3uC0aL236Isx/It3Kd9rpZ78bB7ahR6sbFw7HFy9MEJbIYhEqh+Ephr9IFq9LGB/uEdMuMo97cmxIZzMTB5A4g0fVd7emY23AduCFgOCkhI6iYfb6YhddFoDUhtOoiD1QEci5ZoizF6Q3cfloIDlUJIEacf1dd/+1CAKrg711cR36d5gQd1DDgcf3F45Kcb2SZ66hcYtcFoeWFlblcO3jAaVWMSQKNq+qeE/PcHAbh9cNh3JiI5zWGAkfaC3hGDY0hw7aEji3F+oREYpZYb7jFoDngbLAJn/dEVe3OGRygQvTJHkFEPNESCMGCCcahndkN7h2GHBJh5CsSHiv8GaoB4IImhHlnYHl5oIMWHhT54g4kYIWbYC3oSKLiYi7q4i7xYNW2YAiaogtsXPwKIfdvXf6IoK6R4BAJyZf1mdbfYi9I4jdToi5j4Aib4dcjoOOSyja2mhwoWfoLXA+nnjBc3d4qRDf5HiW8AEFWDLL/4IEuIh5W3PlEoTC4IfnY0jj1QcpWGjiaUDToQiVMBj9dobPPoLJtYeQEkOfSYh/qYYlDHBVfnUoHVDG03Au6ITK4yfRrAc9VCWsIoaeB4H8voBRXJI8L0OjVQKY7TkfF4AiA5k8xSkk5XV/xIBSmpJBCQTDQgPzIWkyBGk0RpkyfZBTtZT/4llDRGlEX/GZE8NpFbkJRNYJBaV5JO+ZRUKI5SqQVUaVZXWYJZOZNGWYXxlZFL8JXoxJRJNpY8V5ZceZZgoJY8xZZf5pZvCZVRJpdfQJdEd5BGh5cuB5f72JVZ4JfaZZd2JpgtR5gSyZcoaRBrCZirx5gT55hRCZlIKZl1SZn7Z5n6hpl7iVo0VwWI+WCe6YagmW+ieWaaSZGc+ZdhmYmrGZp66ZqkiZYeEZuJmZrAWJuseZt+ZphYcJq3pZisBpzh1prD+ZpTyZuoOZsJ1nRHCZsjkXX1snXTCYNmmZtzCZ3H6ZvbeZOHlZNTYJzsJZ7TSZ4MdgXoeWDIOV3saZ5S8J6S5JG1/zKfxOme4Jme0rmdutedvKWbSWCfnISftKKfzumV/Qmf6plgCuqdfdmg9xmfyxWhA/qd1wmW2VmSY4KhxVWaOkmhB2qhwgWi3yWi50mi/fSgAIai6EWgSGCgLfqfAMqdcSmhkbmhk2mjNxqOhbmgh8mieYWgsQKj+qWi9Umki2WiuYWkA6akUUCjReqklQSlGqahTYed9KKdN4ql5qalPcmlV+ShXgKmMyejR0ClTeqi94WmQCem50Cm8uKlAAqnaSenxtGjHfqjAZqjGTqhPNqZPvqjeMp5grqlHNqlZrolh8p7ehoPdBovdrqd8KWjmzmostmnfhpgAhqiamoEbP/KWkbaKpcaqDuqqHxaL31zh+z4qrAaq3lQnc+pqb15VkhkRrq6q7zaq776q8AKLrTKoLYanU50rMgapJhqnapKqMn6rND6b/tpBaOaXNF6rdf6Pn+Qp4qxk1PKpKSKreKarO9TOAdkf7XarJs6ruz6Qe8DEF5FJys1pMUanu16rwxUQMNTTSJIrOp6q/gasNZTQC8TDpn6r8YqsArrORgUKKEqE+BaFES0sBQLNRhUsJfgrUtarywxsRX7sTajQoTTqK4RsfUFsiiLNip0hErJBNV6sikbs0bjQ45CsiXLsQemnDq7s93yXsdSqaZpsjsQCzxbtEY7jL0wLpzQqzb/ewEvmwOL2KkuELV+E6ziwhJCiwPMIbVTO2cURBgHUyJuILaLgLU4GwRby7UskLa58LRaW3pqewJsWwtuewNdEbdr67V0m7V2C7d4SwJzqwZ1awN3+7cpELhpMLg1ULiGK7d6K7h8S7h+27gggLhooLg0wLiUC7iPm7iRu7iTu7kdYLlngLkzoLmiGwKkawamKwOom7ow1rmX+7mZG7oQA7uyhy6rWwatGwOv2xz/ALtF+CWyW7q0e7pwyylNeyhp+ErFy7rH67qMt5Eaq7YE6QC7Swa9CwOMG4lQJLXskg3PkL22EL2++4fVmL7qu77s277u+77wG7/S+FHPy7vm/8u94xGJ8ru//Nu//vu/AKy+YkK+YrC9L7C1G5mxR7vAIIk5BrK8P2DAXUsgnFK9cRuNwzC+9au993vAjFewLwm7IIwcBBwGEtwCr/stayi6GzkoJRyptZgElnuLLZtg/wApL5yoY6oEq3sisAsZWwbBPnDCeSvE7pXDqbrDMrzBuOsyTFzAHdy1RlxeSHywSowEVdzE2PvEJhzFKMzFWky8U2wSXlzEYRy7Y7wUZbwCWXzGhFcMRMzGYOzG1jHHSTynPBy6dHwcdmzFeLzED/sDdfiTkZHGbxvIG4uwRNDGRbAeo0ZdhdEbmPEAbTZ6aMDI9KrIQ4DJQlC4v4EB6P9xfBmSv4+LICL3C5zMn2cLBEJiBVvbZr3wZgVSaKRGybMIy2ZAtXu7yjgxauznfJEcY8OXgz5IzPTWfIPYHl3xu/cVx9ywIbHIGb73gJ+GcF/YadtRG6ARIcH3igDqzNtgZca3HRboIr2Ga5vWFWThG+PsgxyoiOj8zWu8DUJibaVGzdTszV4rFZ1WaPNxhaR2HTcKzrIly/b8zsNncnVRIA0nhuxBCwCtZQItz7wcE7LRGWXoeZwG0fMGb/KWGwZtfIP4xreRbdNJ0NFwIRn9fgtNHbQ4HatoaOQsamAx0duJ0rJlh82BIihSDTp9h0YV1HMh1ESNNxStyXtcKzhWndQhstRMnR9O/dTgEdVSnRxUXdWtcdVYXRlavdV60dVenRZgHdZZMdZkfRTbOhJWu9Zs3dZu/dZwHddyPdd07atnfdd4ndd6vdd83dd+/deAHdgokQAAOw==)

> scrollLeft 和 scrollTop 同理，就是左边滚动条超出的部分

#### 常用方法

| 方法                   | 描述                                         |
| ---------------------- | -------------------------------------------- |
| createElement          | 创建一个节点                                 |
| createTextNode         | 创建一个文本节点                             |
| createAttribute        | 创建一个属性节点                             |
| append                 | 向节点内添加一个或多个节点                   |
| appendChild            | 向节点内添加一个节点                         |
| insertBefore           | 向节点内指定元素位置前添加一个节点           |
| replaceChild           | 向节点内容替换指定节点                       |
| removeChild            | 删除指定节点                                 |
| cloneNode              | 克隆一个节点，参数为true时会包括所有的子元素 |
| getElementsByClassName | 根据类名获取一个元素                         |
| getElementsByTagName   | 根据标签名获取一个元素                       |
| querySelector          | 使用css表达式获取一个元素                    |
| querySelectorAll       | 使用css表达式获取元素集合                    |
| getAttributeNode       | 获取属性节点                                 |
| setAttribute           | 写入属性                                     |

> getElementByID 只用在 **document** 上

## DOM事件

> HTML 事件可以是浏览器行为，也可以是用户行为。
>
> 以下是 HTML 事件的实例：
>
> - HTML 页面完成加载
> - HTML input 字段改变时
> - HTML 按钮被点击
>
> 通常，当事件发生时，你可以做些事情。<br>在事件触发时 JavaScript 可以执行一些代码。<br>HTML 元素中可以添加事件属性，使用 JavaScript 代码来添加 HTML 元素。
>

### 事件绑定

> * 行内绑定
>
>   行内绑定是在js区域定义事件方法，在html标签里面绑定事件方法
>
> * 直接绑定
>
>   直接绑定是所有操作在js区域里面，在js里面获取标签并绑定事件方法
>
> * 事件监听
>
>   事件监听则是在js里向html添加监听器来监控触发事件方法
>
> 三种绑定方法的区别是，第一种需要在html标签里进行绑定操作，第二种则是全部操作在于js区域，第三种事件监听的特性是可以绑定多个事件，而上面两种只能绑定一个事件，若再绑定事件则会覆盖

| 格式                                                        | 描述                   |
| ----------------------------------------------------------- | ---------------------- |
| onclick = " fn(event) "                                     | 通过标签内绑定事件方法 |
| selector.onclick = fn(event){……}                            | js直接绑定             |
| selector.addEventListener(event,function(event),useCapture) | 添加事件监听           |
| selector.attachEvent(event,function(event),useCapture)      | 添加事件监听（IE）     |
| selector.removeEventListener(event,handler)                 | 删除事件               |

```html
<div id="box" onclick="show()">div #box</div>
//传递event对象和参数
<div id="box" onclick="show(event,'小明')">div #box</div>
```

```js
function show() {
    alert("你好！")
}
//接受event对象和传值
function show(event, name) {
    alert("你好" + name)
    console.log(event)
}

//直接绑定
box.onclick = function(event) {
    console.log(event);
}

//事件监听
box.addEventListener("click", function(event) {
    console.log(event);
})
//addEventListener拆开写法 
box.addEventListener("click", show)
function show(event) {
    console.log(event);
}
//addEventListener添加多个事件
var box = document.getElementById("box")
box.addEventListener("click", function() {
    console.log("fn1");
})
box.addEventListener("dblclick", function() {
    console.log("fn2");
})
box.addEventListener("mouseover", function() {
    console.log("fn3");
})
```

> DOM标签可以传入 **this** 表示自身元素 `<div onclick="show(this)">content</div>`
>
> 也可以直接在标签内执行js语句 `<div onclick="alert('尚好')">content</div>`
>
> 使用事件监听 `addEventListener` 绑定事件写事件类型时不用在前面写 **on** 
>
> `attachEvent` 是适用于低版本IE的方法，在 `attachEvent` 写事件类型时是需要 **on** 的，使用attachEvent() 绑定多个事件的时候，和 addEventListener()以相反的顺序触发其余和 `addEventListener` 没有什么区别
>
> 也就是`addEventListener`会先执行最先绑定的而`attachEvent`则是先执行最后绑定的事件
>
> `addEventListener` 的第三个属性为设置是否捕获
>
> **true**--事件句柄在捕获阶段执行，**false**--事件句柄在冒泡阶段执行（false- 默认）

**关于添加事件监听器的兼容写法**

```js
// 兼容大部分浏览器
var x = document.getElementById("myBtn");
if (x.addEventListener) { // 所有主流浏览器，除了 IE 8 及更早版本
    x.addEventListener("click", myFunction);
} else if (x.attachEvent) { // IE 8 及更早版本
    x.attachEvent("onclick", myFunction);
}
```

**封装兼容方法**

```js
var Event = {};
Event.addEvents = function (target, eventType, handle) {
  if (document.addEventListener) {
    Event.addEvents = function (target, eventType, handle) {
      target.addEventListener(eventType, handle, false);
    };
  } else {
    Event.addEvents = function (target, eventType, handle) {
      target.attachEvent("on" + eventType, function () {
        handle.call(target, arguments);  // 方法指向标签对象
      });
    };
  }
  Event.addEvents(target, eventType, handle);
};

// 使用方法
Event.addEvents(document.getElementById("box"),"click",function(){
  // 要执行的代码
  console.log(this);
});
```

> 关于 `addEventListener()` 的第三个参数的补充
>
> DOM 规范做了修订：addEventListener() 的第三个参数可以是个对象值了，也就是说第三个参数现在可以是两种类型的值了：
>
> * `addEventListener(type, listener[, useCapture ])`
> * `addEventListener(type, listener[, options ])`
>
> 目前规范中 options 对象可用的属性有三个：

```js
addEventListener(type, listener, {
    capture: false,  // 是否为捕获
    passive: false,  // 告诉浏览器是否阻止默认行为
    once: false      // 方法执行一次后消亡
})
```

1. `capture`

   与原先 **useCapeture** 相同为是否使用捕获。

2. `passive`

   告诉浏览器该监听函数是否会使用 `preventDefault()` 方法，以此来提升浏览器加载速度

3. `once`

   设置该事件为一次性事件，即只执行一次后就删除，不会再执行第二次

> passive 默认false 
>
> passive 选项设为 true 即可告知浏览器该JS代码不会阻止默认行为即不会使用 `preventDefault()`

```html
<style>
  .two {
    width: 100px;
    height: 200px;
    border: 1px solid #000;
    overflow: scroll;
  }
</style>
<div class="two" target="_blank">
这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本
</div>
<script>
var two = document.querySelector(".two")

two.addEventListener("wheel", function (e) {
  let i = 1;
  while (i++ < 10000) {
    console.log("object");
  }
}, {
  capture: false,
  once: false,
  passive: false
})
```

> 这默认行为就是页面下滑，虽然没有阻止默认行为，但是页面就是下不去了。因为浏览器无法预先知道一个监听器是否调用了**preventDefault()**，它需要等待监听器执行完后，再去执行默认行为，而监听器中函数执行是需要时间的，这个执行时间就是它等待的时间（就算是空函数也会有执行时间）。这样就导致页面下滑有卡顿。
>
> 之所以页面卡顿是因为绘制线程在等待主线程执行完成
>
> **为什么绘制线程要等待主线程 ？**
>
> 事件回调函数中可能存在 `event.preventDefault()` 语句，这个语句的执行是会影响绘制线程的执行的，所以要等待回调执行结束，才能知道回调函数中是不是有event.preventDefault()
>
> 设置 `passive: true` 浏览器就知道不会执行 **preventDefault()**，绘制线程不用等待主线程了，它们可以并行执行，回调函数中的 **event.preventDefault()** 不再起作用，如果有，执行到这句时，浏览器会给出警告；这个属性需要浏览器兼容
>
> 这属性尤其 **移动端** 很需要注意，遇到监听器有大量内容并且不会禁止默认行为时最好加上：<br> `passive: true`

### 移除事件

| 格式                                        | 描述           |
| ------------------------------------------- | -------------- |
| selector.removeEventListener(event,handler) | 删除事件       |
| detachEvent(event,handler)                  | 删除事件（IE） |

```js
function show() {   //执行方法
    console.log("fn");
}

box.addEventListener("click", show)   //绑定事件
setTimeout(function() {    //计时器
    box.removeEventListener("click", show)   //删除事件
}, 5000)
```

> `detachEvent` 和 `removeEventListener` 的作用一样

### 冒泡&捕获

> 冒泡和捕获是指在元素上的事件被触发的时候，js 传递事件的两种方向，或者说过程。
>
> 在多个元素区域重叠在一起时，各自有事件绑定时，就能体现出冒泡和捕获
>
> 冒泡是往上执行，捕获是往下执行
>
> `element.addEventListener(event, function, useCapture)`第三个参数是冒泡或者捕获
>
> **true**--事件句柄在**捕获**阶段执行，**false**--事件句柄在**冒泡**阶段执行（false- 默认）

![图片描述](data:image/gif;base64,R0lGODlhbwH8AMQAALOzs8rKyqurq////8LCwru7u5ubm6Ojo1tbW1JSUmRkZIuLi3t7e2tra5OTk4ODgwEBAXNzc0hISN3d3enp6eLi4tnZ2eXl5dHR0dXV1f7+/gAAAAAAAAAAAAAAAAAAACH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4zLWMwMTEgNjYuMTQ1NjYxLCAyMDEyLzAyLzA2LTE0OjU2OjI3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoxODk1RkRDRTBDQkUxMUVDOUE0QkI4REFDRTFFRTYyNiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoxODk1RkRDRjBDQkUxMUVDOUE0QkI4REFDRTFFRTYyNiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjE4OTVGRENDMENCRTExRUM5QTRCQjhEQUNFMUVFNjI2IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjE4OTVGRENEMENCRTExRUM5QTRCQjhEQUNFMUVFNjI2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJy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)

```html
<style>
  div {
    border: 1px solid #000;
  }
  .one {
    width: 350px;
    height: 350px;
    background-color: aqua;
  }
  .two {
    width: 300px;
    height: 300px;
    background-color: pink;
  }
  .three {
    width: 250px;
    height: 250px;
    background-color: royalblue;
  }
</style>

<div class="one">one
  <div class="two">two
    <div class="three">three</div>
  </div>
</div>

<script>
  var one = document.querySelector(".one")
  var two = document.querySelector(".two")
  var three = document.querySelector(".three")

  one.addEventListener("click", function () {
    console.log("one冒泡");
  }, false)
  two.addEventListener("click", function () {
    console.log("two冒泡");
  }, false)
  three.addEventListener("click", function () {
    console.log("three冒泡");
  }, false)

  one.addEventListener("click", function () {
    console.log("one捕获");
  }, true)
  two.addEventListener("click", function () {
    console.log("two捕获");
  }, true)
  three.addEventListener("click", function () {
    console.log("three捕获");
  }, true)
</script>
```

> 1. 当三个div都是 **捕获** 时点击 three元素；执行顺序 one捕获→two捕获→three捕获
> 2. 当三个div都是 **冒泡** 时点击 three元素；执行顺序 three捕获→two捕获→one捕获
>
> 当是 **冒泡** 时点击里面的元素；他会先执行里面元素的事件，然后再执行外面元素事件；**捕获** 则反之，会先执行外面的元素事件，然后再执行到里面自己的事件
>
> 上面讲的都是全部统一设置的清空下，如果只有一个元素是 **捕获** 别的都是是 **冒泡 (默认)**，捕获的元素会 **优先** 执行事件，也就是当那个元素设置 **useCapeture** 为 **true** 时，别的元素都为默认是，设置 **usecapeture** 为 **true** 的元素优先执行事件（会先捕获他那个事件）
>
> **先捕获，后冒泡**

**来个例子**

```js
var one = document.querySelector(".one")
var two = document.querySelector(".two")
var three = document.querySelector(".three")

one.addEventListener("click", function () {
  console.log("one事件");
}, false)

two.addEventListener("click", function () {
  console.log("two事件");
}, true)  // two设置为捕获

three.addEventListener("click", function () {
  console.log("three事件");
}, false)
```

> 执行顺序是 tow事件  -->  three事件  -->  one事件

### 事件委托

> 事件委托：<br>利用事件冒泡的特性，将本应该注册在子元素上的处理事件注册在**父**元素上，这样点击子元素时发现其本身没有相应事件就到**父**元素上寻找作出相应。
>
> 这样做的优势有：
>
> 1. 减少DOM操作，提高性能。
> 2. 随时可以添加子元素，添加的子元素会自动有相应的处理事件。

```js
var list = document.querySelector("ul")
list.onclick = function() {
    console.log("open");
}
```

> 若需要根据子元素类型而是否执行事件，或者执行对应事件；可以使用事件的event对象来判断

```js
var list = document.querySelector("ul")
list.onclick = function(event) {   // 传入event对象
    console.log(event.target);     // event对象的target属性可以查看触发事件的元素
    console.log(event.target.nodeName);  // 查看触发事件的元素标签名
}
```

示例：

```js
var list = document.querySelector("ul")
list.onclick = function(event) {
    console.log("触发事件");  //每次都执行的语句
    if (event.target.nodeName.toLocaleLowerCase() === "li") {  //判断是否为li标签
        console.log("li标签触发事件");
    } else if (event.target.nodeName.toLocaleLowerCase() == "div") { //判断是否为div标签
        console.log("div标签触发事件");
    } else {
        console.log("其他标签触发事件");
    }
}
```

> 使用 `event.target` 并非 `event.currentTarget` ，currentTarget 获取的是定义事件的元素（即`ul	`）

### Event对象

> 什么是事件对象？
>
> 就是当你触发了一个事件以后，对该事件的一些描述信息
>
> 例如：
>
> * 你触发一个点击事件的时候，你点在哪个位置了，坐标是多少
> * 你触发一个键盘事件的时候，你按的是哪个按钮
>
> 每一个事件都会有一个对应的对象来描述这些信息，我们就把这个对象叫做“事件对象”
>
> 事件对象关键字 **event**
>
> 在 IE/Opera 中，用 **window.event** 写法
>
> event对象有两种方式接受
>
> * 在DOM标签内绑定的事件通过关键字 **event** 关键字传递
> * 直接绑定事件在事件处触发函数通过形参接受
>
> Event 对象是一个event对象的主对象，在他下面有很多细分event对象，例如：MouseEvent、PointerEvent 、KeyboardEvent、FocusEvent 、AnimationEvent等等，这里就只记一些常用属性和方法。

```html
<div id="box" onclick="show(event)">div #box</div>   //传入参数event
<script>
    var box = document.getElementById("box")
    function show(e) {   //接受event对象
        console.log(e);
    }
</script>
```

>  直接绑定和事件监听绑定的事件都是通过事件方法形参进行接受event对象
>
> 直接绑定事件获取event对象：

```js
var box = document.getElementById("box")
box.onclick = function(e) {   //第一个参数则是event对象
    console.log(e);
}
//事件监听器
box.addEventListener("click", function(e) {   //参数e是event对象
    console.log(e);
})
```

> 需要注意的是通过DOM绑定的事件必须在DOM标签内向方法传入event对象
>
> `<div id="box" onclick="show(event)">content</div>`

**event常用属性和方法**

| 属性/方法                     | 描述                                                         |
| ----------------------------- | ------------------------------------------------------------ |
| type                          | 事件类型                                                     |
| button                        | 检查按下的鼠标键可能的值：**0**没按键；**1**按左键；**2**按右键；**3**按左右键；**4**按中间键；**5**按左键和中间键；**6**按右键和中间键；**7**按所有的键；这个属性仅用于**onmousedown**, **onmouseup**, 和 **onmousemove** 事件。对其他事件，不管鼠标状态如何，都返回 0（比如onclick） |
| altKey                        | 检查alt键的状态，若按了则为true反之false                     |
| ctrlKey                       | 检查ctrl键的状态，若按了则为true反之false                    |
| shiftKey                      | 返回当事件被触发时，”SHIFT” 键是否被按下。                   |
| keyCode                       | 对于 keypress 事件，该属性声明了被敲击的键生成的 Unicode 字符码。对于 keydown 和 keyup |
| key                           | 按下了哪个按键不同于 keyCode 这个则是字符串结果              |
| metaKey                       | 返回当事件被触发时，"meta" 键是否被按下；这个按键在windows是win键MAC是Cmd键；**1**为按下 |
| stopPropagation()             | 阻止冒泡                                                     |
| preventDefault()、returnValue | 阻止默认事件，这个方法和这个属性都是一样的作用，只是兼容不同浏览器，returnValue需要把他设置为 false |
| stopImmediatePropagation()    | 阻止后面的所有事件，在使用事件监听器添加多个事件的情况下使用 |
| target、srcElement            | 返回触发事件的目标元素，只是兼容不同；IE下,event对象有srcElement属性,但是没有target属性;Firefox下,event对象有target属性,但是没有srcElement属性.但他们的作用是相当的 |
| currentTarget                 | 事件属性返回其事件侦听器触发了该事件的元素；跟target的区别是，如果使用了事件委托，currentTarget返回的是绑定事件委托的那个元素 |
| eventPhase                    | 事件传导至【当前节点】时处于什么的状态。<br/>1.事件处于捕获状态<br/>2.事件处于真正的触发者<br/>3.事件处于冒泡状态 |

| event的坐标属性 | 描述                                                         |
| --------------- | ------------------------------------------------------------ |
| screenX         | 得到鼠标指针坐标相对于电脑屏幕 x 坐标位置                    |
| screenY         | 得到鼠标指针坐标相对于电脑屏幕 x 坐标位置                    |
| offsetX         | 得到鼠标指针坐标相对于触发事件的对象的 x 坐标（不包含 border） |
| offsetY         | 得到鼠标指针坐标相对于触发事件的对象的 y 坐标（不包含 border） |
| clientX         | 得到鼠标指针坐标相对于浏览器窗口区域的 x 坐标（不包含滚动条） |
| clientY         | 得到鼠标指针坐标相对于浏览器窗口区域的 y 坐标（不包含滚动条） |
| pageX           | 得到鼠标指针坐标相对于浏览器窗口区域的 y 坐标（包含滚动条）  |
| pageY           | 得到鼠标指针坐标相对于浏览器窗口区域的 y 坐标（包含滚动条）  |

![图片描述](data:image/gif;base64,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)

> page和client一样，不过是把滚动距离算进去了，也就是向下滚动100px的话client就要减100px，而page始终是对齐整个文档边缘（包括滚动距离）

**各种兼容写法**

> event兼容写法

```js
box.onclick = function(event){
	event = event || window.event;     
}
```

> returnValue和preventDefault()兼容写法；阻止默认事件

```js
box.oncontextmenu = function(ev){
　　event = ev || window.event;
　　if (event.preventDefault) {
　　　　event.preventDefault();
　　}else{
　　　　// IE中阻止默认事件
　　　　event.returnValue = false;
　　}
　　alert('禁止使用鼠标右键');
}
```

> target和srcElement兼容写法

```js
element = evt.srcElement || evt.target;
```

### 常用事件

| 事件名称     | 描述                                                         |
| ------------ | ------------------------------------------------------------ |
| onload       | 页面或图片加载完成时；通常使用于\<body> 或者\<img>元素中     |
| onchange     | 框内容改变时                                                 |
| onsubmit     | 点击提交按钮时                                               |
| onreset      | 事件在表单被重置后触发                                       |
| onselect     | 文本被选择时                                                 |
| onblur       | 元素失去焦点时                                               |
| onfocus      | 当元素获取焦点时                                             |
| onkeydown    | 按下键盘按键时                                               |
| onkeypress   | 按下或按住键盘按键时（alt , ctrl ,shift 等键不会触发，中文输入法不会触发） |
| onkeyup      | 放开键盘按键时                                               |
| onclick      | 鼠标点击一个对象时                                           |
| ondblclick   | 鼠标双击一个对象时                                           |
| onmousedown  | 鼠标被按下时                                                 |
| onmousemove  | 鼠标被移动时                                                 |
| onmouseenter | 鼠标进入元素时（进入子元素时不会触发）                       |
| onmouseout   | 鼠标离开元素时                                               |
| onmouseover  | 鼠标进入元素时                                               |
| onmouseleave | 鼠标移出元素时（进入子元素时不会触发）                       |
| onmouseup    | 释放鼠标按键时                                               |
| onresize     | 当窗口或框架被重新定义尺寸时                                 |
| onabort      | 图片下载被打断时                                             |
| onerror      | 当加载文档或图片时发生错误时                                 |
| onscroll     | 当元素滚动条被滚动时                                         |
| oninput      | 代替keyup、keydown（表单输入字符时）                         |
| touchstart   | 触摸开始（手指放在触摸屏上）                                 |
| touchmove    | 拖动（手指在触摸屏上移动）                                   |
| touchend     | 触摸结束（手指从触摸屏上移开）                               |
| touchenter   | 移动的手指进入一个dom元素                                    |
| touchleave   | 移动的手指离开一个dom元素                                    |
| touchcancel  | 拖动中断时候触发                                             |

> compositionstart 和 compositionend 用以监听中文输入法

## Location

> Location 对象包含有关当前 **URL** 的信息。
>
> Location 对象是 Window 对象的一个部分，可通过 window.location 属性来访问。

![href-name](data:image/gif;base64,R0lGODlh6ANGAaIAAMbR6R2l/+Q4B965aM4OzkKMIgAAAP///yH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDUgNzkuMTYzNDk5LCAyMDE4LzA4LzEzLTE2OjQwOjIyICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QUZCQUUyMkE1NUUyMTFFRDk2RDdBODc2Q0Q0QjAzNkEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QUZCQUUyMkI1NUUyMTFFRDk2RDdBODc2Q0Q0QjAzNkEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBRkJBRTIyODU1RTIxMUVEOTZEN0E4NzZDRDRCMDM2QSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpBRkJBRTIyOTU1RTIxMUVEOTZEN0E4NzZDRDRCMDM2QSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PgH//v38+/r5+Pf29fTz8vHw7+7t7Ovq6ejn5uXk4+Lh4N/e3dzb2tnY19bV1NPS0dDPzs3My8rJyMfGxcTDwsHA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)

| 属性     | 描述                                          |
| -------- | --------------------------------------------- |
| hash     | 设置或返回从井号 (#) 开始的 URL（锚）。       |
| host     | 设置或返回主机名和当前 URL 的端口号。         |
| hostname | 设置或返回当前 URL 的主机名。                 |
| href     | 设置或返回完整的 URL。                        |
| pathname | 设置或返回当前 URL 的路径部分。               |
| port     | 设置或返回当前 URL 的端口号。                 |
| protocol | 设置或返回当前 URL 的协议。                   |
| search   | 设置或返回从问号 (?) 开始的 URL（查询部分）。 |

```js
// hash      http://127.0.0.1:5500/Test.html#aaa
console.log(window.location.hash);    //#aaa
window.location.hash = "back"         //#back 设置hash

//host       http://127.0.0.1:5500/Test.html#aaa
console.log(window.location.host);    //127.0.0.1:5500

//hostname   http://127.0.0.1:5500/Test.html#aaa
console.log(window.location.hostname);//127.0.0.1

//href       http://127.0.0.1:5500/Test.html#aaa
console.log(window.location.href);    //http://127.0.0.1:5500/Test.html#aaa
window.location.href = "http://one.aprp.cn"   //设置跳转

//pathname   http://127.0.0.1:5500/Test.html#aaa
console.log(window.location.pathname); //  /Test.html

//port       http://127.0.0.1:5500/Test.html#aaa
console.log(window.location.port);     //5500

//protocol   http://127.0.0.1:5500/Test.html#aaa
console.log(window.location.protocol); //http:

//search     http://127.0.0.1:5500/Test.html?id=10
console.log(window.location.search);   //?id=10
```

| 方法      | 描述                     |
| --------- | ------------------------ |
| assign()  | 加载新的文档。           |
| reload()  | 重新加载当前文档。       |
| replace() | 用新的文档替换当前文档。 |

```js
//assign()
window.location.assign("http://one.aprp.cn")  //跳转至新的页面

//reload()
window.location.reload()  //相当于刷新当前页面

//replace()
window.location.replace("http://one.aprp.cn")  //不会生成新的历史记录
```

> `assign()` 方法就等同于 `href` 属性；`reload()` 相当于刷新页面，不会清除历史记录；
>
> `window.location.assign(url)`，`window.location.href="url"`
>
> `replace()` 则是加载一个新的文档替换当前文档，会清除历史记录

## History

> 上面的 Location 对象是对 URL 的操作，而这个 History 则是用于记录和修改用户访问过的 URL。

| 属性   | 描述                    |
| ------ | ----------------------- |
| length | 历史记录列表的 URL 数量 |

```js
//length
console.log(window.history.length);  //number类型
```

| 方法            | 描述                                                |
| --------------- | --------------------------------------------------- |
| back()          | 加载 history 列表中的前一个 URL。（回退）           |
| forward()       | 加载 history 列表中的下一个 URL。（前进）           |
| go(number\|URL) | 加载 history 列表中的某个具体页面。（跳转指定位置） |

```js
//back
window.history.back()
//forward
window.history.forward()
//go
window.history.go(1)  //前进一步
window.history.go(-1) //后退一步
```

> go('URL');非标准的功能，并不会兼容所有的浏览器

## Navigator

> Navigator 对象包含有关浏览器的信息。
>
> 没有应用于 navigator 对象的公开标准，不过所有浏览器都支持该对象。
>
> 各个浏览器支持的属性也不统一

## 异步

> 异步（Asynchronous, async）是与同步（Synchronous, sync）相对的概念。
>
> js 是异步 **非阻塞式** ；执行异步代码是主线程代码不会停止等待

![图片描述](data:image/gif;base64,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)

**回调函数**

> 回调函数就是一个函数，它是在我们启动一个异步任务的时候就告诉它：等你完成了这个任务之后要干什么。这样一来主线程几乎不用关心异步任务的状态了，他自己会善始善终。

```js
function print() {
    document.getElementById("demo").innerHTML="RUNOOB!";
}
setTimeout(print, 3000);
```

### 定时器

> js 定时器有以下两个方法：
>
> - `setInterval()`：按照指定的周期（以毫秒计）来调用函数或计算表达式。方法会不停地调用函数，直到 clearInterval() 被调用或窗口被关闭。
> - `setTimeout()`：在指定的毫秒数后调用函数或计算表达式。

|                                  | 描述                                                         |
| -------------------------------- | ------------------------------------------------------------ |
| setTimeout(code,millisec)        | 倒计时器；倒计时完成后执行代码                               |
| setInterval(code,millisec)       | 循环定时器；一直循环执行代码直到被删除循环定时器             |
| clearInterval(id_of_setinterval) | 用于取消由 setInterval() 设置的 timeout；参数必须是由 setInterval() 返回的 ID 值。 |
| clearTimeout(id_of_setTimeout)   |                                                              |

```js
//setTimeout
setTimeout(function() {
    console.log("计时结束！");
}, 3000);   // 倒计时3秒

//setInterval
setInterval(function() {
    console.log("循环执行中！");
}, 1000);

//clearInterval
var int = setInterval(function() {
    console.log("循环执行中！");
}, 1000);
clearInterval(int);  // 清除setInterval定时器

//clearTimeout
var t;
var c = 0
function foo() {
    c += 1;
    console.log(c);
    t = setTimeout("foo()", 1000);  // 回调继续
}
foo()

document.getElementById("btn").onclick = function() {
    clearTimeout(t);   // 清除倒计时
}
```

> setTimeout 和 setInterval 的代码参数可以是字符串，会解析

```js
setTimeout("console.log('hello')", 2000);
setInterval("console.log('你好')", 2000);
```

> <span style="font-size:18px">**关于 setTimeout 时间设置为 0**</span>
>
> js是单线程的，单线程就意味着，所有任务需要排队，前一个任务结束，才会执行后一个任务。如果前一个任务耗时很长，后一个任务就不得不一直等着。
>
> setTimeout(fn,0)的含义是，那么浏览器便会在合适的时间，将代码插入任务队列，指定某个任务在 **主线程** 最早可得的 **空闲时间** 执行，也就是说，**尽可能早点执行**。它在"任务队列"的 **尾部** 添加一个事件，因此要等到同步任务和"任务队列"现有的事件都处理完，才会得到执行；**并不能保证执行的时间**，是否及时执行取决于 JavaScript 线程是 **拥挤还是空闲**。

```js
setTimeout(function(){
  alert("1")
},0)  // 设置时间为 0
alert("2")
alert("3")
```

> 显示顺序：2 --> 3 --> 1

### 异步 AJAX

> Ajax：即异步 JavaScript 和XML。Ajax是一种用于创建快速动态网页的技术。通过在后台与服务器进行少量数据交换，Ajax可以使网页实现 **局部更新** 。这意味着可以在不重新加载整个网页的情况下；即不在干扰页面主要流程的情况下异步获取而外数据。
>
> **ajax请求的五个步骤**
>
> * 创建XMLHttpRequest对象
> * 注册回调函数
> * 配置请求信息
> * 发送请求
> * 创建回调函数

```js
//创建XMLHttpRequest对象
const xhr = new XMLHttpRequest();
//注册监控回调函数 onreadstatechange 是用于监控响应状态
xhr.onreadystatechange = callback;
//配置请求信息
xhr.open("GET", "http://rap2api.taobao.org/app/mock/284961/test3", true)
//发送请求
xhr.send();
//创建对应的回调函数
function callback() {
    console.log(xhr.readyState);  //输入响应状态
}
```

> XMLHttpRequest对象的属性方法：

| 属性               | 描述                                                         |
| ------------------ | ------------------------------------------------------------ |
| onreadystatechange | 属性定义当 readyState 发生变化时执行的函数                   |
| readyState         | 0: 请求未初始化<br/>1: 服务器连接已建立<br/>2: 请求已接收<br/>3: 正在处理请求<br/>4: 请求已完成且响应已就绪 |
| status             | 200: "OK"--服务器已成功处理了请求<br/>403: "Forbidden"--禁止访问<br/>404: "Page not found"--服务器找不到请求的网页 |
| statusText         | 返回状态文本（例如 "OK" 或 "Not Found"）                     |
| responseText       | 获取字符串形式的响应数据                                     |
| responseXML        | 获取 XML 数据形式的响应数据                                  |
| responseType       | 允许我们手动的设置返回数据的类型。如果我们将它设置为一个空字符串,它将默认的使用"text"类型，如果返回的数据两者不兼容,服务器返回的数据会变为null |
| timeout            | 设置响应时间                                                 |
| ontimeout          | 超时后处理                                                   |
| onerror            | 网络错误处理                                                 |

| 方法                                | 描述                                                         |
| ----------------------------------- | ------------------------------------------------------------ |
| open(method, url, async, user, psw) | method：请求类型 GET 或 POST url：文件位置 async：true（异步）或 false（同步） user：可选的用户名称 psw：可选的密码 |
| send(body)                          | 通过该请求发送的数据，如果不传递信息，可以设置为 null 或者省略。 |
| send(string)                        | 将请求发送到服务器，用于 POST 请求                           |
| setRequestHeader(header,value)      | 向要发送的报头添加标签/值对                                  |
| getAllResponseHeaders()             | 返回头部信息                                                 |
| getResponseHeader(header)           | 返回特定的头部信息                                           |
| abort()                             | 取消当前请求                                                 |
| new XMLHttpRequest()                | 创建新的 XMLHttpRequest 对象                                 |

```js
const xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {  //监控readyState状态
    if (this.readyState == 4 && this.status == 200) {//readyState为4status为200
       //this在这等同xhr
        console.log(this.responseText); //打印响应体
        console.log(this.getAllResponseHeaders()); //打印全部信息头
        console.log(this.getResponseHeader("content-length")); //打印指定信息头
    }
};

xhr.timeout = 2000; //设置响应时间
xhr.ontimeout = function() {} //超时后处理
xhr.onerror = function() {} //网络错误处理

xhttp.open("GET", "ajax_info.txt", true);  //配置请求，true为异步
xhttp.send();    //发送请求


xhr.abort(); //取消发送请求
xhr.responseType = 'json'; //设置响应数据体类型
```

> POST发送请求带参数

```js
//第一个参数为POST
xhr.open("POST", "http://test3", true)
//设置信息头为HTML表单方式application/x-www-form-urlencoded
xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
//设置内容 name 和 psd
xhr.send("name=li&psd=10")
```

> 创建XMLHttpReques对象的兼容封装方法

```js
function createXMLHttpRequest() {
    //对于DOM 2 规范的浏览器   
    if (window.XMLHttpRequest) {
        var objXMLHttp = new XMLHttpRequest();
    }
    //对于Internet Explorer浏览器   
    else {
        //将Internet Explorer内置的所有XMLHTTP ActiveX控制设置成数组   
        var MSXML = ['MSXML2.XMLHTTP.5.0', 'MSXML2.XMLHTTP.4.0',
            'MSXML2.XMLHTTP.3.0', 'MSXML2.XMLHTTP', 'Microsoft.XMLHTTP'
        ];
        //依次对Internet Explorer内置的XMLHTTP控件初始化，尝试创建XMLHttpRequest对象   
        for (var n = 0; n < MSXML.length; n++) {
            try {
                //如果可以正常创建XMLHttpRequest对象，使用break跳出循环   
                var objXMLHttp = new ActiveXObject(MSXML[n]);
                break;
            } catch (e) {}
        }
    }
    //Mozilla某些版本没有readyState属性   
    if (objXMLHttp.readyState == null) {
        //直接设置其readyState为0   
        objXMLHttp.readyState = 0;
        //对于哪些没有readyState属性的浏览器，将load动作与下面的函数关联起来   
        objXMLHttp.addEventListener("load", function() {
            //当从服务器加载数据完成后，将readyState状态设为4   
            objXMLHttp.readyState = 4;
            if (typeof objXMLHttp.onreadystatechange == "function") {
                objXMLHttp.onreadystatechange();
            }
        }, false);
    }
    return objXMLHttp;
}
```

### Promise

> Promise 是异步编程的一种解决方案，比传统的解决方案——回调函数和事件——更合理且更强大。它最早由社区提出并实现，ES6将其写进了语言标准，统一了用法，并原生提供了Promise对象。

* Promise 对象有以下两个特点:

  对象的状态不受外界影响。

  一旦状态改变，就不会再变，任何时候都可以得到这个结果。

1. 对象的状态不受外界影响 （3种状态）
   - Pending状态（进行中）
   - Fulfilled状态（已成功）
   - Rejected状态（已失败）
2. 一旦状态改变就不会再变 （两种状态改变：成功或失败）
   - Pending -> Fulfilled（进行中->成功）
   - Pending -> Rejected（进行中->失败）

> promise创建

```js
var promise = new Promise(function(resolve, reject) {
    // 异步处理
    // 处理结束后、调用resolve 或 reject
});
```

> 需要注意的是promise返回的结果也是 **promise对象** 需要 **then** 或 **catch** 来解析

```js
"use strict";
var promise = new Promise(function (resolve, reject) {
    resolve("success");  // 调用成功使用then响应
    // reject('error');  // 调用失败使用catch响应
})
promise.then(function(res){  // 成功后执行（调用resolve后）
    console.log("成功执行");
    console.log(res);
}).catch(function(err){      // 失败后执行（调用reject后）
    console.log("失败执行");
    console.log(err);
}).finally(function(){       // 总是执行无论成功失败
    console.log('总是执行');
})
```

> 用于请求

```js
"use strict";
axios.get("http://rap2api.taobao.org/app/mock/284961/example/1623217375672")  // axios
  .then(function (res) {
      var { data } = res;
      console.log(res);
      console.log(data);
  }).catch(function (err) {
      console.log(err);
  }).finally(function () {
      console.log("发起请求");
  })
```

> 结果回调：
>
> * `then()`
>
>   会在执行 `resolve(func(res))` 后执行 promise 状态为 **fulfilled(成功)**
>
>   then() 有两个参数第一个为成功回调第二个为失败回调与catch()无差别，一般不会传递第二个参数
>
> * `catch()`
>
>   catch 会在执行 `reject(err)` 方法后调用 promise 状态为 **rejected(失败)**
>
> * `finally()`
>
>   `finally()`会总是执行无论成功或失败
>

**then()的第二个参数：**

```js
var promise = new Promise((resolve, reject) => {
    reject("error")
})

promise.then(function (res) {  // then的第一个参数
    console.log(res);
}, function (err) {  // then 的第二个参数
    console.log("执行了第二个参数");
    console.log(err);
}).catch(err => {
    console.log("执行了catch");
    console.log(err);
})
// 执行了第二个参数 error
```

#### **all()&race()**

> `Promise.all()` 方法和 `Promise.race()` 方法
>
> * `Promise.all()`
>
>   Promise.all 方法用于将多个 Promise 实例，包装成一个新的 Promise 实例，类似并发<br>`var p = Promise.all([p1,p2,p3]);` 
>
>   1. 接受一个数组作为参数，（参数不一定是数组，但是必须具有 **iterator(可遍历)** 接口，且返回的每个成员都是 **Promise** 实例。）
>   2. 只有参数内所有实例的状态都变成 **fulfilled**，p的状态才会变成fulfilled，此时p1、p2、p3的返回值组成一个数组，传递给p的回调函数。也就是所有成功回调才会执行 `then()`。
>   3. 只要参数实例之中有一个被 **rejected**，p的状态就变成 rejected，此时 **第一个被reject** 的实例的返回值，会传递给p的回调函数。
>
> * `Promise.race()`
>
>   Promise.race 方法同样是将多个 Promise 实例，包装成一个新的 Promise 实例。上面代码中，只要p1、p2、p3之中有一个实例 **率先** 改变状态，p的状态就跟着改变。那个率先改变的Promise实例的返回值，就传递给p的返回值。
>
> 如果Promise.all方法和Promise.race方法的参数不是Promise实例，就会先调用下面讲到的Promise.resolve方法，将参数转为Promise实例，再进一步处理。

```js
// all()
var p1 = new Promise((resolve, reject) => {
    resolve("success1");
})
var p2 = new Promise((resolve, reject) => {
    resolve("success2");
})
var p3 = new Promise((resolve, reject) => {
    resolve("success3");
    // reject("error1");
})

var result = Promise.all([p1, p2, p3]);
result.then((res) => {
    console.log(res);  // ['success1', 'success2', 'success3']
}).catch((err) => {
    console.log(err);  // "error1"
})
```

> 需要特别注意的是：<br>Promise.all 获得的成功结果的数组里面的数据 顺序和 Promise.all **接收到的数组顺序是一致的** ，即p1的结果在前，即便p1的结果获取的比p2要晚。这带来了一个绝大的好处：在前端开发请求数据的过程中，偶尔会遇到发送多个请求并根据请求顺序获取和使用数据的场景，使用 Promise.all毫无疑问可以解决这个问题。（不用担心结果顺序）

```js
// race()
var p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("success1")
    }, 1000)
})
var p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("success2")
    }, 1000)
})
var p3 = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject("error1")
    }, 500)
})

var result = Promise.race([p1, p2, p3]);
result.then((res) => {
    console.log("then:", res);
}).catch((err) => {
    console.log("catch:", err);  // catch: error1
})
```

> 顾名思义，Promse.race 就是赛跑的意思，意思就是说，Promise.race([p1, p2, p3]) 里面哪个结果获得的快，就返回那个结果，**不管结果本身是成功状态还是失败状态**。
>
> **总结：**<br>`all()` 参数是数组返回值是数组；只有全部实例成功才会执行 `then()`；返回结果顺序和传入的顺序一直；但凡有一个实例 reject 都是调用 `catch()`。
>
> `race()` 则是只返回一个结果，谁快返回谁不管是resolve或者reject。

#### resolve()&reject()

> Promise.resolve 方法，Promise.reject 方法<br>有什么用呢？<br>这两个方法调用都将返回一个promise对象，可以将数据快速包裹成一个promise对象以使用promise的特性；比如链式操作

**Promise.resolve等价于下面的写法。**

```js
Promise.resolve('foo')
// 等价于
new Promise(resolve => resolve('foo'))
```

**Promise.resolve方法的参数分成四种情况。**

1. 参数是一个 Promise 实例

   如果参数是一个Promise的实例，那么Promise.resolve将 **不作任何修改**，原封不动的返回这个实例，因为一个promise无论结果如果但这个实例肯定是fulfilled

2.  传入非Promise对象的话将返回一个Promise对象

   例如直接传入字符串数据或者普通对象

3. 不带有任何参数

   不带参数将返回一个空内容的promise对象

> **resolve()**
>
> 非promise对象resolve将返回一个状态为 fulfilled 的promise对象
>
> 而promise对象将原封不动返回promise对象

```js
// 传入非promise对象
var p1 = Promise.resolve("hello");
// 传入fulfilled的promise对象
var p2 = Promise.resolve(new Promise(resolve=>resolve("hello")))
// 传入rejected的promise对象
var p3 = Promise.resolve(new Promise((resolve,reject)=>reject("hello")))
// 无参数
var p4 = Promise.resolve()
console.log(p1);  // 状态为 fulfilled 内容为 "hello"
console.log(p2);  // 状态为 fulfilled 内容为 "hello"
console.log(p3);  // 状态为 rejected 内容为 "hello"   // 状态原封不动
console.log(p4);  // 状态为 fulfilled 内容为 undefined
```

> **reject()**
>
> reject 唯一不同的地方是无论你传递的是什么状态的 promise 对象都是返回状态为 rejected 状态的promise对象。

```js
var p1 = Promise.reject("hello");
var p2 = Promise.reject(new Promise(resolve=>resolve("hello")))
var p3 = Promise.reject(new Promise((resolve,reject)=>reject("hello")))
var p4 = Promise.reject()
console.log(p1);  // 状态为 rejected 内容为 "hello"
console.log(p2);  // 状态为 rejected 内容为 "hello"
console.log(p3);  // 状态为 rejected 内容为 "hello"
console.log(p4);  // 状态为 rejected 内容为 undefined
```

> Promise 优点是很好的解决了 **回调地域** 问题，Promise 对象提供统一的接口，使得控制异步操作更加容易。
>
> Promise 也有一些缺点。首先，**无法取消 Promise**，一旦新建它就会立即执行，无法中途取消。其次，如果不设置回调函数，Promise 内部抛出的错误，不会反应到外部。第三，当处于 Pending 状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。
>
> 如果你想创建一个 **pending** 状态的Promis对象不执行 resolve 或 reject 即可：<br>`var promise = new Promise((resolve,reject)=>{})`

### async&await

> * **async**
>
>   用于修饰方法，被 async修饰的方法将成为异步方法返回值将是 **promise**，可以使用 **then** 方法添加回调函数。当函数执行的时候，一旦遇到 **await** 就会先返回，等到触发的异步操作完成，再接着执行函数体内 **后面的语句**。
>
> * **await**
>
>   表示紧跟在后面的表达式需要等待结果，await命令只能用在async修饰的方法内，还具有**解析promise**对象特性

**async修饰的方法返回promise**

```js
async function func() {   // async修饰
    console.log("hello");
}
var f = func();
console.log(f);  // promise
f.then(res => {  // 执行then回调
    console.log("执行then");
})
```

**await**

```js
function timeout(ms) {  // 普通方法
    return new Promise((resolve) => { // 计时器
        setTimeout(() => resolve("content"), ms);
    });
}

async function asyncPrint(value, ms) {
    var val = await timeout(ms);  // await 等待
    console.log(value);
    console.log(val);
}

asyncPrint('hello world', 1000);
```

> await后面的console语句会等待timeout方法执行完成后才会执行
>
> 注意事项：await 命令后面的 Promise 对象，运行结果可能是 rejected，所以最好把 await 命令放在 try...catch 代码块中。

```js
// 使用try、catch捕获reject
async function myFunction() {
  try {
    await somethingThatReturnsAPromise();
  } catch (err) {
    console.log(err);
  }
}

// 使用catch链式捕获reject
async function myFunction() {
  await somethingThatReturnsAPromise().catch(function (err){
    console.log(err);
  });
}
```

> await还具有解析promise的功能类似于then
>
> 直接获取返回的promise内容

```js
function timeout(ms) {
    return new Promise((resolve) => {
        setTimeout(() => resolve("content"), ms);
    });
}

async function asyncPrint(value, ms) {
    var val = await timeout(ms);
    var val1 = timeout(ms);
    console.log(val instanceof Promise);  // false
    console.log(val1 instanceof Promise); // true
}
asyncPrint('hello world', 1000);
```

> 如果不使用 `Promise.catch()` 来捕获错误的话，可以使用 `try/catch` 的catch来捕获错误

```js
function timeout(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(() => reject("errorContent"), ms);
    });
}
async function asyncPrint(value, ms) {
    try {
        var val = await timeout(ms);
    }
    catch (err) {  // try/catch
        console.log(err);  // errorContent
    }
}
asyncPrint('hello world', 1000);
```

> 简单说：**await** 对应 `then()`，**try/catch** 对应 `catch()`
>
> 而 async/await 和 Promise 的关系，用一句话总结，就是 async function 就是返回 Promise 的 function。
>
> 下面是callback、promise和asycn/await区别：
>
> ![三种类型对比](data:image/gif;base64,R0lGODlhkgOcAZEAAL+/vxAQEGFhYf///yH5BAAAAAAALAAAAACSA5wBAAL/nI+py+0Po5y02ouz3rz7D4biSJbmiabqyrbuC8fyTNf2jef6zvf+DwwKh8Si8YhMKpfMpvMJjUqn1Kr1is1qt9yu9wsOi8fksvmMTqvX7Lb7DY/L5/S6/Y7P6/f8vv8PGCg4SFhoeIiYqLjI2Oj4CBkpOUlZaXmJmam5ydnp+QkaKjpKWmp6ipqqusra6voKGys7S1tre4ubq7vL2+v7CxwsPExcbHyMnKy8zNzs/AwdLT1NXW19jZ2tvc3d7f0NHi6eIyAAQBEQcJB+PiAQICCSPk5fP/ueng8fwW6QHj8gnzx19goaRKUvIcEH/QLuc7jww7yDFCt6ytfuwDt+/wHa/fM3EURIiyTJAHioImPJjw3w5QMI0uPDl/oQuBSY4CbAkQ5L+uTC8wTLdyrtnYy4QGHIhiyVLlWKQOm5kEdhHgSAtSgLrT9LBDXBFGVBnC1VPpW5k2VVA1ijdgS58OTUhSwpOm3RsCtYsXj51iMroelbh2kjAnZL8GvPtRadIhX6GJtClUdfuuP5Ll7VmgkUdjacMOPI0QRvkobL+a9imwrTooWL4KhGqPgYzKtbEfBhvRMq6wPoGyfPfqZ1Tz4gm63StG5FJ4YaE2Jqers/t45OGLZb1AkvR5b+fezI2rIxcjerTt+5m9vXdUf+HpnV2tnXgbQ60aX7wlGdU/9m/VxhpU1U1Fn3UZScbaS5diBEn3mHGIRJxZfbePMUF89y7jmW2lOeeUehMsnlBeB+BtCn3Wo9NZDciMINpoBgr9n11Vz4zTSYYBHVZtxzCmpXIWjquGTOXHF5uCFdSp44GnMbIhPcRL8VmONCKDqYoAJXDhDlktLNhdhv2OFWED5W9UQWY2Hx556RETpo34pw0khQZUwiRaJgJbYJ0p0TnqliL8V5aBlsZF0p0JbtzQYdmuqUp+R1Ds1IJ1Rd4jijY0m+1yWYT1YqpoTu5STljgv2yWWo3IUoDG6YqTeqhUKmGt5wMMr5T6kugsZgfRV1yWhCTtZ3V7DxRYmqiQf/Sernos3K6tawxa063TC2KhgptJ8qRqKcyfqGmrINhhUebxpwZS4G1Yma7LOm8tourQJ1m0xewt14462IlmqYp872CB+Sd/a6broGz7Dulrb6yGi08QY85zKagnfYYftmi5GiEwMZsVO9gndwyDQkvDDE7e7r5EYm46ayMaHl96HDezKZ77zfdadtg3fmiqmxIv8MA8mPaXjyqSs6JVOj3ASKTrlAP62Fos1a5+q7MhNKYnHoWlNwBWRCDXbYgzA9Adlin432HGanzXbbbr8Nd9xyz0133XbfjXfeeu/Nd99+/w144IIPTnjhhh+OeOKKL854444/Dnnkkk9OeeVt/wd3pgVfBxRj5kFseeZRZqVwq+WmM3IkB+UkFaMSeCalUssUrB4BAJ6fjrsYqVXm5G2psce5RipLiY9zddEe1ZktV9YOUQKdVM7alxFbF2fzQB9VmPgViIHtWyN3e+5XpUJXnLS/NbxycRYafPBS+gNQy8jHmTz9VvIlPZ9TeeTRif37k70AdqZA37NdOcpBGXM4wHbi4wPzNsAV2fEAe/BzgNMEeLPw/QFWIApgaXYCwBgZ0H4hdB8D5lfCdTRPWCfK3AVtgx7rVY9+7UuhCjujQQMeMHYKbMALG/iGH/Ljez8olQdQchLWHWIm7WgiXYjSwhBGZmjrq+ICUFjDCv/aMIqd0ZIG/TE6H4Iwha8TYRclkEAiuuOLdMDcBqqDEiEe43eFMqKqVBUjywzvOdXTIx0j8kDpaLBDlsEepPpoM0/9UXtnpKEjx3YOCpZvVKiqkyXBGMb3hVBlKhMdDkm1jp2skIAPYkgPV7Q64kmxTnIRDVuceMosSiCWC2QjHZAnRx8qcYvTmKQ7wLhKKcavXGV03xgHk8SAcMUw60sMP+LEQGUG031O5Bw7kBJL0NgQTy5MBEYGNBznaNFO8vpMK6/3EDMlqXWNhMgwh0JHCKhKnVyiJ62SeSycgItJJ4imFnYnwz7FB3irW88eubMpAVKSn9T4IzPx+T8hFjP/MRGF3S6Rl8r/Yet+o0kVME3YxdugBj/92eYn64eJXOLFixzInwxUegGYMuF8JAyIZpxZQnD6ckCb9KUsSydTYOQIOeoDI10qGphGUlSKFmVnPW84VBiWsJpGvSFIAzgVm3KRjBrdplaCKgjzFC4+YgUpRKWZkwzVlKayfCRQGzqXSPJ0oTNh6GpaCdXE3LSonNQMcOQSyulpta3A7EcyZbeUMR42PU7EHn2w0hGPjNGRUwTiIDpZJxrCAzhL9QsKJ8nWWnWundH4ByfJpE0KMmaj/lHgPgBLq/kQCiaZUc5Nw/ePxeKvfrBdS3JqmxndGpGCWhQsaS3bh42MSK6L/xqeKAWbpwwx7C2LfWXpEAtWZySTDdsd2SOLi1w/8Eg5mIGJEXVWsc0qkrNxLCsZxxHINMQ3vM7I7glo11366pc6m9uvf/8L4AALeMAELrCBD4zgBCt4wQxusIMfDOEIy21oXeOl5spmXwlrmHxozLAEdbnhENMiS/u0IG0PlZ59OG8pSRWxi2VBxWcWtX1Z262MX8wLW6JDx4KLsTw35dOtBpYhGcYxKYr8XcX5mCHC22WTj2sbcwHKvkgupUZIp0ZR+GaYazkviB2HV+W0xZRWPWrs3nrjriw5pllWF5QjgMUT8lgUFM7IYb9Y5bkBr8QWREzS0sm+D0dZL2RF8f9sGwm9F4WEPQfVbLUSkJUx11ONcVbF0LhH2CEDOMMSnfM4YlzQSdYVPrFBCS5zimrK1i7SkKZlWmNx6c6xMc9Gtgs7k/ghn8quux/ST6pN+gAdItAmeIbxiWwraW99udZpi3ESsejT7vJ6Aa6ksUIzDYFKvxoWngQRD9PMbKCNJpJ7hW5Eu1pDooiGudLEp3ThI+nXyrF0LfH0K37ol3AfDH8w85d5DHkrQANsZ9FS4E2MVwJt14J9+rYcrRHW8IhLfOIUr7jFL47xjGt84xzvuMc/DvKQi3zkJC856fJtg/xeQOEmb7kVWP7SI7p85jcgEnkt2aNIzUe2gRLrih//tVmYPWVSCi0U9OhzzSfS3B725vYlk+luKZ67uBi95KDbV1txsnu7QWlZjrS+UIYuPbkuyNoNsEkD00CQXjRu+hKWjNPgBZKZW40ZpFm4RqfWMMjJitmaPfo4t+vi4fI0S5vLXoOjtlQriPVCrJkaQqrSPe8fXWBkoF3SX7MmyX8X9C4En3hWVcDXmxdBln755jiEijPAkxcfUY5Q6fgMsONOKItYzQDeVfIti7T9RpPUuxQj8n2RPBrQy8pBtF6b3leAOtDXs1Rq9vSj0Gss4C9j3viN0vAl9Xqyc/pBFRreLKBnBeFXwHevqdorx/V8EKv5kLNGc6eBObEVpb93/+4HG/dM5hwDubl86ABNz+U+OBV/fFRt+Bd3cfRVVrYF5BRbtnUZcpUXxXNzMAIY+WWBIMJeVDF8mDYwO4NzHTULPENwI5UqnpJoF/JoACIkzxFXrVdij/JL+8Avi1Yt0nY/vkZIH9FoZDQd52cFcJdqEIhtRccpZBFVlad8uXdAw0ZtrDdeghSA8mRoDxV9cZc9pyRq9zdAemdcu6ByFgBz5JM6mkd5R0JST/VjaVhTc7VTi6ZYS8V1pGUh62ZXbDFZk8dLzBdEereAbFFTbchL1baETeiHFwZ+/ZBOa5hkGERU19cRindV12Ztl3gzDegsY9diq+JIbHV9kRcerf/HPjYITUDHOlYyh/7ThKTmgPPTa0qoWVCWiG2AT6iIVqLGbsHjavCGh/LHUx7IhX71Rn1nDnolIZAVb0LWfdQ1V8Y4fUeTbMeXaudVfV/4iJy4bHGGTZOVX1a3S5lVeelxiqH4iavoDgalAGM4Ho4YG0XlU8VkiXLQbffEJNB3c6UGe3yWJsZxQCCCgS41ISOEeuYFD7fojxZ0kCPYTujEXu+EJ+ToWIOxgXwWikLIcWHWbqDFXFA0gVTlftM1Wd4ChzclV5QxJCUJTBAFWQ0ZWQylXHCoghqJPuZlOGN4dlaljbUzHRsYgTTDQDY3gWF4d+nhV91yP/gIJO4VXO//hivthVrBgi/Bsh28F4SmhpE/4147CQlZeS5euWxcKZYxQHpjaZZniZZpqZZryZZt6ZZvCZdxKZdzSZd1OXHuZ5d5qTZ6yZd4AJZ9eTaHpwTlRwd/CZjDcHqE6QESpJhvJHoUkGjdNAIk8lWNiQN4eZjgII85YJhfll1BBnuLl3nz+HaW842UkxmKxlEqxjBAWDCR9n0uKFfBJzAomHulaB7AtZDIJ1Y0+G662Y+7UUzBES4XCHi1J4Kj6QSd6TbYxJxo45FolT5sGI+phxywKWNDAmzr14nhh4lTN1i6wUXOiIZopmleV41dFXBf9ZxgYTp/5ziw+B6kV52kSWxP/9gS1kMYAmKHEDCD4gmKWmgfdBegFlY6pwlk+fhR/aKcYtcEmMk48Nk4sEht8DiL9qmIvGg96LaZ4SiIYkeO1ehkm7SHfbhMDakVhqie+reJS/eNgjk4eVFd1SVNHhhv6qgBrdkRw+MvyuhB6MIwzoVSuVhJJtlFI7I+t2VTLalQNMlu5Jl3wpgRMZmNLSehiyOUOlOW1wR9Cbl2Oxo/x3Yfe1QXqzWQtGNPU8WaK0SRuCE6KamUohIiBzhwHdQmq3NwG5KA2nilmXlFljmZLwWjIAeAfuqfFWaoSCBB7ZmojeqojwqpkSqpk0qplWqpl4qpmaqpmwqpg8qpnxpTj/85AWU5Y1XaA2ZHNU+2F6C6aabaf1k0NICKF2EUQKdmAf5EiKzqN1v6ItBnOwAli+tRo693JMJ5XC/YJrrCdrcZPToVMOjULjDSeqoamg5Qhoyqq8GWBbIKB95Jf7xYokBSoES6nQ6aU8MUdsqGYbNhoVLHVfZpKg/whLFEkGF5qYlpA4w5MqI6S/DgF4RHmaP1BP+JgVkliuZYVeNpPhkCpHkESp64RUH1gkJHiQz6XfmFk8KDn+AzSNgqlh2ak95lYTF1UpPJoq46BJOEhwCksrhIWuOKp55zeT52M2CIsE5WLmeVf5aochD6oaraZ2MwZS1FApiBZYLirzcoldD/xYeiCptb4xKzuXu1uWUsgpuGJW/HyJtN8Uu/yZo5d3cuqZrPiovICZAN6jpFCoS1moUnWWrGNV3wmBWA4lSYJX79gR5DlICBqFXLc5BWFQ/q5k/V+qdlQwZ9OkTsh6HWqmNlKAu1RX04NX8XaqpPm53pCKv9abibpFFZeK4c4633By/LZ3/HuT4rirYCyQPFI29IORv+5iExlEpW+SlUaIlIpE89iIFfNK1XWHCBm3z/Frwo4LH7qoS+a5v0s4Kv5zM/uHct+Er85z3Zxq2hIJ+sJ4vvtbj1tLFXpJ+mVZzcqZCEsoXhWlkEar5BW6rPyxkQeIjrqSXF+wLya7U2/3ur9Atn1VuyYABqLouMNaSDtMVZIqq9lYudsdGLQPt57hiJ+ES5I5uhOuW5Vai+j4Ge31pZZzSuxKS5TPizE8yE9Ka6SUCqieNswiccNLRrE+usmgeyrfaE36a+vcAOIImLPConTkp5GaCjv1pYyESTIxuk/1tcUaVKrUiNmKikrNlOOgyM/CSl7FqHaXnCOzyIoTht6yi6FEyGtuS4sJClq5WmXHq24pIB5dE8YrqfrwcTZppHBOnGajiU3sGmVvGm2GdcV6IxHTgrJxgTeBq8JLiTTfJUNGrEHMoaN3qcT+qUKSga5RYYbfbFkzPJiBcDtWilUzYgsOuMz4dSvf+LgwsCyHUqApX8OEaYrfwbBZicyq3syq8My7Esy7NMy7Vsy7eMy7msy7vMy3zJF6gchaqjYxnby30pUTKXuMXsywHHcFfnTqGEdJOodIWnzH2Jq0dIV/yTrq+SzNVcREUWm2ErgPnZYVBzzfiGMXz3GMS8vg2nv4RQZDAnR5iJb56KIHTLEZxnsz6Lv8nwzicHvRgWnebqAfhqnbpjhToiwU6kmrMWJi3aVD9jQHb2koSYH+Y1jdNoS6zsE/1MshCsftubo+3n0TbgNAfYSJ+VpCCNdb7Ezh5sML7xZ2r0LhA5gnxoQfYsGUnrx2IykbZVG9Mav6ShK5Migx3CJTX/qEgOFZFvSzNji4LOO7Ei7XgcnEdy6NSQ+Kox89IvHTdeLa/DXNK34IFX7IYSOIAyNq4ODF32g9VyB8La5CzR2aaRF67lirJdcNJmhHX4rNUVHEEvxNHevAUsfI5qekYZS4rVo1YHy459fbCYW4tyLWSxyGIFbKJq4DTVhT7IZIBGCqU5fUNct9E6TdhSsCMyu21nWI5XJ47KN4lvOKJsdVg46sztOI+S98BtNdYia3kBaQ4nJq0EkrXB1scsDdOn/QVOzJEe1UnqVlQZK5Jraz7ICFiwpT6npUVQSrsCVI/abcg9WtHSZKtoQLgxV2+bq9xhwI8jIcYHeVPwFKfr/3gb5Oa69wi3scsa/3jEHfOvS0tewn0jgAXKpbveFdfb7cwCCX7gkVPCDQ7hES7hE07hFW7hF47hGa7hG87hHe4DUhOyxejhHJfgPitP/zziJny8VTJ8z9rEW5mqMaGsLN5Y4kmVAtXZvsLgKf42XRiNze18RYdun2yQSR2t2ozHKQ2OtgKCPG6Fpi0UhHnezIAU2/Vse8i1lGsat+N3YHiG3JigEauJTt7NOlBkO34RThWUI1lBGOjdgu3M2xlNYG6gfE3ViYCgk7N6OHHUK749D52fDbFiJgnVk2Ihz8pZ+kGcyV1a2gyl5+MpbNVJ2E2R4hTdZoa3gbVdUPjm9v+j0U1OCc6p5ys0WPKXvuO4stLt1mc2pQP8MHFEPwM9WOnaUEQ9KoY0xlAZyvhhx7m74gG5mspTrNnyZ9mXUvYboYBYhMLrirD9mMfRihRq1pEbKpjngEDEaZmAuIhDhJdoiNS6p+lt55X910N6eZIJ0WTe7IyuODM6wU+sVVb+tymY379oSac00a54gN/ndVk43hqJzU6+7YhTj0Q3lJiVM3n6k+u7gVG7M23cEBaZboJudEGo7jOM3GNpyuN+8XaI4h0vl4sK8iNP8iVv8ieP8imv8ivP8i3v8i8P8zGv7TKPqRtP83lp8zdfl9es82+H5oEz2D0fBD//NzlP8Mb/jVs7MMKrQPS7+vF489KVtvSQmcDIngtN3zdGjzd7Ttxb29lRuU4yTrv9ZbnMGOe8MPX+hfVM5+rKO1FKWUz45SW0DmkHrMBWjwtrL/RCMEViledPNlFkhfct1L3cq5DBoPd7DwSP59ntx+bp91MZcK2Ir/h8UNbT09k2iXqqJG+0et2WlNEwyvP2OnhPX/lD2OvtdYwBM6VMoaTsWrschEchkPinr2Q7YOK2r/u7z/u97/u/D/zBL/zDT/zFD8tQbvxSxq+BYawHfapGq4+w3k+1n/ybQIlEW3rrbgQv3HYr12ZBX/1MfzyFhE5GaS91lNTvBnA5B+qxeuMT6IPS/zxvKZY0xoOMAz3s/53X28YQBIAdU5fbH0Y5abUXZ7159x8MxZEszRNN1SNA2gF4A2OQZVY4BHt2jxjHEgZZgVzihVQOaz3a7mgJJGu+geCYfGGXVsWUxmwAsGUF99Fbrdlt9xsev1Dldfsdn9e7ptq+EqhqiI4lJuwlUEtsQW1RsKlPK0wnSiohJjILzAptkdDrcaysk/IhcA81VXWV1YKsFTZWdvZNjXDH5VQxFHQo0eoTgZQwiTT3rJIo7WvhkGarki44dBrCuKGRdvVv26Nam/YVfJy83JxhywmRasorXUcGYNKGSSYrx8iTMcrWRWByx6QYydDJ81eoRpZnMP/awTC0RCHDLhWypZl0Ls83ORUzcMQYS+NHkSNJrpnyL11DL5gYHtmR7wq3H2BaQIn57CSfW8SQbIIE8yXMJhEiHcrJ8GjMGS0wJX3JT2VCFB5LJgi6TmUmnX6ihgoKoc+RgdxONmwqbKlQajLL2sD0JGRVO1Tl1rV718SpVDw70EUVd4NevI9uDMpSShBQdggCCe6iZuCXJLr4NJMEr3JPRoNRieP8GXRoCn0uijZ9esG/M84I61wIiqtMRpHWbRbGmhfmIpF65faNeo1n4MOJFzd+HKNqq/zq/Ti22Ms1dAwcU+m0SwHl6cxsI1ch3Ht48ePJlx+hDiGuGq/zNY7/98PQMwOnWOpGEzBM/GPq9XOPqbs/hgxCy7wSACsQwQQVXPC0pGISqz0nXsrPp5+gyiYbTFwKaybZbNqtIqE07DAr0npjEMUUVVyRxRZJOnAMGF2ckcYabbwRxxx13JHHHn38EcgghRySyCKNPBLJJJVckskmnXwSyiilnJLKKq28EssstdySyy69/BLMMMUck8wyzVyRGAex8WY0gs58E844qXSsAfU4UGsZOfXck08hX7KKN7AALfGtm5KKS8Y+FaXSzUVzpIPO7f6TqAjJLkLU0UydjEwZSYk6UdPxIMUUxKwYKS0kPENdlciGutJAxERZBW3UCbDz7xhc85xV/wI7HeEVo0CVipAerUDEpwdXZfpzq2SkAVa8h9AqzVPsZphHOVC7g3ZX3bgdaRdx+hkqMbiqoOmLeTQLRTC/vqU10KAaBbSn2HA6dF5d39VX1n0zWlY2pt5LbLN2eMAQiddm+iJffxPsdyKwGuaWL4fBGReGhQu5jGDuDGjBFnVzfTZhi00Gs11qT+6mifneyUwqQdQzmAYg8vlQnmuJIFnblX2WsuKfYTlJvadwbYfTEeuz6aREAkVaLaF8FZrqKIOuOtiMesaaayPpmLprbZpSOeyyZ50aYrPVXpvttt1+G+645Z6b7rrtvhvvvPXem+++/f4b8MAFH5zwwg0/HP/xxBU/s0JUpJOC7MUln1wkdzf6IG3KNd/cVhN/gkempi6cZx7ZLFMpoJxSh0lYmqybzPPVBcbCVM5tvx3zDSed2QA0alsPoeBjftw9PuaDJ4feXx4KW3fQclaaiXGfnnp+l/j9K0q1b4S2YK4KGZmJbs21qaOuSbP69NVf82hfan3kukN6dbOiYR5Dh7nUCCJG+vX9p7xoAgtC8YCXCJfBxwg1QwRUSkaYbF3hHwpUhs7otTO4XGpAv/rfBm1ntA5dcFJn0QlaPAeJCrrmWKCLFWSEBRvzcWhY0OHgDGmIl8dRJHI11OEOedhDH/4QiEEU4hCJWEQjHhGJSVTiEpn/2EQnPhGKUZTiFKlYRSteEYtZ1OIWudhFL34RjGEU4xj39CoyntGImUPjGtOnRja+8XZuhOMcKWdGOt7xf3LE4x4Lp0c+/hFwfgTkIPVmR0IeEpGJVOQiGdlIRz4SkpGU5CQpWUlLXhKTmdTkJjnZSU9+EpShFOUoSVlKU56yazlE5SoZJMgLMEsYsxGKK1lZy7vckA08a463bNnL8uCyTiBj3aHIMjvxwVB8vlQmecAmgQpxbGC/0wf+GrhMax7Hctv6ibJmqbFpSoZh1xQncYwBTF5Ug3XePOc+tDlOd4LGGIbMhVFK4arDkCtnIjMIGPRCy3f+UxWkaKZknHIU/zIk5S0Hg11DrkIggD4UL9Lw53kgWlGLXhSjGdXoRjnaUY9+FKQhFelISVpSk54UpSlV6UpZ2lKXvhSmMZXpTPcw0FyqpTSw1CBNeeqAiVJAoPTTV0+J6qnRGIGhASOL8pZDwq587adF9aisorKLcfmuqcIQ6lClKlV5+rRebPEJVrWaVet1Fa29sZx1CCI/CIohqEb9TVp5KlFnZnBc4wKCnQplH8Zkw6Z0naldTdHC2JUwLMkzFiQ2dCjBohVttIjqYylbWcteFrOZ1exmOdtZz34WtKEV7WhJW1rTnha1qVXtalnbWte+Vi3mfC1qdTlb2IbTtrOFam51W4lI8Wv2tLsFbmujN1zictW4pI1t/5LbXOc+F7rRle50qVtd614Xu9nV7na5213vfhe84RXveMlbXvOeF73pVe962dte974XvvGV73zpW1/73he/+dXvfvnbX//+F8ABFvCACVxgAx8YwQlW8JQKAAA7)
>

## 声明提升

> JavaScript 中，函数及变量的声明都将被提升到函数的最顶部。
>
> JavaScript 中，变量可以在使用后声明，也就是变量可以先使用再声明。

```js
x = 10;          //变量赋值
console.log(x);  //打印结果 10
var x;           //声明变量
```

**JavaScript 初始化不会提升**

```js
x = 5;
console.log(x);   //5
console.log(y);   //undefind
var x;
var y = 10;
```

**函数提升**

```js
show()   //hello
function show() {
    console.log("hello");
}
```

> 函数声明解析时会提升，函数表达式不会
>
> 如果一个变量未定义输入则会报错，输出undefind则说明变量已经定义了只是未赋值
>
> 在javascript虽然可以使用变量提升，但是不建议使用，这样降低代码阅读性

## 严格模式

> `"use strict" `
>
> 它不是一条语句，但是是一个字面量表达式，在 JavaScript 旧版本中会被忽略。
>
> **设立严格模式的原因**：
>
> * 消除Javascript语法的一些不合理、不严谨之处，减少一些怪异行为;
> * 消除代码运行的一些不安全之处，保证代码运行的安全；
> *  提高编译器效率，增加运行速度；
> * 为未来新版本的Javascript做好铺垫。
>
> 1. 不允许使用未声明的变量
> 2. 不允许删除变量或对象
> 3. 不允许删除函数
> 4. 不允许变量重名
> 5. 不允许使用八进制
> 6. 不允许使用转义字符
> 7. 不允许对只读属性赋值
> 8. 不允许删除一个不允许删除的属性
> 9. 不允许使用关键字声明变量
> 10. 不允许this关键字指向全局对象
> 11. 不允许使用关键字with
> 12. 等等

```html
<!-- 使用方法 --->
<script>
"use strict"
var x = 5;
</script>
```

> 将”use strict”放在脚本文件的 **第一行**（加不加分号都可以），则整个脚本都将以”严格模式”运行。如果这行语句不在第一行，则无效，整个脚本以”正常模式”运行。如果不同模式的代码文件合并成一个文件，这一点需要特别注意。

```html
<script>
  "use strict";
  console.log("这是严格模式。");
</script>

<script>
  console.log("这是正常模式。");
  a = 10;
  console.log(a);
</script>
```

> **针对单个函数**
>
> 将”use strict”放在函数体的第一行，则整个函数以”严格模式”运行。

```html
<script>
  // 正常模式代码
  a = 10;
  console.log(a);
  
  function show() {
    "use strict";
    // 严格模式下代码
    b = 20;
    console.log(b);
  }
  show();
</script>
```

> **脚本文件的变通写法**
>
> 打包器肯能会将“正常模式”和“严格模式”文件打包成一个文件，避免是“正常模式”文件下代码无法运行，我们可以利用严格模式针对单个函数特性将整个脚本文件放在一个立即执行的匿名函数之中。

```js
(function (){
"use strict";
// some code here
})();
```

## Date

> **Date 日期对象**
>
> Date 对象则基于 Unix Time Stamp，即自1970年1月1日（UTC）起经过的毫秒数。
>
> 时间戳：时间戳是从1970年1月1日（UTC/GMT的午夜）开始所经过的秒数；指一串数字。
>
> 语法：
>
> * new Date();
> * new Date(value);
> * new Date(dateString);
> * new Date(year, monthIndex [, day [, hours [, minutes [, seconds [, milliseconds]]]]]);

```js
// 无参数
let d1 = new Date(); 
console.log(d1);  // Tue Nov 02 2021 20:59:29 GMT+0800 (中国标准时间)
// 传入时间戳(毫秒数)
let d2 = new Date(1635858006000);
console.log(d2);  // Tue Nov 02 2021 21:00:06 GMT+0800 (中国标准时间)
// string传入
let d3 = new Date("October 13, 2021 11:13:00")
console.log(d3);  // Wed Oct 13 2021 11:13:00 GMT+0800 (中国标准时间)
// 以 - 分隔
var d4 = new Date('2016-01-01'); 
console.log(d4);  //Fri Jan 01 2021 12:00:00 GMT+0800 (中国标准时间)
// 以 / 分隔
var d5 = new Date('2016/01/01 12:00:00'); 
console.log(d5);  // Fri Jan 01 2021 12:00:00 GMT+0800 (中国标准时间)
// 数字分开传入
var d6 = new Date(2020, 5, 24)
var d7 = new Date(80, 5, 2, 21, 5, 0);  // 80指的是 1980
console.log(d6);  // Wed Jun 24 2020 00:00:00 GMT+0800 (中国标准时间)
console.log(d7);  // Mon Jun 02 1980 21:05:00 GMT+0800 (中国标准时间)
```

**Date常用方法**

| 方法                   | 描述                             |
| ---------------------- | -------------------------------- |
| getTime()              | 获取时间戳                       |
| getFullYear()          | 获取年                           |
| getMonth()             | 获取月（从0开始）                |
| getDate()              | 获取日                           |
| getHours()             | 获取时                           |
| getMinutes()           | 获取分                           |
| getSeconds()           | 获取秒                           |
| toString()             | 等同于无传值结果（默认系统时区） |
| toUTCString()          | 等同于无传值结果（世界时）       |
| setFullYear(2020,10,3) | 设置年月日                       |
| setMonth()             | 设置月                           |
| setDate()              | 设置日                           |
| setHours()             | 设置时                           |
| setMinutes()           | 设置分                           |
| setSeconds()           | 设置秒                           |

### **get 获取时间**

```js
// get
let date = new Date();
console.log(date.getFullYear());  // 2021 (年)
console.log(date.getMonth());     // 10 (月真实为11月，从0开始计)
console.log(date.getDate());      // 2 (02日)
console.log(date.getHours());     // 22 (时)
console.log(date.getMinutes());   // 1 (分)
console.log(date.getSeconds());   // 41 (秒)

console.log(date.getTime());      // 1635861701151 (时间戳从1970-1-1开始计数)
console.log(date.toString());
// Tue Nov 02 2021 22:01:41 GMT+0800 (中国标准时间)     [默认为系统时区]
console.log(date.toUTCString());
// Tue, 02 Nov 2021 14:01:41 GMT                      [国际标准时]
```

> 我们和国际时相差大概8小时

### **set 设置时间**

```js
// set
const date = new Date();
console.log(date.setFullYear(2020));
console.log(date.setMonth(10));
console.log(date.setDate(10));
console.log(date.setHours(22));
console.log(date.setMinutes(30));
console.log(date.setSeconds(10));
console.log(new Date(date));  // Tue Nov 10 2020 22:30:10 GMT+0800 (中国标准时间)

// Date.setFullYear(year,month,day)
const date = new Date();
date.setFullYear(2020, 10, 10)
console.log(new Date(date)); // Tue Nov 10 2020 22:29:11 GMT+0800 (中国标准时间)
```

> set 设置的返回都是时间戳所以，这里再次 new 了一下
>
> setFullYear 根据参数不同设置不同 Date.setFullYear(year,month,day)

### **自定义时间格式**

> 这是一个封装好的自定义时间格式方法

```js
"use strict";
Date.prototype.format = function (fmt) {
  var o = {
    "M+": this.getMonth() + 1,               //月份
    "d+": this.getDate(),                    //日
    "h+": this.getHours(),                   //小时
    "m+": this.getMinutes(),                 //分
    "s+": this.getSeconds(),                 //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds()             //毫秒
  };

  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  }

  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
        fmt = fmt.replace(
            RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
  }
  return fmt;
}

let now = new Date()
const time = now.format("yyyy-MM-dd h-m-s");
console.log(time);
```

> **y** 代表年；**M** 代表月；**d** 代表日；**h** 代表时；**m** 代表分；**s** 代表秒

## File

> 文件流
>
> javascript对文件的操作，一般情况下文件都是通过 `<input type="file"></input>` 上传的，监控事件为 `onchange`

### file

> File 对象代表一个文件，用来读写文件信息。它继承了 Blob 对象，或者说是一种特殊的 Blob 对象，所有可以使用 Blob 对象的场合都可以使用它。
>
> file 对象包含文件信息内容

| 属性                  | 描述                                                         |
| --------------------- | ------------------------------------------------------------ |
| File.name             | 只读，返回当前 File 对象所引用文件的名字。                   |
| File.lastModified     | 只读，返回当前 File 对象所引用文件最后修改时间，自 UNIX 时间起始值<br>（1970年1月1日 00:00:00 UTC）以来的毫秒数。 |
| File.lastModifiedDate | 只读，返回当前 File 对象所引用文件最后修改时间的 Date 对象。兼容性差 |
| File.size             | 只读，文件大小单位字节(Byte)                                 |
| File.type             | 只读，返回文件的 [多用途互联网邮件扩展类型（MIME Type）](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types) |

```js
<input type="file" id="test">

"use strict";
let fInput = document.getElementById("test")
fInput.onchange = function (e) {
    let file = e.target.files[0];
    console.log(file);       // {...}
    console.log(file.name);  // v-move.jpg
    console.log(file.size);  // 120336 (单位字节)
    console.log(file.type);  // image/jpeg (MIME类型规范)
    console.log(file.lastModified);     // 1631564199817 (时间戳)
    console.log(file.lastModifiedDate);
}
```

> `File` 对象提供的是一些文件信息；例如名称、类型、修改时间、大小等，要查看内容必须用 `FileReader` 对象读取file内容

### fileList

> FileList对象是一个类似数组的对象，代表一组选中的文件，每个成员都是一个 File 实例。它主要出现在两个场合。
>
> 文件控件节点（）的files属性，返回一个 FileList 实例。
> 拖拉一组文件时，目标区的 DataTransfer.files 属性，返回一个 FileList 实例。
>
> 一个 FileList 对象通常来自于一个 HTML \<input> 元素的 files 属性，你可以通过这个对象访问到用户所选择的文件，不管 input 标签有没有设置 **multiple(多选文件)** 属性返回的都是 **FileList**。
>
> 方法：`item()` 根据给定的索引值，返回 FileList 对象中对应的 **File** 对象。
>
> 还有个 **length** 属性
>
> 总而言之fileList就是一个file对象集合一个类数组

```js
// fileInput 是一个 HTML input 元素: <input type="file" id="myfileinput" multiple>
var fileInput = document.getElementById("myfileinput");

// files 是一个 FileList 对象(类似于NodeList对象)
var files = fileInput.files;
var file;

// 遍历所有文件
for (var i = 0; i < files.length; i++) {
    // 取得一个文件
    file = files.item(i);  // 使用item方法
    // 这样也行
    file = files[i];
    // 取得文件名
    alert(file.name);
}
```

### fileReader

> FileReader 对象允许Web应用程序异步读取存储在用户计算机上的文件（或原始数据缓冲区）的内容，使用 File 或 Blob 对象指定要读取的文件或数据。
>
> 其中File对象可以是来自用户在一个`<input>`元素上选择文件后返回的 FileList对象,也可以来自拖放操作生成的 DataTransfer对象,还可以是来自在一个HTMLCanvasElement上执行mozGetAsFile()方法后返回结果。
>
> 重要提示： FileReader仅用于以安全的方式从用户（远程）系统读取文件内容 它不能用于从文件系统中按路径名简单地读取文件。 要在JavaScript中按路径名读取文件，应使用标准Ajax解决方案进行服务器端文件读取，如果读取跨域，则使用CORS权限。

| 属性       | 描述                       |
| ---------- | -------------------------- |
| readyState | 表示FileReader状态的数字。 |
| result     | 内容结果                   |

**readyState可能的值**

| 常量名  | 值   | 描述                 |
| ------- | ---- | -------------------- |
| EMPTY   | 0    | 还没有加载任何数据   |
| LOADING | 1    | 数据正在被加载       |
| DONE    | 2    | 已完成全部的读取请求 |

| 方法名               | 参数             | 描述                                          |
| -------------------- | ---------------- | --------------------------------------------- |
| abort()              | none             | 中断读取                                      |
| readAsArrayBuffer()  | file             | 将文件读取为 ArrayBuffer 数组                 |
| readAsDataURL()      | file             | 将文件读取为 DataURL，以 data: 开头的字符串   |
| readAsText()         | file             | 将文件读取为文本，默认值为 UTF-8适用于读取txt |
| readAsBinaryString() | file, [encoding] | 将文件读取为二进制码                          |

> **ArrayBuffer** 对象代表原始的二进制数据，又称类型化数组
>
> **DataURL** 图片会以base64字符串格式嵌入到了页面中 DataURL 形式的图片**不会被浏览器缓存**。
>
> **readAsText** 第二个参数是编码方式，默认值为 UTF-8。将文件以文本方式读取，这个方法是异步的，也就是说，只有当执行完成后才能够查看到结果，如果直接查看是无结果的，并返回 undefined
>
> `readAsBinaryString() ` 方法是 **非标准** 的，请尽量不要在生产环境中使用它！
>
> 一般情况下我们是使用网页读取图片使用 `readAsDataURL()` 就可以了

```js
fInput.onchange = function (e) {
    let file = e.target.files[0];  // 获取file
    let read = new FileReader();   // 创建fileRead
    read.readAsDataURL(file);      // 读取以DataURL类型
    console.log(read);
}
```

| 事件处理    | 描述                         |
| ----------- | ---------------------------- |
| onabort     | 中断时触发                   |
| onerror     | 出错时触发                   |
| onload      | 文件读取成功完成时触发       |
| onloadstart | 读取开始时触发               |
| onloadend   | 读取完成触发，无论成功或失败 |
| onprogress  | 读取中时持续触发             |

> 文件一旦开始读取，无论成功或失败，实例的 result 属性都会被填充。如果读取失败，则 result 的值为 null，否则即是读取的结果，绝大多数的程序都会在成功读取文件的时候，抓取这个值。
>
> 这些事件都会在完成后修改 readState 所以要判断readState状态最好在事件处理里面进行

```js
fInput.onchange = function (e) {
    let file = e.target.files[0];
    let read = new FileReader()
    console.log(read.readyState);    // 0
    read.readAsDataURL(file)
    console.log(read.readyState);    // 1
    read.onloadend = ()=>{
        console.log(read.readyState);// 2
    }
}
```

> onloadstart 在开始上传文件时触发
>
> onprogress 在遇到文件内存交大的时候会执行多次
>
> onload 在上传完毕后触发他与loadend不同的是，如果操作被 `abort()` 了，load是不会触发的。
>
> onloadend 在上传完毕后触发无论成功或失败，即使上传被 `abort()` 了还是会触发loadend
>
> onabort 在执行 `abort()` 后触发
>
> onerror 在上传出错的时候触发 `abort()` 并不会触发 **onerror**

**一个简单的图片上传案例**

```html
<img src="" alt="预览图片">
<div>
    <input type="file" id="test">
    <p class="content">文件信息</p>
</div>
```

```js
"use strict";
const Img = document.querySelector("img");
const Input = document.querySelector("input")
const P = document.querySelector(".content")

Input.onchange = (e) => {
    const file = e.target.files[0];
    if (!/image\/\w+/.test(file.type)) {
        alert("请确保文件为图像类型");
        Input.value = "";  // 清空选择
        return false;
    }
    const read = new FileReader(file);
    read.readAsDataURL(file);
    read.onload = () => {
        Img.src = read.result;
        P.innerHTML = `filename: ${file.name}<br>filetype: ${file.type}<br>lastModified: ${new Date(file.lastModified)}<br>filesize: ${Math.floor(file.size / 1024)}KB`;
    }
    read.error = (err) => console.log(err);
}
```

## Blob

> Binary Large Object的缩写，代表二进制类型的大对象。Blob的概念在一些数据库中有使用到，例如，MYSQL中的BLOB类型就表示二进制数据的容器。在Web中，Blob类型的对象表示不可变的类似文件对象的原始数据，通俗点说，就是Blob对象是二进制数据，但它是类似文件对象的二进制数据，因此可以像操作File对象一样操作Blob对象，实际上，File继承自Blob。
>
> 在一般的Web开发中，很少会用到Blob，但Blob可以满足一些场景下的特殊需求。Blob，Binary Large Object的缩写，代表二进制类型的大对象。Blob的概念在一些数据库中有使用到，例如，MYSQL中的BLOB类型就表示二进制数据的容器。

**Blob()**

> Blob 构造函数<br>语法：`var aBlob = new Blob( array, options );`
>
> * **array** 是一个由ArrayBuffer, ArrayBufferView, Blob, DOMString 等对象构成的 Array ，或者其他类似对象的混合体，它将会被放进 Blob。DOMStrings会被编码为UTF-8。
> * **options** 是一个可选的BlobPropertyBag字典，它可能会指定如下两个属性：
>   * **type**，默认值为 ""，它代表了将会被放入到blob中的数组内容的 **MIME** 类型。
>   * **endings**，默认值为"transparent"，用于指定包含行结束符\n的字符串如何被写入。 它是以下两个值中的一个： "native"，代表行结束符会被更改为适合宿主操作系统文件系统的换行符，或者 "transparent"，代表会保持blob中保存的结束符不变

```js
var aFileParts = ['<a id="a"><b id="b">hey!</b></a>']; // 一个包含DOMString的数组
var oMyBlob = new Blob(aFileParts, {type : 'text/html'}); // 得到 blob
```

| 属性      | 描述                                                         |
| --------- | ------------------------------------------------------------ |
| Blob.size | Blob 对象中所包含数据的大小（字节）。                        |
| Blob.type | 一个字符串，表明该 Blob 对象所包含数据的 MIME 类型。如果类型未知，则该值为空字符串。 |

> Blob.type 也就是File的继承的type属性；size也同理，在上传完毕后打印 file.type 和 file.size 即可看见过文件大小和类型。

| 方法名       | 描述                                                         |
| ------------ | ------------------------------------------------------------ |
| Blob.slice() | 方法用于创建一个包含源 Blob的指定字节范围内的数据的新 Blob 对象。 |

```js
const str = "hello";
const blob = new Blob([str]);   // 将str转换为blob对象
const read = new FileReader();
const slice = blob.slice(0,2);  // 进行切片
read.readAsText(slice)
read.onload = ()=>{
    console.log(read.result);  // he
}
```

**用于切片文件**

> 用 blob 的 slice 方法将文件分片

```js
const CHUNK = 1024 * 1024;  // 每片大小
const blobList = [];        // 存储最终结果
Input.onchange = (e) => {
    const file = e.target.files[0];
    if (!!file) {
        let start = 0;
        let end = 0;
        for (let i = 0; i < Math.ceil(file.size / CHUNK); i++) {  // ceill向上取整
            end = start + CHUNK;  // 初始化end
            blobList.push(file.slice(start, end)); // 添加都结果数组
            // blobList[i] = file.slice(start, end);  // 换个写法
            // console.log(file.slice(start, end));
            start = end;  // 重置 start
            // console.log(file.size);
            // console.log(blobList);
        }
    }
}
```

**组合切片文件**

> `Blob( array, options )` 构造函数接受一个数组，直接将结果数组传入即可。

```js
const makeBlob = new Blob(blobList);  // 组合起切片的文件
const read = new FileReader();
read.readAsDataURL(makeBlob);         // 以DataURL格式读取
read.onload = () =>{...}
```

> 总结：
>
> File 继承 Blob；使用Blob.slice方法可对文件进行切片，分批上传。
>
> Blob 还有很多关于文件的操作这里就不深入了

## 其他

### JavaScript 类型转换

![图片描述](data:image/gif;base64,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)

### 回调地狱

> 什么是回调地域：一个方法套着一个方法，一个方法依赖于另一个的执行结果，使用回调的方式相互嵌套。
> 这会导致代码很丑陋，不方便后期维护

```js
//回调地域
setTimeout(function () {  //第一层
    console.log('--');
    setTimeout(function () {  //第二程
        console.log('--');
        setTimeout(function () {   //第三层
            console.log('--');
        }, 1000)
    }, 2000)
}, 3000)
```

> 使用 **promise** 解决回调地域，用 **then** 进行链接

```js
function fn(str){
    var p=new Promise(function(resolve,reject){
        //处理异步任务
        var flag=true;
        setTimeout(function(){
            if(flag){
                resolve(str)
            }
            else{
                reject('err')
            }
        })
    })
    return p;
}

fn('conent')
.then((data)=>{
    console.log(data);
    return fn('conent');
})
.then((data)=>{
    console.log(data);
    return fn('conent')
})
.then((data)=>{
    console.log(data);
})
.catch((data)=>{
    console.log(data);
})
```

> 使用 **async/await** 解决回调地域，**async** 声明的函数会变成异步并且返回数据时自动封装为一个Promise对象

```js
async function fn() {
    var flag = true;
    if (flag) {
        return 'content';
    }
    else{
        throw 'err'
    }
}
fn()
.then(data=>{
    console.log(data);
})
.catch(data=>{
    console.log(data);
})
```

> **await** 可以用来解析 **promise** 对象中的数据；**await** 具有等待效果，在他前面的 **await** 语句没有执行完的话是不会执行后面的语句；**await** 必须用在 **async** 修饰的方法上

```js
//封装一个返回promise的异步任务
function fn(str) {
    var p = new Promise(function(resolve, reject) {
        var flag = true;
        setTimeout(function() {
            if (flag) {
                resolve(str)
            } else {
                reject('处理失败')
            }
        }, 1000)
    })
    return p;
}

//封装一个执行上述异步任务的async函数
async function test() {
    var res1 = await fn('武林要以和为贵'); // await直接拿到fn()返回的promise的数据，并且赋值给res
    console.log("1");
    var res2 = await fn('要讲武德');
    console.log("2");
    var res3 = await fn('不要搞窝里斗');
    console.log(res1, res2, res3);
}
//执行函数
test();
```

### debugger

> debugger调试语句用于停止执行 JavaScript，并调用 (如果可用) 调试函数。

```js
for (let i = 0; i < 5; i++) {
    if (i >= 4) {
        debugger;  // 代码执行到这里将会停止
    }
    console.log(i);
}
```

### 显参|隐参|默认参数

> 如果函数调用的时候，传入的参数个数大于显式参数的个数，参数只能通过 **Arguments** 对象来调用。
>
> ES6新增默认参数，用于在没有传入对应的参数时使用默认值，写法和 python 一样
>
> arguments 类对象数组 用于接收到的参数 默认参数不算

```js
function foo(a, b) {  // 接受两个参数
    console.log(a);
    console.log(b);
    console.log(arguments[2]);  // 显示除 a、b 外的【隐参】参数
}
foo("友善", "和谐", "团结") // 传入三个参数

//默认参数
function foo(a, b = "和谐") {  //设置默认参数
    console.log(a);
    console.log(b);  // 和谐  --打印默认参数
}
foo("友善")
```

### 模板字符串

> ES6新增模板字符串
>
> **var str = \`hello ${variable} \`** 
> 反引号就是模板字符串 需要新内容可以 `${}` 包裹起来 模板字符串里面可以有单引号和双引号

```js
var name = "小瓜"
var str = `我叫${name},你叫什么？`
console.log(str);
```

### eval

> eval() 函数可计算某个 **字符串**，并执行其中的的 JavaScript 代码。

| 参数   | 描述                                                         |
| ------ | ------------------------------------------------------------ |
| string | 必需。要计算的字符串，其中含有要计算的 JavaScript 表达式或要执行的语句。 |

```js
eval("console.log('hello')")
```

> 不推荐使用；**eval 可读性差，也会降低性能**

### 箭头函数

> 传统函数非常相似，我们只是省略 function 关键字并在参数后添加一个胖箭头（=>）。
>
> 箭头函数表达式没有自己的 **this** ,**arguments **, **super**或 **new.target**；箭头函数不能使用new操作符；箭头函数没有 **prototype** 属性
>
> 箭头函数的 this 由上下文确定，本身无
> 一个参数时可以省略括号
> 一个返回时可以连 **花括号** 和 **return** 省略掉<br>一个表达式也可以省略花括号
>
> **this**：
>     永远指向**最后调用它的那个对象**。
>     箭头函数中没有 this 绑定，必须通过查找作用域链来决定其值，如果箭头函数被非箭头函数包含，
>     则 this 绑定的是最近一层非箭头函数的 this，否则，this为**undefined**

```js
// 普通函数
function sum(x) { return x + x;}
sum(5)
// 箭头函数写法
var sum = (x) => { return x + x;}
sum(5)
// 一个参数可以省略括号
var sum = x => { return x + x;}
// 一个返回值可以省略 return 和花括号
var sum = x => x + x;
// 一个表达式
var show = x => console.log(xx)
// 无参数
var show = () => { console.log(xx);}
```

> 返回对象字面量用括号包裹住
>
> 不加圆括号会以为要执行花括号里面的语句

```js
var sum = x => {
    return {i: 10}
}
// 简写
var sum = x => ({i: 10}) // 加圆括号

var sum = x => { i: 10 }
console.log(sum()); // undefined
```

### 解构赋值

> **解构赋值** 语法是一种 Javascript 表达式。通过 **解构赋值,** 可以将 **属性/值** 从 **对象/数组** 中取出，赋值给其他变量。
>
> 扩展符必须是最后一位 `...`，`Rest element must be last element`

```js
// 数组类型
let a, b, rest;
[a, b] = [10, 20];

console.log(a); // expected output: 10
console.log(b); // expected output: 20

[a, b, ...rest] = [10, 20, 30, 40, 50]; // 配合扩展符
console.log(rest);
// expected output: Array [30,40,50]

var x = [1, 2, 3, 4, 5];
var [y, z] = x;   //相当于直接定义了变量 y 和 z
console.log(y); // 1
console.log(z); // 2
```

> 默认值

```js
var a, b;

[a=5, b=7] = [1];
console.log(a); // 1
console.log(b); // 7

var {a = 10, b = 5} = {a: 3};

console.log(a); // 3
console.log(b); // 5
```

> 交换变量

```js
var a = 1;
var b = 3;

[a, b] = [b, a];
console.log(a); // 3
console.log(b); // 1
```

> 忽略某些返回值

```js
function f() {
  return [1, 2, 3];
}

var [a,, b] = f(); // 直接留空或空格
console.log(a); // 1
console.log(b); // 3

//忽略全部
[,,] = f();
```

> 剩余的值

```js
let [a, ...b] = [1, 2, 3];
//a = 1
//b = [2, 3]
```

> 解构字符串等
>
> 在数组的解构中，解构的目标若为可遍历对象，皆可进行解构赋值。

```js
let [a, b, c, d, e] = 'hello';
// a = 'h'
// b = 'e'
// c = 'l'
// d = 'l'
// e = 'o'
```

> 解构对象

```js
var o = {p: 42, q: true};
var {p, q} = o;

console.log(p); // 42
console.log(q); // true
```

> 无声明赋值；如果要声明好了变量再进行结构赋值需要用 **括号进行包裹** 起来，不用括号由于解析器会报错

```js
var a, b;
({a, b} = {a: 1, b: 2});
```

> 给新的变量名赋值；使用 : 冒号

```js
var o = {p: 42, q: true};
var {p: foo, q: bar} = o;

console.log(foo); // 42
console.log(bar); // true 
```

> 给新的变量命名并提供默认值

```js
var {a:aa = 10, b:bb = 5} = {a: 3};

console.log(aa); // 3
console.log(bb); // 5
```

> 用在获取数据上简化操作

```js
async showData(id) {
  // 解构返回的data属性
  const { data: res } = await this.$http.get('getdata/' + id) // 配合插件
  // 直接解析data并更名为res
  this.content = res.data;
}
```

> 用于导入指定组件

```js
// 按需导入
import {Form,FormItem,Input,Button} from 'element-ui'
```

### call、apply、bind

> `bind`、`call`、`apply` 方法用于改变this指向
>
> call 、bind 、 apply 这三个函数的第一个参数都是 this 需要指向的对象

```js
 var obj = {
    name: "小李",
    age: 18,
    myfun() {
        console.log(this.name, this.age);
    }
}
var obj1 = {
    name: "小张",
    age: 20
}

obj.myfun()              //小李 18
obj.myfun.bind(obj1)()   //小张 20
obj.myfun.call(obj1)     //小张 20
obj.myfun.apply(obj1)    //小张 20
```

> 第二个参数的区别

```js
var obj = {
    name: "小李",
    myfun(a, b) {
        console.log(this.name + "要去" + a + "和" + b);
    }
}
var obj1 = {
    name: "小张",
}
obj.myfun.bind(obj1, "上海", "北京")()
obj.myfun.call(obj1, "上海", "北京")
obj.myfun.apply(obj1, ["上海", "北京"])
```

> bind则是返回一个**函数**需要运行，他的参数和 call 一样
>
> apply 和 call 会直接运行
>
> apply 和 call 的区别是 call 接受的参数形式不同；apply 的所有参数都必须放在一个数组里面传。

### getter/setter

> **get** 语句作为函数绑定在对象的属性上,当访问该属性时调用该函数。
>
> **set** 语法可以将一个函数绑定在当前对象的指定属性上，当属性被赋值时，你所绑定的函数就会被调用。

```js
var person = {
  _name: '崔三娘',
  get name() {
      console.log('执行了get');
      return this._name
  },
  set name(newName) {
      console.log("执行了set");
      this._name = newName
  }
}
console.log(person._name);
person.name = "宁红叶";
console.log(person.name);
```

> 注意这个 **name** 和 **_name**

### 关键字 in

> in 操作符用来判断某个属性属于某个对象，可以是对象的直接属性，也可以是通过 prototype 继承的属性；也就是 **自身** 属性加 **继承** 属性。

```js
console.log('a' in { a: 'ohh' }); // true
console.log('a' in ['a', 'b']);   // false
console.log(0 in ['a', 'b']);     // true
console.log("__proto__" in {});   // true
console.log("length" in []);      // true
```

> `in` 和 `hasOwnProperty()` 区别
>
> in判断的是对象的所有属性，包括对象实例（自身）及其原型（继承）的属性；
> 而 hasOwnProperty则是判断对象实例（自身）的是否具有某个属性。

```js
var a = {
  name: 'zan'
}

console.log('name' in a);  // true
console.log('__proto__' in a);  // true
console.log(a.hasOwnProperty('name'));  // true
console.log(a.hasOwnProperty('__proto__'));  // false
```

### 阻止默认行为

> 阻止 `<a>` 标签的默认行为
>
> * `href="#"`
>
>   跳转至假链接；严格来说这不算假链接他是跳转至 # 位置
>
> * `href="javascript:void(0)"`
>
>   推荐使用这种写法；原理是执行javascript语句返回空内容

```html
<a href="#">超链接</a>
<a href="javascript:void(0)">超链接</a>
```

> 阻止元素默认行为
>
> `event.preventDefault()` 和 `return false`
>
> 例如取消`<a>`标签跳转；表单提交；表单重置等

```html
<form>
  <a href="https://www.baidu.com/" target="_blank" id="goto">超链接</a>
  <div>
    <label for="id"
      >账号：
      <input type="text" id="id" />
    </label>
  </div>
  <div>
    <label for="psd"
      >密码：
      <input type="password" id="psd" />
    </label>
  </div>
  <input type="submit" value="登录" id="post" />
  <input type="reset" value="重置" id="reset" />
</form>
```

```js
document.getElementById("goto").onclick = function (e) {
  e.preventDefault();
};
document.getElementById("post").onclick = function (e) {
  e.preventDefault();
};
document.getElementById("reset").onclick = function (e) {
  e.preventDefault();
};
```

> 浏览器兼容写法

```js
function stopDefault( e ) { 
  if ( e && e.preventDefault ){
    e.preventDefault(); //阻止默认浏览器动作(W3C) 
  }else {
    window.event.returnValue = false; //IE中阻止函数器默认动作的方式 
  }
  return false; 
}
```

### for-in&for-of

> * **for...in**
>
>   语句以任意顺序遍历一个对象的 **除Symbol** 以外的 **可枚举属性** ，包括 **继承** 的可枚举属性；
>
>   for-in总是得到对象的 **key** 或数组、字符串的 **下标**；
>
>   for-in会遍历到除非自身的属性（继承属性）若指向遍历自身属性可以配合 `Object.hasOwnProperty`；
>
>   key 将是 **string** 类型。
>
> * **for...of**
>
>   for-of 语句在可迭代对象（包括 Array，Map，Set，String，TypedArray，arguments 对象等等）上创建一个迭代循环，调用自定义迭代钩子，并为每个不同属性的值执行语句；
>
>   在每次迭代中，将不同属性的 **值** 分配给变量；
>
> for...of 可以配合 `entries()` 遍历key<br>`for (const [key, value] of Object.entries(obj)) {...}`

**for-in**

```js
// for-in
var obj = {a:1, b:2, c:3};

for (var prop in obj) {
  console.log("obj." + prop + " = " + obj[prop]); // obj[key]
}
// Output:
// "obj.a = 1"
// "obj.b = 2"
// "obj.c = 3"

// 遍历数组
var list = ["A", "B", "C"]
for (const key in list) {
    console.log(key);  // 0 1 2
}
// 遍历字符串
var str = "hello"
for (const key in str) {
    console.log(key); // 0 1 2 3 4
}
```

**for-in 包括了继承属性**

```js
function A() {
    this.name = "shao"
}
A.prototype.age = 18;  // 原型对象上的属性

var a = new A();
for (const key in a) {
    console.log(key);
}
// name
// age   (prototype属性)
```

**for-in 配合** `Object.hasOwnProperty` **使用**

```js
for (const key in object) {
    if (Object.hasOwnProperty.call(object, key)) {  // 调用hasOwnProperty判断是否为自身属性
        const element = object[key];
    }
}
// 打印只为自身属性
```

<hr>

**for-of**

```js
var list = ["A", "B", "C"]
for (const iterator of list) {
  console.log(iterator);
}
// A
// B
// C

// 字符串
let iterable = "boo";
for (let value of iterable) {
  console.log(value);
}
// "b"
// "o"
// "o"

// arguments
(function() {
  for (let argument of arguments) {
    console.log(argument);
  }
})(1, 2, 3);
// 1
// 2
// 3

// 普通对象
const obj = {name:"Li",age:18}
for (const iterator of obj) {
    console.log(iterator); 
}
// Uncaught TypeError: obj is not iterable 报错
```

**对于for...of的循环，可以由break, throw  continue    或return终止。在这些情况下，迭代器关闭。**

```js
var list = ["A", "B", "C"]
for (const iterator of list) {
    if (iterator === "B"){
        continue
    }
    console.log(iterator);
}
// A C
```

> for...in 和 for...of 的一些区别

```js
Object.prototype.objCustom = function() {};
Array.prototype.arrCustom = function() {};

let iterable = [3, 5, 7];
iterable.foo = 'hello';
// for..in
for (let i in iterable) {
  console.log(i); // logs 0, 1, 2, "foo", "arrCustom", "objCustom"  包含prototype属性
}
// for..in + hasOwnproperty
for (let i in iterable) {
  if (iterable.hasOwnProperty(i)) {
    console.log(i); // logs 0, 1, 2, "foo"  没有prototype属性
  }
}
// for..of
for (let i of iterable) {
  console.log(i); // logs 3, 5, 7  // 没有继承
}
```

> 总结：
>
> for-of 功能很强大除了上面所例还可以编译 set、map、dom集合等等。
>
> 无论是for...in还是for...of语句都是迭代一些东西。它们之间的主要区别在于它们的迭代方式。
>
> for...in 语句以任意顺序迭代对象的 **可枚举属性**。
>
> for...of 语句遍历 **可迭代对象** 定义要迭代的数据。
>
> for...of 只能遍历包含迭代器的对象 **Iterator(迭代器)**
>
> for...in 和 for...of 都可以中途continue、break等等
>
> Array 或 Map 拥有默认的迭代行为，而其他类型（比如Object）则没有。<br>所以直接使用 for...of 遍历对象是会报错的
>
> 若果只是简单应用来说的话：<br>for...in 以 **键** 来遍历，for...of 以 **值** 来遍历；<br>for...in 遍历包括 **继承属性**<br>for...of 则 **不包括继承属性**
>
> forEach是数组遍历方法 `array.forEach(function(currentValue, index, arr), thisValue)`
>
> 关于遍历数组性能：for循环 > for-of > forEach > for-in

### Symbol&BigInt

#### **SymBol**

> symbol 是一种基本数据类型；每个从 `Symbol()` 返回的symbol值都是唯一的。一个 symbol 值能作为对象属性的标识符；这是该数据类型仅有的目的。Symbol 生成一个全局唯一的值。
>
> Symbol 数据类型的特点是唯一性，即使是用同一个变量生成的值也不相等。
>
> 可选接受一个 description 参数作为 **描述**，需字符串类型

| 方法名                         | 描述                                               |
| ------------------------------ | -------------------------------------------------- |
| SymBol.for()                   | 创建一个全局Symbol                                 |
| SymBol.keyFor()                | 读取一个全局Symbol                                 |
| Object.getOwnPropertySymbols() | 方法返回一个给定对象自身的所有 Symbol 属性的数组。 |

```js
const symbol1 = Symbol();
const symbol2 = Symbol(42);
const symbol3 = Symbol('foo');

console.log(typeof symbol1);
// expected output: "symbol"

console.log(symbol2 === 42);
// expected output: false

console.log(symbol3.toString());
// expected output: "Symbol(foo)"

console.log(Symbol('foo') === Symbol('foo'));
// expected output: false
```

**Symbol 数据类型的另一特点是隐藏性，for···in，object.keys() 不能访问**

```js
let id = Symbol("id");
let obj = {
    [id]: 'symbol'
};
for (let option in obj) {
    console.log(obj[option]); //空
}
```

**Object.getOwnPropertySymbols**

> `Object.getOwnPropertySymbols(obj);` 方法让你在查找一个给定对象的符号属性时返回一个symbol类型的数组。
>
> 注意，每个初始化的对象都是没有自己的symbol属性的，因此这个数组可能为空，除非你已经在对象上设置了symbol属性。

```js
"use strict"
let id = Symbol("id");
let obj = {
    [id]: 'symbol'
};
let array = Object.getOwnPropertySymbols(obj);
console.log(array); //[Symbol(id)]
console.log(obj[array[0]]);  //'symbol'
```

**全局共享的 Symbol**

> 虽然这样保证了Symbol的唯一性，但我们不排除希望能够多次使用同一个symbol值的情况。
> 为此，官方提供了全局注册并登记的方法：`Symbol.for(key)`  key选填；如果不填参数则是 `Symbol(undefined)` 一个字符串，作为 symbol 注册表中与某 symbol 关联的键（同时也会作为该 symbol 的描述）。<br>既然都要设置全局所以我们还是给个描述好，因为下面的 `Symbol.keyFor()` 方法是必须填入描述内容进行查找

```js
let name1 = Symbol.for('name'); //检测到未创建后新建
let name2 = Symbol.for('name'); //检测到已创建后返回
console.log(name1 === name2); // true
```

**Symbol.keyFor()**

> 方法从全局的symbol注册表设置和取得symbol。
>
> `Symbol.keyFor(key)` key为 **必填** 参数；通过描述内容找到指定的symbol

```js
let name1 = Symbol.for('name'); // 写
let name2 = Symbol.for('name'); // 读
console.log(Symbol.keyFor(name1)); // 'name'  // 打印表示符“name”
console.log(Symbol.keyFor(name2)); // 'name'
// 如果没有设置标识符
let name3 = Symbol.for();
console.log(Symbol.keyFor(name3)); // 'undefined'
```

> 设置为对象属性名是对象拥有“私有属性”

```js
"use strict";
const NAME = Symbol();
const person = {
    [NAME]:"Li",  // 拿Symbol来设置键名
    age:18,
    func:function(){
        console.log(this[NAME]);  // Li
        console.log("========");
    }
}
person.func();  // Li
for (const iterator of Object.keys(person)) {
    console.log(iterator);  // age func
    // 没有遍历出由Symbol作为键名的属性
}
// 直接当键名
const person1 = {
    [Symbol()]: "Li", 
    [Symbol()]: "Lee", 
    age: 18,
    func: function () {
        const getKey = Object.getOwnPropertySymbols(this); // 读取全部Symbol
        console.log(this[getKey[0]]);  // Li
        console.log(this[getKey[1]]);  // Lee
        console.log(this.age);         // 18
    }
}
person1.func();  // Li Lee 18
```

> Symbol是可以不传递参数 `Symbol()`
>
> **总结：**<br>Symbol 是用来做“唯一值”的类型，他的数据独一无二；symbol作为对象的属性是不能用for in 和Object.keys()来枚举的。JSON.stringify()将对象转换成JSON字符串的时候，Symbol属性也会被排除在输出内容之外
>
> **运用场景：**<br>我们想区分两个属性，其实我们并不在意，这两个属性值究竟是什么，我们在意的是，这两个属性绝对要区分开来！<br>解决字面量冲突。<br>设置为对象属性名是对象拥有“私有属性”。

#### **BigInt**

> 不需要 new 直接 = 即可
>
> 是一种内置对象，它提供了一种方法来表示大于 253 - 1 的整数。这原本是 Javascript中可以用 Number 表示的最大数字。BigInt 可以表示任意大的整数。

```js
const hugeBin = BigInt("0b11111111111111111111111111111111111111111111111111111");
console.log(hugeBin);  // 9007199254740991n
console.log(hugeBin > 2000000000000n); // true 进行判断
console.log(typeof hugeBin);   // bigint
console.log(hugeBin + 1);  // 报错
```

> 需要注意的地方
>
> 1. 不可以和 Number 实例混用
> 2. 不能用于 Math 对象中的方法
> 3. 使用 BigInt 运算时，带小数的结果会被取整
> 4. 在 JSON 中使用时，需要自己实现 `BigInt.prototype.toJSON`
> 5. 因为对 BigInt 的操作并不是常数时间，因此 BigInt 不适合用于密码学
>
> BigInt 与 Number 进行转换时可能会出现精度丢失问题

### map&set

> Map、Set是es6新出的两引用数据类型，Map 类似 Object 而 Set 则类似 Array

#### Map

> Map 以键值对方式存储数据，这一点很像Object
>
> Map 与 Object 的不同之处
>
> * Object 对象有原型， 也就是说他有默认的key值在对象上面， 除非我们使用Object.create(null)创建一个没有原型的对象，否则就有很多继承属性；Map没有默认的key值；
> * 在Map中，key值可以是任何基本类型包括但不限于(String、Number、Boolean、undefined...)，甚至是对象。
> * map 对于 Object内存占用更低
> * Map 是 **iterable** 的，所以可以直接被迭代。Object需要以某种方式获取它的键然后才能迭代

| 方法名 | 描述                |
| ------ | ------------------- |
| size   | 获取长度            |
| get    | 获取指定键对应的值  |
| set    | 向map写入一个键值对 |
| has    | 是否包含该键        |
| delete | 删除一个键及值      |
| clear  | 清空map             |

```js
"use strict";
let map = new Map()
map.set("name","张三")
map.set(2021,11)    // 2021 => 11
map.set(true,true)  // true => true
map.set(()=>{},function(){})  // 箭头函数保存的结果为 ()=>{}=>function(){}
map.set({},{name:"Li"})
map.set(NaN,"非")  // NaN => "非"
map.set(undefined,4)
map.set(null,null)

console.log(map);
console.log("mapSize: " + map.size);
console.log(map.has(2021));  // true 是否包含2021这个键
console.log(map.get("name"));// 直接获取对应的键名
map.delete(NaN)     // 删除 NaN
console.log(map);  
map.clear()  // 清空
console.log(map);
```

> 唯一性；键名一样会覆盖

```js
let map = new Map()
map.set("one",330)
map.set("one",430)
console.log(map);  // Map(1) {'one' => 430}
```

**遍历方式**

* `forEach`

  map 是key进行forEach来遍历的；`map.forEack((val,key)=>{})`

* `forOf + keys()`

  使用 keys() 方法为 map 对应键创建遍历器（不含继承的）

* `forOf + values()`

  使用 values() 方法为 value 对应值创建遍历器（不含继承的）

* `forOf + entries()`

  使用 entries() 方法为对应键值(包含键和值)对创建遍历器（不含继承的）
  
* `forOf`

  直接forOf和 forOf + entries() 效果是一样的

```js
// forEach
map.forEach((val, key) => {
    console.log("key: " + key + "\tval: " + map.get(key));
})
// keys()
for (const iterator of map.keys()) {
    console.log(iterator);  // key
}
// values()
for (const iterator of map.values()) {
    console.log(iterator);  // val
}
// entries
for (const iterator of map.entries()) {
    console.log(iterator);  // [key,val]
}
for (const [key, val] of map.entries()) {
    console.log(key);  // key
    console.log(val);  // val
}
for (const iterator of map) {
    console.log(iterator);  // [key,val]
}
for (const [key, val] of map) {
    console.log(key);  // key
    console.log(val);  // val
}
```

> 总结：<br>键值对方式存储数据，键可以是任意类型，键为引用类型是保存的是引用地址，如果键名是匿名对象或者函数则比较麻烦删除。
>
> 使用数字下标访问是不可行的例：`map[0]`<br>因此就不能使用普通的for进行遍历

#### Set

> Set 和数组非常相似，”存值不存键“；
>
> Set对象是值的集合，你可以按照插入的顺序迭代它的元素。 Set中的元素只会出现一次，即 Set 中的元素是 **唯一** 的。
>
> Set 对象允许你存储任何类型的唯一值，无论是原始值或者是对象引用，只能唯一后面重复的会 **覆盖** 前面的相同的值。
>
> 另外，NaN和undefined都可以被存储在Set 中， **NaN之间被视为相同的值**（NaN被认为是相同的，尽管 NaN !== NaN）

**Set 也同样有自己的一些方法**

| 方法名 | 描述           |
| ------ | -------------- |
| size   | 长度           |
| add    | 添加元素       |
| delete | 删除指定元素   |
| has    | 是否包含改元素 |
| clear  | 清空Set        |

```js
const set = new Set()
set.add(1)           // 添加Number
set.add("str")       // 添加String
set.add(()=>{})      // 匿名函数
set.add({})          // 对象
set.add(function(){})// 函数
set.add(true)        // Boolean
set.add(undefined)   // undefined
set.add(null)        // null
//...等
console.log(set);
console.log(set.size);
console.log(set.has(1));
console.log(set.delete("str"));
console.log(set);
console.log(set.clear());
console.log(set);
```

**Array和Set之间转换**

```js
// Array 转换 Set
const list = ["Li", 23, null, { true: true }, null, undefined, 23]
const set = new Set(list);  // 构造函数直接传入数组
console.log(set);  // {'Li', 23, null, {…}, undefined}
// Set 转换 Array
const set = new Set(["Li", { true: true }, null, undefined, 23])
const list = [...set];  // 使用扩展符进行解析
console.log(list);      // ['Li', {…}, null, undefined, 23]
```

> 在 Array 转换为 Set 的时候可以发现自动帮我们去重了

**唯一性**

```js
const set = new Set([23, null, "Li"])
set.add(23)
set.add({})
set.add({})
set.add("Li")
set.add(NaN)
set.add(NaN)
console.log(set);  // {23, null, 'Li', {…}, {…}, NaNa}
```

> 可以看见23并没有添加成功或者说已经覆盖了之前的23，同样的字符串没有成功添加进去，对象是引用类型所以并不会覆盖。
>
> NaN 只添加进去了一个；NaN和undefined都可以被存储在Set 中， NaN之间被视为相同的值（NaN被认为是相同的，尽管 `NaN !== NaN` ）。

**遍历方式**

> Set 的遍历方式和 Map 类似，不过有些细节上的不同
>

* `forEach`

  map 是key进行forEach来遍历的；`map.forEack((val,key)=>{})`

* `forOf + keys()`

  使用 keys() 方法为 map 对应键创建遍历器（不含继承的）

* `forOf + values()`

  使用 values() 方法为 value 对应值创建遍历器（不含继承的）

* `forOf + entries()`

  使用 entries() 方法为对应键值对创建遍历器（不含继承的）

* `forOf`

  直接forOf和 forOf + entries() 效果是一样的

```js
"use strict"
const set = new Set(["Li", { true: true }, null, undefined, 23])

set.forEach(val => {
    console.log(val); // Li {true: true} null undefined 23
})

for (const key of set.keys()) {
    console.log(key); // Li {true: true} null undefined 23
}
for (const val of set.values()) {
    console.log(val); // Li {true: true} null undefined 23
}
for (const val of set.entries()) {
    console.log(val);
// ['Li', 'Li'] [{true:true}, {true:true}] [null, null] [undefined, undefined] [23, 23]
}
for (const [key, val] of set.entries()) {
    console.log(key);
    console.log(val);
// Li Li {true: true} {true: true} null null undefined undefined 23 23
}
for (const iterator of set) {
    console.log(iterator); // Li {true: true} null undefined 23
}
for (const [key, val] of set) {
    console.log(key);
    console.log(val);
    // .for is not iterable
}
```

> 可见 Set 遍历和 Map 很相似，也是可以用 forEach、forOf；不同的是 Set 中的"key"是和”value“是相同的，使用 keys() 和 values() 效果相同，不过需要注意的是不能使用 <br>`for (const [key,val] of set) {}` 也就是两个参数，一个参数可以，两个则会报错 <span style="color:red">Uncaught TypeError: .for is not iterable</span> 没有”遍历器“
>
> 总结：
>
> "没有键概念"（键和值相同）不能重复值，会覆盖，对象不可以去重复。
>
> 不能数字下标访问，可以很容易与数组进行转换，Set也是”干净的“与Map相同不用担心[[prototype]]
>
> 不用担心扩展符兼容问题，可以用Set的了版本已经很新了

### defer和async

> 这里的 defer 和 async 是指 `<script></script>` 标签的两个属性
>
> 当浏览器碰到 script 脚本的时候：
>
> 1. `<script src="script.js"></script>`
>
>    没有 **defer** 或 **async**，浏览器会立即加载并执行指定的脚本，也就是说不等待后续载入的文档元素，读到就加载并执行。
>
> 2. `<script async src="script.js"></script>`
>
>    有 **async**，加载和渲染后续文档元素的过程将和 **script.js** 的加载与执行并行进行（异步）。
>
> 3. `<script defer src="myscript.js"></script>`
>
>    有 **defer**，加载后续文档元素的过程将和 **script.js** 的加载并行进行（异步），但是 script.js 的执行要在所有元素 **解析完成之后**，**DOMContentLoaded** 事件触发之前完成。
>
> 然后从实用角度来说呢，首先把所有脚本都丢到 `</body>` 之后是最佳实践，因为对于旧浏览器来说这是唯一的优化选择，此法可保证非脚本的其他一切元素能够以最快的速度得到加载和解析。
>
> `DOMContentLoaded`：<br>当 HTML 文档解析完成就会触发 **DOMContentLoaded**，而所有资源加载完成之后，load 事件才会被触发。 
>
> ![deferandasync](data:image/gif;base64,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)
>
> **正常模式：**<br>简单来说，普通模式情况下 **下载 js 和执行 js 的时候文档渲染就会停止等待 js** 加载完成再继续渲染，这就导致了一个情况如果先加载 js ，js 加载完成了但是文档还没有加载完成那么 js 里面对于操作 dom 的语句就会报错。
>
> **async模式：**<br>普通模式下下载和执行 js 文档渲染是会停止的（无论什么模式 js 执行时文档都会停止渲染），但是 **async 模式可以文档下载和 js 下载同步执行** 等下载完后会**立即执行**。
>
> **feder模式：**<br>在这个模式下拥有和 async 模式一样的异步下载功能，但与之不同的是 feder 模式 **下载完不会立即执行**  而是等待整个文档渲染完后才执行 js 代码。
>
> 一般情况下其实不用考虑这么多，把正常模式  `<script>` 标签放在 `<body>` 标签外面或里面最后一行等待文档加载完执行即可。

### 闭包 (Closure)

> 闭包具有 “保存” 和 “保护” 特性，保护就像是保护变量不污染全局，保存则是闭包里面的值不会释放。
>
> 『函数』和『函数内部能访问到的变量』的总和，就是一个闭包。
>
> 常见闭包为什么需要返回函数或者立即执行函数，因为这样可以形成一个局部变量 **return** 出去也是因为那样才可以获取闭包里面的内容。

```js
!function () {
    let count = 50;
    window.more = function (i) {
        count += 1;
        console.log(count); // 引用count
    }
    window.less = function (i) {
        count -= 1;
        console.log(count);
    }
}()

window.more();  // 51
window.more();  // 52
window.less();  // 51
```

> 上面我们可以看见在第一次执行了 window.more() 之后第二次再次执行 count 的值并没有重置为 50 而是 51，之后执行 window.less() 也证实了值还是没有重置依然是 52，这就是闭包形成了对局部数据的“保护”。
>
> 在上面代码中照理说立即执行函数执行完了内存就因该释放 count 的值也将释放，但是由于有函数引用了 count 变量的值 **(window.more 和 window.less)** 也就是说这个值还得用所以并没有释放，**window.more 与 count 形成了闭包 window.less 与 count 形成了闭包**
>
> ![closure](data:image/gif;base64,R0lGODlhdAEWAbMAAOny5zNKWTI4rcNu29pcZgD/ANqpV5UyOb8SFyqC3UeEnzyv4FbJ5kni/v8AACcsNSH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDUgNzkuMTYzNDk5LCAyMDE4LzA4LzEzLTE2OjQwOjIyICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RDlEQjdCQzlGN0JCMTFFQzlDNTRDOUZENkQxN0NDNUQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RDlEQjdCQ0FGN0JCMTFFQzlDNTRDOUZENkQxN0NDNUQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpEOURCN0JDN0Y3QkIxMUVDOUM1NEM5RkQ2RDE3Q0M1RCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpEOURCN0JDOEY3QkIxMUVDOUM1NEM5RkQ2RDE3Q0M1RCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PgH//v38+/r5+Pf29fTz8vHw7+7t7Ovq6ejn5uXk4+Lh4N/e3dzb2tnY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)
>
> 通俗讲就是方法内有别的方法在 **阻挡**，导致内存不能释放形成局部内容保存。

```js
"use strict"
function A() { }
function B() {
  var num = 10;
  A.more = function () {
    num++;
    console.log(num);
  }
  A.less = function () {
    num--;
    console.log(num);
  }
}
B();
A.more() // 11
A.less() // 10
```

**用在节流和防抖上**

```js
function payMoney(){
  ……  // 需要执行的函数，但是this没有指向标签
}

function debounce(func, delay) {  // 防抖函数
    let timer;                    // 储存计时器
    return function () {          // 返回函数
        clearTimeout(timer);      // 在计时之前清除(引用了timer，形成闭包)
        timer = setTimeout(() => {
            let context = this;   // 获取this(当前this指向dom标签)
            let args = arguments; // 获取参数
            func.apply(context, args);// 修改this指向并传入参数(this指向dom标签)
        }, delay);
    }
}

button.addEventListener("click", debounce(payMoney, 1000))
```

> 上面的 **timer** 变量用于保存定时器但是 `setTimeout()` 是异步的这样就导致不同步执行，函数执行完后timer将会被释放，所以我们需要保存这个 timer 不被释放，这里就返回了一个函数内调用了变量 `clearTimeout(timer);` 使得 timer 不被释放这里就形成了闭包。

### data-*

> 在 HTML5 中我们可以使用 `data-` 前缀设置我们需要的自定义属性，来进行一些数据的存放。
>
> `data-名称="数据"`

```html
<div data-index="one"></div>
```

> 使用 `el.dataset` 就可以获取到 `data-` 定义的内容，是以一个键值对形式存储

```js
// el.dataset
// DOMStringMap
{
  a: "zhang"
  b: "18"
}
```
