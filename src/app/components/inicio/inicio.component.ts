import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

//capacitor
import { BarcodeScanner } from '@capacitor-community/barcode-scanner'
import { Geolocation } from '@capacitor/geolocation';
//geo
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@awesome-cordova-plugins/native-geocoder/ngx';
import { DistanceService } from 'src/app/services/distance.service';

//fireStore
import { FirestoreService } from 'src/app/services/firestore.service';
import { AsignaturasService } from 'src/app/services/asignatura.service';
import { SendemailService } from 'src/app/services/sendemail.service';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
})
export class InicioComponent implements OnDestroy, OnInit{
  coordinates: any;
  metros:any;

  Asignatura: any = [{
    id: "",
    data: {} as AsignaturasService
  }];

  user = {
    usuario: '',
    password: ''
  }

  scannedResult: any;
  content_visibility = '';

  /*   @ViewChild('animar2', { read: ElementRef, static: true }) animar2: ElementRef; */

  //opciones geo
  options: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5,
  }

 geoAddress: number;

  resultJSON: any;

  constructor(
    private nativegeocoder: NativeGeocoder,
    public alertController: AlertController,
    public distance: DistanceService,
    public firebaseService: FirestoreService) {
    
    this.fetchLocation()

    //this.user.usuario = localStorage.getItem('username')

    // this.activeroute.queryParams.subscribe(params => { // Utilizamos lambda       
    //   if (this.router.getCurrentNavigation().extras.state) {
    //     // Validamos que en la navegacion actual tenga extras       
    //     this.user = this.router.getCurrentNavigation().extras.state.user;
    //     // Si tiene extra rescata lo enviado         
    //     console.log(this.user) // Muestra por consola lo traido     
    //   } 

    // });

  }
  ngOnInit() {
    this.fetchLocation()
    this.user.usuario = localStorage.getItem('username')
  }


  //Busca asignatura, en colección asignatura
  // getAsignatura() {
  //   const path = "asignatura"
  //   this.firebaseService.getCollectionParams<AsignaturasService>(path, 'idAsignatura', 'PGY4121').subscribe(res => {
  //     console.log(res);
  //   });
  // }


  //Busca asignatura, en colección asignatura
  // getAsignatura() {
  //   const path = "asignatura"
  //   this.firebaseService.getCollectionParams<AsignaturasService>(path, 'idAsignatura', 'PGY4121').subscribe(res => {
  //     console.log(res);
  //   });
  // }


  async checkPermission() {
    this.user
    try {
      //check or request permission
      const status = await BarcodeScanner.checkPermission({ force: true });
      if (status.granted) {
        //the user granted permission
        return true;
      }
      return false;
    } catch (e) {
      console.log(e);
    }
  }

  //BarcodeScanner.startScan({ targetedFormats: [SupportedFormat.QR_CODE] }); // this will now only target QR-codes



  async startScan() {
    try {
      const permission = await this.checkPermission();
      if (!permission) {
        return;
      }
      
      await BarcodeScanner.hideBackground();
      document.querySelector('body').classList.add('scanner-active');
      this.content_visibility = 'hidden';
      const result = await BarcodeScanner.startScan();
      BarcodeScanner.showBackground();
      document.querySelector('body').classList.remove('scanner-active');
      this.content_visibility = '';
      if ((result?.hasContent)) {
        
        const path = "asignatura"
        this.scannedResult = result.content;
        //parse resultado a JSON
        this.resultJSON = JSON.parse(this.scannedResult);
        let date: Date = new Date();
        this.resultJSON.fecha = date;
        if (this.geoAddress<150){
          var today = new Date();
          var MES = today.getMonth()+1; 
          var fecha = today.getDate().toString()+ MES.toString() + today.getFullYear().toString();
          this.alertaEscaneo("Presente", "Se ha agregado la asistencia a la base de datos")    
          this.firebaseService.insertColectionAsignatura(this.resultJSON,this.user.usuario,fecha);

        }
        else{
          this.alertaEscaneo("Error", "Te encuentras demasiado lejos de tu sede Duoc, ó recuerda que debes permitir el acceso a tu ubicación actual")
        }
                
      }
    } catch (e) {
      console.error(e);
      this.stopScan();
    }
  }
  //Busqueda en fireStore        
  // this.firebaseService.getCollectionParams<AsignaturasService>(path, 'idAsignatura', valId).subscribe(res => {
  //   console.log(res);
  // });

  
  stopScan() {
    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();
    document.querySelector('body').classList.remove('scanner-active');
    this.content_visibility = '';
  }


  ngOnDestroy(): void {
    this.stopScan();
  }

  async fetchLocation() {
    const location = await Geolocation.getCurrentPosition(
      {enableHighAccuracy: true, timeout: 10000, maximumAge: 3000},
    );
    this.distance.calcularDistancia(location.coords.latitude, location.coords.longitude);
    setTimeout(() => {
      this.geoAddress = this.distance.getDistance();
   }, 2500);
    console.log(this.geoAddress,'Valor en metros');
    
    return this.geoAddress
  }

  async alertaEscaneo(titulo: string, msg: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: msg,
      buttons:
        [
          {
            text: 'Ok',
            role: 'confirm',
            cssClass: 'alert-button-confirm',
            handler: (role) => {
              console.log('confirmacion', role);
            },
          },
        ],
    });
    await alert.present();
  }

  // async fetchLocation() {
  // this.nativegeocoder.reverseGeocode(location.coords.latitude, location.coords.longitude, this.options).then((
  //   result: NativeGeocoderResult[]) => {
  //   console.log('result =', result);
  //   //console.log('result =', result[0]);

  //   this.geoAddress = this.generateAddress(result[0]);
  //   console.log('location address = ', this.geoAddress);
  //   });
  // }

  //Return Comina saperated auuress
  // generateAddress(addressObj) {
  //   let obj = [];
  //   let uniqueNames = [];
  //   let address = "";

  //   for (let key in addressObj) {
  //     if (key != 'areasOfInterest') {
  //       obj.push(addressObj[key]);
  //     }
  //   }

  //   var i = 0;
  //   obj.forEach(value => {
  //     if (uniqueNames.indexOf(obj[i]) === -1) {
  //       uniqueNames.push(obj[i]);
  //     }
  //     i++;
  //   });


  //   uniqueNames.reverse();
  //   for (let val in uniqueNames) {
  //     if (uniqueNames[val].length)
  //       address += uniqueNames[val] + ', ';
  //   }

  //   return address.slice(0, -2);
  // }







  //functionPlayAnimation
  /* play() {
    this.ngZone.runOutsideAngular(() => this.animation.play())
  } */
  //functionPauseAnimation
  /* pause() {
    this.ngZone.runOutsideAngular(() => this.animation.pause())
 
  } */

  //Animacion
  /*   ngAfterViewInit() {
      const animar2 = this.animationCtrl.create()
        .addElement(this.animar2.nativeElement)
        .duration(1500)
        .iterations(1)
        .fromTo('transform', 'translateX(-100px)', 'translateX(40px)')
        .fromTo('opacity', '0', '1');
  
      const animar = this.animationCtrl.create()
        .duration(5000)
        .iterations(Infinity)
        .addAnimation([animar2]);
  
      animar.play()
    }
   */



}

