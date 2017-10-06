/*用户注册时候的表*/
CREATE TABLE IF NOT EXISTS `user`(
  `school_id` INT UNSIGNED AUTO_INCREMENT,
  `username` VARCHAR(30) NOT NULL,
  `password` VARCHAR(40) NOT NULL,
  `email` VARCHAR(40) NOT NULL,
  PRIMARY KEY ( `school_id` )
)ENGINE=InnoDB DEFAULT CHARSET=utf8;