import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../service/authentication.service';
import {HttpParams} from '@angular/common/http';
import {Product} from '../ultis/product';
import {Category} from '../ultis/category';
import {Supplier} from '../ultis/supplier';
import {SupplierService} from '../service/supplier.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  private urlProduct = '/api/product';
  private urlCategory = '/api/category';
  private pageNo = 0;
  listPage: Number[];
  totalSupp: number;
  listProduct: Product[];
  listCategory: Category[];
  listSupp: Supplier[];
  dataProduct: Array<any>;
  idDelete: string;
  productEdit = new Product();
  isData: boolean = false;
  dataCategory: Array<any>;
  dataSupp: Array<any>;

  constructor(private service: AuthenticationService, private supplierService: SupplierService) {
  }

  ngOnInit(): void {
    this.getProduct();
    this.getCategory();
    this.getSupp();
  }

  isActive(item) {
    return this.pageNo === item;
  }

  getCategory() {
    this.listCategory = new Array();
    // let url = this.urlCategory + '/list?pageNo=';
    let url = this.urlCategory + '/list';
    let param = new HttpParams().append('pageNo', this.pageNo.toString());
    this.service.getList(param, url).subscribe((data) => {
      // console.log(data)
      this.listPage = new Array(data['totalPages']);
      this.dataCategory = data['content'];
      this.dataCategory.forEach((category) => {
        let categoryEntity = new Category();
        categoryEntity.id = category['idCategory'];
        categoryEntity.name = category['name'];
        categoryEntity.status = category['status'];
        categoryEntity.products = category['listProduct'];
        this.listCategory.push(categoryEntity);
      });
    });
  }

  getSupp() {
    this.listSupp = new Array();
    this.supplierService.getListSupp(0).subscribe(res => {

      this.dataSupp = res['content'];
      this.dataSupp.forEach((supp) => {
        let supplier = new Supplier();
        supplier.idSupplier = supp['idSupplier'];
        supplier.address = supp['address'];
        supplier.logo = supp['logo'];
        supplier.name = supp['name'];
        supplier.status = supp['status'];
        supplier.phoneNumber = supp['phoneNumber'];
        supplier.products = supp['productList'];
        this.listSupp.push(supplier);
      });
      console.log(this.listSupp);
      // this.pages = new Array(res['totalPages']);
      this.totalSupp = (res['totalElements']);
    });
    // console.log('######', this.listSupp);
  }

  getProduct() {
    this.listProduct = new Array();
    // let url = this.urlProduct + '/list?pageNo=';
    let url = this.urlProduct + '/list';
    let param = new HttpParams().append('pageNo', this.pageNo.toString());
    this.service.getList(param, url).subscribe((data) => {
      this.listPage = new Array(data['totalPages']);
      this.dataProduct = data['content'];
      this.dataProduct.forEach((product) => {
        let productEntity = new Product();
        productEntity.idProduct = product['idProduct'];
        productEntity.idCategory = product['idCategory'];
        productEntity.idSupplier = product['idSupplier'];
        productEntity.name = product['name'];
        productEntity.price = product['price'];
        productEntity.image = product['image'];
        productEntity.content = product['content'];
        productEntity.favorite = product['favorite'];
        productEntity.amount = product['amount'];
        productEntity.status = product['status'];
        productEntity.products = product['listProduct'];
        this.listProduct.push(productEntity);
      });
    });
  }

  setPage(i: number) {
    event.preventDefault();
    this.pageNo = i;
    this.getProduct();
  }

  showDelete(idProduct: string) {
    this.idDelete = idProduct;
  }

  delProduct() {
    let url = this.urlProduct + '/delete/' + this.idDelete;
    this.service.delete(url).subscribe((data) => {
      console.log(data['success']);
      this.getProduct();
    });
  }

  showEdit(data: Product) {
    this.productEdit = data;
    let url = this.urlProduct + '/update/' + this.productEdit.idProduct;
    console.log(this.productEdit.idProduct);
  }

  onSubmit(form) {
    let url = this.urlProduct + '/update/' + this.productEdit.idProduct;
    let productUpdate = new Product();
    productUpdate.idProduct = this.productEdit.idProduct;
    productUpdate.idCategory = this.productEdit.idCategory;
    productUpdate.idSupplier = this.productEdit.idSupplier;
    productUpdate.name = form.value.name;
    productUpdate.price = form.value.price;
    productUpdate.image = form.value.image;
    productUpdate.content = form.value.content;
    productUpdate.favorite = form.value.favorite;
    productUpdate.amount = form.value.amount;
    productUpdate.status = form.value.status;
    this.service.putUpdate(url, productUpdate).subscribe(
      data => {
        if (data['success']) {
          this.getProduct();
        } else {
          alert(data['message']);
        }
      }
    );
  }

  addSubmit(form) {
    // console.log(form.value);
    let url = this.urlProduct + '/addNew';
    let idcategory: string;
    let idSupplier: number;
    this.listCategory.forEach(c => {
      if (c.name === form.value.nameCategory) {
        idcategory = c.id;
      }
    });
    this.listSupp.forEach(s => {
      if (s.name === form.value.nameSupplier) {
        idSupplier = s.idSupplier;
      }
    });

    let product = new Product();
    product.idProduct = form.value.idProduct;
    product.idCategory = idcategory;
    product.idSupplier = idSupplier;
    product.name = form.value.name;
    product.price = form.value.price;
    product.image = form.value.image;
    product.content = form.value.content;
    product.favorite = form.value.favorite;
    product.amount = form.value.amount;
    product.status = form.value.status;
    console.log(product);
    this.service.postAddNew(url, product).subscribe(
      data => {
        console.log(data['success']);
        if (data['success']) {
          this.getProduct();
        } else {
          alert(data['message']);
        }
      }
    );

  }

  searchSubmit(form) {
    let url = this.urlProduct + '/search';
    let param = new HttpParams()
      .append('keyword', form.value.search);
    this.service.getSearch(param, url).subscribe(
      (data) => {
        if (data['success']) {
          this.dataProduct = data['data']['content'];
          this.listPage = [];
          this.listPage = new Array(data['data']['totalPages']);
          this.listProduct = [];
          this.dataProduct.forEach(product => {
            let productEntity = new Product();
            productEntity.idProduct = product['idProduct'];
            productEntity.idCategory = product['idCategory'];
            productEntity.idSupplier = product['idSupplier'];
            productEntity.name = product['name'];
            productEntity.price = product['price'];
            productEntity.image = product['image'];
            productEntity.content = product['content'];
            productEntity.favorite = product['favorite'];
            productEntity.status = product['status'];
            productEntity.products = product['listProduct'];
            this.listProduct.push(productEntity);
          });
        } else {
          this.isData = true;
          this.listProduct = [];
        }

      },
      (error) => {
        console.log(error.error);
      }
    );
  }
  setPlusPage(event) {
    event.preventDefault()
    this.pageNo++
    this.getProduct()
  }
  setLessPage(event) {
    event.preventDefault()
    this.pageNo--
    this.getProduct()
  }
}
