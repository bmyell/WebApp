<?php
/**
 * Created by PhpStorm.
 * User: liu
 * Date: 17-10-11
 * Time: 下午10:06
 */
include 'ChromePhp.php';
header("Content-type:application/json;charset=UTF-8");
$link = mysqli_connect('127.0.0.1', 'root', 'root', 'library', '3306');
if($link)
{
    if($_POST['userid']&&$_POST['self_inf']==0)
    {
        $studentid = $_POST['userid'];
        $sql = "select book_inf.bookID,bookName,booktype,bookWR,bookPress,borrow_inf.borr_date from book_inf, borrow_inf, user_inf where user_inf.userID=borrow_inf.userID
and book_inf.bookID=borrow_inf.bookID and user_inf.userID='{$studentid}'";
        mysqli_query($link, 'SET NameS utf8');
        $query = mysqli_query($link, $sql);
        $senddata = array();
        while ($row = mysqli_fetch_assoc($query)) {
            array_push($senddata, array(
                'bookID' => $row['bookID'],
                'bookName' => $row['bookName'],
                'booktype' => $row['booktype'],
                'bookWR' => $row['bookWR'],
                'bookPress' => $row['bookPress'],
                'borr_date' => $row['borr_date']
            ));
        }
        echo json_encode($senddata);
    }

    if($_POST['userid']&&$_POST['self_inf']==1)
    {
        $studentid = $_POST['userid'];
        $sql = "select * from user_inf WHERE user_inf.userID='{$studentid}'";
        mysqli_query($link, 'SET NameS utf8');
        $query = mysqli_query($link, $sql);
        $senddata = array();
        while ($row = mysqli_fetch_assoc($query)) {
            array_push($senddata, array(
                'userID' => $row['userID'],
                'userName' => $row['userName'],
                'userPD' => $row['userPD'],
                'Grade' => $row['Grade'],
                'Class' => $row['Class'],
                'E_mailAD' => $row['E_mailAD']
            ));
        }
        echo json_encode($senddata);
    }

    if($_POST['update']==true){
        $userID=$_POST['userID'];
        $userName=$_POST['userName'];
        $userPD=$_POST['userPD'];
        $Grade=$_POST['Grade'];
        $Class=$_POST['Class'];
        $E_mailAD=$_POST['E_mailAD'];


        $sql="UPDATE `user_inf` SET userName='{$userName}',userPD='{$userPD}',Grade='{$Grade}',Class='{$Class}', E_mailAD= '{$E_mailAD}' WHERE userID='{$userID}'";

        mysqli_query($link,'SET NAMES utf8');
        mysqli_query($link,$sql);

        echo json_encode(array('修改信息'=>'修改成功'));
    }

  else  if($_GET['updateId']){
        $updateId=$_GET['updateId'];
        mysqli_query($link,'SET NAMES utf8');
        $sql="SELECT * FROM user_inf WHERE `userID`='{$updateId}'";
        $result= mysqli_query($link,$sql);
        $senddata=array();
        while($row=mysqli_fetch_assoc($result)){
            array_push($senddata, array(
                'userName'=>$row['userName'],
                'userPD'=>$row['userPD'],
                'Grade'=>$row['Grade'],
                'Class'=>$row['Class'],
                'E_mailAD'=>$row['E_mailAD']
            ));

        }echo json_encode($senddata);
    }




}
else echo json_encode(array('连接信息' => '连接失败'));
mysqli_close($link);