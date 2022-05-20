import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms'  
import { Tracking, orderInterface } from '../tracking';
import { ETrackingService } from '../e-tracking.service';
import { Observable } from 'rxjs';

import { AfterViewInit, ElementRef, Renderer2, ViewChild } from '@angular/core';


@Component({
	selector: 'app-input-fields',
  	templateUrl: './input-fields.component.html',
  	styleUrls: ['./input-fields.component.css']
})

export class InputFieldsComponent implements OnInit, AfterViewInit{
	
	trackingOrders?:orderInterface [];

	productForm: FormGroup;
   	
	@ViewChild('inputListingRef') inputListingRef?: ElementRef;

  	constructor(private fb:FormBuilder, private eTrackingService: ETrackingService, private renderer: Renderer2) {
    	this.productForm = this.fb.group({
        	fileds: this.fb.array([]) ,
    	});
  	}
	
	ngAfterViewInit(): void {
		// console.log(this.inputListingRef);
		// this.renderer.addClass(this.inputListingRef, "none");
		const orders = this.getSessionStorageItem("tracking_orders");
		if(orders !== null){

		}
	}
	
	ngOnInit(): void {
		const orders = this.getSessionStorageItem("tracking_orders");
		if(orders !== null){
			this.trackingOrders = JSON.parse(orders);
		}
	}

  	fileds() : FormArray {
    	return this.productForm.get("fileds") as FormArray
  	}
   
  	onSubmit() { 
    	this.eTrackingService.trackingOrders(this.productForm.value)
		.subscribe((resposne) => {
			this.trackingOrders = resposne;
			sessionStorage.setItem('tracking_orders', JSON.stringify(resposne));
		});
  	}

  	newInput(): FormGroup {
    	return this.fb.group({
			orderNumber: '',
    	})
  	}

  	addInputFiled(){
    	this.fileds().push(this.newInput());
  	}

  	removeInputFiled(i:number) {
    	this.fileds().removeAt(i);
  	}
	
	getSessionStorageItem(key:string){
		return sessionStorage.getItem(key);
	}
}

// export class orderInterface {
// 	constructor(
// 		public order_number: string,
// 		public store_name: string,
// 		public store_address: string,
// 		public pickup_deadline: string,
// 		public payment_type: string,
// 		public status: any
// 	){}
// }