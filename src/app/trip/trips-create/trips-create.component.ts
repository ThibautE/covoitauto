import { Component, OnInit } from '@angular/core';
import { TripService } from '../trip.service'; 
import {Cookie} from 'ng2-cookies';
import { Params, ActivatedRoute } from '@angular/router';
import { empty } from 'rxjs/Observer';

@Component({
  selector: 'app-trips-create',
  templateUrl: './trips-create.component.html',
  styleUrls: ['./trips-create.component.css']
})

export class TripsCreateComponent implements OnInit {

	/*
	cityD : string;
	addressD : string;
	cityA : string;
	addressA : string;
	date : Date;
	car : string;
	nbPlaces : string;
	price : number;
	cpt : number = 0;
	*/

	newTrip : any = [];
	reponse : any;
	message : string;


	constructor(private tripService: TripService,) { }

	ngOnInit() {

		

		this.newTrip.places = 3;

		this.message = "";

	}

	onSubmit() {

		if(this.newTrip.date == undefined || this.newTrip.places == 0 || this.newTrip.places == undefined || this.newTrip.date < this.newTrip.date.today() ||
		   this.newTrip.cityD == undefined || this.newTrip.cityA == undefined || this.newTrip.price == undefined){
			this.message = "Un problème à eu lieu, veuillez remplir tous les champs obligatoires.";
		}
		else {
			this.newTrip.conducteur = Cookie.get('_id');
			this.tripService.create(this.newTrip).subscribe((res => {
				this.reponse = res;
				this.message = "Votre trajet à bien été enregistré !";
			}));
		}		
	}

}
