import { error } from '@angular/compiler/src/util';
import { HttpParams } from '@angular/common/http';
import { Order } from './../../ultis/order';

import { OderDetail } from './../../ultis/orderDetail';
import { Product } from './../../ultis/product';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { from } from 'rxjs';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { ProductOrderService } from './../../service/productOrder.service';
import { ProductOrderDetailService } from "./../../service/productOrderDetail.service";

@Component({
  selector: 'app-product-order',
  templateUrl: './product-order.component.html',
  styleUrls: ['./product-order.component.scss'],
})
export class ProductOrderComponent implements OnInit {

  myName: string = 'duckha';


  private urlOrder = '/api/order';
  // list khoi tao luu tru
  listOrder: Order[];
  listOrderDetail: OderDetail[];
  listProduct: Product[];
  // list khoi tao bien (bien thay doi )
  editOrder: Order;
  keyword: string;  // dung de tim kiem
  message: string;   // luu thong bao
  idDelete: string; // luu id xoa
  dataOrder: Array<any>; // lua doi tuong tam thoi
  dataOrderDetail: Array<any>;
  totalOrderDetail: number;
  totalOrder: number;
  order = new Order();    // khoi tao bien
  // bien page
  status: string = "that bai";
  page: number = 0;
  i: number = 0;
  pages: Array<number>;
  constructor(
    private productOrderService: ProductOrderService,
    private productOrderDetailService: ProductOrderDetailService,
  ) { }



  //
  bien1 = 0;
  bien2 = 3;
  // loi goi dau

  ngOnInit(): void { this.getOrder(); }

  // lay ra ds Order
  getOrder() {

    this.listOrder = new Array();

    this.productOrderService.getListOrder(this.page).subscribe(res => {
      this.dataOrder = res['content'];
      this.totalOrder = 0;

      this.dataOrder.forEach((order) => {
        let orderEntity = new Order();
        // listOrderDetail:OderDetail[] ;
        orderEntity.idOrder = order['idOrder'];
        orderEntity.idCustomer = order['idCustomer'];
        orderEntity.createDate = order['createDate'];
        orderEntity.status = order['status'];

        this.productOrderDetailService.getByIdProductOrderdetail(orderEntity.idOrder).subscribe(odl => {
          this.listOrderDetail = new Array();
          this.dataOrderDetail = new Array();
          this.dataOrderDetail = res['content'];
          this.totalOrderDetail = 0;
          this.dataOrderDetail.forEach((oderDetail) => {
            let orderDetailEntity = new OderDetail();
            //  orderDetailEntity.idOrderDetail = oderDetail['idOrderDetail'];
            // orderDetailEntity.idOrder = oderDetail['idOrder'];
            //  orderDetailEntity.idProduct = oderDetail['idProduct'];
            // orderDetailEntity.amount = oderDetail['amount'];
            // orderDetailEntity.product.price = oderDetail['product']['price'];
            // orderDetailEntity.product.name = oderDetail['product']['name'];
            //this.totalOrderDetail=this.totalOrderDetail+orderDetailEntity.price*orderDetailEntity.amount;
            this.listOrderDetail.push(orderDetailEntity);
          });
<<<<<<< HEAD
          // console.log(this.listOrder);
          this.pages = new Array(res['totalPages']);
          this.totalOrder = (res['totalElements']);
=======
>>>>>>> a08f1348979689368f5ec6f3b4d4c476832e4f6f
        });
        // orderEntity.totalMoney=order['totalMoney'];
        //orderEntity.orderDetail=order['listOrderDetail'];
        // orderEntity.orderDetail.
        // orderEntity.totalMoney=orderEntity.totalMoney + this.totalOrderDetail;
        this.listOrder.push(orderEntity);
      });
      console.log(this.listOrder);
      this.pages = new Array(res['totalPages']);
      this.totalOrder = (res['totalElements']);
    });
  }
  // set 1 danh sach dang page
  setPage(i, event: any) {
    event.preventDefault();
    this.page = i;
    this.i = i;
    this.getOrder();
  }
  // gan bien
  showEdit(item: Order) {
    this.editOrder = item;
    this.idDelete = item.idOrder;
    this.status = item.status;
    // this.message=item.idOrder;
  }

  show(message: string) {
    this.productOrderService.changeMessage(message); // gan bien tri cho bien message trong service
  }
  // ham xoa doi tuong
  delete() {
    // console.log(this.idDelete);
    let url = '/delete/' + this.idDelete;
    this.productOrderService.delete(url).subscribe(res => {
      // console.log(res);
      this.getOrder();
      //alert(res['message']);
    })
    // this.getOrder();
  }
  // ham tim kiem 
  search() {
    this.listOrder = new Array();
    this.productOrderService.search(this.keyword, this.page).subscribe(res => {
      this.dataOrder = res['content']; // lay tat ca
      this.dataOrder.forEach((order) => {
        let orderEntity = new Order();
        orderEntity.idOrder = order['idOrder'];
        orderEntity.idCustomer = order['idCustomer'];
        orderEntity.createDate = order['createDate'];
        orderEntity.status = order['status'];
        orderEntity.totalMoney = order['totalMoney'];

        this.listOrder.push(orderEntity);
      })
      console.log(this.listOrder);
      this.pages = new Array(res['totalElement']);
    });
  }
  //------------------------------
  keyStatus: string;
  // dang cho
  statusDangcho() {
    this.keyStatus = 'đang chờ';
    this.searchStatus();
  }
  // ds that bai
  statusThatbai() {
    this.keyStatus = 'thất bại';
    this.searchStatus();
  }
  //ds thanh cong
  statusThanhCong() {
    this.keyStatus = 'thành công';
    this.searchStatus();
  }


  searchStatus() {
    this.listOrder = new Array();
    this.totalOrderDetail = 0;
    this.productOrderService.searchStatus(this.keyStatus).subscribe(res => {
      this.dataOrder = new Array()
      this.dataOrder = res; // lay tat ca
      // console.log(res)
      this.dataOrder.forEach((order) => {
        let orderEntity = new Order();
        orderEntity.idOrder = order['idOrder'];
        orderEntity.idCustomer = order['idCustomer'];
        orderEntity.createDate = order['createDate'];
        orderEntity.status = order['status'];
        orderEntity.totalMoney = order['totalMoney'];

        this.listOrder.push(orderEntity);
      })
      console.log(this.listOrder);
      this.pages = new Array(res['totalElement']);
      this.totalOrderDetail = (res['totalElements']);
    });
  }
  // ham submit
  onSubmit(form: NgForm) {
    console.log(form);
    console.log('Your form data: ', form.value);
    this.productOrderService.addOrder(form.value).subscribe((res) => {
      console.log(res);
      this.message = res['message'];
      location.reload();
      alert(res['message']);
    });
  }
  // editform
  editOn(form: NgForm) {
    console.log('Your form data: ', form.value);
    this.productOrderService.editOrder(this.editOrder.idOrder['idOrder'], form.value).subscribe(res => {
      this.getOrder();
    });
  }
  // status=true;
  // editStatus(item){
  //   this.status=item;
  //   //this.showEdit();
  // }


}
