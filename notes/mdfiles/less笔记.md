# less笔记

> Less 是一个 CSS 预处理器，最终结果都会编译成 CSS
>
> **npm：**
>
> `install -g less`
>
> `$ lessc styles.less > styles.css`
>
> **CDN：**
>
> `<link rel="stylesheet/less" type="text/css" href="styles.less" />`
>
> `<script src="https://cdn.jsdelivr.net/npm/less@4" ></script>`

## 变量

### 变量的声明使用

> 以 **@** 开头定义变量
>
> 语法： @variable : val;
>
> less变量可以作为 **选择器名称**、**属性名称**、**属性值**
>
> 使用时直接键入以@名称

```less
/*less*/
//定义变量
@color:#999;               // 定义颜色
@color:pink;               // 包括字符串，不需要双引号
@color:rgb(255,255,255);      
@select:box;
@va:background;
@borderStyle: border;
@Solid:1px solid #000;
//使用变量
p{
    color:@color;         // 作为属性值
    @{va}:pink;           // 作为属性名               
}
.@{select}{               // 作为选择器名称
    color:red;
}
#app{
    @{borderStyle}:@Solid // 属性名和属性值使用变量
}

/*生成的css*/
p {
  color: #ffffff;
  background: pink;
}
.box {
  color: red;
}
#app {
  border: 1px solid #000;
}
```

> url变量
>
> @url : "..img";        这里需要加引号,加引号是为了防止误识别成两个值

```less
/* Less */
@images: "../img";//需要加引号
body {
    background: url("@{images}/dog.png");//变量名 必须使用大括号包裹
}

/* 生成的 CSS */
body {
    background: url("../img/dog.png");
}
```

### 变量集

> 声明一个变量里面有多个内容；
>
> 结构:   @name: { 属性: 值; 属性：值；};
>
> 使用：@name();        就像是使用方法一样

```less
/* Less */
@bigBox:{			声明集合
  width: 400px;
  height: 300px;
  background-color: blueviolet;
  border: 1px solid #000;
  color: #000;
  border-radius: 6px;
}
#app{
  display:block;
  @bigBox();        使用变量
}
 
/* 生成的 CSS */
#app {
  display:block;
  width: 400px;
  height: 300px;
  background-color: blueviolet;
  border: 1px solid #000;
  color: #000;
  border-radius: 6px;
}
```

### 变量作用域

> 就近原则，没有则往上找

```less
/* Less */
@color:pink;            离得远
#app{
  @color:black;         这个里的最近
  p{
    @width:300px;       不符合
    background-color: @color;
  }
}

/* 生成的 CSS */
#app p {
  background-color: black;      "black"
}
```

### 变量运算

> 加减法时，以第一个数据的单位为基准
>
> 乘除法时，注意单位一定要统一
>
> 需要计算的值可以选择用（）包括起来，也可以不使用括号<br>但是除法由于 **\\** 符合特殊一定要用（）括起来

```js
/* Less */
@width:200px;
@height:200px;
.box{
    width: @width + 50px;            //标准示范
    height: @height + 50;            //可以省略单位，默认px
    line-height: @height + 2rem;     //错误示范，会把 2rem 转成 px
}
.box{
  width: @width *2;                  //没有使用括号
  height: (@height / 2);             //除法必须使用括号才能正常使用
}

/* 生成的css */
.box {
    width: 250px;     
    height: 250px;
    line-height: 202px;              //rem被转化成px
}
.box {
    width: 400px;
    height: 100px;
}
```

> 对颜色进行运算

```less
/* Less */
@color:#333333;
#app{
    color: @color*2;
    border-top: 1px solid (@color/2) ;
    border-right:1px solid  @color + #111;
    border-left:1px solid  @color + #111111;
}

/* 生成的css */
#app {
  color: #666666;
  border-top: 1px solid #1a1a1a;
  border-right: 1px solid #444444;
  border-left: 1px solid #444444;
  border-bottom: 1px solid #fff3fe;
}
```

### 可变变量

> 用变量去定义变量，类似于php的可变变量
>
> 语法：@@msg；

```less
/* Less */
@str: "点击跳转";
@msg: str;
.box::after{
  content: @@msg;		      
}
/* 生成的css */
.box::after {
  content: "点击跳转";          //生成的是str的内容
}
```

### 转义

> 转义后内容保持原样输出
>
> 语法：~"(……)"
>
> 从 Less 3.5 开始，可以简写为:
>
> (……)

```less
/* Less */
@min768: ~"(min-width: 768px)";
.element {
    @media @min768 {
    font-size: 1.2rem;
  }
}
/* 生成的css */
@media (min-width: 768px) {
  .element {
    font-size: 1.2rem;
  }
}
```

## 嵌套

> less有非常方便的嵌套方法
>
> 语法：
>
> .box{
>
> ​    .child{……}
>
> }

```less
/*　Less */
#header{
  width: 200px;
  height: 150px;
  border: 2px solid #666;
  p{
    border: 2px solid red ;           //嵌套子级标签
  }
  .child{
    color: white;                     //指定类名
    background-color:black;
  }
}
/* 生成的css */
#header {
  width: 200px;
  height: 150px;
  border: 2px solid #666;
}
#header p {
  border: 2px solid red ;
}
#header .child {
  color: white;
  background-color: black;
}
```

### & 的作用

> & 代表上一级元素

```less
/* Less */
#header{
  &::after{
    content: "";
    display: block;
    visibility: hidden;
  }
}
/* 生成的css */
#header::after {            //&等同于#header
  content: "";
  display: block;
  visibility: hidden;
}
```

### 媒体查询

> 嵌套媒体查询

```less
/* Less */
.component {         
  width: 300px;
  @media (min-width: 768px) {
    width: 600px;
    @media  (min-resolution: 192dpi) {
      background-image: url(/img/retina2x.png);
    }
  }
  @media (min-width: 1280px) {
    width: 800px;
  }
}


/* 生成的css */
.component {
  width: 300px;       
}
@media (min-width: 768px) {
  .component {
    width: 600px;
  }
}
@media (min-width: 768px) and (min-resolution: 192dpi) {
  .component {
    background-image: url(/img/retina2x.png);
  }
}
@media (min-width: 1280px) {
  .component {
    width: 800px;
  }
}
```

## 混合方法(Mixins)

> 允许你将一个类嵌入到另一个类中，被嵌入的类也可以看作变量
>
> 使用时直接键入名称即可。
>
> 注意：( ) 是可选的，你也可以不写括号，写成 @name;
>
> 无括号已弃用，但还是可以使用，建议是使用带（）的写法
>
> 与声明集合有所不同，集合是要@，混合方法则不用

### 无参方法

> 语法：
>
> * 声明：`.car{ 属性 : 属性值 }` 或者  `.car(){ 属性 : 属性值 }` 
>
>   建议使用括号这样就不会混乱，而且加了括号后声明是不会执行里面的代码的
>
> * 用法：`#header{ .car;  }`  或者 `#header{ .car(); }`

```less
/*Less*/
.card{   // 定义一个无参方法
//.card(){   // 定义一个无参方法 不会执行
  width: 200px;
  height: 200px;
  background: pink;
}
#header{
    .card;  //等价与.car()
}
/* 生成的css */
#header {
  width: 200px;               //将类名.car的所有属性混入到#header
  height: 200px;
  background: pink;
}

多个选择器的方法也是可以混合的
.a,#b{
    color: red;
}
.main{
    .a();
    //#b();    效果相同 任选
}
.main {
  color: red;
}
带伪类的混入
//less
.my-hover-mixin() {
  &:hover {
    border: 1px solid red;
  }
}
button {
  .my-hover-mixin();
}
//生成的css
button:hover {
  border: 1px solid red;
}
```

> 如果定义时没有括号那么 `.car{}` 会被直接渲染，如果刚好有个名为 .car 那就被污染了，而给了括号则不会直接渲染，需调用时才会渲染

```html
// 没有括号
<style less>
  .box{
      color:red
  }
  .box1{
      .box();
  }
</style>
<div class="box">div</div>
<div class="box1">div1</div>
<!-- 结果是两个div都变红了 -->
// 有括号
<style less>
  .box(){
      color:red
  }
  .box1{
      .box();
  }
</style>
<div class="box">div</div>
<div class="box1">div1</div>
<!-- 只有div1变红了 -->
```

> 如果指向定一个“方法”而不想“立即使用的话”就带括号好，带括号也更容易区分。

### 带参方法

> 允许根据需要传入参数，传入参数按照顺序

```less
/* Less */
.card(@a,@b){
    width: @a;
    height: @b;
    background: pink;
}
#header{
    .card(200px,200px);       //传入参数
}
/* 生成的css */
#header {
  width: 200px;
  height: 200px;
  background: pink;
}
```

### 默认参数方法

> 在没有传入参数的时候可以使用默认参数，使用 **:**
>
> `.car(@形参:默认值){...}`
>
> 传入参数要注意单位

```less
/* Less */
.card(@a:200px,@b:200px){
    width: @a;
    height: @b;
    background: pink;
}
#header{
    .card();                //没有传入参数
}
/* 生成的css */
#header {
  width: 200px;            //使用默认参数
  height: 200px;
  background: pink;
}
```

### 命名参数

> 命名参数就是指定 **参数名传入参数**，无须注意顺序（键名对应）
>
> `.card(@指定形参名称:值);`

```less
/* Less */
.card(@a:200px,@b:200px){
    width: @a;
    height: @b;
    background: pink;
}
#header{
    .card(@b:200px,@a:150px);                //没有传入参数
}
/* 生成的css */
#header {
   width: 150px;
   height: 200px;
   background: pink;
}
```

### 匹配模式

> 匹配模式就是定义多个方法，就像java重载，使用时根据传入参数使用合适方法
>
> 根据传入的参数将匹配度最高的混入其中，如果所有的匹配度都一样，会存在”覆盖“

```less
//less
.style(a,@z){         第一个方法
    content: "this a";
    background-color: blueviolet;
}
.style(b,@z){         第二个方法
    content: "this b";
    background-color: darkblue;
}
.style(c,@z){         第三个方法
    content: "this c";
    background-color: darkred;
}
.style(@_,@z){        第四个方法，两个参数都是变量
    border: 6px solid black;
    border-radius: 8px;
    color: white;
    display: block;
    width: 200px;
    height: 200px;
}
使用匹配方法
.box::after{
    content: "";
    .style(a,@z:1);
}

//生成的css
.box::after {
  content: "";
    第一个方法的内容
  content: "this a";          
  background-color: blueviolet;
    第四个方法的内容
  border: 6px solid black;
  border-radius: 8px;
  color: white;
  display: block;
  width: 200px;
  height: 200px;
}
```

> 以上的混入传入的第一个参数是 **a**   `.style(a,@z:1); ` 所以将第一个方法混入@z因为没有使用所以填什么都行，但不能省略，参数个数必须满足。
>
> "a" 则像是个字符串，只要你传入的值和形参等于则优先匹配。
>
> 方法四接受的参数是 `.style(@_,@z)` ，第一个参数是变量，变量可以接受所有的字符串，所以你填 **a或b或c** 都会将第四个方法混入，当然你也可以天 **@_**  这就是生成的css里面有第四个方法的内容。
>
> ==形参是变量的话可以接受任何字符==；也就是无论你指定的形参名是什么都匹配。
>
> `.style(x,@z:1)` 或 `.style(x,x)` 都会调用第四个方法 。

### 命名空间

> 可以混入一个方法里面的子方法
>
> 调用方式：
>
> 1. #outer> .inner(); 
>
>    使用 > 指定子方法，中间有无空格都行
>
> 2. #outer .inner();
>
>    省略了 > 符号，中间有无空格都行
>
> 写法不同，效果相同

```less
/* Less */
#card(){
    background: #723232;
    .d(@w:300px){
        width: @w;
        
        #a(@h:300px){
            height: @h;//可以使用上一层传进来的方法
        }
    }
}
#app{
    #card();  //只调用了card，生成的css是不会包含d和c方法里的内容
}
#wrap{
    #card > .d > #a(100px); // 父元素不能加 括号
}
#main{
    #card .d();   //等价于 #card > .d() 或 #card.d()
}
#con{
    //不得单独使用命名空间的方法
    //.d() 如果前面没有引入命名空间 #card ，将会报错
    
    #card;    // 等价于 #card();所以会有card的background属性
    .d(20px); //必须先引入 #card
}

//生成的css
#app{
    background: #723232;
}
#wrap {
  height: 100px;
}
#main {
  width: 300px;
}
#con {
  background: #723232;
  width: 20px;
}
```

> **要点:**
>
>   - 在 CSS 中 `>` 选择器，选择的是 儿子元素，就是 必须与父元素 有直接血源的元素。
>   - 在引入命令空间时，如使用 `>` 选择器，父元素不能加 括号。
>   - 不得单独使用命名空间的方法（子方法），必须先引入命名空间，才能使用其中方法。
>   - 子方法，可以使用上一层传进来的方法

### 条件筛选

> less没有if、else，有when和not

| 关键字 | 描述                   |
| ------ | ---------------------- |
| when   | 判断，后面接着判断语句 |
| not    | 非                     |
| and    | 和                     |
| ，     | 或                     |

| 运算符号 | 描述                  |
| -------- | --------------------- |
| true     | 真                    |
| false    | 假                    |
| >        | 大于                  |
| <        | 小于                  |
| =        | 等于                  |
| >=       | 大于等于              |
| <=       | 小于等于，也可写作 =< |

```less
/* Less */
#card{
    // and 运算符 ，相当于 与运算 &&，必须条件全部符合才会执行
    .border(@width,@color,@style) when (@width>100px) and(@color=#999){
        border:@style @color @width;
    }
    
    // not 运算符，相当于 非运算 !，条件为 不符合才会执行
    .background(@color) when not (@color>=#222){
        background:@color;
    }

    // , 逗号分隔符：相当于 或运算 ||，只要有一个符合条件就会执行
    .font(@size:20px) when (@size>50px) , (@size<100px){
        font-size: @size;
    }
}
#main{
    #card>.border(200px,#999,solid);
    #card .background(#111);
    #card > .font(40px);
}
//生成的css
#main {
  background: #111;
  font-size: 40px;
}
```

> 比较运算有：>、>=、=、=<、<。
>
> = 代表的是等于
>
> 除去关键字 true 以外的值都被视为 false：
>
> 注意：less 没有 != 符号，应该使用 **not** 来作为判断
>
> 条件必须用（）包裹起来

### 数量不定的参数

> 如果希望方法接受数量不定的参数，你可以使用 `...`，犹如 ES6 的扩展运算符。
>
> 使用：`@arguments`

```less
// less
.boxShadow(...){
    box-shadow: @arguments;
}
.textShadow(@a,...){
    text-shadow: @arguments;
}
#main{
    .boxShadow(1px,4px,30px,red);
    .textShadow(1px,4px,30px,red);
    //.textShadow(@：1px,4px,30px,red);  如果这样写的话是会报错的
}
// 生成的css
#main {
  box-shadow: 1px 4px 30px red;
  text-shadow: 1px 4px 30px red;
}
```

### important！

> 在方法名后加上 **important！**关键字即可。

```less
/* Less */
.border{
  border: solid 1px red;
  margin: 50px;
}
#main{
  .border() !important;   生成的每个属性都带!important
}
/* 生成后的 CSS */
#main {
  border: solid 1px red !important;
  margin: 50px !important;
}
```

### 循环方法

> less没有循环方法，可以使用 **when** 递归来实现循环

```less
/* Less */
.generate-columns(@n, @i: 1) when (@i =< @n) {
    .column-@{i} {
        width: (@i * 100% / @n);
    }
    .generate-columns(@n, (@i + 1));  // 改变i值
}
//调用
.generate-columns(4);


/* 生成后的 CSS */
.column-1 {
    width: 25%;
}
.column-2 {
    width: 50%;
}
.column-3 {
    width: 75%;
}
.column-4 {
    width: 100%;
}
```

### 属性拼接方法

> 属性的拼接方式

| 书写 | 描述         |
| ---- | ------------ |
| +    | 等于逗号拼接 |
| +_   | 等于空格拼接 |

逗号拼接(+)

```less
/* Less */
.boxShadow() {
    box-shadow+: inset 0 0 10px #555;
}
.main {
	.boxShadow();                  //调用了boxShadow方法
    box-shadow+: 0 0 20px black;   //在boxShadow方法里的属性进行拼接
}
/* 生成后的 CSS */
.main {
    box-shadow: inset 0 0 10px #555, 0 0 20px black; //结果会以逗号连接
}
```

空格拼接(+_)

```less
/* Less */
.Animation() {
    transform+_: scale(2);
}
.main {
    .Animation();
    transform+_: rotate(15deg);
}

/* 生成的 CSS */
.main {
    transform: scale(2) rotate(15deg);  //结果以空格连接
}
```

> 定义和调用都需要加上拼接符号

**实战技巧**

```less
/* Less */
.average(@x, @y) {
    @average: ((@x + @y) / 2);   计算出平均值赋值给@average
}

div {
    .average(16px, 50px); // 调用 方法
    padding: @average;    // 使用定义的@average
}

/* 生成的 CSS */
div {
    padding: 33px;
}
```

## 函数

### 判断类型

| 方法     | 描述                          |
| -------- | ----------------------------- |
| isnumber | 判断给定的值是否是一个数字。  |
| iscolor  | 判断给定的值是否是一个颜色。  |
| isurl    | 判断给定的值是否是一个 url 。 |

```less
//isnumber
isnumber(#ff0);     // false
isnumber(blue);     // false
isnumber("string"); // false
isnumber(1234);     // true
isnumber(56px);     // true
isnumber(7.8%);     // true
isnumber(keyword);  // false
isnumber(url(...)); // false
//isstring
isstring(#ff0);     // false
isstring(blue);     // false
isstring("string"); // true
isstring(1234);     // false
isstring(56px);     // false
isstring(7.8%);     // false
isstring(keyword);  // false
isstring(url(...)); // false
//isurl
isurl(#ff0);     // false
isurl(blue);     // false
isurl("string"); // false
isurl(1234);     // false
isurl(56px);     // false
isurl(7.8%);     // false
isurl(keyword);  // false
isurl(url(...)); // true
```

### 颜色操作

| 方法     | 描述                         |
| -------- | ---------------------------- |
| saturate | 增加一定数值的颜色饱和度。   |
| lighten  | 增加一定数值的颜色亮度。     |
| darken   | 降低一定数值的颜色亮度。     |
| fade     | 给颜色设定一定数值的透明度。 |
| mix      | 根据比例混合两种颜色。       |

hsl() 函数使用色相、饱和度、亮度来定义颜色。

```less
desaturate(hsl(90, 80%, 50%), 20%)  //#80ff00 // hsl(90, 100%, 50%)
lighten(hsl(90, 80%, 50%), 20%)     //#b3f075 // hsl(90, 80%, 70%)
darken(hsl(90, 80%, 50%), 20%)      //#4d8a0f // hsl(90, 80%, 30%)
fade(hsl(90, 90%, 50%), 10%)        //rgba(128, 242, 13, 0.1) //hsla(90, 90%, 50%, 0.1)
```

**mit**

```less
//mit Example
mix(#ff0000, #0000ff, 50%)
mix(rgba(100,0,0,1.0), rgba(0,100,0,0.5), 50%)
//mit output
#800080
rgba(75, 25, 0, 0.75)
```

<span style="display:inline-block;height:40px;width:80px;background-color:#ff0000;line-height:40px;text-align:center;color:white">ff0000</span> + <span style="display:inline-block;height:40px;width:80px;background-color: #0000ff;line-height:40px;text-align:center;color:white">#0000ff</span> = <span style="display:inline-block;height:40px;width:80px;background-color:#800080;line-height:40px;text-align:center;color:white">#800080</span> 

### 数学函数

| 方法       | 描述                             |
| ---------- | -------------------------------- |
| ceil       | 向上取整。                       |
| floor      | 向下取整。                       |
| percentage | 将浮点数转换为百分比字符串。     |
| round      | 四舍五入                         |
| sqrt       | 计算一个数的平方根。             |
| abs        | 计算数字的绝对值，原样保持单位。 |
| pow        | 计算一个数的乘方。               |

```less
ceil(2.4)          //3
floor(2.6)         //2
percentage(0.5)    //50%

round(1.67)        //2
round(1.67, 1)     //1.7

sqrt(25cm)         //5cm
sqrt(18.6%)        //4.312771730569565%;

abs(25cm)          //25cm
abs(-18.6%)        //18.6%
```

**pow**

```js
//Example:
pow(0cm, 0px)
pow(25, -2)
pow(25, 0.5)
pow(-25, 0.5)
pow(-25%, -0.5)
//Output:
1cm
0.0016
5
NaN
NaN%
```

[less函数中文官网](https://lesscss.cn/functions/)

[less函数官网](https://lesscss.org/functions/)

## 继承

### extend

> extend 是 Less 的一个伪类。它可继承 所匹配声明中的全部样式。
>
> 减少代码的重复性
>
> 写法：
>
> `.box:extend(.a){...}`      //写在类名后面
>
>  或<br>.box{<br>    &:extend(.a);         //写在代码块里面 <br>}

```less
/* Less */
.animation{
    transition: all .3s ease-out;
    .hide{
    transform:scale(0);
  }
}
#main{
    &:extend(.animation);
}
#con{
    &:extend(.animation .hide);  继承多个
}

/* 生成后的 CSS */
.animation,#main{  // 类名继承
    transition: all .3s ease-out;
}
.animation .hide , #con{
    transform:scale(0);
}
```

> 会与之前的声明合并不会出现多个，类似于：
>
> ```less
> .animation{}
> .animation,#main{}
> ```
>
> 会合并成一个
>
> ```less
> .animation,#main{}
> ```
>
> &:extend(); 后面一定要加分号，否则报错

### extend all

> 使用选择器匹配到的全部声明。

```less
/* Less */
#main{
    width: 200px;
}
#main {
    &:after {
        content:"Less is good!";
    }
}
#wrap:extend(#main all) {
    
}

/* 生成的 CSS */
#main,#wrap{
    width: 200px;
}
#main:after, #wrap:after {       //将after也匹配过来了
    content: "Less is good!";
}
```

选择拥有多个类名的元素

```less
//less
.warp{
    width: 100px;
}
.warp.box{          //多个类名
    height: 100px;
}
.app{
    &:extend(.warp all);
}
//生成的css
.warp,
.app {
  width: 100px;
}
.warp.box,
.app.box {
  height: 100px;
}
```

## 导入

> CSS 中，可以通过 **@import** 指令来导入外部文件。
>
> **@import** 伪指令用于在代码中导入文件。 它将 Less 代码分布在不同的文件上，并允许轻松地维护代码的结构。 您可以将 @import 语句放在代码中的任何位置

1.导入 less 文件 可省略后缀

```less
import "main"; 
//等价于
import "main.less";
```

2.@import 的位置可随意放置

```less
#main{
  font-size:15px;
}
@import "style";
```

### reference

> 使用reference引入的 Less 文件，但不会编译它，只有在调用他的方法时才会解析所调用的方法（只引用）

```less
//less
@import (reference) "bootstrap.less";  //后缀.less可以省略 

#wrap:extend(.navbar all){}            //继承bootstrap里面的方法
#app{
    .navbar();                         //调用里面的单个方法
}
```

### once

> @import语句的默认行为。这表明相同的文件只会被导入一次，而随后的导入文件的重复代码都不会解析。

```less
@import (once) "foo.less";
@import (once) "foo.less"; // 这条语句将被忽略
```

### multiple

> 使用@import (multiple)允许导入多个同名文件。
>
> 默认多次导入同个文件，同类名会不会出现多次

```less
/* Less */
   
// file: foo.less
.a {
  color: green;
}
// file: main.less
@import (multiple) "foo.less";
@import (multiple) "foo.less";
   
/* 生成后的 CSS */
.a {
  color: green;
}
.a {
  color: green;
}
```

## 其他

### 避免编译

> 加上 ~ 符号后是不会进行编译，会原样输出

```less
/* Less */
#main{
    width:~'calc(300px-30px)';
}

/* 生成后的 CSS */
#main{
    width:calc(300px-30px);
}
```

>  结构： ~ ' 值 '

### 使用JS

> 因为 Less 是由 JS 编写，less代码中是可以使用 Javascript 

```less
/* Less */
@content:`"aaa".toUpperCase()`;
#randomColor{
    @randomColor: ~"rgb(`Math.round(Math.random() * 256)`,`Math.round(Math.random() * 256)`,`Math.round(Math.random() * 256)`)";
}
#wrap{
    width: ~"`Math.round(Math.random() * 100)`px";
    &:after{
        content:@content;
    }
    height: ~"`window.innerHeight`px";
    alert:~"`alert(1)`";
    #randomColor();
    background-color: @randomColor;
}
/* 生成后的 CSS */

// 弹出 1
#wrap{
    width: 随机值（0~100）px;
    height: 743px;//由电脑而异
    background: 随机颜色;
}
#wrap::after{
    content:"AAA";
}
```

> 要注意的是js代码要用 **反引号** 包裹起来，在语句前面加 ~ （转义）是以免编译造成错误
