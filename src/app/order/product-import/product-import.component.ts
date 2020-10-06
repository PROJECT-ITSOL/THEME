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
import { ActivatedRoute,Router} from '@angular/router';




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
  
  dataListBill:Array<any>;
  totalBill:number;
  billImport= new BillImport();
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
  p:string='1';


  constructor( private billImportService:BillImportService,
                private DataService: DataService,
                private SupplierService: SupplierService,
                private route: ActivatedRoute,
                 private router: Router )
     { 
      this.route.queryParams.subscribe(params => {
        this.p = params['page'] || 0;
      });

    } 



  ngOnInit(): void {
    this.getAllBill(); 
    this.getSupplier();
  }


  // setPage(i,event:any){
  //   event.preventDefault();
  //   this.page = i;
  //   this.getListBillImport();
  
  // }

  // getListBillImport(){
  //   this.listBillImport = new Array();
  //   this.billImportService.getListBillByPage(this.page).subscribe(res=>{
  //      this.dataListBill=res['data']['content'];
  //     this.dataListBill.forEach((bill)=>{
  //       let billImport = new BillImport();
  //       billImport.idBillImport=bill['idBillImport'];
  //       billImport.totalProduct=bill['totalProduct'];
  //       billImport.totalMoney=bill['totalMoney'];
  //       billImport.createDate=bill['createDate'];
  //       billImport.nameSupplier=bill['supplierImport']['name'];
  //       this.listBillImport.push(billImport);
  //     });
  //     this.pages = new Array(res['data']['totalPages']);
  //     this.totalBill = (res['data']['totalElements']);
  //   });

  // }

  getAllBill(){

   this.listBillImport = new Array();
  this.billImportService.getAllBill().subscribe(res=>{
     this.dataListBill=res;
    this.dataListBill.forEach((bill)=>{
      let billImport = new BillImport();
      billImport.idBillImport=bill['idBillImport'];
      billImport.totalProduct=bill['totalProduct'];
      billImport.totalMoney=bill['totalMoney'];
      billImport.createDate=bill['createDate'];
      billImport.nameSupplier=bill['supplierImport']['name'];
      this.listBillImport.push(billImport);
      
    });
    console.log(this.listBillImport)
    this.totalBill = this.dataListBill.length;
    
  });

}

pageChange(newPage: number) {
  this.router.navigate(['/homeAdmin/order/product-import'], { queryParams: { page: newPage } });
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
     
      
      });
  }

  getBillBySupp(){
    this.listSupp.forEach(supp => {
      if (supp.name===this.nameSupplier) {
        this.supplier=supp;
        this.idSupplier=supp.idSupplier;
        this.listBillImport = new Array();
        this.billImportService.getByIdSupp(this.idSupplier,this.page).subscribe(res=>{
          this.dataListBill=res['data']['content'];
          this.dataListBill.forEach((bill)=>{
            let billImport = new BillImport();
            billImport.idBillImport=bill['idBillImport'];
            billImport.totalProduct=bill['totalProduct'];
            billImport.totalMoney=bill['totalMoney'];
            billImport.createDate=bill['createDate'];
            billImport.nameSupplier=bill['supplierImport']['name'];
            this.listBillImport.push(billImport);
          });
         
          this.totalBill = (res['data']['totalElements']);
        });
      } 
    });
  }

  getBillImport(bill:BillImport){
    this.billImport=bill;
    console.log(this.billImport);
  }

  addBill(form:NgForm){
    let newBillImport = new BillImport;
      newBillImport.idBillImport=form.value.idBillImport;
      newBillImport.createDate=form.value.createDate;
      newBillImport.supplier=this.supplier;
      newBillImport.totalMoney=0;
      newBillImport.totalProduct=0;
      this.billImportService.addBill(newBillImport).subscribe((res) => { 
      alert(res['message']);     
      // this.getListBillImport();
      form.reset();
    });
   
  }

  editBill(form:NgForm){
    let newBillImport = new BillImport;
      newBillImport.idBillImport=form.value.idBillImport;
      newBillImport.createDate=form.value.createDate;
      this.billImportService.editBill(this.billImport.idBillImport,form.value).subscribe(res=>{

      });
  }

  setSupplier(){
    this.listSupp.forEach(supp => {
      if (supp.name===this.nameSupplier) {
        this.supplier=supp;
        this.idSupplier=supp.idSupplier;

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
    })
  }

}
