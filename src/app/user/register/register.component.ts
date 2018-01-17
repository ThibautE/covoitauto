import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'register.component.html',
    styleUrls: ['./register.component.css']
})

export class RegisterComponent {

    private mail : string;
    private nom : string;
    private prenom : string;
    private age : number;
    private motdepasse : string;
    private tel : string;
    private rue : string;
    private ville : string;
    private pays : string;
    private voiture : string;
    private rep : string;
    private msg : string;

    constructor(public user: UserService) { }

    onSubmit() {
        var user = {
            mail :this.mail,
            nom :this.nom,
            prenom :this.prenom,
            adresse: {
                tel : this.tel,
                nom : this.rue,
                ville : this.ville,
                pays : this.pays
            },
            tel : this.tel,
            voiture : this.voiture,
            age : this.age,
            password :this.motdepasse
        };
    
        if(this.mail == undefined || this.nom == undefined || this.prenom == undefined || this.voiture || this.tel==null || this.rue == undefined || this.ville == undefined || this.pays ==undefined || this.motdepasse==undefined || this.age == null){
            this.msg = "ERREUR! Vous n'avez pas été enregistré, vérifiez que vous avez bien rempli les champs"
        }else{
            this.user.create(user).subscribe((res:any)=>{
                this.rep=res;
                this.msg = "Félicitation! Vous êtes enregistré"
          });
        }
    }
}
