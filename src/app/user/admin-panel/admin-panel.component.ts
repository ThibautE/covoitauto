import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service'; 
import { Params, ActivatedRoute } from '@angular/router';
import 'rxjs/Rx';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

    protected users : any = [];

  	constructor(private userService : UserService, private route: ActivatedRoute) { }

  	ngOnInit() {
        this.userService.getAllUsers().subscribe((res => this.users = res));
    }

  	deleteUser(mail : string){
      this.userService.delete(mail);
  	}


}


