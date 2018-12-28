import { Component } from '@angular/core';
import { NavController, ModalController, LoadingController, NavParams, ActionSheetController, ToastController, reorderArray } from 'ionic-angular';
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
  public unlocked: boolean;
  public order: boolean;
  public modoAdd: string;

  private url: string = "http://www.sisvend.com.br/cifras/service/json.php?key=f1f58e8c06b2a61ce13e0c0aa9473a72&q=musicas";
  private urlAddMusic: string = "http://www.sisvend.com.br/cifras/service/json.php?key=f1f58e8c06b2a61ce13e0c0aa9473a72&q=repertorios";

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public loadingCtrl: LoadingController, public http: Http, public actionSheetCtrl: ActionSheetController, private toast: ToastController) {
    this.grupoParam = this.navParams.get('grupoParam');
    this.tomParam = this.navParams.get('tomParam');
    this.repertorioIdParam = this.navParams.get('repertorioIdParam');
    this.repertorioDescParam = this.navParams.get('repertorioDescParam');
    this.unlocked = this.navParams.get('unlocked');
    this.modoAdd = this.navParams.get('modoAdd');
    this.order = false;
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
    else if (this.repertorioIdParam && !this.modoAdd) {
      urlParam = this.url + "&repertorio_id=" + this.repertorioIdParam;
    }
    else if (this.repertorioIdParam && this.modoAdd) {
      urlParam = this.url + "&repertorio_id=" + this.repertorioIdParam + "&repertorio_modoAdd=1";
    }
    console.log(urlParam);
    this.http.get(urlParam).map(res => res.json())
      .subscribe(data => {
        this.items = data.data;
        this.itemsStored = data.data;
        loading.dismiss();
      });
  }

  setItemListAdd(item: any, idx: any) {
    if (this.items[idx].selecao == undefined) {
      if (this.items[idx].repertorio_id == this.repertorioIdParam) {
        this.items[idx].selecao = 0;
      }
      else {
        this.items[idx].selecao = 1;
      }
    }
    else {
      if (this.items[idx].selecao == 0) {
        this.items[idx].selecao = 1;
      }
      else {
        this.items[idx].selecao = 0;
      }
    }
    console.log(this.items[idx].selecao);
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
    if (this.modoAdd) return false;
    this.order = false;
    this.navCtrl.push(DetalhesPage, {
      cifraIdParam: item.id,
      listaParam: this.items
    });
  }

  salvarMusicasRepertorio() {
    let arr: Array<any>;
    arr = new Array();
    let aux = 0;
    for (let i of this.items) {
      if ((i.selecao != 0 && i.repertorio_id == this.repertorioIdParam) || i.selecao == 1) {
        arr[aux] = i.id;
        aux++;
      }
    }
    if (arr.length == 0) {
      this.toast.create({ message: 'Selecione ao menos 1 música para adicionar.', duration: 3000, position: 'bottom' }).present();
      return false;
    }
    if (this.items.length != this.itemsStored.length) { //modo pesquisa
      this.toast.create({ message: 'Saia do modo pesquisa para salvar todas as alterações.', duration: 3000, position: 'bottom' }).present();
      return false;
    }
    let urlParam = this.urlAddMusic;
    urlParam = urlParam + "&repertorio_id=" + this.repertorioIdParam + "&repertorio_arrMusic=" + arr;
    console.log(urlParam);
    this.http.get(urlParam).map(res => res.json())
      .subscribe(data => {
        this.navCtrl.pop();
      });
  }

  reorderItems(indexes) {
    this.items = reorderArray(this.items, indexes);
    console.log(this.items[indexes['from']].id + " > " + this.items[indexes['to']].id);
    console.log(indexes['from'] + " > " + indexes['to']);
    let arr: Array<any> = new Array();
    let aux = 0;
    for (let i of this.items) {
      arr[aux] = i.id + '|' + (aux + 1);
      aux++;
    }
    let urlParam = this.url + "&id=" + this.items[indexes['to']].id + "&repertorio_id=" + this.repertorioIdParam + "&repertorio_arrOrder=" + arr;
    console.log(urlParam);
    this.http.get(urlParam).map(res => res.json())
      .subscribe(data => {
        //handle update success
        //this.fetchContent();
        this.items = data.data;
        this.itemsStored = data.data;
      });
  }

  opcoesActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      //title: 'Escolha uma opção',
      buttons: [
        {
          text: this.order ? 'Cancelar Ordenação' : 'Ordenar Músicas',
          handler: () => {
            if (this.order) {
              this.order = false;
            }
            else {
              this.order = true;
            }
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

  removeAcento(value) {
    return value.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
  }

}
