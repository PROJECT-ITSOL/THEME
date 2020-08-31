import { error } from '@angular/compiler/src/util';
import { Comment } from './../ultis/comment';
import { AuthenticationService } from './../service/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {
  pageNo: number = 0;
  listPage: Number[];
  listComment: Comment[];
  dataComment: Array<any>;
  urlApiComment = '/api/comment/';
  idDelete: number;
  urlImage: string;
  search: string;
  // searchControl=new FormControl;

  constructor(private service: AuthenticationService) {}

  ngOnInit(): void {
    this.getComment();
    // this.searchControl.valueChanges.subscribe(val=>{
    //   console.log(val);
    // })
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
    // console.log(this.listComment);
  }

  getComment() {
    this.listComment = new Array();
    let url = this.urlApiComment + 'getList?page=';
    this.service.getList(this.pageNo, url).subscribe(
      (data) => {
        this.dataComment = data['content'];
        this.listPage = new Array(data['totalPages']);
        this.dataComment.forEach((cmt) => {
          let commentEntity = new Comment();
          commentEntity.id = cmt['idComment'];
          commentEntity.content = cmt['content'];
          commentEntity.image = cmt['image'];
          this.listComment.push(commentEntity);
        });
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
      this.dataComment = data['data']['content'];
      // console.log(data['data']['totalPages']);
      this.listPage = [];
      this.listPage = new Array(data['data']['totalPages']);
      console.log(this.listPage);
      this.listComment = [];
      this.dataComment.forEach((cmt) => {
        let commentEntity = new Comment();
        commentEntity.id = cmt['idComment'];
        commentEntity.content = cmt['content'];
        commentEntity.image = cmt['image'];
        this.listComment.push(commentEntity);
        console.log(this.listComment);
      });
    }),
    (error)=>{
      console.log(error);
    }
  }
}
