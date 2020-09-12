
import { BillImport } from './../../ultis/billImport';
import { BillImportService } from './../../service/billImport.service';
import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { DataService } from './../../service/data.service';


@Component({
  selector: 'app-product-import',
  templateUrl: './product-import.component.html',
  styleUrls: ['./product-import.component.scss']
})
export class ProductImportComponent implements OnInit {

  keyword:string;
  listBillImport:BillImport[];
  page:number=0;
  pages:Array<number>;
  dataListBill:Array<any>;
  totalBill:number;
  billImport:BillImport;
  idBillImport:string;
  name:string='nam';

  constructor( private billImportService:BillImportService,
    private DataService: DataService
    ) { } 



  ngOnInit(): void {
    this.getListBillImport();
  }

  setPage(i,event:any){
    event.preventDefault();
    this.page = i;
    this.getListBillImport();
  
  }

  getListBillImport(){
    this.listBillImport = new Array();
    this.billImportService.getListBillByPage(this.page).subscribe(res=>{
      console.log(res);
      this.dataListBill=res['content'];
      this.dataListBill.forEach((bill)=>{
        let billImport = new BillImport();
        billImport.idBillImport=bill['idBillImport'];
        billImport.creatDate=bill['creatDate'];
        billImport.totalProduct=bill['totalProduct'];
        billImport.totalMoney=bill['totalMoney'];
        billImport.billImportDetail=bill['billImportDetail'];
        this.listBillImport.push(billImport);
      });
      console.log(this.listBillImport);
      this.pages = new Array(res['totalPages']);
      console.log(this.pages);
      this.totalBill = (res['totalElements']);
    });

  }

  searchBill(){
    this.listBillImport=new Array();
    this.billImportService.search(this.keyword,this.page).subscribe(res =>{
      this.dataListBill=res['content'];
      this.dataListBill.forEach((bill)=>{
        let billImport = new BillImport();
        billImport.idBillImport=bill['idBillImport'];
        billImport.creatDate=bill['creatDate'];
        billImport.totalProduct=bill['totalProduct'];
        billImport.totalMoney=bill['totalMoney'];
        billImport.billImportDetail=bill['billImportDetail'];
        this.listBillImport.push(billImport);
      });
      console.log(this.listBillImport);
      this.pages = new Array(res['totalPages']);
      this.totalBill = (res['totalElements']);
      });
  }

  
  
  showEdit(message:string) {
    
    this.DataService.changeMessage(message);
   
  }

  



}
