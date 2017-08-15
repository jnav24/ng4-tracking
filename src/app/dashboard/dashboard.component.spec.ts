import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import {DashboardNavComponent} from "./dashboard-nav/dashboard-nav.component";
import {MdGridListModule, MdMenuModule, MdDialogModule} from "@angular/material";
import {CapitalizePipe} from "../common/pipes/capitalize.pipe";
import {ClientsService} from "../common/services/clients.service";
import {Router, ActivatedRoute} from "@angular/router";
import {SignInService} from "../sign-in/sign-in.service";
import {Observable, Subject} from 'rxjs';

class ActivatedRouteStub {
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
class RouterStub {}
class ClientsServiceStub {
    clients;
    private subject = new Subject();

    constructor() {
        this.getAllClients();
    }

    getAllClients() {
        this.clients = this.subject.asObservable();
    }
}
class SignInServiceStub {
    authLogin(uid) {}

    logOutAndRedirect() {}
}

describe('DashboardComponent', () => {
    let component: DashboardComponent;
    let fixture: ComponentFixture<DashboardComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                CapitalizePipe,
                DashboardComponent,
                DashboardNavComponent,
            ],
            imports: [
                MdDialogModule,
                MdGridListModule,
                MdMenuModule,
            ],
            providers: [
                { provide: ClientsService, useClass: ClientsServiceStub },
                { provide: Router, useClass: RouterStub},
                { provide: ActivatedRoute, useClass: ActivatedRouteStub},
                { provide: SignInService, useClass: SignInServiceStub }
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DashboardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should replace spaces with underscores', () => {
        const returnVal = "just testing";
        const test = {
            company_name: returnVal
        };

        const underscored = component.getTableValueFromTableHeader(test, 'company name');

        expect(underscored).toEqual(returnVal);
    });

    it('should not change the key', () => {
        const returnVal = "yup";
        const test = {
            name: returnVal
        };

        const expected = component.getTableValueFromTableHeader(test, 'name');

        expect(expected).toEqual(returnVal);
    });
});
