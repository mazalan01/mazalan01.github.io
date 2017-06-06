var data_city_loaction=[];

//  data_city_loaction.push(["",,,""]);

data_make_array();

function data_make_array(){
	data_city_loaction.push(["budapest",47.497912,19.04023499999994,"Magyarország"]);
	data_city_loaction.push(["london",51.5073509,-0.12775829999998223,"Egyesült Királyság"]);
	data_city_loaction.push(["stockholm",59.32932349999999,18.068580800000063,"Svédország"]);
	data_city_loaction.push(["helsinki",60.16985569999999,24.93837899999994,"Finnország"]);
	data_city_loaction.push(["san francisco",37.7749295,-122.41941550000001,"Egyesült Államok"]);
	data_city_loaction.push(["amsterdam",52.3702157,4.895167899999933,"Hollandia"]);
	data_city_loaction.push(["washington dc",38.9071923,-77.03687070000001,"Egyesült Államok"]);
	data_city_loaction.push(["new york",40.7127837,-74.00594130000002,"Egyesült Államok"]);
	data_city_loaction.push(["vancouver",49.2827291,-123.12073750000002,"Kanada"]);
	data_city_loaction.push(["toronto",43.653226,-79.38318429999998,"Kanada"]);
	data_city_loaction.push(["minneapolis",44.977753,-93.26501080000003,"Egyesült Államok"]);
	data_city_loaction.push(["frankfurt",50.1109221,8.682126700000026,"Németország"]);
	data_city_loaction.push(["dortmund",51.5135872,7.465298100000041,"Németország"]);
	data_city_loaction.push(["berlin",52.52000659999999,13.404953999999975,"Németország"]);
	data_city_loaction.push(["munich",48.1351253,11.581980599999952,"Németország"]);
	data_city_loaction.push(["madrid",40.4167754,-3.7037901999999576,"Spanyolország"]);
	data_city_loaction.push(["oslo",59.9138688,10.752245399999993,"Norvégia"]);
	data_city_loaction.push(["paris",48.856614,2.3522219000000177,"Franciaország"]);
	data_city_loaction.push(["stavanger",58.9699756,5.733107300000029,"Norvégia"]);
	data_city_loaction.push(["aberdeen",57.149717,-2.094278000000031,"Egyesült Királyság"]);
	data_city_loaction.push(["warsaw",52.2296756,21.012228700000037,"Lengyelország"]);
	data_city_loaction.push(["dubai",25.2048493,55.270782800000006,"Egyesült Arab Emírségek"]);
	data_city_loaction.push(["sydney",-33.8688197,151.20929550000005,"Ausztrália"]);
	data_city_loaction.push(["tel aviv",32.0852999,34.78176759999997,"Izrael"]);
	data_city_loaction.push(["atlanta",33.7489954,-84.3879824,"Egyesült Államok"]);
	data_city_loaction.push(["tallahassee",30.4382559,-84.28073289999998,"Egyesült Államok"]);
	data_city_loaction.push(["chicago",41.8781136,-87.62979819999998,"Egyesült Államok"]);
	data_city_loaction.push(["prague",50.0755381,14.43780049999998,"Csehország"]);
	data_city_loaction.push(["rome",41.9027835,12.496365500000024,"Olaszország"]);
	data_city_loaction.push(["bonn",50.73743,7.098206800000071,"Németország"]);
	data_city_loaction.push(["copenhagen",55.6760968,12.568337100000008,"Dánia"]);
	data_city_loaction.push(["melbourne",-37.8136276,144.96305759999996,"Ausztrália"]);
	data_city_loaction.push(["singapore",1.352083,103.81983600000001,"Szingapúr"]);
}

function data_is_city(name) {
	name=name.toLowerCase();
	var bent=false;
	for(var i=0;i<data_city_loaction.length;i++){
		if(data_city_loaction[i][0]==name)bent=true;
		//alert(data_city_loaction[i][0]);
	}
	//if(bent)alert(name);
	//alert(name);
	return bent;
}

function data_get_lat(name){
	name=name.toLowerCase();
	for(var i=0;i<data_city_loaction.length;i++){
		if(data_city_loaction[i][0]==name)return data_city_loaction[i][1];
	}
	return 0;
}

function data_get_lng(name){
	name=name.toLowerCase();
	for(var i=0;i<data_city_loaction.length;i++){
		if(data_city_loaction[i][0]==name)return data_city_loaction[i][2];
	}
	return 0;
}

function data_get_country(name){
	name=name.toLowerCase();
	for(var i=0;i<data_city_loaction.length;i++){
		if(data_city_loaction[i][0]==name)return data_city_loaction[i][3];
	}
	return 0;
}