import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import {AngularFireAuth} from "angularfire2/auth";
import {Observable} from "rxjs";
import { Users } from '../common/models/users.model';
import * as firebase from 'firebase/app';

@Injectable()
export class SignInService {
  user: Observable<firebase.User>;
  uid: string;

  constructor(
      private af: AngularFireDatabase,
      private auth: AngularFireAuth,
      private router: Router) {
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

  setRememberMe(uid) {
    const user = this.af.object(`users/${uid}`);
    return user.update({ remember_me: true });
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

  authLogin(param_uid) {
    this.user.subscribe(user => {
      if (user === null) {
        this.router.navigate(['login']);
      }

      if (user.uid !== param_uid) {
        this.router.navigate(['dashboard', user.uid]);
      }

      this.getUser(user.uid).subscribe(user_data => {
        user.getIdToken().then(token => {
          if (token != user_data.token && !user_data.remember_me) {
            this.logOutAndRedirect();
          }
        });
      });

      this.uid = user.uid;
    });
  }

  resetPassword(email) {
      return this.auth.auth.sendPasswordResetEmail(email);
  }
}
