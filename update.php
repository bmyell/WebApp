<?php
header("Content-type:application/json;charset=UTF-8");
include 'ChromePhp.php';
ChromePhp::log('Hello console!');
$link=mysqli_connect('127.0.0.1','root','root','library','3306');
if($link){
	//修改图片
	$booktype=$_POST['booktype'];
	$bookpress=$_POST['bookPress'];
	$booknum=$_POST['bookNum'];
	$bookid=$_POST['bookID'];
	$bookwr=$_POST['bookWR'];
	$bookname=$_POST['bookName'];


	$sql="UPDATE `book_inf` SET bookWR='{$bookwr}',booktype='{$booktype}',bookPress='{$bookpress}',bookNum='{$booknum}', bookName= '{$bookname}' WHERE bookID='{$bookid}'";

	ChromePhp::log($sql);

	mysqli_query($link,'SET NAMES utf8');
    mysqli_query($link,$sql);

    ChromePhp::log(mysqli_query($link,$sql));

   echo json_encode(array('修改信息'=>'修改成功'));
}
 mysqli_close($link);
?>