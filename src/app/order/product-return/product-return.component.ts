import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-return',
  templateUrl: './product-return.component.html',
  styleUrls: ['./product-return.component.scss']
})
export class ProductReturnComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
// khai bao linh tinh ti nua xoa
keyword: string ='keyword';
search(){}
totalOrder: string='total';

page=0;
i;
  // set 1 danh sach dang page
  setPage(i,event:any){
    event.preventDefault();
    this.page=i;
    this.i=i;
    //this.getOrder();
  }
//----------------

}
