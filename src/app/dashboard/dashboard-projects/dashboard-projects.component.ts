import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ClientsService} from "../../common/services/clients.service";
import {ProjectsService} from "../../common/services/projects.service";
import {Clients} from "../../common/models/clients.model";

@Component({
  selector: 'app-dashboard-projects',
  templateUrl: './dashboard-projects.component.html',
  styleUrls: ['./dashboard-projects.component.scss']
})
export class DashboardProjectsComponent implements OnInit {
  client: Clients;
  showAddressForm: boolean = false;
  showContactForm: boolean = false;

  constructor(
      private route: ActivatedRoute,
      private clientsService: ClientsService,
      private projectsService: ProjectsService
  ) { }

  ngOnInit() {
      this.projectsService.cid = this.route.snapshot.params['cid'];
      this.clientsService.cid = this.route.snapshot.params['cid'];
      this.clientsService.getClientDetails().subscribe(client => {
          console.log(client);
          this.client = client;
      });
  }

  toggleAddressForm() {
      this.showAddressForm = !this.showAddressForm;
  }

  toggleContactForm() {
      this.showContactForm = !this.showContactForm;
  }
}
