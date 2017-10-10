<?php
/**
 * Created by PhpStorm.
 * User: liu
 * Date: 17-10-10
 * Time: 下午1:21
 */
header("Content-type:application/json;charset=UTF-8");

$link=mysqli_connect('127.0.0.1','root','root','library','3306');
$page = intval($_POST['pageNum']);/*获取一个page的页数值*/
if($link)
{
    mysqli_query($link,'SET NAMES utf8');
    $result = mysqli_query($link,"select * from books");
    $total = mysqli_num_rows($result);//总记录数

    $pageSize = 10; //每页显示数
    $totalPage = ceil($total/$pageSize); //总页数

    $startPage = $page*$pageSize;
    $arr['total'] = $total;
    $arr['pageSize'] = $pageSize;
    $arr['totalPage'] = $totalPage;
    $query = mysqli_query($link,"select bookid,booktype,bookimg,booknum from books order by bookid ASC limit $startPage,$pageSize");/*正序输入输出的结果。*/
    while($row=mysqli_fetch_array($query)){
        $arr['list'][] = array(
            'bookid' => $row['bookid'],
            'booktype' => $row['booktype'],
            'bookimg' => $row['bookimg'],
            'booknum'=>$row['booknum'],
            'bookname'=>$row['bookname']
        );
        die($arr['list'][0]);
    }
//print_r($arr);
    echo json_encode($arr);
}
else
{
    echo json_encode("error");
}


?>