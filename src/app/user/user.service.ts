import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable} from 'rxjs/Observable';
import { environment } from '../../environments/environment';

@Injectable()
export class UserService {
    
    constructor(private http: HttpClient) { }

    baseUrl = environment.apiUrl + ':' + environment.serverPort;

    create(model: any): Observable <any> {
        const url: string = this.baseUrl + '/user/create';
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        return this.http.post(url, model, {headers});
    }

    getByMail(id: string): Observable <any> {
        return this.http.get(this.baseUrl + '/user/profile/' + id);
    }

    getAllUsers(): Observable <any>{
        let userUrl: string = this.baseUrl + '/users';
        console.log(userUrl);
        return this.http.get(userUrl);
    }

    update(model: Object): Observable<any> {
        const url: string = this.baseUrl + '/user/update';
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        return this.http.post(url, model, {headers});
  }

    delete(mail : string): Observable<any> {
        return this.http.get(this.baseUrl + '/user/delete/' + mail);
    }
}