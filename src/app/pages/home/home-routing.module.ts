import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AsistenciaComponent } from 'src/app/components/asistencia/asistencia.component';
import { InicioComponent } from 'src/app/components/inicio/inicio.component';
import { PerfilComponent } from 'src/app/components/perfil/perfil.component';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    //declarar las rutas hijas (componentes) a las que accede esta pagina "home"
    children:[
      {
        path:'perfil',
        component: PerfilComponent
      },
      {
        path:'inicio',
        component: InicioComponent
      },
      {
        path:'asistencia',
        component: AsistenciaComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
