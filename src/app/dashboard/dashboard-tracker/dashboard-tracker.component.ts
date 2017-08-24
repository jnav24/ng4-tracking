import { Component, OnInit } from '@angular/core';
import {MdDialog} from "@angular/material";
import {DialogTrackingComponent} from "../../dialog-tracking/dialog-tracking.component";
import {TimeTracking} from "../../common/models/time-tracking.model";

@Component({
    selector: 'app-dashboard-tracker',
    templateUrl: './dashboard-tracker.component.html',
    styleUrls: ['./dashboard-tracker.component.scss']
})
export class DashboardTrackerComponent implements OnInit {
    active: boolean = false;
    trackings = [
        {
            date: new Date('August 22, 2017 00:00:00'),
            times: [
                {
                    title: 'Punch Boros',
                    description: 'punch him in the face',
                    start_time: new Date('August 22, 2017 08:00:00'),
                    end_time: new Date('August 22, 2017 15:00:00')
                },
                {
                    title: 'Attack Aliens',
                    description: 'Find the alien leader and punch him in the face',
                    start_time: new Date('August 22, 2017 07:00:00'),
                    end_time: new Date('August 22, 2017 14:00:00')
                }
            ]
        },
        {
            date: new Date('August 21, 2017 00:00:00'),
            times: [
                {
                    title: 'Go Shopping',
                    description: 'There is a sale on seaweed that helps with hair growth',
                    start_time: new Date('August 22, 2017 10:00:00'),
                    end_time: new Date('August 22, 2017 17:00:00')
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
        const todayD = new Date();
        const dialogRef = this.dialog.open(DialogTrackingComponent, {
            data: {
                mode: 'new',
                time: new TimeTracking('null', todayD, todayD, '', '', 'null')
            },
            height: '365px',
            width: '600px'
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.toogleActiveState();
            }
        });
    }

    openEditDialog(int: number, index: number) {
        console.log(this.trackings[index]['times'][int]);
        const dialogRef = this.dialog.open(DialogTrackingComponent, {
            data: {
                mode: 'edit',
                time: this.trackings[index]['times'][int]
            },
            height: '435px',
            width: '600px'
        });
    }

    toogleActiveState() {
        this.active = !this.active;
    }

    setTime(start, end) {
        return '4.20';
    }
}
