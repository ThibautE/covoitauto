import { Component, OnInit } from '@angular/core';
import { TripService } from '../trip.service'; 
import { Params, ActivatedRoute } from '@angular/router';
import 'rxjs/Rx';


@Component({
  selector: 'app-trips-search',
  templateUrl: './trips-search.component.html',
  styleUrls: ['./trips-search.component.css']
})
export class TripsSearchComponent implements OnInit {

	private tripsParams : any[];
	private tripsFind : any[];
	private subscribe : any;

	constructor(private tripService : TripService, private route: ActivatedRoute) { }

	ngOnInit() {
		console.log('composant');

		let date : string;
		//date = this.tripsParams.date.getDate() + '-' + this.tripsParams.date.getMonth() + '-' + this.tripsParams.date.getFullYear();
		console.log("date :" + this.tripsParams.date);
		this.route.params.subscribe((params : Params) => {
			let paramsUrl = this.tripsParams.cityD + '/' + this.tripsParams.cityA + '/' + date;
			this.tripService.getTripByParams(paramsUrl).subscribe(res => this.tripsFind = res)
		});
	}

	empty(): boolean {
	 	return (this.tripsFind == undefined);
	}
}
