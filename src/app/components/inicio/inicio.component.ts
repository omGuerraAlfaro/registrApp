import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AnimationController } from '@ionic/angular';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
})
export class InicioComponent {

  private animation: AnimationItem;

  user = {
    usuario: "",
    password: ""
  }

  

/*   @ViewChild('animar2', { read: ElementRef, static: true }) animar2: ElementRef; */

  constructor(public alertController: AlertController, private animationCtrl: AnimationController, private ngZone: NgZone, private router: Router, private activeroute: ActivatedRoute) {
    this.activeroute.queryParams.subscribe(params => { // Utilizamos lambda       
      if (this.router.getCurrentNavigation().extras.state) {
        // Validamos que en la navegacion actual tenga extras       
        this.user = this.router.getCurrentNavigation().extras.state.user;
        // Si tiene extra rescata lo enviado         
        console.log(this.user) // Muestra por consola lo traido     
      }
    });

  
  }



  //animacionLottie
  options: AnimationOptions = {
    path: 'assets/animations/3.json',
  }

  //Capturar Datos de la Animacion (para ser controlados) envio lista a la consola. 
  created(animation: AnimationItem) {
    console.log(animation);
    this.animation = animation;
    let anim1 = animation.animationID;
    if (anim1 == "__lottie_element_1") {
      animation.autoplay = true;
    }
  }


  //Despliegue de Camara
  ircamara() {
    this.presentAlert("Despliegue de cámara", "")
  }

  async presentAlert(titulo: string, msg: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: msg,
      buttons: ['OK'],
    });
    await alert.present();
  }

  
  
  

  //functionPlayAnimation
  /* play() {
    this.ngZone.runOutsideAngular(() => this.animation.play())
  } */
  //functionPauseAnimation
  /* pause() {
    this.ngZone.runOutsideAngular(() => this.animation.pause())

  } */

  //Animacion
  /*   ngAfterViewInit() {
      const animar2 = this.animationCtrl.create()
        .addElement(this.animar2.nativeElement)
        .duration(1500)
        .iterations(1)
        .fromTo('transform', 'translateX(-100px)', 'translateX(40px)')
        .fromTo('opacity', '0', '1');
  
      const animar = this.animationCtrl.create()
        .duration(5000)
        .iterations(Infinity)
        .addAnimation([animar2]);
  
      animar.play()
    }
   */



}

