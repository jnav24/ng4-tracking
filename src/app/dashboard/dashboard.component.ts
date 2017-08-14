import { Component, OnInit } from '@angular/core';
import {MdDialog} from '@angular/material';
import {DialogClientsComponent} from "../dialog-clients/dialog-clients.component";
import {Clients} from '../common/models/clients.model';
import {ClientsService} from '../common/services/clients.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
	  clients: Clients[];
	  client_table_headers: string[] = [];

	  constructor(
	      private dialog: MdDialog,
        private clientsService: ClientsService,
    ) {}

	  ngOnInit() {
		    this.client_table_headers = [
			      'id',
			      'name',
			      'description',
		    ];

        this.clientsService.clients.subscribe(clients => {
            this.clients = clients;
        });
	  }

	  openDialog() {
		    this.dialog.open(DialogClientsComponent, {
			      height: '370px',
			      width: '600px',
		    });
	  }

	  clientSelection(id) {
		    this.clientsService.navigateToClientProjects(id);
	  }

	  getTableValueFromTableHeader(obj, key) {
        key = key.replace(/\s/ig, '_');
        console.log(obj[key]);
        return obj[key];
    }
}
