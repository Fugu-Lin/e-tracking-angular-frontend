import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ETrackingService } from '../e-tracking.service';
import { orderInterface } from '../tracking';

@Component({
  selector: 'app-detail-form',
  templateUrl: './detail-form.component.html',
  styleUrls: ['./detail-form.component.css']
})

export class DetailFormComponent implements OnInit {

  @Input() order?: orderInterface;

  constructor(private route: ActivatedRoute,
              private location: Location,
              private eTrackingService: ETrackingService
  ) { }

  ngOnInit(): void {
    this.getOrderDetail();
  }
  
  getOrderDetail(): void {
    const order_number = String(this.route.snapshot.paramMap.get('order_number'));
    this.eTrackingService.retrieveOrderDetail(order_number).subscribe(order => this.order = order[0]);
  }

  goBack(): void {
    this.location.back();
  }
  
}
