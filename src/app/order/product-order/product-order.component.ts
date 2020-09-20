import { error } from '@angular/compiler/src/util';
import { HttpParams } from '@angular/common/http';
import {Order } from './../../ultis/order';

import { OderDetail } from './../../ultis/orderDetail';
import { Product } from './../../ultis/product';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { from } from 'rxjs';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { ProductOrderService} from './../../service/productOrder.service';
import { ProductOrderDetailService  } from "./../../service/productOrderDetail.service";

@Component({
  selector: 'app-product-order',
  templateUrl: './product-order.component.html',
  styleUrls: ['./product-order.component.scss'],
})
export class ProductOrderComponent  implements OnInit {

  myName: string ='duckha';


  private urlOrder= '/api/order';
  // list khoi tao luu tru
  listOrder: Order[];
  listOrderDetail: OderDetail[];
  listProduct: Product[];
  // list khoi tao bien (bien thay doi )
  editOrder: Order;
  keyword:string;  // dung de tim kiem
  message:string;   // luu thong bao
  idDelete: string; // luu id xoa
  dataOrder: Array<any>; // lua doi tuong tam thoi
  totalOrder: number;
  order=new Order();    // khoi tao bien
  // bien page
  page: number =0;
  i: number =0;
  pages: Array<number>;
    constructor(
          private productOrderService: ProductOrderService,
          private productOrderDetailService: ProductOrderDetailService,
      ) { }
  


  //
  bien1=0;
  bien2=3;
  // loi goi dau
  
  ngOnInit(): void{ this.getOrder();}

  // lay ra ds Order
    getOrder(){
      
        this.listOrder= new Array();
        this.productOrderService.getListOrder(this.page).subscribe(res=>{
          this.dataOrder=res['content']; 
          this.dataOrder.forEach((order)=>{
                  let orderEntity = new Order();
                  orderEntity.idOrder=order['idOrder'];
                  orderEntity.idCustomer=order['idCustomer'];
                  orderEntity.createDate=order['createDate'];
                  orderEntity.status=order['status'];
                  orderEntity.totalMoney=order['totalMoney'];
                  orderEntity.orderDetail=order['listOrderDetail'];
                  
                  this.listOrder.push(orderEntity);
          });
          console.log(this.listOrder);
          this.pages = new Array(res['totalPages']);
          this.totalOrder = (res['totalElements']);
        });
    }
      // set 1 danh sach dang page
    setPage(i,event:any){
      event.preventDefault();
      this.page=i;
      this.i=i;
      this.getOrder();
    }
    // gan bien
    showEdit(item: Order){
      this.editOrder=item;
      this.idDelete=item.idOrder;
     // this.message=item.idOrder;
    }
    show(message: string){
      this.productOrderService.changeMessage(message); // gan bien tri cho bien message trong service
    }
    // ham xoa doi tuong
    delete(){
      // console.log(this.idDelete);
      let url = '/delete/' + this.idDelete;
      this.productOrderService.delete(url).subscribe(res=>{
        // console.log(res);
        this.getOrder();
        //alert(res['message']);
      })
      // this.getOrder();
    }
    // ham tim kiem 
    search(){
      this.listOrder=new Array();
      this.productOrderService.search(this.keyword,this.page).subscribe(res=>{
          this.dataOrder=res['content']; // lay tat ca
          this.dataOrder.forEach((order)=>{
            let  orderEntity =new Order();
              orderEntity.idOrder=order['idOrder'];
              orderEntity.idCustomer=order['idCustomer'];
              orderEntity.createDate=order['createDate'];
              orderEntity.status=order['status'];
              orderEntity.totalMoney=order['totalMoney'];

              this.listOrder.push(orderEntity);
          })
          console.log(this.listOrder);
          this.pages =new Array(res['totalElement']);
      });
    }
    // ham submit
    onSubmit(form:NgForm){
      console.log(form);
      console.log('Your form data: ',form.value);
      this.productOrderService.addOrder(form.value).subscribe((res)=>{
          console.log(res);
          this.message=res['message'];
          location.reload();
          alert(res['message']);
      });
    }
    // editform
    editOn(form:NgForm){
      console.log('Your form data: ',form.value);
      this.productOrderService.editOrder(this.editOrder.idOrder['idOrder'],form.value).subscribe(res=>{
        this.getOrder();
      });
    }


}
