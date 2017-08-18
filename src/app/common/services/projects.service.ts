import { Injectable } from '@angular/core';
import {FirebaseListObservable} from "angularfire2/database/firebase_list_observable";
import {Projects} from "../models/projects.model";
import {AngularFireDatabase} from "angularfire2/database/database";

@Injectable()
export class ProjectsService {
    projects: FirebaseListObservable<Projects[]>;

    constructor(private af: AngularFireDatabase) {}

    getAllProjects(cid) {
        return this.af.list('projects', {
            query: {
                orderByChild: 'cid',
                equalTo: cid
            }
        });
    }
}
