import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { error } from '@angular/compiler/src/util';
import { HttpParams } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { from } from 'rxjs';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { ProductOrderService } from './../../service/productOrder.service';
import { ProductOrderDetailService  } from "./../../service/productOrderDetail.service";

import { Product } from './../../ultis/product';
import { Order } from './../../ultis/order';
import { OderDetail } from './../../ultis/orderDetail';
import { OrderComponent } from '../order.component';
@Component({
  selector: 'app-product-order-detail',
  templateUrl: './product-order-detail.component.html',
  styleUrls: ['./product-order-detail.component.scss']
})
export class ProductOrderDetailComponent implements OnInit {
  // @ViewChild(OrderComponent)
  // myOrder: OrderComponent;
  // OneOrder() {
  //   console.log(this.myOrder)
  //   }
 // @Input() fatherName: string;
 keyword: string='keyword';
 search(){}
 totalOrder: string='total';
 // private urlOrder = '/api/orderDetail';

  listOrderDetail: OderDetail[];
  listProduct: Product[];
  dataOrderDetail: Array<any>;
  //
  page: number = 0;
  pages: Array<number>;
  
  //
  totalOrderDetail: number;

  constructor(
    private productOrderDetailService: ProductOrderDetailService ,
    private productOrderService: ProductOrderService,
    private productService: ProductOrderService

  ) { }

  ngOnInit(): void {
    this.getMessage();
   this.viewOrderDetail;
  }
  // bien 
  GanidOrder: string="chua gan duoc id";
  getMessage(){
    this.productOrderService.currentMessage.subscribe(message =>{
      this.GanidOrder = message;
      console.log(this.GanidOrder);
    } );
  }
  // khai bao  Oder
 


  viewOrderDetail() {
    this.listOrderDetail = new Array();
    this.productOrderDetailService.getByIdProductOrderdetail(this.GanidOrder).subscribe(res => {
      this.dataOrderDetail = res;
      console.log(res);
      this.dataOrderDetail.forEach((ordertail) => {
        
        let orderDetailEntity = new OderDetail();
        orderDetailEntity.idOrderDetail = ordertail['idOrderDetail'];
        orderDetailEntity.idOrder = ordertail['idOrder'];
        orderDetailEntity.idProduct = ordertail['idProduct'];
        orderDetailEntity.amount = ordertail['amount'];
        orderDetailEntity.product.price = ordertail['product']['price'];
        orderDetailEntity.product.name = ordertail['product']['name'];
        
        this.listOrderDetail.push(orderDetailEntity);
        
      });
      console.log(this.listOrderDetail);
      this.pages = new Array(res['totalPages']);
      this.totalOrderDetail = (res['totalElements']);
    });


  }

}
