import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{ 
		path: 'trip', 
		loadChildren: './trip/trip.module#TripModule'
	},
	{ 
		path: 'user', 
		loadChildren: './user/user.module#UserModule' 
	},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
