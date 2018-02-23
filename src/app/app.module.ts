import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { MusicasPage } from '../pages/musicas/musicas';
import { ArtistasPage } from '../pages/artistas/artistas';
import { TonalidadesPage } from '../pages/tonalidades/tonalidades';
import { RepertoriosPage } from '../pages/repertorios/repertorios';
import { AcordesCavacoPage } from '../pages/acordes-cavaco/acordes-cavaco';
import { DetalhesPage } from '../pages/detalhes/detalhes';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    MusicasPage,
    ArtistasPage,
    TonalidadesPage,
    RepertoriosPage,
    AcordesCavacoPage,
    DetalhesPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp, {
      backButtonText: '',
      mode: 'md'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MusicasPage,
    ArtistasPage,
    TonalidadesPage,
    RepertoriosPage,
    AcordesCavacoPage,
    DetalhesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
