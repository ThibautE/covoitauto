import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';

//services
import { LoginService } from './user/login/login.service';
import { UserService } from './user/user.service';
import { TripService } from './trip/trip.service';

//modules
import { TripModule } from './trip/trip.module';
import { UserModule } from './user/user.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    RouterModule,
    TripModule,
    UserModule
  ],
  exports: [ //penser a exports les modules dans les features modules, (ceux qui seront utiliser par le module parent)
  ],
  providers: [ LoginService, UserService, TripService ],
  bootstrap: [ AppComponent ]
})


export class AppModule { }
