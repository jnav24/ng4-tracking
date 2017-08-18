// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule} from '@angular/router';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MdInputModule, MdSelectModule, MdRippleModule, MdButtonModule, MdCardModule, MdMenuModule, MdToolbarModule, MdIconModule, MdListModule, MdGridListModule, MdDialogModule, MdTooltipModule, MdCheckboxModule } from '@angular/material';
import { AngularFireModule } from 'angularfire2';

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

// components
import { AppComponent } from './app.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardNavComponent } from './dashboard/dashboard-nav/dashboard-nav.component';
import { DialogClientsComponent } from './dialog-clients/dialog-clients.component';
import { DialogProjectsComponent } from './dialog-projects/dialog-projects.component';
import { DashboardProjectsComponent } from './dashboard/dashboard-projects/dashboard-projects.component';

// pipes
import { CapitalizePipe } from './common/pipes/capitalize.pipe';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    DashboardComponent,
    DashboardNavComponent,
    DialogClientsComponent,
    CapitalizePipe,
    DashboardProjectsComponent,
    DialogProjectsComponent
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
    RouterModule.forRoot(RouterConfig),
    ReactiveFormsModule
  ],
    entryComponents: [
        DialogClientsComponent,
        DialogProjectsComponent,
    ],
  providers: [
    AngularFireDatabase,
    AngularFireAuth,
    SignInService,
    ClientsService,
    ProjectsService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
