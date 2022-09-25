import { Component, OnInit } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.component.html',
  styleUrls: ['./asistencia.component.scss'],
})
export class AsistenciaComponent implements OnInit {
  
  constructor() { }

  ngOnInit() {}

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


  
}
