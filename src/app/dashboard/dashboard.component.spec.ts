import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
    let component: DashboardComponent;
    let fixture: ComponentFixture<DashboardComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ DashboardComponent ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DashboardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should replace spaces with underscores', () => {
        const returnVal = "just testing";
        const test = {
            name: 'yup',
            company_name: returnVal
        };

        const underscored = component.getTableValueFromTableHeader(test, 'company name');
        component.getTableValueFromTableHeader(test, 'name');

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
