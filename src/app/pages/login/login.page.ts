import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import {
  NavController,
  ToastController,
  AnimationController,
} from '@ionic/angular';

//api
import { AlumnoInterface } from '../../../interfaces/alumnoInterface';
import { ApiService } from '../../services/apiservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  /**
   * Se genera el modelo user con dos claves
   * cada clave tiene su valor inicial
   */
  user = {
    usuario: '',
    password: '',
  };

  //para guardar el input vacío
  field: string;
  //inicio sesion
  existe: any;
  alumnos: AlumnoInterface[];

  // eslint-disable-next-line @typescript-eslint/member-ordering
  @ViewChild('logoAnimation', { read: ElementRef, static: true })
  logoAnimation: ElementRef;

  constructor(
    private navCtrl: NavController,
    private api: ApiService,
    private router: Router,
    public toastController: ToastController,
    private animationCtrl: AnimationController
  ) { }
  ionViewWillEnter() {
    this.api.getAlumnos().subscribe((data) => {
      console.log(data);
      this.alumnos = data.alumnos;
    });
  }

  ngOnInit() {
    // TODO document why this method 'ngOnInit' is empty

  }

  ingresar() {
    //console.log(this.alumnos);
    if (!this.validateModel(this.user)) {

      this.presentToast('Falta ingresar ' + this.field, 3000);
    } else {
      this.alumnos.forEach((element) => {
        if
          (
          this.user.usuario === element.username &&
          this.user.password === element.password
        ) 
        {
          console.log('valid');
          localStorage.setItem('ingresado', 'true');
          localStorage.setItem('usuario', element.nombre);
          // Se declara e instancia un elemento de tipo NavigationExtras
          const navigationExtras: NavigationExtras = {
            state: {
              user: this.user, // Al estado se asignamos un objeto con clave y valor
            },
          };
          this.router.navigate(['/home/inicio'], navigationExtras); // navegamos hacia el Home y enviamos información adicional
          return;
        }
        if
          (
          this.user.usuario != element.username &&
          this.user.password != element.password
        ) 
        {
          this.presentToast('El usuario y/o contraseña son invalidas', 3000);
        }
      });
    }

  }

  getAlumnos() {
    this.api.getAlumnos().subscribe((data) => {
      console.log(data);
      this.alumnos = data;
    });
    return this.alumnos;
  }


  /**
     * validateModel sirve para validar que se ingresa algo en los
     * campos del html mediante su modelo
     */
  validateModel(model: any) {
    //recorro todas las entradas que me entrega el Object entries y obtengo
    //su clave-valor
    for (const [key, value] of Object.entries(model)) {
      //verifico campo vacío
      if (value === '') {
        this.field = key;
        return false;
      }
    }
    return true;
  }


  recuperar() {
    this.router.navigate(['/resetpassword']);
  }

  notFound(){
    
    this.router.navigate(['/**']);
  }


  //toast
  async presentToast(msg: string, duracion?: number) {
    const toast = await this.toastController.create({
      message: msg,
      duration: duracion ? duracion : 2000,
    });
    toast.present();
  }

  //animacion logo
  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngAfterViewInit() {
    const logoAnimation = this.animationCtrl
      .create()
      .addElement(this.logoAnimation.nativeElement)
      .duration(500)
      .iterations(1)
      .beforeStyles({
        opacity: 0.2,
      })
      .afterClearStyles(['opacity'])
      .keyframes([
        { offset: 0, transform: 'scale(0.5)' },
        { offset: 1, transform: 'scale(1)' },
      ]);

    const animar = this.animationCtrl
      .create()
      .duration(5000)
      .iterations(Infinity)
      .addAnimation([logoAnimation]);

    animar.play();
  }
}
