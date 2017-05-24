      function draw_gids(){
        //google.charts.load('current', {'packages':['bar']});
        var c=[];
        for(var i=0;i<coordinates.length;i++){
          c.push(coordinates[i][0]);
        }
        for(var i=1;i<journey_grid.length;i++){
          if(typeof journey_grid[i]!="undefined"){
            if(journey_grid[i].length>2 && typeof journey_grid[i][2]=="string" && journey_grid[i][2]!=""){
              for(var j=0;j<date_array.length;j++){
                if(date_array[j][0]==journey_grid[i][2].substring(0, 4)){
                  var from=journey_grid[i][0];
                  var to=journey_grid[i][1];
                  date_array[j][2]+=parseInt(getDistanceFromLatLonInKm(coordinates[c.indexOf(from)][1],coordinates[c.indexOf(from)][2],coordinates[c.indexOf(to)][1],coordinates[c.indexOf(to)][2])/100)/10;
                }
              }
            }
          }
        }
        google.charts.setOnLoadCallback(drawStuff);
        google.charts.setOnLoadCallback(drawChart);
        google.charts.setOnLoadCallback(drawRegionsMap);
        set_h();
      }

      function min(a,b){
        if(a>b)return b;
        return a;
      }

      function drawStuff() {
        var data = new google.visualization.arrayToDataTable(date_array);
        var options = {
          width: parseInt(document.getElementById("dTb").clientWidth),
          legend: { position: 'none' }, 
          axes: {
            x: {
              0: { side: 'top', label: 'Timeline'} // Top x-axis.
            }
          },
          bar: { groupWidth: "100%" }
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

      function country_array(){
        var c=[];
        var n=[];
        var ci=[];
        for(var i=0;i<coordinates.length;i++){
          ci.push(coordinates[i][0]);
        }
        for(var i=0;i<cities_table.length;i++){
          var x=ci.indexOf(cities_table[i][0]);
         // alert(coordinates[x][1]);
         // var country=get_country(coordinates[x][1],coordinates[x][2]);
         var country=coordinates[ci.indexOf(cities_table[i][0])][3];
         // if(country!="")alert(country);
          var place=c.indexOf(country);
          if(place==-1){
            c.push(country);
            n.push(parseInt(cities_table[i][1]));
          }
          else{
            n[place]+=parseInt(cities_table[i][1]);
          }
        }
       // alert("k");
        var t=[];
        t.push(["Country","Importance"]);
        for(var i=0;i<c.length;i++){

          t.push([c[i],Math.log(parseInt(n[i]))]);
        }
        return t;
      }


function drawRegionsMap() {

        var data = google.visualization.arrayToDataTable(country_array());

        var options = {
          colorAxis: {colors: ['#00853f', '#e31b23']},
          backgroundColor: '#ffffff',
          datalessRegionColor: '#999999',
          defaultColor: '#f5f5f5',};

        var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

        chart.draw(data, options);
      }