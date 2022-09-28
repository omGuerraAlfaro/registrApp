import { Component, OnInit } from '@angular/core';
import { AlumnoService } from 'src/app/services/alumno.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {


  alumnos = [];
  constructor(private alumnoService: AlumnoService) { }

  ngOnInit() {
    //info service alumnos
    this.alumnos = this.alumnoService.getProducts();
    console.log(this.alumnos);
  }

}
