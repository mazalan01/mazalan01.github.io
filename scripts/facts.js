var volt_fill=false;
    function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    //    alert("b");
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
 //alert("c");
  return d;
}

function animateValue(id, start, end, duration) {
    var range = end - start;
    var current = start;
    var increment = /*(end > start? 1 : -1)*/(end-start)/duration;
    var stepTime = /*Math.abs(Math.floor(duration / range))*/1;
    var obj = document.getElementById(id);
    var timer = setInterval(function() {
        current += increment;
        obj.innerHTML = Math.floor(current);
        if (current > end) {
          obj.innerHTML=end;
            clearInterval(timer);
        }
    }, stepTime);
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}

function fill(journeies){
  var datas=[0,0,0,0,0];
  var ci=[];
  for(var i=0;i<coordinates.length;i++)ci.push(coordinates[i][0]);
  datas[3]=ci.length;
  var journey_amount=0;
  var all_km=0;
  var longest=0;

  for(var i=0;i<journeies.length;i++){
    journey_amount+=journeies[i][2];
    var c1=[coordinates[ci.indexOf(journeies[i][0])][1],coordinates[ci.indexOf(journeies[i][0])][2]];
    var c2=[coordinates[ci.indexOf(journeies[i][1])][1],coordinates[ci.indexOf(journeies[i][1])][2]];
    var km=getDistanceFromLatLonInKm(c1[0],c1[1],c2[0],c2[1]);
    all_km+=km*journeies[i][2];
    if(km>longest)longest=km;
  }
  datas[2]=Math.round(all_km/80)/10;
  datas[4]=Math.round(longest*10)/10;
  datas[1]=Math.round(all_km);
  datas[0]=journey_amount;
  set_data(0);
  var delayMillis = 1000; //1 second
  setTimeout(function() {
    animateValue("tb10", 0, datas[0], 300);
  }, delayMillis);
  setTimeout(function() {
    animateValue("tb11", 0, datas[1], 300);
  }, delayMillis);
  setTimeout(function() {
    animateValue("tb12", 0, datas[2], 300);
  }, delayMillis);
  setTimeout(function() {
    animateValue("tb13", 0, datas[3], 300);
  }, delayMillis);
  setTimeout(function() {
    animateValue("tb14", 0, datas[4], 300);
  }, delayMillis);
  /*document.getElementById("tb10").innerHTML=datas[0].toString();
  document.getElementById("tb11").innerHTML=datas[1].toString();
  document.getElementById("tb12").innerHTML=datas[2].toString();
  document.getElementById("tb13").innerHTML=datas[3].toString();
  document.getElementById("tb14").innerHTML=datas[4].toString();*/
}

function set_datas(datas){
  var d = new Date();
  var n = d.getTime();
  var delta=3000;
  while(n+delta>d.getTime()){
    d = new Date();
    for(var i=0;i<5;i++){
      document.getElementById("tb1"+i.toString()).innerHTML=Math.round(datas[i]/delta*(d.getTime()+1-n)).toString();
    }
  }
  for(var i=0;i<5;i++){
      document.getElementById("tb1"+i.toString()).innerHTML=(datas[i]).toString();
    }
    set_data(0);
}

function set_data(n){
  var delayMillis = 150; //1 second
    setTimeout(function() {
        if(n<40){
          for(var i=0;i<5;i++){
      document.getElementById("tb1"+i.toString()).innerHTML=Math.round(datas[i]/40*(n+1)).toString();
            }
          set_data(n+1);}
        else {for(var i=0;i<5;i++){
      document.getElementById("tb1"+i.toString()).innerHTML=(datas[i]).toString();
    }}
    }, delayMillis);
}