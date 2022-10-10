import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.page.html',
  styleUrls: ['./not-found.page.scss'],
})
export class NotFoundPage implements OnInit {


  private animation: AnimationItem;
  constructor(private router: Router) { }

  ngOnInit() {
  }


  //animacionLottie
  options: AnimationOptions = {
    path: 'assets/animations/404.json',
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


  irhome() {
    this.router.navigate(['/login']);
  }

  
      
   




}
