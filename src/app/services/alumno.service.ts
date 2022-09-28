import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {
  private dataAlumno = [
    {
      user: 'om.guerra@duocuc.cl',
      password: '1234',
      age: '28',
      expanded:true,
      asignatura: [
        { id: 0, name: 'Programación Movil', totalClass: '20' },
        { id: 1, name: 'Arquitectura en Software', totalClass: '15' },
        { id: 2, name: 'Calidad de Software', totalClass: '30' },
        { id: 3, name: 'Estadistica Descriptiva', totalClass: '10' },
      ],
    },
    {
      user: 'mau.chacana@duocuc.cl',
      password: '1234',
      age: '23',
      asignatura: [
        { id: 0, name: 'Programación Movil', totalClass: '20' },
        { id: 1, name: 'Arquitectura en Software', totalClass: '15' },
        { id: 2, name: 'Calidad de Software', totalClass: '30' },
        { id: 3, name: 'Estadistica Descriptiva', totalClass: '10' },
      ],
    },

  ];

  private cart = [];

  constructor() { }

  getProducts(){
    return this.dataAlumno;
  }

  getCart(){
    return this.cart;
  }

  addProducts(product){
    this.cart.push(product);
  }
  
}
