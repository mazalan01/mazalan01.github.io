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
        var data = new google.visualization.arrayToDataTable(date_array);
        var options = {
          width: 400,
          legend: { position: 'none' }, 
          axes: {
            x: {
              0: { side: 'top', label: 'Timeline'} // Top x-axis.
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
        var all_visit=0;
        for(var i=0;i<cities_table.length;i++){
          all_visit+=parseInt(cities_table[i][1]);
        }
       // alert(all_visit);
        t.push(['City name', 'Visits number']);
        var to=sort(cities_table);
        var min_percent=4;
        var rest=0;
        for(var i=0;i<cities_table.length;i++){
          if(parseInt(to[i][1])>(all_visit*min_percent/100))t.push([to[i][0],to[i][1]]);
          else rest+=parseInt(to[i][1]);
        }
        if(rest!=0)t.push(["other",rest]);
        var data = google.visualization.arrayToDataTable(t);

        var options = {
          title: 'cities',
          is3D: true,
        };

        var chart = new google.visualization.PieChart(document.getElementById('piechart'));

        chart.draw(data, options);
      }