//当打开后台管理界面时清空table

$('documnet').ready(function () {
    // language=JQuery-CSS
    var $usrid="201421714";
    /*用户表*/
    var $self_info_table = $('#self_info_table tbody');

    var $stu_bro_info =$('#stu_bro_info tbody');
    show_self_info_table();
    show_stu_bro_info();
    //显示借阅历史
    function show_stu_bro_info() {
        $stu_bro_info.empty();
        $.ajax({
            url: 'getselfinfo.php',
            type: 'POST',
            datatype: 'json',
            data: {userid: $usrid, self_inf:0},
            success: function (ss) {
                console.log(ss[0].bookID);
                var $bookID = $('<td>').html(ss[0].bookID);
                var $booktype = $('<td>').html(ss[0].booktype);
                var $bookWR = $('<td>').html(ss[0].bookWR);
                var $bookPress = $('<td>').html(ss[0].bookPress);
                var $bookName = $('<td>').html(ss[0].bookName);
                var $borr_date = $('<td>').html(ss[0].borr_date);
                var $tRow = $('<tr>');
                $tRow.append($bookID, $bookName,$booktype, $bookWR, $bookPress,$borr_date);
                $stu_bro_info.append($tRow);
            }
        });
    }

　　 function  show_self_info_table() {
       $self_info_table.empty();
       $.ajax({
           url: 'getselfinfo.php',
           type: 'POST',
           datatype: 'json',
           data: {userid: $usrid, self_inf:1},
           success: function (ss) {
                   var $bookID = $('<td>').html(ss[0].userID);
                   var $booktype = $('<td>').html(ss[0].userName);
                   var $bookWR = $('<td>').html(ss[0].userPD);
                   var $bookNum = $('<td>').html(ss[0].Grade);
                   var $bookName = $('<td>').html(ss[0].Class);
                   var $E_mailAD= $('<td>').html(ss[0].E_mailAD);
                   var $booktd = $('<td>');
                   var $bookbtn = $('<button>').addClass('btn btn-primary btn-xs').html('编辑');
                   $booktd.append($bookbtn);
                   var $tRow = $('<tr>');
                   $tRow.append($bookID, $booktype, $bookWR, $bookNum, $bookName,$E_mailAD, $booktd);
                   $self_info_table.append($tRow);
           }
       });
   }

    //修改个人信息
    var updateId = null;
    $self_info_table.on('click', '.btn-primary', function (e) {
        $('#updateModal').modal('show');
        updateId = $(this).parent().prevAll().eq(5).html();
        $.ajax({
            url: 'getselfinfo.php',
            type: 'get',
            datatype: 'json',
            data: {updateId: updateId},
            success: function (data)
            {
                console.log(data);
                $('#uname').val(data[0].userName);
                $('#upassword').val(data[0].userPD);
                $('#ugrade').val(data[0].Grade);
                $('#uclass').val(data[0].Class);
                $('#uemail').val(data[0].E_mailAD);
            }
        });
    });
    $('#updateModal #confirmUpdate').click(function (e) {
        $.ajax({
            url: 'getselfinfo.php',
            type: 'post',
            data: {
                userName: $('#uname').val(),
                userPD: $('#upassword').val(),
                Grade: $('#ugrade').val(),
                Class: $('#uclass').val(),
                E_mailAD: $('#uemail').val(),
                userID: updateId,
                update: true
            },

            success: function (data) {
                console.log(data);
                $('#updateModal').modal('hide');
                show_self_info_table();
            }

        });
    });


});