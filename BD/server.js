let express = require ("express");
let cors = require ("cors");
let assert = require('assert');


let app = express();
app.use(cors());
app.use(express.json());

let mongoClient = require("mongodb").MongoClient;
let ObjectId = require("mongodb").ObjectId;
let url = "mongodb://localhost:8888/covoitauto";

mongoClient.connect(url, function(err, db) {
	assert.equal(null,err);
	console.log("Connecté à la base de données covoitauto");

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
	app.get("/all",function(req,res){
		db.collection("trips").find().toArray(function(err, trips){
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
	app.get("/search/:cityD/:cityA/:date", function(req,res){
		db.collection("trips").find(
			{
				'depart.ville' : {$regex : new RegExp("^" + req.params.cityD.toLowerCase(), "i")},
				'arrive.ville' : {$regex : new RegExp("^" + req.params.cityA.toLowerCase() + 'i')},
				'date' : {$d : req.params.date}   
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
	app.get("/trips/:cityD/:cityA",function(req,res){
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

	app.get("/trips/:prix",function(req,res){
		let filterObject = {};
		if(req.params.prix != "*"){filterObject.prix = parseInt(req.params.prix);}

		trajetPrix(db,{"message" : "/trips","filterObject": filterObject},function(step,results){
			console.log("\n" + step + "avec" + results.length + "trajets selectionnés : ");
			res.setHeader("Content-type","application/json; charset = UTF-8");
			let json = JSON.stringify(results);
			console.log(json);
			res.end(json);
		});
	});

	//Requêtes pour users 
	app.get("/auth/login=:login/mdp=:mdp",function(req,res){
		console.log ("Authentification");
		let login  = req.params.login;
		let mdp = req.params.mdp;
		console.log("Login : " + login + "  -  pass : "+mdp);
		res.setHeader("Content-type","text/plain; charset=UTF-8");
		db.collection("users").find({"email":login, "mdp":mdp}).toArray (function(err,doc){
			console.log(doc)

			res.end(JSON.stringify(doc));

			
		});
	});

	app.get("/user/create/:mail/:nom/:prenom/:telephone/:age/:numero/:rue/:ville/:pays/:mdp",function(req,res){
		    var myUser = {
		      mail :req.params.email,
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

	db.close();
});

app.listen(8888);