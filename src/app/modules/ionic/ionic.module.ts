import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    IonicStorageModule,
  ],
  exports: [
    IonicStorageModule,
  ]
})
export class IonicPluginModule { }
