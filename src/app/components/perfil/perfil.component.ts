import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {


  usu:any;
  constructor() { }

  ngOnInit() {/* 
    //info service alumnos
    this.alumnos = this.alumnoService.getProducts();
    console.log(this.alumnos); */

    this.usu = localStorage.getItem('usuario');

    console.log(this.usu);
    
  }

}
