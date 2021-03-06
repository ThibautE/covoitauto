import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Cookie} from 'ng2-cookies';

//service
import { UserService } from '../user.service';

@Component({
    moduleId: module.id,
    templateUrl: 'register.component.html',
    styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

    newUser: any = {};
    message: string;
    reponse: boolean;

    constructor(private userService: UserService) { }

    ngOnInit() {
        this.newUser = {};
        this.reponse = false;
    }

    onSubmit() {
        
        if(this.newUser.firstname == undefined || this.newUser.lastname == undefined || this.newUser.password == undefined || this.newUser.age < 18 || this.newUser.email == undefined){
            this.message = "Un problème à eu lieu, veuillez remplir tous les champs obligatoires.";
            this.reponse = false;
        }
        else {
            this.newUser.conducteur = Cookie.get('_id');
            this.userService.create(this.newUser).subscribe((res => {
                this.reponse = true;
                this.message = "Votre inscription a bien été enregistré !";
            }));
        }		
    }
}
