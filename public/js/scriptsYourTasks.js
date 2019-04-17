$(function() {
    $("div").on('click', '.idComplete', function() {
        var elementID = $(this).closest('div').attr("id");
        var cardID =  $(this).closest(".taskRow").attr("id");
        $.ajax({
            url: '/sharing/' + elementID,
            method: 'PUT',
            contentType: 'application/json',
            success: function(response) {
                $("#"+cardID).slideUp("slow", function() { $("#"+cardID).remove();});
            }
        });
    });

    $("div").on('click', '.idRemove', function() {
        var elementID = $(this).closest('div').attr("id");
        var cardID =  $(this).closest(".taskRow").attr("id");
        $.ajax({
            url: '/sharing/' + elementID,
            method: 'PUT',
            contentType: 'application/json',
            success: function(response) {
                $("#"+cardID).slideUp("slow", function() { $("#"+cardID).remove();});
            }
        });
    });
});


