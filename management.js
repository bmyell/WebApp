//当打开后台管理界面时清空table
$('documnet').ready(function () {
    // language=JQuery-CSS
    var $bookTable = $('#booktable tbody');

    var $bookTableNew = $('#booktableNew tbody');
    //刷新页面
    refreshBook();
    $('#btnsubmit').click(function (e) {
        e.preventDefault();
        //输入判断
        if ($('#booktype').val() === "" || $('#bookimg').val() === "" || $('#booknum').val() === "" || $('#bookname').val() === "") {

            if ($('#booktype').val() === "") {
                $('#booktype').parent().addClass('has-error');
            } else {
                $('#booktype').parent().removeClass('has-error');
            }
            if ($('#bookimg').val() === "") {
                $('#bookimg').parent().addClass('has-error');
            } else {
                $('#bookimg').parent().removeClass('has-error');
            }
            if ($('#booknum').val() === "") {
                $('#booknum').parent().addClass('has-error');
            } else {
                $('#booknum').parent().removeClass('has-error');
            }
            if ($('#bookname').val() === "") {
                $('#bookname').parent().addClass('has-error');
            } else {
                $('#bookname').parent().removeClass('has-error');
            }
        } else {
            var jsonBooks = {
                // bookid: $('#bookid').val(),
                booktype: $('#booktype').val(),
                bookimg: $('#bookimg').val(),
                booknum: $('#booknum').val(),
                bookname: $('#bookname').val()
            };
            //提交添加的新闻
            $.ajax({
                url: 'insert.php',
                type: 'post',
                data: jsonBooks,
                datatype: 'json',
                success: function (data) {
                    console.log(data);
                    //刷新页面
                    refreshBook();

                }
            });
        }
    });

    //删除图书的功能
    var deleteId = null;
    $bookTable.on('click', '.btn-danger', function (e) {
        $('#deleModal').modal('show');
        deleteId = ($(this).parent().prevAll().eq(4).html());
        console.log(deleteId);
    });
    $('#deleModal #confirmDelete').click(function (e) {
        if (deleteId) {
            $.ajax({
                url: 'delete.php',
                type: 'post',
                data: {bookid: deleteId},
                success: function (data) {
                    console.log(data);
                    $('#deleModal').modal('hide');
                    refreshBook();

                }
            });
        }
    });
    //修改图书
    var updateId = null;
    $bookTable.on('click', '.btn-primary', function (e) {
        $('#updateModal').modal('show');
        updateId = $(this).parent().prevAll().eq(4).html();
        $.ajax({
            url: 'current.php',
            type: 'get',
            datatype: 'json',
            data: {bookid: updateId},
            success: function (data) {
                // $('#ubookid').val(data[0].bookid)
                $('#ubooktype').val(data[0].booktype);
                $('#ubookimg').val(data[0].bookimg);
                $('#ubooknum').val(data[0].booknum);
                $('#ubookname').val(data[0].bookname);
            }
        });
    });
    $('#updateModal #confirmUpdate').click(function (e) {
        $.ajax({
            url: 'update.php',
            type: 'post',
            data: {
                booktype: $('#ubooktype').val(),
                bookimg: $('#ubookimg').val(),
                booknum: $('#ubooknum').val(),
                bookname: $('bookname').val(),
                bookid: updateId
            },
            success: function (data) {
                console.log(data);
                $('#updateModal').modal('hide');
                refreshBook();
            }

        });
    });

    /*测试成功！！！！！！！！！！*/
    $('#btnsubmitde').click(
        function (e) {
            if ($('#deleteid').val() === "") {
                $('#deleteid').parent().addClass('has-error');
            }
            else
                $.ajax({
                        url: 'delete.php',
                        type: 'post',
                        data: {bookid: $('#deleteid').val()},
                        success: function (data) {
                            console.log(data);
                            console.log('删除成功');
                            refreshBook();
                        }
                    }
                );


        }
    );


    /*第二个插入版本，这个需要先插后面再显示*/
    $('#btnshowlastbook').click(function (e) {
        e.preventDefault();
        //输入判断
        if ($('#booktypeNew').val() === "" || $('#bookimgNew').val() === "" || $('#booknumNew').val() === "" || $('#booknameNew').val() === "") {

            if ($('#booktypeNew').val() === "") {
                $('#booktypeNew').parent().addClass('has-error');
            } else {
                $('#booktypeNew').parent().removeClass('has-error');
            }
            if ($('#bookimgNew').val() === "") {
                $('#bookimgNew').parent().addClass('has-error');
            } else {
                $('#bookimgNew').parent().removeClass('has-error');
            }
            if ($('#booknumNew').val() === "") {
                $('#booknumNEw').parent().addClass('has-error');
            } else {
                $('#booknumNew').parent().removeClass('has-error');
            }
            if ($('#booknameNew').val() === "") {
                $('#booknameNew').parent().addClass('has-error');
            } else {
                $('#booknameNew').parent().removeClass('has-error');
            }
        } else {
            var jsonBooks = {
                // bookid: $('#bookid').val(),
                booktype: $('#booktypeNew').val(),
                bookimg: $('#bookimgNew').val(),
                booknum: $('#booknumNew').val(),
                bookname: $('#booknameNew').val()
            };
            //提交添加的新闻
            $.ajax({
                url: 'insert.php',
                type: 'post',
                data: jsonBooks,
                datatype: 'json',
                success: function (data) {
                    console.log(data);
                    //刷新页面
                    showinsertTable();
                }
            });
        }
    });

    //刷新页面，载入数据
    function refreshBook() {
        $bookTable.empty();
        $.ajax({
            url: 'getbooks.php',
            type: 'POST',
            datatype: 'json',
            data: {booktype: '', bookname: ''},
            success: function (ss) {
                ss.forEach(function (item, index, array) {
                    var $bookid = $('<td>').html(item.bookid);
                    var $booktype = $('<td>').html(item.booktype);
                    var $bookimg = $('<td>').html(item.bookimg);
                    var $booknum = $('<td>').html(item.booknum);
                    var $bookname = $('<td>').html(item.bookname);
                    var $booktd = $('<td>');
                    var $bookbtn = $('<button>').addClass('btn btn-primary btn-xs').html('编辑');
                    var $btndele = $('<button>').addClass('btn btn-xs btn-danger').html('删除');
                    $booktd.append($bookbtn, $btndele);
                    var $tRow = $('<tr>');
                    $tRow.append($bookid, $booktype, $bookimg, $booknum, $bookname, $booktd);
                    $bookTable.append($tRow);
                });
            }
        });
    }

    //写成函数好了
    function showinsertTable() {
        $bookTableNew.empty();
        $.ajax({
            url: 'showlastbook.php',
            type: 'post',
            datatype: 'json',
            success: function (data) {
                //这里返回的数组是个二维数组。。。。。。
                console.log(data[0].bookid);
                console.log(data[0].bookimg);
                var $bookid = $('<td>').html(data[0].bookid);
                var $booktype = $('<td>').html(data[0].booktype);
                var $bookimg = $('<td>').html(data[0].bookimg);
                var $booknum = $('<td>').html(data[0].booknum);
                var $bookname = $('<td>').html(data[0].bookname);
                var $booktd = $('<td>');
                var $bookbtn = $('<button>').addClass('btn btn-success').html('添加成功');
                $booktd.append($bookbtn);

                var $tRow = $('<tr>');
                $tRow.append($bookid, $booktype, $bookimg, $booknum, $bookname, $booktd);
                $bookTableNew.append($tRow);
            }

        });
    }
});
