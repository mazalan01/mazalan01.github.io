

function get_country(x,y,p){
 var geocoder = new google.maps.Geocoder();
    geocoder.geocode({'latLng': {lat: x, lng: y}}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[0]) {

                    var loc = getCountry(results);
                    //alert(loc);
                    coordinates[p][3]=loc;
                }
            }
        });
    }
    function getCountry(results)
    {
        for (var i = 0; i < results[0].address_components.length; i++)
        {
        var shortname = results[0].address_components[i].short_name;
        var longname = results[0].address_components[i].long_name;
        var type = results[0].address_components[i].types;
        if (type.indexOf("country") != -1)
        {
          return longname;
            if (!isNullOrWhitespace(shortname))
            {
                return shortname;
            }
            else
            {
                return longname;
            }
        }
    }

}

function isNullOrWhitespace(text) {
    if (text == null) {
        return true;
    }
    return text.replace(/\s/gi, '').length < 1;
}