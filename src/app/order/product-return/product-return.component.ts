//import { Component, OnInit } from '@angular/core';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ProductReturnService } from './../../service/productReturn.service';
import { Product } from './../../ultis/product';
import { ProductReturn } from './../../ultis/productReturn';
import { error } from '@angular/compiler/src/util';
import { HttpParams } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { from } from 'rxjs';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { ProductOrderService } from './../../service/productOrder.service';
import { ProductOrderDetailService } from "./../../service/productOrderDetail.service";
import { ActivatedRoute } from '@angular/router';

//import { Product } from './../../ultis/product';
import { Order } from './../../ultis/order';
import { OderDetail } from './../../ultis/orderDetail';
import { OrderComponent } from '../order.component';

@Component({
  selector: 'app-product-return',
  templateUrl: './product-return.component.html',
  styleUrls: ['./product-return.component.scss']
})
export class ProductReturnComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private productReturnService: ProductReturnService,
    private productService: ProductOrderService,
    private productOrderService: ProductOrderService,
  ) { }

  ngOnInit(): void {
    this.getProductReturn();
    //this.setPage()
  }
  // bien de chay modal Add';
  idProductReturn;
  idProduct;
  idOrder;
  amount;
  status;

  //
  listProductReturn: ProductReturn[];
  dataProductReturn: Array<any>;
  //totalProductReturn: number=0;
  productReturn = new ProductReturn();
  // khai bao linh tinh ti nua xoa
  keyword: string = '';

  totalProductReturn: number;

  page = 0;
  pages: Array<number>;
  i: number = 0;
  // set 1 danh sach dang page
  setPage(i, event: any) {
    event.preventDefault();
    this.page = i;
    this.i = i;
    this.getProductReturn();
  }
  //----------------
  getProductReturn() {
    this.listProductReturn = new Array();
    this.totalProductReturn = 0;
    this.productReturnService.getListProductRetunr(this.page).subscribe(res => {
      this.dataProductReturn = res['content'];


      this.dataProductReturn.forEach((productReturn) => {
        let productReturnEntity = new ProductReturn;
        productReturnEntity.idProductReturn = productReturn['idProductReturn'];
        productReturnEntity.idProduct = productReturn['idProduct'];
        productReturnEntity.idOrder = productReturn['idOrder'];
        productReturnEntity.amount = productReturn['amount'];
        productReturnEntity.status = productReturn['status'];

        this.listProductReturn.push(productReturnEntity);
      });
      console.log(this.listProductReturn);
      this.pages = new Array(res['totalPages']);
      this.totalProductReturn = (res['totalElements']);

    });

  }
  //--------- gan gia tri id can delete
  //editProductReturn: ProductReturn;
  idDelete: number;
  //status;
  showEdit(item: ProductReturn) {
    //this.editProductReturn=item;
    this.idDelete = item.idProductReturn;
    //this.status=item.status;
    // this.message=item.idOrder;
  }
  //show the status


  //---------
  deleteProductReturn() {
    let urlProductReturn = this.idDelete;
    this.productReturnService.delete(urlProductReturn).subscribe(res => {
      // console.log(res);
      this.getProductReturn();
      //alert(res['message']);
    })
  }
  //ds hang loi
  keystatus: string;
  statusLoi() {
    this.keystatus = 'Lỗi';
    this.searchStatus();
  }
  // ds hang Boom
  statusBoom() {
    this.keystatus = 'Bom';
    this.searchStatus();
  }
  //------------------------------------------
  search() {
    this.listProductReturn = new Array();
    this.totalProductReturn = 0;
    this.productReturnService.search(this.keyword, this.page).subscribe(res => {
      this.dataProductReturn = res['content'];
      this.dataProductReturn.forEach((productReturn) => {
        let productReturnEntity = new ProductReturn();
        productReturnEntity.idProductReturn = productReturn['idProductReturn'];
        productReturnEntity.idProduct = productReturn['idProduct'];
        productReturnEntity.idOrder = productReturn['idOrder'];
        productReturnEntity.amount = productReturn['amount'];
        productReturnEntity.status = productReturn['status'];

        this.listProductReturn.push(productReturnEntity);
      });
      this.pages = new Array(res['totalPages']);
      this.totalProductReturn = (res['totalElements']);
    });
  }

  //-----------------------------------------------
  searchStatus() {
    this.listProductReturn = new Array();
    this.totalProductReturn = 0;
    this.productReturnService.searchStatus(this.keystatus).subscribe(res => {

      this.dataProductReturn = res;
      this.dataProductReturn.forEach((productReturn) => {
        let productReturnEntity = new ProductReturn();
        productReturnEntity.idProductReturn = productReturn['idProductReturn'];
        productReturnEntity.idProduct = productReturn['idProduct'];
        productReturnEntity.idOrder = productReturn['idOrder'];
        productReturnEntity.amount = productReturn['amount'];
        productReturnEntity.status = productReturn['status'];

        this.listProductReturn.push(productReturnEntity);
      });
      this.pages = new Array(res['totalPages']);
      this.totalProductReturn = (res['totalElements']);
    });

  }
  message: string;
  order: any;
  addProductReturn(form: NgForm) {

      this.productReturnService.addProductReturn(form.value).subscribe((res) => {
        this.message = res['message'];
        // location.reload();
        alert(res['message']);

      });
    // });

  
    }

}
