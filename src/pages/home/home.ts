import { Component } from '@angular/core';
import { Authentication } from '../../providers/auth'
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    private auth: Authentication) {

  }


  doLogout() {
    this.auth.doLogout()
  }
}
