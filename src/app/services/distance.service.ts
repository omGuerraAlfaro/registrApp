import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DistanceService {

  constructor() { }

  async calcularDistancia() {
    try {
      const response = fetch("https://distance-calculator8.p.rapidapi.com/calc?startLatitude=-33.03381616074373&startLongitude=-71.53317398581412&endLatitude=-33.032803&endLongitude=-71.5367744", {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': '010476f643msha15ff586936f4f0p1eeccdjsne4d90f359c5d',
          'X-RapidAPI-Host': 'distance-calculator8.p.rapidapi.com'
        }
      })
        .then(response => response.json())
        .then(response => console.log(response));

    } catch (err) {
      console.error(err);
    }


  }
}