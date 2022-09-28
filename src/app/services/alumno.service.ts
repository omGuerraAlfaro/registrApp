import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {
  private dataAlumno = [
    {
      user: 'om.guerra@duocuc.cl',
      name:'Omar Guerra',
      password: '1234',
      age: '28',
      carrera: 'Ingenieria en Informática',     
      sede: 'Viña del Mar',
    },
  ]; 

  constructor() { }

  getProducts(){
    return this.dataAlumno;
  }

 
  
}
