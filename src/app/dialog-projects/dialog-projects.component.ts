import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'app-dialog-projects',
    templateUrl: './dialog-projects.component.html',
    styleUrls: ['./dialog-projects.component.scss']
})
export class DialogProjectsComponent implements OnInit {
    new_project: FormGroup;

    constructor(
        private form: FormBuilder
    ) { }

    ngOnInit() {
        this.new_project = this.form.group({
            project_name: ['', [Validators.required]],
            project_description: ['', []],
            project_budget: ['', []],
            project_price: ['', [Validators.required]],
        });
    }

    addProject() {}
}
