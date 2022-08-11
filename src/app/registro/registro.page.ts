import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AlertController, LoadingController, Platform } from '@ionic/angular';
import { isPlatform } from '@ionic/angular'; 

import { RegistroService } from '../service/registro.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  plat;

  ion = false;
  ionListado;
  urlReporte: string;

  usuario = this.fb.group({
    id: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private fb: FormBuilder,
    public platform: Platform,
    private registroService: RegistroService,
    public alertController: AlertController,
    public loadingController: LoadingController
    ) { }

  ngOnInit() {
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Cargando...',

    });
    this.listado();
    loading.dismiss();
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

  async showLoader() {
    const loading = await this.loadingController.create({
      // spinner: null,
      // duration: 5000,
      message: 'Cargando...',
      translucent: true,
      cssClass: 'custom-class custom-loading',
      // backdropDismiss: true,
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed with role:', role);
  }

 

  ionViewDidEnter(){
    // this.showLoader()
    this.dispositivo();
    this.listado();
    // this.pdf();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'Error',
      header: 'Éxito',
      message: 'Registro modificado',
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  async presentAlert2() {
    const alert = await this.alertController.create({
      cssClass: 'Error',
      header: 'Error',
      message: 'Algo salió mal',
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  dispositivo(){
    // console.log(this.platform)
    if(this.platform.is('tablet')){
      this.plat = true
    }else{
      this.plat = false
    }


  }

  listado(){
    this.showLoader()
    this.registroService.listado().subscribe(res => {
      console.log(res);
      this.loadingController.dismiss()
      this.ionListado = res
    })
  }

  filtrar(q){
    console.log(q)
    this.registroService.filtrado(q).subscribe(res => {
      console.log(res);
      this.ionListado = res
    })
  }
  
  registrar(e, id){
    e = !e;

    console.log(e, id)
  
    this.registroService.asistencia(id, e).subscribe(res => {
      console.log(res);
      this.presentAlert()
      this.listado()
    }, (err)=>{
      this.presentAlert2()
    })
  }

/*   download() {
    console.log('simon')
    const url = 'https://bibdigital.epn.edu.ec/bitstream/15000/21341/1/CD%2010857.pdf';
    this.fileTransfer.download(url, this.file.dataDirectory + 'file.pdf').then((entry) => {
      console.log('download complete: ' + entry.toURL());
    }, (error) => {
      console.log('chalecito')
    });
  }   */
  download(url){
    window.open(url, "download");
  }

  pdf(){
    this.registroService.pdf().subscribe((res: any) => {
      this.urlReporte = res.route
      // this.urlReporte.toString();
      console.log(this.urlReporte)
      window.open(`https://${this.urlReporte}`, "_blank");
    })
    // window.open('rest.viajoporqueviajo.com/docs/registrations/2/registrations.xlsx', "_blank");
  }
}
