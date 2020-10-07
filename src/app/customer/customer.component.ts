import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../service/authentication.service';
import {HttpParams} from '@angular/common/http';
import {Customer} from '../ultis/customer';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  private urlCustomer = '/api/customer';
  private pageNo = 0;
  totalCustomer: number;
  customerEdit = new Customer();
  listPage: Number[]=[];
  listCustomer: Customer[];
  dataCustomer: Array<any>;
  idDelete: number;
  isData:boolean = false;
  constructor(private service: AuthenticationService) { }

  ngOnInit(): void {
    this.getCustomer();
    this.getTotalCustomer()
  }
  isActive(item){
    return this.pageNo === item;
  }
  getTotalCustomer() {
    let url = '/api/customer/totalCustomer';
    this.service.getTotalCustomer(url).subscribe(
      res => {
        this.totalCustomer = res['data'];
      }
    );
    this.totalCustomer = this.listCustomer.length;
  }
  getCustomer() {
    this.listCustomer = new Array();
    let url = this.urlCustomer + '/list';
    let param = new HttpParams().append('pageNo', this.pageNo.toString());
    this.service.getList(param, url).subscribe((data) => {
      this.listPage = new Array(data['totalPages']);
      this.dataCustomer = data['content'];
      this.dataCustomer.forEach((customer) => {
        let customerEntity = new Customer();
        customerEntity.id = customer['id'];
        customerEntity.name = customer['name'];
        customerEntity.password = customer['password'];
        customerEntity.phoneNumber = customer['phoneNumber'];
        customerEntity.address = customer['address'];
        customerEntity.email = customer['email'];
        customerEntity.amountBoom = customer['amountBoom'];
        customerEntity.status = customer['status'];
        customerEntity.comments = customer['listProduct'];
        this.listCustomer.push(customerEntity);
      });
      // this.totalCustomer = this.listCustomer.length;
    });
    console.log("this.listCustomer", this.listCustomer);
  }
  setPage(i: number) {
    event.preventDefault();
    this.pageNo = i;
    this.getCustomer();
  }
  showDelete(idCustomer: number) {
    this.idDelete = idCustomer;
  }
  delCustomer() {
    let url = this.urlCustomer + '/delete/' + this.idDelete;
    this.service.delete(url).subscribe((data) => {
      console.log(data['success']);
      this.getCustomer();
    });
    console.log("######",this.getCustomer());
  }
  showEdit(data: Customer) {
    this.customerEdit = data;
    let url = this.urlCustomer + '/update/' + this.customerEdit.id;
    console.log(this.customerEdit.id);
  }
  onSubmit(form) {
    let url = this.urlCustomer + '/update/' + this.customerEdit.id;
    let customerUpdate= new Customer();
    customerUpdate.id = this.customerEdit.id;
    customerUpdate.name = form.value.name;
    customerUpdate.password = form.value.password;
    customerUpdate.phoneNumber = form.value.phoneNumber;
    customerUpdate.address = form.value.address;
    customerUpdate.email = form.value.email;
    customerUpdate.amountBoom = form.value.amountBoom;
    customerUpdate.status = form.value.status;
    this.service.putUpdate(url, customerUpdate).subscribe(
      data => {
        if (data['success']){
          this.getCustomer();
        }else{
          alert(data['message']);
        }
      }
    );
  }
  addSubmit(form) {
    let url = this.urlCustomer + "/addNew";

    let customer = new Customer();
    customer.id = form.value.id;
    customer.name = form.value.name;
    customer.password = form.value.password;
    customer.phoneNumber = form.value.phoneNumber;
    customer.address = form.value.address;
    customer.email = form.value.email;
    customer.amountBoom = form.value.amountBoom;
    customer.status = form.value.status;
    console.log(customer);
    this.service.postAddNew(url, customer).subscribe(
      data => {
        console.log(data['success']);
        if (data['success']){
          this.getCustomer();
        }else{
          alert(data['message']);
        }
      }
    );

  }
  searchSubmit(form) {
    let url = this.urlCustomer + '/search';
    let param = new HttpParams()
      .append('keyword', form.value.search);
    this.service.getSearch(param, url).subscribe(
      (data) => {
        if (data['success']){
          this.dataCustomer = data['data']['content'];
          this.listPage = [];
          this.listPage = new Array(data['data']['totalPages']);
          this.listCustomer = [];
          this.dataCustomer.forEach(customer => {
            let customerEntity = new Customer();
            customerEntity.id = customer['id'];
            customerEntity.name = customer['name'];
            customerEntity.address = customer['address'];
            customerEntity.amountBoom = customer['amountBoom'];
            customerEntity.phoneNumber = customer['phoneNumber'];
            customerEntity.status = customer['status'];
            customerEntity.customers = customer['listCustomer'];
            this.listCustomer.push(customerEntity);
          });
        }else{
          this.isData = true;
          this.listCustomer = [];
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
    this.getCustomer();
  }
  setLessPage(event) {
    event.preventDefault()
    this.pageNo--
    this.getCustomer();
  }
}
