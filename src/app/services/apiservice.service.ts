import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AlumnoInterface } from 'src/interfaces/alumnoInterface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  };  

  constructor(private http: HttpClient) { }

  getAlumnos(): Observable<any> {
    const alumnos = this.http.get<AlumnoInterface[]>(
      'https://nancyb3a.github.io/Test/usuarios_PGY4121_04.json'
    );
    return alumnos;
  }

}