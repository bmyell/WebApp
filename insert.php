<?php
header("Content-type:application/json;charset=UTF-8");
$link=mysqli_connect('127.0.0.1','root','root','library','3306');
if($link){
	$bookID=$_POST['bookID'];
    $bookName=$_POST['bookName'];
    $booktype=$_POST['booktype'];
    $bookWR=$_POST['bookWR'];
    $bookPress=$_POST['bookPress'];
    $bookNum=$_POST['bookNum'];
    $sql="INSERT INTO book_inf(bookID,bookName,booktype,bookWR,bookPress,bookNum)VALUES('{$bookID}','{$bookName}','{$booktype}','{$bookWR}','{$bookPress}','{$bookNum}') ";
	mysqli_query($link,'SET NameS utf8');
    mysqli_query($link,$sql);
   echo json_encode(array('success'=>'yes'));
}else{
  	echo json_encode(array('连接信息'=>'连接失败'));
  	}
 mysqli_close($link);
?>