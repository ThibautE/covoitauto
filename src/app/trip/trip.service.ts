import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class TripService {

	constructor(private http : Http) { }

	getTrajets(param: string):Observable <any>{
		let url: string = 'http://localhost:8888/trip/' + param;
		return this.http.get(url);
	}


}