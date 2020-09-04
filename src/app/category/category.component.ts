import { error } from '@angular/compiler/src/util';
import { HttpParams } from '@angular/common/http';
import { Category } from './../ultis/category';
import { AuthenticationService } from './../service/authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  private urlCategory = '/api/category';
  private pageNo = 0;
  listPage: Number[];
  listCategory: Category[];
  dataCategory: Array<any>;
  idDelete: string;
  categoryEdit = new Category();
  isData:boolean = false;

  constructor(private service: AuthenticationService) {}

  ngOnInit(): void {
    this.getCategory();
  }

  getCategory() {
    this.listCategory = new Array();
    // let url = this.urlCategory + '/list?pageNo=';
    let url = this.urlCategory + '/list';
    let param=new HttpParams().append('pageNo',this.pageNo.toString());
    this.service.getList(param, url).subscribe((data) => {
      this.listPage = new Array(data['totalPages']);
      this.dataCategory = data['content'];
      this.dataCategory.forEach((category) => {
        let categoryEntity = new Category();
        categoryEntity.id = category['idCategory'];
        categoryEntity.name = category['name'];
        categoryEntity.status = category['status'];
        categoryEntity.products = category['listProduct'];
        this.listCategory.push(categoryEntity);
      });
    });
  }
  setPage(i: number) {
    event.preventDefault();
    this.pageNo = i;
    this.getCategory();
  }
  showDelete(id: string) {
    this.idDelete = id;
  }
  delCategory() {
    let url = this.urlCategory + '/delete/' + this.idDelete;
    this.service.delete(url).subscribe((data) => {
      console.log(data['success']);
      this.getCategory();
    });
  }
  showEdit(data: Category) {
    this.categoryEdit = data;
    let url = this.urlCategory + '/update/' + this.categoryEdit.id;
    console.log(this.categoryEdit);
  }
  onSubmit(form) {
    console.log(form.value);
  }
  addSubmit(form) {
    let url = this.urlCategory + "/addNew";

    let category = new Category();
    category.id=form.value.id;
    category.name=form.value.name;

    console.log(category);
    this.service.postAddNew(url,category).subscribe(
      data=>{
        console.log(data['success']);
        if(data['success']){
          this.getCategory();
        }else{
          alert(data['message']);
        }
      }
    )

  }
  searchSubmit(form) {
    let url = this.urlCategory + '/search';
    let param = new HttpParams()
          .append('keyword', form.value.search);
    this.service.getSearch(param, url).subscribe(
      (data) => {
        if(data['success']){
          this.dataCategory=data['data']['content'];
          this.listPage = [];
          this.listPage=new Array(data['data']['totalPages']);
          this.listCategory=[];
          this.dataCategory.forEach(category=>{
            let categoryEntity = new Category();
            categoryEntity.id = category['idCategory'];
            categoryEntity.name = category['name'];
            categoryEntity.status = category['status'];
            categoryEntity.products = category['listProduct'];
            this.listCategory.push(categoryEntity);
          })
        }else{
          this.isData=true;
          this.listCategory=[];
        }
       
      },
      (error) => {
        console.log(error.error);
      }
    );
  }
}
