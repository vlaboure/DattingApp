import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  // pour récupérer les valeurs depuis navcomponent.html
  model: any = {};
  photoUrl: string;
  loged: string;

   
  constructor(
    public authService: AuthService,
    private alertify: AlertifyService,
    private router: Router
    ) { }

    // charger la photo user.png avec observable
  ngOnInit() {
    this.authService.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);
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
    localStorage.removeItem('user');
    this.authService.decodedToken = null;
    this.authService.currentUser = null;
    console.log('logged out');
    this.router.navigate(['/home']); 
  }
  setLogin(){
    this.authService.setLogin(this.model);
    console.log(this.model);
  }

}
