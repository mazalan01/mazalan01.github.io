var cities=[];
var cities_table=[];
var journeies=[];

window.onload = function() {
  var fileInput = document.getElementById('upload-file');

  fileInput.addEventListener('change',function(e) {
  var file = fileInput.files[0];
  var textType = /text.*/;
  var reader = new FileReader();

  reader.onload = function(e) {
    var data = reader.result;
    data = data.replace(/(?:\r\n|\r|\n)/g ,'|');
    split_data(data);
    //alert(data);
  }

  reader.readAsText(file);    
  });
}

function split_data(data){
  var t=data.split("|");
  var journey=[[]];
  for(var i=0;i<t.length;i++){
    if(t[i][0]!=';'){
    journey.push(t[i].split(";"));
    }
  }
  var c=[];
  for(var i=0;i<journey.length;i++){
    if((typeof journey[i][0]=="string" && journey[i][0]!="") && c.indexOf(journey[i][0])==-1)c.push(journey[i][0]);
    if((typeof journey[i][1]=="string" && journey[i][1]!="") && c.indexOf(journey[i][1])==-1 )c.push(journey[i][1]);
  }
  for(var i=0;i<c.length;i++){
    cities.push([c[i],true]);
  }
  for(var i=0;i<c.length;i++){
    var amount=0;
    for(var j=0;j<journey.length;j++){
      if(journey[j][0]==c[i] || journey[j][1]==c[i])amount++;
    }
    cities_table.push([c[i],amount]);
  }
  var ju=[];
  var db=[];
  for(var i=0;i<journey.length;i++){
    if(typeof journey[i][0]=="string" && journey[i][0]!="" && typeof journey[i][1]=="string" && journey[i][1]!=""){
      var v=-1;
      for(var j=0;j<ju.length;j++){
        if((ju[j][0]==journey[i][0] && ju[j][1]==journey[i][1])||(ju[j][0]==journey[i][1] && ju[j][1]==journey[i][0]))v=j;
      }
      if(v==-1){
        ju.push([journey[i][0],journey[i][1]]);
        db.push(1);
      }
      else{
        db[v]++;
      }
    }
  }
  for(var i=0;i<ju.length;i++){
    journeies.push([ju[i][0],ju[i][1],db[i]]);
  }
  make_map();
}