import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AlertController, LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user = new BehaviorSubject(null);

  get userAux(): Observable<any> {
    return this.user.value;
  }

  constructor(private http: HttpClient,
    public alertController: AlertController,
    public loadingController: LoadingController
    ) {
    this.checkToken();
  }

  async presentAlert2() {
    const alert = await this.alertController.create({
      cssClass: 'Error',
      header: 'Error',
      message: 'Usuario o contraseña son incorrectas',
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }

  login(user_data) {
    this.http.post(`${environment.apiUrl}/login`, user_data).subscribe((res) => {
      console.log(res)
      localStorage.setItem('user', JSON.stringify(res['user']));
      localStorage.setItem('token', res['token']);
      this.loadingController.dismiss();
  
      this.user.next(res['token']);
    }, (error)=>{
      console.log(error, 'Error')
      this.loadingController.dismiss();
      this.presentAlert2()
      return error;
    })
    this.loadingController.dismiss();
    return this.user.asObservable()
  }

  private checkToken(): void {
    const userLocalStorage = localStorage.getItem('token');
    if (userLocalStorage !== null) {
      const user = userLocalStorage;
      this.user.next(user);
    }
  }

  logout(){
    this.user.next('');
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }

}


