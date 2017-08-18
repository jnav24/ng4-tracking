import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {Clients} from "../models/clients.model";
import {FirebaseListObservable} from "angularfire2/database/firebase_list_observable";
import {SignInService} from "../../sign-in/sign-in.service";
import {Router} from "@angular/router";
import {ClientAddress} from "../models/client-address.model";
import {ClientContact} from "../models/client-contact.model";

@Injectable()
export class ClientsService {
    clients: FirebaseListObservable<Clients[]>;
    default_image: string = 'assets/images/logo-placeholder-1.png';

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

    addClient(uid, name, owner, description) {
        return this.af.database.ref('clients')
            .push(
                new Clients(
                    uid,
                    name,
                    description,
                    this.default_image,
                    owner,
                    [new ClientAddress('','','','','')],
                    [new ClientContact('','')]
                )
            );
    }

    navigateToClientProjects(cid) {
        this.router.navigate([`dashboard/${this.signinService.uid}/${cid}`]);
    }

    getClientDetails(cid) {
        return this.af.object(`clients/${cid}`);
    }
}