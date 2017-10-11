<?php
/**
 * Created by PhpStorm.
 * User: liu
 * Date: 17-10-11
 * Time: 上午9:37
 */
header("Content-type:application/json;charset=UTF-8");

$link=mysqli_connect('127.0.0.1','root','root','library','3306');
if ($link)
{//执行成功的过程
    if($_POST['booktype']){
        $booktype=$_POST['booktype'];
        $page=intval($_POST['pageNum']);
        $sql="SELECT bookID FROM  book_inf WHERE `booktype`='{$booktype}'";
        mysqli_query($link,'SET NAMES utf8');
        $result = mysqli_query($link,$sql);
        $total=mysqli_num_rows($result);//该书籍种类的总记录数
        $pageSize=6;//每页显示的数目
        $totalPage=ceil($total/$pageSize);//总页数
        $startPage=$page*$pageSize;
        $arr['total']=$total;
        $arr['pageSize']=$pageSize;
        $arr['totalPage']=$totalPage;
        $query=mysqli_query($link,"SELECT * FROM  book_inf WHERE `booktype`='{$booktype}' order by bookid asc limit $startPage,$pageSize");
        while($row=mysqli_fetch_assoc($query)){
            $arr['list'][]=array(
                'bookid'=>$row['bookid'],
                'bookimg'=>$row['bookimg'],
                'booknum'=>$row['booknum'],
            );

        }echo json_encode($arr);
    }
    else if($_POST['bookname'])
    {
        $bookname=$_POST['bookname'];
        $page=intval($_POST['pageNum']);
        $sql="SELECT bookid FROM  books WHERE `bookname` LIKE '%".$_POST['bookname']."%'";
        mysqli_query($link,'SET NAMES utf8');
        $result = mysqli_query($link,$sql);
        $total=mysqli_num_rows($result);//该书籍的总记录数
        $pageSize=6;//每页显示的数目
        $totalPage=ceil($total/$pageSize);//总页数
        $startPage=$page*$pageSize;
        $arr['total']=$total;
        $arr['pageSize']=$pageSize;
        $arr['totalPage']=$totalPage;
        $query=mysqli_query($link,"SELECT * FROM  books WHERE `bookname` LIKE '%".$_POST['bookname']."%' order by bookid asc limit $startPage,$pageSize");
        while($row=mysqli_fetch_assoc($query)){
            $arr['list'][]=array(
                'bookid'=>$row['bookid'],
                'bookimg'=>$row['bookimg'],
                'booknum'=>$row['booknum'],
                'bookname'=>$row['bookname']
            );


        }echo json_encode($arr);
    }
    /*没有参数的情况。。*/
    else{
        $sql="SELECT * FROM book_inf";
        mysqli_query($link,'SET NAMES utf8');
        $result = mysqli_query($link,$sql);
        $senddata=array();
        while($row=mysqli_fetch_assoc($result)){
            array_push($senddata, array(
                'bookID'=>$row['bookID'],
                'bookName'=>$row['bookName'],
                'booktype'=>$row['booktype'],
                'bookWR'=>$row['bookWR'],
                'bookPress'=>$row['bookPress'],
                'bookNum'=>$row['bookNum'],
            ));
        }echo json_encode($senddata);
    }
}
else{
    echo json_encode(array('连接信息'=>'连接失败'));
}

 mysqli_close($link);
?>