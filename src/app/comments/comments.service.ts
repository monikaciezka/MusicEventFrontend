import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {Comment} from "./comment";
import {Event} from "../event";
import {catchError, tap} from "rxjs/operators";


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  private url = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  getComments(eventId: number): Observable<Comment[]>{
    const findUrl = `${this.url}/event/${eventId}/comments`;
    return this.http.get<Comment[]>(findUrl);
  }
  addComment(eventId: number, comment: Comment): Observable<Comment>{
    const addUrl = `${this.url}/event/${eventId}/comments`;
    return this.http.post<Comment>(addUrl, comment, httpOptions).pipe(tap((commentAdded: Comment) => this.log(`added contact id=${commentAdded.id}`)),catchError(this.handleError<Comment>('addComment')));
  }

  //delete selected comment
  deleteComment(commentId: number, eventId: number): Observable<Comment>{
    const deleteUr = `${this.url}/event/${eventId}/comments/${commentId}`;
    return this.http.delete<Comment>(deleteUr, httpOptions).pipe(catchError(this.handleError<Comment>('deleteComment')));
  }

  voteComment(eventId: number, commentId: number, vote: number): Observable<Comment>{
    const voteUrl = `${this.url}/event/${eventId}/comments/${commentId}`;
    return this.http.patch(voteUrl, vote ,httpOptions).pipe(tap((commentAdded: Comment) => this.log(`voted on comment id=${commentAdded.id}`)),catchError(this.handleError<Comment>('voteComment')));

  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a ContactService message with the MessageService */
  private log(message: string) {
    console.log('ContactService: ' + message);
  }
}
