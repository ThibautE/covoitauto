import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//service
import { UserService } from '../user.service';

@Component({
    moduleId: module.id,
    templateUrl: 'register.component.html',
    styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

    model: any = {};
    loading = false;

    constructor(private route : Router, private user: UserService) { }

    ngOnInit() {

    }

    register() {
        this.loading = true;
        this.user.create(this.model).subscribe(data => {
            this.loading = false;
            this.route.navigate(['/login'], { queryParams: { origin: 'register', mail: this.model.mail }});
        },
        error => {
            this.loading = false;
        });
    }
}
