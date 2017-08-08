import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {SignInService} from '../../sign-in/sign-in.service';

@Component({
  selector: 'dashboard-nav',
  templateUrl: './dashboard-nav.component.html',
  styleUrls: ['./dashboard-nav.component.scss']
})
export class DashboardNavComponent implements OnInit {

  constructor(private signInService: SignInService, private router: Router) { }

  ngOnInit() {
    this.signInService.authLogin();
  }

  logOut() {
  	this.signInService.logOutAndRedirect();
  }

}
