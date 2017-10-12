$('document').ready(function() {
    /*在一开始的时候刷新图书表　todo 测试成功*/
    var $booktableindex = $('#booktableindex tbody');
    refreshtableindex();
    function refreshtableindex() {
        $booktableindex.empty();
        $.ajax({
            url: 'getbooks.php',
            type: 'POST',
            datatype: 'json',
            data: {booktype: '', bookName: ''},
            success: function (ss) {
                $booktableindex.empty();
                ss.forEach(function (item, index, array) {
                    var $bookID = $('<td>').html(item.bookID);
                    var $bookName = $('<td>').html(item.bookName);
                    var $booktype = $('<td>').html(item.booktype);
                    var $bookWR = $('<td>').html(item.bookWR);
                    var $bookPress=$('<td>').html(item.bookPress);
                    var $bookNum = $('<td>').html(item.bookNum);
                    var $booktd = $('<td>');
                    var $tRow = $('<tr>');
                    $tRow.append($bookID, $bookName, $booktype, $bookWR, $bookPress,$bookNum);
                    $booktableindex.append($tRow);
                });
            }
        });
    }

    $('#search').click(
        function (e) {
            e.preventDefault();
            if($('#serachbook').val()!==""){
                $.ajax({
                        url: 'searchbook.php',
                        type: 'post',
                        data: {bookname: $('#serachbook').val()},
                        success: function (ss) {
                            console.log("开始搜书名了呢");
                            $booktableindex.empty();
                            ss.forEach(function (item, index, array) {
                                var $bookID = $('<td>').html(item.bookID);
                                var $bookName = $('<td>').html(item.bookName);
                                var $booktype = $('<td>').html(item.booktype);
                                var $bookWR = $('<td>').html(item.bookWR);
                                var $bookPress=$('<td>').html(item.bookPress);
                                var $bookNum = $('<td>').html(item.bookNum);
                                var $booktd = $('<td>');
                                var $tRow = $('<tr>');
                                $tRow.append($bookID, $bookName, $booktype, $bookWR, $bookPress,$bookNum);
                                $booktableindex.append($tRow);
                            });
                        }
                    }
                );

            }
            else
                refreshtableindex();

        }
    );



});





