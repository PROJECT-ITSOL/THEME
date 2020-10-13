import {HttpParams} from '@angular/common/http';
import {Order} from './../../ultis/order';

import {OderDetail} from './../../ultis/orderDetail';
import {Product} from './../../ultis/product';
import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthenticationService} from 'src/app/service/authentication.service';
import {ProductOrderService} from './../../service/productOrder.service';
import {ProductOrderDetailService} from './../../service/productOrderDetail.service';
import {ActivatedRoute} from '@angular/router';
import {Customer} from './../../ultis/customer';
//import {  } from '@NgModule.imports';

//import {  } from "./../../service";
@Component({
  selector: 'app-product-order',
  templateUrl: './product-order.component.html',
  styleUrls: ['./product-order.component.scss'],
  
})

export class ProductOrderComponent implements OnInit {
  ngOnInit(): void {
  
    this.i = parseInt(this.route.snapshot.paramMap.get('id'));
    this.getOrder();
    this.getCustomer();
    this.setListDay();

  }

  myName: string = 'duckha';

  private urlCustomer = '/api/customer';
  private urlOrder = '/api/order';
  // list khoi tao luu tru
  
  listOrder: Order[];
  listOrderDetail: OderDetail[];
  listProduct: Product[];
  listCustomer: Customer[];
  customer: Customer;
  nameCustomer;
  nameSDTCustomer;
  idCustomer: number=1;
  sdtCustomer: string;
  listPage: Number[];
  dataCustomer: Array<any>;
  private pageNo = 0;
  editStatus;
  seachDate: Date;
  listDay:Array<number>=[];
  listMonth:Array<number>=[];
  listYear:Array<number>=[];

  listName:string[];

  // list khoi tao bien (bien thay doi )
  editOrderkey: Order = new Order();
  keyword: number;  // dung de tim kiem
  message: string;   // luu thong bao
  idDelete: number; // luu id xoa
  dataOrder: Array<any>; // lua doi tuong tam thoi
  dataOrderDetail: Array<any>;
  totalOrderDetail: number;
  totalOrder: number;
  order = new Order();    // khoi tao bien
  orderEdit= new Order();
  // bien page
  status: string = 'that bai';
  page: number = 1;
  i: number = 1;
  //
  day: number;
  month: number;
  year: number;
  //t: string= this.i.toString();
  pages: Array<number>;
  keyStatus= "Xem tất cả";
  
  idlink;
  idOrder: string;

  constructor(
    private route: ActivatedRoute,
    private productOrderService: ProductOrderService,
    private productOrderDetailService: ProductOrderDetailService,
    private service: AuthenticationService,
  ) {
  }
  //
  bien1 = 0;
  bien2 = 3;
  // loi goi dau
  // lay danh sach customer
  setListDay(){
    //var i;
      for(var i=0;i<31;i++){
        this.listDay.push(i);
      }
     
      for(var i=0;i<=12;i++){
        this.listMonth.push(i);
      }
      for(var i=2000;i<=2050;i++){
        this.listYear.push(i);
      }
  }

  getCustomer() {
    this.listCustomer = new Array();
    this.listName = new Array();
    let url = this.urlCustomer + '/list';
    let param = new HttpParams().append('pageNo', this.pageNo.toString());
    this.service.getList(param, url).subscribe((data) => {      
      this.listPage = new Array(data['totalPages']);
      this.dataCustomer = data['content'];
      this.dataCustomer.forEach((customer) => {
        let customerEntity = new Customer();
        customerEntity.id = customer['id'];
        customerEntity.name = customer['name'];
      //  customerEntity.password = customer['password'];
        customerEntity.phoneNumber = customer['phoneNumber'];
        customerEntity.address = customer['address'];
        customerEntity.email = customer['email'];
       // customerEntity.amountBoom = customer['amountBoom'];
      //  customerEntity.status = customer['status'];
      //  customerEntity.comments = customer['listProduct'];
        this.listCustomer.push(customerEntity);
       
      });
      console.log('this.listCustomer', this.listCustomer);
     
    });
    
  }
  // lay ra ds Order
  getOrder() {

    this.listOrder = new Array();

    this.productOrderService.getListOrder(this.page).subscribe(res => {
      this.dataOrder = res['content'];
      this.totalOrder = 0;

      this.dataOrder.forEach((order) => {
        let orderEntity = new Order();
        orderEntity.idOrder = order['idOrder'];
        orderEntity.idCustomer = order['idCustomer'];
        orderEntity.createDate = order['createDate'];
        orderEntity.status = order['status'];
        orderEntity.nameCustomer = order['customerOrder']['name'];
        orderEntity.phoneCustomer = order['customerOrder']['phoneNumber'];
        orderEntity.emailSuctomer = order['customerOrder']['email'];
        orderEntity.totalMoney = order['totalMoney'];
        orderEntity.orderDetail = order['listOrderDetail'];
        this.listOrder.push(orderEntity);
      });
      this.pages = new Array(res['totalPages']);
      this.totalOrder = (res['totalElements']);
    });
  }
   
  // set 1 danh sach dang page
  // set status
  setStatus(){}
  //
  setPage(i, event: any) {
    event.preventDefault();
    this.page = i;
    this.i = i;
    //parseInt(this.route.snapshot.paramMap.get('id')) = this.page;
    //
    if (this.keyStatus == 'Đang chờ' || this.keyStatus == 'Thành công' || this.keyStatus == 'Thất bại')
      //     this.getOrder;
      // else
    {
      this.searchStatus();
    } else {
      this.getOrder();
    }
  }

  // gan bien
  showEdit(item: Order) {
    this.editOrderkey = item;
    // console.log(this.editOrderkey.status)
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
    let url = '/delete?id=' + this.idDelete;
    this.productOrderService.delete(url).subscribe(res => {
      // console.log(res);
      alert(res['message']);
      this.getOrder();
      //alert(res['message']);
    });
    // this.getOrder();
  }

  // ham tim kiem
  search() {
    this.listOrder = new Array();
    this.productOrderService.searchId(this.keyword).subscribe(res => {
      this.dataOrder = res['content']; // lay tat ca
      this.dataOrder.forEach((order) => {
        let orderEntity = new Order();
        orderEntity.idOrder = order['idOrder'];
        orderEntity.idCustomer = order['idCustomer'];
        orderEntity.createDate = order['createDate'];
        orderEntity.status = order['status'];
        orderEntity.nameCustomer = order['customerOrder']['name'];
        orderEntity.phoneCustomer = order['customerOrder']['phoneNumber'];
        orderEntity.emailSuctomer = order['customerOrder']['email'];
        orderEntity.totalMoney = order['totalMoney'];
        orderEntity.orderDetail = order['listOrderDetail'];
        this.listOrder.push(orderEntity);
      });
      this.pages = new Array(res['totalElement']);
    });
  }

 


  setNameAndPhoneCustomer() {
    this.listCustomer.forEach(cus => {
      if (cus.name+cus.phoneNumber === this.nameSDTCustomer) {
        this.customer = cus;
        console.log(this.customer);
        this.idCustomer = cus.id;
      }
      // console.log(this.customer)
      
    });
  }
  setNameCustomer(){
    this.listCustomer.forEach(cus => {
      if (cus.name === this.nameCustomer) {
        this.customer = cus;
        this.idCustomer = cus.id;
      }
      console.log(this.customer)
      
    });
  }
  setPhoneCustomer() {
    this.listCustomer.forEach(cus => {
      if (cus.phoneNumber === this.sdtCustomer) {
        this.customer = cus;
        console.log(this.customer);
        this.idCustomer = cus.id;
      }
      
    });
  }
  // tim kiem theo c
  searchStatus() {
    
    if(this.keyStatus=="Xem tất cả"){
        this.getOrder();
    }
    else{
      this.listOrder = new Array();
    this.totalOrderDetail = 0;
    this.productOrderService.searchStatus(this.keyStatus, this.i).subscribe(res => {
      this.dataOrder = new Array();
      this.dataOrder = res['content']; // lay tat ca
      // console.log(res)
      this.dataOrder.forEach((order) => {
        let orderEntity = new Order();
        orderEntity.idOrder = order['idOrder'];
        orderEntity.idCustomer = order['idCustomer'];
        orderEntity.createDate = order['createDate'];
        orderEntity.status = order['status'];
        orderEntity.nameCustomer = order['customerOrder']['name'];
        orderEntity.phoneCustomer = order['customerOrder']['phoneNumber'];
        orderEntity.emailSuctomer = order['customerOrder']['email'];
        orderEntity.totalMoney = order['totalMoney'];
        orderEntity.orderDetail = order['listOrderDetail'];
        this.listOrder.push(orderEntity);
      });
      console.log(this.listOrder);
      this.pages = new Array(res['totalElement']);
      this.totalOrderDetail = (res['totalElements']);
    });
    }
  }

  // tim kiem tim kiem theo id khach hang
  searchIdCustomer(){
    //this.setCustomer();
    this.listOrder = new Array();
    this.productOrderService.searchIdCustomer(this.idCustomer,0).subscribe(res=>{
      this.dataOrder = new Array();
      this.dataOrder = res['content']; // lay tat ca
      // console.log(res)
      this.dataOrder.forEach((order) => {
        let orderEntity = new Order();
        orderEntity.idOrder = order['idOrder'];
        orderEntity.idCustomer = order['idCustomer'];
        orderEntity.createDate = order['createDate'];
        orderEntity.status = order['status'];
        orderEntity.nameCustomer = order['customerOrder']['name'];
        orderEntity.phoneCustomer = order['customerOrder']['phoneNumber'];
        orderEntity.emailSuctomer = order['customerOrder']['email'];
        orderEntity.totalMoney = order['totalMoney'];
        orderEntity.orderDetail = order['listOrderDetail'];
        this.listOrder.push(orderEntity);
      });
      console.log(this.listOrder);
      this.pages = new Array(res['totalElement']);
      this.totalOrderDetail = (res['totalElements']);
    });
  }
  setSearchDate(){
    
    this.listOrder=new Array();
    this.productOrderService.searchTime(this.day,this.month,this.year,0).subscribe(res=>{
      this.dataOrder = new Array();
      this.dataOrder = res['content']; // lay tat ca
      // console.log(res)
      this.dataOrder.forEach((order) => {
        let orderEntity = new Order();
        orderEntity.idOrder = order['idOrder'];
        orderEntity.idCustomer = order['idCustomer'];
        orderEntity.createDate = order['createDate'];
        orderEntity.status = order['status'];
        orderEntity.nameCustomer = order['customerOrder']['name'];
        orderEntity.phoneCustomer = order['customerOrder']['phoneNumber'];
        orderEntity.emailSuctomer = order['customerOrder']['email'];
        orderEntity.totalMoney = order['totalMoney'];
        orderEntity.orderDetail = order['listOrderDetail'];
        this.listOrder.push(orderEntity);
      });
      console.log(this.listOrder);
      this.pages = new Array(res['totalElement']);
      this.totalOrderDetail = (res['totalElements']);
    });
  }

  // tim kiem ds đơn hàng trong ngày, trong tháng, trong 1 khoảng thời gian
  // tong tien ban hang trong ngay
  // tong tien ban hang trong thang
  // tao bieu do

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

  //
  addOrder(form: NgForm) {
    console.log(form.value);
    let newOrder = new Order;
    // newOrder.idOrder = form.value.idOrder;
    newOrder.nameCustomer = form.value.nameCustomer;
    newOrder.createDate = form.value.createDate;
    newOrder.idCustomer = this.customer.id;
    // console.log(this.customer)
    newOrder.totalMoney = 0;
    console.log(newOrder);


    this.productOrderService.addOrder(newOrder).subscribe((res) => {
      console.log(res)
      // alert(res['message']);
      this.getOrder();
      this.productOrderService.getOrderLast().subscribe(res=>{
        this.idOrder= res['idOrder'];
        console.log(this.idOrder);
      });
    });

    

  }

  
  //ham edit doi tuong
  editOrder(form: NgForm) {
    console.log('Your form data: ', form.value);
    let newOrder = this.editOrderkey;
    newOrder.status = form.value.status;
    newOrder.createDate= form.value.createDate;
    console.log(newOrder);
    this.productOrderService.editOrder(newOrder.idOrder, form.value).subscribe(res => {
      this.getOrder();
    });
  }

  
  

}
