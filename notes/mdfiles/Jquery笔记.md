# JQuery笔记


## jQuery事件

| 书写                | 描述               |
| ------------------- | ------------------ |
| $(document).ready() | 文档加载完成后执行 |

```js
$(document).ready(function () {
    console.log("hello Jquery");
})
```

| 鼠标事件   | 键盘事件 | 表单事件 | 文档/窗口事件 |
| ---------- | -------- | -------- | ------------- |
| click      | keypress | submit   | load          |
| dbclick    | keydown  | change   | resize        |
| hover      | keyup    | foucs    | scroll        |
| mouseenter |          | blur     | ~~unload~~    |
| mouseleave |          | focusin  | ~~error~~     |
| mouseover  |          | focusout | select        |
| mouseout   |          |          |               |
| mousedown  |          |          |               |
| mouseup    |          |          |               |

### 事件绑定

> selector.eventName(fn)
>
> 使用 `bind()` 绑定事件
>
> 使用 `delegate()` 绑定事件
>
> 使用 `on()` 绑定事件

```js
$("box").click(function(e){……});
$("p").hover(function(e){……});
```

#### bind() 绑定事件

> 语法：$(selector).bind(event,data,function,map)
>
> `bind()` 不能给未来元素（即后面新插入的元素）添加事件，即如果给所有的p绑定事件，后面p标签里面再新增标签则没有绑定事件

| 参数          | 描述                                                         |
| ------------- | ------------------------------------------------------------ |
| childSelector | 必需。规定要附加事件处理程序的一个或多个子元素。             |
| event         | 必需。规定附加到元素的一个或多个事件。<br/>由空格分隔多个事件值。必须是有效的事件。 |
| data          | 可选。规定传递到函数的额外数据。                             |
| function      | 必需。规定当事件发生时运行的函数。                           |
| map           | 选填，规定事件映射 ({event:function, event:function, ...})，包含要添加到元素的一个或多个事件，以及当事件发生时运行的函数。 |

```js
$("box").bind("click",function(e){……});

添加多个事件
$("p").bind("mouseover mouseout",function(){
     ……
});

使用map来定义事件
$("p").bind({
    mouseover:function(){……},  
    mouseout:function(){……}, 
    click:function(){……}  // 事件名也可以使用双引号包裹起来
});

向事件传递 data 
$("p").bind("click",{msg: "hello"},fn);
function fn(event){
    console.log(event.data.msg);		获取data内容
}
```

#### delegate() 绑定事件

> 语法：$(selector).delegate(childSelector,event,data,function,map)
>
> delegate用于给未来子元素添加事件

| 参数          | 描述                                                         |
| ------------- | ------------------------------------------------------------ |
| childSelector | 必需。规定要附加事件处理程序的一个或多个子元素。             |
| event         | 必需。规定附加到元素的一个或多个事件。<br/>由空格分隔多个事件值。必须是有效的事件。 |
| data          | 可选。规定传递到函数的额外数据。                             |
| function      | 必需。规定当事件发生时运行的函数。                           |
| map           | 规定事件映射 ({event:function, event:function, ...})，包含要添加到元素的一个或多个事件，以及当事件发生时运行的函数。 |

```js
$("body").delegate("p","click",function(e){……});

添加多个事件
$("body").delegate("p","mouseover mouseout",function(){
     ……
});

使用map来定义事件
$("body").delegate("p",{
    click: function() {
        console.log("click")
    },
    dblclick: function() {
        console.log("dblclick")
    }
})

向事件传递 data 
$("body").delegate("p","click",{msg: "hello"},fn);
function fn(event){
    console.log(event.data.msg);		获取data内容
}
```

#### on() 绑定事件

> 语法：$(selector).on(event,childSelector,data,function)
>
> ==注意 on 的参数 **event** 和  **childSelector** 和 delegate 顺序是相反的==
>
> on就像是集合了 **bind** 和 **delegate**

| 参数          | 描述                                                         |
| ------------- | ------------------------------------------------------------ |
| event         | 必需。规定要从被选元素添加的一个或多个事件或命名空间。<br/>由空格分隔多个事件值，也可以是数组。必须是有效的事件。 |
| childSelector | 可选。规定只能添加到指定的子元素上的事件处理程序（且不是选择器本身，比如已废弃的 delegate() 方法）。相当于事件委托 |
| data          | 可选。规定传递到函数的额外数据。                             |
| function      | 可选。规定当前事件发生时运行的函数                           |
| map           | 规定事件映射 ({event:function, event:function, ...})，包含要添加到元素的一个或多个事件，以及当事件发生时运行的函数。 |

```js
$("box").on("click",function(e){……});

添加多个事件
$("p").on("mouseover mouseout",function(){
    $("p").toggleClass("intro");
});

使用map来定义事件
$("p").on({
    mouseover:function(){……},  
    mouseout:function(){……}, 
    click:function(){……}  
});
$("p").on({
    mouseover:function(){……},  
    mouseout:function(){……}, 
    click:function(){……}  
},"p");

自定义事件
$("p").on("myOwnEvent", function(event, showName){
    $(this).text(showName + "! What a beautiful name!").show();
});
 $("button").click(function(){
   $("p").trigger("myOwnEvent",["Anja"]);    需要用 trigger来触发事件
});

向事件传递 data 
$("p").on("click",{msg: "hello"},fn);
function fn(event){
    console.log(event.data.msg);		获取data内容
}

向未来元素添加事件
$("div").on("click","p",function(){
    ……
});    当未来子标签出现p时子标签拥有该事件，用bind定义的出现新标签时不会绑定事件
```

### 删除事件

> 使用 `unbind()` 来删除事件
>
> 使用 `undelegate()` 来删除事件
>
> 使用 `off()` 来删除事件
>
> `off()` 方法通常用于移除通过 `on()` 方法添加的事件处理程序。

#### unbind() 删除事件

> 语法：$(selector).unbind(event,function,eventObj,map)

| 参数     | 描述                                                         |
| -------- | ------------------------------------------------------------ |
| event    | 可选。规定一个或多个要从元素上移除的事件。<br/>由空格分隔多个事件值。<br/>如果只规定了该参数，则会删除绑定到指定事件的所有函数。 |
| function | 可选。规定从元素上指定事件取消绑定的函数名称。               |
| eventObj | 可选。规定要使用的移除的 event 对象。这个 eventObj 参数来自事件绑定函数。 |
| map      | 规定事件映射 ({event:function, event:function, ...})，包含要添加到元素的一个或多个事件，以及当事件发生时运行的函数。 |

```js
$("p").unbind("click dblclick")   取消绑定多个事件
$("p").unbind("click",alertMe);   取消绑定的函数
$(this).unbind(event);            移除的 event 对象的事件

$("#btn").click(function() {
    $("p").unbind({
        click: changeSize,
        dblclick:changeColor      map形式移除事件绑定的函数
    })
})
```

#### undelegate() 删除事件

> 语法：$(selector).undelegate(childSelector,event,function,map)

| 参数          | 描述                                                         |
| ------------- | ------------------------------------------------------------ |
| childSelector | 规定要附加事件处理程序的一个或多个子元素                     |
| event         | 可选。规定需要删除处理函数的一个或多个事件类型               |
| function      | 可选。规定要删除的具体事件处理函数。                         |
| map           | 规定事件映射 ({event:function, event:function, ...})，包含要添加到元素的一个或多个事件，以及当事件发生时运行的函数。 |

```js
$("body").undelegate("p","click dblclick");     取消绑定多个事件
$("body").undelegate("body","click",fn);        取消绑定的函数
$("body").undelegate();			移除body通过delegate给所有标签绑定的所有事件

$("body").undelegate("p",{
    click: changeSize,
    dblclick:changeColor      map形式移除事件绑定的函数
})

```

#### off() 删除事件

> off 就像是集合了unbind 和 undelegate

| 参数               | 描述                                                         |
| ------------------ | ------------------------------------------------------------ |
| event              | 必需。规定要从被选元素移除的一个或多个事件或命名空间。<br/>由空格分隔多个事件值。必须是有效的事件。 |
| selector           | 可选。规定添加事件处理程序时最初传递给 on() 方法的选择器。   |
| function(eventObj) | 可选。规定当事件发生时运行的函数。                           |
| map                | 规定事件映射 ({event:function, event:function, ...})，包含要添加到元素的一个或多个事件，以及当事件发生时运行的函数。 |

```js
function changeSize() {
    $(this).animate({fontSize: "+=5px"})  字体大小
}
function changeSpacing() {
    $(this).animate({letterSpacing: "+=5px"});  字体间距
}
$("p").on("click",changeSize); 
$("p").on("click",changeSpacing);    给p标签加上事件

$("p").click(function(){
    $(this).off("click");   p标签单击时移除自身click事件,字体不会放大和加宽
});

$("p").click(function(){
    $(this).off("click",chanSize);   移除click事件执行的chanSize事件，字体一样会加宽
});

$("body").on("click","p",changeSize);  on通过body给子标签p添加事件
$("#btn").click(function() {
    $("body").off("click", "p");  与之对应body通过off来关闭p的事件，这是off的selector参数
})

$("p").off({
    click: changeSize,
    dblclick:changeSpacing   使用map形式关闭事件函数
})

命名空间  
$("p").on("click.foo", changeSize);   规定命名空间
$("p").on("click.ese", changeColor);
$("p").on("dblclick.foo", changeSpacing);

$("#btn").click(function() {
    $("p").off(".foo");             关闭命名空间为foo的所有事件
    $("p").off("click.foo");        关闭命名空间为foo的click事件
    $("p").off("click.foo .ese");   关闭多个命名空间事件
})

$("p").off()              移除任何事件函数
$("p").off("click","p")   类似undelegate
$("p").off({			  map形式移除
    click:fn
},"p")

```

> 总得来说定义事件就是用 `on()` 即可，删除就用 `off()` 这两个也是后出方法

### 事件命名空间

> 命名空间就是给事件起别名以免冲突
>
> **event.namespace**

```js
$("p").on("click.foo",fn);    
$("p").off("click.foo",fn);   只有命名空间一致才可以删除指定事件
```

## jQuery效果

| 书写                       | 描述                                                         |
| -------------------------- | ------------------------------------------------------------ |
| $(this).hide()             | 隐藏当前元素                                                 |
| $("p").hide()              | 隐藏所有p元素                                                |
| $("p.test").hide(1000)     | 隐藏所有 class="test" 的 \<p> 元素，参数是时间，也可以使用 **slow** 和 **fast** |
| $("#test").hide()          | 隐藏 id="test" 的元素                                        |
| $("#test").show()          | 显示元素（hide和show都是修改cssdisplay），参数与hide一样     |
| $("#test").toggle()        | 显示\|\|隐藏 互相切换  `hide() ` `show()` 之间互相切换       |
| $("#test").fadeIn()        | 渐显 参数 ms毫秒 **slow** 慢速 **fast** 快速;  前提display:none |
| $("#test").fadeOut();      | 渐出 效果相反 参数一样                                       |
| $("#test").fadeTo(500,0.1) | 透明度  两个参数 第一个和上面一样控制速的,第二个0~1范围透明度使颜色变淡 |
| $("#test").slideDown();    | 滑块 [下拉菜单]  下拉    参数和上面一样                      |
| $("#test").slideUp();      | 滑块 [下拉菜单]  上拉                                        |
| $("#test").slideToggle();  | 滑块 [下拉菜单]  互相切换                                    |
| $(this).clone(true)        | 克隆当前元素,参数为是否要克隆事件，默认 **false**            |

```js
$("div").clone().append("body") 克隆div元素到body里面
```

 ### animate 动画

`$("#test").animate({css}, time)`

```js
$("#test").animate( {left:250px} , slow)  时间可以使用默认关键字slow和false也可以用毫秒
```

> 动画 如需移动需要定位,里面放css代码  参数 css代码,可以使用toggle;后面参数是时间
>
> 注意事项：必须使用 Camel 标记法书写所有的属性名，用 paddingLeft 而不是 padding-left

**以下是使用 toggle 默认参数**

```js
$(oBox).animate({
    width: "toggle",       大多属性都支持toggle包括height、backgroundColor等等
}).1000;  时间参数使用slow 和fast时需要引号引起来
```

> 也可以使用相对值

```js
$(oBox).animate({
    width: "+=100px",        每次执行加100px
}).1000;  
```

> 排列执行多个动画，顺序执行

```js
 $("button").click(function(){
    var div=$("div");
    div.animate({width: "250px"},"slow");  都有过度效果
	div.animate({height: "250px"},"slow");
  });
```

`$(oBox).stop()`   用于停止动画 停止当前动画 执行下个动画  

| 参数    | 描述                                             |
| ------- | ------------------------------------------------ |
| stopAll | 可选。规定是否停止被选元素的所有加入队列的动画。 |
| goToEnd | 可选。规定是否允许完成当前的动画。               |

> 当没有参数时用于停止当前动画，**继续** 下个动画，有一个参数为true时为停止所有动画，但动画会暂停不会直接完成当前未完成的动画，两个参数为 **true** 时，为 **暂停所有动画** 并将瞬间完成当前动画

### 动画列队

> 当要连续执行多个动画时，利用回调就会出现回调地狱

```js
//HTML
<div class="box"></div>
<button id="action1" value="click">click</button>
//JS
回调地狱写法
$('#action').on('click', function() {
    var $box = $('.box')   
    $box.hide(1000, function() {
        $box.show(1000, function() {
            $box.fadeOut('slow', function() {
                $box.fadeIn('slow', function() {
                    $box.slideUp(function() {
                        $box.slideDown(function() {
                            console.log('动画执行完毕')
                        })
                    })
                })
            })
        })
    })
})

使用jQuery动画列队写法
$('#action2').on('click', function() {
    var $box = $('.box')
    $box.hide(1000)
        .show(1000)
        .fadeOut('slow')
        .fadeIn('slow')
        .slideUp()
        .slideDown(function() {
            console.log('动画执行完毕')
        })
})
```

**关于列队的一些方法**

| 书写         | 描述                                                         |
| ------------ | ------------------------------------------------------------ |
| stop()       | 暂停当前动画，参数（stopAll，goToEnd）                   |
| finsih()     | 立刻完成所有动画 停留在最后的动画画面，1.8版本报错           |
| delay()      | 用于延迟动画执行                                        |
| queue()      | 创建一个函数加入动画列队 |
| dequeue()    | 与 `queue()` 搭配使用，没有执行的 `queue()` 则不会继续后面动画列队 |
| clearQueue() | 清除列队中的所有函数，包括 queue 创建出来的列队|

```js
//HTML
<button id="action1" value="click">click</button>
<button id="action2">stop</button>
//JS
$('#action1').on('click', function() {
    var $box = $('.box')
    $box.hide(2000)
        .show(2000)
        .fadeOut('2000')
        .fadeIn('2000')
        .slideUp(2000)
        .slideDown(2000)
})
$("#action2").on("click", function() {
    $(".box").stop();            停止当前动画执行下个动画
    $(".box").stop(true);        停止所有动画，保持暂停的画面
    $(".box").stop(true,true);   停止所有动画，立刻执行完当前动画
    $(".box").finish();          立刻执行完所有动画，保持在最后那个动画画面
})

$box.delay(1000).hide(2000)      动画将延迟1秒后执行
```

> `queue()` 、`dequeue()` 、`clearQueue()`

```js
//HTML
<button id="action1" value="click">click</button>
<button id="action2">clear</button>
//JS
$('#action1').on('click', function() {
    var $box = $('.box');
    $box.hide(1000)
        .show(1000)
        .queue(function() {       创建一个列队函数
            $(this).css("background-color", "red");
            $(this).dequeue();    没有dequeue是不会继续下面的动画列队的
        })
        .slideUp(1000)
        .slideDown(1000)
});
$("#action2").on("click", function() {
    $(".box").clearQueue();       停止队列中的剩余函数：
})
```

> stop() 方法（只适用于动画）不同的是，clearQueue() 方法移除任何排队的函数。

### callback  回调

> 回调 callback  可以在动画执行后执行函数 其实就是在时间（speed）后面还有一个参数是填写函数的
>
> 例如: hide(1000,function () { 回调函数 })
>
> 回调只会在动画执行完后触发

```js
$("#app").hide(500,function(){alert("动画执行完成");});
$("#app").show("slow",function(){alert("动画执行完成");});
$("#app").fadeTo("fale",0.5,function(){alert("动画执行完成");})
```

### 链

> 允许我们在相同的元素上运行多条 jQuery 命令

```js 
$("#p1").css("color","red").slideUp(2000).slideDown(2000)
```

## jQuery HTML

### 捕获元素

> 捕获元素，获取元素

| 书写                            | 描述                                                         |
| ------------------------------- | ------------------------------------------------------------ |
| $(selector).text(text)          | 捕获设置元素中文本，无参数则是获取，有参数则是设置           |
| $(selector).html(html)          | 设置或返回所选元素的内容（包括 HTML 标记）,参数同上          |
| $(selector).val(value)          | **value** 简写，设置或返回表单字段的值，参数同上             |
| $(selector).attr(attribute,set) | **attribute **简写，方法用于获取设置属性值                   |
| $(selector).prop(attribute)     | 只能检测或设置自有属性，不可操作自定义属性，这里的属性值是标签内部属性不是css后设置属性 |
| $(selector).get(0)              | 返回该jquery对象的dom元素  参数类型 index                    |

> attr 的各种使用，attr()有4个表达式


1. attr(属性名)       //获取属性的值（取得第一个匹配元素的属性值。通过这个方法可以方便地从第一个匹配元素中获取一个属性的值。如果元素没有相应属性，则返回 undefined ）

2. attr(属性名, 属性值)   //设置属性的值 （为所有匹配的元素设置一个属性值）。

3. attr(属性名,函数值)     //设置属性的函数值  （为所有匹配的元素设置一个计算的属性值。不提供值，而是提供一个函数，由这个函数计算 **返回的值** 作为属性值。）

4. attr({properties})    //给指定元素设置多个属性值，即：{属性名一: “属性值一” , 属性名二: “属性值二” , …  }。(这是一种在所有匹配元素中批量设置很多属性的最佳方式。 注意，如果你要设置对象的class属性，你必须使用'className' 作为属性名。或者你可以直接使用'class'或者'id'。)

   $(selector).attr({attribute:value, attribute:value ...})

   $("img").attr({width:"50",height:"80"});

### 添加元素

> 添加元素、删除元素、css方法、尺寸

```js
var txt1="\<p>文本。\</p>";                  使用html标签创建
var txt2 = $("\<p>\</p>").text("hello");    使用jquery创建
var txt3 = document.createElement("p");    	原生js创建标签
txt3.innerHTML = "hello";      插入文本
```


| 书写           | 描述                                       |
| -------------- | ------------------------------------------ |
| append()       | 在被选中元素内尾部添加内容，参数可以若干个 |
| prepend()      | 在被选中元素内头部添加内容                 |
| after()        | 在被选元素之后插入内容                     |
| before()       | 在被选元素之前插入内容                     |
| insertAfter()  | 与 `after()` 功能相同，参数位置不同        |
| insertBefore() | 与 `before()` 功能相同，参数位置不同       |

```js
$(".start").click(function() {
      $(".chlid").append($("p")) //插入元素到选定元素里的后面
      $("p").insertAfter($(".chlid")) //将.chlid 插入到 p 后面
      $(".chlid").after($("p"))   
});
$(".stop").click(function() {
     $("p").appendTo(".chlid");
     $("p").insertBefore($(".chlid")) //将.chlid 插入到 p 前面
     $(".chlid").before($("p"))

});
```

> `prepend()` —— 其方法是将方法里面的参数添加到jquery对象中来， 并将内容放到对象中的前面；
>     如： A.prepend(B) 的意思是将B放到A中来， 前面追加， 插入到A的子元素的第一个位置；
> `prependTo()` —— 其方法是将jquery对象添加到prependTo指定的参数中去。
>     如： A.prependTo(B) 的意思是将A放到B中去， 插入到B的子元素的第一个位置；

```js
$(this).append(txt2)  综合上面
$(this).append("\<h1>hello \</h1>", ... , ...)    //在被选中元素内尾部添加内容    参数可以若干个
$(this).prepend("在开头追加文本", ... , ...);     //在被选中元素内头部添加内容
...
$(this).before(txt,function(index));    //在被选中元素前插入内容
一个参数时插入内容 第二个是可以通过函数来插入内容 index 为index位置会自动自增

$(this).after(txt);         与上相反
```

### 删除元素

| 书写             | 描述                       |
| ---------------- | -------------------------- |
| $(this).remove() | remove会删除数据和事件     |
| $(this).detach() | 删除元素，会保留数据和事件 |
| $(this).empty()  | 清空内容，会保留数据和事件 |

```js
$("#btn1").click(function() {
    $("body").append($("#p1").detach());    //有detach删除的元素再次添加会保留click事件
});
$("#btn2").click(function() {
    $("body").append($("#p2").remove());    //不会保留数据和事件
});
$("p").click(function() {
    $(this).animate({
        fontSize: "+=1px"
    })
});
```

### 替换元素

| 书写                                             | 描述                                                         |
| ------------------------------------------------ | ------------------------------------------------------------ |
| $(content).replaceAll(selector)                  | **content** 规定要插入的内容（必须包含 HTML 标签），**selector** 规定哪一个元素将被替换 |
| $(selector).replaceWith(content,function(index)) | **content** 可以dom或者html元素 或者jquery对象 可执行一个函数，类似于 `replaceAll()` 作用相反 |

```js
$(content).replaceAll(selector) //替换元素 将后面的参数替换为前面的 content必须包含html标签
$(selector).replaceWith(content,function(index))   
content 可以dom 或者html元素 或者jquery对象 可执行一个函数
```

### Class类

| 书写                          | 描述                                                         |
| ----------------------------- | ------------------------------------------------------------ |
| $(this).addClass("class")     | 为选中元素添加class 不会覆盖之前class  可以多个参数 ("blue red") |
| $(this).removeClass("class")  | 为选中元素删除class                                          |
| $(this).hasClass("className") | 检查该元素是否有这个类名                                     |
| $(this).toggleClass()         | 给没有这个class的添加这个class 给有这个class的删除class，关于第二个参数 **true为全部添加**， **false为全部删除**，如果为true则是等同于添加所有类名(不是切换) false则是删除 |

> $(selector).toggleClass()   语法

`$(selector).toggleClass(classname,function(index,currentclass),switch))`

| 参数                         | 描述                                                         |
| ---------------------------- | ------------------------------------------------------------ |
| classname                    | 必需。规定添加或移除的一个或多个类名。如需规定若干个类，请使用空格分隔类名。 |
| function(index,currentclass) | 可选。规定返回需要添加/删除的一个或多个类名的函数。<br/>index - 返回集合中元素的 index 位置。<br/>currentclass - 返回被选元素的当前类名 |
| switch                       | 可选。switch 参数来仅仅添加或移除类名。                      |

```js
//function
$("button").click(function(){
	$("li").toggleClass(function(index){
		return "listitem_" + index;  index返回该li在li集合中的位置，下标从0开始
	});
});

//switch
$("#add").click(function(){
	$("p").toggleClass("main",true);  添加
});
$("#remove").click(function(){
	$("p").toggleClass("main",false);  删除
});

```

### CSS()方法

> css 设置css属性||返回css属性值

**css()使用方法** 

1. $(this).css("width");  100px   //返回样式属性值  

2. $(this).css("backgroundColor","pink");   //修改背景颜色为pink 只有一个参数时是返回属性值
   参数可以小驼峰或不变 
   例如 .css("background-color","red") .css("backgroundColor","red")

3. 多个样式书写：

   $("div").css({"color":"red","width":"250px"});       记得有花括号 { }

###  尺寸

| 书写          | 描述                                                         |
| ------------- | ------------------------------------------------------------ |
| width()       | 无参数时是返回宽度，有参数为设置宽度，单位为 px、em、pt 等，默认px |
| height()      | 无参数时是返回宽度，有参数为设置高度                         |
| innerWidth()  | 该方法包含 padding，但不包含 border 和 margin                |
| innerHeight() | 该方法包含 padding，但不包含 border 和 margin                |
| outerWidth()  | 该方法包含 padding 和 border。参数可选。布尔值，规定是否包含 margin。false - 默认。不包含 margin，true - 包含 margin。 |
| outerHeight() | 该方法包含 padding 和 border。                               |

1. 返回宽度：

   `$(selector).width()`

2. 设置宽度：

   `$(selector).width(value)`

3. 使用函数设置宽度：

   `$(selector).width(function(index,currentwidth))`

## 遍历

> 选择元素

### 前辈

| 书写                              | 描述                                                         |
| --------------------------------- | ------------------------------------------------------------ |
| $(this).offsetParent()            | 返回第一个祖级元素，根父级元素，返回包含零个、一个或多个元素的 jQuery 对象 |
| $(this).parent()                  | 选择父级元素 就只是他父级<br>`$(this).parent().css("color", "red");` |
| $(this).parents()                 | 返回被选元素的所有祖先元素，它一路向上直到文档的根元素 (\<html>)。 |
| $(this).parentsUntil("div");      | 往上找祖先元素，一直到指定元素下的所有子级，例如 div ...  **span**  ...(span)就是被选中元素 |
| $(this).closest(selector,context) | 沿 DOM 树向上遍历，直到找到已应用选择器的一个匹配为止。返回包含零个或一个元素的 jQuery 对象 |

### 后代

| 书写               | 描述                                                         |
| ------------------ | ------------------------------------------------------------ |
| $(this).children() | 直接子级                                                     |
| $(this).contents() | 也是选择他的直接子级 但是他返回的内容不止节点 还包含内容 连空格都算text处理 |
| $(this).find()     | find() 方法返回被选元素的后代元素。<br/>后代是子、孙、曾孙，依此类推，找不到就一直往下找。 |

> 例:  $(this).find("*");   父级以下所有
>
> 例: $(this).find("span");     父级下的span 单单只是span

### 同胞

| 书写                   | 描述                                                |
| ---------------------- | --------------------------------------------------- |
| $("div").siblings()    | 同胞选择器  选择除了自己的同级的元素                |
| $("div").siblings("p") | 可以进行过滤  选择除了自己的同级p元素               |
| $("div").next()        | 同级下一个元素， 没什么好解释的 div下面的第一个兄弟 |
| $("div").nextAll()     | 多了个all，下面所有，不包括自己                     |
| $("div").nextUntil("") | 到指定范围之间，不包含指定元素                      |
| $("div").prev();       | 选择位于自身前的一个同级元素                        |
| $("div").prevAll()     | 选择位于自身前的所有同级元素                        |
| $("div").prevUntil("") | 与 `nextUntil()` 相反                               |

### 其他

| 书写       | 描述                                                         |
| ---------- | ------------------------------------------------------------ |
| add()      | 在选择器后面在追加一个选择<br>例：$(".box").add(".chlid")     选中了box 和chlid |
| has()      | 断当前节点是否包含选择器中的子元素，返回包含固定子元素的父元素（jquery对象）<br>如何该元素包含条件子元素，则把整个该元素返回，是一个jquery对象 |
| is("span") | 判断当前节点是否是否匹配选择器。返回布尔值；                 |

```js
has用法
$("#app").has(".p")    选取包含条件的元素
不同写法
$("div:has(p,span,li,ul)").css("border","solid red");     选取包含有多个元素在内的元素
$("div:not(:has(h1))").css("background-color","yellow");  选取不含有指定元素在内的元素
```

### 过滤

| 书写                                                   | 描述                                             |
| ------------------------------------------------------ | ------------------------------------------------ |
| $("div p").first()                                     | 返回选中元素集合的首个元素                       |
| $("div p").last()                                      | 返回选中元素集合的最后一个元素                   |
| $("div p").eq(0)                                       | 返回选中元素集合中的第一个元素，开始为零 0       |
| $("div").filter(".class,#id",":even",":first",":last") | 删除不匹配的元素，得到一个新的集合，可以多个参数 |
| $("div").not(":first")                                 | 除开第一个first，功能与上 `filter()` 相反        |
| $(this).slice(start,stop)                              | 使用索引值来选择元素，一个参数则至结束           |

## jQuery Ajax

| 书写                      | 描述                                                         |
| ------------------------- | ------------------------------------------------------------ |
| $(selector).load()        | 方法从服务器加载数据，并把返回的数据放入被选元素中。只能替换元素内容 |
| $.get(URL,callback)       | callback参数和 `load()`一样                                  |
| $.post(URL,data,callback) | callback参数和 `load()`一样                                  |

**$(selector).load(URL,data,callback);**

callback参数

- responseTxt - 包含调用成功时的结果内容
- statusTXT - 包含调用的状态
- xhr - 包含 XMLHttpRequest 对象

### $.get()

> 语法：$.get(URL,callback);

```js
$.get("demo_test.php",function(data,status,xhr){
   ……
});
```

### $.post()

> 语法：$.post(URL,data,callback);

```js
$.post("demo_test_post.php",   url
{
    name:"test",      携带参数
    url:"http://www.runoob.com"
},
function(data,status){
    alert("数据: \n" + data + "\n状态: " + status);
});
```

### load()

> 语法：$(selector).load(url,data,function(response,status,xhr))
>
> load() 方法从服务器加载数据，并把返回的数据放置到指定的元素中，所以需要一个标签来填写返回值。
>
> 传递方法load()方法的传递方式根据参数data来自动指定。如果没有参数传递，则采用GET方式传递；反之，则会自动转换为POST方法。

```js
无参数传递，则是GET方式
$('#resText').load('test.php',function(){   会将结果写入到#resText里面
    //...
});

有参数传递，则是POST方式
$('#resText').load('test.php',{name:'rain',age:'22'}，function(){
    //...
});
```

## jQuery其他

`$.noConflict`  无冲突，如果别的框架也使用$符号，那么noconfict就起作用了

```js
jQuery("#box").click();   可以使用jQuery关键字来代替$当然也可以定义一个变量来代替
var a =  $.noConflict();  用变量来储存
a("#box").click();        a相当于$
```

### 事件data传参 

```js
$(this).data({})           //为元素添加data通常为对象形式存储
$(this).data("click.a")    //获取data全部内容可以以命名空间
$(this).data("name")       //获取指定元素内容
$(this).removeData("name") //删除指定data内容
```

### event对象

> **event.button**  返回鼠标哪个键按下 左键0 中键1 右键2 
>
> **event.delegateTarget** 属性返回当前调用的 jQuery 事件处理程序所添加的元素。
>
> **currentTarget** 事件属性返回其监听器触发事件的节点，即当前处理该事件的元素、文档或窗口。
>
> 如果事件直接绑定到元素且没有委托发生，则 event.delegateTarget 等同于 event.currentTarget
>
> 这几个都是原生Js属性，jquery事件对象也包裹进去了

```js
$("p").on("mousedown", function(e) {
    console.log(e.button);
})

$("#A").on("click", "#C", function(event) {
    console.log(event, "C")
    console.log("currentTarget:" + event.currentTarget.id)    #C
    console.log("delegateTarget:" + event.delegateTarget.id)  #A

})

```

> `isDefaultPrevented()` 判断指定的事件上是否调用了 `preventDefault()` 方法。
>
> `isPropagationStopped()` 判断是否调用了 `stopPropagation()` 方法。
>
> `isImmediatePropagationStopped()` 判断是否调用了 `stopImmediatePropagation()` 方法。

```js
//"isDefaultPrevented()"
$(".a").click(function(e) {
    e.preventDefault();					 阻止默认事件
    e.isDefaultPrevented();              true
})

//"isPropagationStopped()"
$(".c").click(function(e) {
    e.stopPropagation();                 阻止事件冒泡
    e.isPropagationStopped();   true
})
$(".c").click(function(e) {
    e.stopImmediatePropagation();        阻止事件冒泡几自身事件蔓延
    e.isPropagationStopped();   true
})

//"isImmediatePropagationStopped()"
$(".c").click(function(e) {
    e.stopPropagation()                  阻止事件冒泡
    e.isImmediatePropagationStopped()    false
})
$(".c").click(function(e) {
    e.stopImmediatePropagation()         阻止事件冒泡几自身事件蔓延
    e.isImmediatePropagationStopped()    true
})
```

> pagex，pagey       鼠标相对于文档的位置  相对于整个html

```js
$(document).ready(function() {
    $(".box").mousemove(function(e) {
        $("span").text(e.pageY + "," + e.pageX)
    })
});
```

> event.result       属性包含由被指定事件触发的事件处理程序返回值。

```js
$(".c").click(function(e) {
    console.log("c");
    return "this c";  // 返回值
})
$(".c").click(function(e) {
    console.log("c+1");
    console.log(e.result);  // "this c"
})
```

> event.timeStamp    记录鼠标按下去的时间总和，只要一按下去就开始计时，抬起暂停，不会清零。

```js
$("div").click(function(e) {
    $(".txt").val(e.timeStamp);
})
```

> event.metaKey  是否按下 win 键（原生js）

```js
$("div").click(function(e) {
    console.log(e.metaKey)      true || false
})
```

### $.proxy 上下文

> 语法1：$(selector).proxy(function,context)
>
> 语法2：$(selector).proxy(context,name)
>
> $.proxy 用于修改this指向，常用于纠正this不正确问题

| 参数     | 描述                                                         |
| -------- | ------------------------------------------------------------ |
| function | 要被调用的已有的函数。                                       |
| context  | 函数所在的对象的名称。                                       |
| name     | 已有的函数，其上下文将被改变（应该是 context 对象的属性）就是自身方法要this指向自己 |

> $( selector ).proxy( 要执行的方法 , this指向的对象 )
>
> $(selector).proxy( 自身对象 , 自身方法 )

```js
//HTML
<button id="input" name="这是button的name">click</button>
//JS
var person = {
    name: "张三",
    test: function() {
        console.log("person对象\nname:" + this.name);
    }
}
var body = {
    name: "李四",
    test: function() {
        console.log("body对象\nname:" + this.name);
    }
}
$("#input").click(person.test);  输出是：person对象,name:这是button的name 
由上看this指向的是button标签，并不是指向person，所以要纠正this

$("#input").click($.proxy(person.test, person));  输出是：person对象,name:张三
以person对象来调用自身test方法，这是语法1
$("#input").click($.proxy(person, "test"));       输出是：person对象,name:张三
这是也自身调用方法，这是语法2

$("#input").click($.proxy(person.test, body));    输出是：person对象,name:李四
person方法this指向body对象，李四是body的

$("#input").click($.proxy(body.test, person));    输出是：body对象,name:张三
body方法this指向person对象，张三是person的
```

> 自身方法想要this指向自身的话可以使用语法2写法  
>
> $(selector).proxy(context,name)

再来一个带参数的例子

```js
//HTML
<button id="input" name="btn">click</button>

//JS
var getMsg = {
    name: "小李",
    show: function(age) {
        console.log(this.name + ":" + age)
    }
}

$("#input").click(getMsg.show)                       "btn:[object Object]"
this指向button标签，name为btn

$("#input").click($.proxy(getMsg.show, getMsg))      "小李:[object Object]"
this指向getMsg，name为小李，但是没有参数，age显示不正确

$("#input").click($.proxy(getMsg.show, getMsg, 18))  "小李:18"
后面可以追加参数，有多少参数就追加多少位

$.proxy(getMsg.show, getMsg, 18)
show: function(age,event) {
    console.log(this.name + ":" + age);
    console.log(event)
}
在最后一个参数后面会携带一个event对象
```

> 参数在最后追加有多少参数就追加多少位

### $.holdReady

> $.holdReady(true||false)     函数用于暂停或恢复 `ready()` 事件的执行。 true时暂停执行 ready 代码块
> `jQuery.holdReady(true);`

```js
$.holdReady(true);  // 暂停ready
$(function () {
    alert("read已执行");
});
setTimeout(()=>{
    $.holdReady(false); // 一秒后恢复ready
},1000)
```

### 如何禁用右键

```js
jquery写法
$(document).contextmenu(function() {
    return false;
})

原生js
document.oncontextmenu = a => false;
document.oncontextmenu = function() {
    return false;
};
```

> **contextmenu** 是右键事件
>
> 事件都会带有一个 **event** 对象，当你传的参数不够时，后面那位就是event对象

### ofset()

> 设置元素偏移坐标，这是相对于HTML标签来说的
>
> 使用 offset 设置偏移时，会给标签加上 **相对定位**

* 返回偏移坐标

  `$(selector).offset()`

* 设置偏移坐标

  `$(selector).offset({top:value,left:value})`

* 用函数设置偏移坐标

  `$(selector).offset(function(index,currentoffset))`

| 参数                          | 描述                                                         |
| ----------------------------- | ------------------------------------------------------------ |
| {top:value,left:value}        | 以map形式传入参数<br>例如:$("p").offset({top:200,left:200})  |
| function(index,currentoffset) | 规定返回包含 top 和 left 坐标的对象的函数。<br/>index - 他在选中集合中元素的位置，下标0开始。<br/>currentoffset - 返回被选元素的当前坐标。 |

```js
//HTML
<div id="A" style="width: 200px;height: 200px;margin: 50px;background-color: burlywood;"> </div>
//JS
$box = $("#A").offset();       无参数时返回标签偏移坐标
console.log($box);             "{top:50,left:50}"

$("#A").offset({	
    top: 100,				   设置偏移坐标，无须加px单位
    left: 100
});


用函数设置偏移坐标
//HTML
<div style="width: 100px;height: 100px;background-color: chocolate;">box1</div>
<div style="width: 100px;height: 100px;background-color: gold;">box2</div>
<div style="width: 100px;height: 100px;background-color: dodgerblue;">box3</div>

//JS
$("div").offset(function(index, currentoffset) {
    console.log(index);		      打印当前标签在集合中的位置  0 1 2
    console.log(currentoffset)    打印各个元素当前左偏偏移
    return {					  返回集合设置偏移坐标
        top: index * 100,         
        left: index * 100
    }
});
```

### position()

> $(this).position();     **返回** 相对于父元素的position值，只读。

```js
//HTML
<div id="A" style="width: 200px;height: 200px;background-color: pink;padding: 40px;">
    <div id="B" style="width: 150px;height: 150px;background-color: red;"></div>
</div>
//JS
console.log($("#B").position())  // "{top:40,left:40}"

```

### each()

> 遍历数组元素

| 参数     | 描述                                    |
| -------- | --------------------------------------- |
| object   | Object类型 指定需要遍历的对象或数组。   |
| callback | Function类型 指定的用于循环执行的函数。 |

```js
遍历对象
var obj = {
    "name": "Lisi",
    "age": "22"
};
$.each( obj, function( key, value ) {
    alert( key + ": " + value );
});

$.each({ name: "John", lang: "JS" }, function( k, v ) {
    alert( "键: " + k + ", 值: " + v );
});

遍历数组
var arr = [ "one", "two", "three", "four", "five" ];
$.each( arr, function( index, val ) {
    console.log("index:" + val);
});
```

### warp

> warp各类方法用于给标签外套一个新标签或者删除外套标签
>
> * **wrap**
>
>   给每一个标签外套一个标签
>
> * **wrapAll**
>
>   给所有标签外套一个大标签
>
> * **wrapInner**
>
>   给每一个标签内套一个标签
>
> * **unwrap**
>
>   移除每一个标签外的标签，移除父级标签

```js
//CSS
.wrapbox {
    border: 4px solid red;
    margin: 4px;
}
.box {
    padding: 6px;
    margin: 6px;
    border: 2px solid #000;
}
//HTML
<div id="app">
    <button id="create">click</button>
    <button id="rem">remove</button>
    <div class="box">这是一段文本</div>
    <div class="box">这是另一端文本</div>
    <div class="box">这是最后一段文本</div>
</div>
//JS
$("#create").on("click", function() {
    $(".box").wrap(function(index) {
        console.log(index);
        return "<div class='wrapbox'></div>";
    });
});

$("#rem").on("click", function() {
    $(".box").unwrap();
});

```

#### wrap()

> 在每个被选元素的周围用元素包裹起来，假如有三个元素，每个外面都会加一个 (总共添加3个父级)

| 参数            | 描述                                                         |
| --------------- | ------------------------------------------------------------ |
| wrappingElement | 规定包裹被选元素的 HTML 元素。<br/>值可以是：<br/>HTML 元素<br/>jQuery 对象<br/>DOM 元素 |
| function(index) | 用函数返回规定包裹被选的HTML元素，index为该元素在集合中的位置 |

```js
$(".box").wrap("<div class='wrapbox'></div>");		使用HTML方式创建
$(".box").wrap($("<div class='wrapbox'></div>"));   使用jQuery对象创建
var div = document.createElement("div");            使用DOM方式创建
div.className = "wrapbox";
$(".box").wrap(div);

$(".box").wrap(function(index) {              使用函数返回创建
    console.log(index);
    return "<div class='wrapbox'></div>";     返回值也可以是上面几种
});
```

#### warpAll()

> 假如有三个元素，是给三个包起来加一个 (总共添加1个父级)

| 参数            | 描述                                                         |
| --------------- | ------------------------------------------------------------ |
| wrappingElement | 规定包裹被选元素的 HTML 元素。<br/>值可以是：<br/>HTML 元素<br/>jQuery 对象<br/>DOM 元素 |

```js
$(".box").wrapAll("<div class='wrapbox'></div>");       使用HTML方式创建
$(".box").wrapAll($("<div class='wrapbox'></div>"));    使用jQuery对象创建
var div = document.createElement("div");                使用DOM方式创建
div.className = "wrapbox";
$(".box").wrapAll(div);

wrapAll 没有使用函数创建，当然也可以使用函数返回值来创建，不过这里的函数就没有了index
$(".box").wrapAll(function(index) {
    console.log(index);                   undefined
    return "<div class='wrapbox'></div>"  
});
```

#### warpInner()

> 在每个被选元素的里面用HTML元素把内容包裹起来,也就是假如有三个，每个里面都会加一个（总共添加3个子级，会把内容包含里面)）

| 参数            | 描述                                                         |
| --------------- | ------------------------------------------------------------ |
| wrappingElement | 规定包裹被选元素的 HTML 元素。<br/>值可以是：<br/>HTML 元素<br/>jQuery 对象<br/>DOM 元素 |
| function(index) | 用函数返回规定包裹被选的HTML元素，index为该元素在集合中的位置 |

```js
$(".box").wrapInner("<div class='wrapbox'></div>");       使用HTML方式创建
$(".box").wrapInner($("<div class='wrapbox'></div>"));    使用jQuery对象创建
var div = document.createElement("div");                  使用DOM方式创建
div.className = "wrapbox";
$(".box").wrapInner(div);

与 wrap 一样也是可以使用函数创建
$(".box").wrapInner(function(index) {              使用函数返回创建
    console.log(index);
    return "<div class='wrapbox'></div>";     返回值也可以是上面几种
});
```

#### unwarp()

> 移除被选元素的父元素，无须参数

```js
$(".box").unwrap();
```

### $.escapeSelector()

>  $.escapeSelector() 函数用来转义CSS选择器中有特殊意义的字符或字符串。

```js
console.log($("..p"));    报错 Syntax error

"class = "..p"
$(".box").find("." + $.escapeSelector(".p")).css('color', 'red');    需要较高版本jquery
```

### $.param(object,trad)

> 将对象转化为URL参数格式

| 参数   | 描述                       |
| ------ | -------------------------- |
| object | 规定要序列化的数组或对象。 |

```js
 var person = {
    name: "hello",
    age: 18,
}
let str = $.param(person);
console.log(str);            "name=hello&age=18"
```

> 转化成URL可携带参数用做于发送请求参数

### ready()简写

> $(document).ready(function(){})可以简写成 $(function(){})

```js
$(document).ready(function(){
// 程序段
})
等价于
$(function(){
// 程序段
})
```
