<?php
/**
 * Created by PhpStorm.
 * User: liu
 * Date: 17-10-6
 * Time: 下午10:39
 */

// 创建连接
$dbhost = 'localhost:3306';  // mysql服务器主机地址
$dbuser = 'root';            // mysql用户名
$dbpass = 'root';          // mysql用户名密码

$conn = mysqli_connect($dbhost, $dbuser, $dbpass);
if(! $conn )
{
    die('连接失败: ' . mysqli_error($conn));
}
echo '连接成功<br />';


/*保存错误信息*/
$error=array();
//当有表单提交时
if(!empty($_POST))
{
    //接收用户输入的信息
    $schoolid=isset($_POST['schoolid']) ? trim($_POST['schoolid']):'';
    $password=isset($_POST['password']) ? trim($_POST['password']):'';

    $sql = "select 'school_id','password' from 'user' where 'school_id'=$schoolid";
    if($result=mysqli_query($sql))
    {
        //处理结果集
        $row = mysqli_fetch_assoc($result);

        if($password == $row['password'])
        {
          die("欢迎登录");
          require "../index.html";
        }
    }
}

