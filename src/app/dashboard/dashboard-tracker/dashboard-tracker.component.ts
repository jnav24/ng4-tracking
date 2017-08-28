import { Component, OnInit } from '@angular/core';
import {MdDialog} from "@angular/material";
import {DialogTrackingComponent} from "../../dialog-tracking/dialog-tracking.component";
import {TimeTracking} from "../../common/models/time-tracking.model";
import {ProjectsService} from "../../common/services/projects.service";
import {Projects} from "../../common/models/projects.model";
import {ActivatedRoute} from "@angular/router";
import {ClientsService} from "../../common/services/clients.service";
import {Clients} from "../../common/models/clients.model";
import {TimeTrackingService} from "../../common/services/time-tracking.service";

@Component({
    selector: 'app-dashboard-tracker',
    templateUrl: './dashboard-tracker.component.html',
    styleUrls: ['./dashboard-tracker.component.scss']
})
export class DashboardTrackerComponent implements OnInit {
    active: boolean = false;
    client: Clients[];
    hour = '0'+0;
    minute = '0'+0;
    second = '0'+0;
    project: Projects[];
    tid: string;
    timer;
    trackings = [];
    total_hours;
    total_uninvoiced;

    constructor(
        private dialog: MdDialog,
        private clientsService: ClientsService,
        private projectsService: ProjectsService,
        private route: ActivatedRoute,
        private timeTrackingService: TimeTrackingService
    ) {}

    ngOnInit() {
        this.clientsService.cid = this.route.snapshot.params['cid'];
        this.projectsService.pid = this.route.snapshot.params['pid'];

        this.projectsService.getProjectById().subscribe(project => {
            this.project = project;
        });

        this.clientsService.getClientDetails(this.clientsService.cid).subscribe(client => {
            this.client = client;
        });

        this.timeTrackingService.getAllTimes(this.projectsService.pid).subscribe(times => {
            let all_times = [];
            let all_dates = [];
            let int = -1;

            times.map((time) => {
                let main_date = this.timeTrackingService.getDate(time.start_time);
                let full_date = main_date.getMonth().toString() + main_date.getDate().toString() + main_date.getFullYear().toString();

                if (all_dates.indexOf(full_date) < 0) {
                    if (typeof all_times[int] !== 'undefined') {
                        all_times[int].times = all_times[int].times.reverse();
                    }

                    int++;

                    all_dates.push(full_date);
                    all_times.push({
                        date: main_date,
                        times: []
                    });

                    all_times[int].times.push(time);
                }
                else {
                    all_times[int].times.push(time);
                }
            });

            const last_index = (all_times.length - 1);
            all_times[last_index].times = all_times[last_index].times.reverse();
            this.trackings = all_times.reverse();
            this.getTotalCalcHours();
        });
    }

    openDialog() {
        if (this.active) {
            this.stopTimer();
            this.toogleActiveState();
            return;
        }
        const todayD = this.timeTrackingService.getCurrentTimestampAsString();
        const dialogRef = this.dialog.open(DialogTrackingComponent, {
            data: {
                mode: 'new',
                time: new TimeTracking(this.projectsService.pid, todayD, todayD, '', '')
            },
            height: '365px',
            width: '600px'
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.tid = this.trackings[0].times[0].$key;
                this.startTimer();
                this.toogleActiveState();
            }
        });
    }

    openEditDialog(int: number, index: number) {
        let current_time = Object.assign({}, this.trackings[index]['times'][int]);
        current_time.start_time = this.timeTrackingService.getDate(current_time.start_time);
        current_time.end_time = this.timeTrackingService.getDate(current_time.end_time);
        current_time.tid = this.trackings[index]['times'][int].$key;

        this.dialog.open(DialogTrackingComponent, {
            data: {
                mode: 'edit',
                time: current_time
            },
            height: '435px',
            width: '600px'
        });
    }

    toogleActiveState() {
        this.active = !this.active;
    }

    calcHours(start: string, end: string) {
        const start_time = this.timeTrackingService.getCurrentTimestampFromUnixString(start);
        const end_time = this.timeTrackingService.getCurrentTimestampFromUnixString(end);

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
                total += parseFloat(this.calcHours(time.start_time, time.end_time).toString());
            });
        });

        this.total_hours = parseFloat(total.toString()).toFixed(2);
        this.getTotalUninvoiced();
    }

    getTotalUninvoiced() {
        if (this.project['rate'].trim() === '') {
            return this.total_uninvoiced = 0.00;
        }

        const amount = (this.total_hours*this.project['rate']);
        this.total_uninvoiced = parseFloat(amount.toString()).toFixed(2);
    }

    startTimer() {
        let hour = 0;
        let minute = 0;
        let second = 0;

        this.timer = setInterval(() => {
            second = second + 1;

            if (second > 59) {
                this.second = '0'+0;
                second = 0;
                minute++;
                this.minute = this.getTime(minute);

                if (minute > 59) {
                    this.minute = '0' + 0;
                    minute = 0;
                    hour++;
                    this.hour = this.getTime(hour);
                }
            }

            this.second = this.getTime(second);
        }, 1000);
    }

    stopTimer() {
        clearInterval(this.timer);
        this.resetTimer();
        const time = this.timeTrackingService.getCurrentTimestampAsString();
        this.timeTrackingService.addEndTime(this.tid, time);
    }

    private getTime(time) {
        if (time < 10) {
            return '0' + time;
        }

        return time;
    }

    private resetTimer() {
        this.hour = '0'+0;
        this.minute = '0'+0;
        this.second = '0'+0;
        this.timer = undefined;
    }
}
