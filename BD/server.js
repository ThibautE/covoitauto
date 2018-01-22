let express = require ("express");
let cors = require ("cors");
let assert = require('assert');
let bodyParser = require('body-parser');


let app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

let mongoClient = require("mongodb").MongoClient;
let ObjectId = require("mongodb").ObjectId;
let url = "mongodb://localhost:27016/covoitauto";



app.all("/*", function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  console.log("Requete recue");
  next();
});


// connexion à la base
mongoClient.connect(url, function(err, database) {

	const db = database.db('covoitauto');

    if (err){
      throw err;
    } else{
		console.log(db);
        console.log("connected to " + url);
    }

	// fonctions express (node)

	// -- Trips --

	// creation de trips
	app.post("/trip/create", function (req, res) {
		
			if(!req.body){
			  return res.sendStatus(400);
			}
			console.log(req.body);
			let newTrip = {
			  "depart" : {"ville" : req.body.cityD, "adresse" : req.body.addressD},
			  "arrive" : {"ville" : req.body.cityA, "adresse" : req.body.addressA},
			  "date" : req.body.date,
			  "prix" : parseFloat(req.body.price),
			  "nbPlaces" : req.body.places,
			  "conducteur" : req.body.conducteur,
			  "passagers" : []
		};
		createTrip(db, {"message" : "/trips", "filterObject" : newTrip}, function(step,results){
			res.setHeader("Content-type","application/json; charset = UTF-8");
			let json = JSON.stringify(results);
			console.log(json);
			res.send(step);
			res.end(json);
		});
	});
	
	// chercher tous les trips
	app.get("/trips",function(req,res){
		getTrips(db,{"message" : "/trips"},function(step,results){
			res.setHeader("Content-type","application/json; charset = UTF-8");
			let json = JSON.stringify(results);
			console.log("\n" + json);
			res.end(json);
		});
	});

	//chercher trip avec ville depart, arrivée et date
	app.get("/trip/search/:cityD/:cityA/:date",function(req,res){
		let filterObject = {'depart.ville' : null,'arrive.ville' : null, 'date' : null};
		if(req.params.cityD != "*"){ filterObject['depart.ville'] = req.params.cityD;}
		if(req.params.cityA != "*"){ filterObject['arrive.ville'] = req.params.cityA;}
		if(req.params.date != "*"){ filterObject['date'] = req.params.date;}
		getTripByParams(db,{"message" : "/trips","filterObject": filterObject},function(step,results){
			res.setHeader("Content-type","application/json; charset = UTF-8");
			let json = JSON.stringify(results);
			console.log(json);
			res.end(json);
		});
	});

	app.get("/trip/deleteAll",function(req,res){
		deleteTrip(db,{"message" : "/trip/deleteAll"},function(step,results){
			res.setHeader("Content-type","application/json; charset = UTF-8");
			let json = JSON.stringify(results);
			res.end(json);
		});
	});

	// chercher les trips par ville départ et ville arrivée
	app.get("/trip/search/:cityD/:cityA",function(req,res){
		let filterObject = {'depart.ville' : null,'arrive.ville' : null};
		if(req.params.cityD != "*"){filterObject['depart.ville'] = req.params.cityD;}
		if(req.params.cityA != "*"){filterObject['arrive.ville'] = req.params.cityA;}

		getTripByParams(db,{"message" : "/trips","filterObject": filterObject},function(step,results){
			res.setHeader("Content-type","application/json; charset = UTF-8");
			let json = JSON.stringify(results);
			res.end(json);
		});
	});

	// 		-- Users -- 

	//Afficher tous les utilisateurs 
	app.get("/users",function(req,res){
		getUsers(db,{"message" : "/users"},function(step,results){
			res.setHeader("Content-type","application/json; charset = UTF-8");
			let json = JSON.stringify(results);
			res.end(json);
		});
	});

	//Connexion
	app.get("/user/login/:mail/:password",function(req,res){

		let user = {'mail' : req.params.mail, 'password' : req.params.password};

		getUserByParams(db,{"message" : "/users", "filterObject" : user}, function(step, results){
			res.setHeader("Content-type","application/json; charset = UTF-8");
			let json = JSON.stringify(results);
			console.log(json);
			res.end(json);
		});
	});

	// inscriptions user 
	app.post("/user/create", function(req, res) {
		
		if(!req.body){
			return res.sendStatus(400);
		  }

		  let newUser = {
			"prenom" : req.body.firstname,
			"nom" : req.body.lastname,
			"mail" : req.body.email,
			"password" : req.body.password,
			"age" : parseInt(req.body.age),
			"voiture" : req.body.car,
			"telephone" : req.body.phone
	  };

	  createUser(db, {"message" : "/users", "filterObject" : newUser}, function(step, results){
			res.setHeader("Content-type","application/json; charset = UTF-8");
			let json = JSON.stringify(results);
			console.log(json);
			res.send(step);
			res.end(json);
	  });
	});

	//delete user
	app.delete("/user/:mail/",function(req,res){
		deleteUser(db,{"message" : "/users", "filterObject" : req.body.mail}, function(step, results){
			res.setHeader("Content-type","application/json; charset = UTF-8");
			let json = JSON.stringify(results);
			console.log(json);
			res.end(json);
		});
  	});
});

//  		----- requêtes mongo -----

	// -- Trips --
function getTrips(db, param, callback){
	db.collection("trips").find().toArray(function(err,doc){
		if (err)
			callback(err,[]);
		else if (doc !== undefined) 
			callback(param["message"],doc);
		else
			callback(param["message"],[]);
	});
}

function getTripByParams(db,param,callback){
	db.collection("trips").find(param["filterObject"]).toArray(function(err,doc){
		if (err)
			callback(err,[]);
		else if (doc !== undefined) 
			callback(param["message"],doc);
		else
			callback(param["message"],[]);
	});
}

function createTrip(db, param, callback){
	db.collection("trips").insertOne(param["filterObject"], function(err, doc) {
		if(err) {
			console.log(param);	
			callback('echec', []);
		}
		else {
			console.log(param);
			callback('succes', doc);
		}
	});
}

function deleteTrip(db, param, callback){
	db.collection("trips").remove().toArray(function(err, doc){
		if(err)
			callback(err, []);	
		else if (doc !== undefined)
			callback(param["message"], doc);
		else
			callback(param["message"], []);
	});
}

	// -- Users --
function getUsers(db, param, callback){
	db.collection("users").find().toArray(function(err,doc){
		if (err)
			callback(err,[]);
		else if (doc !== undefined) 
			callback(param["message"],doc);
		else
			callback(param["message"],[]);
	});
}


function createUser(db, param, callback){
	db.collection("users").insertOne(param["filterObject"] ,function(err, doc) {
		if(err){ 
			callback('echec', []);
			console.log(doc);
		}
		else {
			callback('succes', doc);
			console.log(doc);
		}
	});
}


function deleteUser(db, param, callback){
	db.collection("users").remove(param["filterObject"]).toArray(function(err, doc){
		if(err)
			callback(err, []);	
		else if (document !== undefined)
			callback(param["message"], doc);
		else
			callback(param["message"], []);
	});
}

function getUserByParams(db,param,callback){
	db.collection("users").find(param["filterObject"]).toArray(function(err,doc){
		if (err)
			callback(err,[]);
		else if (doc !== undefined) 
			callback(param["message"],doc);
		else
			callback(param["message"],[]);
	});
}

app.listen(8888);