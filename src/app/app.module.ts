// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule} from '@angular/router';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MdInputModule, MdSelectModule, MdRippleModule, MdButtonModule, MdCardModule, MdMenuModule, MdToolbarModule, MdIconModule, MdListModule, MdGridListModule, MdDialogModule, MdTooltipModule, MdCheckboxModule } from '@angular/material';
import { AngularFireModule } from 'angularfire2';
import {MomentModule} from "angular2-moment";

// providers
import { AngularFireDatabase } from "angularfire2/database/database";
import { AngularFireAuth } from "angularfire2/auth/auth";

// configs
import {RouterConfig} from './config/router.config';
import firebaseConfig from './config/firebase.config';

// services
import { SignInService } from './sign-in/sign-in.service';
import { ClientsService } from './common/services/clients.service';
import {ProjectsService} from "./common/services/projects.service";
import {TimeTrackingService} from "./common/services/time-tracking.service";

// components
import { AppComponent } from './app.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardNavComponent } from './dashboard/dashboard-nav/dashboard-nav.component';
import { DialogClientsComponent } from './dialog-clients/dialog-clients.component';
import { DialogProjectsComponent } from './dialog-projects/dialog-projects.component';
import { DashboardProjectsComponent } from './dashboard/dashboard-projects/dashboard-projects.component';
import { DashboardTrackerComponent } from './dashboard/dashboard-tracker/dashboard-tracker.component';
import { DialogTrackingComponent } from './dialog-tracking/dialog-tracking.component';

// pipes
import { CapitalizePipe } from './common/pipes/capitalize.pipe';
import { DialogAddressComponent } from './dialog-address/dialog-address.component';
import { DialogContactComponent } from './dialog-contact/dialog-contact.component';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    DashboardComponent,
    DashboardNavComponent,
    DialogClientsComponent,
    CapitalizePipe,
    DashboardProjectsComponent,
    DialogProjectsComponent,
    DashboardTrackerComponent,
    DialogTrackingComponent,
    DialogAddressComponent,
    DialogContactComponent
  ],
  imports: [
    AngularFireModule.initializeApp(firebaseConfig),
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    MdInputModule,
    MdSelectModule,
    MdRippleModule,
    MdButtonModule,
    MdCardModule,
    MdMenuModule,
    MdToolbarModule,
    MdIconModule,
    MdListModule,
    MdGridListModule,
    MdDialogModule,
    MdTooltipModule,
    MdCheckboxModule,
    MomentModule,
    RouterModule.forRoot(RouterConfig),
    ReactiveFormsModule
  ],
    entryComponents: [
        DialogAddressComponent,
        DialogContactComponent,
        DialogClientsComponent,
        DialogProjectsComponent,
        DialogTrackingComponent,
    ],
  providers: [
    AngularFireDatabase,
    AngularFireAuth,
    SignInService,
    ClientsService,
    ProjectsService,
    TimeTrackingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
