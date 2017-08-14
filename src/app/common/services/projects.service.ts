import { Injectable } from '@angular/core';
import {FirebaseListObservable} from "angularfire2/database/firebase_list_observable";
import {Projects} from "../models/projects.model";
import {AngularFireDatabase} from "angularfire2/database/database";

@Injectable()
export class ProjectsService {
    cid: string;
    projects: FirebaseListObservable<Projects[]>;

    constructor(private af: AngularFireDatabase) { }

    getAllProjects() {
        this.projects = this.af.list('clients', {
            query: {
                orderByChild: 'cid',
                equalTo: this.cid
            }
        });
    }
}
