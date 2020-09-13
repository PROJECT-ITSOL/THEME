import { Product } from './../ultis/product';
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
  
  listSupp: Supplier[];
  page:number=0;
  pages:Array<number>;
  totalSupp:number;
  idDelete:number;
  keyword:string;
  listProduct:  Product[];
  nameSupplier:string;
  dataSupp:Array<any>;
  supplier=new Supplier();
  message:string;

  constructor(private supplierService : SupplierService) { }
    
  setPage(i,event:any){
    event.preventDefault();
    this.page = i;
    this.getSupp();
  
  }

  showEdit(item:Supplier){
    
    this.supplier=item;
    this.listProduct=item['products'];
    this.nameSupplier=item['name'];
    this.idDelete=item['idSupplier']
  }

 
  ngOnInit(): void {
    this.getSupp();
    
  }
   getSupp(){
    this.listSupp = new Array();
    this.supplierService.getListSupp(this.page).subscribe(res => {
     
    this.dataSupp=res['content'];
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
    this.pages = new Array(res['totalPages']);
    this.totalSupp = (res['totalElements']);
    });
   

  }


  onSubmit(form:NgForm){
    console.log(form);
    console.log('Your form data : ', form.value);
    this.supplierService.addSupp(form.value).subscribe((res) => {
      console.log(res);
      this.message=res['message'];
      location.reload();
       alert(res['message']);
      
    });
  }
  edit(form:NgForm){
    console.log('Your form data : ',form.value);
    this.supplierService.editSupp(this.supplier['idSupplier'],form.value).subscribe(res => {
      
      this.getSupp();
     
    });
  }

  delete(){
    this.supplierService.delete(this.idDelete).subscribe(res =>{
      console.log(res);
     
      alert(res['message']);
      this.getSupp();
    })
  }

  search(){
    this.listSupp=new Array();
    this.supplierService.search(this.keyword,this.page).subscribe(res =>{
      this.dataSupp=res['content'];
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
      this.pages = new Array(res['totalPages']);
      this.totalSupp = (res['totalElements']);
      });
  }


}
