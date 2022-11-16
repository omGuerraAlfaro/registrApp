import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DistanceService {

  /* geo duoc
  lat: -33.0337195
  lon: -71.5334577
  */
  respuestaGeoDistance: any;
  constructor() { }

  calcularDistancia(geoLat: number, geoLon: number) {
    console.log(geoLat, geoLon);
    const response = `https://distance-calculator8.p.rapidapi.com/calc?startLatitude=${geoLat}&startLongitude=${geoLon}&endLatitude=-33.0337195&endLongitude=-71.5334577`;

    fetch(response, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '010476f643msha15ff586936f4f0p1eeccdjsne4d90f359c5d',
        'X-RapidAPI-Host': 'distance-calculator8.p.rapidapi.com'
      }
    }).then(response => response.json())
      .then(response => {
        while(this.respuestaGeoDistance === undefined){
          this.respuestaGeoDistance = response.body.distance.meters ;
        }        
      });
  }


  getDistance(){
    return this.respuestaGeoDistance;
  }



}