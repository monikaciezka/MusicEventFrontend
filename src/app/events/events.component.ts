import {Component, NgModule, OnInit} from '@angular/core';
import { Event } from "../event";
import { EventsService } from "./events.service";
import {TokenStorageService} from "../auth/token-storage.service";


@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  events: Event[] = [];
  info: any;
  list: Event[];
  constructor(private eventsService: EventsService, public token: TokenStorageService) {
  }


  ngOnInit(): void {
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorieties: this.token.getAuthorities()
    }
    this.getEvents();
    if(this.info.token){
      //this.getEvents();
      console.log(this.info.token);

    }
  }
  sortEventsDesc(): Event[] {
    return this.events.sort((a, b) => a.band > b.band ? -1 : a.band < b.band ? 1:0);
  }

  sortEventsAsc(): Event[] {
    return this.events.sort((a, b) => a.band < b.band ? -1 : a.band > b.band ? 1:0);
  }
  getEvents(): void{
    this.eventsService.getEvents().subscribe(result => this.events = result);
  }

  getBandConcerts(bandName: string): void {
    bandName.trim();
    if(bandName === ''){
      console.log("empty search");
      this.getEvents();
    } else {
    console.log(bandName);
    this.events = this.events.filter((a) => a.band === bandName);
    }
  }

  deleteEvent(id: number): void {
    this.eventsService.deleteEvent(id).subscribe();
    this.reloadPage();
  }

  reloadPage() {
    window.location.reload();
  }

  editEvent() {

  }
}
