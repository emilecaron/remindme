var on_submit=function() {
    console.log('loading');

    var form = {
        "email": $('#email').val(),
        "date": $('#date').val()
    };
    $.post('http://localhost:5000/api/register', form, on_reply, 'json').always(function() {
        console.log('loaded');
        $('#alert').removeClass('hidden');
    });
};

var on_reply=function(data){
    console.log('reply');
    console.log(data);
    $('#alert-msg').html(data.msg);
}



$(document).ready(function() {
    console.log('ready');

    // bind
    $('form').submit(on_submit)
    $('.close').click(function(){$('#alert').addClass('hidden');})

});