import { Component } from '@angular/core';
import { NavController, ModalController, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import { MusicasPage } from '../musicas/musicas';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-repertorios',
  templateUrl: 'repertorios.html'
})

export class RepertoriosPage {
	
  public items: Array<any>;  
  private url: string = "http://www.sisvend.com.br/cifrasService/json.php?key=f1f58e8c06b2a61ce13e0c0aa9473a72&q=repertorios";  

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
        loading.dismiss();
    });  
  }  
  
  itemSelected(item: any) {
	this.navCtrl.push(MusicasPage, {
      repertorioIdParam: item.id,
	  repertorioDescParam: item.descricao
    });
  }   

}
