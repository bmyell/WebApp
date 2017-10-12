<?php
// 创建连接
include "ChromePhp.php";
header("Content-type:application/json;charset=UTF-8");
$dbhost = '127.0.0.1';  // mysql服务器主机地址
$dbuser = 'root';            // mysql用户名
$dbpass = 'root';          // mysql用户名密码
$conn = mysqli_connect($dbhost, $dbuser, $dbpass);
if(! $conn )
{
    die('连接失败: ' . mysqli_error($conn));
}
 else {
    //接收用户输入的信息
     if($_POST['option']=='student')
     {
         $username=isset($_POST['username']) ? trim($_POST['username']):'';
         $password=isset($_POST['password']) ? trim($_POST['password']):'';
         $sql = "select * from user_inf where userName = '{$username}'";

         mysqli_select_db($conn,"library");
         mysqli_query($conn,'SET NAMES utf8');
         $result=mysqli_query($conn,$sql);

         if($row = mysqli_fetch_array($result))
         {
             if($password == $row['userPD'])
             {
                 echo json_encode(array('success'=>'yes'));
             }
             else
             {
                 echo json_encode(array('success'=>'no'));
             }
         }
         else {
             echo json_encode(array('success'=>'no'));
         }
     }

     if($_POST['option']=='teacher')
     {
         $username=isset($_POST['username']) ? trim($_POST['username']):'';
         $password=isset($_POST['password']) ? trim($_POST['password']):'';
         $sql = "select * from manager_inf where M_name ='{$username}' ";
         ChromePhp::log($sql);
         mysqli_select_db($conn,"library");
         mysqli_query($conn,'SET NAMES utf8');
         $result=mysqli_query($conn,$sql);
         ChromePhp::log($result);
         if($row = mysqli_fetch_array($result))
         {
             if($password == $row['managePD'])
             {
                 echo json_encode(array('success'=>'yes'));
             }
             else
             {
                 echo json_encode(array('success'=>'yes'));
             }
         }
         else {
             echo json_encode(array('success'=>'no'));
         }
     }

 }
     
     
    
 mysqli_close($conn);
?>
