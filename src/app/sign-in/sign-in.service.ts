import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import {AngularFireAuth} from "angularfire2/auth";
import {Observable} from "rxjs";
import { Users } from '../common/models/users.model';
import * as firebase from 'firebase/app';

@Injectable()
export class SignInService {
  user: Observable<firebase.User>;

  constructor(private af: AngularFireDatabase, private auth: AngularFireAuth, private router: Router, private route: ActivatedRoute) {
    this.user = auth.authState;
  }

  addUser(user: Users, uid: string) {
    const users = this.af.object(`/users/${uid}`);
    return users.set(user);
  }

  createNewUser(email: string, pass: string): firebase.Promise<any> {
    return this.auth.auth.createUserWithEmailAndPassword(email, pass);
  }

  loginUser(email: string, pass: string): firebase.Promise<any> {
    return this.auth.auth.signInWithEmailAndPassword(email, pass);
  }

  logOutAndRedirect() {
    this.logoutUser()
      .then(auth => {
          this.router.navigate(['login']);
        })
        .catch(error => console.log(error));
  }

  logoutUser() {
    this.removeToken(this.auth.auth.currentUser.uid);
    return this.auth.auth.signOut();
  }

  saveToken(token, uid) {
    const user = this.af.object(`users/${uid}`);
    return user.update({ token: token});  
  }

  removeToken(uid) {
    const user = this.af.object(`users/${uid}`);
    return user.update({ token: '' });
  }

  private getUser(uid) {
    return this.af.object(`/users/${uid}`);
  }

  authLogin() {
    this.user.subscribe(user => {
      if (user === null) {
        this.router.navigate(['login']);
      }

      if (user.uid !== this.route.snapshot.params['uid']) {
        this.router.navigate(['dashboard', user.uid]);
      }

      this.getUser(user.uid).subscribe(user_data => {
        user.getToken().then(token => {
          if (token != user_data.token) {
            this.logOutAndRedirect();
          }          
        });
      });
    });
  }
}
