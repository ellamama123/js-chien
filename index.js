$(document).ready(function() {
    var table = $('#data-table').DataTable({
        "data": dataJson.users,
        columnDefs: [{
            targets: [3, 6],
            render: function(data, type, row, meta) {
                return "<input type='text' value='" + data + "'>";
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
        }]
    });

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
    $('#data-table tbody').on('click', 'tr', function() {
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
    });
    $('#data-table tbody').on('click', 'button.delete', function() {
        table
            .row($(this).parents('tr'))
            .remove()
            .draw();
    });
    $('.search-button').on('click', function() {
        table.search('');
        $('.search-box').each(function() {
            if (this.value.length > 0) {
                table.column($(this).data('columnIndex')).search(this.value);
            }
        });
        table.draw();

    });
    $('.clear').on('click', function() {
        $('#searchId').val('');
        $('#searchName').val('');
    })
    $('.save').on('click', function() {
        var data = table.rows().data();
        console.log(data);
    })
});