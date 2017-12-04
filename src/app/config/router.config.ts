import {Route} from '@angular/router';
import {SignInComponent} from '../sign-in/sign-in.component';
import {DashboardComponent} from '../dashboard/dashboard.component';
import {DashboardProjectsComponent} from "../dashboard/dashboard-projects/dashboard-projects.component";
import {DashboardTrackerComponent} from "../dashboard/dashboard-tracker/dashboard-tracker.component";
import {DashboardInvoiceComponent} from '../dashboard/dashboard-invoice/dashboard-invoice.component';

export const RouterConfig: Route[] = [
	{ path: '', component: SignInComponent },
	{ path: 'login', component: SignInComponent },
	{ path: 'register', component: SignInComponent },
	{
		path: 'dashboard',
		children: [
			{ path: ':uid', component: DashboardComponent },
			{ path: ':uid/:cid', component: DashboardProjectsComponent },
			{ path: ':uid/:cid/:pid', component: DashboardTrackerComponent },
      { path: 'invoice/:uid', component: DashboardInvoiceComponent }
		]
	},
	{ path: '**', redirectTo: 'login' },
];
