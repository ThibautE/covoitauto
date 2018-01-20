import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import 'rxjs/Rx';

import { AuthGuard } from '../guards/auth-guard';

import { TripService } from './trip.service';

import { TripsCreateComponent } from './trips-create/trips-create.component';
import { TripsDisplayComponent } from './trips-display/trips-display.component';
import { TripsSearchComponent } from './trips-search/trips-search.component';
import { TripsDetailsComponent } from './trips-details/trips-details.component';


const routes: Routes = [
  {
    path: 'create',
    component: TripsCreateComponent,
    outlet: 'trip'
    //canActivate: [AuthGuard]
  },
  {
    path: 'trips',
    component: TripsDisplayComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'trip/search/:cityD/:cityA/:date',
    component: TripsSearchComponent,
    outlet: 'trip'
  },
];

@NgModule({
  imports: [
    CommonModule, FormsModule, HttpClientModule, ReactiveFormsModule, RouterModule.forChild(routes)
  ],
  exports: [RouterModule, TripsCreateComponent, TripsDisplayComponent, TripsSearchComponent],
  declarations: [TripsCreateComponent, TripsDisplayComponent, TripsSearchComponent, TripsDetailsComponent],
  providers: [TripService, AuthGuard]
})

export class TripModule { }
