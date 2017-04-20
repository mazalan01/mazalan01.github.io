var coordinates=[[]];


function make_map(){
  var c_size=0;
	for(var i=0;i<cities.length;i++){
    if(cities[i][1]){
      var c=[];
      c.push(cities[i][0]);
      c.push("");
      c.push("");
      if(c_size>coordinates.length-1)coordinates.push([]);
      coordinates[c_size]=c;
      get_coordinates(cities[i][0],c_size);
      c_size++;
    }
			
	}
  document.getElementById("load").hidden=false;
  load();

}

function get_percent(){
  var all=0;
  var ready=0;
  for(var i=0;i<coordinates.length;i++){
    all+=2;
    if(coordinates[i][1]!="")ready++;
    if(coordinates[i][2]!="")ready++;
    else{get_coordinates(coordinates[i][0],i)}
  }
  return 100*ready/all;
}

function load(){
  var delayMillis = 1000; //1 second
  var percent=get_percent();
  if(parseInt(document.getElementById("load_percent").innerHTML)!=100)
  {
    document.getElementById("load_percent").innerHTML=percent.toFixed(1).toString()+"%";
    setTimeout(function() {
        load();
    }, delayMillis);
  }
  else{
    //alert("hide");
    document.getElementById("load").hidden=true;
    //document.getElementById("tablet").hidden=false;
    document.getElementById("content").hidden=false;
    
    draw_table();
draw_gids();
    draw_map(coordinates);
  }
}


function get_coordinates(name,coor_place){ 
  //alert(name);
  var geocoder =  new google.maps.Geocoder();
  geocoder.geocode( { 'address': name}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      coordinates[coor_place][1] = results[0].geometry.location.lat();
      coordinates[coor_place][2] = results[0].geometry.location.lng();
    }
  });
}

function draw_map(locations){
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 3,
    center: new google.maps.LatLng(47.497, 19.040),
    mapTypeId: 'terrain'
  });

  var infowindow = new google.maps.InfoWindow();
  var marker, i;

  for (i = 0; i < locations.length; i++) {

      marker = new google.maps.Marker({ 
        position: new google.maps.LatLng(locations[i][1], locations[i][2]),
        map: map
      });

      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          infowindow.setContent(locations[i][0]);
          infowindow.open(map, marker);
        }
      })(marker, i));
  }
  var ci=[];
  for(var i=0;i<locations.length;i++)ci.push(locations[i][0]);
 // var travel_array=make_travel_array(); 
  var max=0;
  for(var i=0;i<journeies.length;i++)if(journeies[i][2]>max)max=journeies[i][2];

  for(var i = 1 ; i < journeies.length ; i++){
  //  if(can_show(travel_array[i])){
      //alert(travel_array[i][0].toString()+" "+travel_array[i][1].toString()+" "+travel_array[i][2].toString()+" "+travel_array[i][3].toString());
    // alert(locations[ci.indexOf(journeies[i][0])][1]);
      var flightPlanCoordinates = [
        {lat: locations[ci.indexOf(journeies[i][0])][1], lng: locations[ci.indexOf(journeies[i][0])][2]},
        {lat:  locations[ci.indexOf(journeies[i][1])][1], lng: locations[ci.indexOf(journeies[i][1])][2]}
      ];

      var flightPath = new google.maps.Polyline({
        path: flightPlanCoordinates,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight:(parseInt(journeies[i][2])*3/max+0.5)
      });

      flightPath.setMap(map);
   // }
  }
}