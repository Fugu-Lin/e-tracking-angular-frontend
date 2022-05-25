import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms'  
import { orderInterface } from '../tracking';
import { ETrackingService } from '../e-tracking.service';

import { ElementRef, Renderer2, ViewChild } from '@angular/core';


@Component({
	selector: 'app-input-fields',
  	templateUrl: './input-fields.component.html',
  	styleUrls: ['./input-fields.component.css']
})

export class InputFieldsComponent implements OnInit{
	
	trackingOrders?:orderInterface [];

	productForm: FormGroup;
   	
	@ViewChild('inputListingRef', { static: true }) inputListingRef!: ElementRef;

	@ViewChild('searchComponetRef', { static: true }) searchComponetRef!: ElementRef;

  	constructor(private fb:FormBuilder, private eTrackingService: ETrackingService, private renderer: Renderer2) {
    	this.productForm = this.fb.group({
        	fileds: this.fb.array([]) ,
    	});
  	}
	
	ngOnInit(): void {
		const orders = this.getSessionStorageItem("tracking_orders");
		if(orders !== null){
			this.trackingOrders = JSON.parse(orders);
			this.renderer.addClass(this.inputListingRef?.nativeElement, "none");
			this.renderer.removeClass(this.searchComponetRef?.nativeElement, "none");
			return;
		}
		this.fileds().push(this.newInput());
	}

  	fileds() : FormArray {
    	return this.productForm.get("fileds") as FormArray
  	}
   
  	onSubmit() {
		let errorMsg    = [];
		const formValue = this.productForm.value;
		Object.values<any>(formValue).forEach(val => {
			val.forEach((va: any) =>{
				if(va.orderNumber == ""){
					errorMsg.push("1");
				}
			})
		});

		if(errorMsg.length > 0){
			alert("請輸入貨運編號");
		}else{
			this.eTrackingService.trackingOrders(this.productForm.value)
			.subscribe((resposne) => {
				this.trackingOrders = resposne;
				sessionStorage.setItem('tracking_orders', JSON.stringify(resposne));
				this.renderer.addClass(this.inputListingRef?.nativeElement, "none");
				this.renderer.removeClass(this.searchComponetRef?.nativeElement, "none");
			});
		}
  	}

  	newInput(): FormGroup {
    	return this.fb.group({
			orderNumber: [''],
    	})
  	}

  	addInputFiled(){
    	this.fileds().push(this.newInput());
  	}

  	removeInputFiled(i:number) {
    	this.fileds().removeAt(i);
  	}

	clearFormArray = (formArray: FormArray) => {
		formArray.clear();
	}
	
	getSessionStorageItem(key:string){
		return sessionStorage.getItem(key);
	}

	backToInput(){
		this.clearFormArray(this.fileds());
		sessionStorage.removeItem("tracking_orders");
		this.fileds().push(this.newInput());
		this.renderer.removeClass(this.inputListingRef?.nativeElement, "none");
		this.renderer.addClass(this.searchComponetRef?.nativeElement , "none");
	}
}