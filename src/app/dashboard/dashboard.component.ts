import { Component, OnInit } from '@angular/core';
import {MdDialog} from '@angular/material';
import {DialogClientsComponent} from "../dialog-clients/dialog-clients.component";
import {Clients} from '../common/models/clients.model';
import {ClientsService} from '../common/services/clients.service';
import {ProjectsService} from "../common/services/projects.service";
import {TimeTrackingService} from "../common/services/time-tracking.service";
import {ActivatedRoute} from "@angular/router";

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
	today_total = 0.00;
	week_total = 0.00;
	uninvoiced_total = 0.00;

	constructor(
	    private dialog: MdDialog,
    	private clientsService: ClientsService,
		private projectsService: ProjectsService,
		private timeTrackingService: TimeTrackingService,
		private route: ActivatedRoute
	) {}

	ngOnInit() {
		this.client_table_headers = [
			'image',
			'name',
			'description',
			'outstanding'
		];

        this.clientsService.getAllClients(this.route.snapshot.params['uid']).subscribe(clients => {
            this.clients = clients;

            clients.map(client => {
            	this.projectsService.getAllProjects(client['$key']).subscribe(projects => {
            		projects.map(project => {
						this.timeTrackingService.getAllTimes(project['$key']).subscribe(times => {
            				times.map(time => {
            					this.today_total += this.timeTrackingService.getTotalHoursByDay(time.start_time, time.end_time);
            					this.week_total += this.timeTrackingService.getTotalHoursByWeek(time.start_time, time.end_time);
            					this.uninvoiced_total += this.timeTrackingService.getTotalUninvoiced(project.rate, time.start_time, time.end_time);
							});
						});
					});
				});
			});
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
