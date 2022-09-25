import { Component, OnInit } from '@angular/core';
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

  constructor(public alertController: AlertController) { }

  ngOnInit() {
  }

  enviar() {
    if (this.data.email != "") {
      this.presentAlert("ENVIADO", "Se ha enviado un link de recuperación al correo:" + `<br>` +this.data.email)

    } else {
      this.presentAlert("ERROR", "Debe ingresar su correo institucional")
    }
  }

  async presentAlert(titulo: string, msg: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: msg,
      buttons: ['OK'],
    });

    await alert.present();
  }


}
