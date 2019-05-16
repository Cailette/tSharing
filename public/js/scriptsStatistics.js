$(function() {

    function getRandomColor() {
        var letters = 'BCDEFB'.split('');
                var color = '#';
                for (var i = 0; i < 6; i++ ) {
                    color += letters[Math.floor(Math.random() * letters.length)];
                }
                return color;
      };

      function randomColors(total)
      {
          var i = 360 / (total - 1); 
          var r = []; 
          for (var x = 0; x < total; x++)
          {
              r.push(hsvToRgb(i * x, 100, 100));
          }
          return r;
      };

    $.ajax({
        url: '/sharing/getStatistics/',
        method: 'GET',
        contentType: 'application/json',
        success: function(response) {
            console.log(JSON.stringify(response.names))


            var assignedChartColor = [];
            var completedChartColor = [];
            var deletedChartColor = [];
            
            var assignedChartData = [];
            var completedChartData = [];
            var deletedChartData = [];

            if(response.names){
                for(i = 0; i < response.names.length; i++){
                    assignedChartColor[i] = getRandomColor();
                    completedChartColor[i] = getRandomColor();
                    deletedChartColor[i] = getRandomColor();

                    var index = response.numberOfUsersStats.findIndex(number => number.status === 'assigned' && number.User.name === response.names[i]);
                    var numberOfAssigned = response.numberOfUsersStats[index];
                    index = response.numberOfUsersStats.findIndex(number => number.status === 'completed' && number.User.name === response.names[i]);
                    var numberOfCompleted = response.numberOfUsersStats[index];
                    index = response.numberOfUsersStats.findIndex(number => number.status === 'deleted' && number.User.name === response.names[i]);
                    var numberOfDeleted = response.numberOfUsersStats[index];

                    if (typeof numberOfAssigned != "undefined") { 
                        assignedChartData[i] = parseInt(numberOfAssigned["quantity"]);
                    } else {
                        assignedChartData[i] = 0;
                    }

                    if (typeof numberOfCompleted != "undefined") { 
                        completedChartData[i] = parseInt(numberOfCompleted["quantity"]);
                    } else {
                        completedChartData[i] = 0;
                    }
                    
                    if (typeof numberOfDeleted != "undefined") { 
                        deletedChartData[i] = parseInt(numberOfDeleted["quantity"]);
                    } else {
                        deletedChartData[i] = 0;
                    }
                }
            }

            
            // assignedChartColor = randomColors(response.names.length);
            // completedChartColor = randomColors(response.names.length);
            // deletedChartColor = randomColors(response.names.length);

            var assignedChart = document.getElementById('assignedChart').getContext('2d');
            var completedChart = document.getElementById('completedChart').getContext('2d');
            var deletedChart = document.getElementById('deletedChart').getContext('2d');

            var chartA = new Chart(assignedChart, 
                {
                    type:"pie",
                    data:{
                        labels: response.names,
                        datasets:[
                            { 
                                label:"My First Dataset",
                                data: assignedChartData,
                                backgroundColor: assignedChartColor
                            }]
                        }
                });

            var chartC = new Chart(completedChart, 
                {
                    type:"pie",
                    data:{
                        labels: response.names,
                        datasets:[
                            { 
                                label:"My First Dataset",
                                data: completedChartData,
                                backgroundColor: completedChartColor 
                            }]
                        }
                });

            var chartD = new Chart(deletedChart, 
                {
                    type:"pie",
                    data:{
                        labels: response.names,
                        datasets:[
                            { 
                                label:"My First Dataset",
                                data: deletedChartData,
                                backgroundColor: deletedChartColor
                            }]
                        }
                });
        }
    });

    



    $("tr").on('click', '.stat', function() {
        var elementID = $(this).closest('tr').next('tr').attr('id');
        $("#"+elementID).toggle();
        console.log('Click! ' + elementID)
    });
});