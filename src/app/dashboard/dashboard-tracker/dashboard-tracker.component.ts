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
                    start_time: new Date('August 22, 2017 08:27:19'),
                    end_time: new Date('August 22, 2017 14:36:23')
                },
                {
                    title: 'Attack Aliens',
                    description: 'Find the alien leader and punch him in the face',
                    start_time: new Date('August 22, 2017 07:16:00'),
                    end_time: new Date('August 22, 2017 15:26:00')
                }
            ]
        },
        {
            date: new Date('August 21, 2017 00:00:00'),
            times: [
                {
                    title: 'Go Shopping',
                    description: 'There is a sale on seaweed that helps with hair growth',
                    start_time: new Date('August 22, 2017 10:03:00'),
                    end_time: new Date('August 22, 2017 17:48:00')
                }
            ]
        }
    ];
    total_hours = 0.00;

    constructor(private dialog: MdDialog) { }

    ngOnInit() {
        this.getTotalCalcHours();
    }

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

    calcHours(start: Date, end: Date) {
        const start_time = start.getTime();
        const end_time = end.getTime();

        if (start_time > end_time) {
            return 4.20;
        }

        const exact_hours = Math.abs(end_time - start_time)/(60*60*1000);

        return parseFloat(exact_hours.toString()).toFixed(2);
    }

    getTotalCalcHours() {
        let total = 0;

        this.trackings.map(tracking => {
            tracking.times.map(time => {
                let calc_time = this.calcHours(time.start_time, time.end_time);
                console.log(parseFloat(calc_time.toString()));
                total += parseFloat(this.calcHours(time.start_time, time.end_time).toString());
            });
        });

        this.total_hours = total;
    }
}
