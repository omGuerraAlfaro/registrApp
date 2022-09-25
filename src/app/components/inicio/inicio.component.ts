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
export class InicioComponent implements OnInit {

  private animation: AnimationItem;

  user = {
    usuario: "",
    password: ""
  }

  @ViewChild('animar2', { read: ElementRef, static: true }) animar2: ElementRef;

  constructor(public alertController: AlertController, private animationCtrl: AnimationController, private ngZone: NgZone, private router: Router,) {

  }

  ngOnInit() { }


  //animacionLottie
  options: AnimationOptions = {
    path: 'assets/animations/3.json',
  }

  options2: AnimationOptions = {
    path: 'assets/animations/2.json',
  }

  //Capturar Datos de la Animacion (para ser controlados) envio lista a la consola. 
  created(animation:AnimationItem) {
    console.log(animation);
    this.animation = animation;
    animation.playSpeed = 5;
  }

  //functionPlayAnimation
  play() {
    this.ngZone.runOutsideAngular(() => this.animation.play())
  }
  //functionPauseAnimation
  pause() {
    this.ngZone.runOutsideAngular(() => this.animation.pause())

  }

  //Animacion
  ngAfterViewInit() {
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





}

