import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { UtilsProvider } from '../utils/utils';
import 'rxjs/add/operator/map';

@Injectable()
export class ApiProvider {

  // url para recuperar todas as musicas do banco
  private url: string = "http://www.sisvend.com.br/cifras/service/json2.php?key=f1f58e8c06b2a61ce13e0c0aa9473a72&q=musicas";

  // url para recuperar todos os repertórios do banco
  private urlRepert: string = "http://www.sisvend.com.br/cifras/service/json2.php?key=f1f58e8c06b2a61ce13e0c0aa9473a72&q=repertorios";

  constructor(
    public http: Http,
    private storage: Storage,
    private utilsProvider: UtilsProvider
  ) {
    //
  }

  public getAllCifras() {
    let cifras: any[] = [];
    return this.storage.forEach((value: any, key: string) => {
      if (key !== 'repertorios') {
        let cifra: any;
        cifra = value;
        cifras.push(cifra);
      }
    }).then(() => {
      return Promise.resolve(cifras);
    }).catch((error) => {
      return Promise.reject(error);
    });
  }

  public getAllByArtista(param: string) {
    let cifras: any[] = [];
    return this.storage.forEach((value: any, key: string) => {
      if (key !== 'repertorios') {
        if (this.utilsProvider.removeAcento(value.grupo) == this.utilsProvider.removeAcento(param)) {
          let cifra: any;
          cifra = value;
          cifras.push(cifra);
        }
      }
    }).then(() => {
      return Promise.resolve(cifras);
    }).catch((error) => {
      return Promise.reject(error);
    });
  }

  public getAllByTom(param: string) {
    let cifras: any[] = [];
    return this.storage.forEach((value: any, key: string) => {
      if (key !== 'repertorios') {
        if (value.tom == param) {
          let cifra: any;
          cifra = value;
          cifras.push(cifra);
        }
      }
    }).then(() => {
      return Promise.resolve(cifras);
    }).catch((error) => {
      return Promise.reject(error);
    });
  }

  public getArtistaGroup() {
    let cifras: any[] = [];
    return this.storage.forEach((value: any, key: string) => {
      if (key !== 'repertorios') {
        let cifra: any;
        cifra = value;
        cifras.push(cifra);
      }
    }).then(() => {
      let group = (arr, k) => arr.reduce((r, c) => (r[c[k]] = [...r[c[k]] || [], c], r), {});
      let grouped: any[] = group(cifras, 'grupo');
      let artistas: any[] = [];
      Object.keys(grouped).map(function (key) {
        let artista: any = [];
        artista['grupo'] = key;
        artista['qtdmusicas'] = grouped[key].length;
        artistas.push(artista);
      });
      return Promise.resolve(artistas);
    }).catch((error) => {
      return Promise.reject(error);
    });
  }

  public getTomGroup() {
    let cifras: any[] = [];
    return this.storage.forEach((value: any, key: string) => {
      if (key !== 'repertorios') {
        let cifra: any;
        cifra = value;
        cifras.push(cifra);
      }
    }).then(() => {
      let group = (arr, k) => arr.reduce((r, c) => (r[c[k]] = [...r[c[k]] || [], c], r), {});
      let grouped: any[] = group(cifras, 'tom');
      let tons: any[] = [];
      Object.keys(grouped).map(function (key) {
        let tom: any = [];
        tom['tom'] = key;
        tom['qtdmusicas'] = grouped[key].length;
        tons.push(tom);
      });
      return Promise.resolve(tons);
    }).catch((error) => {
      return Promise.reject(error);
    });
  }

  public getCifraById(param: string) {
    let cifra: any;
    return this.storage.forEach((value: any, key: string) => {
      if (key !== 'repertorios') {
        if (value.id == param) {
          cifra = value;
        }
      }
    }).then(() => {
      return Promise.resolve(cifra);
    }).catch((error) => {
      return Promise.reject(error);
    });
  }

  public getRepertorios() {
    let repertorios: any;
    return this.storage.get('repertorios').then(value => {
      repertorios = value;
    }).then(() => {
      return Promise.resolve(repertorios);
    }).catch((error) => {
      return Promise.reject(error);
    });
  }

  /*
  // offline/localdata
  */
  loadData() {
    this.http.get(this.url).map(res => res.json())
      .subscribe(data => {
        for (let i of data.data) {
          this.insert(i);
        }
        this.http.get(this.urlRepert).map(res => res.json())
          .subscribe(data => {
            this.save('repertorios', data.data);
          });
        this.utilsProvider.showToast('Sincronizado com servidor.', 'bottom', 2500);
      });
  }

  // add in storage
  public insert(cifra: any) {
    let key = cifra.id;
    return this.save(key, cifra);
  }

  // save in storage
  private save(key: string, cifra: any) {
    return this.storage.set(key, cifra);
  }

}
