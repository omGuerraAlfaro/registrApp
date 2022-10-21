import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AsignaturasService {
    id: number;
    name: string;
    nameProfe: string;
    totalClass: number;
    idLottie: string;

  constructor() { }

}