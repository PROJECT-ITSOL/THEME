import { Supplier } from './../ultis/supplier';
import { SupplierService } from './../service/supplier.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.scss']
})
export class SupplierComponent implements OnInit {
  
  listSupp= [];
  page:number=0;
  pages:Array<number>;
  totalSupp:number;
  idDelete:number;
  keyword:string;
  listProduct:[];
  nameSupplier:string;
  
  
  supplier=new Supplier();

  constructor(private supplierService : SupplierService) { }
    
  setPage(i,event:any){
    event.preventDefault();
    this.page = i;
    this.getSupp();
  
  }

  showEdit(item){
    
    this.supplier=item;
    console.log(this.supplier);
    console.log(this.supplier['idSupplier']);
    this.listProduct=item['productList'];
    console.log(this.listProduct);
    this.nameSupplier=item['name'];
  }

  showId(item){
    this.idDelete=item;
    console.log(this.idDelete);

  }

  ngOnInit(): void {
    this.getSupp();
    
  }
   getSupp(){

    this.supplierService.getListSupp(this.page).subscribe(res => {
      // this.listData=res;
    console.log(res);
    console.log(res['content']);
    this.listSupp = (res['content']);
    console.log(res['totalPages']) ;
    this.pages = new Array(res['totalPages']);
    this.totalSupp = (res['totalElements']);
    })

  }


  onSubmit(form: NgForm){
    console.log('Your form data : ', form.value);
    this.supplierService.addSupp(form.value).subscribe(res => {
      console.log(res); 
      location.reload();
    })
  }
  onSubmit1(form: NgForm){
    console.log('Your form data : ',form.value);
    this.supplierService.editSupp(this.supplier['idSupplier'],form.value).subscribe(res => {
      console.log(res); 
      location.reload();
    })
  }

  delete(){
    this.supplierService.delete(this.idDelete).subscribe(res =>{
      console.log(res); 
      location.reload();
    })
  }

  search(){
    this.supplierService.search(this.keyword)
  }

  

  



 

}
