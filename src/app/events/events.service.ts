import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {Event} from "../event";
import {catchError, tap} from "rxjs/operators";
import {Comment} from "../comments/comment";


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  private url = 'http://localhost:8080/event';

  constructor(private http: HttpClient) { }

  /** GET events from the server */
  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.url);
  }

  /** GET events with specified band name*/
  getBandConcerts(bandName: string): Observable<Event[]> {
    const findUrl = `${this.url}/band`;
    return this.http.get<Event[]>(findUrl);
  }

  /** GET event with id*/
  getEvent(id: number): Observable<Event>{
    const getUrl = `${this.url}/${id}`;
    return this.http.get<Event>(getUrl);
  }


  /** POST: add a new event to the server */
  addEvent(event: Event): Observable<Event> {
    const addUrl = `${this.url}/add`;
    return this.http.post<Event>(addUrl, event, httpOptions).pipe(tap((addEvent: Event) => this.log(`added event id=${event.id}`)), catchError(this.handleError<Event>('addEvent')));
  }

  deleteEvent(id: number): Observable<Event>{
    const deleteUrl = `${this.url}/${id}`;
    return this.http.delete<Event>(deleteUrl, httpOptions).pipe(catchError(this.handleError<Event>('deleteEvent')));
  }


  addEventToFav(eventId: number, username: string): Observable<Event> {
    const url = `http://localhost:8080/user/event/${eventId}`;
    return this.http.post<Event>(url, username, httpOptions).pipe(tap((eventAddToFav: Event) => this.log(`added event id=${eventId}`)), catchError(this.handleError<Event>('addEventToFav')));
  }


  updateEvent(event: Event, eventId: number): Observable<Event> {
    const patchUrl = `${this.url}/${eventId}`;
    return this.http.patch<Event>(patchUrl, event, httpOptions).pipe(tap((eventAddToFav: Event) => this.log(`updated event id=${event.id}`)), catchError(this.handleError<Event>('updateEvent')));;
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
    console.log('EventService: ' + message);
  }
}
