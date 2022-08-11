import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AsistenciaPage } from './asistencia.page';

import { AsistenciaPageRoutingModule } from './asistencia-routing.module';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AsistenciaPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AsistenciaPage],
  providers: [BarcodeScanner]
})
export class AsistenciaPageModule {}
