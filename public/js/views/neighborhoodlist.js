var NeighborhoodListView = Backbone.View.extend({

    className: "list-group",

    initialize: function () {
        this.render();
    },

    render: function () {
        var neighborhoods = this.model;

        // Creating the list of neighborhoods on the right panel. 
        for (var i = 0; i < neighborhoods.length; i++) {
            $(this.el).append(new NeighborhoodListItemView({model: neighborhoods.at(i)}).el);
        }
        
        return this;
    }
});

var NeighborhoodListItemView = Backbone.View.extend({

    tagName: "a",
    className: "list-group-item",

    attributes: function () {
        return {
            // Href for when you click on a specific neighborhood. 
            href: "#neighborhoods/" + this.model.get("_id")
        }
    },

    initialize: function () {
        this.render();
    },

    render: function () {
        $(this.el).append(this.model.get("name"));
        return this;
    }

});
