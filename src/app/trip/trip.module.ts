import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripsCreateComponent } from './trips-create/trips-create.component';
import { TripsDisplayComponent } from './trips-display/trips-display.component';
import { TripsSearchComponent } from './trips-search/trips-search.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [TripsCreateComponent, TripsDisplayComponent, TripsSearchComponent]
})
export class TripModule { }
