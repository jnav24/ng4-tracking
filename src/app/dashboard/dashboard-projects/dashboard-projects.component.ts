import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ClientsService} from "../../common/services/clients.service";
import {ProjectsService} from "../../common/services/projects.service";
import {Clients} from "../../common/models/clients.model";
import {MdDialog} from "@angular/material";
import {DialogProjectsComponent} from "../../dialog-projects/dialog-projects.component";
import {Projects} from '../../common/models/projects.model';
import {DialogAddressComponent} from "../../dialog-address/dialog-address.component";
import {DialogContactComponent} from "../../dialog-contact/dialog-contact.component";

@Component({
    selector: 'app-dashboard-projects',
    templateUrl: './dashboard-projects.component.html',
    styleUrls: ['./dashboard-projects.component.scss']
})
export class DashboardProjectsComponent implements OnInit {
    client: Clients;
    projects: Projects[];
    project_table_headers: string[] = [];
    totalCols: number;
    colspan: number[];

    constructor(
        private clientsService: ClientsService,
        private dialog: MdDialog,
        private projectsService: ProjectsService,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        const cid = this.route.snapshot.params['cid'];

        this.clientsService.getClientDetails(cid).subscribe(client => {
            this.client = client;
            console.log(client);
        });

        this.projectsService.getAllProjects(cid).subscribe(projects => {
            this.projects = projects;
        });

        this.project_table_headers = [
            'name',
            'description',
            'budget',
            'rate'
        ];
        this.colspan = [2,3,1,1];
        this.totalCols = this.arraySum(this.colspan);
    }

    projectSelection(id) {
        this.projectsService.navigateToProjectsTracking(id);
    }

    openAddressDialog() {
        this.dialog.open(DialogAddressComponent, {
            height: '435px',
            width: '600px'
        });
    }

    openContactDialog() {
        this.dialog.open(DialogContactComponent, {
            height: '435px',
            width: '600px'
        });
    }

    openDialog() {
        this.dialog.open(DialogProjectsComponent, {
            height: '435px',
            width: '600px'
        });
    }

    arraySum(array: number[]) {
        return array.reduce((sum, value) => {
            return sum + value;
        });
    }
}
