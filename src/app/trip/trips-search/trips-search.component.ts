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

	private trips : any[];
	private subscribe : any;

	constructor(private tripService : TripService, private route: ActivatedRoute) { }

	ngOnInit() {
		this.route.params.subscribe((params : Params) => {
			let paramsUrl = params['cityD'] + '/' + params['cityA'] + '/' + params['date'];
			this.tripService.getTripByParams(paramsUrl).subscribe(res => this.trips = res)
		});
	}

	empty(): boolean {
	 	return (this.trips == undefined);
	}
}
