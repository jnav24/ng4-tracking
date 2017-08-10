import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {Observable} from 'rxjs';

@Injectable()
export class ClientsService {
    constructor(private af: AngularFireDatabase) {}

    getAllClients(uid: string) {
        return this.af.database.ref('clients').orderByChild('uid').equalTo(uid).on('value', (snap) => {
            console.log(snap);
        });
    }
}