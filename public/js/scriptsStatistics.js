$(function() {
    firstInit();
    initUsersStat();

    $("tr").on('click', '.stat', function() {
        var elementID = $(this).closest('tr').next('tr').attr('id');
        $("#"+elementID).toggle();
    });
    
    $("#search").unbind().click(function() {
        var dateTo = moment($('#to-date-input').val()).format('YYYY-MM-DD');
        var dateFrom = moment($('#from-date-input').val()).format('YYYY-MM-DD');

        if(dateTo >= dateFrom){
            getData(dateFrom, dateTo);
        }else{
            $("#dateAlert").show();
        }
    });


    function getData(from, to){
        $.ajax({
            url: '/sharing/getTimeStatistics',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                from: from,
                to: to,
                }),
            success: function(response) {
                initTimesStat(response.names, response.numberOfUsersStats, from, to)
            }
        });
    }

    function firstInit(){
        var dateTo = moment().format('YYYY-MM-DD');
        var dateFrom = moment().subtract(7,'d').format('YYYY-MM-DD');
        $("#from-date-input").attr("value", dateFrom);
        $("#to-date-input").attr("value", dateTo);
        getData(dateFrom, dateTo);
    }

    function initTimesStat(names, numberOfUsersStats, from, to){
        $("#chartDiv").empty();
        var new_item = $("<canvas id='timeCompletedChart' width='500' height='300'></canvas>");
        $('#chartDiv').append(new_item);
        
        const ctx = document.getElementById('timeCompletedChart').getContext('2d');

        var data = generateDates(from, to);
        var completedDataset = [];

        if(names){
            for(i = 0; i < names.length; i++){
                var completedChartColor = getRandomColor();
                var completedData = []

                for(j = 0; j < data.length; j++){
                    var index = numberOfUsersStats.findIndex(number => number.date === data[j] && number.User.name === names[i]);
                    var numberOfCompleted = numberOfUsersStats[index];
                    var count = 0;
                    if (typeof numberOfCompleted != "undefined") { 
                        count = parseInt(numberOfCompleted["quantity"]);
                    }
                    var completed = {
                        x: data[j], 
                        y: count
                    };
                    completedData.push(completed);
                }
                var datas = {
                    label: names[i],
                    backgroundColor: completedChartColor,
                    data: completedData,
                    pointBorderWidth: 2,
                    pointRadius: 5,
                    pointHoverRadius: 7
                };
                completedDataset.push(datas);
            }
        }

        console.log(JSON.stringify(completedDataset))
        let myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                datasets: completedDataset
            },
            options: {
                scales: {
                    xAxes: [{
                        type: 'time',
                        position: 'bottom',
                        time: {
                            displayFormats: {'day': 'DD/MM/YY'},
                            tooltipFormat: 'DD/MM/YY',
                            unit: 'day',
                        },
                        ticks: {
                          autoSkip: false
                        }
                    }],
                    yAxes: [{
                        type: 'linear',
                        position: 'left',
                        ticks: {
                            min: 0,
                            max: 10,
                            stepSize: 1,
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    }

    function initUsersStat(){
        $.ajax({
            url: '/sharing/getStatistics',
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
    };

    function getRandomColor() {
        var letters = 'BCDEFB'.split('');
            var color = '#';
            for (var i = 0; i < 6; i++ ) {
                color += letters[Math.floor(Math.random() * letters.length)];
            }
            return color;
    };

      
    function generateDates(startDate, stopDate) {
        var dateArray = [];
        var currentDate = moment(startDate).add(1, 'days');
        var stopDate = moment(stopDate);
        while (currentDate <= stopDate) {
            dateArray.push( moment(currentDate).format('YYYY-MM-DD') )
            currentDate = moment(currentDate).add(1, 'days');
        }
        return dateArray;
    }
});