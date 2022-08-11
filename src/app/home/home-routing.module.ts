import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: 'home',
    component: HomePage,
    canActivate: [AuthGuard],
    children:[
      {
        path: 'asistencia',
        loadChildren: () => import('../asistencia/asistencia.module').then( m => m.AsistenciaPageModule)
      },
      {
        path: 'registro',
        loadChildren: () => import('../registro/registro.module').then( m => m.RegistroPageModule)
      },
    ]
    
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
