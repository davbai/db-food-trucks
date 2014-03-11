var FoodTruckDetail = Backbone.View.extend({

    initialize: function() {
        this.render();
    },

    render: function () {
        var variables = {
            name: this.model.get("applicant"),
            address: this.model.get("address"),
            fooditems: this.model.get("fooditems"),
            locationdescription: this.model.get("locationdescription")
        };

        // Simple template, would factor out to its own .html template if it got more
        // complicated or if the app required more templates. Hardcoding as a string
        // for ease. 
        var htmlTemplate =  "<h1><b><%= name %></b></h1>" +
                            "<div><b><%= address %></b></div>" +
                            "<div><i><%= locationdescription %></i>" +
                            "</div><div><%= fooditems %></div>";

        $(this.el).html(_.template(htmlTemplate, variables));

        // Clear out any previous data from before.
        $("#food-truck-detail").empty();

        // Append the new details in the detail area. 
        $("#food-truck-detail").append(this.el);
        
        return this;
    }
});