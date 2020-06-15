import {Component, Input, OnInit} from '@angular/core';
import {EventsService} from "../events/events.service";
import {ActivatedRoute} from "@angular/router";
import { Event } from "../event";
import { Location } from "@angular/common";
import {TokenStorageService} from "../auth/token-storage.service";
import {UserComponent} from "../user/user.component";
import {User} from "../user/user";
import {UserService} from "../user/user.service";

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {

  event: Event = new Event();
  flag: boolean;
  private username: string;
  eventList: Event[] = [];
  adminView = false;

  constructor(private eventsService: EventsService, private route: ActivatedRoute, private location: Location,
              public token: TokenStorageService, private userService: UserService) {

  }

  ngOnInit(): void {
    this.getEvent();
    //this.userService.getUserEvents(this.token.getUsername()).subscribe(result => this.eventList = result);
    //this.flag = this.eventList.includes(this.event);
  }
  getEvent(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.eventsService.getEvent(id).subscribe(result => this.event = result);
  }

  goBack(): void {
    this.location.back();
  }

  addEventToFav(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.username = this.token.getUsername();
    this.eventsService.addEventToFav(id, this.username).subscribe();
    this.flag = true;
  }

/*
  addEventToFav(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.eventsService.addEventToFav(id, this.token.getUsername()).subscribe();
  }

 */
}
