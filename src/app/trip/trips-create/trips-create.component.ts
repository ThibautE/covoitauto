import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trips-create',
  templateUrl: './trips-create.component.html',
  styleUrls: ['./trips-create.component.css']
})

export class TripsCreateComponent implements OnInit {

	villeD : string;
	adresseD : string;
	villeA : string;
	adresseA : string;
	dateT : Date;
	voiture : string;
	nbPlace : string;
	prix : number;
	cpt : number = 0;

	constructor() { }

	ngOnInit() {

	}

	createTrip(){
  		//push dans la bdd
  	}

}
