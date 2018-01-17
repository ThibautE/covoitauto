import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { AppComponent } from './app.component';
import { AuthentificationService, UserService } from './services/index';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';

//composants
import { TripsSearchComponent } from './trip/trips-search/trips-search.component';
import { TripsCreateComponent } from './trip/trips-create/trips-create.component';
import { TripsDisplayComponent } from './trip/trips-display/trips-display.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { AdminPanelComponent } from './user/admin-panel/admin-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    TripsDisplayComponent,
    LoginComponent,
    RegisterComponent,
    TripsSearchComponent,
    TripsCreateComponent,
    AdminPanelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule
  ],
  exports: [ //penser a exports les modules dans les features modules, (ceux qui seront utiliser par le module parent)
  ],
  providers: [AuthentificationService, UserService],
  bootstrap: [AppComponent]
})


export class AppModule { }
