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
	
  public cifraId : string;
  public cifra: any;

  //scroll
  public scrollRun: boolean;
  
  private url: string = "http://www.sisvend.com.br/cifrasService/json.php?key=f1f58e8c06b2a61ce13e0c0aa9473a72&q=musicas&id=";    

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public loadingCtrl: LoadingController, public modalCtrl: ModalController, public http: Http) {
      this.cifraId = this.navParams.get('cifraIdParam');
	  this.fetchContent();
	  this.scrollRun = false;
  } 
  
  fetchContent():void {
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

  //scroll
  scrollBottom():void {
	  this.content.scrollToBottom();
  }    
  scrollTop():void {
	  this.content.scrollToTop();
  }
  
  //rolagem automática
  playScroll():void {
	this.scrollRun = true;
	this.playScroll2();
  }
  
  playScroll2():void {
	this.scrollRun = true;
	//this.content.scrollToTop();
  }  
  
  pauseScroll():void {
	this.scrollRun = false;
	//this.content.scrollToTop();
  }  

}
