create table book_inf(
  bookID char(8) primary key,
  bookName varchar(200) not null,
  booktype VARCHAR(225) not null,
  bookWR varchar(80) not null,
  bookPress varchar(225) not null,
  bookNum varchar(5) not null
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

# ALTER TABLE `book_inf`
#   MODIFY `bookID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=217;
# /*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
# /*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
# /*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

/*用户信息表*/
create table user_inf(
  userID char(9) primary key,
  userName varchar(8) not null,
  userPD char(6) not null,
  Grade varchar(6) not null,
  Class varchar(20) not null,
  E_mailAD varchar(20) not null
);
/*管理员信息表*/
create table manager_inf(--
  managID char(8) primary key,
  M_name varchar(8) not null,
  managPD char(6) not null,
  MG_mail varchar(20)
);


/*借书信息表*/
create table borrow_inf(
  userID char(9),
  bookID char(8),
primary key(userID,bookID),
  foreign key(userID) references user_inf(userID),
  foreign key(bookID) references book_inf(bookID),
  borr_date date not null
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*还书信息表*/
create table ret_inf(
  userID char(9),
  bookID char(8),
  ret_date date not null,
primary key(userID,bookID),
  foreign key(userID) references user_inf(userID),
  foreign key(bookID) references book_inf(bookID)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;


INSERT into book_inf ('bookID','bookName','booktype','bookWR','bookPress','bookNum')
values
  ('1000000000','数据库管理系统','专业书籍','沈民','合肥','50');
   (10000000,'数据库管理系统','专业书籍','沈明玉','合肥工业大学出版社',50),
 (10000001,'中国汉语文化','文学艺术','王昌','合肥工业大学出版社',50),
 (10000002,'操作系统','专业书籍','田卫东','合肥工业大学出版社',50),
 (10000003,'数据结构','专业书籍','周小波','合肥工业大学出版社',50),
 (10000004,'明朝那些事儿','文学艺术','佚名','清华大学出版社',50),
 (10000005,'假如给我三天光明','外国文学','海伦凯勒','清华大学出版社',50),
 (10000006,'王子与贫儿','外国文学','马克吐温','上海交通大学出版社',50),
 (10000007,'鲁滨逊漂流记','外国文学','笛福','复旦大学出版社',50),
 (10000008,'三国演义','历史书籍','罗贯中','西安交通大学出版社',50),
 (10000009,'西游记','历史书籍','吴承恩','中国人民出版社',50);


insert into user_inf(userID,userName,userPD,Grade,Class,E_mailAD)
VALUES
(201421710,'李白',123456,'大三','中国现代汉语专业1班','libai@163.com'),
(201421711,'杜甫',012345,'大三','中国现代汉语专业2班','dofu@163.com'),
(201421712,'欧阳一鸣',002345,'大一','物联网1班','ouyi@163.com'),
(201421713,'欧阳二鸣',001234,'大二','计算机1班','ouer@163.com'),
(201421714,'欧阳三鸣',000123,'大四','工商管理1班','ousan@163.com');


# -----------------------------------------------
insert into manager_inf(managID,M_name,managPD,MG_mail)
values
(20001000,'赵四',666666,'zhaosi@163.com'),
(20001001,'张三',555555,'zhangsan@163.com'),
(20001002,'王二',333333,'wangeri@163.com'),
(20001003,'麻子',222222,'mazi@163.com');


# -------------------------------------------------
create trigger t_inst_bor after insert
on borrow_inf
for each row
begin
update book_inf  set bookNum=bookNum-1
where bookID=NEW.bookID;
end;

# select * from borrow_inf;
# ------------------------------------------------------
create trigger t_inst_ret after insert
on ret_inf
for each row
begin
update book_inf  set bookNum=bookNum+1
where bookID=NEW.bookID;
end;