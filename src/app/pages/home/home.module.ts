import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HomePageRoutingModule } from './home-routing.module';
import { HomePage } from './home.page';



//componentes
import { PerfilComponent } from 'src/app/components/perfil/perfil.component';
import { InicioComponent } from 'src/app/components/inicio/inicio.component';
import { AsistenciaComponent } from 'src/app/components/asistencia/asistencia.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
  ],
  
  declarations: [HomePage, PerfilComponent, InicioComponent, AsistenciaComponent],

})
export class HomePageModule { }
