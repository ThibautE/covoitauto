import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TripsSearchComponent } from './trip/trips-search/trips-search.component';
import { TripsCreateComponent } from './trip/trips-create/trips-create.component';
import { TripsDisplayComponent } from './trip/trips-display/trips-display.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { AdminPanelComponent } from './user/admin-panel/admin-panel.component';


const routes: Routes = [
	{ 
		path: 'login', 
		component: LoginComponent 
	},
	{ 
		path: 'register', 
		component: RegisterComponent 
	},
	{ 
		path: 'create', 
		component: TripsCreateComponent,
		outlet: 'trip'
	},
	{
		path: 'panel',
		component: AdminPanelComponent
	}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
