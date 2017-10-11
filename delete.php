<?php
header("Content-type:application/json;charset=UTF-8");

$link=mysqli_connect('127.0.0.1','root','root','library','3306');
if($link){
	$bookid= $_POST['bookID'];
	mysqli_query($link,'SET NAMES utf8');
	$sql="DELETE FROM book_inf WHERE `book_inf`.`bookID`='{$bookid}'";
	mysqli_query($link,$sql);
	 echo json_encode(array('删除状态'=>'成功'));
}

mysqli_close($link);
?>