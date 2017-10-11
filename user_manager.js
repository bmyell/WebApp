//为了管理用户和借书，弄的表格
$('documnet').ready(function () {
    /*对借阅进行登记*/
    $('#submitBorrow').click(function (e) {
        e.preventDefault();
        //输入判断
        if ($('#bookIdBorrow').val() === "" || $('#studentIdBorrow').val() === ""||$('#dateBorrow').val()==="")
        {
            if ($('#bookIdBorrow').val() === "") {
                $('#bookIdBorrow').parent().addClass('has-error');
            } else {
                $('#bookIdBorrow').parent().removeClass('has-error');
            }
            if ($('#studentIdBorrow').val() === "") {
                $('#studentIdBorrow').parent().addClass('has-error');
            } else {
                $('#studentIdBorrow').parent().removeClass('has-error');
            }
            if ($('#dateBorrow').val() === "") {
                $('#dateBorrow').parent().addClass('has-error');
            } else {
                $('#dateBorrow').parent().removeClass('has-error');
            }
        }
        else {
            console.log($('#dateBorrow').val());

            var jsonBookBorrow = {
                studentIdBorrow: $('#studentIdBorrow').val(),
                bookIdBorrow: $('#bookIdBorrow').val(),
                dateBorrow: $('#dateBorrow').val(),
                isbo: 1
            };

            console.log(jsonBookBorrow);
            //提交添加的新闻
            $.ajax({
                url: 'returnborrow.php',
                type: 'post',
                data: jsonBookBorrow,
                datatype: 'json',
                success: function (data) {
                    console.log(data);
                    //刷新页面
                    console.log(data.dateBorrow.val());
                    showinsertTable();
                }
            });
        }
    });

    $('#submitReturn').click(function (e) {
        console.log("归还");
        e.preventDefault();
        //输入判断
        if ($('#bookIdReturn').val() === "" || $('#studentIdReturn').val() === ""||$('#dateReturn').val()==="")
        {
            if ($('#bookIdReturn').val() === "") {
                $('#bookIdReturn').parent().addClass('has-error');
            } else {
                $('#bookIdReturn').parent().removeClass('has-error');
            }
            if ($('#studentIdReturn').val() === "") {
                $('#studentIdReturn').parent().addClass('has-error');
            } else {
                $('#studentIdReturn').parent().removeClass('has-error');
            }
            if ($('#dateReturn').val() === "") {
                $('#dateReturn').parent().addClass('has-error');
            } else {
                $('#dateReturn').parent().removeClass('has-error');
            }
        }
        else {
            console.log($('#dateReturn').val());

            var jsonBookReturn = {
                studentIdReturn: $('#studentIdReturn').val(),
                bookIdReturn: $('#bookIdReturn').val(),
                dateReturn: $('#dateReturn').val(),
                isbo: 0
            };

            console.log(jsonBookReturn);
            //提交添加的新闻
            $.ajax({
                url: 'returnborrow.php',
                type: 'post',
                data: jsonBookReturn,
                datatype: 'json',
                success: function (data) {
                    console.log(data);
                    //刷新页面
                    showinsertTable();
                }
            });
        }
    });
});