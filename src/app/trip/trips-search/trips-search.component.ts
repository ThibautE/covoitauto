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

	private tripsFind : any[];
	private tripsParams : any = {};

	constructor(private tripService : TripService, private route: ActivatedRoute) { }

	ngOnInit() {
		console.log('composant');
		if(this.date = "undefined"){
			this.date = "01-01-2018";
		}

		let date1 : string;
		console.log('date : ' + this.date)
		this.route.params.subscribe((params : Params) => {
			let paramsUrl = this.cityD + '/' + this.cityA + '/' + this.date;
			this.tripsParams = {};
			this.tripsFind = {};
		}
	}

	onSubmit(){
		let date : string;
		console.log("date :" + this.tripsParams.date);

		this.route.params.subscribe((params : Params) => {
		let paramsUrl = this.tripsParams.cityD + '/' + this.tripsParams.cityA + '/' + this.tripsParams.date;
		this.tripService.getTripByParams(paramsUrl).subscribe(res => this.tripsFind = res)
		});
	}

	empty(): boolean {
	 	return (this.tripsFind == undefined);
	}
}
