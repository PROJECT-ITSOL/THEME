import { SupplierService } from './../../service/supplier.service';
import { ProductService } from './../../service/product.service';
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
              private SupplierService: SupplierService,
              private ProductService : ProductService
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
    console.log(billDetail);
    this.billDetail=billDetail;
    this.idDelete=billDetail['id'];
    this.nameDelete=billDetail['nameProduct'];
   
    this.idProduct=billDetail.idProduct;
    this.price=billDetail.price;
    this.nameProduct=billDetail.nameProduct;
    this.product=billDetail.product;
    console.log(this.idProduct);
    console.log(this.price);
    console.log(this.product);

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

  addProduct(form:NgForm) {
    console.log(form.value);
    let newbillDetail = new BillImportDetail;
      newbillDetail.amount=form.value.amount;
      newbillDetail.price=this.price;
      newbillDetail.product=this.product;
      newbillDetail.billImport=this.billImport;
      newbillDetail.totalPrice=form.value.amount*this.price;
      console.log(newbillDetail);
      this.BillDetailService.addBill(newbillDetail).subscribe(res=>{ 
      alert(res['message']);  
      this.BillImportService.updateTotalPrice(this.id,newbillDetail).subscribe(response=>{ 
        this.viewBill();
        this.getBillImport();  
      });
      this.ProductService.updateAmount(this.idProduct,newbillDetail).subscribe(res=>{
      });
      form.reset();
     
    });  
  }

  

  editDetail(form:NgForm){
    console.log(form.value);
    let newBillDetail = new BillImportDetail;
    newBillDetail.amount=form.value.amount;
    newBillDetail.price=form.value.price;
    newBillDetail.product=this.product;
    newBillDetail.totalPrice=(form.value.amount*form.value.price);
    
    console.log(newBillDetail);
    this.BillDetailService.editBillDetail(this.billDetail.id,newBillDetail).subscribe(res=>{
      this.BillImportService.updateTotalPrice(this.id,this.billDetail).subscribe(res=>{   
        this.viewBill();
        this.getBillImport();
      });
      this.ProductService.updateAmount(this.idProduct,newBillDetail).subscribe(res=>{
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
      this.ProductService.updateAmount(this.idProduct,this.billDetail).subscribe(res=>{
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

  reset(){
    
    
  }
 
  
 



}
