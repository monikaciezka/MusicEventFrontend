import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {EventsService} from "../events/events.service";
import {User} from "./user";
import {Event} from "../event";
import {catchError, tap} from "rxjs/operators";


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  eventsService: EventsService;
  private url = 'http://localhost:8080/user';
  private events: Event[];
  constructor(private http: HttpClient) { }

  getEvents(): void {
    this.eventsService.getEvents();
  }

  getUser(username: string): Observable<User> {
    const getUrl = `${this.url}/${username}`;
    return this.http.get<User>(getUrl);
  }

  deleteEventFav(eventId: number, username: string): Observable<any> {
    const deleteUrl = `${this.url}/event/${eventId}/${username}`;
    return this.http.delete(deleteUrl).pipe(tap((deleteEventFav: Event) => this.log(`removed event id=${eventId} from fav`)), catchError(this.handleError<Event>('deleteEventFav')));

  }

  getUserEvents(username: string): Observable<Event[]> {
    const getUrl = `${this.url}/event/${username}`;
    return this.http.get<Event[]>(getUrl);
  }




  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
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
    console.log('UserService: ' + message);
  }
}
