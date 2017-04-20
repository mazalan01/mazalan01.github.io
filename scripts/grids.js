      function draw_gids(){
        //google.charts.load('current', {'packages':['bar']});
        google.charts.setOnLoadCallback(drawStuff);
        google.charts.setOnLoadCallback(drawChart);
      }

      function min(a,b){
        if(a>b)return b;
        return a;
      }

      function drawStuff() {
        var t=[];
        t.push(['City name', 'Visits number']);
        var to=sort(cities_table);
        for(var i=0;i<min(cities_table.length,5);i++){
          t.push([to[i][0],to[i][1]]);
        }
        //alert(t);
        var data = new google.visualization.arrayToDataTable(t);
        var options = {
          width: 400,
          legend: { position: 'none' }, 
          axes: {
            x: {
              0: { side: 'top', label: 'Popular cities'} // Top x-axis.
            }
          },
          bar: { groupWidth: "90%" }
        };

        var chart = new google.charts.Bar(document.getElementById('top_x_div'));
        // Convert the Classic options to Material options.
        chart.draw(data, google.charts.Bar.convertOptions(options));
      };

       function drawChart() {
        var t=[];
        t.push(['City name', 'Visits number']);
        var to=sort(cities_table);
        for(var i=0;i<min(cities_table.length,5);i++){
          t.push([to[i][0],to[i][1]]);
        }
        var data = google.visualization.arrayToDataTable(t);

        var options = {
          title: 'cities',
          is3D: true,
        };

        var chart = new google.visualization.PieChart(document.getElementById('piechart'));

        chart.draw(data, options);
      }