var mongodb		= require("mongodb");

var MongoClient = mongodb.MongoClient,
    Server 		= mongodb.Server,
    BSON 		= mongodb.BSONPure,
    fs 			= require("fs"),
    http		= require("http"),
    db;

var dburl = process.env.MONGOHQ_URL || "mongodb://localhost:27017/database";

// Attributes to be returned when fetching foodtrucks.
var ftReturnAttributes = {
	facilitytype: 1,
	locationdescription: 1,
	address: 1,
	applicant: 1,
	fooditems: 1,
	longitude: 1,
	latitude: 1,
	objectid: 1
};

MongoClient.connect(dburl, function(err, database) {
	db = database;
    db.collection("foodtrucks", {strict:true}, function(err, collection) {
        if (err) {
        	// Populrate the foodtrucks collection if its not already created. 
            populateFoodTruckDB();
        }
    });
    db.collection("neighborhoods", {strict:true}, function(err, collection) {
        if (err) {
        	// Populrate the neighborhoods collection if its not already created. 
            populateNeighborhoodDB();
        }
    });
});

// Returns all foodtrucks in the database. 
exports.findAllFoodTrucks = function(req, res) {
	db.collection("foodtrucks", function(err, collection) {
		collection.find({}, ftReturnAttributes).toArray(function(err, items) {
			res.send(items);
		});
	});
};

// Returns all neighborhoods in the database. 
exports.findAllNeighborhoods = function(req, res) {
	db.collection("neighborhoods", function(err, collection) {
		collection.find().toArray(function(err, items) {
			res.send(items);
		});
	});
};

// Returns one neighborhood with the specified id. 
exports.findNeighborhoodById = function(req, res) {
	var id = req.params.id;
	db.collection("neighborhoods", function(err, collection) {
        collection.findOne({"_id": new BSON.ObjectID(id)}, function(err, item) {
            res.send(item);
        });
    });
};


// Populate database with data from SF Data. This is a one time operation, typically wouldn't
// be done like this in a production environment. This is only called if the foodtruck collection
// does not already exist.
var populateFoodTruckDB = function() {
	var url = "http://data.sfgov.org/resource/rqzj-sfat.json";
	var data = "";

	var req = http.get(url, function(res) {
		res.on("data", function(chunk) {
			data += chunk;
		});
		res.on("end", function() {
			data = JSON.parse(data);
			db.collection("foodtrucks", function(err, collection) {
				collection.insert(data, function(err, result) {
					console.log("Failed to insert foodtruck data: " + err.message);
				});
			});
		});
	});

	req.on("error", function(err) {
		console.log("Received error when reading SF DATA: " + err.message);
	});
} 

// Hard coded neighborhoods in SF. Not an exhaustive list but enough for demostration purposes. The 
// neighborhoods choosen were more or less random, just some of the more major ones. 
var populateNeighborhoodDB = function() {
	var neighborhoods = [
		{
			name: "Union Square",
			longitude: -122.4075,
			latitude: 37.788056
		},
		{
			name: "Russian Hill",
			longitude: -122.4198,
			latitude: 37.8018
		},
		{
			name: "Nob Hill",
			longitude: -122.414480,
			latitude: 37.793230
		},
		{
			name: "Chinatown",
			longitude: -122.407222,
			latitude: 37.794722
		},
		{
			name: "Sunset District",
			longitude: -122.49,
			latitude: 37.75
		},
		{
			name: "Richmond District",
			longitude: -122.482778,
			latitude: 37.777778
		},
		{
			name: "Financial District",
			longitude: -122.4029,
			latitude: 37.7952
		},
		{
			name: "Mission District",
			longitude: -122.41482,
			latitude: 37.76001
		},
		{
			name: "Soma (South of Market)",
			longitude: -122.411111,
			latitude: 37.777222
		},
		{
			name: "North Beach",
			longitude: -122.410183,
			latitude: 37.800289
		},
		{
			name: "Marina District",
			longitude: -122.436,
			latitude: 37.803
		},
		{
			name: "Pacific Heights",
			longitude: -122.4356,
			latitude: 37.7917
		},
		{
			name: "Bayview",
			longitude: -122.38873,
			latitude: 37.72687
		},
		{
			name: "Potrero Hill",
			longitude: -122.39986,
			latitude: 37.75716
		},
		{
			name: "Tenderloin",
			longitude: -122.416667,
			latitude: 37.783333
		},
		{
			name: "Western Addition",
			longitude: -122.428315,
			latitude: 37.782472
		}
	];

	db.collection("neighborhoods", function(err, collection) {
        collection.insert(neighborhoods, {safe:true}, function(err, result) {});
    });
}
