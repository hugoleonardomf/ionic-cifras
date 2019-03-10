import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

@Injectable()
export class UtilsProvider {

  constructor(
    public toastCtrl: ToastController
  ) {
    //
  }

  showToast(text: string, position: string, duration: number) {
    let toast = this.toastCtrl.create({
      message: text,
      position: position,
      duration: duration
    });
    toast.present();
  }

  removeAcento(value) {
    return value.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
  }

  sortArray(array, property, direction) {
    direction = direction || 1;
    array.sort(function compare(a, b) {
      let comparison = 0;
      if (a[property] > b[property]) {
        comparison = 1 * direction;
      } else if (a[property] < b[property]) {
        comparison = -1 * direction;
      }
      return comparison;
    });
    return array; // Chainable
  }

}
