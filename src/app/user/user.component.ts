import { Component, OnInit } from '@angular/core';
import {UserService} from "./user.service";
import {ActivatedRoute} from "@angular/router";
import {User} from "./user";
import {TokenStorageService} from "../auth/token-storage.service";
import {Event} from "../event";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: User = new User();


  constructor(private userService: UserService, private route: ActivatedRoute, public tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    this.getUser(this.tokenStorage.getUsername());
  }

  getUser(username: string): void {
    this.userService.getUser(username).subscribe(result => this.user = result);
  }

  removeEvent(id: number): void {
    this.userService.deleteEventFav(id, this.tokenStorage.getUsername()).subscribe();
    this.reloadPage();
  }

  reloadPage() {
    window.location.reload();
  }
}
