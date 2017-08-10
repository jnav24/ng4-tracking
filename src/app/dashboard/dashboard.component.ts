import { Component, OnInit } from '@angular/core';
import {MdDialog} from '@angular/material';
import {DialogClientsComponent} from "../dialog-clients/dialog-clients.component";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
	heroes = [];
	client_table_headers: string[] = [];
	table_keys: string[];

	constructor(private dialog: MdDialog) {}

	ngOnInit() {
		// this.heroes = [
		// 	{
		// 		id: '1',
		// 		name: 'Batman',
		// 		description: 'I am batman!'
		// 	},
		// 	{
		// 		id: '2',
		// 		name: 'Superman',
		// 		description: ''
		// 	}
		// ];

		this.client_table_headers = [
			'id',
			'name',
			'description',
		];

		// this.table_keys = Object.keys(this.heroes[0]);
		// console.log(this.table_keys);
	}

	openDialog() {
		this.dialog.open(DialogClientsComponent, {
			height: '400px',
			width: '600px',
		});
	}

	clientSelection(id) {
		alert('the id is... ' + id);
	}
}
