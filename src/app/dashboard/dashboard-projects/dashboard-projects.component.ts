import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ClientsService} from "../../common/services/clients.service";
import {ProjectsService} from "../../common/services/projects.service";
import {Clients} from "../../common/models/clients.model";
import {MdDialog} from "@angular/material";
import {DialogProjectsComponent} from "../../dialog-projects/dialog-projects.component";
import {Projects} from '../../common/models/projects.model';

@Component({
    selector: 'app-dashboard-projects',
    templateUrl: './dashboard-projects.component.html',
    styleUrls: ['./dashboard-projects.component.scss']
})
export class DashboardProjectsComponent implements OnInit {
    client: Clients;
    projects: Projects[];
    showAddressForm: boolean = false;
    showContactForm: boolean = false;
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
        });

        this.projectsService.getAllProjects(cid).subscribe(projects => {
            console.log(projects);
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

    toggleAddressForm() {
        this.showAddressForm = !this.showAddressForm;
    }

    toggleContactForm() {
        this.showContactForm = !this.showContactForm;
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
