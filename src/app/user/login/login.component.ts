import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
    
	private username : string;
	private mdp : string;
	private isLoggedIn : boolean = false;

	onSubmit(){
		//
		this.isLoggedIn = true;
	}

	logout(){
		this.isLoggedIn = false;
	}

}