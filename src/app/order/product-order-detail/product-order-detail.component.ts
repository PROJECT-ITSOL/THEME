import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { error } from '@angular/compiler/src/util';
import { HttpParams } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { from } from 'rxjs';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { ProductOrderService } from './../../service/productOrder.service';
import { ProductOrderDetailService } from "./../../service/productOrderDetail.service";
import { ActivatedRoute } from '@angular/router';

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
  keyword: string = 'keyword';
  // search() { }
  totalOrder: string = 'total';
  // private urlOrder = '/api/orderDetail';

  listOrderDetail: OderDetail[];
  listProduct: Product[];
  dataOrderDetail: Array<any>;
  dataProduct: Array<any>;
  orderDetail:OderDetail=new OderDetail();
  nameProduct: string;
  Product;
  idProduct;
  price;
  nameSupplier: string;
  Tong: number = 0;
  //
  page: number = 0;
  pages: Array<number>;

  //
  totalOrderDetail: number;

  constructor(
    private route: ActivatedRoute,
    private productOrderDetailService: ProductOrderDetailService,
    private productOrderService: ProductOrderService,
    private productService: ProductOrderService,


  ) { }

  ngOnInit(): void {
    this.GanidOrder = this.route.snapshot.paramMap.get('id');
    
    this.viewOrderDetail();

    //this.getToTal();
  }
  // bien 
  GanidOrder: string;
  idDelete: number;
  nameDelete: string;
  getDelete(item) {
   
    this.idDelete = item['idOrderDetail'];
    console.log(this.idDelete);
  }

  // getMessage() {
  //   this.productOrderService.currentMessage.subscribe(message => {
  //     this.GanidOrder = message;
  //   });
  // }
  // khai bao  Oder



  viewOrderDetail() {
    this.Tong=0;
    // this.listOrderDetail = new Array();
    this.productOrderDetailService.getByIdProductOrderdetail(this.GanidOrder).subscribe(res => {
      this.dataOrderDetail = new Array();
      this.dataOrderDetail=res['data'];
      this.listOrderDetail=[];
      this.totalOrderDetail=0;
      this.dataOrderDetail.forEach(data=>{
        let entity=new OderDetail();
        entity.idOrderDetail=data['idOrderDetail']
        entity.idOrder=data['idOrder']
        entity.amount=data['amount']
        entity.idProduct=data['productOrderDetail']['idProduct']
        entity.nameProduct=data['productOrderDetail']['name']
        entity.price=data['productOrderDetail']['price']
        this.Tong+=entity.price * entity.amount;
        // console.log(entity);
        this.listOrderDetail.push(entity);
        // console.log(data);
      })
      this.totalOrderDetail=this.listOrderDetail.length;
    });
  }

  delete() {
    this.productOrderDetailService.delete(this.idDelete).subscribe(res => {
      console.log(res);
      alert(res['message']);
      this.viewOrderDetail();
    });

  }
  // ham tinh tong don hang
  // getToTal(){
  //   this.totalOrderDetail=0;
  //   this.listOrderDetail.forEach((oderDetail)=>{
  //         this.totalOrderDetail=this.totalOrderDetail+oderDetail.price*oderDetail.amount;
  //   });
  // getOrderDetail(){
  //   this.ProductOrderService.OderDetail(this.idProduct).subscribe(res=>{
  //       this.or
  //   });
  // }

  // getItem(orderDetail: OderDetail) {
  //   this.orderDetail = orderDetail;
  //   console.log(orderDetail);
  //   this.idDelete = orderDetail['id'];
  //   this.nameDelete = orderDetail['nameProduct'];

  // }
  // getTong(){
  //   this.productOrderDetailService.getByIdProductOrderdetail(this.idProduct).subscribe(res=>{
  //     this.o
  //   })
  // }

  deleteOderDetail() {
    
    this.productOrderDetailService.delete(this.idDelete).subscribe(res => {
      // console.log(res);
      this.viewOrderDetail();
      //alert(res['message']);
    })
    // this.productOrderDetailService.delete(this.idDelete).subscribe(res =>{
    //   console.log(res);   
    //   alert(res['message']);
    //   this.viewOrderDetail();
    // })
  }

  setProduct(item) {
    this.orderDetail=item;
    console.log(this.orderDetail);
  }

  // ham edit trong modal
  addProduct(form: NgForm) {

    console.log(form);
    console.log('Your form data : ', form.value);
    let newOrderDetail = new OderDetail;
    newOrderDetail.amount = form.value.amount;
   // newOrderDetail.price = form.value.price;
    newOrderDetail.idProduct = this.idProduct;
    // newOrderDetail.Order = this.orderDetail;
    console.log(newOrderDetail);
    this.productOrderDetailService.addOrderDetail(newOrderDetail).subscribe(res => {
      console.log(res);
      alert(res['message']);
      this.viewOrderDetail();
    });
    this.viewOrderDetail();
  }


}
