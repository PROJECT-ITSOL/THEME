import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../service/authentication.service';
import {HttpParams} from '@angular/common/http';
import {Product} from '../ultis/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  private urlProduct = '/api/product';
  private pageNo = 0;
  // tslint:disable-next-line:ban-types
  listPage: Number[];
  listProduct: Product[];
  dataProduct: Array<any>;
  idDelete: string;
  productEdit = new Product();
  isData = false;
  message: string;
  content: string;
  success: string;
  dataRegister: any = {};

  constructor(private service: AuthenticationService) { }

  ngOnInit(): void {
    this.getProduct();
  }

  // tslint:disable-next-line:typedef
  isActive(item){
    return this.pageNo === item;
  }

  // tslint:disable-next-line:typedef
  getProduct() {
    this.listProduct = new Array();
    // let url = this.urlCategory + '/list?pageNo=';
    const url = this.urlProduct + '/list';
    const param = new HttpParams().append('pageNo', this.pageNo.toString());
    this.service.getList(param, url).subscribe((data) => {
      this.listPage = new Array(this.dataRegister.totalPages);
      this.dataProduct = this.dataRegister.content;
      this.dataProduct.forEach((product) => {
        const productEntity = new Product();
        productEntity.idProduct = product.idProduct;
        productEntity.idSupplier = product.idSupplier;
        productEntity.idCategory = product.idCategory;
        productEntity.name = product.name;
        productEntity.price = product.price;
        productEntity.image = product.image;
        productEntity.content = product.content;
        productEntity.favorite = product.favorite;
        productEntity.amount = product.amount;
        productEntity.status = product.status;
        productEntity.products = product.listProduct;
        this.listProduct.push(productEntity);
      });
    });
  }
  // tslint:disable-next-line:typedef
  setPage(i: number) {
    event.preventDefault();
    this.pageNo = i;
    this.getProduct();
  }
  // tslint:disable-next-line:typedef
  showDelete(id: string) {
    this.idDelete = id;
  }

  // tslint:disable-next-line:typedef
  deleteProduct() {
    const url = this.urlProduct + '/delete/' + this.idDelete;
    this.service.delete(url).subscribe((data) => {
      console.log(this.dataRegister.success);
      this.getProduct();
    });
  }

  // tslint:disable-next-line:typedef
  showEdit(data: Product) {
    this.productEdit = data;
    const url = this.urlProduct + '/update/' + this.productEdit.idProduct;
    console.log(this.productEdit.idProduct);
  }

  // tslint:disable-next-line:typedef
  onSubmit(form) {
    const url = this.urlProduct + '/update/' + this.productEdit.idProduct;
    const productUpdate = new Product();
    productUpdate.idProduct = this.productEdit.idProduct;
    // productUpdate.idCategory = this.productEdit.idCategory;
    // productUpdate.idSupplier = this.productEdit.idSupplier;
    productUpdate.name = form.value.name;
    productUpdate.price = form.value.price;
    productUpdate.image = form.value.image;
    productUpdate.content = form.value.content;
    productUpdate.favorite = form.value.favorite;
    productUpdate.amount = form.value.amount;
    productUpdate.status = form.value.status;
    this.service.putUpdate(url, productUpdate).subscribe(
      data => {
        // this.dataRegister = data;
        if (this.dataRegister.success){
          this.getProduct();
        }else{
          alert(this.dataRegister.message);
        }
      }
    );
  }

  // tslint:disable-next-line:typedef
  addSubmit(form) {
    const url = this.urlProduct + '/addProduct';

    const product = new Product();
    product.idProduct = form.value.idProduct;
    product.name = form.value.name;
    console.log(product);
    this.service.postAddNew(url, product).subscribe(
      data => {
        // this.dataRegister = data;
        console.log(this.dataRegister.success);
        if (this.dataRegister.success){
          this.getProduct();
        }else{
          alert(this.dataRegister.message);
        }
      }
    );

  }

  // tslint:disable-next-line:typedef
  searchProduct(form) {
    const url = this.urlProduct + '/search';
    const param = new HttpParams()
      .append('keyword', form.value.search);
    this.service.getSearch(param, url).subscribe(
      (data) => {
        if (this.success){
          this.dataProduct = this.dataRegister.content;
          this.listPage = [];
          this.listPage = new Array(this.dataRegister.totalPages);
          this.listProduct = [];
          this.dataProduct.forEach(product => {
            const productEntity = new Product();
            productEntity.idProduct = product.idProduct;
            productEntity.name = product.name;
            productEntity.status = product.status;
            productEntity.products = product.listProduct;
            this.listProduct.push(productEntity);
          });
        }else{
          this.isData = true;
          this.listProduct = [];
        }

      },
      (error) => {
        console.log(error.error);
      }
    );
  }
}
