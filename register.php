<?php
/**
 * Created by PhpStorm.
 * User: liu
 * Date: 17-10-12
 * Time: 下午3:27
 */
header("Content-type:application/json;charset=UTF-8");
include "ChromePhp.php";
$link = mysqli_connect('127.0.0.1', 'root', 'root', 'library', '3306');
if ($link) {
    $username = $_POST['username'];
    $password = $_POST['password'];
    $school_id = $_POST['schoolid'];
    $email = $_POST['email'];
    $grade = $_POST['grade'];
    $class = $_POST['class'];
    mysqli_query($link, 'SET NameS utf8');
    $sql = "INSERT INTO user_inf (userID, username, userPD, Grade,Class,E_mailAD) 
    VALUES ('{$school_id}','{$username}','{$password}','{$grade}','{$class}','{$email}')";

    $result=mysqli_query($link, $sql);
    if($result)
    {
        echo json_encode(array('success' => 'yes'));
    }
    else
    {
        echo json_encode(array('success' => 'no'));
    }

} else {
    echo json_encode(array('success' => 'no'));
}
mysqli_close($link);
