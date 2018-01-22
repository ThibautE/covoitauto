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


	private tripsParams : any = [];
	private tripsFind : any = [];
	private subscribe : any;

	constructor(private tripService : TripService, private route: ActivatedRoute) { }

	ngOnInit() {
		this.tripsParams = [];
		this.tripsFind = [];
	}

	onSubmit(){
		this.route.params.subscribe((params : Params) => {
			let paramsUrl = this.tripsParams.cityD + '/' + this.tripsParams.cityA + '/' + this.tripsParams.date;
			this.tripService.getTripByParams(paramsUrl).subscribe(res => this.tripsFind = res)
		});
	}

	empty(): boolean {
	 	return (this.tripsFind == undefined);
	}
}
