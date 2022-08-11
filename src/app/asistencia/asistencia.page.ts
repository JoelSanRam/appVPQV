import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { AlertController } from '@ionic/angular';
import { RegistroService } from '../service/registro.service';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit {

  usuario = this.fb.group({
    id: ['', [Validators.required, Validators.minLength(6)]],
  });

  email= ''
  nombre= ''
  phone= ''
  activo = false

  constructor(
    private fb: FormBuilder,
     private barcodeScanner: BarcodeScanner,
     public alertController: AlertController,
     private registroService: RegistroService
     ) { }

  ngOnInit() {
  }

  async presentAlert(mensaje) {
    const alert = await this.alertController.create({
      cssClass: 'Exito',
      header: 'Registro',
      message: mensaje,
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }

  async presentAlert2(mensaje) {
    const alert = await this.alertController.create({
      cssClass: 'Error',
      header: 'Error',
      message: mensaje,
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }

  registroAsistencia(){
    this.registroService.asistencia(this.usuario.value.id, true ).subscribe((res: any)=>{
      this.activo = true
      this.email = res['registration']['email'];
      this.nombre = res['registration']['name'];
      this.phone = res['registration']['phone'];
      this.presentAlert("El registro al evento fue realizado exitosamente, ahora podrá participar en la rifa de un certificado de viaje");
    }, (err) =>{
      this.presentAlert2(err.error.message);
      console.log(err)
    })
  }


  registrar(){
    this.barcodeScanner.scan().then(barcodeData => {
      let id = barcodeData.text
      this.registroService.asistencia(id, true).subscribe((res)=>{
        this.activo = true
        this.email = res['registration']['email'];
        this.nombre = res['registration']['name'];
        this.phone = res['registration']['phone'];
        this.presentAlert("El registro al evento fue realizado exitosamente, ahora podrá participar en la rifa de un certificado de viaje");
      }, (err) =>{
        // this.presentAlert2(err)
        console.log("Ocurrió un error")
      })
     }).catch(err => {
     this.presentAlert2('Registro no exitoso.')
     });
  }

}
