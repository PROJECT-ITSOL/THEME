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
  dataProduct: Array<any>;
  orderDetail;
  nameProduct:string;
  Product;
  idProduct;
  price;
  nameSupplier:string;
  Tong:number=0;
  //
  page: number = 0;
  pages: Array<number>;
  
  //
  totalOrderDetail: number;

  constructor(
    private productOrderDetailService: ProductOrderDetailService ,
    private productOrderService: ProductOrderService,
    private productService: ProductOrderService,

  ) { }

  ngOnInit(): void {
    this.getMessage();
   this.viewOrderDetail();
   
   //this.getToTal();
  }
  // bien 
  GanidOrder: string="chua gan duoc id";
  idDelete: string;
  nameDelete: string;
  getDelete(item){
    this.idDelete=item;
  }

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
      this.totalOrderDetail=0;
      this.dataOrderDetail.forEach((ordertail) => {
        
        let orderDetailEntity = new OderDetail();
        orderDetailEntity.idOrderDetail = ordertail['idOrderDetail'];
        orderDetailEntity.idOrder = ordertail['idOrder'];
        orderDetailEntity.idProduct = ordertail['idProduct'];
        orderDetailEntity.amount = ordertail['amount'];
       //orderDetailEntity.product.price = ordertail['product']['price'];
       //orderDetailEntity.product.name = ordertail['product']['name'];
       //
      //  this.productOrderDetailService.getByIdProductOrderdetail(orderDetailEntity.idProduct).subscribe(odp=>{
      //   // this.listProduct=new Array();
      //     this.dataProduct=res['content'];
      //     this.dataProduct.push((product)=>{
      //       let productEntity=new Product;

      //         productEntity.name=product['name'];
      //         productEntity.image=product['image'];
      //         productEntity.price=product['price'];
              
      //         orderDetailEntity.product=productEntity;
      //     });
      //   // orderDetailEntity.product.push(this.listProduct);
      //  });
                  // orderDetailEntity.product.nameProduct=ordertail['product']['name'];
                  // orderDetailEntity.product.price=ordertail['product']['price'];
                 // orderDetailEntity.product.idSupplier=ordertail['product']['idSupplier'];
                  // cho API cua product//
        this.listOrderDetail.push(orderDetailEntity);
       //
       this.Tong=this.Tong+orderDetailEntity.price*orderDetailEntity.amount;
       // this.listOrderDetail.push(orderDetailEntity);
        
      });
      this.totalOrderDetail=this.listOrderDetail.length;
      console.log(this.listOrderDetail);
      //this.pages = new Array(res['totalPages']);
    // this.totalOrderDetail = (res['totalElements']);
    });
   // this.getItem(orderDetail);
   this.setProduct();
    

  }

  delete(){ 
    this.productOrderDetailService.delete(this.idDelete).subscribe(res =>{
      console.log(res);
      alert(res['message']);
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
  
  getItem(orderDetail:OderDetail){
    this.orderDetail=orderDetail;
    console.log(orderDetail);
    this.idDelete=orderDetail['id'];
    this.nameDelete=orderDetail['nameProduct'];

  }
  // getTong(){
  //   this.productOrderDetailService.getByIdProductOrderdetail(this.idProduct).subscribe(res=>{
  //     this.o
  //   })
  // }

  deleteOderDetail(){
    let url = '/delete/' + this.idDelete;
      this.productOrderService.delete(url).subscribe(res=>{
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

  setProduct(){
    
    this.listProduct.forEach(item => {
      if (item.name==this.nameProduct) {
        this.Product=item;
        this.idProduct=item.idProduct;
        this.price=item.price;      
      }
    });
  }


  addProduct(form:NgForm) {
    
    console.log(form);
    console.log('Your form data : ', form.value);
    let newOrderDetail = new OderDetail;
    newOrderDetail.amount=form.value.amount;
    newOrderDetail.price=form.value.price;
    newOrderDetail.idProduct=this.idProduct;
    newOrderDetail.Order=this.orderDetail;
      console.log(newOrderDetail);
      this.productOrderDetailService.addOrderDetail(newOrderDetail).subscribe(res=>{
      console.log(res);    
      alert(res['message']);  
      this.viewOrderDetail();
    });
    this.viewOrderDetail();
  }
 
  
}
