import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AsignaturasService {

  private dataAsignatura = [
    {
      id: 0,
      name: 'Programación Movil',
      nameProfe: 'Nancy Bernal',
      totalClass: '20',
      idLottie: 'options',
    },
    {
      id: 1,
      name: 'Arquitectura en Software',
      nameProfe: 'Cristian Rojas',
      totalClass: '15',
      idLottie: 'options1',
    },
    {
      id: 2,
      name: 'Calidad de Software',
      nameProfe: 'Carolina Vial',
      totalClass: '30',
      idLottie: 'options2',
    },
    {
      id: 3,
      name: 'Estadistica Descriptiva',
      nameProfe: 'Andrea Neira',
      totalClass: '10',
      idLottie: 'options3',
    },
  ];

  constructor() { }

  getProducts() {
    return this.dataAsignatura;
  }

}
