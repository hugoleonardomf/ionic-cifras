import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, ModalController, ActionSheetController, Content } from 'ionic-angular';
import { Http } from '@angular/http';
import { ElementRef } from '@angular/core';

@IonicPage()
@Component({
  selector: 'page-detalhes',
  templateUrl: 'detalhes.html',
})

export class DetalhesPage {

  @ViewChild(Content) content: Content;
  @ViewChild('divCifra') divCifra: ElementRef;

  public items: Array<any>;
  public cifraId: string;
  public cifra: any;
  public index: number;
  public auxPrev: any;
  public auxNext: any;

  private url: string = "http://www.sisvend.com.br/cifras/service/json.php?key=f1f58e8c06b2a61ce13e0c0aa9473a72&q=musicas&id=";

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public loadingCtrl: LoadingController, public modalCtrl: ModalController, public http: Http, public actionSheetCtrl: ActionSheetController) {
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
        this.scrollTop();
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

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Escolha uma opção',
      buttons: [
        {
          text: 'Texto muito pequeno',
          handler: () => {
            this.fontXSmall();
          }
        },
        {
          text: 'Texto pequeno',
          handler: () => {
            this.fontSmall();
          }
        },
        {
          text: 'Texto normal',
          handler: () => {
            this.fontNormal();
          }
        },
        {
          text: 'Texto grande',
          handler: () => {
            this.fontLarge();
          }
        },
        {
          text: 'Texto muito grande',
          handler: () => {
            this.fontXLarge();
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
 
    actionSheet.present();
  }

  fontXSmall(){
    this.divCifra.nativeElement.style.fontSize = "x-small";
  }

  fontSmall(){
    this.divCifra.nativeElement.style.fontSize = "small";
  }

  fontNormal(){
    this.divCifra.nativeElement.style.fontSize = "14px";
  }

  fontLarge(){
    this.divCifra.nativeElement.style.fontSize = "large";
  }

  fontXLarge(){
    this.divCifra.nativeElement.style.fontSize = "x-large";
  }

  //scroll
  scrollBottom(): void {
    this.content.scrollToBottom();
  }

  scrollTop(): void {
    this.content.scrollToTop();
  }

}
