import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-acordes-violao',
  templateUrl: 'acordes-violao.html',
})
export class AcordesViolaoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
	  //
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AcordesViolaoPage');
  }

}
