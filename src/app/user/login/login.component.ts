import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
    
	model: any = {}; // champs du formulaire
  	loading = false;
  	returnUrl: string; // si forcé de se logger pour une action, permet de revenir à la  bonne page
  	msgs: Message[] =  []; // messages de notification type "user successfully registered" / "wrong password"
  	

  	constructor( private route: ActivatedRoute, private router: Router, private user: UserService) { }

  	ngOnInit() {
	    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
	    this.msgs = [];
	    if (this.route.snapshot.queryParams['origin'] &&
      		this.route.snapshot.queryParams['origin'] === 'register') {
      		this.msgs.push({severity: 'success', summary: 'Compte créé', detail: 'Vous pouvez maintenant vous connecter'});
      		this.model.mail = this.route.snapshot.queryParams['mail'] || '';
    	}
  	}

  	login() {
    	this.loading = true;
 	   	this.user.login(this.model.mail, this.model.password).subscribe(res => {
        	this.loading = false;
        	if (res[0]) {
          		if (this.returnUrl === '/') {
            		this.returnUrl = '/dashboard';
          		}
          		this.router.navigate([this.returnUrl]);
        	}else{
          		this.msgs = [];
          		this.msgs.push({});
        	}
      	});
  	}
}