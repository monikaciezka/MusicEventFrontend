import { Component, OnInit } from '@angular/core';
import {EventsService} from "../events/events.service";
import {Event} from "../event";
import {isNegativeNumberLiteral} from "tslint";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  private date: string;
  private price: number;

  constructor(private eventsService: EventsService) { }

  ngOnInit(): void {
  }

  addEvent(band: string, city: string, description: string): void {
    band = band.trim();
    city = city.trim();
    description = description.trim();

    this.eventsService.addEvent({band, city, description} as Event).subscribe();
  }


}
