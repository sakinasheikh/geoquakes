var weekly_quakes_endpoint = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson"

$.get(weekly_quakes_endpoint, function(response) {

    var mapOptions = {
      center: { lat: -34.397, lng: 150.644},
      zoom: 1
    };

    var map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);

    // UNDERSCORE: pre-compile info row template
    var info_row_html = $("#tmpl-info-row").html();
    var compiledInfoRow = _.template(info_row_html)

    // LOOP OVER EARTHQUAKES
    response.features.forEach(function(quake){

        var title = quake.properties.title;
        var hours_ago = Math.round( ( Date.now() - quake.properties.time ) / (1000*60*60) );

        // ADD QUAKE MARKER TO MAP
        var lat = quake.geometry.coordinates[1];
        var lng = quake.geometry.coordinates[0];
        new google.maps.Marker({
            position: new google.maps.LatLng(lat, lng),
            map: map,
            title: title
        });

        // ADD QUAKE INFO TO COLUMN
        var info_row_html = compiledInfoRow({title: title, hours_ago: hours_ago})
        $("#info").append( info_row_html );
    });

});
