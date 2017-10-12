<?php
/**
 * Created by PhpStorm.
 * User: liu
 * Date: 17-10-11
 * Time: 上午10:22
 */
include "ChromePhp.php";
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
        $senddata = array();
        $sql2="select userID,bookID,borr_date from borrow_inf WHERE userID='$studentIdBorrow' order by userID  limit 1";
        $query=mysqli_query($link,$sql2);


        while ($row = mysqli_fetch_assoc($query)) {
            array_push($senddata, array(
                'userID' => $row['userID'],
                'bookID' => $row['bookID'],
                'borr_date' => $row['borr_date']
            ));
        }
        echo json_encode($senddata);
    }

    if($_POST['isbo']==false)
    {
        $studentIdReturn=$_POST['studentIdReturn'];
        $bookIdReturn=$_POST['bookIdReturn'];
        $dateReturn=$_POST['dateReturn'];

        $sql="INSERT INTO ret_inf(userID,bookID,ret_date)VALUES('{$studentIdReturn}','{$bookIdReturn}','{$dateReturn}') ";
        mysqli_query($link,'SET NameS utf8');
        mysqli_query($link,$sql);

        $senddata = array();
        $sql2="select userID,bookID,ret_date from ret_inf WHERE userID='{$studentIdReturn}' order by userID  limit 1";
        $query=mysqli_query($link,$sql2);


        while ($row = mysqli_fetch_assoc($query)) {
            array_push($senddata, array(
                'userID' => $row['userID'],
                'bookID' => $row['bookID'],
                'ret_date' => $row['ret_date']
            ));
        }
        echo json_encode($senddata);


    }

}else{
    echo json_encode(array('连接信息'=>'连接失败'));
}
mysqli_close($link);