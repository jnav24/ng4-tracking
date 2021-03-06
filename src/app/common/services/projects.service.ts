import { Injectable } from '@angular/core';
import {FirebaseListObservable} from "angularfire2/database/firebase_list_observable";
import {Projects} from "../models/projects.model";
import {AngularFireDatabase} from "angularfire2/database/database";
import {ClientsService} from "./clients.service";
import {SignInService} from "../../sign-in/sign-in.service";
import {Router} from "@angular/router";

@Injectable()
export class ProjectsService {
    pid: string;
    projects: FirebaseListObservable<Projects[]>;

    constructor(
        private af: AngularFireDatabase,
        private clientsService: ClientsService,
        private signInService: SignInService,
        private router: Router
    ) {}

    getAllProjects(cid) {
        return this.af.list('projects', {
            query: {
                orderByChild: 'clients_id',
                equalTo: cid
            }
        });
    }

    getProjectById() {
        return this.af.object(`projects/${this.pid}`);
    }

    addProject(name, rate, budget, description) {
        return this.af.database.ref('projects')
            .push(
                new Projects(
                    this.clientsService.cid,
                    name,
                    budget,
                    rate,
                    description,
                    false,
                    "0"
                )
            );
    }

    setPID(pid) {
        if (typeof this.pid === 'undefined') {
            this.pid = pid;
        }
    }

    navigateToProjectsTracking(id) {
        this.setPID(id);
        const uid = this.signInService.uid;
        const cid = this.clientsService.cid;
        this.router.navigate([`dashboard/${uid}/${cid}/${id}`]);
    }

    setActiveStatus(pid, active, time) {
        return this.af.database.ref(`projects/${pid}`)
            .update({
                active: active,
                time_left: time
            });
    }
}
