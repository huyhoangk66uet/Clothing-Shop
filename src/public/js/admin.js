
function showDropdown() {
    document.querySelector(".individual__dropdown").classList.toggle("showDropdown");
}

$(document).ready(function () {
    var lang = {
        "emptyTable": "Không có dữ liệu nào trong bảng",
        "info": "Hiển thị _START_ đến _END_ của _TOTAL_ bản ghi",
        "infoEmpty": "Hiển thị 0 đến 0 của 0 bản ghi",
        "infoFiltered": "(được lọc từ _MAX_ tổng số bản ghi)",
        "lengthMenu": "Hiển thị _MENU_ bản ghi",
        "search": "Tìm kiếm:",
        "zeroRecords": "Không tìm thấy kết quả phù hợp",
        "paginate": {
            "first": "Đầu",
            "last": "Cuối",
            "next": "Tiếp",
            "previous": "Trước"
        },
        "aria": {
            "sortAscending": ": sắp xếp cột tăng dần",
            "sortDescending": ": sắp xếp cột giảm dần"
        }
    };
    $('#example').DataTable({
        "language": lang
    });
});


function removeItem(event, name, name_id) {
    var name_id = event.currentTarget.getAttribute(name_id)
    console.log(name_id)
    var ReactModalPortal = document.getElementById('confirm-delete')
    ReactModalPortal.classList.remove('hide');
    var confirm = document.getElementById('confirm')
    var cancel = document.getElementById('cancel')
    cancel.onclick = function(event) {
        ReactModalPortal.classList.add('hide')
    }
    confirm.onclick = function(event) {
        $.ajax({
            url: '/admin/'+ name+ '/' + name_id,
            type: 'DELETE',
            data: {}
        })
        .done(function(data) {
            if(data.message) {
                window.location.reload();
            }
        })
        .fail(function(err) {
            console.log(err)
        })
    }
}

