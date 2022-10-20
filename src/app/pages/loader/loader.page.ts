import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.page.html',
  styleUrls: ['./loader.page.scss'],
})
export class LoaderPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    setTimeout(() => {
        this.navigateToPage();
    }, 1000);
  }

  navigateToPage() {
    if(localStorage.getItem('authenticated')){
      this.router.navigate(['/home/inicio']);
    } else {
      this.router.navigate(['/login']);
    }
  }

}
