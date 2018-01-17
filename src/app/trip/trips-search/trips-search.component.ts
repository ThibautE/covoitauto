import { Component, OnInit } from '@angular/core';
//import { TripService } from '../../services/trip.service'; //créer tripService pour réccupérer dans la bdd
import { Params, ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-trips-search',
  templateUrl: './trips-search.component.html',
  styleUrls: ['./trips-search.component.css']
})
export class TripsSearchComponent implements OnInit {

	private villeD : string;
	private villeA : string;
	private dateT : Date;
	private cpt : number = 0;

	private correspondTrips : Object[] = [];

	private subscribe : any;

	//à retirer (sauf la première ligne) une fois la bdd fonctionnelle
	private trips: Object[] = [
    {"startCity":"Montpellier", "endCity":"Avignon", "date":"12/25/2017", "place":"0"},
    {"startCity":"Montpellier", "endCity":"Paris", "date":"01/01/2018", "place":"2"},
    {"startCity":"Nice", "endCity":"Lyon", "date":"12/20/2017", "place":"2"},
    {"startCity":"Nice", "endCity":"Lyon", "date":"10/20/2017", "place":"1"}
  ];


	constructor(/*private tripService : TripService, */private route: ActivatedRoute) { }

	ngOnInit() {

	}

	searchTrips(){
  		for(var i = 0; i< this.trips.length; i++){
			if(this.trips[i]['startCity'] === this.villeA && this.trips[i]['endCity'] === this.villeD && this.trips[i]['date'] === this.dateT && this.trips[i]['place']>0){
				this.correspondTrips[i] = '{"startCity":' +'"this.villeA", "endCity":' +'"this.villeD", "date":' + '"this.dateT", "place":' + '"this.trips[i][place]"}';
				this.cpt++;
			}
		}
  	}
}
