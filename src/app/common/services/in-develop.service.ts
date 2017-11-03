import { Injectable } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';

@Injectable()
export class InDevelopService {
    constructor(
        private af: AngularFireDatabase
    ) { }

    getRegistration() {
        return this.af.database
            .ref('in-develop/registration');
    }
}
