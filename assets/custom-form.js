function reset_button(value = 0) {
    if (value == 0) {
        $('button[id="submit-button"]').attr('disabled', 'true');
        $('button[id="submit-button"]').text('');
        $('button[id="submit-button"]').append('<span class=\"spinner-grow spinner-grow-sm mb-1\"></span> Mohon tunggu...');
        $('button[id="reset-button"]').hide();
    } else {
        $('button[id="submit-button"]').removeAttr('disabled');
        $('button[id="submit-button"]').removeAttr('span');
        $('button[id="submit-button"]').text('');
        $('button[id="submit-button"]').append('<i class=\"fa fa-check\"></i> Submit');
        $('button[id="reset-button"]').show();
    }
}
$(function() {
    $("#main_form").on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            url: $(this).attr('action'),
            method: $(this).attr('method'),
            data: new FormData(this),
            processData: false,
            dataType: 'json',
            contentType: false,
            beforeSend: function() {
                reset_button(0);
                $(document).find('small.text-danger').text('');
                $(document).find('input').removeClass('is-invalid');
            },
            success: function(data) {
                reset_button(1);
                if (data.status == false) {
                    if (data.type == 'validation') {
                        $.each(data.message, function(prefix, val) {
                            $("input[name="+prefix+"]").addClass('is-invalid');
                            $('small.'+prefix+'_error').text(val[0]);
                        });
                    }
                    if (data.type == 'alert') {
                        $('.modal').animate({ scrollTop: 0 }, 'slow');
                        $('#alert-modal-message').html(data.message);
                        $('#alert-modal').removeClass('hidden');
                        setTimeout(() => {
                            $('#alert-modal').addClass('hidden');
                        }, 5000);
                        // swal.fire("Gagal!", data.message, "error");
                    }
                } else {
                    $('html,body').animate({
                        scrollTop: $("#alert-success").offset().top
                    }, 'slow');
                    $('#alert-success-message').html(data.message);
                    $('#alert-success').removeClass('hidden');
                    $("#modal").modal('hide');
                    window.LaravelDataTables["data-table"].draw();
                    setTimeout(() => {
                        $('#alert-success').addClass('hidden');
                    }, 15000);
                }
            },
            error:function() {
                $('html,body').animate({
                    scrollTop: $("#alert-danger").offset().top
                }, 'slow');
                $('#alert-danger-message').html("Terjadi kesalahan.");
                $('#alert-danger').removeClass('hidden');
                $("#modal").modal('hide');
                setTimeout(() => {
                    $('#alert-danger').addClass('hidden');
                }, 5000);
            },
        });
    });
});