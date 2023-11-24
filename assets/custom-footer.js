$('[data-toggle="select2"]').select2();
$('.datepicker-autoclose').datepicker({
    locale: "id",
    format: "dd MM yyyy",
});
function copy(id) {
    var copyText = document.getElementById(id);
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */
    document.execCommand("copy");
    swal.fire("Disalin!", "'"+copyText.value+"'.", "success");
}      
function info(data) {
    swal.fire("Informasi!", data, "info");
}  
function deleteData(elt, id, title, url, info = '') {
    swal.fire({
        title: "Apakah anda yakin?",
        html: 'Hapus Permanen <b style="font-weight: bold;">'+title+'</b>?'+info+'',
        type: "warning",
        showCancelButton: !0,
        confirmButtonText: "Ya, Hapus!",
        cancelButtonText: "Tidak, Batalkan!",
        confirmButtonClass: "btn btn-success mt-2",
        cancelButtonClass: "btn btn-danger ml-2 mt-2",
        buttonsStyling: !1,
    }).then(result => {
        if (result.value) {
            $.ajax({
                url: url,
                type: 'GET',
                error: function() {
                    swal.fire("Gagal", "Terjadi kesalahan.", "error");
                },
                success: function(result) {
                    result = JSON.parse(result);
                    if (result.result == false) {
                        swal.fire("Gagal", "Terjadi kesalahan.", "error");
                    } else {
                        window.LaravelDataTables["data-table"].draw('page');
                        swal.fire("Berhasil!", '<b style="font-weight: bold;">'+title+'</b> berhasil dihapus.', "success");
                    }
                }
            });
        } else {
            swal.fire("Dibatalkan", "Hapus data dibatalkan.", "error");
        }
    });
}
function switchStatus(elt, id, url) {
    $.ajax({
        url: url,
        type: 'GET',
        error: function() {
            window.LaravelDataTables["data-table"].draw('page');
            alertify.error('<i class="fa fa-times"></i> Terjadi kesalahan.')
        },
        success: function(result) {
            result = JSON.parse(result);
            if (result.result == false) {
                window.LaravelDataTables["data-table"].draw('page');
                alertify.error('<i class="fa fa-times"></i> Terjadi kesalahan.')
            } else {
                if ($(elt).attr('value') == '1') {
                    $("label[for="+$(elt).attr('id')+"]").text('Aktif');
                } else {
                    $("label[for="+$(elt).attr('id')+"]").text('Nonaktif');
                }
                window.LaravelDataTables["data-table"].draw('page');
                alertify.success('<span class="text-white"><i class="fa fa-check"></i> '+result.message+'</span>');
            }
        }
    });
}
$(document).ready(function() {
    function slugify(string) {
        return string
        .toString()
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w\-]+/g, "")
        .replace(/\-\-+/g, "-")
        .replace(/^-+/, "")
        .replace(/-+$/, "");
    }
    $(function() { 
        $("#theTitle").keyup(function() { 
            var slug = slugify($('#theTitle').val());
            $('#theSlug').val(slug);
        }).filter(":first").keyup(); //Run it once
    });
});