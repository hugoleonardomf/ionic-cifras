import { Component } from '@angular/core';
import { NavController, ModalController, LoadingController, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import { MusicasPage } from '../musicas/musicas';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-repertorios',
  templateUrl: 'repertorios.html'
})

export class RepertoriosPage {

  public items: Array<any>;
  public tap: number = 0;
  public unlocked: boolean = false; //true/false

  private url: string = "http://www.sisvend.com.br/cifras/service/json.php?key=f1f58e8c06b2a61ce13e0c0aa9473a72&q=repertorios";

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public loadingCtrl: LoadingController, public http: Http, private alertCtrl: AlertController) {
    this.fetchContent();
  }

  fetchContent(): void {
    let loading = this.loadingCtrl.create({
      content: 'Carregando...'
    });
    loading.present();
    this.loadData();
    loading.dismiss();
  }

  loadData() {
    this.http.get(this.url).map(res => res.json())
      .subscribe(data => {
        this.items = data.data;
      });
  }

  ionViewDidEnter() {
    this.loadData();
  }

  itemSelected(item: any) {
    this.navCtrl.push(MusicasPage, {
      repertorioIdParam: item.id,
      repertorioDescParam: item.descricao,
      unlocked: this.unlocked
    });
  }

  addMusics(item: any) {
    this.navCtrl.push(MusicasPage, {
      repertorioIdParam: item.id,
      repertorioDescParam: item.descricao,
      modoAdd: true
    });
  }

  inserir() {
    let alert = this.alertCtrl.create({
      title: 'Adicionar Repertório',
      inputs: [
        {
          name: 'descricao',
          placeholder: 'Informe uma descrição',
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Salvar',
          handler: data => {
            let urlParams = this.url + "&repertorio_desc=" + data.descricao;
            console.log(urlParams);
            this.http.get(urlParams).map(res => res.json())
              .subscribe(data => {
                this.fetchContent();
              });
          }
        }
      ]
    });
    alert.present();
  }

  edit(item: any) {
    let alert = this.alertCtrl.create({
      title: 'Renomear Repertório',
      inputs: [
        {
          name: 'descricao',
          value: item.descricao
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Salvar',
          handler: data => {
            let urlParams = this.url + "&repertorio_id=" + item.id + "&repertorio_desc=" + data.descricao;
            this.http.get(urlParams).map(res => res.json())
              .subscribe(data => {
                this.fetchContent();
              });
          }
        }
      ]
    });
    alert.present();
  }

  remove(item: any) {
    let urlParams = this.url + "&repertorio_id=" + item.id + "&repertorio_sit=0";
    console.log(urlParams);
    this.http.get(urlParams).map(res => res.json())
      .subscribe(data => {
        this.fetchContent();
      });
  }

  confirmRemove(item: any) {
    let alert = this.alertCtrl.create({
      title: 'Deseja excluir o Repertório ' + item.descricao + '?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            //
          }
        },
        {
          text: 'Excluir',
          handler: () => {
            this.remove(item);
          }
        }
      ]
    });
    alert.present();
  }

  tapEvent(e) {
    this.tap++;
    this.unlocked = this.tap >= 5 ? true : false;
  }

}
