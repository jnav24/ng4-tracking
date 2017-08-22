import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-dashboard-tracker',
    templateUrl: './dashboard-tracker.component.html',
    styleUrls: ['./dashboard-tracker.component.scss']
})
export class DashboardTrackerComponent implements OnInit {
    active: boolean = false;
    trackings = [
        {
            date: 'Tuesday 22 Aug',
            times: [
                {
                    title: 'Punch Boros',
                    description: 'punch him in the face',
                    start: '',
                    end: ''
                },
                {
                    title: 'Attack Aliens',
                    description: 'Find the alien leader and punch him in the face',
                    start: '',
                    end: ''
                }
            ]
        },
        {
            date: 'Monday 21 Aug',
            times: [
                {
                    title: 'Go Shopping',
                    description: 'There is a sale on seaweed that helps with hair growth',
                    start: '',
                    end: ''
                }
            ]
        }
    ];

    constructor() { }

    ngOnInit() {}

    toogleActiveState() {
        this.active = !this.active;
    }

    setTime(start, end) {
        return '4.20';
    }
}
