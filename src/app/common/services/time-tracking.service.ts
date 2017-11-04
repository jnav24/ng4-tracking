import { Injectable } from '@angular/core';
import {AngularFireDatabase} from "angularfire2/database/database";
import {TimeTracking} from "../models/time-tracking.model";
import * as moment from 'moment';

@Injectable()
export class TimeTrackingService {
    constructor(
        private af: AngularFireDatabase
    ) { }

    getAllTimes(pid) {
        return this.af.list('times', {
            query: {
                orderByChild: 'projects_id',
                equalTo: pid
            }
        });
    }

    addTime(title, start_time, end_time, description, pid) {
        return this.af.database.ref('times')
            .push(
                new TimeTracking(
                    pid,
                    start_time,
                    end_time,
                    description,
                    title
                )
            );
    }

    editTime(title, time, description, tid, pid) {
        return this.af.object(`times/${tid}`)
            .update(
                new TimeTracking(
                    pid,
                    time,
                    time,
                    description,
                    title
                )
            );
    }

    addEndTime(tid, time) {
        return this.af.object(`times/${tid}`).update({ end_time: time });
    }

    saveTime(title, start, end, description, pid, tid) {
        return this.af.database.ref(`times/${tid}`)
            .update(
                new TimeTracking(
                    pid,
                    start,
                    end,
                    description,
                    title
                )
            );
    }

    getCurrentTimestampAsString(): string {
        return moment().toString();
    }

    getDateTime(time: string = '') {
        let set_time = moment();

        if (time.trim() !== '') {
            set_time = moment(time);
        }

        return set_time;
    }

    setTime(time: string, obj: object) {
        return this.getDateTime(time).set(obj);
    }

    getDifferenceBetweenTimes(start, end = '') {
        let end_time = moment();

        if (end.trim() !== '') {
            end_time = moment(end);
        }

        return moment.utc(end_time.diff(moment(start)));
    }

    getCurrentDateTime() {
        return moment(new Date());
    }

    getTotalHoursByDay(start, end) {
        const day = this.getCurrentDateTime();

        if (day.format('MMDDYYYY') === moment(start).format('MMDDYYYY')) {
            const hour = parseInt(this.getDifferenceBetweenTimes(start, end).format('H'),10);
            const mins = parseInt(this.getDifferenceBetweenTimes(start, end).format('MM'),10)/60;
            return (hour + mins);
        }

        return 0.00;
    }

    getTotalHoursByWeek(start, end) {
        const day = this.getCurrentDateTime();
        const end_week = day.format('MMDDYYYY');
        const start_week = day.subtract(7, 'days').format('MMDDYYYY');
        const start_time = moment(start).format('MMDDYYYY');

        if (start_time < end_week && start_time > start_week) {
            const hour = parseInt(this.getDifferenceBetweenTimes(start, end).format('H'),10);
            const mins = parseInt(this.getDifferenceBetweenTimes(start, end).format('MM'),10)/60;
            return (hour + mins);
        }

        return 0.00;
    }

    getTotalUninvoiced(rate, start, end) {
        const hour = parseInt(this.getDifferenceBetweenTimes(start, end).format('H'),10);
        const mins = parseInt(this.getDifferenceBetweenTimes(start, end).format('MM'),10)/60;
        return (hour + mins)*rate;
    }
}
