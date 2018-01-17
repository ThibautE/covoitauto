import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Response } from '@angular/http';
import { Http } from '@angular/http';

@Injectable()
export class UserService {
    constructor(private http: Http) { }

    getAll() {
        return this.http.get('/users').map((response: Response) => response.json());
    }

    getById(id: string) {
        return this.http.get('/users/' + id).map((response: Response) => response.json());
    }

    create(user: any){
        let url: string = 'http://localhost:8888/user/create/'+user.mail + '/' + user.nom + '/' + user.prenom + '/' + user.adresse.numero + '/' + user.adresse.nom + '/' + user.adresse.ville + '/' + user.adresse.pays+ '/' + user.tel+ '/' + user.age + '/' + user.motdepasse;
        return this.http.get(url);
    }

    update(user: any) {
        return this.http.put('/users/' + user.id, user);
    }

    delete(id: string) {
        return this.http.delete('/users/' + id);
    }
}
