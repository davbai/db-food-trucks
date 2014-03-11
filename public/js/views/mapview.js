var MapView = Backbone.View.extend({

    initialize: function(options) {
        this.options = options || {};
        this.render();
    },

    render: function() {

        // Default lat/long is coordinates for SF, otherwise use the lat/long coordinates
        // that are passed in to the view. 
        var latitude = this.options.latitude ? this.options.latitude : 37.7833;
        var longitude = this.options.longitude ? this.options.longitude : -122.4167;

        // Default zoom is 13, allows to view all of SF. Otherwise use the passed in zoom value
        // to focus in on a specific SF neighborhood. 
        var zoom = this.options.zoom ? this.options.zoom : 13;

        // Create new map. 
        var map = new google.maps.Map(document.getElementById("map-canvas"), {
            zoom: zoom,
            draggable: true,
            center: new google.maps.LatLng(latitude, longitude)
        });

        // For each food truck, create a marker on the map. 
        this.collection.bind("add", function(model) {
            var position = new google.maps.LatLng(model.get("latitude"), model.get("longitude"));
            var marker = new google.maps.Marker({
                position: position,
                map: map,
                title: model.get("applicant"),
                description: model.get("locationdescription")
            });

            // For each map marker, listen to a click event, and display more details about
            // the food truck if clicked. 
            google.maps.event.addListener(marker, "click", function() {
                var detailView = new FoodTruckDetail({
                    model: model
                });
            });
        });
    }
});