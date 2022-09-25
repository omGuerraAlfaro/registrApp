import { Component,} from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {   

  constructor(private router: Router, public alertController: AlertController) {    
    this.router.navigate(['home/inicio']);
  }

 
  //segment info
  segmentChanged($event){
    let direccion=$event.detail.value;
    console.log(direccion);
    this.router.navigate(['home/'+direccion]);
  }


  irhome() {
    this.presentAlert2("¿Está Seguro?", "¿Deseas cerrar sesión?")    
  }

  async presentAlert2(titulo: string, msg: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: msg,
      buttons:
        [
          {
            text: 'No',
            role:'cancel',
            cssClass: 'alert-button-cancel',
            handler: () => {
              console.log('Alerta Cancelada');              
            },
          },
          {
            text: 'Si',
            role:'confirm',
            cssClass: 'alert-button-confirm',
            handler: (role) => {
              console.log('confirmacion', role);              
            },
          },
        ],
    });
    await alert.present();
    let result = await alert.onDidDismiss(); //retorna la data del alert
    console.log(result);    
    if(result.role=='confirm'){
      this.router.navigate(['/login']);
    }    
  }

}

