$(function() {
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
                $(this).closest('form').trigger('reset');

                var new_item = $("<div class='row justify-content-center align-items-center mb-4 taskRow' id='" + response.task.id + "'>\
                                    <div class='card bg-light mb-3 card-block w-50 shadow-sm'>\
                                        <div class='card-header'>\
                                            <div class='d-flex'>\
                                                <div class='px-2 mt-2 align-self-center'>\
                                                    <h5 class='text-dark'>" + response.task.title + "</h5>\
                                                </div>\
                                                <div class='btns px-2 ml-auto' id='btns" + response.task.id + "'>\
                                                    <div class='idAssign btn btn-outline-success m-2 bg-light' id='assignTask?idTask=" + response.task.id + "'  title='Take the task'><span class='small'>Assign</span></div>\
                                                    <div class='idDelete btn btn-outline-danger m-2 bg-light' id='deleteTask?idTask=" + response.task.id + "' title='Delete the task'><span class='small'>Delete</span></div>\
                                                </div>\
                                            </div>\
                                        </div>\
                                        <div class='card-body bg-white'>\
                                            <div class='row px-2' style='white-space: pre-wrap;'>\
                                                <p>" + response.task.comment + "</p>\
                                            </div> \
                                            <div class='row d-flex px-4 dataRow' id='dataRow" + response.task.id + "'>\
                                                <span class='badge badge-pill badge-light ml-auto'>\
                                                    Added by: <span class='text-danger'>" + response.task.User.name + "</span>, " + response.task.date + "\
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
                                                    Assigned to: <span class='text-danger'>" + response.task.User.name + "</span>, " + response.task.date + "\
                                                </span>\
                                            </div>");
                $("#"+btnsID).remove();
            }
        });
    });
});


