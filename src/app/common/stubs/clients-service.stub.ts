import {Subject} from 'rxjs';

export class ClientsServiceStub {
    clients;
    private subject = new Subject();

    constructor() {
        this.getAllClients();
    }

    getAllClients() {
        this.clients = this.subject.asObservable();
    }
}