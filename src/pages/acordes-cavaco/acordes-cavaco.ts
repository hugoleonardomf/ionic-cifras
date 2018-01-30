import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-acordes-cavaco',
  templateUrl: 'acordes-cavaco.html',
})
export class AcordesCavacoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
	  //
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AcordesCavacoPage');
  }

}
