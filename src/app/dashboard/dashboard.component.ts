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
	colspan: number[];
	totalCols: number;

	constructor(
	    private dialog: MdDialog,
    	private clientsService: ClientsService,
	) {}

	ngOnInit() {
		this.client_table_headers = [
			'image',
			'name',
			'description',
			'outstanding'
		];

        this.clientsService.clients.subscribe(clients => {
            this.clients = clients;
        });

		this.colspan = [1,2,3,1];
		this.totalCols = this.arraySum(this.colspan);
	}

	openDialog() {
		this.dialog.open(DialogClientsComponent, {
			height: '435px',
			width: '600px'
		});
	}

	clientSelection(id) {
		this.clientsService.navigateToClientProjects(id);
	}

	getTableValueFromTableHeader(obj, key) {
        key = key.replace(/\s/ig, '_');
        return obj[key];
    }

    arraySum(array: number[]) {
		return array.reduce((sum, value) => {
			return sum + value;
		});
	}
}
