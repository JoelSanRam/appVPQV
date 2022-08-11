import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  constructor(private http: HttpClient) { }

  asistencia(id, attended) {
    return this.http.patch(`${environment.apiUrl}/registrations/${id}?fields=name,email,phone,attendanceNumber`, {attended: attended}).pipe(
      
      map((res) => {
        console.log(res)
        return res
      })
    )
  }

  listado(){
    return this.http.get(`${environment.apiUrl}/registrations`).pipe(
      map((res) => {
        console.log(res)
        return res
      })
    )
  }

  filtrado(q){
    return this.http.get(`${environment.apiUrl}/registrations?q=${q}`).pipe(
      map((res) => {
        console.log(res)
        return res
      })
    )
  }

  pdf(){
    return this.http.get(`${environment.apiUrl}/registrations/download`).pipe(
      map((res) => {
        console.log(res)
        return res
      })
    )
  }

}
