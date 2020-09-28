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
  listPage: Number[] = [];
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

  constructor(private service: AuthenticationService) { }

  ngOnInit(): void {
    this.getComment();
    this.getListProduct();
    this.getListNameCustomer();

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
    this.service.getList(param, url).subscribe(
      res => {
        if (res['success']) {
          this.dataComment = res['data']['content'];
          this.listPage = [];
          this.listPage = new Array(res['data']['totalPages']);
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
          console.log(this.listComment)
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
    let param = new HttpParams().append('pageNo', (this.pageNo).toString());
    this.service.getList(param, url).subscribe(
      (data) => {
        if (data['success']) {
          this.dataComment = data['data']['content'];
          this.listPage = new Array(data['data']['totalPages']);
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
          this.listPage = [];
          this.listPage = new Array(data['data']['totalPages']);
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
        } else {
          
            // this.isData = true;
            this.listComment = [];
            this.listPage=[]
        }
      }),
      (error) => {
        console.log(error);
      }
  }
  setPlusPage(event) {
    event.preventDefault()
    this.pageNo++
    this.getComment()
  }
  setLessPage(event) {
    event.preventDefault()
    this.pageNo--
    this.getComment()
  }
}
