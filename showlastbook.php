<?php
header("Content-type:application/json;charset=UTF-8");

$link=mysqli_connect('127.0.0.1','root','root','library','3306');
if ($link)
{//执行查询最后一条记录
        $sql="select * from book_inf order by bookID DESC limit 1";
        mysqli_query($link,'SET NAMES utf8');
        $result = mysqli_query($link,$sql);
        $senddata=array();
        while($row=mysqli_fetch_assoc($result)){
            array_push($senddata,
                array(
                    'bookID'=>$row['bookID'],
                    'bookName'=>$row['bookName'],
                    'booktype'=>$row['booktype'],
                    'bookWR'=>$row['bookWR'],
                    'bookPress'=>$row['bookPress'],
                    'bookNum'=>$row['bookNum'],
            )
            );
        }echo json_encode($senddata);/*貌似是用这个传数据*/

}
else{
    echo json_encode(array('连接信息'=>'连接失败'));
}

mysqli_close($link);

?>