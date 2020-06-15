import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CommentsService} from "./comments.service";
import {Comment} from "./comment";
import {TokenStorageService} from "../auth/token-storage.service";

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  comments: Comment[] = [];
  private comment: Comment;

  constructor(private commentsService: CommentsService, private route: ActivatedRoute, public token: TokenStorageService) { }

  ngOnInit(): void {
    this.getComments();
  }
  getComments(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.commentsService.getComments(id).subscribe(result => this.comments = result);

  }

  addComment(nick: String, text: String): void {
    const id = +this.route.snapshot.paramMap.get('id');
    nick = nick.trim();
    if(nick === ''){
      nick = this.token.getUsername();
    }
    text = text.trim();
    this.comment = new Comment(nick, text);
    console.log(this.comment.votes);
    this.commentsService.addComment(id, this.comment).subscribe(result => {this.comments.push(result)},
      error1 => {
      },
      () => {
      },);
  }
  deleteComment(commentId: number): void {
    const id = +this.route.snapshot.paramMap.get('id');
    console.log("This is event id: " + id);
    console.log("Comment id: " + commentId);
    this.commentsService.deleteComment(commentId, id).subscribe();
    this.reloadPage();
  }

  reloadPage() {
    window.location.reload();
  }

  upVote(comment: Comment): void {
    comment.votes += 1;
  }

  downVote(comment: Comment): void {
    comment.votes -= 1;
  }

  sortComments(): Comment[]{
    return this.comments.sort((a: Comment, b: Comment) => b.votes - a.votes);
  }
}
