import { Injectable } from '@angular/core';
import {AngularFireDatabase} from "angularfire2/database/database";
import {TimeTracking} from "../models/time-tracking.model";

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

    addTime(title, time, description, pid) {
        return this.af.database.ref('times')
            .push(
                new TimeTracking(
                    pid,
                    time,
                    time,
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
        return new Date().getTime().toString();
    }

    getCurrentTimestampFromUnixString(time: string): number {
        return this.getDate(time).getTime();
    }

    getDate(time): Date {
        return new Date(parseInt(time, 10));
    }
}