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
    if($_POST['chechstu']==true)
    {
        $studentid=$_POST['studentid'];
        $sql="select user_inf.userName,book_inf.bookID,bookName,booktype from book_inf, borrow_inf, user_inf where user_inf.userID=borrow_inf.userID
and book_inf.bookID=borrow_inf.bookID and user_inf.userID='{$studentid}'";
        mysqli_query($link,'SET NameS utf8');
        $query=mysqli_query($link,$sql);
        $senddata = array();
        while ($row = mysqli_fetch_assoc($query)) {
            array_push($senddata, array(
                'userName'=>$row['userName'],
                'bookID' => $row['bookID'],
                'bookName' => $row['bookName'],
                'booktype' => $row['booktype']
            ));
        }
        echo json_encode($senddata);
    }

//    if($_POST['isbo']==false)
//    {
//        $studentIdReturn=$_POST['studentIdReturn'];
//        $bookIdReturn=$_POST['bookIdReturn'];
//        $dateReturn=$_POST['dateReturn'];
//
//        $sql="INSERT INTO ret_inf(userID,bookID,ret_date)VALUES('{$studentIdReturn}','{$bookIdReturn}','{$dateReturn}') ";
//        mysqli_query($link,'SET NameS utf8');
//        mysqli_query($link,$sql);
//        echo json_encode(array('success'=>'yes'));
//    }

}else{
    echo json_encode(array('连接信息'=>'连接失败'));
}
mysqli_close($link);