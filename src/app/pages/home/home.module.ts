import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HomePageRoutingModule } from './home-routing.module';
import { HomePage } from './home.page';

//Lottie
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web' ;
//componentes
import { PerfilComponent } from 'src/app/components/perfil/perfil.component';
import { InicioComponent } from 'src/app/components/inicio/inicio.component';
import { AsistenciaComponent } from 'src/app/components/asistencia/asistencia.component';
export function playerFactory(){
  return player
}

@NgModule({
  imports: [
    LottieModule.forRoot({player:playerFactory}),
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage, PerfilComponent, InicioComponent, AsistenciaComponent]
})
export class HomePageModule {}
