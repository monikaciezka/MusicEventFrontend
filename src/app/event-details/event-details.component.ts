import {Component,  OnInit} from '@angular/core';
import {EventsService} from "../events/events.service";
import {ActivatedRoute} from "@angular/router";
import { Event } from "../event";
import { Location } from "@angular/common";

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {

  event: Event;

  constructor(private eventsService: EventsService, private route: ActivatedRoute, private location: Location) { }

  ngOnInit(): void {
   // this.getEvent();
  }
  getEvent(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    console.log("got id:" + id);
    this.eventsService.getEvent(id).subscribe(result => this.event = result);
  }

  goBack(): void {
    this.location.back();
  }
}
