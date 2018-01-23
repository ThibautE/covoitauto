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
  private name: string = '';

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
    Cookie.set('isAdmin', (user.role.indexOf('administrateur') >= 0 ) ? 'true' : 'false');

    this.loadUser();
  }

  logout(){
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
    this.name = this.firstName + ' ' + this.lastName; // prenom + nom
    this.admin = Cookie.get('isAdmin') == 'true';
    this.isLogged = true;
  }
}