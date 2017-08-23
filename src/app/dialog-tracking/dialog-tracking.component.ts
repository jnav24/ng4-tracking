import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'app-dialog-tracking',
    templateUrl: './dialog-tracking.component.html',
    styleUrls: ['./dialog-tracking.component.scss']
})
export class DialogTrackingComponent implements OnInit {
    new_time: FormGroup;

    constructor(
        private form: FormBuilder) { }

    ngOnInit() {
        this.new_time = this.form.group({
            time_name: ['', [Validators.required]],
            time_description: ['', []],
            time_start: ['', [Validators.required, Validators.pattern(/^[0-2][0-3]:[0-5][0-9]$/)]],
            time_end: ['', [Validators.required, Validators.pattern(/^[0-2][0-3]:[0-5][0-9]$/)]],
        });
    }

    addTimeEntry() {}
}
