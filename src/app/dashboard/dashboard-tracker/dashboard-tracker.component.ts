import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-dashboard-tracker',
    templateUrl: './dashboard-tracker.component.html',
    styleUrls: ['./dashboard-tracker.component.scss']
})
export class DashboardTrackerComponent implements OnInit {
    active: boolean = false;

    constructor() { }

    ngOnInit() {}

    toogleActiveState() {
        this.active = !this.active;
    }
}
