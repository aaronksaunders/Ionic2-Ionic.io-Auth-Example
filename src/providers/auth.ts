import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import 'rxjs/add/operator/map';

import { Auth, User, IDetailedError } from '@ionic/cloud-angular';
/*
  Generated class for the Auth provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Authentication {

  // this will hold the user object when we have one, we can subscribe
  // to changes of this object to determine of we are logged in or not
  activeUser = new BehaviorSubject(null)

  constructor(private auth: Auth, private user: User, private zone: NgZone) {

  }

  /**
   * here we check to see if ionic saved a user for us
   */
  doCheckAuth() {
    if (this.auth.isAuthenticated()) {
      this.activeUser.next(Object.assign({}, this.user.details, { id: this.user.id }))
    }
  }

  /**
   * login using a username and password
   */
  doLogin(_username, _password?) {
    if (_username.length) {

      let details = { 'email': _username, 'password': _password };

      this.auth.login('basic', details).then((_result) => {
        // create the user object based on the data retrieved...
        this.activeUser.next(Object.assign({}, this.user.details, { id: this.user.id }))
      }, (err) => {
        console.log(err)
      });

    }
  }

  /**
   * create the user with the information and set the user object
   */
  doCreateUser(_params) {
    this.auth.signup({ email: _params.email, password: _params.password, username: _params.username })
      .then(() => {
        return this.doLogin(_params.email, _params.password);
      }, (err: IDetailedError<string[]>) => {
        console.log(err)
        for (let e of err.details) {
          if (e === 'conflict_email') {
            alert('Email already exists.');
          } else {
            // handle other errors
          }
        }
      });
  }

  /**
   * logout and remove the user...
   */
  doLogout() {
    this.auth.logout();
    this.activeUser.next(null)
  }
}
