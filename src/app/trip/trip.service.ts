import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environments/environment';
import 'rxjs/Rx';

@Injectable()
export class TripService {

	constructor(private http : HttpClient) { }

	baseUrl = environment.apiUrl + ':' + environment.apiPort;
	

	create(model: any): Observable <any>{
		let tripUrl: string = this.baseUrl + '/trip/create';
		let body: any = model;
		const headers = new HttpHeaders({ 'Content-Type': 'application/json' });		
		return this.http.post(tripUrl, body, {headers});
	}
	
	getAllTrips(): Observable <any>{
		let tripUrl: string = this.baseUrl + '/trip/all';
		return this.http.get(tripUrl);
	}


	getTripDetails(tripID: any): Observable <any> {
		let tripUrl: string = this.baseUrl + '/trip/id/' + tripID;
		return this.http.get(tripUrl);
	}

	getTripByParams(searchParams): Observable <any> {
		
		let tripUrl: string = this.baseUrl + '/trip/search/' + searchParams.cityA + '/' + searchParams.cityD + '/' + searchParams.dateD;
		return this.http.get(tripUrl);
	}
}