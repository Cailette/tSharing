$(function() {
    change();

    $( ".sortAndFilter" ).change(function() {
        change();
    });

    $('#addTaskForm').on('submit', async function(event) {
        $("#pageStatement").remove();
        event.preventDefault();
        $.ajax({
            url: '/sharing/addPrivateTask',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                tTitle: $('#tTitle').val(),
                tComment: $('#tComment').val(),
                }),
            success: function(response) {
                $("#addTaskForm").trigger('reset');

                var new_item = $("<div class='row justify-content-center align-items-center mb-4 taskRow' id='" + response.task.id + "'>\
                                    <div class='card bg-light mb-3 card-block w-100 shadow-sm'>\
                                        <div class='card-header'>\
                                            <div class='d-flex'>\
                                                <div class='px-2 mt-2 align-self-center'>\
                                                    <h5 class='text-dark'>" + response.task.title + "</h5>\
                                                </div>\
                                                <div class='btns ml-auto' id='btns" + response.task.id + "' style='min-width: 140px;'>\
                                                        <div class='idComplete btn btn-primary m-1' id='completeTask?idTask=" + response.task.id + "'  title='Complete the task'><span class='small'>Complete</span></div>\
                                                        <div class='idRemove btn btn-warning m-1' id='removeTask?idTask=" + response.task.id + "' title='Remove the task from your list'><span class='small'>Remove</span></div>\
                                                </div>\
                                            </div>\
                                        </div>\
                                        <div class='card-body bg-white'>\
                                            <div class='row px-2' style='white-space: pre-wrap;'>\
                                                <p>" + response.task.comment + "</p>\
                                            </div> \
                                            <div class='row d-flex px-4 dataRow' id='dataRow" + response.task.id + "'>\
                                                <span class='badge badge-pill badge-light ml-auto'>\
                                                    Added by: <span class='text-primary'>" + response.task.User.name + "</span>, " + response.task.date + "\
                                                </span>\
                                            </div>\
                                        </div>\
                                    </div>\
                                </div>").hide();
                $('#yourTasksView').append(new_item);
                new_item.slideDown();
            }
        });
    });


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


    function change() {
        var filterValue = $('input[name=filterRadio]:checked').attr('id');

        $.ajax({
            url: '/sharing/filterTasks?' + filterValue,
            method: 'GET',
            contentType: 'application/json',
            success: function(response) {
                console.log(JSON.stringify(response));
                $("#yourTasksView").empty();

                if(response.tasks.length != 0){
                    response.tasks.forEach(function(task) {
                            var new_item = $("<div class='row justify-content-center align-items-center mb-4 taskRow' id='" + task.id + "'>\
                                                <div class='card bg-light mb-3 card-block w-100 shadow-sm'>\
                                                    <div class='card-header'>\
                                                        <div class='d-flex'>\
                                                            <div class='px-2 mt-2 align-self-center'>\
                                                                <h5 class='text-dark'>" + task.title + "</h5>\
                                                            </div>\
                                                            <div class='btns ml-auto' id='btns" + task.id + "' style='min-width: 140px;'>\
                                                                <div class='idComplete btn btn-primary m-1' id='completeTask?idTask=" + task.id + "'  title='Complete the task'><span class='small'>Complete</span></div>\
                                                                <div class='idRemove btn btn-warning m-1' id='removeTask?idTask=" + task.id + "' title='Remove the task from your list'><span class='small'>Remove</span></div>\
                                                            </div>\
                                                        </div>\
                                                    </div>\
                                                    <div class='card-body bg-white'>\
                                                        <div class='row px-2' style='white-space: pre-wrap;'>\
                                                            <p>" + task.comment + "</p>\
                                                        </div> \
                                                        <div class='row d-flex px-4 dataRow' id='dataRow" + task.id + "'>\
                                                            <span class='badge badge-pill badge-light ml-auto'>\
                                                                Added by: <span class='text-primary'>" + task.User.name + "</span>, " + task.date + "\
                                                            </span>\
                                                        </div>\
                                                    </div>\
                                                </div>\
                                            </div>").hide();

                            $('#yourTasksView').append(new_item);
                            new_item.slideToggle();
                        
                })
                } else { 
                    var new_item = $("<div id='pageStatement' class='continer d-flex align-items-center justify-content-center'>\
                                        <div class='row'> \
                                            <h4 class='text-info'>Tasks not found.</h4><br>\
                                        </div>\
                                    </div>").hide();

                    $('#yourTasksView').append(new_item);
                    new_item.slideToggle();
                }
            }
        });
    }

});


