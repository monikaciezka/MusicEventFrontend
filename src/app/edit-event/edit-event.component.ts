import { Component, OnInit } from '@angular/core';
import {EventsService} from "../events/events.service";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {TokenStorageService} from "../auth/token-storage.service";
import {Event} from "../event";

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent implements OnInit {

  event: Event = new Event();
  constructor(private eventsService: EventsService, private route: ActivatedRoute, private location: Location,
              public token: TokenStorageService) { }

  ngOnInit(): void {
    this.getEvent();
  }

  getEvent(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.eventsService.getEvent(id).subscribe(result => this.event = result);
  }
  updateEvent(band: string, city: string, description: string): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.eventsService.updateEvent({band, city, description} as Event, id).subscribe();
  }

  goBack(): void {
    this.location.back();
  }
}
