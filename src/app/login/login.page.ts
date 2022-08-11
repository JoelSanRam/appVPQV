import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  usuario;

  funcionActiva = true;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    public alertController: AlertController,
    public loadingController: LoadingController
  ) {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (user && token) this.router.navigate(['/home/asistencia']);
    this.usuario = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
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
  }

  async loader() {
    const loading = await this.loadingController.create({
      // spinner: null,
      // duration: 5000,
      message: 'Iniciando sesión',
      translucent: true,
      cssClass: 'custom-class custom-loading',
      // backdropDismiss: true,
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
  }

  ingresar() {
    this.funcionActiva = false;
    this.loader()
    this.auth.login(this.usuario.value).subscribe(res => {
      this.funcionActiva = true;

      console.log('aqui log', res);
      this.loadingController.dismiss()
      this.router.navigate(['/home/asistencia']);
      // this.usuario.email.value = ''
    }, err => {
      this.funcionActiva = true;
      console.log("error")
      this.loadingController.dismiss()
      this.presentAlert2()
    })
    // this.loadingController.dismiss()
  }

}
