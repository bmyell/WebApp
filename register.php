<?php
/**
 * Created by PhpStorm.
 * User: liu
 * Date: 17-10-6
 * Time: 下午8:03
 */
header('Content-Type:text/html;charset=utf-8');
echo "接受到新用户注册";

// 创建连接
$dbhost = 'localhost:3306';  // mysql服务器主机地址
$dbuser = 'root';            // mysql用户名
$dbpass = 'root';          // mysql用户名密码

//接收数据表单
$username = $_POST['username'];
$password = $_POST['password'];
$school_id = $_POST['schoolid'];
$email = $_POST['email'];

/*面向对象*/
$mysqli =new mysqli('127.0.0.1','root','root','webapp');
/*检测连接*/
if($mysqli->connect_errno){
    printf("Conect Faile:%s\n",$mysqli->connect_error);
    exit;
}
/*设置连接字符集*/
mysqli_set_charset(utf8, $mysqli);
//插入数据库的字段
$sql = "INSERT INTO user ".
    "(school_id, username, password, email) ".
    "VALUES ".
    "('$school_id','$username','$password','$email')";

if(!$mysqli->query($sql))
{
    die('无法插入数据:'.$mysqli->error);
    $mysqli->close();
}
else{
    die('插入成功:');
    $mysqli->close();
}





//关闭数据库
?>

