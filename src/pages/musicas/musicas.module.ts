import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MusicasPage } from './musicas';

@NgModule({
  declarations: [
    MusicasPage,
  ],
  imports: [
    IonicPageModule.forChild(MusicasPage),
  ],
})
export class MusicasPageModule {}
