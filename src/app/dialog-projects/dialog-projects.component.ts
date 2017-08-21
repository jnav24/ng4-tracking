import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProjectsService} from "../common/services/projects.service";

@Component({
    selector: 'app-dialog-projects',
    templateUrl: './dialog-projects.component.html',
    styleUrls: ['./dialog-projects.component.scss']
})
export class DialogProjectsComponent implements OnInit {
    new_project: FormGroup;

    constructor(
        private form: FormBuilder,
        private projectsService: ProjectsService
    ) { }

    ngOnInit() {
        this.new_project = this.form.group({
            project_name: ['', [Validators.required]],
            project_description: ['', []],
            project_budget: ['', []],
            project_price: ['', [Validators.required]],
        });
    }

    addProject() {
        this.projectsService.addProject(
            this.new_project.value.project_name,
            this.new_project.value.project_price,
            this.new_project.value.project_budget,
            this.new_project.value.project_description,
        ).then(result => {
            if (typeof result.key !== 'undefined') {
                this.projectsService.navigateToProjectsTracking(result.key);
            }
        }).catch(e => {
            console.log(e);
        });
    }
}
