import {Observable, Subject} from 'rxjs';

export class ActivatedRouteStub {
    private subject = new Subject();
    snapshot = {
        params: Observable.of({})
    };

    set testParams(params: any) {
        this.snapshot.params = Observable.of(params);
    }

    get params() {
        return this.subject.asObservable();
    }

    push(value) {
        this.subject.next(value);
    }
}