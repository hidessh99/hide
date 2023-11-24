$(document).ready(function() {
    $('.custom-text-editor').summernote({
        height: 230
    });
});
function modal(type, title = 'Data', url) {
    $('#modal').modal('show');
    if (type == 'add') {
        $('#modal-title').html('<i class="fa fa-plus-square"></i> Tambah '+title+'');
    } else if (type == 'send') {
        $('#modal-title').html('<i class="fa fa-plus-square"></i> Kirim '+title+'');
    } else if (type == 'edit') {
        $('#modal-title').html('<i class="fa fa-edit"></i> Edit '+title+'');
    } else if (type == 'reply') {
        $('#modal-title').html('<i class="fa fa-edit"></i> Balas '+title+'');
    } else if (type == 'delete') {
        $('#modal-title').html('<i class="fa fa-trash"></i> Delete '+title+'');
    } else if (type == 'detail') {
        $('#modal-title').html('<i class="fa fa-search"></i> Detail '+title+'');
    } else if (type == 'filter') {
        $('#modal-title').html('<i class="fa fa-filter"></i> Filter '+title+'');
    } else if (type == 'confirm') {
        $('#modal-title').html('<i class="fa fa-check"></i> Confirm '+title+'');
    } else if (type == 'subscribe') {
        $('#modal-title').html('<i class="mdi mdi-chart-check"></i> Berlangganan '+title+'');
    } else {
        $('#modal-title').html('Empty');
    }
    if (type == 'add' || type == 'edit' || type == 'reply' || type == 'send' ||  type == 'subscribe') {
        $('#modal-footer').addClass('hidden');
    } else {
        $('#modal-footer').removeClass('hidden');
    }
    $.ajax({
        type: "GET",
        url: url,
        beforeSend: function() {
            $('#modal-detail-body').html('<div class="text-center">Loading...</div>');
        },
        success: function(result) {
            var html = "<div id=\"alert-modal\" class=\"alert alert-danger hidden text-dark\"><div class=\"alert-body\"><div id=\"alert-modal-message\"></div></div></div>";
            $('#modal-detail-body').html(html + result);
        },
        error: function() {
            $('#modal').modal('hide');
            swal.fire("Gagal!", "Terjadi kesalahan.", "error");
        }
    });
    $('#modal-detail').modal();
}