import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
	heroes = [];
	hero_headers: string[] = [];	

	constructor() { }

	ngOnInit() {
		this.hero_headers = [
			'ID',
			'Name',
			'Action'
		];
	}
}
