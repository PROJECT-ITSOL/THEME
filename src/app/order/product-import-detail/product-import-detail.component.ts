import { SupplierService } from './../../service/supplier.service';
import { NgForm } from '@angular/forms';
import { Product } from './../../ultis/product';
import { BillImportDetail } from './../../ultis/billImportDetail';
import { from } from 'rxjs';

import { BillImport } from './../../ultis/billImport';
import { Component, OnInit, Input } from '@angular/core';
import {ProductImportComponent} from './../product-import/product-import.component';
import { identifierModuleUrl } from '@angular/compiler';
import { DataService } from './../../service/data.service';
import {BillDetailService} from './../../service/billDetail.service'
import { BillImportService } from './../../service/billImport.service';
import { Supplier } from './../../ultis/supplier';



@Component({
  selector: 'app-product-import-detail',
  templateUrl: './product-import-detail.component.html',
  styleUrls: ['./product-import-detail.component.scss']
})
export class ProductImportDetailComponent implements OnInit {
  id:string;
  listDetail:BillImportDetail[];
  dataDetail:Array<any>;
  listProduct:Product[];
  nameSupplier:string;
  idSupplier:number;
  billImport:BillImport;

  totalMoney:number;
  totalProduct:number;
  createDate:string;

  totalBillImportDetail:number;

  idDelete:number;
  nameDelete:string;
  // listSupp:Supplier[];
  supplier:Supplier;
  nameProduct:string;
  product:Product;

  billDetail = new BillImportDetail();
  dataArray=[];



  //variable form add
  idProduct:string='';
  price:number=0;

  constructor(private DataService: DataService,
              private BillDetailService : BillDetailService,
              private BillImportService : BillImportService,
              private SupplierService: SupplierService
    ) { }

  ngOnInit(): void {
   this.getIdBillImport();
   this.viewBill();
   this.getBillImport();
  
  }
  getIdBillImport(){
    this.DataService.currentMessage.subscribe(message =>{
      this.id = message
    } );
    
  }

  getBillImport(){
    this.BillImportService.getBillById(this.id).subscribe(res=>{
      this.billImport=res;
      console.log(this.billImport);
      this.createDate=res['createDate'];
      this.totalMoney=res['totalMoney'];
      this.totalProduct= res['totalProduct'];
      this.idSupplier=res['idSupplier'];

    });
    
  }

  viewBill(){
    this.listDetail = new Array();
    this.BillDetailService.getByIdBill(this.id).subscribe(res=>{ 
      this.dataDetail=res; 
      this.dataDetail.forEach((detail)=>{
        let billDetail = new BillImportDetail();
        billDetail.id = detail['id'];
        billDetail.idProduct=detail['idProduct'];
        billDetail.amount=detail['amount'];
        billDetail.totalPrice=detail['totalPrice'];
        billDetail.product=detail['product'];
        billDetail.nameProduct=detail['product']['name'];
        billDetail.price=detail['product']['price'];
        this.listDetail.push(billDetail);
      });  
      this.totalBillImportDetail=this.listDetail.length;
    });
  }

  deleteBill(){ 
    this.BillImportService.delete(this.id).subscribe(res =>{
      console.log(res);
      alert(res['message']);
    });
  
  }

  getItem(billDetail:BillImportDetail){
    this.billDetail=billDetail;
    console.log(billDetail);
    this.idDelete=billDetail['id'];
    this.nameDelete=billDetail['nameProduct'];

  }

  deleteBillDetail(){
    this.BillDetailService.delete(this.idDelete).subscribe(res =>{
      console.log(res);   
      alert(res['message']);
      this.viewBill();
    })
  }

  setSupplier(){
    this.SupplierService.getSuppById(this.idSupplier).subscribe(res=>{
      this.supplier=res;
      this.nameSupplier = res["name"];
      this.listProduct = res['productList'];
    });
        
}

  setProduct(){
    
    this.listProduct.forEach(item => {
      if (item.name==this.nameProduct) {
        this.product=item;
        this.idProduct=item.idProduct;
        this.price=item.price;      
      }
    });
  }
 
  
  addProduct(form:NgForm) {
    
    console.log(form);
    console.log('Your form data : ', form.value);
    let newbillDetail = new BillImportDetail;
      newbillDetail.amount=form.value.amount;
      newbillDetail.price=form.value.price;
      newbillDetail.product=this.product;
      newbillDetail.billImport=this.billImport;
      console.log(newbillDetail);
      this.BillDetailService.addBill(newbillDetail).subscribe(res=>{
      console.log(res);    
      alert(res['message']);  
      this.viewBill();
    });
    this.viewBill();
  }



}
