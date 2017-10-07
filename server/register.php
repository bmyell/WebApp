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
$schoolid = $_POST['schoolid'];
$email = $_POST['email'];



$conn = mysqli_connect($dbhost, $dbuser, $dbpass);
if(! $conn )
{
    die('连接失败: ' . mysqli_error($conn));
}
echo '连接成功<br />';

echo "wht";

//放置sql注入
//$username = mysqli_real_escape_string($username);
//$schoolid = mysqli_real_escape_string($schoolid);
//$email    = mysqli_real_escape_string($email);

// 设置编码，防止中文乱码

mysqli_query($conn , "set names utf8");

//数据库
$sql = "INSERT INTO user ".
    "(school_id, username, password, email) ".
    "VALUES ".
    "('$schoolid','$username','$password','$email')";
//开始插
mysqli_select_db( $conn, 'webapp' );
$retval = mysqli_query( $conn, $sql );
if(! $retval )
{
    die('无法插入数据: ' . mysqli_error($conn));
    mysqli_close($conn);
    require 'index.html';
}
else{
    echo "数据插入成功\n";
    mysqli_close($conn);
    require '../index.html';
}


//关闭数据库
?>

