import {EventEmitter, Injectable, isDevMode, Output} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { environment } from '../../../environments/environment';


@Injectable()
export class LoginService {
    
    baseUrl = environment.apiUrl + ':' + environment.apiPort;
    
    @Output() change: EventEmitter<null> = new EventEmitter();

    subject: Subject<Observable<any>> = new Subject(); //générateur d'evenements pour AuthComponent
    
    constructor(private http: HttpClient) {}

    public login(mail: string, password: string): Observable <any> {
        var obs: Observable<any> = this.http.get<any>(this.baseUrl + '/membres/authenticate/' + mail + '/' + password);
        this.subject.next(obs); 
        return  obs;
    }
}
