import { Product } from './../../ultis/product';
import { Supplier } from './../../ultis/supplier';
import { SupplierService } from './../../service/supplier.service';
import { Test } from '../../ultis/test';
import { NgForm, NgModel } from '@angular/forms';
import { BillImportDetail } from './../../ultis/billImportDetail';
import { BillImport } from './../../ultis/billImport';
import { BillImportService } from './../../service/billImport.service';
import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { DataService } from './../../service/data.service';




@Component({
  selector: 'app-product-import',
  templateUrl: './product-import.component.html',
  styleUrls: ['./product-import.component.scss']
})
export class ProductImportComponent implements OnInit  {

  keyword:string;
  listBillImport:BillImport[];
  //variable paging
  page:number=0;
  pages:Array<number>;
  dataListBill:Array<any>;
  totalBill:number;
  billImport:BillImport;
  idBillImport:string;
  date:Date;

  billDetail = new BillImportDetail();
  dataArray=[];
  listSupp:Supplier[];
  dataSupp:Array<any>;
  idSupplier:number=0;
  supplier:Supplier;
  nameSupplier:string;
  listProduct:Product[];

  product:Product;
  nameProduct:string;



  


  constructor( private billImportService:BillImportService,
                private DataService: DataService,
                private SupplierService: SupplierService
    ) { } 



  ngOnInit(): void {
    this.getListBillImport();
   
   
  }

  showEdit(message:string) {
    this.DataService.changeMessage(message);
  }

  setPage(i,event:any){
    event.preventDefault();
    this.page = i;
    this.getListBillImport();
  
  }

  getListBillImport(){
    this.listBillImport = new Array();
    this.billImportService.getListBillByPage(this.page).subscribe(res=>{
       this.dataListBill=res['data']['content'];
      console.log(this.dataListBill);
      this.dataListBill.forEach((bill)=>{
        let billImport = new BillImport();
        billImport.idBillImport=bill['idBillImport'];
        // billImport.suppplier=bill['supplier'];
        // billImport.nameSupplier=bill['supplier']['name'];
        billImport.totalProduct=bill['totalProduct'];
        billImport.totalMoney=bill['totalMoney'];
        billImport.createDate=bill['createDate']
        this.listBillImport.push(billImport);
      });
      console.log(this.listBillImport);
      this.pages = new Array(res['data']['totalPages']);
      this.totalBill = (res['data']['totalElements']);
    });

  }


  searchBill(){
    this.listBillImport=new Array();
    this.billImportService.search(this.keyword,this.page).subscribe(res =>{
      this.dataListBill=res['content'];
      this.dataListBill.forEach((bill)=>{
        let billImport = new BillImport();
        billImport.idBillImport=bill['idBillImport'];
        billImport.createDate=bill['createDate'];
        billImport.totalProduct=bill['totalProduct'];
        billImport.totalMoney=bill['totalMoney'];
        billImport.billImportDetail=bill['billImportDetail'];
        this.listBillImport.push(billImport);
      });
      console.log(this.listBillImport);
      this.pages = new Array(res['totalPages']);
      this.totalBill = res['data']['totalElements'];
      });
  }

  
  
   
  

  getBillImport(bill:BillImport){
    this.billImport=bill;
    console.log(bill);
    console.log(this.billImport);


  }

  addBill(form:NgForm){
    console.log(form);
    console.log('Your form data : ', form.value);
    let newBillImport = new BillImport;
      newBillImport.idBillImport=form.value.idBillImport;
      newBillImport.createDate=form.value.createDate;
      newBillImport.supplier=this.supplier;
      console.log(this.supplier);
      console.log(newBillImport);
    this.billImportService.addBill(newBillImport).subscribe((res) => {
      console.log(res);    
       alert(res['message']);     
    });
    location.reload();
  }


  setSupplier(){
   
    this.listSupp.forEach(supp => {
      if (supp.name===this.nameSupplier) {
        this.supplier=supp;
        this.idSupplier=supp.idSupplier;
        console.log(supp.idSupplier);
      } 
    });
  }

  getSupplier(){
    this.listSupp = new Array();
    this.SupplierService.getAll().subscribe(res=>{
      this.dataSupp=res;
      this.dataSupp.forEach((supp)=>{
        let supplier = new Supplier();
        supplier.idSupplier=supp['idSupplier'];
        supplier.address=supp['address'];
        supplier.logo=supp['logo'];
        supplier.name=supp['name'];
        
        supplier.status=supp['status'];
        supplier.phoneNumber=supp['phoneNumber'];
        supplier.products=supp['productList'];
        this.listSupp.push(supplier);
       
      });
      console.log(this.listSupp);
      

    })
  }
  
   
  
    
    
  
  
  



}
