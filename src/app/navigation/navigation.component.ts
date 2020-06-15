import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../auth/token-storage.service";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(public token: TokenStorageService) { }

  ngOnInit(): void {
  }

  logout() {
    this.token.signOut();
//    window.location.reload();
  }
}
