import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  [x: string]: any;
  // pour récupérer les valeurs depuis navcomponent.html
  model: any = {};

  constructor(
    public authService: AuthService,
    private alertify: AlertifyService,
    private router: Router) { }

  ngOnInit() {

  }
  login(){
    // il faut souscrire au service avec le this.model
      // subscribe(observer=>)
    this.authService.login(this.model).subscribe(next => {
      this.alertify.success('loggin OK !!!'); } , error => {
        this.alertify.error(error);
        // pour exemple on peut faire plus simple en appelant navigate dans le next
      }, () => this.router.navigate(['/members']));
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  logOut(){
    localStorage.removeItem('token');
    console.log('logged out');
    this.router.navigate(['/home']); 
  }

}
