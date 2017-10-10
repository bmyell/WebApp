create table book_inf(
  bookID char(8) primary key,
  bookName varchar(20) not null,
  bookWR varchar(8) not null,
  bookPress varchar(50) not null,
  bookNum varchar(3) not null
);

create table user_inf(--用户信息表
  userID char(9) primary key,--读者ID
  userName varchar(8) not null,--昵称
  userPD char(6) not null,--密码
  Grade varchar(6) not null,--年级
  Class varchar(20) not null,--班级
  E_mailAD varchar(20) not null--邮箱
)

create table manager_inf(--管理员信息表
  managID char(8) primary key,--账号
  M_name varchar(8) not null,--姓名
  managPD char(6) not null,--登录密码
  MG_mail varchar(20),--邮箱
)

create table borrow_inf(--借书信息表
  userID char(9),--用户
  bookID char(8),--书号
primary key(userID,bookID),
  foreign key(userID) references user_inf(userID),
  foreign key(bookID) references book_inf(bookID),
  borr_date date not null--借书日期
)

create table ret_inf(--还书信息表
  userID char(9),
  bookID char(8),
  ret_date date not null,--还书日期
primary key(userID,bookID),
  foreign key(userID) references user_inf(userID),
  foreign key(bookID) references book_inf(bookID)
)
  ------------------------------------------------
insert into book_inf(bookID,bookName,bookWR,bookPress,bookNum)
values
(1000000,'数据库管理系统','沈明玉','合肥工业大学出版社',50),
(1000001,'中国汉语文化','王昌','合肥工业大学出版社',50),
(1000002,'操作系统','田卫东','合肥工业大学出版社',50),
(1000003,'数据结构','周小波','合肥工业大学出版社',50),
(1000004,'明朝那些事儿','佚名','清华大学出版社',50),
(1000005,'假如给我三天光明','海伦凯勒','清华大学出版社',50),
(1000006,'王子与贫儿','马克吐温','上海交通大学出版社',50),
(1000007,'鲁滨逊漂流记','笛福','复旦大学出版社',50),
(1000008,'三国演义','罗贯中','西安交通大学出版社',50),
(1000009,'西游记','吴承恩','中国人民出版社',50);
-----------------------------------
insert into user_inf(userID,userName,userPD,Grade,Class,E_mailAD)
values
(201421710,'李白',123456,'大三','中国现代汉语专业1班','libai@163.com'),
(201421711,'杜甫',012345,'大三','中国现代汉语专业2班','dofu@163.com'),
(201421712,'欧阳一鸣',002345,'大一','物联网1班','ouyi@163.com'),
(201421713,'欧阳二鸣',001234,'大二','计算机1班','ouer@163.com'),
(201421714,'欧阳三鸣',000123,'大四','工商管理1班','ousan@163.com');
-----------------------------------------------
insert into manager_inf(managID,M_name,managPD,MG_mail)
values
(20001000,'赵四',666666,'zhaosi@163.com'),
(20001001,'张三',555555,'zhangsan@163.com'),
(20001002,'王二',333333,'wangeri@163.com'),
(20001003,'麻子',222222,'mazi@163.com');
-------------------------------------------------
create trigger t_inst_bor on borrow_inf
for insert
    as
begin
if exists(select*from inserted where bookID is not null)
begin
update book_inf  set bookNum=bookNum-1
where bookID=(select bookID from inserted);
end
end
select * from borrow_inf;
------------------------------------------------------
create trigger t_inst_ret on ret_inf
for insert
    as
begin
if exists(select*from inserted where bookID is not null)
begin
update book_inf  set bookNum=bookNum+1
where bookID=(select bookID from inserted);
end
end