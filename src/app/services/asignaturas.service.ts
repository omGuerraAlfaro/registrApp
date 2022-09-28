import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AsignaturasService {

  private dataAsignatura = [
    {
      asignaturas: [
        {
          id: 0,
          name: 'Programación Movil',
          totalClass: '20',
        },
        { 
          id: 1, 
          name: 'Arquitectura en Software', 
          totalClass: '15', 
        },
        { 
          id: 2, 
          name: 'Calidad de Software', 
          totalClass: '30', 
        },
        { id: 3, 
          name: 'Estadistica Descriptiva', 
          totalClass: '10' 
        },
      ],
    },


  ];

  constructor() { }

  getProducts() {
    return this.dataAsignatura;
  }

}







