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
  public descricao: any;

  private url: string = "http://www.sisvend.com.br/cifras/service/json.php?key=f1f58e8c06b2a61ce13e0c0aa9473a72&q=repertorios";

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public loadingCtrl: LoadingController, public http: Http, private alertCtrl: AlertController) {
    this.fetchContent();
  }

  fetchContent(): void {
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

  inserir() {
    let alert = this.alertCtrl.create({
      title: 'Adicionar Repertório',
      inputs: [
        {
          name: 'descricao',
          placeholder: 'Informe uma descrição'
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
            console.log(data.descricao);
            let urlParams = this.url + "&repertorio_desc=" + data.descricao;
            this.http.get(urlParams).map(res => res.json())
              .subscribe(data => {
                console.log(data.data[0].descricao);
                this.fetchContent();
              });
          }
        }
      ]
    });
    alert.present();
  }

}
