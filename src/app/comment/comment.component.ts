import { Comment } from './../ultis/comment';
import { AuthenticationService } from './../service/authentication.service';
import { Component, OnInit } from '@angular/core';

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
  urlApiComment = 'api/comment/';
  idDelete: number;
  urlImage: string;

  constructor(private service: AuthenticationService) {}

  ngOnInit(): void {
    this.getComment();
  }

  deleteCmt() {
    let url = this.urlApiComment + 'delete/' + this.idDelete;
    this.service.delete(url).subscribe((data) => {
      console.log(data['success']);
      this.getComment();
    });
  }

  showDelete(id:number){
    this.idDelete=id;
  }
  getImage(url: string){
    this.urlImage=url;
  }
  setPage(i, event: any) {
    event.preventDefault();
    this.pageNo = i;
    this.getComment();
    console.log(this.listComment);
  }

  getComment() {
    this.listComment = new Array();
    this.service.getListComment(this.pageNo).subscribe(
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
}
