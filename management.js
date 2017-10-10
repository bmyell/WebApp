//当打开后台管理界面时清空table
$('documnet').ready(function () {
    // language=JQuery-CSS
    var $bookTable = $('#booktable tbody');

    var $bookTableNew = $('#booktableNew tbody');

    var $booktableSearch =$('#booktableSearch tbody');
    //刷新页面
    refreshBook();
    refreshtablesearch();
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
    $booktableSearch.on('click', '.btn-danger', function (e) {
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
    $booktableSearch.on('click', '.btn-primary', function (e) {
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

    function refreshtablesearch() {
        $booktableSearch.empty();
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
                    $booktableSearch.append($tRow);
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

    var booktype;
    booktype='计算机';
    refreshbooks(booktype, 1);
    var curPage = 1; //当前页码
    var total, pageSize, totalPage;
    /*分页函数来了*/
});


//刷新页面，载入数据
function refreshbooks(type, page) { //获取数据
    var $lists = $('section #list tbody');
    $.ajax({
        url: 'getbooks.php',
        type: 'POST',
        datatype: 'json',
        data: { booktype: type, bookname:'',pageNum: page - 1 },
        beforeSend: function() {
            $("#list tbody").append("<td id='loading'>loading...</td>");
        },
        success: function(data) {
            $lists.empty();
            total = data.total; //总记录数
            pageSize = data.pageSize; //每页显示条数
            curPage = page; //当前页
            totalPage = data.totalPage; //总页数
            var list = data.list;
            list.forEach(function(item, index, array) {
                var $list = $('<td>').prependTo($lists);/*在每个list前面插入('<li></li>')*/
                var $td = $('<td>').appendTo($list);
                var $a = $('<a></a>').attr('href', '#').appendTo($td);/*改变属性*/
                        $('<img>').attr('height', 200);
                        $('<img>').attr('width', 200);
                var $img = $('<img>').attr('src', item.bookimg).addClass('width',20).addClass('height',20).appendTo($a);/*这里是改变图片的属性*/



                var $td = $('<td>').appendTo($list);
                var $p = $('<p></p>').html('剩余数目为').appendTo($td);/*前面的内容附加到后面*/
                var $i = $('<i></i>').html(item.booknum).appendTo($p);

                var $td = $('<td>').appendTo($list);
                var $name = $('<p></p>').html('书名').appendTo($td);
                var $i2 = $('<i></i>').html(item.booktype).appendTo($name);
                console.log(item.bookname);
                console.log(item.booktype);
                console.log(item.bookid);
                //.log($('<p></p>').html('haha'));
            });
        },

        complete: function() { //生成分页条
            getPageBar();
        },
        error: function() {
            console.log("数据加载失败");
        }

    });
}
//获取分页条
function getPageBar() {
    //页码大于最大页数
    var pageStr = "";
    if (curPage > totalPage) curPage = totalPage;
    //页码小于1
    if (curPage < 1) curPage = 1;
    pageStr += "<span>共" + total + "条</span></span>" + curPage + "/" + totalPage + "</span>";
    //如果是第一页
    if (curPage == 1) {
        pageStr += "<span>首页</span><span>上一页</span>";
    } else {
        pageStr += "<span ><a href='#' rel='1'>首页</a></span><span><a href='#' rel='" + (curPage - 1) + "'>上一页</a></span>";
    }
    //如果是最后页
    if (curPage >= totalPage) {
        pageStr += "<span>下一页</span><span>尾页</span>";

    } else {
        pageStr += "<span ><a href='#'  rel='" + (parseInt(curPage) + 1) + "'>下一页</a></span><span ><a href='#' rel='" + totalPage + "'>尾页</a></span>";
    }
    $('#pagecount').html(pageStr);
}