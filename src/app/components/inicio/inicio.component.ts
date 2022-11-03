import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

//capacitor
import { BarcodeScanner } from '@capacitor-community/barcode-scanner'
import { Geolocation } from '@capacitor/geolocation';
//geo
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@awesome-cordova-plugins/native-geocoder/ngx';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
})
export class InicioComponent {
  coordinates: any;

  user = {
    usuario: "",
    password: ""
  }

  scannedResult: any;
  content_visibility = '';

  /*   @ViewChild('animar2', { read: ElementRef, static: true }) animar2: ElementRef; */

  //opciones geo
  options: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5,
  }
  geoAddress:any;

  constructor(
    private nativegeocoder: NativeGeocoder,
    public alertController: AlertController,
    private router: Router,
    private activeroute: ActivatedRoute,) {
    this.activeroute.queryParams.subscribe(params => { // Utilizamos lambda       
      if (this.router.getCurrentNavigation().extras.state) {
        // Validamos que en la navegacion actual tenga extras       
        this.user = this.router.getCurrentNavigation().extras.state.user;
        // Si tiene extra rescata lo enviado         
        console.log(this.user) // Muestra por consola lo traido     
      } else {
        this.user.usuario = localStorage.getItem('username')
      }
    });

  }

  async checkPermission() {
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
      console.log(result);
      BarcodeScanner.showBackground();
      document.querySelector('body').classList.remove('scanner-active');
      this.content_visibility = '';
      if (result?.hasContent) {
        this.scannedResult = result.content;
        console.log(this.scannedResult);
      }
    } catch (e) {
      console.log(e);
      this.stopScan();
    }
  }

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
    const location = await Geolocation.getCurrentPosition();
    console.log('location = ', location);

    this.nativegeocoder.reverseGeocode(location.coords.latitude, location.coords.longitude, this.options).then((
      result: NativeGeocoderResult[]) => {
      console.log('result =', result);
      //console.log('result =', result[0]);

      this.geoAddress = this.generateAddress(result[0]);
      console.log('location address = ', this.geoAddress);
      
    })
  }


  //Return Comina saperated auuress
  generateAddress(addressObj) {
    let obj = [];
    let uniqueNames = [];
    let address = "";

    for (let key in addressObj) {
      if (key != 'areasOfInterest') {
        obj.push(addressObj[key]);
      }
    }

    var i = 0;
    obj.forEach(value => {
      if (uniqueNames.indexOf(obj[i]) === -1) {
        uniqueNames.push(obj[i]);
      }
      i++;
    });


    uniqueNames.reverse();
    for (let val in uniqueNames) {
      if (uniqueNames[val].length)
        address += uniqueNames[val] + ', ';
    }

    return address.slice(0, -2);
  }


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

