import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { MessageService } from './message.service';

import { Observable, of } from 'rxjs';

import { Tracking } from './tracking';

@Injectable({
	providedIn: 'root'
})

export class ETrackingService {
	
	private searchEndPoint = 'http://127.0.0.1:8000/api/search_order/';
	
	httpOptions = {
		headers: new HttpHeaders({ 
			'Content-Type': 'application/json',
		})
	};

	constructor(
		private http: HttpClient,
		private messageService: MessageService) { }

	/** Log a HeroService message with the MessageService */
	private log(message: string) {
		this.messageService.add(`etrackingService: ${message}`);
	}

	trackingOrders(formData: any){
		return this.http.post<any>(this.searchEndPoint, formData, this.httpOptions)
	}

	retrieveOrderDetail(orderNumber:string): Observable<any>{
		const data = sessionStorage.getItem("tracking_orders");
		if(data !== null){
			const order = JSON.parse(data).filter( (x:any) => x.order_number === orderNumber);
			return of(order);
		}
		return of();
	}
}