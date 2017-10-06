<?php
/**
 * Created by PhpStorm.
 * User: liu
 * Date: 17-10-6
 * Time: 下午8:03
 */
header('Content-Type:text/html;charset=utf-8');
echo "接受到新用户注册";
echo '<p>用户名:' .$_POST['username'].'</p>';
//接收数据表单
$username = $_POST['username'];
$password = $_POST['password'];