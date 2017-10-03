
/**
 * Created by PhpStorm.
 * User: liu
 * Date: 17-10-2
 * Time: 上午11:36
 */
<pre>
欢迎 <?php echo $_POST["fname"]; ?>!<br>
你的年龄是 <?php echo $_POST["age"]; ?>  岁
    <?php
    $conn = new mysqli(  $_POST["dbaddress"],  $_POST["dbname"], $_POST["dbpasswd"]);


if($conn->connect_error){
    die("连接失败：" . $conn->connect_error);
}
echo "连接成功";
?>

