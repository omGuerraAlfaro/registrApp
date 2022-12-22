import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-qrgenerator',
  templateUrl: './qrgenerator.component.html',
  styleUrls: ['./qrgenerator.component.scss'],
})
export class QrgeneratorComponent implements OnInit {

  myAngularxQrCode: string = null;

  infoQR = {
    id: "",
    seccion: "",
    asignatura: "",
    docente: "",
    correo: ""
  }

  constructor() {
  }

  ngOnInit() { }


  generarQR() {
    this.myAngularxQrCode = JSON.stringify({ 'idAsignatura': this.infoQR.id, 'seccion': this.infoQR.seccion, 'asignatura': this.infoQR.asignatura, 'docente': this.infoQR.docente, 'correo': this.infoQR.correo});
  }

}
