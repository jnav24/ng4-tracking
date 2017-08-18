import { Injectable } from '@angular/core';
import {FirebaseListObservable} from "angularfire2/database/firebase_list_observable";
import {Projects} from "../models/projects.model";
import {AngularFireDatabase} from "angularfire2/database/database";

@Injectable()
export class ProjectsService {
    cid: string;
    projects: FirebaseListObservable<Projects[]>;

    constructor(private af: AngularFireDatabase) {}

    getAllProjects(cid) {
        this.cid = cid;
        return this.af.list('projects', {
            query: {
                orderByChild: 'clients_id',
                equalTo: cid
            }
        });
    }

    addProject(name, rate, budget, description) {
        return this.af.database.ref('projects')
            .push(
                new Projects(
                    this.cid,
                    name,
                    budget,
                    rate,
                    description
                )
            );
    }
}
