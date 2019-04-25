$(function() {
    $('.rating').barrating({
        theme: 'fontawesome-stars',
        initialRating: null,
        onSelect: function(value, text, event) {
          if (typeof(event) !== 'undefined') {
            var value = $(event.target).data("rating-value");
            console.log('/sharing/' + value);
            $.ajax({
                url: '/sharing/' + value,
                method: 'PUT',
                contentType: 'application/json',
                success: function(response) {
                    var idTask = (value).replace( /(^.+\D)(\d+)(\D.+$)/i,'$2');
                    var idAvg = "#avg" + idTask;
                    console.log(JSON.stringify(response));
                    console.log("(response)" + response.avg.ratingAvg.slice(0, -2));
                    
                    $(idAvg).replaceWith("<div class='ml-auto align-self-center text-secondary' id='avg"+ idTask +"'>\
                                            "+ response.avg.ratingAvg.slice(0, -2) +"\
                                        </div>");
                }
            });
            
          }
        }
    });
});

