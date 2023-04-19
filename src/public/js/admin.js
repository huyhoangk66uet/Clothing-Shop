
function showDropdown() {
    document.querySelector(".individual__dropdown").classList.toggle("showDropdown");
}
function closeSidebar() {
    document.querySelector(".sidebar").classList.toggle("closeSidebar");
    elements = document.querySelectorAll(".sidebar-item");
    elements.forEach(element => {
        element.classList.toggle("closeSidebar-item");
    });
    elements = document.querySelectorAll(".sidebar-item > span");
    elements.forEach(element => {
        element.classList.toggle("closeTitle");
    });
    elements = document.querySelectorAll(".treeview-sidebar  a");
    elements.forEach(element => {
        element.classList.toggle("closeTitle");
    });
    document.querySelector(".content-wrapper").classList.toggle("pullContent");
}

function showTreeview() {
    document.querySelector(".treeview-sidebar").classList.toggle("showTreeview");
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