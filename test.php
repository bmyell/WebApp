<?php
/**
 * Created by PhpStorm.
 * User: liu
 * Date: 17-10-2
 * Time: 上午12:47
 */
$servername = "localhost";
$username = "phpmyadmin";
$password = "1111";

//创建连接
$conn = new mysqli($servername, $username,$password);

if($conn->connect_error){
    die("连接失败：" . $conn->connect_error);
}
echo "连接成功";

?>