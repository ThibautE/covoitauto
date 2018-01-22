import { Component, OnInit } from '@angular/core';
import { TripService } from '../trip.service';
import {Params, ActivatedRoute} from '@angular/router'

@Component({
  selector: 'app-trips-display',
  templateUrl: './trips-display.component.html',
  styleUrls: ['./trips-display.component.css']
})

export class TripsDisplayComponent implements OnInit {

  protected trips : any = [];
  private subscribe : any;

  constructor(private tripService: TripService, private route : ActivatedRoute ) { }

  ngOnInit() {
    let date = new Date();
    this.route.params.subscribe((params : Params)  => {
      this.tripService.getAllTrips().subscribe((res => this.trips = res));
      console.log(this.trips);
    });
  }
}
