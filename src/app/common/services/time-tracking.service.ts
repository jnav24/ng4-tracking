import { Injectable } from '@angular/core';
import {AngularFireDatabase} from "angularfire2/database/database";
import {TimeTracking} from "../models/time-tracking.model";

@Injectable()
export class TimeTrackingService {
    tid: string;

    constructor(
        private af: AngularFireDatabase
    ) { }

    getAllTimes(pid) {
        return this.af.list('times', {
            query: {
                orderByChild: 'project_id',
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
}
