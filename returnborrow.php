<?php
/**
 * Created by PhpStorm.
 * User: liu
 * Date: 17-10-11
 * Time: 上午10:22
 */
header("Content-type:application/json;charset=UTF-8");
$link=mysqli_connect('127.0.0.1','root','root','library','3306');
if($link){
    if($_POST['isbo']==true)
    {
        $studentIdBorrow=$_POST['studentIdBorrow'];
        $bookIdBorrow=$_POST['bookIdBorrow'];
        $dateBorrow=$_POST['dateBorrow'];

        $sql="INSERT INTO borrow_inf(userID,bookID,borr_date)VALUES('{$studentIdBorrow}','{$bookIdBorrow}','{$dateBorrow}') ";
        mysqli_query($link,'SET NameS utf8');
        mysqli_query($link,$sql);
        echo json_encode(array('success'=>'yes'));
    }

    if($_POST['isbo']==false)
    {
        $studentIdReturn=$_POST['studentIdReturn'];
        $bookIdReturn=$_POST['bookIdReturn'];
        $dateReturn=$_POST['dateReturn'];

        $sql="INSERT INTO ret_inf(userID,bookID,ret_date)VALUES('{$studentIdReturn}','{$bookIdReturn}','{$dateReturn}') ";
        mysqli_query($link,'SET NameS utf8');
        mysqli_query($link,$sql);
        echo json_encode(array('success'=>'yes'));
    }

}else{
    echo json_encode(array('连接信息'=>'连接失败'));
}
mysqli_close($link);