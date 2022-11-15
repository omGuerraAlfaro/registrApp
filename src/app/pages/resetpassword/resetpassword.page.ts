import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { App } from '@capacitor/app';
import { Device } from '@capacitor/device';
import { EmailComposer } from 'capacitor-email-composer';
const nodemailer= require('nodemailer');

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
  
  createTrans = () => {
    const transport = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "f82d49045a98b8",
        pass: "ea166ca4483035"
      }
    });    
    return transport;
  }

   sendMail = async () => {
    const transporter = this.createTrans();
    const info = await transporter.sendMail({
      from: '"Omar Guerra" <omar@example.cl>',
      to: "om.guerra@duocuc.cl",
      subject: "Holaaaaa",
      html: "<b>Hola</b>",
    });

    console.log("Menssage sent: %s", info.messageId);
    return
  }
   exports.sendMail = () => this.sendMail()
  

  // async sendEmail() {
  //   const info = await App.getInfo();
  //   const deviceInfo = await Device.getInfo();
  //   const email = this.data.email;
  //   const user = localStorage.getItem('username')
  //   const deviceInfos = `${deviceInfo.manufacturer} ${deviceInfo.model}\n${deviceInfo.operatingSystem} ${deviceInfo.osVersion}\n${deviceInfo.webViewVersion}\n${deviceInfo.name}\n}`;    
  //   try {
  //     const open = await EmailComposer.hasAccount();
  //     if (open.hasAccount) {
  //       EmailComposer.open({
  //         subject: `Support ${info.name} ${info.version}(${info.build})`,
  //         body: `El alumno ${user} ha registrado su asistencia...`,
  //         to: [email],          
  //       });
  //     } else {
  //       this.presentAlert2("ENVIADO", "Se ha enviado un link de recuperación al correo:" + `<br>` + this.data.email);
  //       //this.dialogService.showErrorAlert({message: 'Aucun compte email configuré. Envoyé un mail à ' + email});
  //     }
  //   } catch (e) {
  //     this.presentAlert("ERROR", "Debe ingresar su correo institucional");
  //     //this.dialogService.showErrorAlert({ message: 'Impossible to open an email composer. Please send a mail to ' + email });
  //   }

  // }





  // enviar() {
  //   if (this.data.email != "") {
  //     this.presentAlert2("ENVIADO", "Se ha enviado un link de recuperación al correo:" + `<br>` + this.data.email)

  //   } else {
  //     this.presentAlert("ERROR", "Debe ingresar su correo institucional")
  //   }
  // }

  async presentAlert(titulo: string, msg: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: msg,
      buttons:
        [
          {
            text: 'Ok',
            role: 'confirm',
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
            role: 'confirm',
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
    if (result.role == 'confirm') {
      this.router.navigate(['/login']);
    }
  }







}
