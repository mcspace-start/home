<p style="text-align:center;font-size:2rem;font-weight:bold">jquery常用事件</p>

| 方法                                     | 描述                                                         |
| :--------------------------------------- | ------------------------------------------------------------ |
| $(this).select()                         | 选中文本                                                     |
| $(this).focusin()                        | 和focu几乎相同，不同的是，当子元素发生focus事件时，focusin也会触发 |
| $(this).focusout()                       | 与上相反                                                     |
| $(this).hover()                          | 鼠标悬停时触发，事件类型（event.type）是mouseenter           |
| $(this).keypress()                       | 按键按下时触发，与keyDown的区别KeyPress 只能捕获单个字符，只是传递一个字符,keypress 事件不会触发所有的键（比如 ALT、CTRL、SHIFT、ESC）请用keydown() 方法来检查这些键 |
| $("form").submit(e)                      | 无参数时则是触发提交事件,有参数时则是提交事件时执行函数      |
| $(this).toggle(function,function,..)     | 轮流切换执行函数  (1.9移除)                                  |
| $(this).off(event,selector,function,map) | 用于清除事件                                                 |
| $(this).trigger(event,[param1,param2])   | 触发绑定到被选元素的所有事件,包括默认事件，参数1:必需。规定指定元素要触发的事件，参数二:可选。传递到事件处理程序的额外参数。 |
| $(this).triggerHandler()                 | 参数相同，触发绑定到被选元素的所有函数,不包含默认事件(比如表单提交) |

`$(this).select(function)`  &&   `$(this).submit(function)`   

```js
例子
//select
$(".txt").select(function(e) {
    alert("文本已选中");
    console.log(e.currentTarget);
});
$(".but").click(function() {
    $(".txt").select();
});
//submit
$(this).submit(function);     //提交事件  
$(".but").click(function() {
    $("form").submit();       //无参数时则是触发提交事件
});
$("form").submit(function(e) {
    e.preventDefault();  //即使提交被阻止了 还是会触发事件
    alert("提交");        //有参数时则是提交事件触发时 执行函数  
});
```

`$(this).off(event,selector,function,map)`   用于清除事件



| name                                     | age                                                          |
| ---------------------------------------- | ------------------------------------------------------------ |
| $(this).off(event,selector,function,map) | 清除事件，无参数为清除所有事件                               |
|                                          | 第一个参数是 **事件类型**    可带命名空间( namespace )<br/>第二个参数是他的 **子元素**    如果规定了这个参数则为由 **on** 定义的子元素事件会被移除第三个参数是 **事件发生时执行的函数**    可是使用map形式处理多个事件 |
|                                          | 用法一：jQueryObject.off( [ events , [selector ] , [handler ] ] )<br/>用法二：jQueryObject.off( eventsMap [, selector ] ) |

`$(this).toggle(function,function,..) `       //轮流切换执行函数  1.9移除

```js
$(".but").toggle(
    function() {
        console.log("noe");
    },
    function() {
        console.log("two");
    },
    function() {
        console.log("three");
    }
)
```



由 `$(this).triggerHandler()` 触发的事件不会在 DOM 树中冒泡；如果目标元素不直接处理它们，则不会发生任何事情

```js
$(".txt").on("focus", function(e) {
    console.log("获得焦点");
})
$(".but").click(function() {
    $(".txt").trigger("focus");
})
$(".box").click(function() {
    $(".txt").triggerHandler("focus");
})
```



| 方法                                                         |
| ------------------------------------------------------------ |
| $(selector).offset(function)                                 |
| $(selector).offset(value)                                    |
| $(selector).offset(function(index,oldoffset))  执行一个方法返回left和top |
| `offset()`用于返回和设置元素偏移位置，设置时会自动加相对定位 **relative** |

```js
用于返回位置
$("button").click(function(){
    x=$("p").offset();
    $("#span1").text(x.left);  //left
    $("#span2").text(x.top);   //top
});
用于设置位置
$("button").click(function(){
    $("p").offset({top:100,left:0});
});
```