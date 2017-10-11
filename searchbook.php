<?php
/**
 * Created by PhpStorm.
 * User: liu
 * Date: 17-10-11
 * Time: 下午8:07
 */
header("Content-type:application/json;charset=UTF-8");

include 'ChromePhp.php';

$link = mysqli_connect('127.0.0.1', 'root', 'root', 'library', '3306');

if($link)
{
    if ($_POST['bookname']) {
        $bookname = $_POST['bookname'];
        $sql="select * from book_inf WHERE bookName='{$bookname}'";
        mysqli_query($link, 'SET NAMES utf8');
        $result = mysqli_query($link, $sql);
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
        }
        ChromePhp::log($senddata);
        echo json_encode($senddata);
    }

    if ($_POST['booktype']) {
        $booktype = $_POST['booktype'];
        $sql="select * from book_inf WHERE booktype='{$booktype}'";
        mysqli_query($link, 'SET NAMES utf8');
        $result = mysqli_query($link, $sql);
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
        }
        ChromePhp::log($senddata);
        echo json_encode($senddata);
    }

    if ($_POST['bookwr']) {
        $bookwr = $_POST['bookwr'];
        $sql="select * from book_inf WHERE bookWR='{$bookwr}'";
        mysqli_query($link, 'SET NAMES utf8');
        $result = mysqli_query($link, $sql);
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
        }
        ChromePhp::log($senddata);
        echo json_encode($senddata);
    }

    if ($_POST['bookpress']) {
        $bookpress = $_POST['bookpress'];
        $sql="select * from book_inf WHERE bookPress='{$bookpress}'";
        mysqli_query($link, 'SET NAMES utf8');
        $result = mysqli_query($link, $sql);
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
        }
        ChromePhp::log($senddata);
        echo json_encode($senddata);
    }

}
else
    echo json_encode(array('连接信息' => '连接失败'));


mysqli_close($link);
?>