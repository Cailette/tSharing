$(function() {
    $('.rating').barrating({
        theme: 'fontawesome-stars',
        initialRating: null,
        onSelect: function(value, text, event) {
          if (typeof(event) !== 'undefined') {
            var value = $(event.target).data("rating-value");
            
            var elementID = $(this).closest('option').attr("id");
            var cardID =  $(this).find( "select" ).closest(".rating").attr("id");
            console.log('/sharing/rateTask?idTask=' + cardID + "&value=" + value);
            $.ajax({
                url: '/sharing/rateTask?idTask=' + cardID + "&value=" + value,
                method: 'PUT',
                contentType: 'application/json',
                success: function(response) {
                    
                }
            });
            
          }
        }
    });
});

