var FoodTrucks = Backbone.Collection.extend({
    
    url: "/foodtrucks",

    initialize: function() {
        this.fetch();
    }
    
});