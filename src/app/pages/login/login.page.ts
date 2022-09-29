import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AnimationController } from '@ionic/angular';
import { InicioComponent } from 'src/app/components/inicio/inicio.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  /**
   * Se genera el modelo user con dos claves
   * cada clave tiene su valor inicial
   */
  user = {
    usuario: "",
    password: ""
  }
  //para guardar el input vacío
  field: string = ""

  @ViewChild('logoAnimation', { read: ElementRef, static: true }) logoAnimation: ElementRef;

  constructor(private router: Router, public toastController: ToastController, private animationCtrl: AnimationController,) { } // Se debe instanciar

  
  ingresar() {
    if (this.validateModel(this.user)) {
      // Se declara e instancia un elemento de tipo NavigationExtras
      let navigationExtras: NavigationExtras = {
        state: {
          user: this.user // Al estado se asignamos un objeto con clave y valor
        }
      }
      this.router.navigate(['/home/inicio'], navigationExtras); // navegamos hacia el Home y enviamos información adicional
    }
    else {
      this.presentToast("Falta ingresar " + this.field, 3000);
    }
  }

  recuperar() {
    this.router.navigate(['/resetpassword'])
  }

  /**
   * validateModel sirve para validar que se ingresa algo en los
   * campos del html mediante su modelo
   */
  validateModel(model: any) {
    //recorro todas las entradas que me entrega el Object entries y obtengo
    //su clave-valor
    for (var [key, value] of Object.entries(model)) {
      //verifico campo vacío
      if (value == "") {
        this.field = key;
        return false;
      }
    }
    return true;
  }

  //toast
  async presentToast(msg: string, duracion?: number) {
    const toast = await this.toastController.create({
      message: msg,
      duration: duracion ? duracion : 2000
    });
    toast.present();
  }

  //animacion logo
  ngAfterViewInit() {
    const logoAnimation = this.animationCtrl.create()
      .addElement(this.logoAnimation.nativeElement)
      .duration(500)
      .iterations(1)
      .beforeStyles({
        opacity: 0.2
      })      
      .afterClearStyles(['opacity'])
      .keyframes([
        { offset: 0, transform: 'scale(0.5)' },
        { offset: 1, transform: 'scale(1)' },
        
      ])

    const animar = this.animationCtrl.create()
      .duration(5000)
      .iterations(Infinity)
      .addAnimation([logoAnimation]);

    animar.play()
  }
}