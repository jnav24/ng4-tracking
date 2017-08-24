import { Component, OnInit } from '@angular/core';
import {MdDialog} from "@angular/material";
import {DialogTrackingComponent} from "../../dialog-tracking/dialog-tracking.component";

@Component({
    selector: 'app-dashboard-tracker',
    templateUrl: './dashboard-tracker.component.html',
    styleUrls: ['./dashboard-tracker.component.scss']
})
export class DashboardTrackerComponent implements OnInit {
    active: boolean = false;
    trackings = [
        {
            date: '2017-08-22T23:00:00.000-01:00',
            times: [
                {
                    title: 'Punch Boros',
                    description: 'punch him in the face',
                    start: '',
                    end: ''
                },
                {
                    title: 'Attack Aliens',
                    description: 'Find the alien leader and punch him in the face',
                    start: '',
                    end: ''
                }
            ]
        },
        {
            date: '2017-08-21T23:00:00.000-01:00',
            times: [
                {
                    title: 'Go Shopping',
                    description: 'There is a sale on seaweed that helps with hair growth',
                    start: '',
                    end: ''
                }
            ]
        }
    ];

    constructor(private dialog: MdDialog) { }

    ngOnInit() {}

    openDialog() {
        if (this.active) {
            this.toogleActiveState();
            return;
        }

        const dialogRef = this.dialog.open(DialogTrackingComponent, {
            data: { msg: 'hello' },
            height: '435px',
            width: '600px'
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.toogleActiveState();
            }
        });
    }

    toogleActiveState() {
        this.active = !this.active;
    }

    setTime(start, end) {
        return '4.20';
    }
}
