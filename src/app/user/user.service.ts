import {Injectable, isDevMode} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Headers} from '@angular/http';
import { environment } from '../../environments/environment';

@Injectable()
export class UserService {
    
    constructor(private http: HttpClient) { }

    baseUrl = environment.apiUrl + ':' + environment.apiPort;

    create(model: any): Observable <any> {
        const url: string = this.baseUrl + '/membres';
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post(url, model, headers);
    }

    getByID(id: string): Observable <any> {
        return this.http.get(this.baseUrl + '/membres/id/' + id);
    }

    update(model: Object): Observable<any> {
        const url: string = this.baseUrl + '/membres/update';
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post(url, model, headers);
  }
}
