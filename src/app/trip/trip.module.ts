import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';
import {AuthGuard} from '../guards/auth-guard';
import {TripService} from 'trip.service';
import { TripsCreateComponent } from './trips-create/trips-create.component';
import { TripsDisplayComponent } from './trips-display/trips-display.component';
import { TripsSearchComponent } from './trips-search/trips-search.component';



const routes: Routes = [
  {
    path: 'trip-proposal',
    component: TripsCreateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'reservations',
    component: TripsDisplayComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'trip-details/:tripID',
    component: TripsSearchComponent
  }
];

@NgModule({
  imports: [
    CommonModule, RouterModule.forChild(routes)
  ],
  exports: [RouterModule, TripsCreateComponent, TripsDisplayComponent, TripsSearchComponent],
  declarations: [TripsCreateComponent, TripsDisplayComponent, TripsSearchComponent],
  providers: [TripService, AuthGuard]
})
export class TripModule { }
