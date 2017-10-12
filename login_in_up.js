//当打开后台管理界面时清空table
/**
 * Created by PhpStorm.
 * User: liu
 * Date: 17-10-11
 * Time: 下午10:06
 */
$('documnet').ready(function () {
    // language=JQuery-CSS
    /*登录*/
    $('#loginin').click(function(e) /*输入的变量*/{
        e.preventDefault();/*阻止元素默认的行为*/
        //输入判断 为空时添加一个has-error
        if ($('#username').val() === "" || $('#password').val() === "" ) {

            if ($('#username').val() === "") {
                $('#username').parent().addClass('has-error');/*给父级添加一个class*/
            } else {
                $('#username').parent().removeClass('has-error');
            }
            if ($('#password').val() === "") {
                $('#password').parent().addClass('has-error');
            } else {
                $('#password').parent().removeClass('has-error');
            }

        } else {
            /*先定义一个jsonbook数据结构*/
            var option =$('input:radio:checked').val();

            if(option=="student")
            {
                console.log("我是学生");
                // 这里修改跳转到学生登录的界面
                var loginin = {
                    username: $('#username').val(),
                    password: $('#password').val(),
                    option: 'student'
                };

                $.ajax({
                    url: 'login.php',
                    type: 'post',
                    data: loginin,
                    datatype: 'json',
                    success: function(ss) {
                        var $str = JSON.stringify(ss);
                        var $result=$str.substring(12,13);

                        if($result=="y")
                        {
                            window.location="user.html";
                        }

                        if($result=="n")
                        {
                            alert("登录失败 检查用户名或密码");
                        }
                    }
                });
            }
            else if(option=="teacher"){
                /*老师*/
                // 这里修改跳转到学生登录的界面
                var loginin = {
                    username: $('#username').val(),
                    password: $('#password').val(),
                    option: 'teacher'
                };

                $.ajax({
                    url: 'login.php',
                    type: 'post',
                    data: loginin,
                    datatype: 'json',
                    success: function(ss) {
                        var $str = JSON.stringify(ss);
                        var $result=$str.substring(12,13);
                        if($result=="y")
                        {
                            window.location="management.html";
                        }
                        if($result=="n")
                        {
                            alert("登录失败 检查用户名或密码");
                        }
                    }
                });

            }
        }
    });
    /*注册*/
    $('#loginup').click(function(e) /*输入的变量*/{
        e.preventDefault();/*阻止元素默认的行为*/
        //输入判断 为空时添加一个has-error
        if ($('#schoolid').val()===""|| $('#username').val() === "" || $('#password').val() === "" || $('#grade').val() === ""|| $('#class').val() === ""|| $('#email').val() === "") {

            if ($('#schoolid').val() === "") {
                $('#schoolid').parent().addClass('has-error');/*给父级添加一个class*/
            } else {
                $('#schoolid').parent().removeClass('has-error');
            }

            if ($('#username').val() === "") {
                $('#username').parent().addClass('has-error');/*给父级添加一个class*/
            } else {
                $('#username').parent().removeClass('has-error');
            }

            if ($('#password').val() === "") {
                $('#password').parent().addClass('has-error');
            } else {
                $('#password').parent().removeClass('has-error');
            }

            if ($('#grade').val() === "") {
                $('#grade').parent().addClass('has-error');/*给父级添加一个class*/
            } else {
                $('#grade').parent().removeClass('has-error');
            }

            if ($('#class').val() === "") {
                $('#class').parent().addClass('has-error');/*给父级添加一个class*/
            } else {
                $('#class').parent().removeClass('has-error');
            }

            if ($('#email').val() === "") {
                $('#email').parent().addClass('has-error');/*给父级添加一个class*/
            } else {
                $('#email').parent().removeClass('has-error');
            }

        }

        else {
                var loginup = {
                    username: $('#username').val(),
                    password: $('#password').val(),
                    class: $('#class').val(),
                    grade: $('#grade').val(),
                    email: $('#email').val(),
                    schoolid: $('#schoolid').val()
                };

                $.ajax({
                    url: 'register.php',
                    type: 'post',
                    data: loginup,
                    datatype: 'json',
                    success: function(D) {
                        var $str = JSON.stringify(D);
                        var $result=$str.substring(12,13);

                        if($result=="y")
                        {
                            window.location="login.html";
                        }
                        if($result=="n")
                        {
                            alert("注册失败 检查用户名或密码");
                        }
                    }
                });
        }
    });

});