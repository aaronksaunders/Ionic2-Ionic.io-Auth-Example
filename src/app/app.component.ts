import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { Authentication } from '../providers/auth';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage; // = HomePage;
  currentUser;

  constructor(platform: Platform, private auth: Authentication) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });


    // subscribe to the activeUser to see if we should go to the LoginPage
    // or directly to the HomePage since we have a user
    this.auth.activeUser.subscribe((_user) => {

      // get the user...
      this.currentUser = _user

      // if user.. show data, else show login
      if (this.currentUser) {
        this.rootPage = HomePage;
      } else {
        this.rootPage = LoginPage;
      }
    })

    // check to see if there is already a user... Ionic saves it for you,
    // this will automatically log the user in when you restart the application
    this.auth.doCheckAuth();

  }
}
