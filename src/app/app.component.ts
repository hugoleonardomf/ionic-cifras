import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MusicasPage } from '../pages/musicas/musicas';
import { ArtistasPage } from '../pages/artistas/artistas';
import { TonalidadesPage } from '../pages/tonalidades/tonalidades';
import { RepertoriosPage } from '../pages/repertorios/repertorios';
import { AcordesCavacoPage } from '../pages/acordes-cavaco/acordes-cavaco';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
	
  @ViewChild(Nav) nav: Nav;

  rootPage: any = MusicasPage;  
  //rootPage: any = ArtistasPage;
  //rootPage: any = TonalidadesPage;

  pages: Array<{title: string, component: any}>;
  pagesAcordes: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
	  
    this.initializeApp();

    this.pages = [
      { title: 'Músicas', component: MusicasPage },		  
	  { title: 'Artistas', component: ArtistasPage },		  
	  { title: 'Tonalidades', component: TonalidadesPage },
      { title: 'Repertórios', component: RepertoriosPage },
    ];
    this.pagesAcordes = [
      { title: 'Cavaco/Banjo', component: AcordesCavacoPage },
    ];	

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
