import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {SignInService} from '../../sign-in/sign-in.service';

@Component({
  selector: 'dashboard-nav',
  templateUrl: './dashboard-nav.component.html',
  styleUrls: ['./dashboard-nav.component.scss']
})
export class DashboardNavComponent implements OnInit {
    constructor(
        private signInService: SignInService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit() {
        const uid = this.route.snapshot.params['uid'];
        this.signInService.authLogin(uid);
    }

    logOut() {
        this.signInService.logOutAndRedirect();
    }

    navigateToClientsPage() {
        this.router.navigate(['dashboard', this.signInService.uid]);
    }
}
