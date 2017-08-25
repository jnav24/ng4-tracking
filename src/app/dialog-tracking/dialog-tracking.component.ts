import {Component, OnInit, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MdDialogRef, MD_DIALOG_DATA} from "@angular/material";
import {TimeTrackingService} from "../common/services/time-tracking.service";

@Component({
    selector: 'app-dialog-tracking',
    templateUrl: './dialog-tracking.component.html',
    styleUrls: ['./dialog-tracking.component.scss']
})
export class DialogTrackingComponent implements OnInit {
    new_time: FormGroup;

    constructor(
        private dialogRef: MdDialogRef<DialogTrackingComponent>,
        @Inject(MD_DIALOG_DATA) private data: any,
        private form: FormBuilder,
        private timeTrackingService: TimeTrackingService
    ) {}

    ngOnInit() {
        if (this.data.mode === 'new') {
            this.new_time = this.form.group({
                time_name: ['', [Validators.required]],
                time_description: ['', []],
            });
        }
        else {
            this.new_time = this.form.group({
                time_name: ['', [Validators.required]],
                time_description: ['', []],
                time_start: ['', [Validators.required, Validators.pattern(/^[0-2][0-3]:[0-5][0-9]$/)]],
                time_end: ['', [Validators.required, Validators.pattern(/^[0-2][0-3]:[0-5][0-9]$/)]],
            });
        }
    }

    addTimeEntry() {
        this.timeTrackingService.addTime(
            this.new_time.value.time_name,
            this.data.time.start_time,
            this.new_time.value.time_description,
            this.data.time.projects_id
        ).then(result => {

        }).catch(e => {
            console.log(e);
        });
    }
}
