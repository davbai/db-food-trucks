# Food Trucks
Demo web application/exercise that shows the food trucks in San Francisco. You can see it live @ [ub-food-trucks.herokuapp.com](http://ub-food-trucks.herokuapp.com/). 

## Tools
This was built with the following:

1. [Backbone.js](http://documentcloud.github.com/backbone/) - JS library
2. [Node.js](http://nodejs.org/) - Application Server
3. [Express.js](http://expressjs.com/) - Node.js Web Framework
4. [Bootstrap](http://twitter.github.com/bootstrap/) - CSS Styling
5. [MongoDB](http://www.mongodb.org/) - Database
6. [San Francisco Data](https://data.sfgov.org/Permitting/Mobile-Food-Facility-Permit/rqzj-sfat) - Data Source
7. [Google Maps API](https://developers.google.com/maps/) - Visual Display

## Front-end
Front end is all written in HTML/CSS/JS (Backbone). There are three main components, the map, neighborhood list, and detail panel where details for the food truck will appear when clicked.

By default the rendering of the map shows all of San Francisco, but upon clicking one of the neighborhoods, the map rerenders (might be possible to not rerender and just reposition?) and zooms in on a particular SF neighborhood.

When retrieving information from the server, the app utilizes three end points:

1. `GET /neighborhoods` - to build the list of neighborhoods
2. `GET /neighborhoods/:id` - retrieves information (latitude/longitude coordinates) to refocus the map
3. `GET /foodtrucks` - fetches all the food trucks to render on the map

Each food truck is represented by a Google Maps marker. When clicked, the details panel shows more information about that specific food truck. Information is pretty basic, taken from [data.sfgov.org](https://data.sfgov.org/Permitting/Mobile-Food-Facility-Permit/rqzj-sfat).

## Back-end
The back-end is built on MongoDB. The two collections are `foodtrucks` and `neighborhoods`. 

The data for food trucks is created from the database from SF Data. Upon launching the app for the first time and connecting to the database, if the `foodtruck` collection is not yet created, it does a one time data generation, retrieves all the information from the site and inserts the data.

The data for the neighborhoods behaviors the same way but for simplicity sake, all of them are hardcoded (not retrieved from a third party source) and inserted into the database. 



