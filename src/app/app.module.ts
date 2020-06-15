import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { UserComponent } from './user/user.component';
import { HomeComponent } from './home/home.component';
import { EventsComponent } from './events/events.component';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { EventDetailsComponent } from './event-details/event-details.component';
import { CommentsComponent } from './comments/comments.component';
import {httpInterceptorProviders} from './auth/auth-interceptor';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AdminComponent } from './admin/admin.component';
import { EditEventComponent } from './edit-event/edit-event.component';


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    UserComponent,
    HomeComponent,
    LoginComponent,
    EventsComponent,
    EventDetailsComponent,
    CommentsComponent,
    RegisterComponent,
    AdminComponent,
    EditEventComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
