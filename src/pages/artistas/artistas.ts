import { Component } from '@angular/core';
import { NavController, ModalController, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import { MusicasPage } from '../musicas/musicas';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-artistas',
  templateUrl: 'artistas.html'
})

export class ArtistasPage {
		
  public items: Array<any>;  
  public itemsStored: Array<any>;  
  private url: string = "http://www.sisvend.com.br/cifras/service/json.php?key=f1f58e8c06b2a61ce13e0c0aa9473a72&q=artistas";  

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public loadingCtrl: LoadingController, public http: Http) {
	  this.fetchContent();
  }
  
  fetchContent ():void {
    let loading = this.loadingCtrl.create({
      content: 'Carregando...'
    });
    loading.present();
    this.http.get(this.url).map(res => res.json())
      .subscribe(data => {
        this.items = data.data;
		this.itemsStored = data.data;
		loading.dismiss();
    });  
  }  
  
  getItems(ev: any) {
	// reset list
	this.items = this.itemsStored;
    // set val to the value of the searchbar
    let val = ev.target.value;
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (this.removeAcento(item.grupo).toLowerCase().indexOf(this.removeAcento(val).toLowerCase()) > -1);
      })
    }
	else {
		//this.fetchContent();
		this.items = this.itemsStored;
	}
  }  
  
  itemSelected(item: any) {
	this.navCtrl.push(MusicasPage, {
      grupoParam: item.grupo
    });
  }   
  
  removeAcento(value) {
    return value.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
  }  

}
