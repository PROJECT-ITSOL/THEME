import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { error } from '@angular/compiler/src/util';
import { HttpParams } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { from } from 'rxjs';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { ProductOrderService } from './../../service/productOrder.service';
import { ProductOrderDetailService } from "./../../service/productOrderDetail.service";
import { ActivatedRoute } from '@angular/router';
import { ProductService } from './../../service/product.service';

import { Product } from './../../ultis/product';
import { Order } from './../../ultis/order';
import { OderDetail } from './../../ultis/orderDetail';
// import { OrderComponent } from '../order.component';
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
  orderDetail: OderDetail = new OderDetail();
  nameProduct: string;
  priceProduct: number;
  product: Product = new Product();
  productabc: Product = new Product();
  idProduct;
  price;
  nameSupplier: string;
  Tong: number = 0;
  //
  page: number = 0;
  pages: Array<number>;
  pageNo = 0;
  GanidOrder: string;
  idDelete: number;
  nameDelete: string;
  listPage;

  //
  totalOrderDetail: number;

  constructor(
    private route: ActivatedRoute,
    private productOrderDetailService: ProductOrderDetailService,
    private productOrderService: ProductOrderService,
    private productService: ProductService,
    private service: AuthenticationService


  ) { }

  ngOnInit(): void {
    this.GanidOrder = this.route.snapshot.paramMap.get('id');


    this.viewOrderDetail();

    this.getProductAll();
    //this.getToTal();
  }

  //
  getProductAll() {
    this.listProduct = new Array();
    //let url ='/api/product/list';

    //let param = new HttpParams().append('pageNo', this.pageNo.toString());
    // this.service.getList(param, url).subscribe((data) => {
    this.productService.getAllList().subscribe((data) => {
      // this.listPage = new Array(data['totalPages']);
      this.dataProduct = data as object[];
      this.dataProduct.forEach((product) => {
        let productEntity = new Product();
        productEntity.idProduct = product['idProduct'];
        productEntity.idCategory = product['idCategory'];
        productEntity.idSupplier = product['idSupplier'];
        productEntity.name = product['name'];
        productEntity.price = product['price'];
        // productEntity.image = product['image'];
        // productEntity.content = product['content'];
        // productEntity.favorite = product['favorite'];
        productEntity.amount = product['amount'];
        productEntity.status = product['status'];
        // productEntity.products = product['listProduct'];
        this.listProduct.push(productEntity);
      });
    });
  }

  viewOrderDetail() {
    this.Tong = 0;
    this.listOrderDetail = new Array();
    this.productOrderDetailService.getByIdProductOrderdetail(this.GanidOrder).subscribe(res => {
      this.dataOrderDetail = new Array();
      this.dataOrderDetail = res['data'];
      this.listOrderDetail = [];
      this.totalOrderDetail = 0;
      this.dataOrderDetail.forEach(data => {
        let entity = new OderDetail();
        entity.idOrderDetail = data['idOrderDetail']
        entity.idOrder = data['idOrder']
        entity.amount = data['amount']
        //  entity.amountProduct=data['productOrderDetailt']['amount'];
        entity.totalPrice = data['totalPrice']
        entity.idProduct = data['productOrderDetail']['idProduct']
        entity.nameProduct = data['productOrderDetail']['name']
        entity.price = data['productOrderDetail']['price']
        this.Tong += entity.price * entity.amount;
        // console.log(entity);
        this.listOrderDetail.push(entity);
        // console.log(data);
      })
      this.totalOrderDetail = this.listOrderDetail.length;
    });
  }
  // bien 

  getDelete(item) {
    this.idDelete = item['idOrderDetail'];
    this.idProduct = item['idProduct'];

  }


  delete() {
    this.productOrderDetailService.delete(this.idDelete).subscribe(res => {
      alert(res['message']);
      this.viewOrderDetail();
      this.productOrderService.updateMoney(this.GanidOrder).subscribe(odr => { });
      this.productService.updateAmount(this.idProduct, this.orderDetail).subscribe(odr => {
        this.getProductAll();
      });
    });
    // this.ngOnInit();


  }



  // ham  trong modal
  addProduct(form: NgForm) {
    let newOrderDetail = new OderDetail;
    newOrderDetail.amount = form.value.amountAdd;
    newOrderDetail.idProduct = this.idProduct;
    newOrderDetail.idOrder = this.GanidOrder;
    newOrderDetail.totalPrice = form.value.amount * this.product.price;
    this.productService.getId(newOrderDetail.idProduct).subscribe(res => {
      this.productabc.amount = res['amount'];
      if (newOrderDetail.amount < this.productabc.amount) {
        this.productOrderDetailService.addOrderDetail(newOrderDetail).subscribe(res => {
          this.viewOrderDetail();
          this.productOrderService.updateMoney(this.GanidOrder).subscribe(odr => { });
          this.productService.updateAmount(this.idProduct, newOrderDetail).subscribe(odr => {
            this.getProductAll();
          });

          form.reset();
        });
      }
      else {
        // console.log("")
        alert("so luong nhap qua lon ");
      }

    });


    // this.viewOrderDetail();


  }

  // getMessage() {
  //   this.productOrderService.currentMessage.subscribe(message => {
  //     this.GanidOrder = message;
  //   });
  // }

  setProduct() {
    this.listProduct.forEach(cus => {
      if (cus.name === this.nameProduct) {
        this.product = cus;
        this.idProduct = cus.idProduct;
      }
    })
  }
  // khai bao  Oder
  setProductEdit(item) {
    this.listProduct.forEach(element => {
      if (element.name == item.nameProduct) {
        // this.product=element;
        this.productabc = element;

      }


    });
    this.orderDetail = item;
    console.log(this.orderDetail);


  }
  editOrderDetail(form: NgForm) {

    console.log('Your form data : ', form.value);
    let editOrderDetail = this.orderDetail;
    editOrderDetail.amount = form.value.amount;
    editOrderDetail.totalPrice = form.value.amount * this.orderDetail.price;

    console.log(editOrderDetail);
    this.productService.getId(editOrderDetail.idProduct).subscribe(res => {
      this.product.amount = res['amount'];
      if (editOrderDetail.amount < this.product.amount) {
        this.productOrderDetailService.editOrderDetail(this.orderDetail.idOrderDetail, editOrderDetail).subscribe(res => {
          console.log(res);
          alert(res['message']);
          this.viewOrderDetail();
          this.productOrderService.updateMoney(this.GanidOrder).subscribe(odr => { });
          this.productService.updateAmount(this.idProduct, editOrderDetail).subscribe(odr => {
            this.getProductAll();
          });
          form.reset();
        });
      } else {
        alert("so luong nhap qua lon ");
      }
    });

  }

}
