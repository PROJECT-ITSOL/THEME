import { Product } from './../ultis/product';
import { error } from '@angular/compiler/src/util';
import { Comment } from './../ultis/comment';
import { AuthenticationService } from './../service/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {
  pageNo: number = 0;
  listPage: number[] = []
  listComment: Comment[];
  dataComment: Array<any>;
  dataProduct: Array<any>;
  urlApiComment = '/api/comment/';
  urlApiProduct = '/api/product/';
  urlApiCustomer = '/api/customer/';
  idDelete: number;
  urlImage: string;
  search: string;
  listProduct: Product[]
  listCustomer: string[]
  nameProduct: string = ""
  nameCustomer: string = ""
  total: number
  range: number = 5
  min = 1
  max = 5
  // maxPage
  constructor(private service: AuthenticationService) {

  }

  ngOnInit(): void {
    this.getComment();
    this.getListProduct();
    this.getListNameCustomer();

  }

  configListPage() {
    // debugger
    this.listPage = []
    for (let i = this.min; i <= this.max; i++) {
      this.listPage.push(i)
    }

  }

  page() {
    // debugger
    if (this.range > this.total) {
      this.min = 1
      this.max = this.total
    } else {
      if (this.pageNo > (this.total - this.range / 2)) {
        this.min = this.total - this.range
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

  isActive(item) {
    return this.pageNo === item;
  }
  deleteCmt() {
    let url = this.urlApiComment + 'delete/' + this.idDelete;
    this.service.delete(url).subscribe((data) => {
      console.log(data['success']);
      this.getComment();
    });
  }

  showDelete(id: number) {
    this.idDelete = id;
  }
  getImage(url: string) {
    this.urlImage = url;
  }
  setPage(i, event: any) {
    event.preventDefault();
    this.pageNo = i;
    this.page()
    this.getComment();
  }

  getListProduct() {
    let url = this.urlApiProduct + 'products'
    this.service.getListNoParam(url).subscribe(
      res => {
        this.dataProduct = new Array()
        this.listProduct = []
        this.dataProduct = res as Object[]
        this.dataProduct.forEach(data => {
          let entity = new Product();
          entity.name = data['name']
          this.listProduct.push(entity)
        })
      }
    )
  }

  selectNameProduct(event) {
    this.nameProduct = event.target.value
    this.getCommentByNameProductOrCustomer()

  }


  getListNameCustomer() {
    const url = this.urlApiCustomer + 'listName';
    this.service.getListNoParam(url).subscribe(
      res => {
        this.listCustomer = res['data']
      }
    )
  }
  selectNameCustomer(event) {
    this.nameCustomer = event.target.value
    this.getCommentByNameProductOrCustomer()
  }

  getCommentByNameProductOrCustomer() {
    let req: any;
    let url = this.urlApiComment + 'getList';
    let param = new HttpParams().append("nameProduct", this.nameProduct)
      .append("nameCustomer", this.nameCustomer)
    // .append("pageNo",this.pageNo.toString())
    this.service.getList(param, url).subscribe(
      res => {
        console.log(res)
        if (res['success']) {
          this.dataComment = res['data']['content'];
          this.total = res['data']['totalPages'];
          this.listComment = [];
          this.dataComment.forEach((cmt) => {
            let commentEntity = new Comment();
            commentEntity.id = cmt['id'];
            commentEntity.nameCustomer = cmt['nameCustomer'];
            commentEntity.nameProduct = cmt['nameProduct'];
            commentEntity.content = cmt['content'];
            commentEntity.image = cmt['image'];
            commentEntity.createDate = cmt['createDate'];
            this.listComment.push(commentEntity);
          });
          this.page()
          // console.log(this.listComment)
        } else {
          console.log("false");
        }
      },
      error => {
        console.log(error)
      }
    )
  }

  getComment() {
    this.listComment = new Array();
    let url = this.urlApiComment + 'getList';
    let param = new HttpParams().append('pageNo', (this.pageNo).toString())
      .append("nameProduct", this.nameProduct)
      .append("nameCustomer", this.nameCustomer);
    this.service.getList(param, url).subscribe(
      (data) => {
        if (data['success']) {
          this.dataComment = data['data']['content'];
          this.total = data['data']['totalPages'];
          this.dataComment.forEach((cmt) => {
            let commentEntity = new Comment();
            commentEntity.id = cmt['id'];
            commentEntity.nameCustomer = cmt['nameCustomer'];
            commentEntity.nameProduct = cmt['nameProduct'];
            commentEntity.content = cmt['content'];
            commentEntity.image = cmt['image'];
            commentEntity.createDate = cmt['createDate'];
            this.listComment.push(commentEntity);
          });
        }
        this.configListPage()

      },
      (error) => {
        console.log(error);
      }
    );
  }
  onSubmit(searchForm) {
    let value = '?keyword=' + searchForm.value.search;
    let url = this.urlApiComment + 'search' + value;
    this.service.getCommentById(url).subscribe(
      (data) => {
        if (data['success']) {
          this.dataComment = data['data']['content'];
          this.total = data['data']['totalPages'];
          this.listComment = [];
          this.dataComment.forEach((cmt) => {
            let commentEntity = new Comment();
            commentEntity.id = cmt['id'];
            commentEntity.nameCustomer = cmt['nameCustomer'];
            commentEntity.nameProduct = cmt['nameProduct'];
            commentEntity.content = cmt['content'];
            commentEntity.image = cmt['image'];
            commentEntity.createDate = cmt['createDate'];
            this.listComment.push(commentEntity);
          });
          this.page()
        } else {

          // this.isData = true;
          this.listComment = [];
          this.listPage = []
        }
      }),
      (error) => {
        console.log(error);
      }
  }
  setPlusPage(event) {
    event.preventDefault()
    this.pageNo++
    this.page()
    this.getComment()
  }
  setLessPage(event) {
    event.preventDefault()
    this.pageNo--
    this.page()
    this.getComment()
  }
  setFirstPage(event) {
    event.preventDefault()
    this.pageNo = 0
    this.page()
    this.getComment()
  }
  setLastPage(event) {
    event.preventDefault()
    this.pageNo = this.total - 1
    this.page()
    this.getComment()
  }
}
