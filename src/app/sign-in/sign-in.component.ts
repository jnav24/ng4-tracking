import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { SignInService } from './sign-in.service';
import {InDevelopService} from '../common/services/in-develop.service';
import { Users } from '../common/models/users.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {trigger, state, style, animate, transition} from '@angular/animations';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  animations: [
      trigger('animateSwitchForm', [
          state('switch-start', style({
              backgroundColor: '#fff',
              opacity: 1,
              top: '50px',
              zIndex: 1
          })),
          state('switch-finish', style({
              backgroundColor: '#000',
          })),
          transition('switch-start => switch-finish', [
              animate( 500, style({
                  backgroundColor: '#cfc',
                  opacity: 0,
                  top: '-999px',
                  zIndex: 1
              }))
          ])
      ]),
      trigger('animateFadeForm', [
          state('fade-start', style({
              opacity: 0
          })),
          state('fade-finish', style({
              opacity: 1
          })),
          transition('fade-start => fade-finish', animate(500))
      ])
  ]
})
export class SignInComponent implements OnInit {
  log_error: string = '';
  reg_error: string = '';
  isLogin: boolean;
  log_in: FormGroup;
  sign_up: FormGroup;
  password_reset: FormGroup;
  passwordReset: boolean = false;
  passwordReset_error: boolean = false;
  animateLoginSwitchState: string;
  animateLoginFadeState: string;
  animateSigninSwitchState: string;
  animateSigninFadeState: string;
  animatePasswordSwitchState: string;
  animatePasswordFadeState: string;
  url: any;
  disallow_register: boolean;

  constructor(
      private route: ActivatedRoute,
      private signInService: SignInService,
      private inDevelopService: InDevelopService,
      private router: Router,
      private fb: FormBuilder) { }

  ngOnInit() {
      this.inDevelopService.getRegistration()
          .once('value', (snap) => {
              this.disallow_register = snap.val();
          });

      this.log_in = this.fb.group({
          email: ['', [Validators.required, Validators.pattern(/\S+@\S+\.\S+/)]],
          password: ['', [Validators.required]],
          remember_me: ['', []]
      });

    this.sign_up = this.fb.group({
        first_name: ['', [Validators.required, Validators.minLength(3)]],
        last_name: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.pattern(/\S+@\S+\.\S+/)]],
        password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(24)]],
        confirm_password: ['', [Validators.required]],
    });

    this.password_reset = this.fb.group({
        email: ['', [Validators.required, Validators.pattern(/\S+@\S+\.\S+/)]],
    });

    this.url = this.route.snapshot.url;
    this.isLogin = (!this.url.length || this.url[0].path === 'login');

    if (this.url.length && this.url[0].path === 'register') {
        this.animateToSignUp();
    }
    else {
        this.animateToLogin();
    }
  }

  registerUser() {
    const email = this.sign_up.value.email;
    const password = this.sign_up.value.password;

    this.signInService.createNewUser(email, password)
        .then(auth => {
          auth.getIdToken().then(token => {
            this.signInService.addUser(new Users(
                email,
                this.sign_up.value.first_name,
                this.sign_up.value.last_name,
                '',
                true,
                false,
                token
            ), auth.uid);
            this.redirectUser(auth);
          });  
        })
        .catch(error => {
          this.reg_error = error.message;
        });
  }

  login() {
    this.signInService.loginUser(this.log_in.value.email, this.log_in.value.password)
        .then(auth => {
            auth.getIdToken().then(token => {
              if (this.log_in.value.remember_me) {
                this.signInService.setRememberMe(auth.uid);
              }
              this.signInService.saveToken(token, auth.uid);
              this.redirectUser(auth);
            });  
        })
        .catch(error => {
          this.log_error = error.message;
        });
  }

  private redirectUser(user) {
      if (user !== null && typeof user.uid !== 'undefined') {
          this.router.navigate(['dashboard', user.uid]);
      }
  }

  async resetPassword() {
      try {
          await this.signInService.resetPassword(this.password_reset.value.email);
          this.passwordReset = true;

          setTimeout(() => {
              this.passwordReset_error = false;
              this.password_reset.reset();
              this.passwordReset = false;
          }, 10000)
      }
      catch (err) {
          this.passwordReset_error = true;
      }
  }

  animateToSignUp() {
      this.animateLoginSwitchState = 'switch-finish';
      this.animateLoginFadeState = 'fade-start';
      this.animateSigninSwitchState = 'switch-start';
      this.animateSigninFadeState = 'fade-finish';
  }

  animateToLogin() {
      this.animateLoginSwitchState = 'switch-start';
      this.animateLoginFadeState = 'fade-finish';
      this.animateSigninSwitchState = 'switch-finish';
      this.animateSigninFadeState = 'fade-start';
      this.animatePasswordSwitchState = 'switch-finish';
      this.animatePasswordFadeState = 'fade-start';
  }

  animateToPasswordReset() {
      this.animateLoginSwitchState = 'switch-finish';
      this.animateLoginFadeState = 'fade-start';
      this.animatePasswordSwitchState = 'switch-start';
      this.animatePasswordFadeState = 'fade-finish';
  }
}
