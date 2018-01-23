import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Cookie } from 'ng2-cookies';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  	profile: any = [];

  	constructor(private user: UserService) { }

  	ngOnInit() {
  		this.profile = [];
	    this.user.getByMail(Cookie.get('mail')).subscribe(res => {
	      	if (res && res[0] !== undefined) {
	        	res = res[0];
	      	}else{
	        	return;
	      	}
	      	this.profile = res;
	    });
  	}

  	submit(){}

}

	