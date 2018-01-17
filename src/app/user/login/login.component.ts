import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { Observable } from 'rxjs/Observable';
import { Router } from "@angular/router";
import { Cookie } from 'ng2-cookies';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit{

  isLogged: boolean = false;
  private displayedName: string = '';

  private firstName: string = '';
  private lastName: string = '';
  private admin = false;

  constructor(private loginService: LoginService, private route: Router) {}

  ngOnInit() {
    this.loginService.subject.subscribe(obs => {
      obs.subscribe(res => {
        console.log('Requête D\'auth recue');
        this.checkLogin(res);
      });
    });
    if( Cookie.check('mail') && !this.isLogged){
      this.loadUser();
    }
  }

  checkLogin(user: any){

    if (user){
      user = user[0];
    }else {
      return;
    }

    Cookie.set('_id', user._id);
    Cookie.set('mail', user.mail);
    Cookie.set('firstName', user.prenom);
    Cookie.set('lastName', user.nom);
    Cookie.set('isAdmin', (user.role.indexOf('admin') >= 0 ) ? 'true' : 'false');

    this.loadUser();
  }

  logout(){
    // console.log('Logging out -->[]');
    Cookie.deleteAll();
    this.isLogged = false;
    this.route.navigate(['/']);
  }

  isAdmin(){
    return this.admin;
  }

  private loadUser() {
    this.firstName = Cookie.get('firstName');
    this.lastName = Cookie.get('lastName');
    this.displayedName = this.firstName + ' ' + this.lastName[0]; // prenom + initiale nom
    this.admin = Cookie.get('isAdmin') == 'true';

    this.isLogged = true;
  }
}