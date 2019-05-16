$(function() {
    change();

    $('#addTaskForm').on('submit', async function(event) {
        $("#pageStatement").remove();
        event.preventDefault();
        $.ajax({
            url: '/sharing/addTask',
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
                                                <div class='btns ml-auto' id='btns" + response.task.id + " style='min-width: 140px;'>\
                                                <div class='idAssign btn btn-primary m-1' id='assignTask?idTask=" + response.task.id + "'  title='Take the task'><span class='small'>Assign</span></div>\
                                                <div class='idDelete btn btn-warning m-1' id='deleteTask?idTask=" + response.task.id + "' title='Delete the task'><span class='small'>Delete</span></div>\
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
                $('#allTasksView').append(new_item);
                new_item.slideDown();
            }
        });
    });

    $("div").on('click', '.idDelete', function() {
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

    $("div").on('click', '.idAssign', function() {
        var elementID = $(this).closest('div').attr("id");
        var btnsID =  $(this).closest(".btns").attr("id");
        var cardID =  $(this).closest(".taskRow").attr("id");
        var dataID =  "dataRow" + cardID;
        console.log(dataID);
        $.ajax({
            url: '/sharing/' + elementID,
            method: 'PUT',
            contentType: 'application/json',
            success: function(response) {
                $("#"+dataID).replaceWith("<div class='row d-flex px-4 dataRow' id='dataRow" + response.task.id + "'>\
                                                <span class='badge badge-pill badge-light ml-auto'>\
                                                    Assigned to: <span class='text-warning'>" + response.task.User.name + "</span>, " + response.task.date + "\
                                                </span>\
                                            </div>");
                $("#"+btnsID).remove();
            }
        });
    });

    $( ".sortAndFilter" ).change(function() {
        change();
    });

    function change() {
        var filterValue = $('input[name=filterRadio]:checked').attr('id');
        var sortValue = $('input[name=sortRadio]:checked').attr('id');
        var selectedValue = $('#filterSelect').children("option:selected").val();
        $.ajax({
            url: '/sharing/filterAndSortAllTasks?' + filterValue + '&' + sortValue + '&' + selectedValue,
            method: 'GET',
            contentType: 'application/json',
            success: function(response) {
                console.log('/sharing/filterAndSortAllTasks?' + filterValue + '&' + sortValue + '&' + selectedValue);
                console.log(JSON.stringify(response));
                $("#allTasksView").empty();

                if(response.tasks.length != 0){
                    response.tasks.forEach(function(task) {
                        if(task.status === "free") {
                            var new_item = $("<div class='row justify-content-center align-items-center mb-4 taskRow' id='" + task.id + "'>\
                                                <div class='card bg-light mb-3 card-block w-100 shadow-sm'>\
                                                    <div class='card-header'>\
                                                        <div class='d-flex'>\
                                                            <div class='px-2 mt-2 align-self-center'>\
                                                                <h5 class='text-dark'>" + task.title + "</h5>\
                                                            </div>\
                                                            <div class='btns ml-auto' id='btns" + task.id + "' style='min-width: 140px;'>\
                                                                <div class='idAssign btn btn-primary m-1' id='assignTask?idTask=" + task.id + "'  title='Take the task'><span class='small'>Assign</span></div>\
                                                                <div class='idDelete btn btn-warning m-1' id='deleteTask?idTask=" + task.id + "' title='Delete the task'><span class='small'>Delete</span></div>\
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

                            $('#allTasksView').append(new_item);
                            new_item.slideToggle();
                        }else{
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
                                                                Assigned to: <span class='text-warning'>" + task.User.name + "</span>, " + task.date + "\
                                                            </span>\
                                                        </div>\
                                                    </div>\
                                                </div>\
                                            </div>").hide();

                            $('#allTasksView').append(new_item);
                            new_item.slideToggle();
                        }
                })
                } else { 
                    var new_item = $("<div id='pageStatement' class='continer d-flex align-items-center justify-content-center'>\
                                        <div class='row'> \
                                            <h4 class='text-info'>Tasks not found.</h4><br>\
                                        </div>\
                                    </div>").hide();

                    $('#allTasksView').append(new_item);
                    new_item.slideToggle();
                }
            }
        });
    }
});


