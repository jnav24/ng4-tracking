import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import {DashboardNavComponent} from "./dashboard-nav/dashboard-nav.component";
import {MdGridListModule, MdMenuModule, MdDialogModule} from "@angular/material";
import {CapitalizePipe} from "../common/pipes/capitalize.pipe";
import {ClientsService} from "../common/services/clients.service";
import {Router, ActivatedRoute} from "@angular/router";
import {SignInService} from "../sign-in/sign-in.service";
import {ActivatedRouteStub} from '../common/stubs/activated-route.stub';
import {ClientsServiceStub} from "../common/stubs/clients-service.stub";
import {RouterStub} from "../common/stubs/router.stub";
import {SignInServiceStub} from "../common/stubs/sign-in-service.stub";

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

    it('should match the sum to the expected value', () => {
        const actual = 7;
        const array = [1,2,3,1];
        const expected = component.arraySum(array);
        expect(actual).toEqual(expected);
    });
});
