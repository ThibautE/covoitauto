let express = require ("express");
let cors = require ("cors");
let assert = require('assert');


let app = express();
app.use(cors());
app.use(express.json());

let mongoClient = require("mongodb").MongoClient;
let ObjectId = require("mongodb").ObjectId;
let url = "mongodb://localhost:27016/covoitauto";


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
	app.get("/trips",function(req,res){
		getTrips(db,{"message" : "/trips"},function(step,results){
			console.log("\n" + step + "avec" + results.length + "trajets selectionnés : ");
			res.setHeader("Content-type","application/json; charset = UTF-8");
			let json = JSON.stringify(results);
			console.log(json);
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

	// chercher les trips par ville départ et ville arrivée
	app.get("/trip/search/:cityD/:cityA",function(req,res){
		let filterObject = {'depart.ville' : null,'arrive.ville' : null};
		if(req.params.cityD != "*"){filterObject['depart.ville'] = req.params.cityD;}
		if(req.params.cityA != "*"){filterObject['arrive.ville'] = req.params.cityA;}

		getTripByParams(db,{"message" : "/trips","filterObject": filterObject},function(step,results){
			res.setHeader("Content-type","application/json; charset = UTF-8");
			let json = JSON.stringify(results);
			console.log(json);
			res.end(json);
		});
	});

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

function getTrips(db, param, callback){
	db.collection("trips").find().toArray(function(err,documents){
		if (err)
			callback(err,[]);
		else if (documents !== undefined) 
			callback(param["message"],documents);
		else
			callback(param["message"],[]);
	});
}

function getTripByParams(db,param,callback){
	db.collection("trips").find(param["filterObject"]).toArray(function(err,documents){
		if (err)
			callback(err,[]);
		else if (documents !== undefined) 
			callback(param["message"],documents);
		else
			callback(param["message"],[]);
	});
}

app.listen(8888);