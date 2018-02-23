import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, ModalController, Content } from 'ionic-angular';
import { Http } from '@angular/http';

@IonicPage()
@Component({
  selector: 'page-detalhes',
  templateUrl: 'detalhes.html',
})

export class DetalhesPage {

  @ViewChild(Content) content: Content;

  public items: Array<any>;
  public cifraId: string;
  public cifra: any;
  public index: number;
  public auxPrev: any;
  public auxNext: any;

  private url: string = "http://www.sisvend.com.br/cifras/service/json.php?key=f1f58e8c06b2a61ce13e0c0aa9473a72&q=musicas&id=";

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public loadingCtrl: LoadingController, public modalCtrl: ModalController, public http: Http) {
    this.items = this.navParams.get('listaParam');
    this.cifraId = this.navParams.get('cifraIdParam');
    this.setPrevNextItem();
    this.fetchContent();
  }

  fetchContent(): void {
    let loading = this.loadingCtrl.create({
      content: 'Carregando...'
    });
    loading.present();
    let paramsUrl = this.cifraId;
    this.http.get(this.url + paramsUrl).map(res => res.json())
      .subscribe(data => {
        this.cifra = data.data[0];
        loading.dismiss();
      });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  goPrevItem(): void {
    this.cifraId = this.items[this.auxPrev].id;
    this.setPrevNextItem();
    this.fetchContent();
  }

  goNextItem(): void {
    this.cifraId = this.items[this.auxNext].id;
    this.setPrevNextItem();
    this.fetchContent();
  }

  setPrevNextItem() {
    for (let i in this.items) {
      if (this.items[i].id == this.cifraId) {
        this.auxPrev = i;
        this.auxNext = i;
        this.index = this.auxPrev;
        this.index++;
        this.auxPrev--;
        this.auxNext++;
        break;
      }
    }
  }

  //scroll
  scrollBottom(): void {
    this.content.scrollToBottom();
  }
  scrollTop(): void {
    this.content.scrollToTop();
  }

}
