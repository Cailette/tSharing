$(function() {
    change();
    // setRating();

    $( ".sortAndFilter" ).change(function() {
        change();
    });

    function change() {
        var filterValue = $('input[name=filterRadio]:checked').attr('id');
        var sortValue = $('input[name=sortRadio]:checked').attr('id');
        var selectedValue = $('#filterSelect').children("option:selected").val();

        $.ajax({
            url: '/sharing/filterAndSortArchiveTasks?' + filterValue + '&' + sortValue + '&' + selectedValue,
            method: 'GET',
            contentType: 'application/json',
            success: function(response) {
                console.log('/sharing/filterAndSortArchiveTasks?' + filterValue + '&' + sortValue + '&' + selectedValue);
                $("#archiveTasksView").empty();

                if(response.tasks.length != 0){
                  console.log("response.tasksRates" +JSON.stringify( response.userRates));

                    response.tasks.forEach(function(task) {
                        if(task.status === "completed") {
                            var rating = "";
                            if(task.User.id !== response.idUser) {
                                var index = response.userRates.findIndex(userRate => userRate.TaskId === task.id);
                                console.log(JSON.stringify(response.userRates));
                                var userRate = response.userRates[index];
                                console.log(userRate);
                                var value = 0;
                                if (typeof userRate != "undefined") {
                                    value = parseInt(userRate.value);
                                    console.log(value);
                                } 
                                var stars = [];
                                for(i=1; i<=5; i++){
                                    if (value == i) {
                                        stars[i-1] = "<option value='rateTask?idTask=" + task.id + "&value=" + i + "' selected>" + i + "</option>"; 
                                    } else { 
                                        stars[i-1] = "<option value='rateTask?idTask=" + task.id + "&value=" + i + "'>" + i + "</option>";
                                    } 
                                }

                                rating = "<div class='col-4 ratings mr-1 ml-auto my-auto'>\
                                              <select class='rating' id='rateTask?idTask=" + task.id + "'>" + stars.join( "" ) + "</select>\
                                          </div>";
                            }

                            var ratingAvg = "";
                            var index2 = response.tasksRates.findIndex(taskRate => taskRate.Task.id === task.id);
                            var rate = response.tasksRates[index2];
                            if (typeof rate != "undefined") {
                                ratingAvg = rate.ratingAvg.slice(0, -2);
                            } else{
                                ratingAvg = "0.00";
                            }
                            
                            var new_item = $("<div class='row justify-content-center align-items-center mb-4 taskRow' id='" + task.id + "'>\
                                                <div class='card bg-light mb-3 card-block w-100 shadow-sm'>\
                                                    <div class='card-header'>\
                                                        <div class='row'>\
                                                            <div class='col px-2 mt-2 align-self-center'>\
                                                                <h5 class='text-dark'>" + task.title + "</h5>\
                                                            </div>" + rating + "\
                                                            <div class='col-2 ml-auto align-self-center text-danger avg' id='avg" + task.id + "'>" + ratingAvg + "</div>\
                                                        </div>\
                                                    </div>\
                                                    <div class='card-body bg-white'>\
                                                        <div class='row px-2' style='white-space: pre-wrap;'>\
                                                            <p>" + task.comment + "</p>\
                                                        </div> \
                                                        <div class='row d-flex px-4 dataRow' id='dataRow" + task.id + "'>\
                                                            <span class='badge badge-pill badge-light ml-auto'>\
                                                                Completed by: <span class='text-warning'>" + task.User.name + "</span>, " + task.date + "\
                                                            </span>\
                                                        </div>\
                                                    </div>\
                                                </div>\
                                            </div>").hide();

                            $('#archiveTasksView').append(new_item);
                            new_item.slideToggle();
                        } else {
                            var new_item = $("<div class='row justify-content-center align-items-center mb-4 taskRow' id='" + task.id + "'>\
                                                <div class='card bg-light mb-3 card-block w-100 shadow-sm'>\
                                                    <div class='card-header'>\
                                                        <div class='d-flex'>\
                                                            <div class='px-2 mt-2 align-self-center'>\
                                                                <h5 class='text-dark'>" + task.title + "</h5>\
                                                            </div>\
                                                        </div>\
                                                    </div>\
                                                    <div class='card-body bg-white'>\
                                                        <div class='row px-2' style='white-space: pre-wrap;'>\
                                                            <p>" + task.comment + "</p>\
                                                        </div> \
                                                        <div class='row d-flex px-4 dataRow' id='dataRow" + task.id + "'>\
                                                            <span class='badge badge-pill badge-light ml-auto'>\
                                                                Deleted by: <span class='text-primary'>" + task.User.name + "</span>, " + task.date + "\
                                                            </span>\
                                                        </div>\
                                                    </div>\
                                                </div>\
                                            </div>").hide();

                            $('#archiveTasksView').append(new_item);
                            new_item.slideToggle();
                        }
                })
                } else { 
                    var new_item = $("<div id='pageStatement' class='continer d-flex align-items-center justify-content-center'>\
                                        <div class='row'> \
                                            <h4 class='text-info'>Tasks not found.</h4><br>\
                                        </div>\
                                    </div>").hide();

                    $('#archiveTasksView').append(new_item);
                    new_item.slideToggle();
                }
                // setRating();
            },
        });
    }
    
    function setRating(){
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
                            
                            $(idAvg).replaceWith("<div class='col-2 ml-auto align-self-center text-danger' id='avg"+ idTask +"'>\
                                                    "+ response.avg.ratingAvg.slice(0, -2) +"\
                                                </div>");
                        }
                    });
                 }
            }
        });
    }
});

