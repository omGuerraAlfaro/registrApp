import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { AnimationController } from '@ionic/angular';
import { AlumnoService } from 'src/app/services/alumno.service'; 



@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.component.html',
  styleUrls: ['./asistencia.component.scss'],
})
export class AsistenciaComponent implements OnInit {

  private animation: AnimationItem;

  slidesConfig = {
    direction: 'horizontal',
    initialSlide: 0,
    spaceBetween: 1,
    slidesPerView: 1.3,
    centeredSlides: true,
    grabCursor: true,
  }

  alumno = [];


  @ViewChild('anim', { read: ElementRef, static: true }) animar2: ElementRef;

  constructor(private alumnoService: AlumnoService, private router: Router, private animationCtrl: AnimationController) { }



  //services
  ngOnInit() {
    this.alumno = this.alumnoService.getCart();
  }



  //lottie
  options: AnimationOptions = {
    path: 'assets/animations/code.json',
  }

  options2: AnimationOptions = {
    path: 'assets/animations/maths.json',
  }

  options3: AnimationOptions = {
    path: 'assets/animations/english.json',
  }

  options4: AnimationOptions = {
    path: 'assets/animations/church.json',
  }

  //Capturar Datos de la Animacion (para ser controlados) envio lista a la consola. 
  created(animation: AnimationItem) {
    console.log(animation);
    this.animation = animation;
    let anim1 = animation.animationID;
    if (anim1 == "__lottie_element_106") {
      animation.playSpeed = 0.7;
    }
  }


  //animation title asistencia
  ngAfterViewInit() {
    const animarTitle = this.animationCtrl.create()
      .addElement(this.animar2.nativeElement)
      .duration(1500)
      .iterations(1)
      .fromTo('transform', 'translateY(-50px)', 'translateY(10px)')
      .fromTo('opacity', '0.2', '1');

    const animarCntrl = this.animationCtrl.create()
      .duration(5000)
      .iterations(Infinity)
      .addAnimation([animarTitle]);

    animarCntrl.play();
  }


}
