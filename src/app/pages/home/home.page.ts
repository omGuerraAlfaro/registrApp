import { Component,} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {   

  user = {
    usuario: "",
    password: ""
  }

  constructor(private router: Router, public alertController: AlertController, private activeroute: ActivatedRoute) {    
    
    this.activeroute.queryParams.subscribe(params => { // Utilizamos lambda       
      if (this.router.getCurrentNavigation().extras.state) {
        // Validamos que en la navegacion actual tenga extras       
        this.user = this.router.getCurrentNavigation().extras.state.user;
        // Si tiene extra rescata lo enviado         
        console.log(this.user) // Muestra por consola lo traido     
      } else { this.router.navigate(["/home/inicio"]) } // Si no tiene extra la navegacion actual navegar al login    
    });
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

