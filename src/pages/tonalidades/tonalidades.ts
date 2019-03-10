import { Component } from '@angular/core';
import { NavController, ModalController, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import { MusicasPage } from '../musicas/musicas';
import 'rxjs/add/operator/map';
import { ApiProvider } from '../../providers/api/api';
import { UtilsProvider } from '../../providers/utils/utils';

@Component({
  selector: 'page-tonalidades',
  templateUrl: 'tonalidades.html'
})

export class TonalidadesPage {

  public items: Array<any>;
  //private url: string = "http://www.sisvend.com.br/cifras/service/json.php?key=f1f58e8c06b2a61ce13e0c0aa9473a72&q=tons";

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    private apiProvider: ApiProvider,
    private utilsProvider: UtilsProvider,
    public http: Http
  ) {
    this.fetchContent();
  }

  fetchContent(): void {
    let loading = this.loadingCtrl.create({
      content: 'Carregando...'
    });
    loading.present();

    // this.http.get(this.url).map(res => res.json())
    //   .subscribe(data => {
    //     this.items = data.data;
    //     loading.dismiss();
    //   });

    this.apiProvider.getTomGroup()
      .then((result) => {
        result = this.utilsProvider.sortArray(result, "tom", 1);
        this.items = result;
        loading.dismiss();
      });

  }

  itemSelected(item: any) {
    this.navCtrl.push(MusicasPage, {
      tomParam: item.tom
    });
  }

}
