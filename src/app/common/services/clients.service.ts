import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {Clients} from "../models/clients.model";
import {FirebaseListObservable} from "angularfire2/database/firebase_list_observable";
import {SignInService} from "../../sign-in/sign-in.service";
import {Router} from "@angular/router";

@Injectable()
export class ClientsService {
    clients: FirebaseListObservable<Clients[]>;

    constructor(
        private router: Router,
        private af: AngularFireDatabase,
        private signinService: SignInService) {
        this.getAllClients();
    }

    getAllClients() {
        const uid = this.signinService.uid;
        this.clients = this.af.list('clients', {
            query: {
                orderByChild: 'uid',
                equalTo: uid
            }
        });
    }

    addClient(uid, name, description) {
        return this.af.database.ref('clients').push(new Clients(uid, name, description));
    }

    navigateToClientProjects(cid) {
        this.router.navigate([`dashboard/${this.signinService.uid}/${cid}`]);
    }
}