import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {UserComponent} from "./user/user.component";
import {EventsComponent} from "./events/events.component";
import {EventDetailsComponent} from "./event-details/event-details.component";
import {RegisterComponent} from "./register/register.component";
import {AdminComponent} from "./admin/admin.component";
import {EditEventComponent} from "./edit-event/edit-event.component";



const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'user', component: UserComponent},
  {path: 'events', component: EventsComponent},
  {path: 'signup', component: RegisterComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'details/:id', component: EventDetailsComponent},
  {path: 'edit/:id', component: EditEventComponent},
  {path: 'user/:username', component: UserComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
