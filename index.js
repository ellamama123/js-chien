$(document).ready(function() {
    $('#data-table tbody').on('click', 'tr', detailRow);
    $('#data-table tbody').on('click', 'button.delete', deleteRow);
    $('.clear').on('click', clear)
    $('.search-button').on('click', search);
    $('.save').on('click', save);
    // khai báo bảng và đổ dữ liệu vào bảng
    var table = $('#data-table').DataTable({
        "data": dataJson.users,
        columnDefs: [{
            targets: [3, 6],
            render: function(data, type, row, meta) {
                return "<input type='text' class=form-control' value='" + data + "'>";
            },
        }, {
            targets: [2],
            render: function(data) {
                return createSelectPosition(data);
            }
        }, {
            targets: [5],
            render: function(data) {
                return createSelectOffice(data);
            }
        }, {
            targets: [4],
            type: "dom-text",
            render: function(data, type, row, meta) {
                return (
                    "<input type='date' value='" + data + "' class='form-control'>"
                );
            },
        }],

        select: true,
        'columns': [{
            data: "id"
        }, {
            data: "name"
        }, {
            data: "position",
            defaultContent: '<select class="position form-control"></select>',
        }, {
            data: "salary"
        }, {
            data: "start_date"
        }, {
            data: "office",
            defaultContent: '<select class="office form-control"></select>',
        }, {
            data: "extn"
        }, {
            "render": function() {
                return '<button type="button" class="btn btn-danger delete">Xóa</button>'
            }
        }],
        "paging": false,

    });

    // tạo select option để lửa chọn position
    function createSelectPosition(selItem) {
        var sel = "<select class='form-control'>";
        $.each(dataJson.positions, function() {
            if (this.id == selItem) {
                sel += "<option selected value = '" + this.id + "' >" + this.name + "</option>";
            } else sel += "<option  value = '" + this.id + "' >" + this.name + "</option>";
        });
        sel += "</select>";
        return sel;
    }

    // tạo select option để lửa chọn office
    function createSelectOffice(selItem) {
        var sel = "<select class='form-control'>";
        $.each(dataJson.offices, function() {
            if (this.id == selItem) {
                sel += "<option selected value = '" + this.id + "' >" + this.name + "</option>";
            } else sel += "<option  value = '" + this.id + "' >" + this.name + "</option>";
        });
        sel += "</select>";
        return sel;
    }

    // hiện thông tin row khi click vào bảng
    function detailRow() {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        } else {
            table.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
            var data = table.row(this).data();
            $(".name").val(data.id);
            $(".pos").val(data.position);
            $(".salary").val(data.salary);
            $(".date").val(data.start_date);
            $(".office").val(data.office);
            $(".extn").val(data.extn);
        }
    }

    // xóa thông tin row trong bảng
    function deleteRow() {
        table
            .row($(this).parents('tr'))
            .remove()
            .draw();
    }
    // tìm kiếm trong bảng theo name và id
    function search() {
        table.search('');
        $('.search-box').each(function() {
            if (this.value.length > 0) {
                table.column($(this).data('columnIndex')).search(this.value);
            }
        });
        table.draw();
    }

    // clear ô search id , name và table
    function clear() {
        $('#searchId').val('');
        $('#searchName').val('');
        table.search('').columns().search('').draw();
    }

    // lưu dữ liệu và hiển thị ra table
    function save() {
        var data = table.rows().data();
        console.log(data);
    }

});