import { Component } from '@angular/core';
import { NavController, ModalController, LoadingController, NavParams, reorderArray } from 'ionic-angular';
import { Http } from '@angular/http';
import { DetalhesPage } from '../detalhes/detalhes';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-musicas',
  templateUrl: 'musicas.html'
})

export class MusicasPage {

  public items: Array<any>;
  public itemsStored: Array<any>;
  public grupoParam: string;
  public tomParam: string;
  public repertorioIdParam: string;
  public repertorioDescParam: string;
  private url: string = "http://www.sisvend.com.br/cifrasService/json.php?key=f1f58e8c06b2a61ce13e0c0aa9473a72&q=musicas";

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public loadingCtrl: LoadingController, public http: Http) {
    this.grupoParam = this.navParams.get('grupoParam');
    this.tomParam = this.navParams.get('tomParam');
    this.repertorioIdParam = this.navParams.get('repertorioIdParam');
    this.repertorioDescParam = this.navParams.get('repertorioDescParam');
    this.fetchContent();
  }

  fetchContent(): void {
    let loading = this.loadingCtrl.create({
      content: 'Carregando...'
    });
    loading.present();
    let urlParam = this.url; //padrão, retorna todas as musicas
    if (this.grupoParam) {
      urlParam = this.url + "&grupo=" + this.removeAcento(this.grupoParam);
    }
    else if (this.tomParam) {
      urlParam = this.url + "&tom=" + this.tomParam.replace('+', '0').replace('#', 'Z');
    }
    else if (this.repertorioIdParam) {
      urlParam = this.url + "&repertorio_id=" + this.repertorioIdParam;
    }
    this.http.get(urlParam).map(res => res.json())
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
        return (this.removeAcento(item.titulo).toLowerCase().indexOf(this.removeAcento(val).toLowerCase()) > -1);
      })
    }
    else {
      //this.fetchContent();
      this.items = this.itemsStored;
    }
  }

  itemSelected(item: any) {
    this.navCtrl.push(DetalhesPage, {
      cifraIdParam: item.id
    });
  }

  reorderItems(indexes) {
    this.items = reorderArray(this.items, indexes);
    let indexToCustom;
    let qtdSubtract;
    if (indexes['to'] == 0) {
      console.log("primeiro item");
      indexToCustom = indexes['to'] + 1;
      qtdSubtract = 2;
    }
    else {
      indexToCustom = indexes['to'] - 1;
      qtdSubtract = 1;
    }
    console.log(indexes['from'] + " > " + indexes['to']);
    console.log(this.items[indexToCustom].ordem + "-" + this.items[indexToCustom].titulo);
    let urlParam = this.url + "&id=" + this.items[indexes['to']].id + "&orderTo=" + (this.items[indexToCustom].ordem - qtdSubtract);
    this.http.get(urlParam).map(res => res.json())
      .subscribe(data => {
        // handle update success
        this.fetchContent();
      });
  }

  removeAcento(value) {
    return value.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
  }

}
