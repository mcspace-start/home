# MySQL

> mysql 的引擎是 innodb 数据结构是 B+Tree

# SQL

> 数据库模型
>
> - 1.数据以表格的形式出现
> - 2.每行为各种记录名称
> - 3.每列为记录名称所对应的数据域
> - 4.许多的行和列组成一张表单
> - 5.若干的表单组成database（库）

1. DDL（数据定义语言）：用于定义或更改数据库结构的命令。常见的DDL命令有CREATE、ALTER和DROP。
2. DML（数据操作语言）：用于插入、查询、更新或删除数据库中的数据的命令。常见的DML命令有INSERT、SELECT、UPDATE和DELETE。
3. DQL（数据查询语言）：与DML类似，但主要用于查询数据。实际上，DQL通常与DML结合使用，例如在SELECT语句中执行UPDATE或DELETE操作。

## RDBMS 术语

在我们开始学习MySQL 数据库前，让我们先了解下RDBMS的一些术语：

- **数据库:** 数据库是一些关联表的集合。
- **数据表:** 表是数据的矩阵。在一个数据库中的表看起来像一个简单的电子表格。
- **列:** 一列(数据元素) 包含了相同类型的数据, 例如邮政编码的数据。
- **行：**一行（元组，或记录）是一组相关的数据，例如一条用户订阅的数据。
- **冗余**：存储两倍数据，冗余降低了性能，但提高了数据的安全性。
- **主键**：主键是唯一的。一个数据表中只能包含一个主键。你可以使用主键来查询数据。
- **外键：**外键用于关联两个表。
- **复合键**：复合键（组合键）将多个列作为一个索引键，一般用于复合索引。
- **索引：**使用索引可快速访问数据库表中的特定信息。索引是对数据库表中一列或多列的值进行排序的一种结构。类似于书籍的目录。
- **参照完整性:** 参照的完整性要求关系中不允许引用不存在的实体。与实体完整性是关系模型必须满足的完整性约束条件，目的是保证数据的一致性。

## sql 数据类型

| 数值类型       |                                     |
| -------------- | ----------------------------------- |
| TINYINT        | 可设置有符号和无符号，无符号最大255 |
| SMALLINT       |                                     |
| MEDIUMINT      |                                     |
| INT 或 INTEGER |                                     |
| FLOAT          | 浮点数，用于存小数                  |
| DOUBEL         |                                     |
| DECIMAL        |                                     |

| 字符串类型 |        |              |      |
| ---------- | ------ | ------------ | ---- |
| char       | 字符串 | 定长，性能高 |      |
| varchar    |        | 变长，性能低 |      |
| tinyBlob   |        |              |      |
| tinyText   |        |              |      |
| Blob       |        |              |      |
| Text       |        |              |      |
| mediumBlob |        |              |      |
| mediumText |        |              |      |
| longBlob   |        |              |      |
| longText   |        |              |      |

| 日期类型  |                |      |
| --------- | -------------- | ---- |
| date      |                |      |
| time      | 包括年月日     |      |
| year      |                |      |
| dateYear  | 混合日期和时间 |      |
| timestamp | 时间戳         |      |

## DDL 数据定义语句

>  数据库

```sql
show databases
create database [name] 创建
use [name] 使用
select database()  查看当前库
drop database  [name] 删除
```

> 表

```sql
show tables
desc table_name 查看表结构
create table table_name (字段，，，)
```

* alter 
  - add  添加新字段
  - modify 更改字段类型
  - change 更改字段名称及类型
  -  drop 删除字段

```sql
alter table table_name

add column_name
modify column_type newtype
change old_column_name new_column_name
drop column_name
```

```sql
RENAME TABLE old_table_name TO new_table_name
drop table table_name
truncate table table_name
```

> `truncate table  table_name` 删除表并重新创建该表，等于清除数据不删表

## DML 数据操作语句 

增删改

* inseter

  ```sql
  inseter into () values()
  ```

* update

  ```sql
  update table_name   set   a=a  where 	
  ```

* delete

  ```sql
  delete from  a=a where
  ```

```sql
inseter into table_name (,,,)
values(,,,)

update table_name set 字段 = value

// 删除记录
DELETE 
FROM students
where id = 15

// 删除字段
ALTER TABLE students
DROP COLUMN address
```

## DQL 数据查询语句 

> 查

* 基本查询
* 条件查询（where）
* 聚合函数（count、max、min、avg、sum）
* 分组查询（group by）
* 排序查询（order by）
* 分页查询（limit）

as  起别名（可省略）直接空格

```sql
select count(*) as 统计 from students
select count(*) 统计 from students
```

DISTINCT 去重

### 条件查询

> where

```sql
select *
from students
where 条件
```

|                  |                |
| ---------------- | -------------- |
| >                |                |
| >=               |                |
| <                |                |
| <=               |                |
| =                |                |
| <>或!=           |                |
| between...and... | 之间，包含边界 |
| in(...)          | 多选一         |
| like             | _      %       |
| is null          |                |
| not in           |                |

|      |      |
| ---- | ---- |
| any  |      |
| some |      |
| all  |      |

> 用以子查询
>
> 当使用 `ANY` 或 `SOME` 操作符时，只要子查询返回的结果集中的任何一个值满足外部查询中的条件，就会返回外部查询中的对应行。因此，如果有多个符合条件的值，外部查询可能会返回多行。

```sql
SELECT * FROM employees e1  
WHERE e1.age > ALL (SELECT age FROM employees e2 WHERE e2.id != e1.id ORDER BY age ASC LIMIT 1);
```

|            |      |
| ---------- | ---- |
| and 或 &&  |      |
| or 或 \|\| |      |
| not 或 !   |      |

> 聚合函数

|       |          |
| ----- | -------- |
| count | 统计数量 |
| max   | 最大值   |
| min   | 最小值   |
| avg   | 平均     |
| sum   | 和       |

```sql
select fun(字段)
from 表格
```

> 聚合函数不计算 null 值

### 分组查询

```sql
select 字段列表
from 表名
where 条件列表
group by 分组字段
having 分组后过滤
```

> where 和 having 不同，执行时机不同，where 分组前过滤，having 对分组后结果过滤
>
> where不能使用聚合函数，having可以

```sql
select count(gender) as 分组数量
group by gender
```

> 分组查询select关键字后面列名书写的注意事项
>
> SQL语法中规定， select关键字后面的列名 要么在group by 后面出现过，要么在selelct后面使用的聚合函数中出行过。没有出现过就不能使用。
>
> 执行顺序
>
> where > 聚合函数 > having

排序查询 order by

> `select 字段列表 from 表名 order by 字段1 排序方式1，字段2 排序方式2`

```sql
select
from
order by
```

| order by 参数 |                |
| ------------- | -------------- |
| ASC           | 升序（默认值） |
| DESC          | 降序           |

多个排序会按照第一个值相同再执行第二个排序

### 分页查询

> `select 字段列表 from 表名 limit 起始索引，查询记录`
>
> `起始索引 =（查询页码-1）* 每页显示记录数`

起始索引为零时可以省略第一个参数

```sql
limit 10;   #等于limit 0,10;
```

> 分页查询
>
> 用于从大量数据中按页获取部分数据。通过指定页码和每页记录数，查询结果返回指定页的数据。

```sql
select *
from 表名
limit 0,10  #按每10条为一页，现在查询的是第一条，也就是第一页 10就是第二页第一条
```

### 编写顺序

* select
* from
* where
* group by
* having 
* order by
* limit

执行顺序

* from
* where
* group by
* having
* select
* order by
* limit

> 唯一要注意的是 `select` 在having后面执行
>
> 先分组再排序

## DCL 数据控制语言

控制 用户，权限

* 查询用户

  ```sql
  use mysql
  select * from 'user'
  ```

* 创建用户

  ```sql
  create user '用户名'@’主机名‘ identified by '密码'
  ```

  将主机名改为 `%` 表示可以任意主机访问

* 修改密码

  ```sql
  alter user '用户名'@'主机名' identified with mysql_native_password by ’新密码‘
  ```

* 删除用户

  ```sql
  alter user '用户名'@'主机名'
  ```

### 权限类型

|                     |               |      |
| ------------------- | ------------- | ---- |
| all，all privileges | 所有          |      |
| select              | 查            |      |
| insert              | 增            |      |
| update              | 改            |      |
| delete              | 删            |      |
| alter               | 改 表         |      |
| drop                | 删 表/试图/库 |      |
| create              | 创建库/表     |      |

查询权限

```sql
show grant for '用户名'@'主机名'
```

授予权限

```sql
grant 权限列表 on 数据库名.表名 to '用户名'@'主机名'
```

撤销权限

```sql
revoke 权限列表 on 数据库名.表名 from '用户名'@'主机名'
```

# 函数

聚合函数也属于函数的一部分

* 字符串函数
* 数值函数
* 日期函数
* 流程函数

## 字符串

|                          |               |
| ------------------------ | ------------- |
| concat(s1,s2,s3)         | 拼接          |
| lower(str)               | 小写          |
| upper(str)               | 大写          |
| lpad(str,n,pad)          | 左填充        |
| rpad(str,n,pad)          | 右填充        |
| trim(str)                | 首尾去空      |
| substring(str,start,len) | 裁剪，起始为1 |

## 数值

|            |                   |
| ---------- | ----------------- |
| ceil(x)    | 向上取整          |
| floor(x)   | 向下取整          |
| mod(x,y)   | 取模              |
| rand()     | 随机              |
| round(x,y) | 四舍五入，y小数位 |

## 日期

|                                   |                                  |
| --------------------------------- | -------------------------------- |
| curdate()                         | 当前日期                         |
| curtime()                         | 当前时间                         |
| now()                             | 返回包括年月日                   |
| year(date)                        |                                  |
| month(date)                       |                                  |
| day(date)                         |                                  |
| date add(date,interval expr type) | 返回增加一个时间值，可以是年月日 |
| datediff(date1,date2)             | 之间相差的天数                   |

```sql
SELECT CURDATE()
SELECT CURTIME()
SELECT NOW()
SELECT YEAR(NOW())
SELECT MONTH(NOW())
SELECT DAY(NOW())
-- 往后推
SELECT DATE_ADD(NOW(),INTERVAL 70 DAY)
SELECT DATE_ADD(NOW(),INTERVAL 70 MONTH)
SELECT DATE_ADD(NOW(),INTERVAL 70 YEAR)
-- 比较
SELECT DATEDIFF(NOW(),"2008-01-01")
```

## 流程控制

|                                                            |                                             |
| ---------------------------------------------------------- | ------------------------------------------- |
| if(value,t,f)                                              |                                             |
| ifnull(value1,value3)                                      | 如果value1不为空则返回value1,否则返回value2 |
| case when [value] then[res1]...else[default] end           | 类似 switch                                 |
| case [expr] when [value] then [res1] ...else [default] end |                                             |

```sql
SELECT if(true,"对","错")
SELECT IFNULL(null,"错")
SELECT IFNULL("对","错")

SELECT 
	name,
	address,
	CASE 
		WHEN city in("北京","上海","广州")   // 判断
		THEN   // 符合
			"一线城市"
		ELSE "其他城市"  // 不符合
	END AS "工作地址"  // 添加 end

FROM employees
// 
SELECT 
	name,
	address,
    CASE city   
        WHEN "北京" THEN '一线'  
        WHEN "上海" THEN '一线'  
        ELSE '其他'   
    END AS "城市" 
FROM employees;
// 一个是卸载case前面一个是在后面
```

# 约束

> `DROP INDEX` 命令不能删除由 `CREATE TABLE` 或者 `ALTER TABLE` 命令创建的主键或者唯一性约束索引，既在对表建立主键或唯一性约束时自动建立的聚集索引或唯一非聚集索引；也不能删除系统表中的索引。

|          |              |             |
| -------- | ------------ | ----------- |
| 非空约束 | 不能为空     | not null    |
| 唯一约束 | 唯一不重复   | unique      |
| 主键约束 | 非空唯一     | primary key |
| 默认约束 |              | default     |
| 检查约束 | 满足条件     | check       |
| 外键约束 | 两表建立联系 | foreign key |

```sql
create table user(
	id int           PRIMARY KEY auto_increment,
	name varchar(10) not null UNIQUE,
	age int 				 CHECK(age>0 and age<=120),
	status char(1)   DEFAULT "1" ,
	gender char(1)
)

ALTER TABLE table_name  
ADD UNIQUE (column_name);
```

### 主键

```sql
# 第一种方式
CREATE TABLE t ( 
	id int not null primary key
);
# 第二种方式
CREATE TABLE t ( 
	id int not null, #记得逗号
	primary key(id)
);
```

### 外键

> 如果不设置外键可能导致数据不一致，例如把子表内容修改了，但是并未建立外键，所以会导致总之数据不一致

```sql
-- 创建学生表  
CREATE TABLE Students (  
    INT PRIMARY KEY,  
    StudentName VARCHAR(50),  
    ClassID INT  
);  
  
-- 创建成绩表  
CREATE TABLE Grades (  
    GradeID INT PRIMARY KEY,  
    StudentID INT,  
    CourseID INT,  
    GradeValue DECIMAL(5,2),  
    FOREIGN KEY (StudentID) REFERENCES Students(StudentID),  
    FOREIGN KEY (CourseID) REFERENCES Courses(CourseID)  
);
```

> `FOREIGN KEY (被绑定字段) REFERENCES 绑定字段所在表(绑定字段	)  `
>
> 若是修改 关键字 `constraint  constraint`

```sql
ALTER TABLE 表名
ADD CONSTRAINT 外键名  --添加约束
FOREIGN KEY (关联字段) REFERENCES customers(关联主键字段);
#删除外键
alter table 表名
drop foreign key 键名

```

### 删除/更新行为

|             |            |
| ----------- | ---------- |
| no action   | 不允许删除 |
| restrict    | 不允许删除 |
| cascade     | 同步删除   |
| set null    | 设置null   |
| set default | 设置默认值 |

```sql
alter table 表名
add constraint 外键名称
foreign key (外键字段) references 主表名(关联字段)
on update 行为 on delete 行为
```



# 多表查询

![img](data:image/gif;base64,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)

> `select * from 表a,表b`

### 内连接

> inner join，等于取A B交集

```sql
# 隐式内连接
select * 
from a,b
where a.id = b.id
# 显示内连接
select *
from a inner join b on a.id = b.id  
```



### 外连接

> `outer` 可以省略

#### 左连接

> 取全部 A 部分内容

```sql
select a.*,b.* 
from a left join b on a.id = b.id
#from a left outer join b on a.id = b.id
```

#### 右连接

> 取全部 B 部分内容

```sql
select a.*,b.* 
from a right join b on a.id = b.id
#from a right outer join b on a.id = b.id
```

### 自链接

> 自己连接自己，需要起别名

```sql
select * 
from table1 as A,table1 as B
where A.id = B.sid
```

### 联合查询

> `union`
>
> union all
>
> 查询结果合并
>
> `union all` 可能会出现相同数据 `union` 会去重
>
> 字段数要一致，类型也必须一致

```sql
select *
union
select*

select *
union all
select *
```

> 使用联合查询会使性能更高效，代码更直观，和多个and类似

### 子查询

> 嵌套 `select` 语句为子查询，嵌套查询

```sql
select * 
from a
where id = (
						select *
  					fromeb
					  )
```

* 标量子查询

  返回的结果是单个值，一般用比较运算符`=,!=,<,>,...`

* 列子查询

  结果是一列（可以多行），一般用操作符 `in,not in,any,some,all`

* 行子查询

  记过是一行（可以是多列），一般用`=,!=,in,not in`

* 表子查询

* 结果是多行多列（一个表），一般用 `in`



```sql
# 标量子
select * frome a
where count > (select id frome b,where...)
# 列
select * from a
where salary > all(返回多个结果)
# 行
select * from a
where (x,y) = (...)   # 返回多列结果一起比较
# 表
select * from a
where (x,y) in (...) # 结果是多行多列的，既要满足行条件也要满足列条件	

select * from (select * frome a,where ...) as e left join table_name on e.id = table_name.id
# 这里的 () 内子查询就相当于建立了一个临时表
# 在 from 之后使用子查询
```

> 当使用 `ANY` 或 `SOME` 操作符时，只要子查询返回的结果集中的任何一个值满足外部查询中的条件，就会返回外部查询中的对应行。因此，如果有多个符合条件的值，外部查询可能会返回多行。
>
> `all` 必须是全部
>
> `(a,b)=(res1,res2)`
>
> 子查询也可以出现在 `select` 之后
>
> `select s_name,(select age,...) from a,where ...`

# 事务

> 事务处理可以确保除非事务性单元内的所有操作都成功完成，否则不会永久更新面向数据的资源。通过将一组相关操作组合为一个要么全部成功要么全部失败的单元，可以保护数据在事务处理过程中的完整性和一致性。

## 事务操作

### 查看/设置

```sql
select @@autocommit 
set @@atuocommit = 1  #1为自动提交，0为不自动提交
```

### 提交事务

```sql
commit;
```

> 不提交事务的话即使语句执行完，但是数据是没有变化的

### 事务回滚

```sql
rollback;
```

### 开启事务

```sql
start transaction
```

> 设置了 `start transcation` 事务提交方式将变为手动，不提交将不会更改数据

## 事务四大特性

* 原子性：要么全部成功，要么全部失败
* 一致性：事务结束时，所有数据保持一致
* 隔离性：独立环境下运行
* 持久性：一旦提交或回滚，对数据的改变是永久的

## 事务并非问题

* 脏读： 一个事务读到另一个还未提交的事务数据

  事务1修改了数据但位提交事务，事务2读取到了未提交的数据

* 不可重复读：一个事务先后读同一条数据，但两次结果不一样

  事务1连续读取数据，事务2期间更新了数据，导致数据不一致

* 幻读：查询时没有，插入时数据又在

  “幻读”是数据库并发控制中的一个概念，主要发生在事务处理过程中。当一个事务在读取某个范围内的记录时，另一个并发事务插入了一些新的记录，导致前一个事务在再次读取相同范围时看到了前一次查询没有看到的行，这种现象就被称为“幻读”。

  在标准的SQL隔离级别中，“幻读”只会发生在“可重复读”（REPEATABLE READ）隔离级别下

## 事务隔离级别

| 级别                | 脏读 | 不可重复读 | 幻读 |
| ------------------- | ---- | ---------- | ---- |
| red uncommited      | Y    | Y          | Y    |
| red commited        | N    | Y          | Y    |
| repeatable red 默认 | N    | N          | Y    |
| serializble         | N    | N          | N    |

> `SELECT @@transaction_isolation`  查看权限等级
>
> `SET [session|global] TRANSACTION ISOLATION LEVEL[...|...]` 设置权限

# 存储引擎

> 存储引擎是存储数据，建立索引，更新/查询数据的实现方式。引擎是基于表的不是基于库的，一个库不同表可以设置不同引擎。
>
> 默认 `innoDB`

|        |                                                      |
| ------ | ---------------------------------------------------- |
| innoDB | 支持事务、外键、行锁                                 |
| MySAM  | 支持表锁，性能效率高                                 |
| MEMORY | 将数据保存在内容中，访问速度快，无法保障数据的安全性 |

> `SHOW ENGINES` 查看数据库引擎
>
> `create table xxx(..) engine=INNODB` 在创建表时指定引擎	

# 索引

> 索引时一种有序的数据结构，是一种数据结构，指向原始数据，用以高效获取数据	
>
> 就像是一本书的目录，用于快速查询数据

## 索引结构

|             |                                            |
| ----------- | ------------------------------------------ |
| B+Tree 索引 | 最常见，多路平衡树，不同于二叉树只有两条路 |
| hash        | 哈希表实现，不支持范围查询                 |
| R+tree      | 主要用在MyISAM                             |
| full+text   | 建立倒排索引                               |

> B+tree 先对于二叉树
>
> 层级更少，效率更高
>
> 相对于b+tree，无论是叶子还是非叶子节点，都会保存数据，这样导致一页存储的键值更少，指针跟着减少，大量数据时，只能增加树的高度降低效率
>
> 相对于hash索引来说，hash不能进行范围查询

## 索引分类

| 分类 | 含义                 | 特点               | 关键字  |
| ---- | -------------------- | ------------------ | ------- |
| 主键 | 针对于主键           | 自动创建，只有一个 | primary |
| 唯一 | 避免重复             | 可以多个           | unique  |
| 常规 | 快速定位             | 可以多个           |         |
| 全文 | 查找关键字，而不是值 | 可以多个           | fulltxt |

|                          |                                                |                  |
| ------------------------ | ---------------------------------------------- | ---------------- |
| 聚集索引 clustered index | 将数据存储和索引放一块，叶子节点保留的是行数据 | 必须有，只有一个 |
| 二级索引 secondary index | 将数据存储与索引分开，叶子节点保留的是对应主键 | 可以多个         |

> 聚集索引规则
>
> 如果存在主键，主键就是聚集索引
>
> 如果不存在，使用第一个唯一 unique
>
> 如果没有 unique，会自动生成一个隐藏的
>
> 二级索引存储的是==主键==引用

![huibiao](data:image/gif;base64,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)



## 索引语法

### 创建

> 

### 查看

> `show index from table_name`

### 删除

> `drop index index_name on table_name`

## 性能分析

> `show [session|global] status`
>
> 查看当前数据库 `inster、update、delect、select` 的频率

```sql
show GLOBAL STATUS LIKE "Com_______"
```

**慢查询日志**



执行计划

> `explain | desc select * ...`

`EXPLAIN`命令用于显示查询的执行计划，帮助开发人员了解查询是如何被优化的。`EXPLAIN`命令的输出中包含一个`type`列，该列的值表示查询的执行类型。以下是`type`列可能的值：

1. **NULL**：表示查询不需要访问表或者索引，可以直接得到结果。
2. **system**：表示查询只访问了一个数据页，这是最快的查询类型。
3. **const**：表示查询只匹配一行数据，这是最快的查询类型之一。
4. **eq_ref**：表示查询使用了唯一索引或主键进行等值匹配，每个索引键值只匹配一行数据。
5. **ref**：表示查询使用了非唯一索引或者唯一索引的前缀扫描，返回匹配某个单独值的记录行。
6. **range**：表示查询使用了索引范围扫描，常见于`<`、`<=`、`>`、`>=`、`between`等操作符。
7. **index**：表示查询使用了全索引扫描，MySQL遍历整个索引来查找匹配的行。
8. **ALL**：表示查询进行了全表扫描，MySQL扫描全表来找到匹配的行。

## 索引使用

>  联合索引

* 最左前缀法则
  * 必须满足最左前缀法则（查询时必须包含最左边的列）否则将不生效
  * 跳过中间则会部分失效

```sql
create index index_name on table_name(a,b,c)

select * from tb where a="x"  #正常
select * from tb where b="x"  #失效
select * from tb where a="x" and c="x" #部分失效
```

> 满足最左前缀法则与代码书写位置无关

**范围查询**

> 联合索引中，出现范围查询(>,<)，范围右侧的列索引失效

```sql
select * from tb where a > 20 and b ="0" #b 将不经过索引

#规避方法 使用大于等于或小于等于
select * from tb where a >= 20 and b ="0" #b 将不经过索引
```

当执行查询 `WHERE a > 20 AND b = 30` 时，即使 `a` 和 `b` 都是聚合索引的一部分，`b` 索引仍然可能会失效。这是因为查询条件中 `a > 20` 是一个范围查询，它会导致索引树在搜索时跳过一些不满足条件的节点。由于这个跳跃，索引树无法有效地利用 `b` 列的索引信息来加速查询。

然而，如果将查询条件改为 `WHERE a >= 20 AND b = 30`，则不会出现 `b` 索引失效的情况。因为 `a >= 20` 仍然是一个范围查询，但它不会导致索引树进行大的跳跃，从而可以继续利用 `b` 列的索引信息进行查找。

```sql
CREATE INDEX ind_stu_id_money on students(id,money)

#rows 1
explain select student_name 
FROM students 
WHERE id =1 and money = 10

#rows 4 money索引失效了
explain select student_name 
FROM students 
WHERE id <5 and money = 10

explain select student_name 
FROM students 
WHERE id <=1 and money = 10
```

### 索引失效

> 如果在查询中对索引列使用了函数或运算，这会导致索引失效

* 索引列上运算

* 字符串不加引号（数据类型不匹配）

* 模糊查询

  尾部模糊匹配索引不会失效

* or连接条件

  or前面有索引后面没有索引，则涉及的索引都不会被用到

* 数据分布影响

  mysql评估使用索引比全搜索慢

```sql
#并没有走索引
explain select student_name 
FROM students 
WHERE money >= 0
#走索引了
WHERE money >= 99
```

### SQL提示

> 当有多个索引都覆盖绑定同一个值的时候，可以选择切换
>
> use index() 建议使用哪个索引，不一定会使用
>
> ignore index()  忽略哪个索引
>
> force index() 必须使用哪个索引

```sql
select * 
from a
use index(index_name)
where ...
```

### 覆盖索引

> 使用覆盖索引避免使用 `select *`
>
> 回表，在使用二级索引查找聚集索引所包含的数据时会回表查询
>
> 索引覆盖是指查询中使用的所有列都包含在索引中，这样数据库就不需要访问表中的数据行来获取查询结果，而是可以直接从索引中获取所需的数据。这可以大大提高查询效率，减少数据访问的开销。
>
> 
>
> 简单来说就是避免回表查询

### 前缀索引

> ``create index index_name on table_name(index_col_name(n))``
>
> 在MySQL中，可以使用前缀索引来优化某些查询操作。例如，对于一个包含大量文本数据的字段，如果只需要根据该字段的前几个字符进行查询，那么可以使用前缀索引来提高查询效率。
>
> 选择性
>
> `select count(distinct substring(1,5))/count(*) from`
>
> 查看一下重复度
>
> 
>
> 简单来说就是二级索引储存的键值太大，进行裁剪后存储

### 单列索引和联合索引

> 当单列索引和联合索引绑定同一列的时候MySQL会默认使用单列索引
>
> 若需要切换可使用
>
> ```sql
> use index()
> ignore index(	)
> force index()
> ```

### 索引设计原则

1. 数据量大，超过一百万条，频繁查询
2. 常出现在（where、order by、group by）后的字段
3. 区分度高的，与别的数据区别大的
4. 字符串字段建立索引，长度较长的，使用前缀索引
5. 尽量使用联合索引，减少单列，避免回表提升效率
6. 控制索引数量
7. 如果索引列不能存储 `null`值，建表时使用 `not null` 

# SQL优化

### 插入数据

* 批量插入

* 手动提交事务

  `START TRANSACTION` 或 `BEGIN`

* 主键顺序插入

* 插入大量数据时使用 `load`

  `mysql --local-infile -u root -p`

  `set global locat_infile = 1`

  `load data local infile '/root/sql.log into table 'tb_user' fields terminated ny',' lines terminated by '/n'	`

  ```sql
  load LOCAL INFILE'/xx' INTO TABLE 'table_name' FIELDS TERMINATED by ',' LINES TERMINATED by '\n' 
  ```

### 主键优化

* 数据组织方式，数据根据主键数据顺序存放的（索引组织表）

  页分裂，乱序导致页分裂

  页合并，默认百分之50

* 主键设计原则

  1. 尽量降低主键长度
  2. 使用顺序插入，尽量使用`auto_increment` 避免页分裂
  3. 尽量避免使用 UUID ，因为是无序的
  4. 避免修改主键

### order by优化

1. Using filesort，内存中进行排序
2. Using index，通过索引

> 在创建索引时时指定升序还是降序

```sql
CREATE INDEX index_name ON table_name (column_name DESC);
```

> 创建索引时如果未指定排序，默认升序 asc
>
> 如果我们需要降序时则会出现 `using filesort` ，可以再键一个降序索引来避免该问题
>
> 联合索引数据结构默认先按第一个绑定字段升序，再第二个字段升序

* 根据排序字段建建立合适索引，多段字段时，也遵守最左前缀法则

* 尽量使用覆盖索引

* 注意联合索引在创建时的规则

  在创建索引时就指定升序或降序	

### group by优化

* 使用索引
* 满足最左法则，可以在where使用最左字段

### limit 优化

> limit 针对与越后面的数据查询耗时越久
>
> 不要使用`select *`

* 通过覆盖索引加子查询

无优化

```sql
select *
from tb
order by
limit 10000,10
```



```sql
#不能在in后面使用limit
select *
from tb
where id in (
  					select id 
            from tb
  					order by
            limit 10000,10
            )
```

通过覆盖索引加子查询

```sql
select a.*
from tb as a,(
				select id
  			from tb
  			order by
  
  			limit 10000,10 
				) as b
where a.id = b.id
order by

```

### count()优化

> 自己计数
>
> mysql对`count(*)`做了优化，如果只是统计总数使用`count(*)` 或`count(1)` 效率最高
>
> 性能：`count(字段) < count(主键) < count(1) ≈ count(*)`

### update优化

> 在innoDB默认隔离权限下，事务在未提交时会进行 `行锁`，如果对应字段没有索引则会是 `表锁`
>
> 在使用update更新时要使用索引进行数据更新，并且索引不能失效，不然行锁就会升级为表锁，降低并发性能

# 视图 view

> 视图是一种虚拟表，数据都来源于定义视图的查询中使用的表，并且是在使用视图中动态生成的
>
> 视图不保存数据只保存逻辑

## 创建

> `create [or replace] view 视图名称 as select语句`

## 使用

> 查看创造视图语句
>
> `show create view 视图名称`
>
> 查看视图数据
>
> `select * from 视图名称 ...`

```sql
create view stu_v1
as
select id,name
from student
where id<10
```

## 修改

1. `create or replace view 视图名称 as select ...`  替换
2. `alter view 视图名称 as select ...`

## 删除

> `drop view [if exists] 视图名称 `



## 检查选项

> `with cascaded check option`

```sql
CREATE VIEW vie_stu AS  
SELECT * FROM students  
WHERE age BETWEEN 18 AND 25  
WITH CHECK OPTION;  // 添加视图约束条件
```

|          |                                                              |
| -------- | ------------------------------------------------------------ |
| cascaded | 默认，当对通过视图进行数据修改时，不仅会检查当前视图定义的条件，还会检查其依赖的视图的条件 |
| local    | 当对视图进行数据修改时，只会检查当前视图的条件               |

`cascaded` 会检查所依赖视图的条件，即使依赖视图没有设置`with check option` 一样生效

```sql
#视图一
create or replace VIEW vie_stu as
select * 
FROM students
where course_id >5
#with check option //即使这里没有设置check 由于试图二默认是 cascade 这里的where一样生效

#视图二
create or replace VIEW vie_stu2 as
select * 
FROM vie_stu
where money >200
with check option  // 默认cascaded，也必须满足 course_id>15
```

> 视图嵌套时
>
> 如果 `view_1` 在 `view_2` 之前设置了 `WITH CHECK OPTION`，那么无论在 `view_2` 中是否设置 `WITH CHECK OPTION` 或 `CASCADED`，`view_2` 中的数据仍然会受到 `view_1` 的 `WITH CHECK OPTION` 的限制。因为当数据库查询 `view_2` 的数据时，实际上是在查询 `view_1` 的数据，并根据 `view_1` 的条件进行过滤。因此，无论在 `view_2` 中是否设置 `WITH CHECK OPTION` 或 `CASCADED`，都会受到 `view_1` 的条件限制。

local

> 设置为`local` 的时候将不会取检查前面的条件

```sql
with local check option
```

> 在view_2视图里，无论加不加 `with cascaded check option` 都会对上一个视图的 `with cascaded check option` 进行检查
>
> 设置为` with local check option` 为 `只` 对本视图检查，这个时候就不会去检查 view_1 的检查条件了

`with cascaded check option`

![v1](data:image/gif;base64,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)

`with local check option`

![v2](data:image/gif;base64,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)

结合

![v3](data:image/gif;base64,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)

## 视图更新

> 要使视图更新，必须保证视图中的行与基础表之间存在一对一的关系，如果包含下列任何一项都不行

* 聚合函数或窗口函数
* distinct
* group by
* having
* union 或 union all

更新与插入都一样必须与基础表数据一一对应

## 视图作用

1. 简化操作

2. 提高安全性

3. 数据独立

   如果基础表字段名发生变化，只需改视图即可

4. 逻辑分离

# 存储过程 procedure

> 减少网络互动，提高性能
>
> 封装，复用
>
> 使用流程控制语句实现更多功能

## 创建

> `create procedure`

```sql
create procedure 存储过程名字([参数列表])
begin
  语句块
end
```

## 使用

> `call`

```sql
call 存储过程名称([参数列表])
无参加不加括号都行
```

## 查看

> `show create`

```sql
show create p1
```

## 删除

> `drop`

```sql
drop procedure p1
```

## 变量

### 系统变量

* 全局变量
* 会话变量

查看

```sql
show [session|global] variables;
show [session|global] variables like '...';
select @@[session|global] 系统变量名
```

设置

```sql
set [session|global] 系统变量名 = 值;
set @@[session|global] 系统变量名 = 值;
```

```sql
set @@session.autocommit = 1
```

### 用户自定义变量

> `@变量名`
>
> 赋值建议使用 `:=` 因为比较符也是 `=`

```sql
set @变量名 = 表达式
set @变量名 := 表达式

select @变量名

select 字段名 into @变量名
```

```sql
set @a = 10
set @a = 10,@b ="hello"

select student_name
into @stu_name
from students
```

> 用户定义变量不需要提前声明，未定义变量打印 `null`

### 局部变量

> `declare` 局部声明变量，只能在`begin end`之间使用
>
> `declare 变量名 变量类型[default]`

```sql
CREATE PROCEDURE p2()
BEGIN
		DECLARE stu_count INT DEFAULT 0;
		SELECT COUNT(*) into @stu_count FROM students;
		select @stu_count;
END

CALL p2
```

## if

```sql
if 条件1 then ...
elseif 条件2 then ...
else ...
end if;
```

```sql
CREATE PROCEDURE p3()
BEGIN
		DECLARE score INT DEFAULT 58;
		declare res VARCHAR(10);
		
		if score >= 85 then
			set res := "优秀";
		elseif score >= 60 then
			set res := "及格";
		else  # else 后面不需要then
			set res := "不及格";
		end if;  # 注意end if
		
		select res;
END

CALL p3
```

## 参数

> `create procedure 存储过程名([in|out|inout 参数名 参数类型 ])`

**类型**

|       |            |
| ----- | ---------- |
| in    | 输入，默认 |
| out   | 返回参数   |
| inout | 两者都可   |

```sql
CREATE PROCEDURE p4(in score int,out res VARCHAR(10))
BEGIN		
		if score >= 85 then
			set res := "优秀";
		elseif score >= 60 then
			set res := "及格";
		else
			set res := "不及格";
		end if;
END

CALL p4(68,@result)
```

```sql
#200分制换算100
CREATE PROCEDURE p5(inout score DOUBLE)
BEGIN		
		set score := score  * 0.5;
END

set @score := 78
CALL p5(@score)
SELECT @score
```

## case

```sql
#写法一
case 值
		when 判断值 then ...
		[when 判断值 the]...
		[else ...]
end case

#写法二
case 
		when 判断 then ...
		[when 判断 the]...
		[else ...]
end case
```

```sql
#判断季度
CREATE PROCEDURE p9 ( IN month INT )
BEGIN
		DECLARE result VARCHAR ( 10 );
		CASE
				WHEN month>=1 and month<=3 THEN
				SET result := "第一季度"; 

				WHEN month>=4 and month<=6 THEN
				SET result := "第二季度";

				WHEN month>=7 and month<=9 THEN
				SET result := "第三季度"; 	

				WHEN month>=10 and month<=12 THEN
				SET result := "第四季度"; 	
				
				else 
			  set result =  "非法参数";
		END CASE;
	
	select CONCAT("您输入的月份为",month,'所属的季度为：',result) as 季度;
END

call p9(16)
```

## 循环结构

|        |                  |
| ------ | ---------------- |
| while  | 满足条件进行循环 |
| repeat | 满足条件退出循环 |
| loop   |                  |

```sql
# while
CREATE PROCEDURE p10 ( IN n INT ) BEGIN
	DECLARE
		total INT DEFAULT 0;
	WHILE   #开始
			n > 0 DO
			
			SET total := total + n;
			set n := n-1;
	END WHILE;  #end while
	SELECT
		total;
end;

CALL p10 (100)
```

```sql
#repeat
CREATE PROCEDURE p11 ( IN n INT ) BEGIN
	DECLARE total int default 0;
	REPEAT
		set total := total + n;
		set n := n-1;
		UNTIL n <= 0 
	END REPEAT;
	SELECT total;
end;

CALL p11 (100)
```

> `loop`
>
> `leave`，`iterate`

```sql
#累加
CREATE PROCEDURE p12 ( IN n INT ) BEGIN
	DECLARE
		total INT DEFAULT 0;
	sum :  #loop标记
	LOOP
		IF n <=0 THEN #判断退出条件
				LEAVE sum; #退出循环
		END IF;
		
		set total := total +n;
		set n  := n-1;
		
	END LOOP sum;  #结束loop
	 select total;
END;
CALL p12 (10)

# 偶数累加
CREATE PROCEDURE p13 ( IN n INT ) BEGIN
	DECLARE
		total INT DEFAULT 0;
	sum :
	LOOP
		IF n <=0 THEN
				LEAVE sum; #退出循环
		ELSEIF n %2=1 then
		    set n  := n-1; #-1
				iterate sum; # 类似continue
		END IF;
			set total := total +n;
			set n  := n-1;
		
	END LOOP sum;
	 select total;
END;

CALL p13 (100)
```

## 游标

> 游标（Cursor）是数据库中用于存储查询数据结果集的一种数据类型。
>
> 游标必须在存储过程或函数里面声明
>
> `declare 游标名称 cursor for 查询语句`

1. 声明

   `declare 游标名称 curse for 查询语句`

2. 打开

   `open 游标名称`

3. 获取

   `fetch 游标名称 into 变量[,变量]`

4. 关闭

   `close 游标名称`

```sql
CREATE PROCEDURE p6 (in uage int) BEGIN #

	DECLARE uname VARCHAR(100);  # 定义用于存储从游标读出的数据
	DECLARE uscore VARCHAR(100);
	# 声明游标 读取数据结果集
	DECLARE u_cursor cursor for SELECT student_name,score FROM students WHERE age<= uage; 
	#声明条件处理程序
	DECLARE exit handler for not found close u_cursor;# not found没有数据执行close
	
	drop table if EXISTS tb_user_score;# 删除已存在表
	create table if not EXISTS tb_user_score(#创建一个表用于存储游标数据
	id int primary key auto_increment,
	name VARCHAR(100),
	score VARCHAR(100)
	);
	
	open u_cursor; #打开游标
	WHILE true DO
		
		FETCH u_cursor into uname,uscore; # 读取游标内容
		
		insert into tb_user_score 
		values(null,uname,uscore);
		
	END WHILE;
	close u_cursor; #关闭游标
	
END;

CALL p6(20)
```

> 游标的声明必须在变量声明之后

## 条件处理程序 handler

> 条件处理程序（Handler）在MySQL中用于处理异常情况。当在存储过程或函数中发生异常时，可以使用条件处理程序来捕获异常并执行相应的操作。
>
> 条件处理程序使用`DECLARE HANDLER`语句来定义，并指定要捕获的异常类型和处理操作。常见的异常类型包括`NOT FOUND`、`SQLEXCEPTION`等。

```sql
declare handler_action handler for condition_value[,condition_value]... statement;

handler_action
		continue:继续执行当前程序
		exit:退出当前程序
condition_value
		SQLstate sqlstate_value:状态码
		SQLWARNING:所有以01开头的SQLstate代码缩写
		NOT found:所有以02开头的SQLstate代码缩写
		SQLEXCEPTION:所有没有被 SQLWARNING 和 NOT FOUND捕获到的代码
```

```sql
CREATE PROCEDURE p14 ()   
BEGIN  
  DECLARE done INT DEFAULT FALSE;  #用于控制循环退出
  DECLARE name VARCHAR(10);  #存储读取游标数据
  DECLARE c CURSOR FOR SELECT student_name FROM students;  #游标
  DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;  #条件处理程序
  
  OPEN c;  #打开游标
  read_loop: LOOP  #循环读取游标
    FETCH c INTO name;  #读取游标内容
		
		#操作数据区域
		
    IF done THEN  
      LEAVE read_loop;  #退出游标 
    END IF;  
  END LOOP read_loop;  
  CLOSE c;
END;
```

# 存储函数 function

> 存储函数是由返回值的存储过程，类型只能是`in`类型
>
> 存储函数必须有返回值

```sql
create function 存储函数名称([参数列表])
returns type [characteristic ...]
begin 
		...sql语句
		return ...;
end;

characteristic说明
- deterministic：输入参数和产生结果相同 
- no sql：不包含sql语句
- reads sql data：包含读取数据语句，不包含写入数据语句
```

```sql
create function fun1( n int) #关键字 function
returns int DETERMINISTIC  #声明返回类型和返回约束
begin
	declare total int default 0;
	
	while n>0 do
		set total := total + n;
		set n := n-1;
	end while;
	
	return total;
end;

select fun1(100)  # 直接函数名调用
```







# 触发器 trigger

> 触发器是数据库中用于处理表上特定事件（如插入、更新、删除）的特殊存储过程，由特定事件触发的。这些事件通常包括对数据库表的INSERT、UPDATE或DELETE操作。当这些事件发生时，触发器就会被激活并执行相应的操作。
>
> 确保数据完整性，日志记录，数据校验

|        |                 |
| ------ | --------------- |
| insert | new为新插入数据 |
| update | old和new        |
| delete | 只有old         |

## 创建

> `create trigger 名称 执行顺序 对应操作 on 表名 for each row 逻辑`

```txt
create trigger trigger_name
before/after insert/update/delete
on tb_name for each row ---行级触发器
begin
	trigger_stmt
end;
```

```sql
# 监控插入的触发器
CREATE TRIGGER stu_insert_trigger   
AFTER INSERT ON students   #after在插入之后
FOR EACH ROW   # 行级触发
BEGIN  
		#触发器执行代码
    INSERT INTO students_log (id, ops, ops_time, ops_id, ops_params)  
    VALUES  
        (  
            NULL,  
            'insert',  
            NOW(),  
            NEW.id,  
            CONCAT('插入的内容为：id=',
              NEW.id,',student_name=',  # 使用关键字new
							NEW.student_name,NEW.course_id,
      				',score=',NEW.score, ',age=',new.age)  
        );  
END;

#更新
CONCAT('更新之前的内容为：id=',  old.id,',student_name=',
old.student_name,old.course_id,  ',score=',old.score, ',age=',old.age,

'更新之后的内容为：id=',  NEW.id,',student_name=',
NEW.student_name,NEW.course_id,  ',score=',NEW.score, ',age=',new.age)  
#删除就只有 old
```

> 存储过程和触发器可以同时存在于数据库中，但它们不能嵌套使用。这意味着你不能在一个存储过程中直接创建另一个存储过程或触发器。
>
> 数据变更了多少行触发器就会执行多少次，因为是行级触发器

## 查看

> `show triggers`

```sql
show triggers;
```

## 删除

> `drop trigger`

```sql\
drop trigger	stu_insert_trigger;
```



# 锁

>在数据库中，锁是用于控制并发访问的一种机制。它能够防止多个事务同时修改同一资源，从而保证数据的一致性和完整性。锁可以防止脏读、不可重复读和幻读等问题。
>
>共享锁与`读`相关，查询或分组
>
>排他锁与`写`相关，插入、更新或删除

- **共享锁（Shared Locks）**：也称为读锁，允许多个事务同时读取一个资源，但不允许写入。
- **排他锁（Exclusive Locks）**：也称为写锁，只允许一个事务对资源进行修改或写入，其他事务不能访问。

## 备份

> 数据库备份工具，不要在命令行输入
>
> `mysqldump -u [用户名] -p[密码] --databases [数据库名] > [备份文件名].sql`
>
> `--single-transaction` 对不加锁的数据保持数据一致性，快照

```sql
mysqldump -u root -p 123456 itcast>itcast.sql
mysqldump --single-transaction -uroot -p123456 itcast>itcast.sql
```

## 全局锁

> 对整个数据库加锁，加锁后整个数据库所有表都**只能读取**，DML、DDL都不可执行
>
> `flush tables with read loc	k` 加锁
>
> `unlock tables` 解锁

```sql
flush tables read lock;
unlock tables;
```

## 表级锁

### 表锁

1. 表共享读锁（read lock）

   都可以读，无法写入

2. 表独占写锁（write lock）

   自己可读可写，其他不可读不可写

> 加锁`lock tables 表名... read/write`
>
> 释放锁`unlock tables/客户端断开连接` 解锁全部表

```sql
lock tables student read
unlock tables;

lock tables sutdent write
unlock tables;
```

### 元数据锁

> meta date lock
>
> 元数据简单来说就是表结构
>
> 系统会自动控制
>
> 为了防止`dml`和`ddl`之间的冲突
>
> 在进行 select 或 update 的时候会开启

### 意向锁

> 为了避免dml在执行时，行锁和表锁的冲突，表锁在加入时会每行检查是否加了行锁，会导致性能下降
>
> 主要为了解决行锁和表锁之间的冲突
>
> MySQL中的意向锁是自动的，通常不需要开发人员手动管理。当事务需要获取行级锁时，MySQL会自动检查并设置相应的意向锁。

1. 意向共享锁（IS）

   由语句 `select ... lock in share mode` 添加

   与表锁共享锁（read）兼容，与表锁排他锁（write）互斥

2. 意向排他锁（IX）

   由语句 `inset、update、delete、select...for update`添加
   
   与表锁共享锁（read）和排他锁（write）都互斥，意向锁之间不会互斥

```sql
begin

SELECT * FROM students 
where id = 35
LOCK in  share mode; #开启意向共享锁
```

## 行级锁

> 每次加锁只锁住对应行数据
>
> innoDB数据是基于索引组织的，行锁是对索引上的引项加锁来实现的，而不是对记录加锁

**锁的分类**

1. 行锁 Record lock

   记录锁，锁住单行记录

2. 间隙锁 Gap Lock

   锁住索引的间隙，不包括记录

3. 临键锁 Next-Key Lock

   行锁和间隙锁的组合，同时锁住数据，并锁住前面的gap间隙

> 行锁

1. 共享锁（S锁）
   - 允许多个事务同时获取同一数据的共享锁。
   - 拥有共享锁的事务只能读取数据，不能**修改**数据。
   - 其他事务可以在该数据上再次加**共享锁**，但**不能加排他锁**，直到原事务释放其共享锁为止。
   - 主要目的是防止数据在被读取的同时被其他事务修改，保证数据的完整性和一致性。
2. 排他锁（X锁）
   - 同一时间只允许**一个事务**获取同一数据的排他锁。
   - 拥有排他锁的事务既可以读取数据，也可以修改数据。
   - 其他事务不能在该数据上加**任何类型的锁**（包括共享锁和排他锁），直到原事务释放其排他锁为止。
   - 主要目的是防止数据在被修改的同时被其他事务读取或修改，避免产生脏读、不可重复读和幻读等问题。

|             | s（共享锁） | x（排他锁） |
| ----------- | ----------- | ----------- |
| s（共享锁） | 兼容        | 排斥        |
| x（排他锁） | 排斥        | 排斥        |

> 常见语句的锁

| 语句                      | 类型   |        |
| ------------------------- | ------ | ------ |
| insert                    | 排他锁 | 自动加 |
| update                    | 排他锁 | 自动加 |
| delete                    | 排他锁 | 自动加 |
| select                    | 无     |        |
| select lock in share mode | 共享锁 | 手动   |
| select ... for update     | 排他锁 | 手动   |

默认情况下 innoDB 使用的 next-key锁（临键锁）进行搜索和索引搜索，防止幻读

1. 针对于唯一索引进行检索时，对已存在的记录等值匹配时，将会自动转化为行锁
2. innoDB的行锁时针对于索引加的锁，不通过索引时，将会升级为**表锁** read 其他事务不可写，即使不同行也不行

> 间隙锁/临键锁

默认情况下 innoDB 使用的 next-key锁（临键锁）进行搜索和索引搜索，防止幻读

1. 索引上的等值查询（唯一索引），给不存在的记录加锁时，优化为间隙锁
2. 索引上的等值查询（普通索引），向右遍历时最后一个值不满足查询需求时，next-key锁退化为间隙锁
3. 索引上的范围查询（唯一索引），会访问到不满足条件的第一个值为止





我们有一个按照ID排序的唯一索引，ID为6的记录后面直接跟着ID为8的记录。当事务T1想要更新ID为8的记录时，它不仅仅需要锁定ID为8的这个索引条目（记录锁），还需要锁定ID为6和ID为8之间的间隙（间隙锁），以确保没有其他事务可以插入一个新的ID（例如ID为7）到这个间隙中。

如果没有间隙锁，以下情况可能会发生：

1. 事务T1读取ID为8的记录准备进行更新。
2. 事务T2在事务T1读取和更新之间插入了一个新的记录，其ID为7。
3. 当事务T1尝试更新ID为8的记录时，它可能会基于它最初读取的数据快照进行操作，但现在由于事务T2的插入，实际的索引结构已经改变了。
4. 这可能导致事务T1的更新操作失败，因为它可能无法找到正确的位置来应用更新（因为索引结构已经改变），或者它可能无意中覆盖了ID为7的新记录（如果更新操作不是基于键值而是基于位置的话）。

间隙锁的存在确保了在事务T1进行更新操作期间，没有其他事务可以改变索引的结构（至少在锁定的间隙范围内）。这样，事务T1可以安全地进行更新操作，而不用担心索引结构的变化。



## 锁总结

1. 概述

   在并发访问时，解决数据一致性，有效性问题

   全局锁、表级锁、行级锁

2. 全局锁

   对整个数据库实例加锁，加锁后整个实例就为只读状态

3. 表级锁

   锁住整张表

   表锁、元数据所、意向锁

4. 行级锁

   锁住对应的数据行，发生错冲突的几率最小

   行锁、间隙锁、临键锁



















