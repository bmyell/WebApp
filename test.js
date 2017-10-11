$('documnet').ready(function() {
    var $bookTable = $('#booktable tbody');
    refreshBook();
    $('#btnsubmit').click(function(e) /*输入的变量*/{
        e.preventDefault();/*阻止元素默认的行为*/
        //输入判断 为空时添加一个has-error
        if ($('#booktype').val() === "" || $('#bookimg').val() === "" || $('#booknum').val() === ""||$('#bookname').val()==="") {

            if ($('#booktype').val() === "") {
                $('#booktype').parent().addClass('has-error');/*给父级添加一个class*/
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
            if($('#bookname').val()===""){
                $('#bookname').parent().addClass('has-error');
            }else{
                $('#bookname').parent().removeClass('has-error');
            }
        } else {
            /*先定义一个jsonbook数据结构*/
            var jsonBooks = {
                // bookid: $('#bookid').val(),
                booktype: $('#booktype').val(),
                bookimg: $('#bookimg').val(),
                booknum: $('#booknum').val(),
                bookname:$('#bookname').val()
            };
            //提交添加的新闻
            /*ajax异步加载使用*/
            $.ajax({
                url: 'insert.php',
                type: 'post',
                data: jsonBooks,
                datatype: 'json',
                success: function(data) {
                    console.log(data);
                    //刷新页面
                    refreshBook();
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
            data: { booktype: '',bookname:'' },
            success:function(ss){
                ss.forEach(function( item, index, array){
                    var $bookid = $('<td>').html(item.bookid);
                    var $booktype = $('<td>').html(item.booktype);
                    var $bookimg = $('<td>').html(item.bookimg);
                    var $booknum = $('<td>').html(item.booknum);
                    var $bookname=$('<td>').html(item.bookname);
                    var $booktd = $('<td>');
                    var $bookbtn = $('<button>').addClass('btn btn-primary btn-xs').html('编辑');
                    var $btndele = $('<button>').addClass('btn btn-xs btn-danger').html('删除');
                    $booktd.append($bookbtn, $btndele);
                    var $tRow = $('<tr>');
                    $tRow.append($bookid, $booktype,$bookimg,$booknum,$bookname,$booktd);
                    $bookTable.append($tRow);
                });
            }
        });
    }

});