var AppRouter = Backbone.Router.extend({

    routes: {     
        "neighborhoods/:id" : "map" // Fires map function when a specific neighborhood is selected.
    },

    initialize: function() {
        var foodTrucks = new FoodTrucks();

        // Create the default map view with the center of the map being SF and
        // loads all the food trucks onto the map. 
        this.map = new MapView({
            collection: foodTrucks
        });

        // Create the list of neighborhoods in order to explore the map based
        // on various predetermined SF neighborhoods. 
        var neighborhoods = new Neighborhoods();
        neighborhoods.fetch({
            success: function(){
                $("#neighborhood-list").html(new NeighborhoodListView({model: neighborhoods}).el);
            }
        });
    },

    map: function (id) {
        var that = this;
        var neighborhood = new Neighborhood({_id: id});
        neighborhood.fetch({
            success: function(model) {
                var foodTrucks = new FoodTrucks();

                // Create a new map view with the center being the coordinates
                // of a SF neighborhood and also increase zoom to focus in. 
                this.map = new MapView({
                    collection: foodTrucks,
                    latitude: model.get("latitude"),
                    longitude: model.get("longitude"),
                    zoom: 15
                });
            }
        });

    }

});

// Create a new app router.  
app = new AppRouter();

// Allows user to navigate back and forth between selected neighborhoods. 
Backbone.history.start();
