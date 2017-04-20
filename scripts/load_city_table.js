      function draw_table(){
        google.charts.load('current', {'packages':['table','bar','corechart']});
        google.charts.setOnLoadCallback(drawTable);
      }


      function drawTable() {
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'City names');
        data.addColumn('number', 'Visits');
        data.paging=true;
      //  data.addColumn('boolean', 'Full Time Employee');
      //alert(cities_table);
       /* data.addRows([
          ['Mike'],
          ['Jim'],
          ['Alice'],
          ['Bob']
        ]);*/
        data.addRows(sort(cities_table));

        var table = new google.visualization.Table(document.getElementById('table_city_names'));

        table.draw(data, {showRowNumber: false, width: '100%', height: '100%'});

        google.visualization.events.addListener(table, 'select', selectHandler);
      }

      function selectHandler() {
        var selection = table.getSelection();
        var message = '';
        for (var i = 0; i < selection.length; i++) {
          var item = selection[i];
          if (item.row != null && item.column != null) {
            var str = data.getFormattedValue(item.row, item.column);
            message += '{row:' + item.row + ',column:' + item.column + '} = ' + str + '\n';
          } else if (item.row != null) {
            var str = data.getFormattedValue(item.row, 0);
            message += '{row:' + item.row + ', column:none}; value (col 0) = ' + str + '\n';
          } else if (item.column != null) {
            var str = data.getFormattedValue(0, item.column);
            message += '{row:none, column:' + item.column + '}; value (row 0) = ' + str + '\n';
          }
        }
        if (message == '') {
          message = 'nothing';
        }
        alert('You selected ' + message);
      }
      
      function sort(array){
        var opposite=[];
        for(var i=0;i<array.length;i++){
          var add=[to_string(array[i][1]),array[i][0]];
          opposite.push(add);
        }
        opposite.sort();
        var ret=[];
        for(var i=opposite.length-1;i>=0;i--){
          var add=[opposite[i][1],to_int(opposite[i][0])];
          ret.push(add);
        }
        return ret;
      }

      function to_string(vint){
        var ret="";
        for(var i=0;i<parseInt(vint);i++){
          ret+="a";
        }
        return ret;
      } 

      function to_int(vstring){
        return vstring.length;
      }