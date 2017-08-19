import { Injectable } from '@angular/core';
import {FirebaseListObservable} from "angularfire2/database/firebase_list_observable";
import {Projects} from "../models/projects.model";
import {AngularFireDatabase} from "angularfire2/database/database";
import {ClientsService} from "./clients.service";

@Injectable()
export class ProjectsService {
    projects: FirebaseListObservable<Projects[]>;

    constructor(
        private af: AngularFireDatabase,
        private clientsService: ClientsService
    ) {}

    getAllProjects() {
        return this.af.list('projects', {
            query: {
                orderByChild: 'clients_id',
                equalTo: this.clientsService.cid
            }
        });
    }

    addProject(name, rate, budget, description) {
        return this.af.database.ref('projects')
            .push(
                new Projects(
                    this.clientsService.cid,
                    name,
                    budget,
                    rate,
                    description
                )
            );
    }
}
