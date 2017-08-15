import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogClientsComponent } from './dialog-clients.component';

describe('DialogClientsComponent', () => {
    let component: DialogClientsComponent;
    let fixture: ComponentFixture<DialogClientsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ DialogClientsComponent ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DialogClientsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
});
