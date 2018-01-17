import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Cookie } from 'ng2-cookies';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  	model: Object = {};
  	loading = true;

  	constructor(private user: UserService) { }

  	ngOnInit() {
	    this.user.getByID(Cookie.get('_id')).subscribe(res => {
	      	if (res && res[0] !== undefined) {
	        	res = res[0];
	      	}else{
	        	return;
	      	}
	      	this.model = res;
	      	this.loading = false;
	    });
  	}

  	submit() {
    	this.loading = true;
    	this.user.update(this.model).subscribe(res => {
      		this.loading = false;
    	});
  	}

}

	