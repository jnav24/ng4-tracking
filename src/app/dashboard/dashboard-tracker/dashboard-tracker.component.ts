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
            this.active = project.active;

            if (project.active) {
                const time_diff = this.timeTrackingService.getDifferenceBetweenTimes(project.time_left);
                this.hour = time_diff.format("HH");
                this.minute = time_diff.format("mm");
                this.second = time_diff.format("ss");
                this.startTimer(parseInt(this.hour,10), parseInt(this.minute,10), parseInt(this.second,10));
            }
        });

        this.clientsService.getClientDetails(this.clientsService.cid).subscribe(client => {
            this.client = client;
        });

        this.timeTrackingService.getAllTimes(this.projectsService.pid).subscribe(times => {
            if (times.length) {
                let all_times = [];
                let all_dates = [];
                let int = -1;

                times.map((time) => {
                    let main_date = this.timeTrackingService.getDateTime(time.start_time);
                    let full_date = main_date.format('MMDDYYYY');

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
                this.tid = this.trackings[0].times[0].$key;
            }
            else {
                this.total_hours = '0.00';
                this.total_uninvoiced = '0.00';
            }
        });
        console.log(this.active);
    }

    openDialog() {
        console.log(this.active);
        if (this.active) {
            this.stopTimer();
            this.active = false;
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
                this.setActiveState();
            }
        });
    }

    openEditDialog(int: number, index: number) {
        let current_time = Object.assign({}, this.trackings[index]['times'][int]);
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
        console.log(this.active);
    }

    calcHours(start: string, end: string) {
        const time_diff = this.timeTrackingService.getDifferenceBetweenTimes(start, end);
        const exact_hours = parseInt(time_diff.format("H"),10);
        const exact_mins = parseInt(time_diff.format("mm"), 10)/60;

        return parseFloat((exact_hours+exact_mins).toString()).toFixed(2);
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

    private startTimer(hour = 0, minute = 0, second = 0) {
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

    private stopTimer() {
        console.log(this.timer);
        console.log(clearInterval(this.timer));
        this.resetTimer();
        const time = this.timeTrackingService.getCurrentTimestampAsString();
        this.timeTrackingService.addEndTime(this.tid, time);
        this.projectsService.setActiveStatus(this.projectsService.pid, false, '0');
        console.log('hmm... end...');
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

    private setActiveState() {
        const time = this.timeTrackingService.getCurrentTimestampAsString();
        this.projectsService.setActiveStatus(this.projectsService.pid, true, time)
            .then(result => {
                this.startTimer();
                this.active = true;
            })
            .catch(e => {
                console.log(e);
            });
    }
}
