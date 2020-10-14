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
  pageNo: number = 0;
  listPage: number[] = [];
  listCategory: Category[];
  dataCategory: Array<any>;
  idDelete: string;
  categoryEdit = new Category();
  isData: boolean = false;
  total: number
  range: number = 5
  min = 1
  max = 5
  totalCategory: number = 0
  constructor(private service: AuthenticationService) { }

  ngOnInit(): void {
    this.getCategory();
  }

  configListPage() {
    // debugger
    this.listPage = []
    for (let i = this.min; i <= this.max; i++) {
      this.listPage.push(i)
    }
    // this.page()

  }
  page() {
    // debugger
    if (this.range > this.total) {
      this.min = 1
      this.max = this.total
    } else {
      if (this.pageNo > (this.total - this.range / 2)) {
        this.min = (this.total - this.range) + 1
        this.max = this.total
      } else if (this.pageNo < this.range / 2) {
        this.min = 1
        this.max = 5
      } else {
        this.min = this.pageNo - Math.floor(this.range / 2)
        this.max = this.pageNo + Math.floor(this.range / 2)
      }
    }
    this.configListPage()
  }

  isActive(item: number) {
    return this.pageNo === item;
  }
  getCategory() {
    this.listCategory = new Array();
    let url = this.urlCategory + '/list';
    let param = new HttpParams().append('pageNo', this.pageNo.toString());
    this.service.getList(param, url).subscribe((data) => {
      this.total = data['totalPages'];
      this.dataCategory = data['content'];
      this.totalCategory = data['totalElements']
      this.dataCategory.forEach((category) => {
        let categoryEntity = new Category();
        categoryEntity.id = category['idCategory'];
        categoryEntity.name = category['name'];
        categoryEntity.status = category['status'];
        categoryEntity.products = category['listProduct'];
        this.listCategory.push(categoryEntity);
      });
    this.page()
    });
  }
  setPage(i: number, event) {
    event.preventDefault();
    this.pageNo = i;
    this.page()
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
    console.log(this.categoryEdit.id);
  }
  onSubmit(form) {
    let url = this.urlCategory + "/update/" + this.categoryEdit.id;
    let categoryUpdate = new Category();
    categoryUpdate.id = this.categoryEdit.id;
    categoryUpdate.name = form.value.name;
    categoryUpdate.status = form.value.status;
    this.service.putUpdate(url, categoryUpdate).subscribe(
      data => {
        if (data['success']) {
          this.getCategory();
        } else {
          alert(data['message'])
        }
      }
    );
  }
  addSubmit(form) {
    let url = this.urlCategory + "/addNew";

    console.log(form)
    let category = new Category();
    // category.id = form.value.id;
    category.name = form.value.name;

    console.log(category);
    this.service.postAddNew(url, category).subscribe(
      data => {
        console.log(data['success']);
        if (data['success']) {
          this.getCategory();
        } else {
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
        if (data['success']) {
          this.dataCategory = data['data']['content'];
          // this.listPage = [];
          this.total = data['data']['totalPages'];
          this.totalCategory = data['totalElements']
          this.listCategory = [];
          this.dataCategory.forEach(category => {
            let categoryEntity = new Category();
            categoryEntity.id = category['idCategory'];
            categoryEntity.name = category['name'];
            categoryEntity.status = category['status'];
            categoryEntity.products = category['listProduct'];
            this.listCategory.push(categoryEntity);
          })
        } else {
          this.isData = true;
          this.listCategory = [];
        }

      },
      (error) => {
        console.log(error.error);
      }
    );
  }
  setPlusPage(event) {
    event.preventDefault()
    this.pageNo++
    this.page()
    this.getCategory()
  }
  setLessPage(event) {
    event.preventDefault()
    this.pageNo--
    this.page()
    this.getCategory()
  }
  setFirstPage(event) {
    event.preventDefault()
    this.pageNo = 0
    this.page()
    this.getCategory()
  }
  setLastPage(event) {
    event.preventDefault()
    this.pageNo = this.total - 1
    this.page()
    this.getCategory()
  }
}
