import { Product } from './../../ultis/product';
import { BillImportDetail } from './../../ultis/billImportDetail';
import { from } from 'rxjs';

import { BillImport } from './../../ultis/billImport';
import { Component, OnInit, Input } from '@angular/core';
import {ProductImportComponent} from './../product-import/product-import.component';
import { identifierModuleUrl } from '@angular/compiler';
import { DataService } from './../../service/data.service';
import {BillDetailService} from './../../service/billDetail.service'



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

  constructor(private DataService: DataService,
              private BillDetailService : BillDetailService
    ) { }

  ngOnInit(): void {
   this.show();
   this.viewBill();
  }
  show(){
    this.DataService.currentMessage.subscribe(message =>{
      this.id = message
      console.log(this.id);
    } );
    
  }

  viewBill(){
    this.listDetail = new Array();
    this.BillDetailService.getByIdBill(this.id).subscribe(res=>{
     
      this.dataDetail=res;
      this.dataDetail.forEach((detail)=>{
        let billDetail = new BillImportDetail();
        billDetail.idProduct=detail['idProduct'];
        billDetail.amount=detail['amount'];
        billDetail.totalPrice=detail['price'];
        billDetail.Product=detail['product'];
        billDetail.nameProduct=detail['product']['name'];
        billDetail.unitPrice=detail['product']['price'];
        this.listDetail.push(billDetail);
      });
      console.log(this.listDetail);
      

     

    })
  }

 
  
 

}
