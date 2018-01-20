let express = require ("express");
let cors = require ("cors");
let assert = require('assert');


let app = express();
app.use(cors());
app.use(express.json());

let mongoClient = require("mongodb").MongoClient;
let ObjectId = require("mongodb").ObjectId;
let url = "mongodb://localhost:27017/covoitauto";



app.all("/*", function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  console.log("Requete recue");
  next();
});


mongoClient.connect(url, function(err, database) {

	const db = database.db('covoitauto');

    if (err){
      throw err;
    } else{
        console.log("connected to " + url);
    }

	// ---- Requête pour les trips ----

	// creation de trips
	app.post('/create', function (req, res) {
		
			if(!req.body){
			  return res.sendStatus(400);
			}

			var newTrip = {
			  "depart" : {"ville" : req.body.cityD, "adresse" : req.body.addressD},
			  "arrivee" : {"ville" : req.body.cityA, "adresse" : req.body.addressA},
			  "date" : req.body.date,
			  "prix" : parseFloat(req.body.price),
			  "nbPlaces" : req.body.places,
			  "conducteur" : req.body.conducteur,
			  "passagers" : []
		};

		db.collection("trips").insertOne(newTrip, function(err, trips) {
			if(err || trips == undefined) {
				var json = JSON.stringify([]);
				res.setHeader("Content-type","application/json; charset = UTF-8");
				res.end(json);	
			}
			else{
				var json = JSON.stringify(trips);
				res.setHeader("Content-type","application/json; charset = UTF-8");
				res.end(json);
			}
		});
	});
	
	// chercher tous les trips
	app.get("/trip/all",function(req,res){
		db.collection("trips").find().toArray(function(err, trip){
			if(err || trips == undefined){
				var json = JSON.stringify([]);
				res.setHeader("Content-type","application/json; charset = UTF-8");
				res.end(json);	
			}
			else {
				var json = JSON.stringify(trips);
				res.setHeader("Content-type","application/json; charset = UTF-8");
				res.end(json);
			}
		});
	});

	//chercher les trips d'après une ville départ, une ville arrivé et une date
	app.get("/trip/search/:cityD/:cityA/:date", function(req,res){
				console.log('server');
		db.collection("trips").find(
			{
				'depart.ville' : {$regex : new RegExp("^" + req.params.cityD.toLowerCase(), "i")},
				'arrive.ville' : {$regex : new RegExp("^" + req.params.cityA.toLowerCase() + 'i')},
				'date' : {$d : req.params.date }   
			}).toArray(function(err, trips) {
				if(err || trips == undefined){
					var json = JSON.stringify([]);
					res.setHeader("Content-type","application/json; charset = UTF-8");
					res.end(json);					
				}
				else{
					var json = JSON.stringify(trips);
					res.setHeader("Content-type","application/json; charset = UTF-8");
					res.end(json);	
				}
			});
		}
	);

	// chercher les trips par ville Départ et ville D'arrivée
	app.get("/search/:cityD/:cityA",function(req,res){
		db.collection("trips").find(
			{
				'depart.ville' : {$regex : new RegExp("^" + req.params.cityD.toLowerCase(), "i")},
				'arrive.ville' : {$regex : new RegExp("^" + req.params.cityA.toLowerCase() + 'i')},  
			}).toArray(function(err, trips) {
				if(err || trips == undefined){
					var json = JSON.stringify([]);
					res.setHeader("Content-type","application/json; charset = UTF-8");
					res.end(json);					
				}
				else{
					var json = JSON.stringify(trips);
					res.setHeader("Content-type","application/json; charset = UTF-8");
					res.end(json);	
				}
			});
		}
	);

	//Requêtes pour users 
	app.get("/user/login/:mail/:password",function(req,res){
		var user = database.collection('users').find({'mail':req.params.mail, 'password':req.params.password});
    	
    	user.toArray(function(err,documents){

      		if(documents && documents[0] && documents[0].password){
        		delete documents[0].password; 
      		}

      		console.log(documents);
      		var json=JSON.stringify(documents);
	  		res.setHeader("Access-Control-Allow-Origin", "*");
	  		res.setHeader("Content-type","application/json");
	 		res.end(json);

    	});
	});


	// inscriptions user 
	app.get("/user/create", function(req, res) {
		
		if(!req.body){
			return res.sendStatus(400);
		  }

		  var newUser = {
			"prenom" : req.body.firstname,
			"nom" : req.body.lastname,
			"mail" : req.body.email,
			"password" : req.body.password,
			"age" : parseInt(req.body.age),
			"voiture" : req.body.car,
			"telephone" : req.body.phone
	  };

	  db.collection("users").insertOne(newUser, function(err, user) {
		  if(err || user == undefined) {
			  var json = JSON.stringify([]);
			  res.setHeader("Content-type","application/json; charset = UTF-8");
			  res.end(json);	
		  }
		  else{
			  var json = JSON.stringify(user);
			  res.setHeader("Content-type","application/json; charset = UTF-8");
			  res.end(json);
		  }
	  });
	})

	//delete user
	app.delete("/user/:mail/",function(req,res){
    	database.collection("users").remove({'mail':req.params.mail});
  	});

	app.get("/user/create/:mail/:nom/:prenom/:telephone/:age/:numero/:rue/:ville/:pays/:mdp",function(req,res){
		    var myUser = {
		      mail :req.params.mail,
		      nom :req.params.nom,
		      prenom :req.params.prenom,
		      telephone : req.params.telephone,
		      age : req.params.age,
		      adresse: {
		        numero : req.params.numero,
		        nom : req.params.rue,
		        ville : req.params.ville,
		        pays : req.params.pays
		      },
		      password :req.params.mdp
		    };
		    res.setHeader("Content-type","text/plain; charset=UTF-8");
		    db.collection("users").insertOne(myUser,function(err,doc){
		    	if(err) throw err;
		    	res.end(JSON.stringify(doc));
		    });
	});

});

app.listen(8888);