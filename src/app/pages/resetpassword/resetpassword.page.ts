import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.page.html',
  styleUrls: ['./resetpassword.page.scss'],
})
export class ResetpasswordPage implements OnInit {

  data: any = {
    email: "",
  }

  constructor(public alertController: AlertController, private router: Router) { }

  ngOnInit() {
  }

  enviar() {
    if (this.data.email != "") {
      this.presentAlert2("ENVIADO", "Se ha enviado un link de recuperación al correo:" + `<br>` +this.data.email)

    } else {
      this.presentAlert("ERROR", "Debe ingresar su correo institucional")
    }
  }

  async presentAlert(titulo: string, msg: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: msg,
      buttons:
        [
          {
            text: 'Ok',
            role:'confirm',
            cssClass: 'alert-button-confirm',
            handler: (role) => {
              console.log('confirmacion', role);              
            },
          },
        ],
    }); 
    await alert.present();    
  }


  async presentAlert2(titulo: string, msg: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: msg,
      buttons:
        [
          {
            text: 'Ok',
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
