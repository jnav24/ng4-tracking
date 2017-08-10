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
	hero_headers: string[] = [];	

	constructor(private dialog: MdDialog) {}

	ngOnInit() {
		this.heroes = [
			{
				id: '1',
				name: 'Batman',
			},
			{
				id: '2',
				name: 'Superman',
			}
		];
		this.hero_headers = [
			'ID',
			'Name',
			'Action'
		];
	}

	openDialog() {
		this.dialog.open(DialogClientsComponent, {
			height: '400px',
			width: '600px',
		});
	}
}
