<?php
header("Content-type:application/json;charset=UTF-8");

$link=mysqli_connect('127.0.0.1','root','root','library','3306');
if($link){
	$bookid=$_GET['bookID'];
	mysqli_query($link,'SET NAMES utf8');
	$sql="SELECT * FROM book_inf WHERE `bookID`='{$bookid}'";

    $result= mysqli_query($link,$sql);
    $senddata=array();
    while($row=mysqli_fetch_assoc($result)){
  		array_push($senddata, array(
  			       'bookID'=>$row['bookID'],
  			       'booktype'=>$row['booktype'],
  			       'bookWR'=>$row['bookWR'],
  			       'bookNum'=>$row['bookNum'],
                   'bookPress'=>$row['bookPress'],
                   'bookName'=>$row['bookName']
  			));
 
  }echo json_encode($senddata);
	 
}
mysqli_close($link);
?>