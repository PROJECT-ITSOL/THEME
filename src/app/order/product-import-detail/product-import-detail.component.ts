
import { BillImport } from './../../ultis/billImport';
import { Component, OnInit, Input } from '@angular/core';
import {ProductImportComponent} from './../product-import/product-import.component';
import { identifierModuleUrl } from '@angular/compiler';
import { DataService } from './../../service/data.service';



@Component({
  selector: 'app-product-import-detail',
  templateUrl: './product-import-detail.component.html',
  styleUrls: ['./product-import-detail.component.scss']
})
export class ProductImportDetailComponent implements OnInit {
  id:string;

  constructor(private DataService: DataService,
    ) { }

  ngOnInit(): void {
   this.show();
  }
  show(){
    this.DataService.currentMessage.subscribe(message =>{
      this.id = message
      console.log(this.id);
    } );
    
  }

 
  
 

}
