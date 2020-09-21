import { SupplierService } from './../../service/supplier.service';
import { NgForm } from '@angular/forms';
import { Product } from './../../ultis/product';
import { BillImportDetail } from './../../ultis/billImportDetail';
import { from } from 'rxjs';

import { BillImport } from './../../ultis/billImport';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { DataService } from './../../service/data.service';
import {BillDetailService} from './../../service/billDetail.service'
import { BillImportService } from './../../service/billImport.service';
import { Supplier } from './../../ultis/supplier';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-product-import-detail',
  templateUrl: './product-import-detail.component.html',
  styleUrls: ['./product-import-detail.component.scss']
})
export class ProductImportDetailComponent implements OnInit, OnDestroy {
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
  supplier:Supplier;
  nameProduct:string;
  product:Product;

  billDetail = new BillImportDetail();
  dataArray=[];



  //variable form add
  idProduct:string='';
  price:number=0;

  constructor(
    private route: ActivatedRoute,
    private DataService: DataService,
              private BillDetailService : BillDetailService,
              private BillImportService : BillImportService,
              private SupplierService: SupplierService
    ) {
      
     }
  ngOnDestroy(): void {
    
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
   this.viewBill();
   this.getBillImport();
  
  }
  

  getBillImport(){
    this.BillImportService.getBillById(this.id).subscribe(res=>{
      this.billImport=res;
      this.createDate=res['createDate'];
      this.totalMoney=res['totalMoney'];
      this.totalProduct= res['totalProduct'];
      this.nameSupplier = res['supplierImport']['name'];
      this.supplier = res['supplierImport'];
      this.listProduct = res['supplierImport']['productList'];
    });    
  }

  getItem(billDetail:BillImportDetail){
    this.billDetail=billDetail;
    this.idDelete=billDetail['id'];
    this.nameDelete=billDetail['nameProduct'];

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
      alert(res['message']);
    });
  
  }

  

  editDetail(form:NgForm){
    let newBillDetail = new BillImportDetail;
    newBillDetail.amount=form.value.amount;
    this.BillDetailService.editBillDetail(this.billDetail.id,newBillDetail).subscribe(res=>{
      this.BillImportService.updateTotalPrice(this.id,this.billDetail).subscribe(res=>{   
        this.viewBill();
        this.getBillImport();
      });
    });
   

  }

  deleteBillDetail(){
    this.BillDetailService.delete(this.idDelete).subscribe(res =>{ 
      
      alert(res['message']);
      this.BillImportService.updateTotalPrice(this.id,this.billDetail).subscribe(res=>{   
        this.viewBill();
        this.getBillImport();
      });
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
    let newbillDetail = new BillImportDetail;
      newbillDetail.amount=form.value.amount;
      newbillDetail.price=form.value.price;
      newbillDetail.product=this.product;
      newbillDetail.billImport=this.billImport;
      newbillDetail.totalPrice=(form.value.amount*form.value.price);
      this.BillDetailService.addBill(newbillDetail).subscribe(res=>{ 
      alert(res['message']);  
      this.BillImportService.updateTotalPrice(this.id,newbillDetail).subscribe(res=>{ 
        // update thanh cong
        this.viewBill();
        this.getBillImport();  
      });
      
    });  
  }



}