import {Route} from '@angular/router';
import {SignInComponent} from '../sign-in/sign-in.component';
import {DashboardComponent} from '../dashboard/dashboard.component';

export const RouterConfig: Route[] = [
	{ path: '', component: SignInComponent },
	{ path: 'login', component: SignInComponent },
	{ path: 'register', component: SignInComponent },
	{ 
		path: 'dashboard/:uid',
		children: [
			{ path: '', component: DashboardComponent }
		]
	},
	{ path: '**', redirectTo: 'login' },
];