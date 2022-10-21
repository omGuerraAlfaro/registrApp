import { Component, ElementRef, OnInit, ViewChild, } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationController } from '@ionic/angular';
import { AsignaturasService } from 'src/app/services/asignatura.service';
import { FirestoreService } from 'src/app/services/firestore.service';


@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.component.html',
  styleUrls: ['./asistencia.component.scss'],
})
export class AsistenciaComponent implements OnInit {

  slidesConfig = {
    direction: 'horizontal',
    initialSlide: 0,
    spaceBetween: 1,
    slidesPerView: 1.3,
    centeredSlides: true,
    grabCursor: true,
    speed: 400,
  };

  alumnos = [];
  asignaturas = [];

  @ViewChild('anim', { read: ElementRef, static: true }) animar2: ElementRef;


  arrayAsignaturas: any = [{
    id: "",
    data: {} as AsignaturasService
  }];

  constructor(
    private router: Router,
    private animationCtrl: AnimationController,
    private asignaturaService: AsignaturasService,
    private firestore: FirestoreService,
  ) {
    this.getAsignaturas();
  }

  //services
  ngOnInit() {
  }

  getAsignaturas() {
    this.firestore.getColletcion().subscribe((resultadoConsultaTareas) => {
      this.arrayAsignaturas = [];
      resultadoConsultaTareas.forEach((datosTarea: any) => {
        this.arrayAsignaturas.push({
          id: datosTarea.payload.doc.id,
          data: datosTarea.payload.doc.data()
        });
      })
    });
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
